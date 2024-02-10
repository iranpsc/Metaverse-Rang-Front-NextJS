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
            className="w-[100%] min-h-[240px] shadow-md hover:shadow-xl hover:dark:shadow-dark  rounded-[10px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center"
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
                {nameComponent === "education" && (
                  <Video className="w-[50px] h-[50px] fill-blueLink dark:fill-dark-yellow" />
                )}
                {nameComponent === "subCategories" && (
                  <Folder className="w-[50px] h-[50px] fill-blueLink dark:fill-dark-yellow" />
                )}
              </div>
            </div>
            {nameComponent === "education" && (
              <div className="flex flex-row justify-start items-center gap-1 w-[95%] mt-[-10px]">
                <p
                  className="text-start text-gray dark:text-dark-gray font-medium font-azarMehr text-[14px] truncate 3xl:text-[16px] cursor-pointer hover:text-blueLink hover:dark:text-dark-yellow"
                  onClick={() => pusher(item.category_slug)}
                >
                  {item.category_name}
                </p>
                <span className="font-azarMehr text-start text-gray dark:text-dark-gray font-medium text-[14px] 3xl:text-[16px]">
                  /
                </span>

                <p
                  className=" text-start text-gray dark:text-dark-gray truncate font-medium font-azarMehr text-[14px] 3xl:text-[16px] cursor-pointer hover:text-blueLink hover:dark:text-dark-yellow"
                  onClick={() =>
                    pusher(`${item.category_slug}/${item.sub_category_slug}`)
                  }
                >
                  {item.sub_category_name}
                </p>
              </div>
            )}

            <h1 className="text-start w-[95%] font-azarMehr truncate cursor-pointer font-bold mt-[15px] text-[18px] 3xl:text-[22px] ">
              {item.name}
            </h1>
            <div className="flex flex-row items-center justify-start  mt-[-8px] w-[98%]"></div>
            <div className="w-[95%] pb-2 flex flex-row justify-between  items-center">
              {nameComponent === "education" && (
                <>
                  <div className="flex flex-row justify-start items-center gap-2">
                    <Image
                      src={item.creator_image}
                      alt={item.creator_code}
                      width={1000}
                      height={1000}
                      loading="lazy"
                      className="w-[45px] h-[45px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
                      onClick={() => pushRgb(item.creator_code)}
                    />
                    <span
                      className="text-blueLink  cursor-pointer text-[16px] 3xl:text-[22px] whitespace-nowrap font-medium hover:font-bold uppercase "
                      onClick={() => pushRgb(item.creator_code)}
                    >
                      {item.creator_code}
                    </span>
                  </div>

                  <div className="flex flex-row justify-start items-center gap-5">
                    <span className=" whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray me-[-13px]">
                      {formatNumber(item.likes)}
                    </span>
                    <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px] " />
                    <span className="whitespace-nowrap font-azarMehr font-normal  3xl:text-[18px] text-gray dark:text-dark-gray me-[-10px]">
                      {formatNumber(item.dislikes)}
                    </span>
                    <Dislike className="stroke-gray  dark:stroke-dark-gray stroke-2 " />

                    <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray me-[-13px]">
                      {formatNumber(item.views)}
                    </span>
                    <View className="stroke-gray dark:stroke-dark-gray stroke-2 " />
                  </div>
                </>
              )}
              {nameComponent === "subCategories" && (
                <div className=" px-3  flex flex-row justify-evenly items-center w-full h-fit pb-3">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Videos className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray" />
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
              )}
            </div>
          </div>
        ))}
    </>
  );
}
