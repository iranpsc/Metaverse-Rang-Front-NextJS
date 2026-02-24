// src/components/PopularNews.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/svgs";
import { Calender, Timer, View } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { formatNumber } from "@/components/utils/formatNumber";

interface News {
  id: string | number;
  title: string;
  slug: string;
  image?: string;
  date?: string;
  readingTime?: string;
  category?: string;
  categorySlug?: string;
  excerpt?: string;
  stats?: {
    views?: number | string | null;
  };
  [key: string]: any;
}

interface PopularNewsProps {
  params: { lang: string };
  mainData: any;
  theme?: "light" | "dark";
  initialNews: News[];
}

const PopularNews: React.FC<PopularNewsProps> = ({ params, mainData, theme = "light" , initialNews }) => {


const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);


const [activeLoadingId, setActiveLoadingId] =
  useState<string | number | null>(null);

const sortedPopular = useMemo(() => {
  if (!initialNews?.length) return [];

  return [...initialNews]
    .map((item) => ({
      ...item,
      stats: {
        ...item.stats,
        views: Number(item.stats?.views ?? 0),
      },
    }))
    .sort((a, b) => Number(b.stats.views) - Number(a.stats.views))
    .slice(0, 4);
}, [initialNews]);

  const getCategorySlug = (item: News) =>
    item.categorySlug ||
    item.category?.toLowerCase().replace(/\s+/g, "-") ||
    "general";

  // ── Skeleton ها ────────────────────────────────────────────────
  const FeaturedSkeleton = () => (
    <div className="w-full lg:w-1/2 rounded-md overflow-hidden shadow-md bg-neutral-300 dark:bg-[#1A1A18] animate-pulse">
      <div className="aspect-square bg-neutral-300 dark:bg-neutral-800 flex flex-col justify-end" >
        <div className="p-6 flex flex-col gap-4 items-center">
          <div className="h-8 w-32 bg-neutral-400 dark:bg-neutral-700 rounded-full" />
          <div className="h-7 w-4/5 bg-neutral-400 dark:bg-neutral-700 rounded" />
          <div className="h-5 w-3/4 bg-neutral-400 dark:bg-neutral-700 rounded" />
          <div className="h-4 w-1/2 bg-neutral-400 dark:bg-neutral-700 rounded" />
        </div>
      </div>

    </div>
  );

  const SideNewsSkeleton = () => (
    <div className="flex flex-col gap-[28px] w-full lg:w-1/2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col lg:flex-row gap-4 animate-pulse bg-neutral-300 dark:bg-[#1A1A18] rounded-lg p-4"
        >
          <div className="w-full lg:w-[40%] h-[150px] bg-neutral-400 dark:bg-neutral-700 rounded-lg" />
          <div className="flex flex-col gap-4 w-full lg:w-[60%]">
            <div className="h-6 w-32 bg-neutral-400 dark:bg-neutral-700 rounded-full" />
            <div className="h-6 w-full bg-neutral-400 dark:bg-neutral-700 rounded" />
            <div className="h-4 w-3/5 bg-neutral-400 dark:bg-neutral-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );

if (!mounted) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <FeaturedSkeleton />
        <SideNewsSkeleton />
      </div>
    </section>
  );
}


  if (sortedPopular.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500 dark:text-gray-400">
        خبری با بازدید بالا برای نمایش وجود ندارد.
      </div>
    );
  }

  const featured = sortedPopular[0];
  const sideNews = sortedPopular.slice(1);

  return (
    <section className="w-full max-w-7xl mx-auto">
      {/* هدر */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold w-max dark:text-white border border-x-0 border-b-4 pe-7 border-t-0 pb-3 border-light-primary dark:border-dark-yellow border-solid">
            {findByUniqueId(mainData, 1624) || "محبوب‌ترین اخبار"}
          </h2>
        </div>

        <Link href={`/${params.lang}/news`} className="flex items-center gap-4">
          <p className="font-azarMehr text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
            {findByUniqueId(mainData, 171) || "مشاهده همه"}
          </p>
          <ArrowRight
            className={`dark:stroke-white stroke-black rotate-180 w-[24px] h-full ${params.lang === "en" ? "ltr:rotate-0" : ""}`}
          />
        </Link>
      </div>

      <p className="text-[#A0A0AB] lg:text-lg mb-7 px-4 md:px-0">
        {findByUniqueId(mainData, 1625)}
      </p>

      {/* محتوای اصلی */}
      <div className="flex flex-col lg:flex-row w-full items-center gap-10 px-4 md:px-0">
        {/* خبر بزرگ */}
        {featured && (
          <div
            className={
              activeLoadingId === featured.id
                ? "rotating-border-card cursor-not-allowed p-1 w-full lg:w-1/2 dark:bg-gray-800 rounded-md overflow-hidden duration-300"
                : "p-1 w-full lg:w-1/2 dark:bg-gray-800 rounded-md overflow-hidden duration-300"
            }
          >
            <Link
              onClickCapture={() => setActiveLoadingId(featured.id)}
              href={`/${params.lang}/news/categories/${getCategorySlug(featured)}/${featured.slug}`}
            >
              <div className="relative aspect-square overflow-hidden rounded-md">
                {featured.image ? (
                  <Image
                    src={featured.image}
                    alt={"popFeatured " + featured.title}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    quality={40}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">بدون تصویر</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 xl:p-[32px] text-white w-full flex flex-col gap-4 items-center">
                  {featured.category && (
                    <div className="border-2 border-solid border-dark-gray py-2 px-5 rounded-full w-max">
                      <Link
                        href={`/${params.lang}/news/categories/${getCategorySlug(featured)}`}
                        className="text-xs lg:text-base font-medium dark:text-[#F2F2F2]"
                      >
                        {featured.category}
                      </Link>
                    </div>
                  )}
                  <p className="text-xl md:text-2xl font-rokh text-center font-bold line-clamp-2 leading-9">
                    {featured.title}
                  </p>
                  {featured.excerpt && (
                    <p className="text-sm md:text-base text-gray-200 line-clamp-2 text-center">
                      {featured.excerpt}
                    </p>
                  )}
                  <div className="flex w-full items-center justify-center gap-4 2xl:gap-10 text-sm pb-2">
                    <div className="flex gap-2 items-center">
                      <span>{formatNumber(Number(featured.stats?.views ?? 0))}</span>
                      <View className="stroke-dark-gray size-5" />
                    </div>
                    {featured.date && (
                      <>
                        <span>|</span>
                        <div className="flex gap-2 items-center">
                          <time dateTime={featured.date}>
                            {featured.date}
                          </time>
                          <Calender className="stroke-dark-gray size-5" />
                        </div>
                      </>
                    )}
                    {featured.readingTime && (
                      <>
                        <span>|</span>
                        <div className="flex items-center gap-2">
                          <span>{featured.readingTime} دقیقه</span>
                          <Timer className="stroke-dark-gray size-5" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* سه خبر کوچک */}
        <div className="flex flex-col gap-[28px] w-full lg:w-1/2">
          {sideNews.map((item) => {
            const isLoading = activeLoadingId === item.id;

            return (
              <Link
                key={String(item.id)}
                href={`/${params.lang}/news/categories/${getCategorySlug(item)}/${item.slug}`}
                onClickCapture={() => setActiveLoadingId(item.id)}
                className={`relative bg-white dark:bg-[#1A1A18] lg:bg-[#f8f8f8] dark:lg:bg-black rounded-lg h-auto p-4 lg:p-1 ${isLoading ? "rotating-border-card cursor-not-allowed" : ""
                  }`}
              >
                <div className="flex lg:flex-row flex-col w-full  z-10">
                  <div className="relative w-full lg:w-[40%] h-[250px] lg:h-[176px] overflow-hidden z-10">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={"popList" + item.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 90vw, 15vw"
                        quality={50}
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500">
                        بدون عکس
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-[60%] p-3 lg:ps-5 h-full bg-white lg:bg-[#f8f8f8] dark:bg-[#1A1A18] lg:dark:bg-black z-10">
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

                    <div className="text-sm text-gray-500 dark:text-[#969696] flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                      {item.date && (
                        <div className="flex items-center gap-2">
                          <time dateTime={item.date}>
                            {item.date}
                          </time>
                          <Calender className="stroke-dark-gray size-5" />
                        </div>
                      )}

                      {item.readingTime && (
                        <div className="flex items-center gap-2">
                          <span>{item.readingTime} دقیقه</span>
                          <Timer className="stroke-dark-gray size-5" />
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <span>{formatNumber(Number(item.stats?.views ?? 0))}</span>
                        <View className="stroke-dark-gray size-5" />
                      </div>
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

export default PopularNews;