
"use client";

import { useEffect, useState } from "react";

type Variant = "desktop" | "mobile";

const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * ویدیوی پس‌زمینه‌ی hero.
 *
 * فقط ویدیوی مناسب همان اندازه‌ی صفحه رندر می‌شود.
 * شروع ویدیو بعد از load و در زمان idle انجام می‌شود.
 * در prefers-reduced-motion و Save-Data ویدیو اصلاً لود نمی‌شود.
 */
export default function HeroVideo({ lang }: { lang: string }) {
  const [variant, setVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const connection = (navigator as any).connection;

    if (connection?.saveData) {
      return;
    }

    const mq = window.matchMedia(DESKTOP_QUERY);

    const pick = () => {
      setVariant(mq.matches ? "desktop" : "mobile");
    };

    let started = false;

    let idleId:
      | ReturnType<typeof window.requestIdleCallback>
      | undefined;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      if (started) return;

      started = true;
      pick();

      mq.addEventListener?.("change", pick);
    };

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(start, {
          timeout: 4000,
        });
      } else {
        // بدون window تا مشکل TS2339 ایجاد نشود
        timeoutId = setTimeout(start, 2000);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      window.removeEventListener("load", schedule);

      if (idleId !== undefined) {
        window.cancelIdleCallback?.(idleId);
      }

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      mq.removeEventListener?.("change", pick);
    };
  }, []);

  if (!variant) return null;

  // اگر ویدیوها روی CDN/S3 هستند، فقط این env را بگذار:
  // NEXT_PUBLIC_HERO_VIDEO_BASE=https://s3.metarang.com/metarang/firstpage
  const base =
    process.env.NEXT_PUBLIC_HERO_VIDEO_BASE ||
    `/${lang}/api/firstpage-video`;

  if (variant === "desktop") {
    return (
      <video
        key="desktop"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full ltr:rotate-y-180 object-fill sm:object-left"
      >
        <source
          src={`${base}/metaverse-rang.mp4`}
          type="video/mp4"
        />
      </video>
    );
  }

  return (
    <video
      key="mobile"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 w-full h-full object-fill"
    >
      <source src={`${base}/mob2.mp4`} type="video/mp4" />
    </video>
  );
}

