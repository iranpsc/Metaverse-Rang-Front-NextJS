"use client";
import Image from "next/image";
import { MenuIcon, ArrowMenu } from "@/svgs/index";
import React, { useMemo } from "react";
function SideBarHeader({ isClosed, toggleSide, tabsMenu }: any) {
  const lang = "en";
  const { metaRGBTranslation, metaverseRangTranslation } = useMemo(() => {
    const metaRGB = tabsMenu.find((item: any) => item.name === "meta rgb");
    const metaverseRang = tabsMenu.find(
      (item: any) => item.name === "metaverse rang"
    );

    return {
      metaRGBTranslation: metaRGB?.translation,
      metaverseRangTranslation: metaverseRang?.translation,
    };
  }, [tabsMenu]);
  return (
    <>
      <MenuIcon
        className={`${isClosed ? "visible" : "invisible h-0"}
            stroke-[#2B2B2B] dark:stroke-white cursor-pointer w-full mb-2 menu-transition`}
        alt="toggle"
        onClick={toggleSide}
      />

      <div
        className={`${
          isClosed ? "" : "flex items-center justify-between"
        } relative`}
      >
        <div
          className={`${
            isClosed ? "w-full justify-center" : "justify-start"
          } flex items-center gap-3 my-1 pb-1 menu-transition`}
        >
          <Image
            src="/logo.png"
            alt="rgb metaverse"
            width={500}
            height={500}
            className={`${
              isClosed ? "ms-2" : "ms-4"
            } w-[40px] h-[40px] menu-transition`}
          />

          <div
            className={`${
              isClosed ? "w-0 overflow-hidden" : "w-full"
            } menu-transition`}
          >
            {metaRGBTranslation && (
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
            )}
          </div>
        </div>

        <div
          className={` ${
            isClosed
              ? "invisible opacity-0"
              : "visible opacity-100 menu-transition"
          } h-[30px] w-[30px] cursor-pointer rounded-full bg-[#efefef] dark:bg-mediumGray flex justify-center items-center me-3 rtl:end-0 ltr:end-[-7px] absolute right-[102%]`}
          onClick={toggleSide}
        >
          <ArrowMenu
            className={`w-[7px] h-[13px] stroke-gray dark:stroke-white ltr:rotate-180 rtl:rotate-0`}
          />
        </div>
      </div>
      <hr
        className={`${
          isClosed ? "mx-5" : "mx-2"
        } border-[1px] border-[#00000017] dark:border-[#3F3F3F] my-1`}
      />
    </>
  );
}
export default React.memo(SideBarHeader);
