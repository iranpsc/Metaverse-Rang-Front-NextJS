// src/components/LatestNews.tsx
"use client";
import { supabase } from "@/utils/lib/supabaseClient";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/svgs";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { Calender, Timer, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/formatNumber";
import { Skeleton } from "@/components/ui/skeleton";
import { loadNewsFallback } from "@/components/utils/loadNewsFallback";

type Tag = { label: string; slug: string };

type Author = {
  name?: string;
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
  initialNews?: News[] | null;
}

// تابع کمکی برای تبدیل داده JSON به تایپ News
const transformToNews = (data: any[]): News[] => {
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    date: item.date,
    readingTime: item.readingTime,
    image: item.image,
    excerpt: item.description || item.excerpt, // اگر description داشت استفاده کن
    category: item.category,
    categorySlug: item.categorySlug,
    stats: { views: item.views || item.stats?.views || 0 },
    author: item.author,
    tags: item.tags,
  }));
};

/* ============================================================
   اسکلت‌ها — بیرون از کامپوننت اصلی تعریف شدن تا هر رندر دوباره
   ساخته نشن (چون کاملاً استاتیک‌ان و به state ای وابسته نیستن).
   ابعاد و چیدمانشون دقیقاً منطبق با خروجی نهایی (خبر ویژه + سه خبر
   کناری) است تا هیچ Layout Shift‌ای بین حالت اسکلت و حالت واقعی
   رخ نده.
============================================================ */

