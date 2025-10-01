import { useEffect, useState } from "react";
import randomcolor from "randomcolor";
import Image from "next/image";
import Link from "next/link";

import { Videos, Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";

export default function ListData({ nameComponent, data, params }: any) {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    if (data?.subcategories) {
      const newColors = data.subcategories.map(() =>
        randomcolor({
          format: "rgba",
          alpha: 0.1,
          luminosity: "bright",
        })
      );
      setColors(newColors);
    }
  }, [data]);

  return (
    <>
      {data &&
        data.subcategories?.map((item: any, index: number) => {
          // ساخت لینک بر اساس nameComponent
          const href =
            nameComponent === "categories"
              ? `/${params.lang}/education/category/${item.slug}`
              : `/${params.lang}/education/category/${decodeURIComponent(
                params.category
              )}/${item.slug}`;

          return (
            <Link
              href={href}
              key={item.id}
              className="w-full min-h-[240px] cursor-pointer shadow-md hover:shadow-xl  hover:dark:shadow-dark rounded-[12px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-2 items-center"
            >
              <div className="group w-full relative px-4 pt-4 overflow-hidden">
                <Image
                  src={item.image}
                  alt={"pic" + item.name}
                  width={360}
                  height={260}
                  priority
                  className="w-full h-[250px] brightness-75 transition-all duration-150 ease-in-out object-cover rounded-[8px]"
                  style={{ backgroundColor: colors[index] }}
                />
              </div>

              <p className="text-center w-full font-azarMehr truncate cursor-pointer font-bold text-[16px] 2xl:text-xl dark:text-white text-black">
                {item.name}
              </p>
              <p
                className="text-center dark:text-[#868B90] line-clamp-2 px-5 text-[#656565] text-xs md:text-sm"
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></p>


              <div className="w-full mt-2 flex flex-row justify-between items-center px-5 ">
                <div className="flex flex-row justify-evenly items-center w-full h-fit py-3 border border-x-0 border-b-0 border-solid border-[#D9D9D9] dark:border-[#434343]">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Videos className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray " />
                    <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                      {formatNumber(item.videos_count)}
                    </span>
                  </div>
                  <hr className="h-[28px] border-l-0 border-y-0 border-solid border-[#D9D9D9] dark:border-[#434343]" />
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Like className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray" />
                    <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                      {formatNumber(item.likes_count)}
                    </span>
                  </div>
                  <hr className="h-[28px] border-l-0 border-y-0 border-solid border-[#D9D9D9] dark:border-[#434343]" />
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Dislike className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray" />
                    <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                      {formatNumber(item.dislikes_count)}
                    </span>
                  </div>
                  <hr className="h-[28px] border-l-0 border-y-0 border-solid border-[#D9D9D9] dark:border-[#434343]" />
                  <div className="flex flex-row items-center justify-center gap-3">
                    <View className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray" />
                    <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                      {formatNumber(item.views_count)}
                    </span>
                  </div>
                </div>

              </div>
              <div className="w-full flex justify-center ">
                <span className="bg-light-primary dark:bg-dark-yellow text-white px-5 py-2 mb-4 rounded-[10px] dark:text-black font-light hover:cursor-pointer">
                  مشاهده ویدیو </span>
              </div>
            </Link>
          );
        })}
    </>
  );
}
