"use client";

import type { PointerEvent, ReactNode } from "react";

/**
 * همان رفتار VideoCard / ArticleCard:
 *   تک‌خط (`truncate`) و اگر متن بریده شد، با هاور
 *   `overflow-visible` + `animate-rtlMarquee` (یا ltrMarquee).
 *
 * فرق: به‌جای state/ResizeObserver برای هر متن، «یک» listener روی کل گرید داریم؛
 * کلاس‌های دقیقاً همان‌ها هستند و فقط لحظه‌ی هاور (فقط اگر متن بریده شده) اضافه/حذف می‌شوند.
 * جهت از direction واقعی همان المان خوانده می‌شود (نام ریپازیتوری‌ها عمداً ltr هستند).
 *
 * نکته: کلاس‌ها باید به‌صورت رشته‌ی کامل اینجا بیایند تا تیلویند آن‌ها را تولید کند.
 */
const RTL = ["overflow-visible", "animate-rtlMarquee"];
const LTR = ["overflow-visible", "animate-ltrMarquee"];

export default function MarqueeBoundary({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const onOver = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-marquee]");
    if (!el || el.dataset.run) return;
    if (el.scrollWidth <= el.clientWidth + 1) return;

    const cls = getComputedStyle(el).direction === "rtl" ? RTL : LTR;
    el.classList.add(...cls);
    el.dataset.run = "1";
  };

  const onOut = (e: PointerEvent<HTMLDivElement>) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-marquee]");
    if (!el || !el.dataset.run) return;
    if (e.relatedTarget instanceof Node && el.contains(e.relatedTarget)) return;
    el.classList.remove(...RTL, ...LTR);
    delete el.dataset.run;
  };

  return (
    <div className={className} onPointerOver={onOver} onPointerOut={onOut}>
      {children}
    </div>
  );
}