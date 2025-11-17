"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/utils/lib/supabaseClient";
import { View, Like, Dislike } from "@/components/svgs/SvgEducation";
import { ArrowRight } from "@/components/svgs";

interface SideCardProps {
  params: any;
  mainData: any;
}

const SideCard: React.FC<SideCardProps> = ({ params, mainData }) => {
  const [latestArticles, setLatestArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <section className="flex flex-col gap-5 w-full ">
      <div className="flex items-center justify-between">
        <p className="dark:text-white font-semibold">آخرین مقالات این هفته</p>

        <Link href={`/${params.lang}/articles`} className="flex justify-center items-center gap-2">
          <p className="font-azarMehr font-medium text-sm dark:text-white">
            {mainData?.["171"] ?? "بیشتر"}
          </p>
          <ArrowRight
            className={`dark:stroke-white stroke-black rotate-180 w-[18px] h-full ${
              params.lang === "en" ? "ltr:rotate-0" : ""
            }`}
          />
        </Link>
      </div>

      {latestArticles.map((item) => (
        <Link
          key={item.slug}
          href={`/${params.lang}/articles/categories/${item.category}/${item.slug}`}
          className="bg-white dark:bg-[#1A1A18] shadow-lg rounded-xl overflow-hidden w-full flex flex-col hover:scale-[1.02] transition-transform"
        >
          <div className="w-full p-3">
            <div className="h-36 overflow-hidden aspect-video rounded-[10px] w-full">
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={144}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="p-4 text-right space-y-2">
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center text-xs lg:hidden xl:block">
                <span className="dark:text-white">تاریخ انتشار : </span>
                <span className="dark:text-white">{item.date}</span>
              </div>

              <div className="flex items-center gap-[14px]">
                <div className="flex gap-1 items-center text-xs">
                  <span className="dark:text-white">{item.stats?.views ?? 0}</span>
                  <View className="stroke-textGray dark:stroke-white size-[13px]" />
                </div>
                <div className="flex gap-1 items-center text-xs">
                  <span className="dark:text-white">{item.stats?.likes ?? 0}</span>
                  <Like className="stroke-textGray dark:stroke-white size-[13px]" />
                </div>
                <div className="flex gap-1 items-center text-xs">
                  <span className="dark:text-white">{item.stats?.dislikes ?? 0}</span>
                  <Dislike className="stroke-textGray dark:stroke-white size=[13px]" />
                </div>
              </div>
            </div>

            <h3 className="text-sm font-semibold dark:text-white">{item.title}</h3>

            <p className="line-clamp-2 text-[#868B90] text-xs">{item.description}</p>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default SideCard;
