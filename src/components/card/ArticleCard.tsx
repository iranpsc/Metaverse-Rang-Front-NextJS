"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { formatNumber } from "@/components/utils/formatNumber";
import { stripHtml } from "@/components/utils/stripHtml";

interface ArticleCardProps {
  item: any;
  params: { lang: string };
  theme?: "light" | "dark";
  activeLoadingId?: any;
  setActiveLoadingId?: any;
  /** پیش‌فرض true (رفتار قبلی). در جاهایی که کارت زیر fold است false بده تا با LCP رقابت نکند. */
  imagePriority?: boolean;
}

export default function ArticleCard({ item, params, theme, activeLoadingId, setActiveLoadingId, imagePriority = true }: ArticleCardProps) {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const checkTruncation = () => {
    const el = titleRef.current;
    if (el) setIsTruncated(el.scrollWidth > el.clientWidth);
  };

  useEffect(() => {
    checkTruncation();
    const observer = new ResizeObserver(() => checkTruncation());
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, [item.title]);

  const isLoading = activeLoadingId === item.id;
  return (
    <div onClickCapture={() => setActiveLoadingId?.(item.id)} className={`relative ${isLoading ? "rotating-border-card cursor-not-allowed" : ""} w-[100%] min-h-[240px] shadow-md hover:shadow-xl hover:dark:shadow-dark rounded-[10px] overflow-hidden bg-white dark:bg-gray-1  flex flex-col justify-start gap-6 items-center`}>
    {/*
      قبلاً کل کارت یک <Link> بود و داخلش چند <Link> دیگر (دسته‌بندی، نویسنده، ...) قرار داشت.
      <a> تو در تو در HTML نامعتبر است: وقتی کارت روی سرور رندر می‌شود، مرورگر آن را
      وسط parse می‌شکند و کارت تا hydration به‌هم‌ریخته دیده می‌شود.
      حالا کارت یک div است و یک لینک شفاف تمام‌قد (overlay) کلیک روی بقیه‌ی کارت را می‌گیرد.
    */}
      <Link
        href={`/${params.lang}/articles/categories/${item.categorySlug}/${item.slug}`}
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 z-0"
      />
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 " />
        </div>
      )}
      {/* تصویر مقاله */}
      <div className="group w-full h-[260px] overflow-hidden px-4 pt-4 z-[1] pointer-events-none">
        <div className="relative h-full w-full">
          {imgLoading && (
            <div className="absolute inset-0 h-full w-full bg-dark-gray dark:bg-matn-2 animate-pulse rounded-[10px] z-20" />
          )}
          <Image
            src={item.image || "/rafiki-dark.png"}
            alt={item.title}
            width={400}
            height={260}
            priority={imagePriority}
            quality={70}
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 473px, 400px"
            className="w-[100%] h-full object-cover rounded-[10px]"
            onLoadingComplete={() => setImgLoading(false)}
          />

        </div>
      </div>

      {/* دسته‌بندی */}
      <div className="w-[95%] flex flex-row justify-start items-center gap-1 mt-[-10px] pe-16 z-[1] pointer-events-none">
        <Link
          href={`/${params.lang}/articles/categories/${item.categorySlug}`}
          className="pointer-events-auto text-start text-matn-2  font-medium font-azarMehr text-[13px] 3xl:text-[16px] text-nowrap"
        >
          {item.category}
        </Link>
        {item.subCategory && (
          <>
            <span className="font-azarMehr text-matn-2 ">/</span>
            <Link
              href={`/${params.lang}/articles/categories/${item.categorySlug}/${item.subCategory}`}
              className="pointer-events-auto text-start text-matn-2  whitespace-nowrap font-medium font-azarMehr text-[13px] 3xl:text-[16px] truncate"
              data-tooltip-id={item.subCategory}
            >
              {item.subCategory.length > 30
                ? item.subCategory.slice(0, 25) + "..."
                : item.subCategory}
            </Link>
            <ReactTooltip
              id={item.subCategory}
              content={item.subCategory}
              place="bottom"
              style={{
                backgroundColor: theme === "dark" ? "#000" : "#e9eef8",
                color: theme === "dark" ? "#fff" : "#000",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />
          </>
        )}
      </div>

      {/* عنوان مقاله */}
      <Link
        href={`/${params.lang}/articles/categories/${item.categorySlug}/${item.slug}`}
        className="w-[95%] mt-[-24px] z-[1]"
      >
        <p
          ref={titleRef}
          className={`dark:text-white text-black text-start w-full font-azarMehr truncate cursor-pointer font-bold mt-[8px] text-[18px] 3xl:text-[22px] ${isTruncated
            ? "hover:overflow-visible hover:animate-rtlMarquee"
            : ""
            }`}
        >
          {item.title}
        </p>
      </Link>

      {/* توضیح کوتاه */}
      <Link
        href={`/${params.lang}/articles/categories/${item.categorySlug}/${item.slug}`}
        className="w-[95%] mt-[-20px] text-matn-2 dark:text-matn-2 z-[1]"
      >
        <p className="text-[12px] 3xl:text-[16px] line-clamp-2 break-words overflow-hidden">
          {stripHtml(item.excerpt || item.description)}
        </p>
      </Link>

      {/* نویسنده و آمار */}
      <div className="w-[95%] pb-2 flex flex-row justify-between items-center z-[1] pointer-events-none">
        <Link
          href={`/${params.lang}/citizens/${item.author.citizenId}`}
          aria-label="Author profile"
          className="pointer-events-auto"
        >
          <div className="flex flex-row justify-start items-center gap-2">
            <Image
              src={item.author.avatar || "https://s3.metarang.com/metarang/logo/metarang-logo-512.png"}
              alt={item.author.name}
              width={45}
              height={45}
              loading="lazy"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <span className="text-blueLink text-[14px] 3xl:text-[18px] font-medium uppercase">
              {item.author.citizenId}
            </span>
          </div>
        </Link>

        <div className="flex flex-row justify-start items-center gap-3 md:gap-5">
          <div className="flex items-center gap-[5px]">
            <span className="font-azarMehr text-matn-2  text-[13px] 3xl:text-[18px]">
              {formatNumber(item.stats.likes)}
            </span>
            <Like className="stroke-matn-2  stroke-2 w-[18px] h-[18px]" />
          </div>

          <hr className="h-[28px] border-l-0 border-y-0 border-solid border-[#D9D9D9] dark:border-[#434343]" />

          <div className="flex items-center gap-[5px]">
            <span className="font-azarMehr text-matn-2  text-[13px] 3xl:text-[18px]">
              {formatNumber(item.stats.dislikes)}
            </span>
            <Dislike className="stroke-matn-2  stroke-2" />
          </div>

          <hr className="h-[28px] border-l-0 border-y-0 border-solid border-[#D9D9D9] dark:border-[#434343]" />

          <div className="flex items-center gap-[5px]">
            <span className="font-azarMehr text-matn-2  text-[13px] 3xl:text-[18px]">
              {formatNumber(item.stats.views)}
            </span>
            <View className="stroke-matn-2  stroke-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
