"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/components/utils/articles";
import { View, Like, Dislike, } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { ArrowRight } from "@/components/svgs";

interface SideCardProps {
  params: any;
  mainData: any;
}

const SideCard: React.FC<SideCardProps> = ({ params, mainData }) => {
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const latestArticles = sortedArticles.slice(0, 5);

  return (
    <section className="flex flex-col gap-5 w-full ">
      <div className="flex items-center justify-between">
        <p className="dark:text-white font-semibold">آخرین مقالات این هفته</p>
        <Link
          href={`/${params.lang}/articles`} className="flex justify-center items-center gap-2">
          <p className="font-azarMehr font-medium text-sm  dark:text-white">
            {findByUniqueId(mainData, 171)}
          </p>
          <ArrowRight
            className={`dark:stroke-white stroke-black rotate-180 w-[18px] h-full ${params.lang === "en" ? "ltr:rotate-0" : ""}`}
          />
        </Link>
      </div>
      {latestArticles.map((item) => (
        <Link
          key={item.slug}
          href={`/${params.lang}/articles/${item.slug}`} // استفاده از lang از props
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
            <div className="flex items-center w-full justify-between ">
              <div className="flex  items-center text-xs lg:hidden xl:block">
                <span className="dark:text-white ">تاریخ انتشار : </span>
                <span className="dark:text-white ">{item.date}</span>
              </div>
              <div className="flex items-center gap-[14px]">
                <div className="flex gap-1 items-center text-xs">
                  <span className="dark:text-white">{item.stats?.views}</span>
                  <View className="stroke-textGray dark:stroke-white size-[13px] mt-[-2px]" />
                </div>
                <div className="flex gap-1 items-center text-xs">
                  <span className="dark:text-white ">{item.stats?.likes}</span>
                  <Like className="stroke-textGray dark:stroke-white size-[13px] mt-[-2px]" />
                </div>
                <div className="flex gap-1 items-center text-xs">
                  <span className="dark:text-white ">{item.stats?.dislikes}</span>
                  <Dislike className="stroke-textGray dark:stroke-white size-[13px] mt-[-2px]" />
                </div>
              </div>
            </div>
            <h3 className="text-sm font-semibold dark:text-white">{item.title}</h3>
            <p className=" line-clamp-2 text-[#868B90] text-xs">{item.excerpt}</p>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default SideCard;
