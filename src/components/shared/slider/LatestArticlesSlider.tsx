// src/components/LatestArticlesSlider.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Swiper as SwiperType } from "swiper";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { ArrowRight } from "@/components/svgs";
import ArticleCard from "../../card/ArticleCard";
import ArticlesSliderSkeleton from "@/components/skeleton/ArticlesSliderSkeleton";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { supabase } from "@/utils/lib/supabaseClient";
import { articles as localArticles } from "@/components/utils/articles";

const Swiper = dynamic(async () => (await import("swiper/react")).Swiper, { ssr: false });

type Tag = { label: string; slug: string };

type Author = {
  name?: string;
  citizenId?: string;
  avatar?: string;
  field?: string;
  bio?: string;
  socials?: { telegram?: string; whatsapp?: string; email?: string };
};

export type Article = {
  id: number | string;
  title: string;
  slug: string;
  date?: string;
  readingTime?: string;
  image?: string;
  excerpt?: string;
  description?: string;
  content?: string;
  category?: string;
  categorySlug?: string;
  subCategory?: string;
  categoryImage?: string;
  categoryDec?: string;
  author?: Author;
  stats?: { views?: number; likes?: number; dislikes?: number; comments?: number };
  tags?: Tag[] | string[];
};

interface LatestArticlesSliderProps {
  params: { lang: string };
  mainData?: any;
  theme?: "light" | "dark";
  limit?: number;
}

const LatestArticlesSlider: React.FC<LatestArticlesSliderProps> = ({
  params,
  mainData,
  theme,
  limit = 10,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchFromSupabase = async () => {
      try {
        const { data, error: supError } = await supabase
          .from("articles")
          .select("*")
          .order("date", { ascending: false })
          .limit(limit);

        if (supError) throw supError;

        if (mounted && Array.isArray(data) && data.length > 0) {
          const normalized = data.map((d: any) => {
            const item: Article = {
              id: d.id,
              title: d.title,
              slug: d.slug,
              date: d.date,
              readingTime: d.readingTime,
              image: d.image,
              excerpt: d.excerpt,
              description: d.description,
              content: d.content,
              category: d.category,
              categorySlug: d.categorySlug,
              subCategory: d.subCategory,
              categoryImage: d.categoryImage,
              categoryDec: d.categoryDec,
              author: d.author,
              stats: d.stats || { views: 0, likes: 0, dislikes: 0, comments: 0 },
              tags:
                Array.isArray(d.tags) && d.tags.length > 0
                  ? d.tags[0] && typeof d.tags[0] === "string"
                    ? d.tags.map((t: string) => ({ label: t, slug: slugify(t) }))
                    : d.tags
                  : [],
            };
            return item;
          });

          setArticles(normalized);
          setLoading(false);
          return;
        }

        if (mounted) {
          setArticles(
            [...localArticles]
              .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
              .slice(0, limit)
          );
          setLoading(false);
        }
      } catch (err: any) {
        console.error("LatestArticlesSlider fetch error:", err);
        setError(String(err?.message || err));
        if (mounted) {
          setArticles(
            [...localArticles]
              .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
              .slice(0, limit)
          );
          setLoading(false);
        }
      }
    };

    fetchFromSupabase();

    return () => {
      mounted = false;
    };
  }, [limit]);

  const sortedArticles = useMemo(() => {
    return [...articles]
      .sort((a, b) => (new Date(b.date || 0).getTime() || 0) - (new Date(a.date || 0).getTime() || 0))
      .slice(0, limit);
  }, [articles, limit]);

  function slugify(s: string) {
    return String(s)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  if (error) {
    console.warn("LatestArticlesSlider error:", error);
  }

  // این حالت فقط وقتی معتبره که دیگه loading نیستیم و واقعاً چیزی نیومده
  if (!loading && sortedArticles.length === 0) {
    return <div className="py-6 text-center text-matn-2-500">هیچ مقاله‌ای برای نمایش موجود نیست.</div>;
  }

  return (
    <section className="w-full">
      {/* Header — به mainData وابسته‌ست نه فچ Supabase، پس همیشه واقعی رندر می‌شه */}
      <div className="flex items-center justify-between mb-7 w-full ps-1 pe-5 lg:pe-10">
        <h2 className="text-xl font-bold dark:text-white"> {findByUniqueId(mainData, 1521)}</h2>
        <Link href={`/${params.lang}/articles`} className="flex justify-center items-center gap-4" aria-label="See all articles">
          <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
            {findByUniqueId(mainData, 171) ?? "مشاهده همه"}
          </p>
          <ArrowRight className={`dark:stroke-white stroke-black rotate-180 w-[24px] h-full ${params.lang === "en" ? "ltr:rotate-0" : ""}`} />
        </Link>
      </div>

      {loading ? (
        <ArticlesSliderSkeleton />
      ) : (
        <>
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
            className="min-h-[360px]"
          >
            {sortedArticles.map((item) => (
              <SwiperSlide key={String(item.id)} className="flex items-center pb-5">
                <ArticleCard item={item} params={params} theme={theme} activeLoadingId={activeLoadingId} setActiveLoadingId={setActiveLoadingId}/>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Controls */}
          <div className="mt-4 w-full">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <button onClick={() => swiperRef.current?.slidePrev()} className="flex items-center justify-center rounded-full bg-transparent" aria-label="Previous slide">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 15" className="w-[20px] h-[20px] stroke-matn-2 dark:stroke-white ltr:rotate-180">
                  <path d="m1 14 6.5-6.5L1 1" />
                </svg>
              </button>

              <div className="flex justify-center gap-2">
                {sortedArticles.map((_, idx) => (
                  <button key={idx} onClick={() => swiperRef.current?.slideToLoop(idx)} className={`w-5 h-1 rounded-sm transition ${activeIndex === idx ? "bg-primary " : "bg-dark-gray dark:bg-dark-placeholder"}`} aria-label={`Go to slide ${idx + 1}`} />
                ))}
              </div>

              <button onClick={() => swiperRef.current?.slideNext()} className="flex items-center justify-center rounded-full bg-transparent" aria-label="Next slide">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 15" className="w-[20px] h-[20px] stroke-matn-2 dark:stroke-white ltr:rotate-180">
                  <path d="m8 14L1.5 7.5L8 1" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default LatestArticlesSlider;