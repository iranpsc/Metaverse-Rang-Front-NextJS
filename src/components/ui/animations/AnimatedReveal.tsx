"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function AnimatedReveal({
  children,
  className = "",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const scroller = document.getElementById("page-scroll");

      const cards = Array.from(
        sectionRef.current.querySelectorAll<HTMLElement>(".reveal-item")
      );

      if (cards.length <= 1) return;

      const STEP = 200;

      cards.slice(1).forEach((card, index) => {
        const offset = (index + 1) * STEP;

        gsap.set(card, {
          marginTop: offset,
        });

        gsap.to(card, {
          marginTop: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller,
            start: "top center",
            end: `+=${STEP + index * 20}`,
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`grid grid-cols-1 lg:grid-cols-3 gap-[2px] ${className}`}
    >
      {React.Children.map(children, (child, index) => (
        <div className="reveal-item" key={index}>
          {child}
        </div>
      ))}
    </div>
  );
}