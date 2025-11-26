// src/components/LatestArticlesSlider.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/svgs";
import ArticleCard from "../../../app/[lang]/articles/components/ArticleCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { supabase } from "@/utils/lib/supabaseClient";
import { articles as localArticles } from "@/components/utils/articles";



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
  subCategory?: string;
  categoryImage?: string;
  categoryDec?: string;
  author?: Author;
  stats?: { views?: number; likes?: number; dislikes?: number; comments?: number };
  tags?: Tag[] | string[]; // اگر قدیمی تر باشد ممکن text[] برگردد
};

interface LatestArticlesSliderProps {
  params: { lang: string };
  mainData?: any;
  theme?: "light" | "dark";
  limit?: number; // تعداد نمایش (پیشفرض 10)
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
  const direction = params.lang === "fa" ? "rtl" : "ltr";


  useEffect(() => {
    let mounted = true;

    const fetchFromSupabase = async () => {
      try {
        // تلاش می‌کنیم از Supabase بخوانیم؛ اگر ارور یا صفر داده برگشت، fallback به local
        const { data, error: supError } = await supabase
          .from("articles")
          .select("*")
          .order("date", { ascending: false })
          .limit(limit);

        if (supError) throw supError;

        if (mounted && Array.isArray(data) && data.length > 0) {
          // نرمالایز کردن فیلد tags اگر به صورت text[] یا string ارسال شده باشد
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
              subCategory: d.subCategory,
              categoryImage: d.categoryImage,
              categoryDec: d.categoryDec,
              author: d.author,
              stats: d.stats || { views: 0, likes: 0, dislikes: 0, comments: 0 },
              tags:
                Array.isArray(d.tags) && d.tags.length > 0
                  ? // اگر آیتم‌ها رشته ساده باشند، تبدیل به {label,slug}
                    d.tags[0] && typeof d.tags[0] === "string"
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

        // اگر داده‌ای برنگردد، fallback به localArticles
        if (mounted) {
          setArticles(
            [...localArticles]
              .sort((a, b) => new Date((b.date || "")).getTime() - new Date((a.date || "")).getTime())
              .slice(0, 10)
          );
          setLoading(false);
        }
      } catch (err: any) {
        console.error("LatestArticlesSlider fetch error:", err);
        setError(String(err?.message || err));
        // fallback to local
        if (mounted) {
          setArticles(
            [...localArticles]
              .sort((a, b) => new Date((b.date || "")).getTime() - new Date((a.date || "")).getTime())
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
    // articles قبلاً از سرور یا local آمده؛ اینجا فقط اطمینان و slice
    return [...articles]
      .sort((a, b) => (new Date(b.date || 0).getTime() || 0) - (new Date(a.date || 0).getTime() || 0))
      .slice(0, 3);
  }, [articles]);

  // small helper: slugify for tag slugs if needed
  function slugify(s: string) {
    return String(s)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  if (loading) {
    return <div className="py-6 text-center">در حال بارگذاری مقالات...</div>;
  }

  if (error) {
    // خطا رو لاگ کردیم و fallback داریم؛ اما اگر خواستی نمایش بده
    console.warn("LatestArticlesSlider error:", error);
  }

  if (sortedArticles.length === 0) {
    return <div className="py-6 text-center text-gray-500">هیچ مقاله‌ای برای نمایش موجود نیست.</div>;
  }

  return (
    <section className="w-full">
      {/* Header */}
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {findByUniqueId(mainData, 497)}
        </p>
        <Link href={`/${params.lang}/articles`} >
          <div className="flex justify-center items-center gap-4">
            <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
              {findByUniqueId(mainData, 171)}
            </p>
            <ArrowRight
              className={`dark:stroke-white stroke-black w-[24px] h-full ${
                direction === "rtl" ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-10 mt-6 md:mt-12">
       {sortedArticles.map((item) => (
           <ArticleCard key={String(item.id)} item={item} params={params} theme={theme} />
        ))}
    </div>
    </section>
  );
};

export default LatestArticlesSlider;
