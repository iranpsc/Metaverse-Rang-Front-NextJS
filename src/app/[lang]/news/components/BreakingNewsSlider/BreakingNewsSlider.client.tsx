"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import BreakingNewsSkeleton from "./Skeleton";
import { Calender, Timer, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/formatNumber";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

export default function BreakingNewsSliderClient({
  news,
  lang,
  mainData,
}: any) {
  const [ready, setReady] = useState(false);
  const initDone = useRef(false);
const isRTL = lang === "fa" ;
  return (
    <div className="relative w-full h-full">
      {/* ✅ Skeleton واقعاً paint می‌شود */}
      {!ready && <BreakingNewsSkeleton />}

      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <Swiper
          modules={[EffectCoverflow, Navigation]}
          effect="coverflow"
          centeredSlides
          slidesPerView="auto"
           navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
          loop
          coverflowEffect={{
            rotate: 0,
            stretch: 260,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          onInit={() => {
            if (initDone.current) return;
            initDone.current = true;

            // 🔑 کلید حل مشکل
            requestAnimationFrame(() => {
              setReady(true);
            });
          }}
          className="w-full h-full"
        >
          {news.map((item: any, index: number) => (
            <SwiperSlide
              key={item.id}
              className="!w-[75%]  md:!w-[65%] lg:!w-[58%] relative"
            >
                      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6 md:p-8 lg:p-10 text-white flex flex-col items-center justify-center gap-5">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="334"
                    height="58"
                    viewBox="0 0 334 58"
                    fill="none"
                    className="!w-[200px] lg:!w-auto"
                  >
                    <path d="M37.4028 1.17969H333.473L310.473 57.1797H11.9727L37.4028 1.17969Z" fill="#F10011" />
                    <path d="M29.8672 1.20497L32.9092 1.11013L8.41406 57.1094L6.41406 54.6094L29.8672 1.20497Z" fill="#F10011" />
                    <path d="M24.5872 1.86955L26.2543 1.27784L3.54634 52.8965L2.88089 51.112L24.5872 1.86955Z" fill="#F10011" />
                    <path d="M20.8645 2.40607L21.9633 1.64997L0.699874 49.8665L0.553442 48.4093L20.8645 2.40607Z" fill="#F10011" />
                    <path d="M178.377 1H333.736L310.986 57H178.377L155.66 32.1512C154.281 30.6432 154.261 28.3385 155.613 26.8062L178.377 1Z" fill="white" className="dark:fill-black" />
                    <text className="fill-black dark:fill-white"><tspan x={isRTL ? 270 : 260}  y="36.3237" className="text-xl lg:text-3xl !font-rokh !font-extrabold !text-black dark:!text-white">{findByUniqueId(mainData, 1616) || "خبر"}</tspan></text>
                    <text className="fill-black dark:fill-white"><tspan x={isRTL ? 120 : 70} y="36.3237" className="text-xl lg:text-3xl !font-rokh !font-extrabold !text-black dark:!text-white">{findByUniqueId(mainData, 1617) || "فوری"}</tspan></text>
                  </svg>
                </div>

                <Link
                  href={`/${lang}/news/${item.slug}`}
                  className="block lg:text-2xl text-xl 3xl:text-3xl font-rokh text-center font-bold leading-tight md:leading-snug tracking-tight transition-all duration-300 line-clamp-1"
                >
                  {item.title}
                </Link>

                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base font-medium text-dark-gray">
                  <div className="flex items-center gap-2">
                    <span>{formatNumber(item.stats?.views ?? 0)}</span>
                    <View className="stroke-dark-gray stroke-2 size-5" />
                  </div>
                  |
                  <div className="flex items-center gap-2">
                    <span>{item.date}</span>
                    <Calender className="stroke-dark-gray size-5" />
                  </div>
                  |
                  <div className="flex items-center gap-2">
                    <span>{item.readingTime} دقیقه مطالعه</span>
                    <Timer className="stroke-dark-gray stroke-2 size-5" />
                  </div>
                </div>
              </div>
              <div className="relative h-full rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <Image
                  src={item.image}
                  alt={"slyder" + item.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 54vw"
                  className="object-cover"
                  quality={60}
                  priority={index === 0}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              </div>
            </SwiperSlide>
          ))}
                  <div className="absolute top-[240px] w-full flex justify-center items-center">
          <div className="flex  justify-between items-center !w-[85%] md:!w-[65%] lg:!w-[58%] 3xl:!w-[61%]">
            <div className="swiper-button-prev !font-bold !static !text-white dark:!text-black after:!text-xl dark:after:!text-black !text-xl !w-12 !h-12 transition select-none bg-light-primary dark:bg-dark-yellow rounded-full p-3 aspect-square" />
            <div className="swiper-button-next !font-bold !static !text-white after:!text-xl dark:!text-black dark:after:!text-black !w-12 !h-12 transition select-none bg-light-primary dark:bg-dark-yellow rounded-full p-3 aspect-square" />
          </div>
        </div>
        </Swiper>
      </div>
    </div>
  );
}