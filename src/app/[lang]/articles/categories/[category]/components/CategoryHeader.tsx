"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Like, Dislike, View, Folder } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
// ✅ Description فقط در کلاینت رندر می‌شود (بدون SSR)
const Description = dynamic(() => import("./Description"), { ssr: false });

interface CategoryHeaderProps {
  data: {
    category: string;
    subCategory?: string;
    categoryImage: string;
    categoryDec: string;
    totalLikes?: number;
    totalDislikes?: number;
    totalViews?: number;
    totalArticles?: number;
  };
    mainData:{mainData:string}
}

export default function CategoryHeader({ data , mainData }: CategoryHeaderProps) {
  const {
    category,
    subCategory,
    categoryImage,
    categoryDec,
    totalLikes = 0,
    totalDislikes = 0,
    totalViews = 0,
    totalArticles = 0,
  } = data;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 mb-10">
      {/* تصویر دسته‌بندی */}
      <div className="w-full md:w-1/2 lg:w-[35%] 3xl:w-[30%] h-max">
        <div className="relative w-full h-[365px] 3xl:h-[400px]">
          <Image
            src={categoryImage}
            alt={`${category} pic`}
            fill
            priority
            fetchPriority="high"
            quality={70}
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 350px, (max-width: 1536px) 540px, 512px"
            className="object-cover rounded-xl"
          />
        </div>
      </div>

      {/* توضیحات و آمار */}
      <div className="flex flex-col justify-center lg:justify-start gap-5 flex-1">
        <h1 className="text-start font-azarMehr dark:text-white text-black font-bold text-2xl lg:text-[24px]">
          {category}
        </h1>

        {/* ✅ توضیحات کوتاه/بلند */}
        <Description text={categoryDec} />

        {/* آمار */}
        <div className="w-full grid grid-cols-3 lg:grid-cols-7 lg:gap-10 gap-y-10 items-center mt-5">
          {/* تعداد مقالات */}
          <div className="flex flex-col gap-1 md:gap-2 w-max">
            <div className="flex items-center gap-2 md:gap-3">
              <Folder className="w-[20px] h-[20px] stroke-[#84858F]" />
              <span className="whitespace-nowrap font-azarMehr font-normal text-sm lg:text-[20px] text-[#84858F] dark:text-dark-gray">
               {findByUniqueId(mainData, 1522)}
              </span>
            </div>
            <span className="font-medium text-sm lg:text-[18px] text-gray dark:text-white ms-1">
              {formatNumber(totalArticles)} عدد
            </span>
          </div>

          <hr className="h-[50px] mx-auto w-[1px] border border-[#D9D9D9] dark:border-[#434343]" />

          {/* لایک‌ها */}
          <div className="flex flex-col gap-1 md:gap-2 w-max">
            <div className="flex items-center gap-2 md:gap-3">
              <Like className="w-[20px] h-[20px] stroke-[#84858F]" />
              <span className="whitespace-nowrap font-azarMehr font-normal text-sm lg:text-[20px] text-[#84858F] dark:text-dark-gray">
                {findByUniqueId(mainData, 1523)}
              </span>
            </div>
            <span className="font-medium text-sm lg:text-[18px] text-gray dark:text-white ms-1">
              {formatNumber(totalLikes)}
            </span>
          </div>

          <hr className="hidden lg:block h-[50px] mx-auto w-[1px] border border-[#D9D9D9] dark:border-[#434343]" />

          {/* دیسلایک‌ها */}
          <div className="flex flex-col gap-1 md:gap-2 w-max">
            <div className="flex items-center gap-2 md:gap-3">
              <Dislike className="w-[20px] h-[20px] stroke-[#84858F]" />
              <span className="whitespace-nowrap font-azarMehr font-normal text-sm lg:text-[20px] text-[#84858F] dark:text-dark-gray">
                {findByUniqueId(mainData, 1524)}
              </span>
            </div>
            <span className="font-medium text-sm lg:text-[18px] text-gray dark:text-white ms-1">
              {formatNumber(totalDislikes)}
            </span>
          </div>

          <hr className="h-[50px] mx-auto w-[1px] border border-[#D9D9D9] dark:border-[#434343]" />

          {/* بازدیدها */}
          <div className="flex flex-col gap-1 md:gap-2 w-max">
            <div className="flex items-center gap-2 md:gap-3">
              <View className="w-[20px] h-[20px] stroke-[#84858F]" />
              <span className="whitespace-nowrap font-azarMehr font-normal text-sm lg:text-[20px] text-[#84858F] dark:text-dark-gray">{findByUniqueId(mainData, 1525)}</span>
            </div>
            <span className="font-medium text-sm lg:text-[18px] text-gray dark:text-white">
              {formatNumber(totalViews)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
