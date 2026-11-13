"use client";

import Image from "next/image";
import { useCallback, useRef, type CSSProperties, type PointerEvent } from "react";

type InteractiveGemImageProps = {
  src: string;
  glowColor?: string;
  alt?: string;
};

const MAX_TILT_DEGREES = 10;
const MAX_SPARKLES = 28;
const STAR_SIZES = [9, 14, 21, 29];

function addSparkle(layer: HTMLDivElement, x: number, y: number) {
  if (layer.childElementCount >= MAX_SPARKLES) return;

  const size = STAR_SIZES[Math.floor(Math.random() * STAR_SIZES.length)];
  const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  star.setAttribute("viewBox", "0 0 24 24");
  star.setAttribute("aria-hidden", "true");
  star.setAttribute("focusable", "false");
  star.classList.add("gem-trail-star");

  const opacity = (0.28 + Math.random() * 0.28).toFixed(2);
  const rotation = Math.round(Math.random() * 90 - 45);
  const driftX = Math.round(Math.random() * 34 - 17);
  const driftY = Math.round(-12 - Math.random() * 30);
  const duration = 900 + Math.round(Math.random() * 650);

  Object.assign(star.style, {
    left: `${x - size / 2}px`,
    top: `${y - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    "--star-opacity": opacity,
    "--star-rotation": `${rotation}deg`,
    "--star-drift-x": `${driftX}px`,
    "--star-drift-y": `${driftY}px`,
    animationDuration: `${duration}ms`,
  } as CSSProperties);

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z");
  path.setAttribute("fill", "#FFFDEB");
  star.appendChild(path);

  const core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  core.setAttribute("cx", "12");
  core.setAttribute("cy", "12");
  core.setAttribute("r", "1.8");
  core.setAttribute("fill", "#FFFFFF");
  star.appendChild(core);

  star.addEventListener("animationend", () => star.remove(), { once: true });
  layer.appendChild(star);
}

export default function InteractiveGemImage({
  src,
  glowColor,
  alt = "Gem",
}: InteractiveGemImageProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const sparkleLayerRef = useRef<HTMLDivElement | null>(null);

  const handlePointerEnter = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const shell = shellRef.current;
    const layer = sparkleLayerRef.current;
    if (!shell || !layer) return;

    shell.dataset.active = "true";
    const bounds = shell.getBoundingClientRect();

    // A soft burst is scattered over the gem as soon as it is hovered.
    for (let i = 0; i < 11; i += 1) {
      addSparkle(layer, 12 + Math.random() * Math.max(1, bounds.width - 24), 12 + Math.random() * Math.max(1, bounds.height - 24));
    }

    // Add a small random glint right around the pointer on entry.
    addSparkle(layer, event.clientX - bounds.left + (Math.random() * 18 - 9), event.clientY - bounds.top + (Math.random() * 18 - 9));
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
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

    stage.style.transform = `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
    shell.style.setProperty("--gem-pointer-x", `${(x * 100).toFixed(1)}%`);
    shell.style.setProperty("--gem-pointer-y", `${(y * 100).toFixed(1)}%`);
    shell.style.setProperty("--facet-top", (0.15 + (1 - y) * 0.55).toFixed(2));
    shell.style.setProperty("--facet-bottom", (0.15 + y * 0.55).toFixed(2));
    shell.style.setProperty("--facet-left", (0.15 + (1 - x) * 0.55).toFixed(2));
    shell.style.setProperty("--facet-right", (0.15 + x * 0.55).toFixed(2));
    shell.style.setProperty("--facet-center", (0.2 + (1 - Math.abs(x - 0.5) * 2) * 0.5).toFixed(2));
    shell.dataset.active = "true";

    // Randomly sprinkle tiny-to-large glints close to the moving cursor.
    const layer = sparkleLayerRef.current;
    if (layer && Math.random() > 0.48) {
      const spread = 22;
      addSparkle(
        layer,
        event.clientX - bounds.left + (Math.random() * spread * 2 - spread),
        event.clientY - bounds.top + (Math.random() * spread * 2 - spread),
      );
    }
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
    shell.style.setProperty("--facet-top", "0.22");
    shell.style.setProperty("--facet-bottom", "0.22");
    shell.style.setProperty("--facet-left", "0.22");
    shell.style.setProperty("--facet-right", "0.22");
    shell.style.setProperty("--facet-center", "0.22");
  }, []);

  return (
    <div
      ref={shellRef}
      data-active="false"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="interactive-gem-image relative aspect-5/7 w-full overflow-visible [perspective:900px] [--gem-pointer-x:50%] [--gem-pointer-y:42%]"
      style={{ "--gem-glow": glowColor || "transparent" } as CSSProperties}
    >
      <div
        ref={stageRef}
        className="gem-stage relative h-full w-full overflow-hidden rounded-xl [transform-style:preserve-3d] [will-change:transform]"
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

        <div
          aria-hidden="true"
          className="gem-light pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 [background:radial-gradient(ellipse_at_var(--gem-pointer-x)_var(--gem-pointer-y),rgba(255,255,245,0.42),rgba(255,255,255,0.16)_20%,rgba(220,255,170,0.10)_38%,transparent_62%)]"
          style={{ mixBlendMode: "screen" }}
        />

        <div
          ref={sparkleLayerRef}
          aria-hidden="true"
          className="gem-sparkle-layer pointer-events-none absolute inset-0 overflow-hidden"
        />
      </div>

      <style jsx global>{`
        .interactive-gem-image[data-active="true"] .gem-light {
          opacity: 1;
        }

        .interactive-gem-image[data-active="true"] .gem-stage {
          box-shadow: 0 0 24px 4px var(--gem-glow), 0 0 48px 12px var(--gem-glow), 0 18px 42px -12px var(--gem-glow);
        }

        .interactive-gem-image .gem-trail-star {
          position: absolute;
          display: block;
          overflow: visible;
          pointer-events: none;
          opacity: 0;
          filter: drop-shadow(0 0 3px rgba(255,255,255,0.55)) drop-shadow(0 0 8px var(--gem-glow));
          animation: interactive-gem-sparkle 1100ms ease-out forwards;
          will-change: transform, opacity;
        }

        @keyframes interactive-gem-sparkle {
          0% {
            transform: translate3d(0, 0, 0) scale(0.35) rotate(0deg);
            opacity: 0;
          }
          24% {
            transform: translate3d(0, 0, 0) scale(1) rotate(var(--star-rotation));
            opacity: var(--star-opacity);
          }
          100% {
            transform: translate3d(var(--star-drift-x), var(--star-drift-y), 0) scale(0.62) rotate(calc(var(--star-rotation) + 55deg));
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .interactive-gem-image .gem-trail-star {
            animation: none !important;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
