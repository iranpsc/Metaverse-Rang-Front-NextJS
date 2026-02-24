"use client";

import React, { useState, useTransition } from "react";
import NewsCard from "./NewsCard";
import Link from "next/link";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

type Category = {
  title: string;
  slug: string;
};

type News = {
  id: number;
  title: string;
  slug: string;
  image?: string | null;          // ← فقط null را اضافه کن
  date?: string | null;           // ← بهتر است null هم بگذاری
  readingTime?: string | null;
  category?: string | null;
  categorySlug?: string | null;
  // اگر stats و بقیه فیلدها هم ممکن است null باشند اضافه کن
};

interface NewsByCategorySectionProps {
  lang: string;
  mainData: any;
  categories: Category[];
  initialNewsByCategory: Record<string, News[]>;
}

export default function NewsByCategorySection({
  lang,
  mainData,
  categories,
  initialNewsByCategory,
}: NewsByCategorySectionProps) {
  const [activeCat, setActiveCat] = useState<string>("all");
  const [news, setNews] = useState<News[] | null>(initialNewsByCategory["all"] || null);
  const [selectedText, setSelectedText] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleCategoryClick = (slug: string, title: string) => {
    if (slug === activeCat) return;

    startTransition(() => {
      setActiveCat(slug);
      setSelectedText(slug === "all" ? "" : `اخبار حوزه ${title}`);
      setNews(null); // → این باعث نمایش اسکلتون می‌شود
    });

    // تأخیر کوتاه مصنوعی برای اینکه اسکلتون دیده شود
    setTimeout(() => {
      startTransition(() => {
        const newNews = initialNewsByCategory[slug] || initialNewsByCategory["all"] || [];
        setNews(newNews);
      });
    }, 500); // 500ms → می‌تونی 300 تا 700 تغییر بدی
  };

  const featured = news?.slice(0, 4) ?? [];
  const rest = news?.slice(4) ?? [];

  const isLoading = news === null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col mb-4 gap-5 px-4 md:px-0">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold w-max dark:text-white border border-x-0 border-b-4 pe-7 border-t-0 pb-3 border-light-primary dark:border-dark-yellow border-solid">
            {findByUniqueId(mainData, 1648) || "دسته بندی ها"}
          </h2>
        </div>
        <p className="text-[#A0A0AB] lg:text-lg">
          {findByUniqueId(mainData, 1619)}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 gap-y-10 min-h-[42px]">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleCategoryClick(cat.slug, cat.title)}
            disabled={isPending}
            className={`whitespace-nowrap bg-white dark:bg-[#1A1A18] px-5 py-3 rounded-full border border-solid border-transparent text-sm transition
              ${activeCat === cat.slug
                ? "dark:!border-dark-yellow dark:text-dark-yellow text-light-primary !border-light-primary shadow-sm"
                : "text-[#1F1F1F] dark:text-[#F2F2F2] hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {cat.title}
          </button>
        ))}

        <div>
          <Link
            href={`/${lang}/news/categories`}
            className="whitespace-nowrap bg-white dark:bg-[#1A1A18] px-5 py-[6px] h-full rounded-full border-solid border-transparent text-sm transition text-light-primary dark:text-dark-primary"
          >
            مشاهده همه دسته بندی ها
          </Link>
        </div>
      </div>

      {selectedText && activeCat !== "all" && (
        <p className="font-bold lg:text-lg text-[#38393D] dark:text-white">
          {selectedText}
        </p>
      )}

      {isLoading && (
        <div className="flex flex-col lg:flex-row gap-10 animate-pulse">
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-[258px] bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6" />
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
              </div>
            ))}
          </div>

          <div className="lg:w-2/5 space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1/3 h-[113px] bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-11/12" />
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && news && news.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-10">
            {featured.map((item) => (
              <NewsCard key={item.id} item={item} lang={lang} variant="featured" />
            ))}
          </div>

          <div className="lg:w-2/5 flex flex-col gap-6">
            {rest.map((item) => (
              <NewsCard key={item.id} item={item} lang={lang} variant="list" />
            ))}
          </div>
        </div>
      )}

      {!isLoading && news && news.length === 0 && (
        <div className="text-center py-16 text-neutral-500 dark:text-neutral-400">
          خبری در این دسته‌بندی یافت نشد.
        </div>
      )}
    </section>
  );
}