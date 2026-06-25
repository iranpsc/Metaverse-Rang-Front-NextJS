"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/utils/lib/supabaseClient";
import { View, Like, Dislike } from "@/components/svgs/SvgEducation";
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
  if (loading) return <p>در حال بارگذاری...</p>;

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
