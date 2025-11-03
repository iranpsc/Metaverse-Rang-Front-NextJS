"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { articles } from "@/components/utils/articles";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { ArrowRight } from "@/components/svgs";

// ✅ Swiper فقط در کلاینت (SSR false)
const Swiper = dynamic(
  async () => (await import("swiper/react")).Swiper,
  { ssr: false }
);



interface LatestArticlesSliderProps {
  params: { lang: string };
  mainData: any;
}

const LatestArticlesSlider = ({ params, mainData }: LatestArticlesSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // ✅ sort فقط یکبار محاسبه می‌شود
  const sortedArticles = useMemo(() => {
    return [...articles]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
  }, []);

  // ✅ جلوگیری از forced reflow در mount
  useEffect(() => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current;
    swiper.update();
  }, []);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-7 w-full lg:w-[70%] 3xl:w-[80%] ps-1 pe-5 lg:pe-11">
        <h2 className="text-xl font-bold dark:text-white">آخرین مقالات</h2>
        <Link
          href={`/${params.lang}/articles`}
          className="flex justify-center items-center gap-4"
          aria-label="See all articles"
        >
          <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
            {findByUniqueId(mainData, 171)}
          </p>
          <ArrowRight
            className={`dark:stroke-white stroke-black rotate-180 w-[24px] h-full ${
              params.lang === "en" ? "ltr:rotate-0" : ""
            }`}
          />
        </Link>
      </div>

      {/* ✅ Swiper با ارتفاع ثابت و بدون observer */}
      <Swiper
        spaceBetween={20}
        slidesPerView={3.7}
        loop={true}
        observer={false}
        observeParents={false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          0: { slidesPerView: 1.2, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3.5, spaceBetween: 20 },
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="min-h-[360px] will-change-transform"
      >
        {sortedArticles.map((item) => (
          <SwiperSlide key={item.id} className="flex items-center pb-5">
            <Link
              href={`/${params.lang}/articles/categories/${item.category}/${item.slug}`}
              className="bg-white dark:bg-[#1A1A18] shadow-md rounded-2xl overflow-hidden flex flex-col h-[350px] w-full"
              aria-label={`Read article: ${item.title}`}
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={false}
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <p className="text-xs text-gray-500 mb-1 text-[#888888]">
                  {item.category} / {item.subCategory}
                </p>
                <h3 className="text-lg font-semibold line-clamp-1 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 dark:text-[#868B90] mt-2">
                  {item.excerpt}
                </p>

                <div className="flex flex-row-reverse items-center justify-between mt-4 text-xs text-gray-500">
                  <div className="flex items-center gap-3 text-[#888888]">
                    <span className="flex items-center gap-1">
                      <View className="stroke-[#888888] size-[14px]" />
                      {item.stats.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Like className="stroke-[#888888] size-[14px]" />
                      {item.stats.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Dislike className="stroke-[#888888] size-[14px]" />
                      {item.stats.dislikes}
                    </span>
                  </div>

                  <Link
                    href={`/${params.lang}/citizens/${item.author.citizenId}`}
                    className="text-blue-500 text-xs font-bold flex items-center gap-2"
                    aria-label={`Visit profile of ${item.author.name}`}
                  >
                    <div className="relative w-[35px] h-[35px] bg-lightGray rounded-full overflow-hidden border shadow-md">
                      <Image
                        src={item.author.avatar || "/articles/author/fallback-avatar.jpg"}
                        alt={item.author.name}
                        width={35}
                        height={35}
                        className="object-cover"
                      />
                    </div>
                    {item.author.citizenId}
                  </Link>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <div className="mt-4 w-full">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex items-center justify-center rounded-full bg-transparent"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 9 15"
              className="w-[20px] h-[20px] stroke-gray dark:stroke-white ltr:rotate-180"
            >
              <path d="m1 14 6.5-6.5L1 1" />
            </svg>
          </button>

          <div className="flex justify-center gap-2">
            {sortedArticles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => swiperRef.current?.slideToLoop(idx)}
                className={`w-5 h-1 rounded-sm transition ${
                  activeIndex === idx
                    ? "bg-light-primary dark:bg-dark-yellow"
                    : "bg-dark-gray dark:bg-dark-placeholder"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex items-center justify-center rounded-full bg-transparent"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 9 15"
              className="w-[20px] h-[20px] stroke-gray dark:stroke-white ltr:rotate-180"
            >
              <path d="m8 14L1.5 7.5L8 1" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestArticlesSlider;
