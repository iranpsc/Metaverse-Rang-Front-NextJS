"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/utils/lib/supabaseClient";
import { View, Like, Dislike } from "@/components/svgs/SvgEducation";
import { ArrowRight } from "@/components/svgs";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import NewsSideCard from "./NewsSideCard";

// ایمپورت دیتای استاتیک به عنوان fallback
import fallbackNewsData from "@/components/utils/news.json";

interface SideCardProps {
  params: any;
  mainData: any;
}

const SideCard: React.FC<SideCardProps> = ({ params, mainData }) => {
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchLatest();
  }, []);

  const fetchLatest = async () => {
    // تلاش برای دریافت از Supabase
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false })
      .limit(5);

    // اگر خطایی رخ داد یا دیتایی نیامد، از fallback استفاده کن
    if (error || !data || data.length === 0) {
      if (error) {
        console.warn("⚠️ SideCard: Supabase error, using fallback news.json", error.message);
      } else if (!data || data.length === 0) {
        console.warn("⚠️ SideCard: No data from Supabase, using fallback news.json");
      }
      
      // استفاده از دیتای fallback
      const fallbackData = fallbackNewsData
        .map((item: any) => ({
          ...item,
          stats: typeof item.stats === 'string' ? JSON.parse(item.stats) : item.stats,
        }))
        .sort((a, b) => {
          // مرتب‌سازی بر اساس تاریخ (جدیدترین اول)
          const dateA = a.date ? parseInt(a.date.replace(/\//g, "")) : 0;
          const dateB = b.date ? parseInt(b.date.replace(/\//g, "")) : 0;
          return dateB - dateA;
        })
        .slice(0, 5);
      
      setLatestNews(fallbackData);
      setLoading(false);
      return;
    }

    setLatestNews(data);
    setLoading(false);
  };

 if (loading) {
    return (
      <section className="flex flex-col gap-5 w-full">
        <div className="flex items-center justify-between">
          <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-700 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
          </div>
          <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-700 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <NewsSideCard key={i} isLoading={true} news={null} href="" />
        ))}
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-5 w-full ">
      <div className="flex items-center justify-between">
        <p className="dark:text-white font-semibold"> {findByUniqueId(mainData, 494) || "آخرین اخبار"} </p>

        <Link href={`/${params.lang}/news`} className="flex justify-center items-center gap-2">
          <p className="font-azarMehr font-medium text-sm dark:text-white">
            {findByUniqueId(mainData, 171)} 
          </p>
          <ArrowRight
            className={`dark:stroke-white stroke-black rotate-180 w-[18px] h-full ${
              params.lang === "en" ? "ltr:rotate-0" : ""
            }`}
          />
        </Link>
      </div>

      {latestNews.map((item) => (
        <NewsSideCard
          key={item.slug}
          news={item}
          mainData={findByUniqueId(mainData, 191)}
          href={`/${params.lang}/news/categories/${item.categorySlug}/${item.slug}`}
          activeLoadingId={activeLoadingId}
          setActiveLoadingId={setActiveLoadingId}
        />
      ))}
    </section>
  );
};

export default SideCard;