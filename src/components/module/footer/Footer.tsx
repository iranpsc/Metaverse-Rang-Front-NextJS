"use client";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { translateFooter } from "@/components/utils/education";
import { imageSources } from "@/components/utils/items";
import { useTheme } from "next-themes";
import React, { useState, useEffect, useRef } from "react";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { usePathname } from "next/navigation";

function Footer({ footerTabs, mainData }: any) {
  interface ItemIcon {
    id: number;
    img: string;
    translation: string;
    target: string;
  }

  const socialItems = [
    {
      id: 1,
      img: "/social/facebook.png",
      translation: findByUniqueId(mainData, 277),
      target: translateFooter(footerTabs, "facebook-url"),
    },
    {
      id: 2,
      img: "/social/feed.png",
      translation: findByUniqueId(mainData, 278),
      target: translateFooter(footerTabs, "fedd-url"),
    },
    {
      id: 3,
      img: "/social/instagram.png",
      translation: findByUniqueId(mainData, 279),
      target: findByUniqueId(mainData, 299),
    },
    {
      id: 4,
      img: "/social/linkedin.png",
      translation: findByUniqueId(mainData, 280),
      target: findByUniqueId(mainData, 313),
    },
    {
      id: 5,
      img: "/social/printers.png",
      translation: findByUniqueId(mainData, 281),
      target: findByUniqueId(mainData, 311),
    },
    {
      id: 6,
      img: "/social/whatsapp.png",
      translation: findByUniqueId(mainData, 282),
      target: translateFooter(footerTabs, "whatsapp-url"),
    },
    {
      id: 7,
      img: "/social/youtube.png",
      translation: findByUniqueId(mainData, 283),
      target: findByUniqueId(mainData, 298),
    },
    {
      id: 8,
      img: "/social/rubika.png",
      translation: findByUniqueId(mainData, 284),
      target: findByUniqueId(mainData, 307),
    },
    {
      id: 9,
      img: "/social/telegram.png",
      translation: findByUniqueId(mainData, 285),
      target: translateFooter(footerTabs, "telegram-url"),
    },
    {
      id: 10,
      img: "/social/virgool.png",
      translation: findByUniqueId(mainData, 286),
      target: findByUniqueId(mainData, 312),
    },
    {
      id: 11,
      img: "/social/add.png",
      translation: findByUniqueId(mainData, 287),
      target: translateFooter(footerTabs, "add-url"),
    },
    {
      id: 12,
      img: "/social/aparat.png",
      translation: findByUniqueId(mainData, 288),
      target: findByUniqueId(mainData, 310),
    },
    {
      id: 13,
      img: "/social/dalfak.png",
      translation: findByUniqueId(mainData, 289),
      target: findByUniqueId(mainData, 302),
    },
    {
      id: 14,
      img: "/social/discord.png",
      translation: findByUniqueId(mainData, 290),
      target: translateFooter(footerTabs, "discord-url"),
    },

    {
      id: 15,
      img: "/social/faq.png",
      translation: findByUniqueId(mainData, 291),
      target: findByUniqueId(mainData, 308),
    },
    {
      id: 16,
      img: "/social/filo.png",
      translation: findByUniqueId(mainData, 292),
      target: findByUniqueId(mainData, 300),
    },
    {
      id: 17,
      img: "/social/jabeh.png",
      translation: findByUniqueId(mainData, 293),
      target: findByUniqueId(mainData, 304),
    },
    {
      id: 18,
      img: "/social/medium.png",
      translation: findByUniqueId(mainData, 294),
      target: findByUniqueId(mainData, 306),
    },
    {
      id: 19,
      img: "/social/mp4.png",
      translation: findByUniqueId(mainData, 295),
      target: findByUniqueId(mainData, 301),
    },
    {
      id: 20,
      img: "/social/namasha.png",
      translation: findByUniqueId(mainData, 296),
      target: findByUniqueId(mainData, 305),
    },
  ];

  return (
    <div>
      {/* 🔹 Social Media Icons (Final CLS Fix) */}
      <div className="w-full flex flex-wrap gap-[15px] py-5 rounded-[10px] items-center justify-center bg-white dark:bg-[#1A1A18] min-h- [80px]">
        {false ? (
          <div className="flex items-center justify-center w-full h-[285px] sm:h-[210px] md:h-[135px]">
            <p className="text-gray-500">Loading icons...</p>
          </div>
        ) : (
          socialItems.map((item, index) => (
            <div
              key={item.id}
              className="w-[60px] h-[60px] flex justify-center items-center"
            >
              <Link
                href={item.target}
                target="_blank"
                className="w-full h-full"
              >
                <Image
                  src={item.img}
                  alt={item.translation}
                  width={60}
                  height={60}
                  priority={index === 0} // ✅ Load first image instantly to prevent CLS
                  loading={index === 0 ? "eager" : "lazy"} // ✅ Lazy-load remaining images
                  className="w-[60px] h-[60px] object-contain cursor-pointer"
                />
              </Link>
            </div>
          ))
        )}
      </div>

      <div className="h-fit pb-5 mt-20 rounded-[10px] w-full bg-white dark:bg-[#1A1A18] grid grid-cols-6">
        <div className="col-span-6  xl:col-span-4 mt-2  pe-2">
          <div className="w-full pt-4 px-5 flex flex-row justify-start items-center gap-5 ">
            <Image
              src="/logo.png"
              alt="logo"
              width={71}
              height={70}
              className="w-[60px] h-[60px] inline "
            />
            <div className="flex flex-col h-[60px]  justify-between items-start">
              <p className="text-[22px] mt-[-5px] font-bold font-azarMehr  dark:text-white">
                {(footerTabs.find((item: any) => item.unique_id == 272) || {})
                  .translation || "undefined"}
              </p>
              <p className="mb-[-3px] font-azarMehr font-normal dark:text-white">
                {(footerTabs.find((item: any) => item.unique_id == 273) || {})
                  .translation || "undefined"}
              </p>
            </div>
          </div>
          <p className="px-5 pt-6 font-normal text-justify font-azarMehr text-[#4C4C4C] dark:text-[#D4D4D4] text-[20px] leading-9">
            {(footerTabs.find((item: any) => item.unique_id == 274) || {})
              .translation || "undefined"}{" "}
            <br className="w-full" />
            {(footerTabs.find((item: any) => item.unique_id == 275) || {})
              .translation || "undefined"}
          </p>
        </div>
        <div className="xl:col-span-2 col-span-6 mt-6 w-full flex flex-col items-center ">
          <p className="text-center w-full font-medium font-azarMehr text-[20px] text-[#4C4C4C] dark:text-white">
            {(footerTabs.find((item: any) => item.unique_id == 276) || {})
              .translation || "undefined"}
          </p>
          <div className="xl:grid xl:grid-cols-5 3xl:grid-cols-7  flex flex-wrap gap-3 max-w-fit lg:w-full  justify-center mt-6 ">
            {socialItems.length > 0 ? (
              socialItems.map((item: ItemIcon) => (
                <div key={item.id}>
                  <Link href={item.target} target="_blank">
                    <Image
                      data-tooltip-id={`${item.id}`}
                      key={item.id}
                      src={item.img}
                      alt={item.translation}
                      width={1000}
                      height={1000}
                      className="w-[63px] h-[60px] col-span-1"
                    />
                  </Link>
                  <ReactTooltip
                    id={`${item.id}`}
                    place="top"
                    content={item.translation}
                    style={{
                      backgroundColor: "#e9eef8",
                      color: "#000",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  />
                </div>
              ))
            ) : (
              <p>No social links available</p>
            )}
          </div>
        </div>
      </div>

      <div className="my-3 text-center text-black dark:text-white">
        {translateFooter(footerTabs, "update")}&nbsp;|&nbsp;
        {translateFooter(footerTabs, "design and development")}&nbsp;
        <a href="https://web.irpsc.com/" target="_blank">
          {translateFooter(footerTabs, "webrang")}&nbsp;|&nbsp;
        </a>
        <a
          href="https://github.com/iranpsc/Metaverse-Rang-Front-NextJS"
          target="_blank"
        >
          {translateFooter(footerTabs, "version")}&nbsp;
        </a>
      </div>
    </div>
  );
}

export default memo(Footer);
