"use client";
import Image from "next/image";
import { MenuIcon, ArrowMenu } from "@/svgs/index";
import Link from "next/link";
// import React, { useMemo } from "react";
function SideBarHeader({ isClosed, toggleSide, tabsMenu, params }: any) {
  const lang = params.lang;

  // ترجمه‌های دستی
  const translations: Record<string, { title: string; subtitle: string }> = {
    fa: {
      title: "متارنگ",
      subtitle: "متاورس رنگ",
    },
    en: {
      title: "Meta RANG",
      subtitle: "Metaverse RANG",
    },
  };

  // اگر زبان تعریف نشده بود، پیش‌فرض فارسی
  const t = translations[lang] || translations.fa;

  return (
    <>
      <MenuIcon
        className={`${
          isClosed ? "visible my-2 mt-5" : "invisible h-0 my-0"
        } stroke-[#2B2B2B] dark:stroke-white cursor-pointer w-full menu-transition `}
        alt="toggle"
        onClick={toggleSide}
      />

      <Link
        href={`/${params.lang}`}
        className={`${
          isClosed ? "mt-3" : "flex items-center justify-between"
        } relative overflow-hidden `}
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
            className={`${isClosed ? "ms-2" : "ms-4"} w-[40px] h-[40px] menu-transition`}
          />

          <div
            className={`${
              isClosed ? "w-0 h-0" : "w-[100%] h-[100%]"
            } overflow-hidden`}
          >
            <p
              className={`whitespace-nowrap leading-[25px] visible dark:text-white block font-azarMehr font-bold text-[14px] md:text-[16px] lg:text-[18px] text-black pb-[2px]`}
            >
              {t.title}
            </p>
            <p
              className={`whitespace-nowrap leading-[25px] dark:text-dark-gray visible font-azarMehr font-normal text-gray text-[14px] md:text-[16px] lg:text-[18px] `}
            >
              {t.subtitle}
            </p>
          </div>
        </div>
      </Link>

      <div
        className={`${
          isClosed
            ? "invisible opacity-0"
            : "visible opacity-100 menu-transition"
        } h-[30px] w-[30px] md:h-[40px] md:w-[40px] cursor-pointer rounded-full bg-[#efefef] dark:bg-black flex justify-center items-center absolute top-[5px] rtl:left-[5px] ltr:right-[5px] mx-2 mt-2`}
        onClick={toggleSide}
      >
        <ArrowMenu
          className={`w-[7px] md:w-[14px] h-[7px] md:h-[14px] stroke-gray dark:stroke-white ltr:rotate-180 rtl:rotate-0`}
        />
      </div>

      <hr
        className={`${
          isClosed ? "mx-3 mt-3" : "mx-2"
        } border-[1px] border-[#00000017] dark:border-[#3F3F3F] my-1`}
      />
    </>
  );
}

export default SideBarHeader;

