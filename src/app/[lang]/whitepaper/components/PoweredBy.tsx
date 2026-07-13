// components/PoweredBy.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import ClipButton from "@/components/shared/ClipButton";

interface PoweredByProps {
  params: { lang: string };
  mainData: any;
}

// 👇 هماهنگ با تایمینگ DesktopPressure (1500ms delay + 1500ms duration فاز اول)
const ANIMATION_START_DELAY = 3000;

// 👇 ارتفاع نهایی کارت متن بعد از کوچیک شدن (پیکسل) - فقط دسکتاپ
const TEXT_CARD_FINAL_HEIGHT = 370;

export default function PoweredBy({ mainData, params }: PoweredByProps) {
  const title = findByUniqueId(mainData, 1653);
  const subtitle = findByUniqueId(mainData, 1654);
  const description = findByUniqueId(mainData, 1656);

  const textCardRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textCardRef.current || !imageCardRef.current) return;

    // این انیمیشن فقط برای دسکتاپ (lg به بالا) هست
    const mql = window.matchMedia("(min-width: 1024px)");
    if (!mql.matches) return;

    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        defaults: {
          duration: 1.2,
          ease: "power2.inOut",
        },
      });

      tl.to(textCardRef.current, { height: TEXT_CARD_FINAL_HEIGHT }, 0);
      tl.to(imageCardRef.current, { top: TEXT_CARD_FINAL_HEIGHT }, 0);
    }, ANIMATION_START_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col lg:relative lg:h-full lg:w-full lg:block lg:overflow-hidden lg:rounded-b-[32px]">
      {/* TEXT CARD */}
      <div
        ref={textCardRef}
        className="
          bg-white border border-solid border-[#f5f5f5] dark:border-black dark:bg-[#1A1A18]
          w-full 2xl:!leading-9 h-max flex flex-col justify-start items-center
          p-5 lg:pt-7 lg:px-10 rounded-xl lg:rounded-[32px] dark:text-white lg:text-xl leading-9
          lg:absolute lg:inset-x-0 lg:top-0 lg:z-20 lg:h-full
        "
        style={{
          willChange: "height",
          backfaceVisibility: "hidden",
        }}
      >
        <p>{title}</p>
      </div>

      {/* IMAGE CARD - فقط lg به بالا رندر/دیده میشه، دقیقاً مثل قبل */}
      <div
        ref={imageCardRef}
        className="
           h-full border border-solid border-[#f5f5f5] dark:border-black
          hidden lg:block bg-white dark:bg-[#1A1A18] rounded-xl lg:rounded-[32px] dark:text-white w-full
          lg:absolute lg:inset-x-0 lg:bottom-0 lg:z-10 lg:overflow-hidden lg:top-full
        "
        style={{
          willChange: "top",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="w-full h-[280px] overflow-hidden rounded-xl lg:rounded-[32px] relative">
          <Image
            src="https://s3.metarang.com/metarang/onepage/testimg.jpg"
            alt="whitepaper"
            fill
            priority
            fetchPriority="high"
            sizes="24vw"
            quality={75}
            decoding="async"
            className="w-full object-cover"
          />
        </div>

        <div className="w-full p-5 pt-3 lg:px-10 pb-10   text-start ">
          <h1 className="font-black pb-3 lg:!text-xl">{subtitle}</h1>
          <p className="ltr:leading-5">{description}</p>
          <ClipButton clip={params.lang == "fa" ? "bl" : "br"}
            className="w-[230px]  h-[60px] group mt-3 cursor-pointer duration-300 hover:text-[#9100D9]">
            <span className="text-white dark:text-black group-hover:text-white pe-3">{findByUniqueId(mainData, 1670)}</span>
            <svg
              className="w-4 h-4 rtl:rotate-180 transition-transform duration-300 group-hover/btn:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path className="text-[#9100D9] group-hover:text-white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </ClipButton>
        </div>
      </div>
    </div>
  );
}