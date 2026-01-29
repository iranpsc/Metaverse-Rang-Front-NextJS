"use client";

import { CLoseIcon, Check } from "@/components/svgs";
import { useState } from "react";

export default function DetailItem({
  title,
  value,
  isLink,
  showCheck = false,
  fullBox,
  params,
}: {
  title: string;
  value: any;
  isLink?: boolean;
  showCheck?: boolean;
  fullBox?: boolean;
  params?: { lang?: string };
}) {
  const [linkLoading, setLinkLoading] = useState(false);

  const generateValue = () => {
    const isHMFormat = typeof value === "string" && value.startsWith("HM-");
    const lang = params?.lang && ["fa", "en"].includes(params.lang) ? params.lang : "fa";

    // Check / Close
    if (showCheck && value === 0) return <CLoseIcon width={14} height={14} className="stroke-red-500" />;
    if (showCheck && value === 1) return <Check width={14} height={14} className="scale-[1.5] text-green-500" />;

    // لینک
    if (isLink || isHMFormat) {
      const href = isHMFormat
        ? `/${lang}/citizens/${value.toLowerCase()}`
        : value;

      const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (isHMFormat) {
          e.preventDefault(); // جلوی رفتن فوری به لینک
          setLinkLoading(true);
          // شبیه لودینگ: بعد از نمایش overlay مسیر تغییر کند
          setTimeout(() => {
            window.location.href = href;
          }, 100); // می‌توانی 100ms یا بیشتر بگذاری
        }
        // لینک معمولی بدون لودینگ _blank
      };

      return (
        <a
          onClick={handleClick}
          className="text-blueLink dark:text-blue-500 font-[700]"
          href={href}
          target={isHMFormat ? undefined : "_blank"}
        >
          {isHMFormat ? value.toUpperCase() : "لینک"}
        </a>
      );
    }

    // متن ساده
    return (
      <span
        className="text-[#868B90] dark:text-[#C4C4C4] font-[700] text-ellipsis line-clamp-1 overflow-hidden"
        title={value}
      >
        {value}
      </span>
    );
  };

  return (
    <>
      {/* Overlay لودینگ */}
      {linkLoading && (
        <div className="fixed top-0 left-0 w-full h-screen z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="container flex w-full h-screen items-center justify-center md:ms-[25vw] lg:ms-[17vw] xl:ms-[15vw] 3xl:ms-[16vw]">
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Item */}
      <div
        className={`flex flex-wrap flex-row gap-2 justify-between py-3 border-solid border-t-0 border-x-0 border-b-2 border-[#ECECEC] dark:border-[#1A1A18] items-center w-full text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] ${
          fullBox ? "w-full" : "sm:w-[47%]"
        }`}
      >
        <span
          className="whitespace-nowrap text-ellipsis text-[#414040] dark:text-white font-[500] 2xl:font-[700]"
          title={title}
        >
          {title}
        </span>
        <span className="flex justify-end min-w-max">{generateValue()}</span>
      </div>
    </>
  );
}
