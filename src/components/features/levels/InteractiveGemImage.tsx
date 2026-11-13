"use client";

import Image from "next/image";
import { useCallback, useRef, type CSSProperties, type PointerEvent } from "react";

type InteractiveGemImageProps = {
  src: string;
  glowColor?: string;
  alt?: string;
};

const MAX_TILT_DEGREES = 10;

export default function InteractiveGemImage({
  src,
  glowColor,
  alt = "Gem",
}: InteractiveGemImageProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    // Touch input has no hover; keep the image static and avoid fighting scroll.
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const shell = shellRef.current;
    const stage = stageRef.current;
    if (!shell || !stage) return;

    const bounds = shell.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    const tiltY = (0.5 - y) * MAX_TILT_DEGREES * 2;
    const tiltX = (x - 0.5) * MAX_TILT_DEGREES * 2;

    // Update compositor-friendly transforms directly; no React state per pointer event.
    stage.style.transform = `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;

    const pointerX = `${(x * 100).toFixed(1)}%`;
    const pointerY = `${(y * 100).toFixed(1)}%`;
    shell.style.setProperty("--gem-pointer-x", pointerX);
    shell.style.setProperty("--gem-pointer-y", pointerY);
    shell.style.setProperty("--facet-top", (0.15 + (1 - y) * 0.55).toFixed(2));
    shell.style.setProperty("--facet-bottom", (0.15 + y * 0.55).toFixed(2));
    shell.style.setProperty("--facet-left", (0.15 + (1 - x) * 0.55).toFixed(2));
    shell.style.setProperty("--facet-right", (0.15 + x * 0.55).toFixed(2));
    shell.style.setProperty("--facet-center", (0.2 + (1 - Math.abs(x - 0.5) * 2) * 0.5).toFixed(2));
    shell.dataset.active = "true";
  }, []);

  const resetPointer = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;

    const shell = shellRef.current;
    const stage = stageRef.current;
    if (!shell || !stage) return;

    shell.dataset.active = "false";
    stage.style.transform = "rotateX(0deg) rotateY(0deg)";
    shell.style.setProperty("--gem-pointer-x", "50%");
    shell.style.setProperty("--gem-pointer-y", "42%");
  }, []);

  return (
    <div
      ref={shellRef}
      data-active="false"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative aspect-5/7 w-full overflow-visible [perspective:900px] [--gem-pointer-x:50%] [--gem-pointer-y:42%]"
      style={{ "--gem-glow": glowColor || "transparent" } as CSSProperties}
    >
      <div
        ref={stageRef}
        className="relative h-full w-full overflow-hidden rounded-xl [transform-style:preserve-3d] [will-change:transform]"
        style={{ transition: "transform 90ms ease-out" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 90vw, 40vw"
          className="rounded-xl object-cover"
          onError={() => console.error("ImageBox: failed to load gem PNG:", src)}
        />

        {/* Moving light highlights the cut facets without repainting the source image. */}
        <div
          aria-hidden="true"
          className="gem-light pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 [background:radial-gradient(ellipse_at_var(--gem-pointer-x)_var(--gem-pointer-y),rgba(255,255,230,0.42),rgba(255,255,255,0.10)_18%,transparent_48%)]"
          style={{ mixBlendMode: "screen" }}
        />

        <svg
          aria-hidden="true"
          viewBox="0 0 100 140"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full rounded-xl opacity-30 mix-blend-screen"
        >
          <path d="M50 3 8 31 19 104 50 137 81 104 92 31Z" fill="none" stroke="white" strokeOpacity=".5" strokeWidth=".7" />
          <path d="M8 31 50 45 92 31M19 104 50 45 81 104M8 31 50 3 92 31M19 104 50 137 81 104" fill="none" stroke="white" strokeOpacity=".58" strokeWidth=".65" />
          <path className="facet facet-top" d="M50 3 50 45 8 31Z M50 3 92 31 50 45Z" fill="white" />
          <path className="facet facet-left" d="M8 31 19 104 50 45Z" fill="white" />
          <path className="facet facet-right" d="M92 31 81 104 50 45Z" fill="white" />
          <path className="facet facet-bottom" d="M19 104 50 137 50 45Z M81 104 50 137 50 45Z" fill="white" />
          <path className="facet facet-center" d="M50 3 50 45 92 31 81 104 50 137 19 104 8 31Z" fill="white" />
        </svg>

        <svg
          aria-hidden="true"
          viewBox="0 0 64 64"
          className="gem-sparkles pointer-events-none absolute h-16 w-16 opacity-0"
          style={{
            left: "var(--gem-pointer-x)",
            top: "var(--gem-pointer-y)",
            color: glowColor || "#fff2a6",
            transform: "translate(-50%, -50%)",
          }}
        >
          <path d="M32 2 37 25 62 32 37 37 32 62 26 37 2 32 26 25Z" fill="currentColor" />
          <path d="M8 8 11 17 20 20 11 23 8 32 5 23 0 20 5 17Z" fill="white" opacity=".8" />
          <circle cx="51" cy="11" r="2.5" fill="white" />
        </svg>
      </div>

      <style jsx>{`
        .facet-top { opacity: var(--facet-top, 0.22); }
        .facet-bottom { opacity: var(--facet-bottom, 0.22); }
        .facet-left { opacity: var(--facet-left, 0.22); }
        .facet-right { opacity: var(--facet-right, 0.22); }
        .facet-center { opacity: var(--facet-center, 0.22); }

        [data-active="true"] .gem-light { opacity: 1; }

        [data-active="true"] .gem-sparkles {
          opacity: 0.9;
          animation: gem-sparkle 850ms ease-in-out infinite alternate;
        }

        [data-active="true"] > div {
          box-shadow: 0 12px 32px -16px var(--gem-glow);
        }

        @keyframes gem-sparkle {
          from { scale: 0.78; }
          to { scale: 1.08; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gem-sparkles { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
