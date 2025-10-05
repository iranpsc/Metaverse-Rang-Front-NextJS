
"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import randomcolor from "randomcolor";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";

function stripAnchorTags(html: string) {
  if (!html) return "";
  // ساده: تگ <a> را حذف می‌کنیم ولی متن داخل را نگه می‌داریم
  return html.replace(/<a\b[^>]*>(.*?)<\/a>/gi, "$1");
}

export default function ListVideos({ videos, params, subCategoryData, loadMore, loading, hasMore }: any) {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    if (videos) {
      // تولید رنگ‌ها تنها در کلاینت (deterministic-ish با index)
      const newColors = videos.map((_: any, i: any) =>
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
        videos.map((item: any, index: number) => {
          const sanitizedDesc = stripAnchorTags(item.description || "");
          return (
            <div
              key={item.id ?? index}
              className="w-full relative shadow-md hover:shadow-xl hover:dark:shadow-dark rounded-[10px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start  items-center"
            >
              <div className="group w-full h-[266px] p-4 rounded-[10px] relative">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  width={400}
                  height={300}
                  priority={true}
                  className="w-full h-full transition-all duration-150 ease-in-out rounded-[10px] object-cover"
                  style={{ backgroundColor: colors[index] }}
                />
              </div>

              <div className="px-5 w-full flex flex-col gap-4">
                {/* عنوان لینک شده — فقط عنوان داخل Link */}
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/${params.lang}/education/category/${subCategoryData.category.slug}/${subCategoryData.slug}/${item.slug}`}
                    className="text-center w-full font-azarMehr truncate cursor-pointer font-bold text-base 2xl:text-xl dark:text-white text-black"
                  >
                    {item.title}
                  </Link>

                  {/* توضیحات خارج از لینک و بدون <a> داخلی */}
                  <p
                    className="text-center dark:text-[#868B90] line-clamp-2 px-5 text-[#656565] text-xs md:text-sm"
                    dangerouslySetInnerHTML={{ __html: sanitizedDesc }}
                  />
                </div>

                <div className="w-full flex flex-row justify-between items-center border-[#D9D9D9] dark:border-[#434343] border-t border-x-0 border-b-0 pt-3 border-solid">
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
                    <div className="flex gap-2 items-center">
                      <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                        {formatNumber(item.dislikes_count)}
                      </span>
                      <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px]" />
                    </div>
                    <hr className="h-[28px] border-solid border-[#D9D9D9] dark:border-[#434343]" />
                    <div className="flex gap-2 items-center">
                      <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                        {formatNumber(item.likes_count)}
                      </span>
                      <Dislike className="stroke-gray dark:stroke-dark-gray stroke-2" />
                    </div>
                    <hr className="h-[28px] border-solid border-[#D9D9D9] dark:border-[#434343]" />
                    <div className="flex gap-2 items-center">
                      <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                        {formatNumber(item.views_count)}
                      </span>
                      <View className="stroke-gray dark:stroke-dark-gray stroke-2" />
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-center">
                  <Link
                    href={`/${params.lang}/education/category/${subCategoryData.category.slug}/${subCategoryData.slug}/${item.slug}`}
                    className="bg-light-primary dark:bg-dark-yellow text-white px-5 py-2 mb-4 rounded-[10px] dark:text-black font-light"
                  >
                    مشاهده ویدیو
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

      {hasMore && (
        <div className="col-span-full flex justify-center mt-10">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-blueLink dark:bg-dark-yellow text-white disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

