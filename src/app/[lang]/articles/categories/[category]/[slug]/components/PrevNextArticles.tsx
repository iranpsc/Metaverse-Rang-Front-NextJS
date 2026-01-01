"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/lib/supabaseClient";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface PrevNextArticlesProps {
  params: { 
    lang: string; 
    slug: string;
    category: string;
  };
    mainData:{mainData:string}
}

const PrevNextArticles = ({ params , mainData }: PrevNextArticlesProps) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
              <Link
                href={`/${params.lang}/articles/categories/${prevArticle.categorySlug}/${prevArticle.slug}`}
                className="flex flex-col gap-1  bg-white dark:bg-[#1A1A18] shadow-md rounded-2xl overflow-hidden w-full h-[390px]"
              >
                <div className="p-3 w-full">
                  <div className=" w-full h-60  overflow-hidden">
                    <Image
                      src={prevArticle.image}
                      alt={prevArticle.title}
                      fill
                      className="object-cover rounded-lg !static"
                    />
                  </div>
                </div>

                <div className="p-4 pt-0 flex flex-col  justify-between gap-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2 dark:text-[#868B90]">
                    <span>تاریخ انتشار: {prevArticle.date}</span>
                    <div className="flex items-center gap-3 text-[#888888]">
                      <span className="flex items-center gap-1">
                        <View className="stroke-[#888888] size-[14px]" />{" "}
                        {prevArticle.stats?.views ?? 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Like className="stroke-[#888888] size-[14px]" />{" "}
                        {prevArticle.stats?.likes ?? 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Dislike className="stroke-[#888888] size-[14px]" />{" "}
                        {prevArticle.stats?.dislikes ?? 0}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm lg:text-xl line-clamp-1 dark:text-white">
                      {prevArticle.title}
                    </h4>
                    <p className="text-xs lg:text-sm text-gray-600 mt-1 line-clamp-2 text-[#868B90]">
                      {prevArticle.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
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
              <Link
                href={`/${params.lang}/articles/categories/${nextArticle.categorySlug}/${nextArticle.slug}`}
                className="flex flex-col gap-1  bg-white dark:bg-[#1A1A18] shadow-md rounded-2xl overflow-hidden w-full h-[390px]"
              >
                <div className="p-3">
                  <div className=" w-full h-60 ">
                    <Image
                      src={nextArticle.image}
                      alt={nextArticle.title}
                      fill
                      className="object-cover rounded-lg !static"
                    />
                  </div>
                </div>

                <div className="p-4 flex flex-col ggap-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2 dark:text-white">
                    <span>تاریخ انتشار: {nextArticle.date}</span>
                    <div className="flex items-center gap-3 text-[#888888] ">
                      <span className="flex items-center gap-1">
                        <View className="stroke-[#888888] size-[14px]" />{" "}
                        {nextArticle.stats?.views ?? 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Like className="stroke-[#888888] size-[14px]" />{" "}
                        {nextArticle.stats?.likes ?? 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Dislike className="stroke-[#888888] size-[14px]" />{" "}
                        {nextArticle.stats?.dislikes ?? 0}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm lg:text-xl line-clamp-1 dark:text-white">
                      {nextArticle.title}
                    </h4>
                    <p className="text-xs lg:text-sm text-gray-600 mt-1 line-clamp-2 text-[#868B90] ">
                      {nextArticle.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PrevNextArticles;
