"use client";

import React, { useEffect, useId, useRef, useState } from "react";

type Corner = "tr" | "tl" | "br" | "bl";

type ClipSectionProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  corner?: Corner;
  radius?: number;
  cornerSize?: number;
  cornerRadius?: number;

  borderClassName?: string;
  borderWidth?: number;

  bgImage?: string; // 👈 آدرس عکس، به جای <Image> توی children
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
  bgImage,
}: ClipSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const clipId = `clip-${reactId.replace(/:/g, "")}`;

  const [size, setSize] = useState({ w: 1, h: 1 });
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

  const pathD = buildPath(size.w, size.h, corner, radius, cornerSize, cornerRadius);

  return (
    <div ref={ref} className={`relative ${className}`} style={style}>
      <svg
        className="absolute overflow-visible inset-0 w-full h-full pointer-events-none"
        viewBox={`${-padding} ${-padding} ${size.w + borderWidth} ${size.h + borderWidth}`}
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={pathD} />
          </clipPath>
        </defs>

        {/* اگر عکس داده شده باشه، به جای رنگ پس‌زمینه، عکس رو دقیقاً با همون شکل کلیپ می‌کنیم */}
        {bgImage ? (
          <image
            href={bgImage}
            x={0}
            y={0}
            width={size.w}
            height={size.h}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
        ) : (
          <path d={pathD} fill="currentColor" />
        )}

        {/* Border */}
        <path
          d={pathD}
          fill="none"
          className={borderClassName}
          stroke="currentColor"
          strokeWidth={borderWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pointerEvents="none"
        />
      </svg>

      <div className="relative z-10 w-full ">{children}</div>
    </div>
  );
}