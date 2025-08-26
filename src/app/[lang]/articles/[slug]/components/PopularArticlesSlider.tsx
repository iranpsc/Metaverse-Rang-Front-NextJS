"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { articles } from "@/components/utils/articles";
import Link from "next/link";

interface PopularArticlesSliderProps {
  params: {
    lang: string; 
  };
}

const PopularArticlesSlider = ({ params }: PopularArticlesSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType>();

  const sortedArticles = [...articles]
    .sort((a, b) => b.stats.views - a.stats.views)
    .slice(0, 10);

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-7 w-full lg:w-[70%] 3xl:w-[80%] ps-1 pe-5 lg:pe-11">
        <h2 className="text-xl font-bold dark:text-white">پربازدیدترین مقالات</h2>
        <Link href={`/${params.lang}/articles`} className="text-light-primary dark:text-dark-yellow text-sm">
          مشاهده همه
        </Link>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={3.7}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 20,
          },
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {sortedArticles.map((item) => (
          <SwiperSlide key={item.id} className="flex items-center pb-5">
            <Link
              href={`/${params.lang}/articles/${item.slug}`}
              className="bg-white dark:bg-[#1A1A18] shadow-md rounded-2xl overflow-hidden flex flex-col h-[350px] w-full"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <p className="text-xs text-gray-500 mb-1 text-[#888888]">
                  {item.category} / {item.subCategory}
                </p>
                <h3 className="text-lg font-semibold line-clamp-1 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 dark:text-white">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
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
                  <div className="flex items-center gap-2">
                    <Link href={`/${params.lang}/citizens/${item.author.citizenId}`} className="text-blue-500 text-xs font-bold">
                      {item.author.citizenId}
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* کنترل‌ها */}
      <div className="mt-4 w-full">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex items-center justify-center rounded-full bg-transparent"
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
              />
            ))}
          </div>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex items-center justify-center rounded-full bg-transparent"
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

export default PopularArticlesSlider;
