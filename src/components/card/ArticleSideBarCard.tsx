"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/lib/supabaseClient";
import { ArrowRight } from "@/components/svgs";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import ArticleSideCard from "./ArticleSideCard";

interface SideCardProps {
  params: any;
  mainData: any;
}

const SideCard: React.FC<SideCardProps> = ({ params, mainData }) => {
  const [latestArticles, setLatestArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
    const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);
  useEffect(() => {
    fetchLatest();
  }, []);

  const fetchLatest = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("date", { ascending: false })
      .limit(5);

    if (!error && data) setLatestArticles(data);
    setLoading(false);
  };
//   function cleanDescription(html: string, limit = 255) {
//   if (!html) return "";
//   const text = html.replace(/<[^>]*>/g, "").trim(); // حذف HTML
//   return text.length > limit ? text.slice(0, limit).trim() + "…" : text;
// }
const SideCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-1  shadow-lg rounded-xl overflow-hidden w-full flex flex-col relative">
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10 z-10" />
            
            <div className="w-full p-3">
                <div className="h-36 overflow-hidden aspect-video rounded-[10px] w-full bg-neutral-200 dark:bg-neutral-700 relative">
                    <div className="absolute inset-0 bg-gradient-to-r matn-2-200 matn-2-300 matn-2-200 dark:fmatn-2-700 dark:vmatn-2-600 dark:tmatn-2-700 animate-pulse" />
                </div>
            </div>
            
            <div className="p-4 text-right space-y-3">
                <div className="flex items-center w-full justify-between">
                    <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r matn-2-200 matn-2-300 matn-2-200 dark:fmatn-2-700 dark:vmatn-2-600 dark:tmatn-2-700 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-[14px]">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-4 w-8 bg-neutral-200 dark:bg-neutral-700 rounded relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r matn-2-200 matn-2-300 matn-2-200 dark:fmatn-2-700 dark:vmatn-2-600 dark:tmatn-2-700 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="h-5 w-full bg-neutral-200 dark:bg-neutral-700 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r matn-2-200 matn-2-300 matn-2-200 dark:fmatn-2-700 dark:vmatn-2-600 dark:tmatn-2-700 animate-pulse" />
                </div>
                
                <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r matn-2-200 matn-2-300 matn-2-200 dark:fmatn-2-700 dark:vmatn-2-600 dark:tmatn-2-700 animate-pulse" />
                    </div>
                    <div className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r matn-2-200 matn-2-300 matn-2-200 dark:fmatn-2-700 dark:vmatn-2-600 dark:tmatn-2-700 animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
};
if (loading) {
  return (
    <section className="flex flex-col gap-5 w-full">
      <div className="flex items-center justify-between">
        <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
        <div className="h-5 w-20 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
      </div>

      {Array.from({ length: 5 }).map((_, index) => (
        <SideCardSkeleton key={index} />
      ))}
    </section>
  );
}

  return (
    <section className="flex flex-col gap-5 w-full ">
      <div className="flex items-center justify-between">
        <p className="dark:text-white font-semibold"> {findByUniqueId(mainData, 1504)} </p>

        <Link href={`/${params.lang}/articles`} className="flex justify-center items-center gap-2">
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

{latestArticles.map((item) => (
  <ArticleSideCard
    key={item.slug}
    article={item}
    mainData={findByUniqueId(mainData, 191)} // مثلا "تاریخ انتشار"
    href={`/${params.lang}/articles/categories/${item.categorySlug}/${item.slug}`}
     activeLoadingId={activeLoadingId} setActiveLoadingId={setActiveLoadingId}

  />
))}

    </section>
  );
};

export default SideCard;
