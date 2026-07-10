"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

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
useEffect(() => {
  if (!topRef.current || !bottomRef.current || !centerRef.current) return;

  const topHeight = topRef.current.offsetHeight;
  const bottomHeight = bottomRef.current.offsetHeight;

  gsap.set(topRef.current, {
    y: -topHeight,
  });

  gsap.set(bottomRef.current, {
    y: bottomHeight,
  });

  gsap.set(centerRef.current, {
    top: 0,
    bottom: 0,
  });

  const tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 1.5,
      ease: "power2.inOut",
    },
  });

  tl.to(
    topRef.current,
    {
      y: -2,
    },
    0
  );

  tl.to(
    bottomRef.current,
    {
      y: 2,
    },
    0
  );

  tl.to(
    centerRef.current,
    {
      top: topHeight,
      bottom: bottomHeight,
    },
    0
  );

  const timer = setTimeout(() => {
    tl.play();
  }, 1500);

  return () => clearTimeout(timer);
}, []);
    return (
    <section
      className={`relative h-screen w-full overflow-hidden ${className}`}
    >
      {/* Center */}

      <div
        ref={centerRef}
        className="
          absolute
          inset-0
          z-10
          overflow-hidden
          rounded-[32px]
        "
      >
        {center}
      </div>

      {/* Top */}

      <div
        ref={topRef}
        className="
          absolute
          left-0
          top-0
          z-20
          w-full
          overflow-hidden
          rounded-b-[32px]
         
        "
      >
        {left}
      </div>

      {/* Bottom */}

      <div
        ref={bottomRef}
        className="
          absolute
          bottom-0
          left-0
          z-20
          w-full
          overflow-hidden
          rounded-t-[32px]
        "
      >
        {right}
      </div>
    </section>
  );
}