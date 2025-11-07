"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Link from "next/link";
import { ArrowRight } from "@/components/svgs";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { articles } from "@/components/utils/articles";
import ArticleCard from "../../../../components/ArticleCard"; // ✅ استفاده از ArticleCard

interface RelatedArticlesSliderProps {
  params: { lang: string; slug: string };
  mainData: any;
}

const RelatedArticlesSlider = ({ params, mainData }: RelatedArticlesSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType>();

  // پیدا کردن مقاله فعلی
  const currentArticle = articles.find((a) => a.slug === params.slug);
  if (!currentArticle) return null;

  // فیلتر مقالات مرتبط
  const relatedArticles = articles
    .filter(
      (a) =>
        a.slug !== params.slug &&
        (a.category === currentArticle.category ||
          a.subCategory === currentArticle.subCategory)
    )
    .slice(0, 10);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-7 w-full  ps-1 pe-5 lg:pe-10">
        <h2 className="text-xl font-bold dark:text-white">مقالات مرتبط</h2>
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

      {/* Slider */}
      <Swiper
        spaceBetween={20}
        slidesPerView={3.7}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          0: { slidesPerView: 1.2, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3.5, spaceBetween: 20 },
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {relatedArticles.map((item) => (
          <SwiperSlide key={item.id} className="flex items-center pb-5">
            {/* ✅ استفاده از ArticleCard */}
            <ArticleCard item={item} params={{ lang: params.lang }} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <div className="mt-4 w-full">
        <div className="flex items-center justify-center md:justify-start gap-2">
          {/* Prev button */}
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

          {/* Pagination */}
          <div className="flex justify-center gap-2">
            {relatedArticles.map((_, idx) => (
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

          {/* Next button */}
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

export default RelatedArticlesSlider;
