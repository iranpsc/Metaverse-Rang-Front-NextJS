"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// این باید بیرون کامپوننت و یک بار در سطح ماژول تعریف بشه
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type MobilePressureProps = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  className?: string;
};

export default function MobilePressure({
  left,
  center,
  right,
  className = "",
}: MobilePressureProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!topRef.current || !bottomRef.current || !centerRef.current) return;

    const topHeight = topRef.current.offsetHeight;
    const bottomHeight = bottomRef.current.offsetHeight;

    // پوزیشن اولیه + نمایان کردن، همه با هم و سینک
    gsap.set(topRef.current, { y: -topHeight, autoAlpha: 1 });
    gsap.set(bottomRef.current, { y: bottomHeight, autoAlpha: 1 });
    gsap.set(centerRef.current, { top: 0, bottom: 0 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 1.5, ease: "power2.inOut" },
    });

    tl.to(topRef.current, { y: -2 }, 0);
    tl.to(bottomRef.current, { y: 2 }, 0);
    tl.to(centerRef.current, { top: topHeight, bottom: bottomHeight }, 0);

    const timer = setTimeout(() => {
      tl.play();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`relative h-screen w-full overflow-hidden ${className}`}>
      <div
        ref={centerRef}
        className="absolute inset-0 z-10 overflow-hidden rounded-[32px]"
      >
        {center}
      </div>

      <div
        ref={topRef}
        style={{ visibility: "hidden" }}
        className="absolute left-0 top-0 z-20 w-full overflow-hidden rounded-b-[32px]"
      >
        {left}
      </div>

      <div
        ref={bottomRef}
        style={{ visibility: "hidden" }}
        className="absolute bottom-0 left-0 z-20 w-full overflow-hidden rounded-t-[32px]"
      >
        {right}
      </div>
    </section>
  );
}