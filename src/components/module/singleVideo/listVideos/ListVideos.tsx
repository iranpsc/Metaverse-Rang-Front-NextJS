"use client";

import Image from "next/image";
import Link from "next/link";
import { Like, Dislike, View, Video } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";
import { useEffect, useRef, useState, memo } from "react";

interface VideoCardProps {
  item: any;
  params: any;
  theme: string;
  categorySlug: string;
  subCategorySlug: string;
  categoryName: string;
  subCategoryName: string;
}

const stripHTML = (html: string) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const VideoCard = memo(
  ({ item, params, theme, categorySlug, subCategorySlug, categoryName, subCategoryName }: VideoCardProps) => {
    const titleRef = useRef<HTMLParagraphElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
      const checkTruncation = () => {
        if (titleRef.current) setIsTruncated(titleRef.current.scrollWidth > titleRef.current.clientWidth);
      };
      checkTruncation();
      const observer = new ResizeObserver(checkTruncation);
      if (titleRef.current) observer.observe(titleRef.current);
      return () => observer.disconnect();
    }, [item.title]);

    const videoUrl = `/${params.lang}/education/category/${categorySlug}/${subCategorySlug}/${item.slug}`;

    return (
      <div className="w-full min-h-[240px] shadow-md hover:shadow-xl duration-300 hover:dark:shadow-dark rounded-[12px] overflow-hidden bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center">
        <Link href={videoUrl} className="group w-full h-[260px] overflow-hidden  cursor-pointer relative">
          <div className="px-4 pt-4 w-full h-full ">
             <Image
            src={item.image_url || "/placeholder.png"}
            alt={item.title || "video thumbnail"}
            width={360}
            height={280}
            priority={true}
            className="w-full h-full object-cover rounded-[10px]"
          />
          </div>
          <div className="w-full h-full  absolute z-0 top-0 flex justify-center items-center rounded-t-[10px]">
            <div className="w-fit hover:scale-105 duration-100 rounded-full bg-white/30 dark:bg-black/35 flex items-center justify-center p-5">
              <Video width={40} height={40} />
            </div>
          </div>
        </Link>

        <div className="w-[95%] flex flex-row justify-start items-center gap-1 mt-[-10px] pe-16">
          <Link
            href={`/${params.lang}/education/category/${categorySlug}`}
            className="text-start text-gray dark:text-dark-gray font-medium font-azarMehr text-[13px] 3xl:text-[16px]"
          >
            {categoryName}
          </Link>
          <span className="font-azarMehr text-gray dark:text-dark-gray">/</span>
          <Link
            href={`/${params.lang}/education/category/${categorySlug}/${subCategorySlug}`}
            className="text-start text-gray dark:text-dark-gray whitespace-nowrap font-medium font-azarMehr text-[13px] 3xl:text-[16px]"
            title={subCategoryName}
          >
            {subCategoryName.length > 30 ? subCategoryName.slice(0, 25) + "..." : subCategoryName}
          </Link>
        </div>

        <Link href={videoUrl} className="w-[95%] mt-[-15px] cursor-pointer">
          <p
            ref={titleRef}
            className={`text-start text-black dark:text-white w-full font-azarMehr truncate font-bold text-[18px] 3xl:text-[22px] ${
              isTruncated ? "hover:overflow-visible hover:animate-rtlMarquee" : ""
            }`}
          >
            {item.title || "بدون عنوان"}
          </p>
        </Link>

        <p className="w-[95%] mt-[-20px] text-textGray dark:text-lightGray text-[12px] 3xl:text-[16px] line-clamp-2 overflow-hidden">
          {stripHTML(item.description || "")}
        </p>

        <div className="w-[95%] pb-2 flex flex-row justify-between items-center">
          <Link href={`https://rgb.irpsc.com/${params.lang}/citizen/${item.creator.code}`} target="_blank">
            <div className="flex flex-row justify-start items-center gap-2">
              <Image
                src={item.creator.image || "/placeholder.png"}
                alt={item.creator.code + " profile id"}
                width={45}
                height={45}
                loading="lazy"
                className="w-[45px] h-[45px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
              />
              <span className="text-blueLink dark:text-blue-500 cursor-pointer text-[14px] md:text-base whitespace-nowrap font-medium  uppercase">
                {item.creator.code}
              </span>
            </div>
          </Link>

          <div className="flex flex-row justify-start items-center gap-3 md:gap-5">
            <div className="flex items-center gap-[5px]">
              <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                {formatNumber(item.likes_count)}
              </span>
              <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px]" />
            </div>
             <hr className="h-[28px] border-l-0 border-y-0 border-solid border-[#D9D9D9] dark:border-[#434343]" />
            <div className="flex items-center gap-[5px]">
              <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                {formatNumber(item.dislikes_count)}
              </span>
              <Dislike className="stroke-gray dark:stroke-dark-gray stroke-2" />
            </div>
             <hr className="h-[28px] border-l-0 border-y-0 border-solid border-[#D9D9D9] dark:border-[#434343]" />
            <div className="flex items-center gap-[5px]">
              <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                {formatNumber(item.views_count)}
              </span>
              <View className="stroke-gray dark:stroke-dark-gray stroke-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const ListVideos = ({ DataVideos, DataVideo, params, theme }: any) => {
  const categorySlug = params.category;
  const categoryName = DataVideo?.category?.name || "بدون دسته‌بندی";
  const subCategorySlug = params.subcategory;
  const subCategoryName = DataVideo?.sub_category?.name || "بدون زیرشاخه";

  return (
    <div className="my-[20px] flex flex-col md:grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-10 w-full pb-3 pt-16 xs:flex xs:justify-center xs:items-center px-5 lg:px-0">
      {DataVideos?.videos?.map((item: any) => (
        <VideoCard
          key={item.id}
          item={item}
          params={params}
          theme={theme}
          categorySlug={categorySlug}
          subCategorySlug={subCategorySlug}
          categoryName={categoryName}
          subCategoryName={subCategoryName}
        />
      ))}
    </div>
  );
};

export default ListVideos;
