import { useEffect, useState } from "react";
import randomcolor from "randomcolor";
import Image from "next/image";
import Link from "next/link";

import { Videos, Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";

export default function ListData({ nameComponent, data, params }: any) {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    console.log("📦 data:", data);   // 👈 اینجا لاگ می‌گیری
    console.log("📂 subcategories:", data?.subcategories); // 👈 لاگ فقط زیرمجموعه‌ها

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
        data.subcategories?.map((item: any, index: number) => (
          <Link
            href={`/${params.lang}/education/category/${decodeURIComponent(
              params.category
            )}/${item.slug}`}
            key={item.id}
            className="w-full min-h-[240px] cursor-pointer shadow-md hover:shadow-xl  hover:dark:shadow-dark rounded-[12px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-4 items-center"
          >
            <div className="group w-full  relative px-4 pt-4 overflow-hidden">
              <Image
                src={item.image}
                alt={"pic" + item.name}
                width={400}
                height={250}
                priority
                className="w-full h-[250px] brightness-75 transition-all duration-150 ease-in-out object-cover rounded-[8px]"
                style={{ backgroundColor: colors[index] }}
              />
            </div>

            <p className="text-center w-full font-azarMehr truncate cursor-pointer font-bold  text-[16px] 2xl:text-xl dark:text-white text-black">
              {item.name}
            </p>
            <p className="text-center">{item.description}</p>
            <div className="w-full pb-2 flex flex-row justify-between items-center">
              <div className="px-3 flex flex-row justify-evenly items-center w-full h-fit pb-3">
                <div className="flex flex-row items-center justify-center gap-2">
                  <Videos className="w-[18px] h-[18px] stroke-black dark:stroke-gray stroke-2" />
                  <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                    {formatNumber(item.videos_count)}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Like className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray" />
                  <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                    {formatNumber(item.likes_count)}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Dislike className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray" />
                  <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                    {formatNumber(item.dislikes_count)}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-3">
                  <View className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray" />
                  <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                    {formatNumber(item.views_count)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
}
