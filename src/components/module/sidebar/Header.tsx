"use client";
import Image from "next/image";
import { MenuIcon, ArrowMenu } from "@/svgs/index";
import Link from "next/link";
// import React, { useMemo } from "react";
function SideBarHeader({ isClosed, toggleSide, tabsMenu, params }: any) {
  // const { metaRGBTranslation, metaverseRangTranslation } = useMemo(() => {
  //   const metaRGB = tabsMenu.find((item: any) => item.name === "meta rgb");
  //   const metaverseRang = tabsMenu.find(
  //     (item: any) => item.name === "metaverse rang"
  //   );

  //   return {
  //     metaRGBTranslation: metaRGB?.translation,
  //     metaverseRangTranslation: metaverseRang?.translation,
  //   };
  // }, [tabsMenu]);

  // to find in an array with key(_name)

  function localFind(_name: any) {
    return tabsMenu.find((item: any) => item.name == _name)?.translation;
  }
  return (
    <>
      <MenuIcon
        className={`${
          isClosed ? "visible my-2" : "invisible h-0 my-0"
        } stroke-[#2B2B2B] dark:stroke-white cursor-pointer w-full menu-transition`}
        alt="toggle"
        onClick={toggleSide}
      />

      <Link
        href={`/${params.lang}`}
        className={`${
          isClosed ? "" : "flex items-center justify-between"
        } relative overflow-hidden`}
      >
        <div
          className={`${
            isClosed ? "w-full justify-center" : "justify-start"
          } flex items-center gap-3 my-1 pb-1 menu-transition`}
        >
          <Image
            src="/logo.png"
            alt="rgb metaverse"
            width={71}
            height={70}
            className={`${
              isClosed ? "ms-2" : "ms-4"
            } w-[40px] h-[40px] menu-transition`}
          />

          <div
            className={`${
              isClosed ? "w-0 h-0" : "w-[100%] h-[100%]"
            } overflow-hidden`}
          >
            <p
              className={`whitespace-nowrap leading-[25px] visible dark:text-white whitespace-nowrap block font-azarMehr font-bold text-[14px] md:text-[16px] lg:text-[18px] text-black pb-[2px]`}
            >
              {localFind("metargb") || "متارنگ"}
            </p>
            <p
              className={`whitespace-nowrap leading-[25px] dark:text-dark-gray visible font-azarMehr font-normal text-gray text-[14px] md:text-[16px] lg:text-[18px] `}
            >
              {localFind("metaverse rang")}
            </p>
            {/* {metaRGBTranslation && (
              <p
                className={`visible dark:text-white whitespace-nowrap block font-azarMehr font-bold xl:text-[16px] lg:text-[14px] md:text-[13px] sm:text-[12px] xs:text-[12px] text-black pb-[2px]`}
              >
                {metaRGBTranslation}
              </p>
            )}
            {metaverseRangTranslation && (
              <p
                className={`dark:text-dark-gray visible font-azarMehr font-normal text-gray xl:text-[14px] lg:text-[11px] md:text-[13px] sm:text-[10px] xs:text-[10px] `}
              >
                {metaverseRangTranslation}
              </p>
            )} */}
          </div>
        </div>
      </Link>

      <div
        className={` ${
          isClosed
            ? "invisible opacity-0"
            : "visible opacity-100 menu-transition"
        } h-[30px] w-[30px] cursor-pointer rounded-full bg-[#efefef] dark:bg-mediumGray flex justify-center items-center absolute top-[5px] rtl:left-[5px] ltr:right-[5px]`}
        onClick={toggleSide}
      >
        <ArrowMenu
          className={`w-[7px] h-[13px] stroke-gray dark:stroke-white ltr:rotate-180 rtl:rotate-0`}
        />
      </div>
      <hr
        className={`${
          isClosed ? "mx-5" : "mx-2"
        } border-[1px] border-[#00000017] dark:border-[#3F3F3F] my-1`}
      />
    </>
  );
}
export default SideBarHeader;
// export default React.memo(SideBarHeader);
