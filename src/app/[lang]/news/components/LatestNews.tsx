// src/components/LatestNews.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/svgs"; // اگر داری نگه دار، اگر نه حذف کن
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { supabase } from "@/utils/lib/supabaseClient";
import { articles as localArticles } from "@/components/utils/articles";
import { Calender, Timer, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/formatNumber";
type Tag = { label: string; slug: string };

type Author = {
  name?: string;
  // ... بقیه فیلدها اگر لازم داری
};

export type News = {
  id: number | string;
  title: string;
  slug: string;
  date?: string;
  readingTime?: string;
  image?: string;
  excerpt?: string;
  category?: string;
  categorySlug?: string;
  author?: Author;
  tags?: Tag[] | string[];
  stats: { views?: any };
};

interface LatestNewsProps {
  params: { lang: string };
  mainData?: any;
  theme?: "light" | "dark";
  limit?: number;
}

const LatestNews: React.FC<LatestNewsProps> = ({
  params,
  mainData,
  theme = "light",
  limit = 10,
}) => {
  const [articles, setArticles] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLoadingId, setActiveLoadingId] = useState<string | number | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("date", { ascending: false })
          .limit(limit);

        if (error) throw error;

        if (mounted) {
          if (data?.length > 0) {
            const normalized = data.map((d: any) => ({
              ...d,
              tags: Array.isArray(d.tags) && d.tags.length > 0 && typeof d.tags[0] === "string"
                ? d.tags.map((t: string) => ({ label: t, slug: t.toLowerCase().replace(/\s+/g, "-") }))
                : d.tags || [],
            }));
            setArticles(normalized);
          } else {
            // fallback به داده‌های محلی
            setArticles(
              [...localArticles]
                .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
                .slice(0, limit)
            );
          }
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        if (mounted) {
          setArticles(
            [...localArticles]
              .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
              .slice(0, limit)
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, [limit]);

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) =>
      new Date(b.date || "1900-01-01").getTime() - new Date(a.date || "1900-01-01").getTime()
    );
  }, [articles]);

    const FeaturedSkeleton = () => (
    <div className="w-full lg:w-1/2 rounded-md overflow-hidden shadow-md bg-neutral-400 dark:bg-[#1A1A18] animate-pulse">
      <div className="aspect-square bg-neutral-400 dark:bg-neutral-800 flex flex-col justify-end" >
              <div className="p-6 flex flex-col gap-4 items-center">
        <div className="h-8 w-32 bg-neutral-500 dark:bg-neutral-700 rounded-full" />
        <div className="h-7 w-4/5 bg-neutral-500 dark:bg-neutral-700 rounded" />
        <div className="h-5 w-3/4 bg-neutral-500 dark:bg-neutral-700 rounded" />
        <div className="h-4 w-1/2 bg-neutral-500 dark:bg-neutral-700 rounded" />
      </div>
      </div>

    </div>
  );

  const SideNewsSkeleton = () => (
    <div className="flex flex-col gap-[28px] w-full lg:w-1/2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col lg:flex-row gap-4 animate-pulse bg-neutral-400 dark:bg-[#1A1A18] rounded-lg p-4"
        >
          <div className="w-full lg:w-[40%] h-[150px] bg-neutral-500 dark:bg-neutral-700 rounded-lg" />
          <div className="flex flex-col gap-4 w-full lg:w-[60%]">
            <div className="h-6 w-32 bg-neutral-500 dark:bg-neutral-700 rounded-full" />
            <div className="h-6 w-full bg-neutral-500 dark:bg-neutral-700 rounded" />
            <div className="h-4 w-3/5 bg-neutral-500 dark:bg-neutral-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center lg:flex-row gap-10">
          <FeaturedSkeleton />
          <SideNewsSkeleton />
        </div>
      </section>
    );
  }


  if (sortedArticles.length === 0) {
    return <div className="py-10 text-center dark:text-white">خبری برای نمایش وجود ندارد.</div>;
  }

  const featured = sortedArticles[0];
  const sideNews = sortedArticles.slice(1, 4);
  const getCategorySlug = (item: { categorySlug?: string; category?: string }) =>
    item.categorySlug ||
    item.category?.toLowerCase().replace(/\s+/g, "-") ||
    "general";

  return (
    <section className="w-full max-w-7xl mx-auto">
      {/* هدر بخش */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold w-max dark:text-white border border-x-0 border-b-4 pe-7 border-t-0 pb-3 border-light-primary dark:border-dark-yellow border-solid">
            {findByUniqueId(mainData, 494) || "آخرین اخبار"}
          </h2>
        </div>

        <Link
          href={`/${params.lang}/news`}
          className="flex justify-center items-center gap-4"
        >
          <p className="font-azarMehr text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
            {findByUniqueId(mainData, 171)}
          </p>
          <ArrowRight
            className={`dark:stroke-white stroke-black rotate-180 w-[24px] h-full ${params.lang === "en" ? "ltr:rotate-0" : ""
              }`}
          />
        </Link>
      </div>
      <p className="text-[#A0A0AB] lg:text-lg mb-7">{findByUniqueId(mainData, 1639)}</p>
      {/* گرید اصلی: ۱ خبر بزرگ + ۳ خبر کوچک */}
      <div className="flex flex-col lg:flex-row w-full items-center gap-10 ">
        {/* خبر ویژه (بزرگ) */}
        {featured && (
          <div className={activeLoadingId === featured.id ? "rotating-border-card cursor-not-allowed p-1 w-full  lg:w-1/2  dark:bg-gray-800 rounded-md overflow-hidden   duration-300" : " p-1 w-full  lg:w-1/2  dark:bg-gray-800 rounded-md overflow-hidden  duration-300"}>
            <Link onClickCapture={() => setActiveLoadingId(featured.id)} href={`/${params.lang}/news/categories/${getCategorySlug(featured)}/${featured.slug}`}   >

              <div className="relative aspect-square overflow-hidden rounded-md">
                {featured.image ? (
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">بدون تصویر</span>
                  </div>
                )}

                {/* overlay گرادیان */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* اطلاعات روی تصویر */}
                <div className="absolute bottom-0 left-0 right-0 p-5 xl:p-[32px] text-white w-full flex flex-col gap-4 items-center">
                  {featured.category && (
                    <div className="border-2 border-solid border-dark-gray py-2 px-5 rounded-full w-max ">
                      <Link href={`/${params.lang}/news/categories/${getCategorySlug(featured)}`} className="text-xs lg:text-base font-medium dark:text-[#F2F2F2]">
                        {featured.category}
                      </Link>
                    </div>
                  )}
                  <p className="text-xl md:text-2xl font-rokh text-center font-bold line-clamp-2 leading-9">
                    {featured.title}
                  </p>
                  {featured.excerpt && (
                    <p className=" text-sm md:text-base text-gray-200 line-clamp-2 ">
                      {featured.excerpt}
                    </p>
                  )}
                  <div className="flex w-full items-center justify-center gap-4 2xl:gap-10 text-sm pb-2 ">
                    {featured.stats && <div className="flex gap-2 items-center">
                      <span>{formatNumber(featured.stats?.views ?? 0)}</span>
                      <View className="stroke-dark-gray size-5" />
                    </div>}
                    |
                    {featured.date && <div className="flex gap-2 items-center">

                      <time>{new Date(featured.date).toLocaleDateString("fa-IR")}</time>
                      <Calender className="stroke-dark-gray size-5" />
                    </div>}
                    {featured.readingTime && <div>
                      | </div>
                    }
                    {featured.readingTime && <div className="flex items-center gap-2">
                      |
                      <span>{featured.readingTime} دقیقه</span>
                      <Timer className="stroke-dark-gray size-5" />
                    </div>}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* سه خبر کناری (کوچک) */}
        <div className=" flex flex-col gap-[28px] w-full lg:w-1/2">
          {sideNews.map((item) => {
            const isLoading = activeLoadingId === item.id;

            return (
              <Link
                key={String(item.id)}
                href={`/${params.lang}/news/categories/${getCategorySlug(item)}/${item.slug}`}
                onClickCapture={() => setActiveLoadingId(item.id)}
                className={`relative bg-white dark:bg-[#1A1A18] lg:bg-[#f8f8f8] dark:lg:bg-black rounded-lg h-auto p-4 lg:p-1  ${isLoading ? "rotating-border-card cursor-not-allowed" : ""
                  }`}
              >


                <div className="flex lg:flex-row flex-col w-full  dark:bg-black z-10">
                  <div className="relative w-full lg:w-[40%] lg:h-[176px] overflow-hidden z-10">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg w-full h-full aspect-video !static"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500">
                        بدون عکس
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-[60%] p-3 lg:ps-5 h-full bg-white lg:bg-[#f8f8f8] dark:bg-[#1A1A18] lg:dark:bg-black z-10 ">
                    {item.category && (
                      <Link
                        href={`/${params.lang}/news/categories/${getCategorySlug(item)}`}
                        className="border-2 border-solid border-dark-gray py-2 px-5 rounded-full w-max"
                      >
                        <span className="text-xs lg:text-base font-medium dark:text-[#F2F2F2]">
                          {item.category}
                        </span>
                      </Link>
                    )}

                    <p className="font-bold text-sm text-center lg:text-start lg:text-lg line-clamp-2 dark:text-white">
                      {item.title}
                    </p>

                    <div className="text-sm text-gray-500 dark:text-[#969696] flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {item.date && (
                          <time>
                            {new Date(item.date).toLocaleDateString("fa-IR", {
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                        )}
                        <Calender className="stroke-dark-gray size-5" />
                      </div>

                      {item.readingTime && (
                        <div className="flex items-center gap-2">
                          <span>{item.readingTime} دقیقه</span>
                          <Timer className="stroke-dark-gray size-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default LatestNews;