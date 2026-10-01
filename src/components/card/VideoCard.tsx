"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";
import { stripHtml } from "@/components/utils/stripHtml";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function VideoCard({
  item,
  params,
  theme,
  activeLoadingId,
  setActiveLoadingId,
  imagePriority = true,
}: any) {
  const titleRef = useRef<HTMLParagraphElement>(null);

  const [isTruncated, setIsTruncated] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const isLoading = activeLoadingId === item.id;

  // کاملاً یکتا برای هر کارت
  const subCategoryTooltipId = `sub-category-tooltip-${item.id}`;

  useEffect(() => {
    const el = titleRef.current;

    if (el) {
      setIsTruncated(el.scrollWidth > el.clientWidth);
    }
  }, [item.title]);

  return (
    <div
      onClickCapture={() => setActiveLoadingId?.(item.id)}
      className={`relative w-full min-h-[240px] shadow-md hover:shadow-xl hover:dark:shadow-dark rounded-[10px] overflow-hidden bg-white dark:bg-gray-1 flex flex-col justify-start gap-6 items-center ${
        isLoading
          ? "rotating-border-card cursor-not-allowed"
          : ""
      }`}
    >
      {/* Main card link */}
      <Link
        aria-hidden="true"
        tabIndex={-1}
        href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}/${item.slug}`}
        className="absolute inset-0 z-0"
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* Image */}
      <div className="group w-full h-[260px] overflow-hidden px-4 pt-4 pointer-events-none">
        <div className="relative h-full w-full z-[1]">
          {imgLoading && (
            <div className="absolute inset-0 h-full w-full bg-dark-gray dark:bg-matn-2 animate-pulse rounded-[10px] z-20" />
          )}

          <Image
            src={item.image_url || "/rafiki-dark.png"}
            alt={item.title}
            width={400}
            height={260}
            priority={imagePriority}
            quality={70}
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 473px, 400px"
            className="w-full h-full object-cover rounded-[10px]"
            onLoadingComplete={() => setImgLoading(false)}
          />

          <div className="absolute top-0 z-10 flex justify-center items-center w-full h-full">
            <Link
              aria-label="education"
              className="pointer-events-auto w-fit hover:scale-105 duration-100"
              href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}/${item.slug}`}
            >
              <svg
                width="78"
                height="78"
                viewBox="0 0 78 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  className="fill-white/80 dark:fill-black/70"
                  width="78"
                  height="78"
                  rx="39"
                  fillOpacity="0.51"
                />

                <path
                  className="fill-white"
                  d="M54 34.3039C58 36.6133 58 42.3868 54 44.6962L35.25 55.5215C31.25 57.8309 26.25 54.9441 26.25 50.3253V28.6747C26.25 24.0559 31.25 21.1691 35.25 23.4785L54 34.3039Z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Category / Subcategory */}
      <div className="relative w-[95%] z-[10] flex flex-row justify-start items-center gap-1 mt-[-10px] pe-16 pointer-events-none">
        <Link
          aria-label="education"
          href={`/${params.lang}/education/category/${item.category.slug}`}
          className="pointer-events-auto text-start text-matn-2 font-medium font-azarMehr text-[13px] 3xl:text-[16px]"
        >
          {item.category.name}
        </Link>

        <span className="font-azarMehr text-matn-2">/</span>

        <Link
          aria-label="education"
          href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}`}
          className="pointer-events-auto text-start text-matn-2 whitespace-nowrap font-medium font-azarMehr text-[13px] 3xl:text-[16px]"
          data-tooltip-id={subCategoryTooltipId}
        >
          {item.sub_category.name.length > 30
            ? item.sub_category.name.slice(0, 25) + "..."
            : item.sub_category.name}
        </Link>

        <ReactTooltip
          id={subCategoryTooltipId}
          content={item.sub_category.name}
          place="bottom"
          positionStrategy="fixed"
          style={{
            backgroundColor: theme === "dark" ? "#000" : "#e9eef8",
            color: theme === "dark" ? "#fff" : "#000",
            fontSize: "16px",
            fontWeight: "bold",
            opacity: 1,
            zIndex: 99999,
          }}
        />
      </div>

      {/* Title */}
      <Link
        className="relative w-[95%] mt-[-24px] z-[1]"
        aria-label="education"
        href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}/${item.slug}`}
      >
        <p
          ref={titleRef}
          className={`dark:text-white text-blac text-start w-full font-azarMehr truncate cursor-pointer font-bold mt-[8px] text-[18px] 3xl:text-[22px] ${
            isTruncated
              ? "hover:overflow-visible hover:animate-rtlMarquee"
              : ""
          }`}
        >
          {item.title}
        </p>
      </Link>

      {/* Description */}
      <Link
        className="relative w-[95%] z-[1] mt-[-20px] text-matn-2 dark:text-matn-2"
        aria-label="education"
        href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}/${item.slug}`}
      >
        <p className="text-[12px] 3xl:text-[16px] line-clamp-2 overflow-hidden">
          {stripHtml(item.description)}
        </p>
      </Link>

      {/* Footer */}
      <div className="relative w-[95%] z-[1] pb-2 flex flex-row justify-between items-center pointer-events-none">
        <Link
          aria-label="citizen"
          href={`/${params.lang}/citizen/${item.creator.code}`}
          className="pointer-events-auto"
        >
          <div className="flex flex-row justify-start items-center gap-2">
            <Image
              src={item.creator.image}
              alt={"pic" + item.creator.code}
              width={100}
              height={100}
              loading="lazy"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />

            <span className="text-blueLink text-[14px] 3xl:text-[18px] font-medium uppercase">
              {item.creator.code}
            </span>
          </div>
        </Link>

        <div className="flex flex-row justify-start items-center gap-3 md:gap-5">
          <div className="flex items-center gap-[5px]">
            <span className="font-azarMehr text-matn-2 text-[13px] 3xl:text-[18px]">
              {formatNumber(item.likes_count)}
            </span>

            <Like className="stroke-matn-2 stroke-2 w-[18px] h-[18px]" />
          </div>

          <hr className="h-[28px] border-l-0 border-y-0 border-solid border-[#D9D9D9] dark:border-[#434343]" />

          <div className="flex items-center gap-[5px]">
            <span className="font-azarMehr text-matn-2 text-[13px] 3xl:text-[18px]">
              {formatNumber(item.dislikes_count)}
            </span>

            <Dislike className="stroke-matn-2 stroke-2" />
          </div>

          <hr className="h-[28px] border-l-0 border-y-0 border-solid border-[#D9D9D9] dark:border-[#434343]" />

          <div className="flex items-center gap-[5px]">
            <span className="font-azarMehr text-matn-2 text-[13px] 3xl:text-[18px]">
              {formatNumber(item.views_count)}
            </span>

            <View className="stroke-matn-2 stroke-2" />
          </div>
        </div>
      </div>
    </div>
  );
}