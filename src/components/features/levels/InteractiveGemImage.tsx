"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, type CSSProperties, type PointerEvent } from "react";

type InteractiveGemImageProps = {
  src: string;
  glowColor?: string;
  alt?: string;
};

const MAX_TILT_DEGREES = 12;
const MAX_SPARKLES = 20;
const CURSOR_STAR_SIZES = [8, 12, 17, 23];
const AMBIENT_STAR_SIZES = [10, 13, 19, 27, 36, 46,];
// Peak opacity of every star (cursor stars AND ambient stars).
// Each star gets its own random value between MIN and MAX.
const STAR_OPACITY_MIN = 0.20;
const STAR_OPACITY_MAX = 0.85;

const rand = (min: number, max: number) => min + Math.random() * (max - min);

type SparkleKind = "cursor" | "ambient";

// One single function builds every star, so cursor stars and ambient stars
// always get the same random opacity / rotation / drift / timing logic.
function addSparkle(layer: HTMLDivElement, x: number, y: number, kind: SparkleKind = "cursor") {
  if (layer.childElementCount >= MAX_SPARKLES) return;

  const sizes = kind === "ambient" ? AMBIENT_STAR_SIZES : CURSOR_STAR_SIZES;
  const size = sizes[Math.floor(Math.random() * sizes.length)];

  const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  star.setAttribute("viewBox", "0 0 24 24");
  star.setAttribute("aria-hidden", "true");
  star.setAttribute("focusable", "false");
  star.classList.add("gem-trail-star");

  // Random opacity per star.
  const opacity = rand(STAR_OPACITY_MIN, STAR_OPACITY_MAX).toFixed(3);

  // Random fixed angle on the full circle. The star keeps this angle for its whole
  // life (it appears tilted differently from other stars but does not spin).
  const rotation = Math.round(rand(-180, 180));

  const duration = 900 + Math.round(Math.random() * 650);

  star.style.left = `${x - size / 2}px`;
  star.style.top = `${y - size / 2}px`;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.animationDuration = `${duration}ms`;
  // CSS custom properties must be set with setProperty (Object.assign doesn't work for them).
  star.style.setProperty("--star-opacity", opacity);
  star.style.setProperty("--star-rotation", `${rotation}deg`);

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
    for (let i = 0; i < 4; i += 1) {
      addSparkle(
        layer,
        rand(12, Math.max(13, bounds.width - 12)),
        rand(12, Math.max(13, bounds.height - 12)),
        "ambient",
      );
    }

    // Add a small random glint right around the pointer on entry.
    addSparkle(
      layer,
      event.clientX - bounds.left + rand(-9, 9),
      event.clientY - bounds.top + rand(-9, 9),
      "cursor",
    );
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

    // Randomly sprinkle small glints close to the moving cursor.
    const layer = sparkleLayerRef.current;
    if (layer && Math.random() > 0.85) {
      const spread = 20;
      addSparkle(
        layer,
        event.clientX - bounds.left + rand(-spread, spread),
        event.clientY - bounds.top + rand(-spread, spread),
        "cursor",
      );
    }
  }, []);

  // Keep a gentle randomized shimmer running while hovered, even if the pointer stops.
  useEffect(() => {
    const interval = window.setInterval(() => {
      const shell = shellRef.current;
      const layer = sparkleLayerRef.current;
      if (!shell || !layer || shell.dataset.active !== "true") return;

      const bounds = shell.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const count = Math.random() > 0.7 ? 2 : 1;
      for (let i = 0; i < count; i += 1) {
        addSparkle(
          layer,
          rand(10, Math.max(11, bounds.width - 10)),
          rand(10, Math.max(11, bounds.height - 10)),
          "ambient",
        );
      }
    }, 380);

    return () => window.clearInterval(interval);
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
      className="interactive-gem-image relative aspect-5/7 bg-transparent p-5 lg:p-3  w-full overflow-visible [perspective:900px] [--gem-pointer-x:50%] [--gem-pointer-y:42%]"
      style={{ "--gem-glow": glowColor || "transparent" } as CSSProperties}
    >
      <div
        ref={stageRef}
        className="gem-stage relative h-full w-full overflow-hidden bg-transparent rounded-xl  [will-change:transform]"
        style={{ transition: "transform 90ms ease-out, filter 300ms ease-out" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 90vw, 40vw"
          className="rounded-xl object-cover "
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

        /*
          The glow uses drop-shadow instead of box-shadow: drop-shadow follows the
          real shape (alpha) of the PNG, so transparent corners/empty areas get no glow
          and no dark corners appear. Same strength as before, roughly.
        */
        .interactive-gem-image[data-active="true"] .gem-stage {
          filter: drop-shadow(0 0 12px var(--gem-glow)) drop-shadow(0 8px 12px var(--gem-glow));
        }

        .interactive-gem-image .gem-trail-star {
          position: absolute;
          display: block;
          overflow: visible;
          pointer-events: none;
          opacity: 0;
          transform-origin: center center;
          filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.35)) drop-shadow(0 0 6px var(--gem-glow));
          animation-name: interactive-gem-sparkle;
          animation-duration: 1100ms;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
          will-change: transform, opacity;
        }

        /* Each star keeps its own fixed random angle (--star-rotation); no spinning. */
        @keyframes interactive-gem-sparkle {
          0% {
            transform: translate3d(0, 0, 0) scale(0.35) rotate(var(--star-rotation));
            opacity: 0;
          }
          24% {
            transform: translate3d(0, 0, 0) scale(1) rotate(var(--star-rotation));
            opacity: var(--star-opacity);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(0.62) rotate(var(--star-rotation));
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