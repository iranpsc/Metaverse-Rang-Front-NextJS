import Image from "next/image";
import { useRouter } from "next/router";
import randomcolor from "randomcolor";

import { Folder } from "@/components/svgs/SvgCategories";
import {
  Like,
  Dislike,
  View,
  Video,
  Videos,
} from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";
import { useEffect, useState } from "react";

export default function ListData({ nameComponent, data }: any) {
  const router = useRouter();
  const { lang } = router.query;
  const pusher = (data: any) => {
    router.push(`/${lang}/education/category/${data}`);
  };

  const pushRgb = (data: any) => {
    router.push(`https://rgb.irpsc.com/${lang}/citizen/${data}`);
  };

  const [colors, setColors] = useState([]);

  useEffect(() => {
    const generateRandomColors = () => {
      const newColors = data.subcategories.map(() =>
        randomcolor({
          format: "rgba",
          alpha: 0.1,
          luminosity: "bright",
        })
      );
      setColors(newColors);
    };

    generateRandomColors();
  }, [data]);

  return (
    <>
      {data &&
        data.subcategories.map((item: any, index: number) => (
          <div
            key={item.id}
            className="w-[100%] min-h-[240px] shadow-md hover:shadow-xl hover:dark:shadow-dark  rounded-[10px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-4 items-center"
          >
            <div className=" group w-full h-[250px] 2xl:h-[300px] relative rounded-t-[10px]  ">
              <Image
                src={item.image}
                alt={item.name}
                width={600}
                height={600}
                priority={true}
                className=" w-full h-[250px]   2xl:h-[300px] brightness-75  transition-all duration-150 ease-in-out rounded-t-[10px]  object-contain"
                style={{ backgroundColor: colors[index] }}
              />
              <div className=" absolute 3xl:top-[260px] 2xl:top-[260px] xl:top-[210px] lg:top-[210px]  md:top-[210px] sm:top-[215px] xs:top-[210px] end-5 rounded-full h-[75px] z-50 w-[75px] flex justify-center items-center bg-white dark:bg-dark-background  shadow-md">
                <Folder className="w-[50px] h-[50px] fill-blueLink dark:fill-dark-yellow" />
              </div>
            </div>

            <h1 className="text-start w-[95%] font-azarMehr truncate cursor-pointer font-bold mt-[15px] text-[18px] 3xl:text-[22px] ">
              {item.name}
            </h1>
            <div className="flex flex-row items-center justify-start  mt-[-8px] w-[98%]"></div>
            <div className="w-[95%] pb-2 flex flex-row justify-between  items-center">
              <div className=" px-3  flex flex-row justify-evenly items-center w-full h-fit pb-3">
                <div className="flex flex-row items-center justify-center gap-2">
                  <Videos className="w-[18px] h-[18px] stroke-gray dark:fill-dark-gray" />
                  <span className=" whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                    {formatNumber(item ? item.videos_count : 0)}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Like className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray" />
                  <span className=" whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                    {formatNumber(item ? item.likes_count : 0)}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Dislike className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray" />
                  <span className=" whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                    {formatNumber(item ? item.dislikes_count : 0)}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-3">
                  <View className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray" />
                  <span className=" whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                    {formatNumber(item ? item.views_count : 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
