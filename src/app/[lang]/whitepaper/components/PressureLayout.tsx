"use client";

import React, {
  ReactNode,
  useEffect,
  useRef,
} from "react";
import gsap from "gsap";


type PressureLayoutProps = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  className?: string;
};

export default function PressureLayout({
  left,
  center,
  right,
  className = "",
}: PressureLayoutProps) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const id = requestAnimationFrame(() => {
    const desktop = window.innerWidth > 900;

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 1.5,
        ease: "power1.inOut",
        force3D: true,
      },
    });

    if (desktop) {
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
    } else {
      tl.to(leftRef.current,{
    y:"100%",
},0);

tl.to(rightRef.current,{
    y:"-100%",
},0);

      tl.to(
        rightRef.current,
        {
          y: "-45vh",
        },
        0
      );

      tl.to(
        centerRef.current,
        {
          width: "40%",
        },
        0
      );
    }

    const timer = setTimeout(() => {
      tl.play();
    }, 1500);

    return () => clearTimeout(timer);
  });

  return () => cancelAnimationFrame(id);
}, []);

  return (
    <section   style={{
    contain: "layout paint",
  }}
      className={`relative w-full h-screen overflow-hidden  ${className}`}
    >
      {/* وسط */}
      <div
        style={{
    willChange: "width",
    contain: "layout paint",
    backfaceVisibility: "hidden",
  }}
        ref={centerRef}
        className="absolute left-1/2 top-1/2 z-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[40px] bg-white"
      >
        {center}
      </div>

      {/* چپ */}
      <div
       style={{
    willChange: "transform",
    backfaceVisibility: "hidden",
    transform: "translateZ(0)",
  }}
        ref={leftRef}
        className="
absolute
top-[-100%]
left-0
z-20
h-1/2
w-full
overflow-hidden
rounded-b-[40px]
lg:top-0
lg:left-[-35%]
lg:h-full
lg:w-[35%]
lg:rounded-r-[40px]
lg:rounded-b-none
"
      >
        {left}
      </div>

      {/* راست */}
      <div
      style={{
    willChange: "transform",
    backfaceVisibility: "hidden",
    transform: "translateZ(0)",
  }}
        ref={rightRef}
       className="
absolute
bottom-[-100%]
left-0
z-20
h-1/2
w-full
overflow-hidden
rounded-t-[40px]
lg:bottom-auto
lg:top-0
lg:left-auto
lg:right-[-35%]
lg:h-full
lg:w-[35%]
lg:rounded-l-[40px]
lg:rounded-t-none
"
      >
        {right}
      </div>
    </section>
  );
}