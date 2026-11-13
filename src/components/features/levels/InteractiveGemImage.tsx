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
  const sparkleLayerRef = useRef<HTMLDivElement | null>(null);

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

    // Recreate the reference's cursor-trail diamond stars only where the
    // pointer moves. Keep the DOM bounded and let CSS handle their fade-out.
    const sparkleLayer = sparkleLayerRef.current;
    if (sparkleLayer && Math.random() > 0.58 && sparkleLayer.childElementCount < 12) {
      const starSize = 18 + Math.random() * 18;
      const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      star.setAttribute("viewBox", "0 0 24 24");
      star.setAttribute("aria-hidden", "true");
      star.setAttribute("focusable", "false");
      star.classList.add("gem-trail-star");
      Object.assign(star.style, {
        left: `${event.clientX - bounds.left - starSize / 2}px`,
        top: `${event.clientY - bounds.top - starSize / 2}px`,
        width: `${starSize}px`,
        height: `${starSize}px`,
      });

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z");
      path.setAttribute("fill", "#FEF9C3");
      star.appendChild(path);

      const core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      core.setAttribute("cx", "12");
      core.setAttribute("cy", "12");
      core.setAttribute("r", "2.2");
      core.setAttribute("fill", "#FFFFFF");
      star.appendChild(core);

      star.addEventListener("animationend", () => star.remove(), { once: true });
      sparkleLayer.appendChild(star);
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
          className="gem-light pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 [background:radial-gradient(ellipse_at_var(--gem-pointer-x)_var(--gem-pointer-y),rgba(255,255,235,0.78),rgba(255,255,255,0.28)_20%,rgba(220,255,130,0.16)_38%,transparent_62%)]"
          style={{ mixBlendMode: "screen" }}
        />

        <div
          ref={sparkleLayerRef}
          aria-hidden="true"
          className="gem-sparkle-layer pointer-events-none absolute inset-0 overflow-hidden"
        />
      </div>

      <style jsx>{`
        .facet-top { opacity: var(--facet-top, 0.22); }
        .facet-bottom { opacity: var(--facet-bottom, 0.22); }
        .facet-left { opacity: var(--facet-left, 0.22); }
        .facet-right { opacity: var(--facet-right, 0.22); }
        .facet-center { opacity: var(--facet-center, 0.22); }

        [data-active="true"] .gem-light { opacity: 1; }

        .gem-trail-star {
          position: absolute;
          display: block;
          overflow: visible;
          filter: drop-shadow(0 0 5px #fff) drop-shadow(0 0 12px var(--gem-glow)) drop-shadow(0 0 20px var(--gem-glow));
          animation: diamond-star 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        [data-active="true"] > div {
          box-shadow: 0 0 28px 5px var(--gem-glow), 0 0 64px 18px var(--gem-glow), 0 22px 52px -10px var(--gem-glow);
        }

        @keyframes diamond-star {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(45deg); opacity: 1; }
          100% { transform: scale(0) rotate(90deg); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gem-trail-star { animation: none !important; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
