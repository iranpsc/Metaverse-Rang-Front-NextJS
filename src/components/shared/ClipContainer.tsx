"use client";

import React, { CSSProperties, useEffect, useRef, useState } from "react";
import style from "styled-jsx/style";

type Corner = "tr" | "tl" | "br" | "bl";

type ClipSectionProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  corner?: Corner;
  radius?: number;
  cornerSize?: number;
  cornerRadius?: number;

  borderClassName?: string; // کلاس تلویند برای رنگ
  borderWidth?: number;      // ضخامت
};

function buildPath(
  w: number,
  h: number,
  corner: Corner,
  r: number,
  size: number,
  cr: number
) {
  switch (corner) {
    case "tr":
      return `
      M ${r} 0
      L ${w - size - cr} 0
      Q ${w - size} 0 ${w - size + cr} ${cr}
      L ${w - cr} ${size - cr}
      Q ${w} ${size} ${w} ${size + cr}
      L ${w} ${h - r}
      Q ${w} ${h} ${w - r} ${h}
      L ${r} ${h}
      Q 0 ${h} 0 ${h - r}
      L 0 ${r}
      Q 0 0 ${r} 0
      Z`;

    case "tl":
      return `
      M ${size + cr} 0
      L ${w - r} 0
      Q ${w} 0 ${w} ${r}
      L ${w} ${h - r}
      Q ${w} ${h} ${w - r} ${h}
      L ${r} ${h}
      Q 0 ${h} 0 ${h - r}
      L 0 ${size + cr}
      Q 0 ${size} ${cr} ${size - cr}
      L ${size - cr} ${cr}
      Q ${size} 0 ${size + cr} 0
      Z`;

    case "br":
      return `
      M ${r} 0
      L ${w - r} 0
      Q ${w} 0 ${w} ${r}
      L ${w} ${h - size - cr}
      Q ${w} ${h - size} ${w - cr} ${h - size + cr}
      L ${w - size + cr} ${h - cr}
      Q ${w - size} ${h} ${w - size - cr} ${h}
      L ${r} ${h}
      Q 0 ${h} 0 ${h - r}
      L 0 ${r}
      Q 0 0 ${r} 0
      Z`;

    case "bl":
      return `
      M ${r} 0
      L ${w - r} 0
      Q ${w} 0 ${w} ${r}
      L ${w} ${h - r}
      Q ${w} ${h} ${w - r} ${h}
      L ${size + cr} ${h}
      Q ${size} ${h} ${size - cr} ${h - cr}
      L ${cr} ${h - size + cr}
      Q 0 ${h - size} 0 ${h - size - cr}
      L 0 ${r}
      Q 0 0 ${r} 0
      Z`;
  }
}

export default function ClipSection({
  children,
  className = "",
  corner = "tr",
  style,
  radius = 32,
  cornerSize = 120,
  cornerRadius = 16,
  borderClassName = "",
  borderWidth = 0,
}: ClipSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({
    w: 1,
    h: 1,
  });
const padding = borderWidth / 2;
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setSize({
        w: entry.contentRect.width,
        h: entry.contentRect.height,
      });
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative  ${className}`} style={style}>
<svg
  className="absolute overflow-visible inset-0 w-full h-full pointer-events-none"
  viewBox={`${-padding} ${-padding} ${size.w + borderWidth} ${size.h + borderWidth}`}
  preserveAspectRatio="none"
>
  {/* Background */}
  <path
    d={buildPath(
      size.w,
      size.h,
      corner,
      radius,
      cornerSize,
      cornerRadius
    )}
    fill="currentColor"
  />

  {/* Border */}
  <path
  d={buildPath(
    size.w,
    size.h,
    corner,
    radius,
    cornerSize,
    cornerRadius
  )}
  fill="none"
  className={borderClassName}
  stroke="currentColor"
  strokeWidth={borderWidth}
  strokeLinejoin="round"
  strokeLinecap="round"
  vectorEffect="non-scaling-stroke"
/>
</svg>

      <div className="relative z-10 w-full ">{children}</div>
    </div>
  );
}