// معادل دقیق کارت خبر ویژه (مربع بزرگ سمت راست/چپ)
function FeaturedNewsSkeleton() {
  return (
    <div className="p-1 w-full lg:w-1/2 rounded-md overflow-hidden">
      <div className="relative aspect-square rounded-md overflow-hidden">
        <Skeleton tone="standalone" variant="rect" className="!w-full !h-full !rounded-md" />

        {/* معادل اطلاعات روی عکس: absolute bottom-0 p-5 xl:p-[32px] */}
        <div className="absolute bottom-0 left-0 right-0 p-5 xl:p-[32px] w-full flex flex-col gap-4 items-center">
          <Skeleton className="h-8 w-32 rounded-full" />
          <Skeleton className="h-7 w-4/5 rounded-md" />
          <Skeleton className="h-7 w-3/5 rounded-md" />
          <Skeleton className="h-5 w-3/4 rounded-md" />
          <div className="flex items-center justify-center gap-4 2xl:gap-10 w-full pb-2">
            <Skeleton className="h-4 w-14 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

// معادل دقیق یک آیتم از سه خبر کناری (تصویر lg:۴۰٪ + متن lg:۶۰٪، کنار هم در lg)
function SideNewsItemSkeleton() {
  return (
    <div className="relative bg-white dark:bg-gray-1 lg:!bg-bg-primary rounded-lg h-auto p-4 lg:p-1">
      <div className="flex lg:flex-row flex-col w-full">
        <div className="relative w-full lg:w-[40%] h-[250px] lg:h-[176px] overflow-hidden">
          <Skeleton tone="standalone" variant="rect" className="!w-full !h-full !rounded-lg" />
        </div>

        <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-[60%] p-3 lg:ps-5">
          <Skeleton tone="standalone" className="h-8 w-28 rounded-full" />
          <Skeleton tone="standalone" className="h-6 w-full rounded-md" />
          <Skeleton tone="standalone" className="h-6 w-4/5 rounded-md" />
          <div className="flex items-center gap-3">
            <Skeleton tone="standalone" className="h-4 w-20 rounded-md" />
            <Skeleton tone="standalone" className="h-4 w-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

// اسکلت کامل سکشن — دقیقاً هم‌ساختار با return نهایی (هدر + گرید ۱+۳)
function LatestNewsSkeleton() {
  return (
    <section className="w-full max-w-7xl mx-auto">
      {/* هدر: تیتر + لینک مشاهده همه */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <Skeleton tone="standalone" className="h-7 md:h-9 w-40 md:w-52 rounded-md" />
        <div className="flex items-center gap-3">
          <Skeleton tone="standalone"  className="h-4 md:h-5 w-14 md:w-20 rounded-md" />
          <Skeleton tone="standalone" variant="circle" className="!w-5 !h-5 md:!w-6 md:!h-6" />
        </div>
      </div>

      {/* زیرعنوان */}
      <Skeleton tone="standalone" className="h-5 w-72 rounded-md mb-7" />

      {/* گرید اصلی: ۱ خبر بزرگ + ۳ خبر کوچک */}
      <div className="flex flex-col lg:flex-row w-full items-center gap-10">
        <FeaturedNewsSkeleton />
        <div className="flex flex-col gap-[28px] w-full lg:w-1/2">
          <SideNewsItemSkeleton />
          <SideNewsItemSkeleton />
          <SideNewsItemSkeleton />
        </div>
      </div>
    </section>
  );
}

const LatestNews: React.FC<LatestNewsProps> = ({
  params,
  mainData,
  limit = 10,
  initialNews,
}) => {
  const [activeLoadingId, setActiveLoadingId] = useState<
    string | number | null
  >(null);

  const [newsData, setNewsData] = useState<News[]>(
    initialNews?.length ? initialNews.slice(0, limit) : []
  );
  const [loading, setLoading] = useState(!initialNews?.length);

  useEffect(() => {
    if (initialNews?.length) {
      setNewsData(initialNews.slice(0, limit));
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchLatestNews = async () => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("date", { ascending: false })
          .limit(limit);

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          if (!cancelled) {
            setNewsData(
              data.slice(0, limit).map((item: any) => ({
                id: item.id,
                title: item.title,
                slug: item.slug,
                date: item.date,
                readingTime: item.readingTime,
                image: item.image,
                excerpt: item.description || item.excerpt,
                category: item.category,
                categorySlug: item.categorySlug,
                stats: {
                  views: item.views ?? item.stats?.views ?? 0,
                },
                author: item.author,
                tags: item.tags,
              }))
            );
          }

          return;
        }

        if (!cancelled) {
          setNewsData(transformToNews(await loadNewsFallback()).slice(0, limit));
        }
      } catch (error) {
        console.error("❌ LatestNews: Supabase error, using fallback:", error);

        if (cancelled) return;

        setNewsData(transformToNews(await loadNewsFallback()).slice(0, limit));
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchLatestNews();

    return () => {
      cancelled = true;
    };
  }, [initialNews, limit]);

  const articles = useMemo<News[]>(() => {
    return newsData.slice(0, limit);
  }, [newsData, limit]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sortedArticles = useMemo(() => {
    return [...articles]
      .sort(
        (a, b) =>
          new Date(b.date || "1300-01-01").getTime() -
          new Date(a.date || "1300-01-01").getTime()
      )
      .slice(0, limit);
  }, [articles, limit]);

  if (loading) {
    return <LatestNewsSkeleton />;
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
          <h2 className="text-2xl md:text-3xl font-bold w-max dark:text-white border border-x-0 border-b-4 pe-7 border-t-0 pb-3 border-primary  border-solid">
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
            className={`dark:stroke-white stroke-black rotate-180 w-[24px] h-full ${
              params.lang === "en" ? "ltr:rotate-0" : ""
            }`}
          />
        </Link>
      </div>
      <p className="text-[#A0A0AB] lg:text-lg mb-7">{findByUniqueId(mainData, 1639)}</p>

      {/* گرید اصلی: ۱ خبر بزرگ + ۳ خبر کوچک */}
      <div className="flex flex-col lg:flex-row w-full items-center gap-10 ">
        {/* خبر ویژه (بزرگ) */}
        {featured && (
          <div className={activeLoadingId === featured.id ? "rotating-border-card cursor-not-allowed p-1 w-full lg:w-1/2 dark:bg-matn-2-800 rounded-md overflow-hidden duration-300" : "p-1 w-full lg:w-1/2 dark:bg-matn-2-800 rounded-md overflow-hidden duration-300"}>
            <Link onClickCapture={() => setActiveLoadingId(featured.id)} href={`/${params.lang}/news/categories/${getCategorySlug(featured)}/${featured.slug}`}>
              <div className="relative aspect-square overflow-hidden rounded-md">
                {featured.image ? (
                  <Image
                    src={featured.image}
                    alt={"lastFeat" + featured.title}
                    fill
                    className="object-cover lg:rounded-md"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={75}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-matn-2-200 flex items-center justify-center">
                    <span className="text-matn-2-400">بدون تصویر</span>
                  </div>
                )}

                {/* overlay گرادیان */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* اطلاعات روی تصویر */}
                <div className="absolute bottom-0 left-0 right-0 p-5 xl:p-[32px] text-white w-full flex flex-col gap-4 items-center">
                  {featured.category && (
                    <div className="border-2 border-solid border-dark-gray py-2 px-5 rounded-full w-max">
                      <Link href={`/${params.lang}/news/categories/${getCategorySlug(featured)}`} className="text-xs lg:text-base font-medium dark:text-[#F2F2F2]">
                        {featured.category}
                      </Link>
                    </div>
                  )}
                  <p className="text-xl md:text-2xl font-rokh text-center font-bold line-clamp-2 leading-9">
                    {featured.title}
                  </p>
                  {featured.excerpt && (
                    <p className="text-sm md:text-base text-matn-2-200 line-clamp-2">
                      {featured.excerpt}
                    </p>
                  )}
                  <div className="flex w-full items-center justify-center gap-4 2xl:gap-10 text-sm pb-2">
                    {featured.stats && (
                      <div className="flex gap-2 items-center">
                        <span>{formatNumber(featured.stats?.views ?? 0)}</span>
                        <View className="stroke-dark-gray size-5" />
                      </div>
                    )}
                    |
                    {featured.date && (
                      <div className="flex gap-2 items-center">
                        <time dateTime={featured.date}>{featured.date}</time>
                        <Calender className="stroke-dark-gray size-5" />
                      </div>
                    )}
                    {featured.readingTime && <div>|</div>}
                    {featured.readingTime && (
                      <div className="flex items-center gap-2">
                        |
                        <span>{featured.readingTime} دقیقه</span>
                        <Timer className="stroke-dark-gray size-5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* سه خبر کناری (کوچک) */}
        <div className="flex flex-col gap-[28px] w-full lg:w-1/2">
          {sideNews.map((item) => {
            const isLoading = activeLoadingId === item.id;

            return (
              <Link
                key={String(item.id)}
                href={`/${params.lang}/news/categories/${getCategorySlug(item)}/${item.slug}`}
                onClickCapture={() => setActiveLoadingId(item.id)}
                className={`relative bg-white dark:bg-gray-1  lg:!bg-bg-primary  rounded-lg h-auto p-4 lg:p-1 ${
                  isLoading ? "rotating-border-card cursor-not-allowed" : ""
                }`}
              >
                <div className="flex lg:flex-row flex-col w-full z-10">
                  <div className="relative w-full lg:w-[40%] h-[250px] lg:h-[176px] overflow-hidden z-10">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={"lastN " + item.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 90vw, 15vw"
                        quality={50}
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs text-matn-2-500">
                        بدون عکس
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-[60%] p-3 lg:ps-5 h-full bg-white lg:!bg-bg-primary dark:bg-gray-1  lg: z-10">
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

                    <div className="text-sm text-matn-2-500 dark:text-[#969696] flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {item.date && <time dateTime={item.date}>{item.date}</time>}
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