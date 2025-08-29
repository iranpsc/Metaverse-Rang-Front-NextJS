"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/components/utils/articles";
import { View } from "@/components/svgs/SvgEducation";

interface SideCardProps {
  params: any; // پاس دادن زبان
}

const SideCard: React.FC<SideCardProps> = ({ params }) => {
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const latestArticles = sortedArticles.slice(0, 5);

  return (
    <section className="flex flex-col gap-5 w-full ">
      <div className="flex items-center justify-between">
        <p className="dark:text-white font-semibold">آخرین مقالات این هفته</p>
        <Link href={""} className="text-blueLink dark:text-dark-yellow text-sm">مشاهده همه</Link>
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
            <div className="flex gap-2 items-center">
              <span  className="dark:text-white text-sm">{item.stats?.views}</span>
              <View className="stroke-textGray dark:stroke-white size-[16px] mt-[-2px]" />
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
