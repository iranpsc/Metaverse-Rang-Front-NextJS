"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/utils/lib/supabaseClient";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { Calender, Timer, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/formatNumber";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
type NewsItem = {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  readingTime: string;
  stats: { views?: any };
};

export default function BreakingNewsSlider({ lang , mainData }: any) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);

      const { data } = await supabase
        .from("news")
        .select("id,title,slug,image,date,readingTime,stats")
        .order("date", { ascending: false })
        .limit(7);

      setNews(data || []);
      setIsLoading(false);
    };

    fetchNews();
  }, []);

  // ────────────────────────────────
  //        اسکلتون شبیه به اسلایدر (چند کارت با افکت coverflow-like)
  // ────────────────────────────────
  if (isLoading) {
    return (
      <div className="w-full mt-10 relative px-4 sm:px-6 lg:px-8">
        <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(
            90deg,
            #d4d4d4 25%,
            #e5e5e5 50%,
            #d4d4d4 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.8s infinite linear;
        }
          .dark .shimmer {
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.8s infinite linear;
        }


      `}</style>

        <div className="relative w-full flex justify-center h-[480px] rounded-x-xl">
          <div className="skeleton-slide prev w-[200px] h-[84%] mt-[40px] rounded-xl overflow-hidden bg-neutral-300  dark:bg-neutral-800/70 shimmer shadow-2xl me-[-15px]" />
          {/* کارت مرکزی */}
          <div className="skeleton-slide z-10 !w-[82%] sm:!w-[75%] md:!w-[65%] lg:!w-[58%] xl:!w-[60%] h-full rounded-xl overflow-hidden bg-neutral-300  dark:bg-neutral-800 shimmer shadow-2xl flex items-end ">
            {/* محتوای placeholder همان قبلی */}
            <div className="w-full  z-20 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center gap-5">
              {/* بج فوری خبر - سعی کن اندازه واقعی رو بگیری */}

              <div className="w-5/6 lg:w-4/5 h-9 lg:h-11 bg-white/25 rounded-lg shimmer" />
              <div className="w-3/5 lg:w-2/3 h-7 lg:h-9 bg-white/15 rounded-lg shimmer mt-1" />

              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-2 text-sm md:text-base opacity-80">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-white/35 rounded-full" />
                  <div className="w-16 h-5 bg-white/25 rounded shimmer" />
                </div>
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-1" />
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-white/35 rounded-full" />
                  <div className="w-24 h-5 bg-white/25 rounded shimmer" />
                </div>
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-1" />
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-white/35 rounded-full" />
                  <div className="w-32 h-5 bg-white/25 rounded shimmer" />
                </div>
              </div>
            </div>
          </div>
          <div className="skeleton-slide prev w-[200px] h-[84%] mt-[40px] rounded-xl overflow-hidden bg-neutral-300 dark:bg-neutral-800/70 shimmer shadow-2xl ms-[-15px]" />
          {/* کارت‌های دورتر اگر می‌خواهی */}
          {/* <div className="skeleton-slide other hidden lg:block ..." style={{ transform: 'translateX(-140%) scale(0.85)' }} /> */}
          {/* <div className="skeleton-slide other hidden lg:block ..." style={{ transform: 'translateX(140%) scale(0.85)' }} /> */}

        </div>
      </div>
    );
  }

  if (!news.length) return null;

  // ────────────────────────────────
  //          Swiper اصلی بدون تغییر
  // ────────────────────────────────
  return (

    <div className="w-full mt-10 relative px-4 sm:px-6 lg:px-8">

      <style jsx global>{`
        .swiper-slide {
          transition: all 0.6s ease;
          filter: brightness(0.9) !important;
        }
          .dark .swiper-slide {
          transition: all 0.6s ease;
          filter: brightness(0.6) !important;
        }
        .swiper-slide-active {
          filter: brightness(1) !important;
        }
          .dark .swiper-slide-active {
          filter: brightness(1) !important;
        }

        // .swiper-slide-next,
        // .swiper-slide-prev {
        //   filter: brightness(0.4) !important;
        // }

        // .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-next):not(.swiper-slide-prev) {
        //   filter: brightness(0.2) !important;
        // }
      `}</style>

      <Swiper
        modules={[EffectCoverflow, Navigation, Autoplay]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        initialSlide={1}
        loop
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        // autoplay={{ delay: 4500, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 260,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        className="w-full rounded-x-xl h-[480px] static"
      >
        {news.map((item) => (
          <SwiperSlide
            key={item.id}
            className="!w-[82%] sm:!w-[75%] md:!w-[65%] lg:!w-[58%] xl:!w-[60%] relative"
          >
            <div className="relative h-full rounded-xl overflow-hidden  ">
              <Image
                src={item.image}
                alt={item.title + "pic"}
                fill
                className="object-cover "
                priority={news.indexOf(item) < 2}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

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
                    <text className="fill-black dark:fill-white"><tspan x="270" y="36.3237" className="text-xl lg:text-3xl !font-rokh !font-extrabold !text-black dark:!text-white">{findByUniqueId(mainData, 1616) || "خبر"}</tspan></text>
                    <text className="fill-black dark:fill-white"><tspan x="120" y="36.3237" className="text-xl lg:text-3xl !font-rokh !font-extrabold !text-black dark:!text-white">{findByUniqueId(mainData, 1617) || "فوری"}</tspan></text>
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
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute top-[240px] w-full flex justify-center items-center">
          <div className="flex w-full justify-between items-center xl:!w-[63%] ">
            <div className="swiper-button-prev !font-bold !static !text-white after:!text-xl dark:after:!text-black !w-12 !h-12 transition select-none bg-light-primary dark:bg-dark-yellow rounded-full p-1 aspect-square" />
            <div className="swiper-button-next !font-bold !static !text-white after:!text-xl dark:after:!text-black !w-12 !h-12 transition select-none bg-light-primary dark:bg-dark-yellow rounded-full p-1 aspect-square" />
          </div>
        </div>
      </Swiper>
    </div>
  );
}