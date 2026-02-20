"use client";

import React, { useEffect, useState, useTransition } from "react";
import NewsCard from "./NewsCard";
import Link from "next/link";
import { supabase } from "@/utils/lib/supabaseClient";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

type Category = {
  title: string;
  slug: string;
};

type News = {
  id: number;
  title: string;
  slug: string;
  image?: string;
  date?: string;
  readingTime?: string;
  category?: string;
  categorySlug?: string;
};



export default function NewsByCategorySection({ lang , mainData }: any) {
  const [linkLoading, setLinkLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [news, setNews] = useState<News[] | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [isPending, startTransition] = useTransition();

  const isCategoriesLoading = categories.length === 0;

  useEffect(() => {
    async function init() {
      const { data } = await supabase
        .from("news")
        .select("category, categorySlug");

      if (!data || data.length === 0) return;

      const unique = Array.from(
        new Map(
          data.map((i) => [
            i.categorySlug,
            { title: i.category, slug: i.categorySlug },
          ])
        ).values()
      );

      const allCats = [{ title: "همه حوزه‌های خبری", slug: "all" }, ...unique];

      setCategories(allCats);
      setActiveCat("all");
      loadNews("all", "");
    }

    init();
  }, []);

  async function loadNews(slug: string, title: string) {
    startTransition(() => {
      setSelectedText(slug === "all" ? "" : `اخبار حوزه ${title}`);
      setNews(null);
    });

    let query = supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false })
      .limit(10);

    if (slug !== "all") {
      query = query.eq("categorySlug", slug);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      return;
    }

    startTransition(() => {
      setNews(data || []);
    });
  }

  const featured = news?.slice(0, 4) ?? [];
  const rest = news?.slice(4) ?? [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {linkLoading && (
        <div className="fixed top-0 left-0 bottom-0  w-full  h-screen z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm" >
          <div className="container flex w-full h-screen items-center justify-center md:ms-[25vw] lg:ms-[17vw] xl:ms-[15vw] 3xl:ms-[16vw]">
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
          </div>
        </div>
      )}
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
        {isCategoriesLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-11 px-8 py-2 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse"
              style={{ width: `${Math.floor(Math.random() * 50) + 130}px` }}
            />
          ))
        ) : (
          categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setActiveCat(cat.slug);
                loadNews(cat.slug, cat.title);
              }}
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
          ))

        )}
        <div>
          <Link onClickCapture={() => setLinkLoading(true)} href={`/${lang}/news/categories`}
            className={`whitespace-nowrap bg-white dark:bg-[#1A1A18] px-5 py-[6px] h-full rounded-full border-solid border-transparent text-sm transition text-light-primary dark:text-dark-primary `}
          >
            مشاهده همه دسته بندی ها
          </Link>
        </div>
      </div>

      {selectedText && activeCat !== null && (
        <p className="font-bold lg:text-lg text-[#38393D] dark:text-white">{selectedText}</p>
      )}

      {news === null && (
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

      {news && news.length > 0 && (
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

      {news && news.length === 0 && (
        <div className="text-center py-16 text-neutral-500 dark:text-neutral-400">
          خبری در این دسته‌بندی یافت نشد.
        </div>
      )}
    </section>
  );
}