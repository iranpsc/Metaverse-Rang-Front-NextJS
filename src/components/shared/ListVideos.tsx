"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import randomcolor from "randomcolor";
import { Like, Dislike, View, Video } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";

export default function ListVideos({ videos, params, subCategoryData, loadMore, loading }: any) {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    if (videos) {
      const newColors = videos.map(() =>
        randomcolor({
          format: "rgba",
          alpha: 0.1,
          luminosity: "bright",
        })
      );
      setColors(newColors);
    }
  }, [videos]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-full h-fit px-5 mt-10">
      {videos &&
        videos.map((item: any, index: number) => (
          <div
            key={item.id}
            className="w-[100%] min-h-[240px] shadow-md hover:shadow-xl hover:dark:shadow-dark rounded-[10px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center"
          >
            <div className="group w-full h-[266px] rounded-t-[10px] relative">
              <Image
                src={item.image_url}
                alt={item.title}
                width={600}
                height={600}
                priority={true}
                className="w-full h-full transition-all duration-150 ease-in-out rounded-t-[10px] object-cover"
                style={{ backgroundColor: colors[index] }}
              />
              <div className="w-full h-full bg-black/20 absolute z-0 top-0 flex justify-center items-center">
                <Link
                  className="w-fit"
                  aria-label="Watch video"
                  href={`/${params.lang}/education/category/${subCategoryData.category.slug}/${subCategoryData.slug}/${item.slug}`}
                >
                  <Video className="w-[78px] h-[78px] p-3 fill-blueLink dark:fill-dark-yellow rounded-full bg-white/80" />
                </Link>
              </div>
            </div>

            <Link
              className="w-[95%]"
              href={`/${params.lang}/education/category/${subCategoryData.category.slug}/${subCategoryData.slug}/${item.slug}`}
            >
              <p className="text-start w-full font-azarMehr truncate cursor-pointer font-bold mt-[8px] text-[18px] 3xl:text-[22px] dark:text-white text-black">
                {item.title}
              </p>
            </Link>

            <div className="w-[95%] pb-2 flex flex-row justify-between items-center">
              <div className="flex flex-row justify-start items-center gap-2">
                <Image
                  src={item.creator.image}
                  alt={item.creator.code}
                  width={45}
                  height={45}
                  className="w-[45px] h-[45px] rounded-full object-cover cursor-pointer"
                />
                <span className="text-blueLink cursor-pointer text-[14px] 3xl:text-[18px] whitespace-nowrap font-medium hover:font-bold uppercase">
                  {item.creator.code}
                </span>
              </div>

              <div className="flex flex-row justify-start items-center gap-5">
                <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                  {formatNumber(item.dislikes_count)}
                </span>
                <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px]" />
                <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                  {formatNumber(item.likes_count)}
                </span>
                <Dislike className="stroke-gray dark:stroke-dark-gray stroke-2" />

                <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                  {formatNumber(item.views_count)}
                </span>
                <View className="stroke-gray dark:stroke-dark-gray stroke-2" />
              </div>
            </div>
          </div>
        ))}

      {/* دکمه loadMore */}
      <div className="col-span-full flex justify-center mt-10">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-blueLink dark:bg-dark-yellow text-white disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
