"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/lib/supabaseClient";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import NewsNavCard from "../card/NewsNavCard";

// ایمپورت دیتای استاتیک به عنوان fallback
import fallbackNewsData from "@/components/utils/news.json";

interface PrevNextNewsProps {
  params: {
    lang: string;
    slug: string;
    category: string;
  };
  news?: any[]; // اختیاری می‌کنیم چون می‌تواند از fallback بیاید
  mainData: { mainData: string };
}

const PrevNextNews = ({ params, news: propNews, mainData }: PrevNextNewsProps) => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  // ===============================
  // 📌 گرفتن همه اخبار (با fallback)
  // ===============================
  useEffect(() => {
    const fetchNews = async () => {
      // اگر news از طریق props آمده، از همان استفاده کن
      if (propNews && propNews.length > 0) {
        setNews(propNews);
        setLoading(false);
        return;
      }

      // تلاش برای دریافت از Supabase
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("date", { ascending: true });

        if (!error && data && data.length > 0) {
          setNews(data);
          setUsingFallback(false);
        } else {
          // استفاده از fallback
          console.warn("⚠️ PrevNextNews: Using fallback news.json");
          const fallbackData = [...fallbackNewsData].sort((a, b) => {
            const dateA = a.date ? parseInt(a.date.replace(/\//g, "")) : 0;
            const dateB = b.date ? parseInt(b.date.replace(/\//g, "")) : 0;
            return dateA - dateB;
          });
          setNews(fallbackData);
          setUsingFallback(true);
        }
      } catch (err) {
        // در صورت خطا، از fallback استفاده کن
        console.error("❌ PrevNextNews: Error fetching from Supabase, using fallback", err);
        const fallbackData = [...fallbackNewsData].sort((a, b) => {
          const dateA = a.date ? parseInt(a.date.replace(/\//g, "")) : 0;
          const dateB = b.date ? parseInt(b.date.replace(/\//g, "")) : 0;
          return dateA - dateB;
        });
        setNews(fallbackData);
        setUsingFallback(true);
      }

      setLoading(false);
    };

    fetchNews();
  }, [propNews]);

  if (loading) return null;

  // مقاله فعلی
  const currentIndex = news.findIndex((a) => a.slug === params.slug);
  if (currentIndex === -1) return null;

  const prevNews = currentIndex > 0 ? news[currentIndex - 1] : null;
  const nextNews = currentIndex < news.length - 1 ? news[currentIndex + 1] : null;

  // اگر هیچ مقاله قبلی و بعدی نبود
  if (!prevNews && !nextNews) return null;

  return (
    <section className="w-full my-10 2xl:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:gap-10 3xl:gap-[100px]">
        {/* ======================= */}
        {/* 📌 کارت مقاله قبلی */}
        {/* ======================= */}
        <div className="flex flex-col items-center w-full">
          {prevNews ? (
            <h3 className="text-center font-bold mb-3 dark:text-white">
              {findByUniqueId(mainData, 1506) || "مطلب قبلی"}
            </h3>
          ) : (<div></div>)}
          <div className="w-full">
            {prevNews ? (
              <NewsNavCard
                href={`/${params.lang}/news/categories/${prevNews.categorySlug || prevNews.categorySlug}/${prevNews.slug}`}
                news={prevNews}
                activeLoadingId={activeLoadingId}
                setActiveLoadingId={setActiveLoadingId}
              />
            ) : (
              <div className="w-full h-[200px] rounded-2xl flex items-center justify-center">

              </div>
            )}
          </div>
        </div>

        {/* ======================= */}
        {/* 📌 کارت مقاله بعدی */}
        {/* ======================= */}
        <div className="flex flex-col items-center w-full">
          {nextNews ? (
            <h3 className="text-center font-bold mb-3 dark:text-white">
              {findByUniqueId(mainData, 1507) || "مطلب بعدی"}
            </h3>
          ) : (<div></div>)}
          <div className="w-full">
            {nextNews ? (
              <NewsNavCard
                href={`/${params.lang}/news/categories/${nextNews.categorySlug || nextNews.categorySlug}/${nextNews.slug}`}
                news={nextNews}
                activeLoadingId={activeLoadingId}
                setActiveLoadingId={setActiveLoadingId}
              />
            ) : (
              <div className="w-full h-[200px] rounded-2xl flex items-center justify-center">
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrevNextNews;