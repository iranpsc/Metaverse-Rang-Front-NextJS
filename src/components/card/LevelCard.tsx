"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FlagSatar, StairsUp } from "@/components/svgs";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { getGemGlowColor } from "@/components/shared/gemImage";
import type { CSSProperties } from "react";

export default function LevelCard({
  item,
  params,
  mainData,
  activeLoadingId,
  setActiveLoadingId,
}: {
  item: any;
  params: any;
  mainData: any;
  activeLoadingId: any;
  setActiveLoadingId: any;
}) {
  function localFind2(_slug: any) {
    return findByUniqueId(mainData, _slug);
  }

  const fallbackPhoto = item.fallbackPhoto || "/svg/level/citizen.png";
  const [imageSrc, setImageSrc] = useState(item.photo || fallbackPhoto);

  // Reset the image when the card receives updated API data.
  useEffect(() => {
    setImageSrc(item.photo || fallbackPhoto);
  }, [item.photo, fallbackPhoto]);

  const handleImageError = () => {
    if (imageSrc !== fallbackPhoto) {
      setImageSrc(fallbackPhoto);
    }
  };

  const isLoading = activeLoadingId === item.id;
  const levelGlowColor = getGemGlowColor(item) || "transparent";
  const levelGlowStyle = { "--level-glow": levelGlowColor } as CSSProperties;

  return (
    <div className="py-[10px] px-[14px] w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 flex justify-center">
      <Link
        onClickCapture={() => setActiveLoadingId(item.id)}
        style={levelGlowStyle}
        className={`${isLoading ? "cursor-not-allowed border-solid border-transparent border border-primary bg-white dark:bg-gray-1 dark:border-primary shadow-[0_14px_36px_-14px_var(--level-glow)]!" : ""} w-full max-w-[296px] lg:max-w-[333px] py-[25px] base-transition-1 hoverCardLevel flex flex-col items-center rounded-[20px] box-border border-solid border-transparent border hover:border-primary hover:bg-white dark:hover:bg-gray-1 dark:hover:border-primary hover:shadow-[0_14px_36px_-14px_var(--level-glow)]`}
        href={`/${params.lang}/levels/citizen/${item.route_name}/general-info`}
      >
        <Image
          src={imageSrc}
          alt={item.name || "Level"}
          width={180}
          height={170}
          onError={handleImageError}
          className="z-2 w-[110px] lg:w-[130px]  translate-y-2 lg:translate-y-6"
        />
        <div className="boxDataLevel w-full h-[216px] lg:h-[239px] rounded-[20px] flex flex-col  justify-end bg-white border border-[rgba(0,0,0,0.14)] dark:bg-gray-1  mt-[-65px]">
          <span className="text-center  dark:text-white font-azarMehr font-medium  text-title-2 mx-2 font-semibold text-[20px] lg:text-[24px]">
            {localFind2(`${item.unique_id}`)}
          </span>
          <span className="text-center  dark:text-[#84858F] font-azarMehr font-normal text-[#484950] mx-2 text-[16px] lg:text-[20px] py-2">
            {/* {localFind("required points")} */}
            {findByUniqueId(mainData, 393)}
            <span className="ps-1 font-medium">{item.score}</span>
          </span>
          <span className="mb-3 w-full flex items-center justify-evenly font-azarMehr text-[16px] lg:text-[20px]">
            <span className="flex items-center justify-between  bg-gray-2 rounded-[20px] px-3 3xl:px-5 py-1 w-5/12">
              <FlagSatar className="stroke-primary  text-[24px]" />
              <div className="flex items-center gap-1">
                <span className="text-title-2 px-1 font-normal">
                  {/* {localFind("rank")} */}
                  {findByUniqueId(mainData, 534)}
                </span>
                <span className=" text-title-2 font-normal">
                  {item.rank}
                </span>
              </div>
            </span>
            <span className="flex items-center justify-between  bg-gray-2 rounded-[20px] py-1 px-3 3xl:px-5 w-5/12 ">
              <StairsUp className="stroke-primary  text-[24px]" />
              <div className="flex items-center gap-1">
                <span className="text-title-2 px-1 font-normal text-[16px] lg:text-[20px]">
                  {/* {localFind("level")}: */}
                  {findByUniqueId(mainData, 724)}
                </span>
                <span className=" text-title-2 font-normal text-[16px] lg:text-[20px]">
                  {item.slug}
                </span>
              </div>
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}
