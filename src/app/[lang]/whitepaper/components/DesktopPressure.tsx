"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

type DesktopPressureProps = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  className?: string;
};

export default function DesktopPressure({
  left,
  center,
  right,
  className = "",
}: DesktopPressureProps) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 1.5,
          ease: "power1.inOut",
          force3D: true,
        },
      });

      tl.to(
        leftRef.current,
        {
          x: "99.9%",
        },
        0
      );

      tl.to(
        rightRef.current,
        {
          x: "-99.6%",
        },
        0
      );

      tl.to(
        centerRef.current,
        {
          width: "30%",
        },
        0
      );

      const timer = setTimeout(() => {
        tl.play();
      }, 1500);

      return () => clearTimeout(timer);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`relative w-full h-screen overflow-hidden ${className}`}
      style={{
        contain: "layout paint",
      }}
    >
      {/* Center */}
      <div
        ref={centerRef}
        className="absolute left-1/2 top-1/2 z-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[40px]"
        style={{
          willChange: "width",
          contain: "layout paint",
          backfaceVisibility: "hidden",
        }}
      >
        {center}
      </div>

      {/* Left */}
      <div
        ref={leftRef}
        className="absolute top-0 left-[-35%] z-20 h-full w-[35%] overflow-hidden rounded-r-[40px]"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {left}
      </div>

      {/* Right */}
      <div
        ref={rightRef}
        className="absolute top-0 right-[-35%] z-20 h-full w-[35%] overflow-hidden rounded-l-[40px]"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {right}
      </div>
    </section>
  );
}