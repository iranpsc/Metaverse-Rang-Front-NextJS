"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/lib/supabaseClient";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import ArticleNavCard from "./ArticleNavCard";

interface PrevNextArticlesProps {
  params: {
    lang: string;
    slug: string;
    category: string;
  };
  mainData: { mainData: string }
}

const PrevNextArticles = ({ params, mainData }: PrevNextArticlesProps) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);
  // ===============================
  // 📌 گرفتن همه مقالات از Supabase
  // ===============================
  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("date", { ascending: true }); // ترتیب انتشار

      if (!error && data) {
        setArticles(data);
      }

      setLoading(false);
    };

    fetchArticles();
  }, []);

  if (loading) return null;

  // مقاله فعلی
  const currentIndex = articles.findIndex((a) => a.slug === params.slug);
  if (currentIndex === -1) return null;

  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <section className="w-full my-10 2xl:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:gap-10 3xl:gap-[100px]">

        {/* ======================= */}
        {/* 📌 کارت مقاله قبلی */}
        {/* ======================= */}
        <div className="flex flex-col items-center w-full">
          <h3 className="text-center font-bold mb-3 dark:text-white">
            {findByUniqueId(mainData, 1506)}
          </h3>
          <div className="w-full">
            {prevArticle ? (
              <ArticleNavCard
                href={`/${params.lang}/articles/categories/${prevArticle.categorySlug}/${prevArticle.slug}`}
                article={prevArticle}
                activeLoadingId={activeLoadingId} setActiveLoadingId={setActiveLoadingId}

              />
            ) : null}

          </div>
        </div>

        {/* ======================= */}
        {/* 📌 کارت مقاله بعدی */}
        {/* ======================= */}
        <div className="flex flex-col items-center w-full">
          <h3 className="text-center font-bold mb-3 dark:text-white">
            {findByUniqueId(mainData, 1507)}
          </h3>
          <div className=" w-full">
            {nextArticle ? (
              <ArticleNavCard
                href={`/${params.lang}/articles/categories/${nextArticle.categorySlug}/${nextArticle.slug}`}
                article={nextArticle}
                activeLoadingId={activeLoadingId} setActiveLoadingId={setActiveLoadingId}

              />
            ): null}

          </div>
        </div>

      </div>
    </section>
  );
};

export default PrevNextArticles;
