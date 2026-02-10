"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import type { Swiper as SwiperType } from "swiper";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { ArrowRight } from "@/components/svgs";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import ArticleCard from "./ArticleCard";
import { supabase } from "@/utils/lib/supabaseClient";

// ================= TYPES =================
interface News {
  id: string;
  title: string;
  slug: string;
  image?: string;
  date?: string;
  stats?: { views?: number };
  [key: string]: any;
}

interface PopularNewsProps {
  params: { lang: string };
  mainData: any;
  theme?: "light" | "dark";
}

// Swiper (client-side only)
const Swiper = dynamic(async () => (await import("swiper/react")).Swiper, {
  ssr: false,
});

const PopularArticlesSlider = ({ params, mainData, theme }: PopularNewsProps) => {
  const [articles, setArticles] = useState<News[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);
  // ================= Fetch Articles From Supabase =================
  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .limit(50); // محدودیت امنیتی، اما بعداً فقط ۱۰ تا نمایش می‌دیم

      if (error) {
        console.error("Error loading news:", error);
      } else {
        setArticles(data || []);
      }
    };

    fetchArticles();
  }, []);

  // ================= Sort by Views & Limit to 10 =================
  const sortedArticles = useMemo(() => {
    return [...articles]
      .sort(
        (a, b) => (b.stats?.views || 0) - (a.stats?.views || 0)
      )
      .slice(0, 10); // ← فقط ۱۰ مقاله
  }, [articles]);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-7 w-full ps-1 pe-5 lg:pe-10">
        <h2 className="text-xl font-bold dark:text-white"> {findByUniqueId(mainData, 1520)}</h2>

        <Link
          href={`/${params.lang}/articles`}
          className="flex justify-center items-center gap-4"
        >
          <p className="font-azarMehr text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
            {findByUniqueId(mainData, 171)}
          </p>
          <ArrowRight
            className={`dark:stroke-white stroke-black rotate-180 w-[24px] h-full ${
              params.lang === "en" ? "ltr:rotate-0" : ""
            }`}
          />
        </Link>
      </div>

      {/* Swiper */}
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
        {sortedArticles.map((item) => (
          <SwiperSlide key={item.id} className="flex items-center pb-5">
            <ArticleCard item={item} params={params} theme={theme} activeLoadingId={activeLoadingId} setActiveLoadingId={setActiveLoadingId}/>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <div className="mt-4 w-full">
        <div className="flex items-center justify-center md:justify-start gap-2">
          {/* Prev */}
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

          {/* Dots */}
          <div className="flex justify-center gap-2">
            {sortedArticles.map((_, idx) => (
              <button
                key={idx}
                aria-label="Next slide" 
                onClick={() => swiperRef.current?.slideToLoop(idx)}
                className={`w-5 h-1 rounded-sm transition ${
                  activeIndex === idx
                    ? "bg-light-primary dark:bg-dark-yellow"
                    : "bg-dark-gray dark:bg-dark-placeholder"
                }`}
              />
            ))}
          </div>

          {/* Next */}
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

export default PopularArticlesSlider;
