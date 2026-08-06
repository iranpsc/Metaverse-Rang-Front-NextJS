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
  const isHMFormat =
    typeof value === "string" && value.startsWith("HM-");

  const lang =
    params?.lang && ["fa", "en"].includes(params.lang)
      ? params.lang
      : "fa";

  // --------------------------------------------------
  // Check / Close
  // Supports:
  // true / false
  // 1 / 0
  // "true" / "false"
  // "1" / "0"
  // --------------------------------------------------
  if (showCheck) {
    const normalizedValue =
      typeof value === "string"
        ? value.toLowerCase().trim()
        : value;

    const isTrue =
      normalizedValue === true ||
      normalizedValue === 1 ||
      normalizedValue === "true" ||
      normalizedValue === "1";

    const isFalse =
      normalizedValue === false ||
      normalizedValue === 0 ||
      normalizedValue === "false" ||
      normalizedValue === "0";

    if (isTrue) {
      return (
        <Check
          width={14}
          height={14}
          className="scale-[1.5] text-green-500"
        />
      );
    }

    if (isFalse) {
      return (
        <CLoseIcon
          width={14}
          height={14}
          className="stroke-red-500"
        />
      );
    }
  }

  // --------------------------------------------------
  // لینک
  // --------------------------------------------------
  if (isLink || isHMFormat) {
    const href = isHMFormat
      ? `/${lang}/citizens/${value.toLowerCase()}`
      : value;

    const handleClick = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      if (isHMFormat) {
        e.preventDefault();

        setLinkLoading(true);

        setTimeout(() => {
          window.location.href = href;
        }, 100);
      }
    };

    return (
      <a
        onClick={handleClick}
        className="text-blueLink dark:text-blue-500 font-[700]"
        href={href}
        target={isHMFormat ? undefined : "_blank"}
      >
        {isHMFormat
          ? value.toUpperCase()
          : lang === "fa"
            ? "لینک"
            : "link"}
      </a>
    );
  }

  // --------------------------------------------------
  // متن ساده
  // --------------------------------------------------
  return (
    <span
      className="text-[#868B90] dark:text-[#C4C4C4] font-[700] text-ellipsis line-clamp-1 overflow-hidden"
      title={String(value ?? "")}
    >
      {String(value ?? "")}
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
