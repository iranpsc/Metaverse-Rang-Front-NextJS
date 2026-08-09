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
  bgImage?: string;
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
        Z
      `;

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
        Z
      `;

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
        Z
      `;

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
        Z
      `;
  }
}

export default function ClipSection({
  children,
  className = "",
  style,
  corner = "tr",
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

  const [size, setSize] = useState<{
    w: number;
    h: number;
  } | null>(null);

  const padding = borderWidth / 2;

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();

      if (rect.width > 0 && rect.height > 0) {
        setSize({
          w: rect.width,
          h: rect.height,
        });
      }
    };

    updateSize();

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) return;

      const { width, height } = entry.contentRect;

      if (width > 0 && height > 0) {
        setSize({
          w: width,
          h: height,
        });
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const pathD = size
    ? buildPath(
        size.w,
        size.h,
        corner,
        radius,
        cornerSize,
        cornerRadius
      )
    : "";

return (
<div
  ref={ref}
  className={`relative ${className}`}
  style={style}
>
  {/* fallback background تا قبل از آماده شدن clip */}
  {!size && (
    <div
      className="absolute inset-0 bg-current"
      aria-hidden="true"
    />
  )}

  {size && (
    <svg
      className="absolute inset-0 h-full w-full overflow-visible pointer-events-none"
      viewBox={`${-padding} ${-padding} ${
        size.w + borderWidth
      } ${size.h + borderWidth}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={pathD} />
        </clipPath>
      </defs>

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
        <path
          d={pathD}
          fill="currentColor"
        />
      )}

      {borderWidth > 0 && (
        <path
          d={pathD}
          fill="none"
          className={borderClassName}
          stroke="currentColor"
          strokeWidth={borderWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  )}

  <div className="relative z-10 w-full">
    {children}
  </div>
</div>
);
}