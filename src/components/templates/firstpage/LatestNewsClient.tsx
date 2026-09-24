"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calender,
  Timer,
  View,
} from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/formatNumber";
import type { News } from "./LastNews";

interface Props {
  articles: News[];
  params: {
    lang: string;
  };
}

const getCategorySlug = (
  item: {
    categorySlug?: string;
    category?: string;
  }
) =>
  item.categorySlug ||
  item.category?.toLowerCase().replace(/\s+/g, "-") ||
  "general";

const stripHtml = (html: string) => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
};

export default function LatestNewsClient({
  articles,
  params,
}: Props) {
  const [activeLoadingId, setActiveLoadingId] = useState<
    string | number | null
  >(null);

  const featured = articles[0];
  const sideNews = articles.slice(1, 4);

  return (
    <div className="flex flex-col lg:flex-row w-full items-center gap-10">
      {/* خبر ویژه */}
      {featured && (
        <div
          className={
            activeLoadingId === featured.id
              ? "rotating-border-card cursor-not-allowed p-1 w-full lg:w-1/2 dark:bg-matn-2-800 rounded-md overflow-hidden duration-300"
              : "p-1 w-full lg:w-1/2 dark:bg-matn-2-800 rounded-md overflow-hidden duration-300"
          }
        >
          {/* <a> تو در تو نامعتبر است؛ کارت div است و یک لینک شفاف تمام‌قد دارد. */}
          <div
            onClickCapture={() =>
              setActiveLoadingId(featured.id)
            }
          >
            <div className="relative aspect-square overflow-hidden rounded-md">
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={"lastFeat" + featured.title}
                  fill
                  className="object-cover lg:rounded-md"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={75}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-matn-2-200 flex items-center justify-center">
                  <span className="text-matn-2-400">
                    بدون تصویر
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none p-5 xl:p-[32px] text-white w-full flex flex-col gap-4 items-center">
                {featured.category && (
                  <div className="border-2 border-solid border-dark-gray py-2 px-5 rounded-full w-max">
                    <Link
                      href={`/${params.lang}/news/categories/${getCategorySlug(
                        featured
                      )}`}
                      className="pointer-events-auto text-xs lg:text-base font-medium dark:text-[#F2F2F2]"
                    >
                      {featured.category}
                    </Link>
                  </div>
                )}

                <p className="text-xl md:text-2xl font-rokh text-center font-bold line-clamp-2 leading-9">
                  {featured.title}
                </p>

                {featured.excerpt && (
                  <p className="text-sm md:text-base text-matn-2-200 line-clamp-2">
                    {stripHtml(featured.excerpt)}
                  </p>
                )}

                <div className="flex w-full items-center justify-center gap-4 2xl:gap-10 text-sm pb-2">
                  {featured.stats && (
                    <div className="flex gap-2 items-center">
                      <span>
                        {formatNumber(
                          featured.stats?.views ?? 0
                        )}
                      </span>
                      <View className="stroke-dark-gray size-5" />
                    </div>
                  )}

                  |

                  {featured.date && (
                    <div className="flex gap-2 items-center">
                      <time dateTime={featured.date}>
                        {featured.date.split("T")[0]}
                      </time>

                      <Calender className="stroke-dark-gray size-5" />
                    </div>
                  )}

                  {featured.readingTime && <div>|</div>}

                  {featured.readingTime && (
                    <div className="flex items-center gap-2">
                      <span>{featured.readingTime} دقیقه</span>
                      <Timer className="stroke-dark-gray size-5" />
                    </div>
                  )}
                </div>
              </div>

              <Link
                href={`/${params.lang}/news/categories/${getCategorySlug(
                  featured
                )}/${featured.slug}`}
                aria-hidden="true"
                tabIndex={-1}
                className="absolute inset-0 z-[1]"
              />
            </div>
          </div>
        </div>
      )}

      {/* سه خبر کناری */}
      <div className="flex flex-col gap-[28px] w-full lg:w-1/2">
        {sideNews.map((item) => {
          const isLoading = activeLoadingId === item.id;

          return (
            <div
              key={String(item.id)}
              onClickCapture={() =>
                setActiveLoadingId(item.id)
              }
              className={`relative bg-white dark:bg-gray-1 lg:!bg-bg-primary rounded-lg h-auto p-4 lg:p-1 ${
                isLoading
                  ? "rotating-border-card cursor-not-allowed"
                  : ""
              }`}
            >
              <Link
                href={`/${params.lang}/news/categories/${getCategorySlug(
                  item
                )}/${item.slug}`}
                aria-hidden="true"
                tabIndex={-1}
                className="absolute inset-0 z-0"
              />
              <div className="flex lg:flex-row flex-col w-full z-10">
                <div className="relative w-full lg:w-[40%] h-[250px] lg:h-[176px] overflow-hidden z-10 pointer-events-none">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={"lastN " + item.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 90vw, 15vw"
                      quality={50}
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs text-matn-2-500">
                      بدون عکس
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-[60%] p-3 lg:ps-5 h-full bg-white lg:!bg-bg-primary dark:bg-gray-1 lg:z-10">
                  {item.category && (
                    <Link
                      href={`/${params.lang}/news/categories/${getCategorySlug(
                        item
                      )}`}
                      className="relative z-10 border-2 border-solid border-dark-gray py-2 px-5 rounded-full w-max"
                    >
                      <span className="text-xs lg:text-base font-medium dark:text-[#F2F2F2]">
                        {item.category}
                      </span>
                    </Link>
                  )}

                  <p className="font-bold text-sm text-center lg:text-start lg:text-lg line-clamp-2 dark:text-white">
                    {item.title}
                  </p>

                  <div className="text-sm text-matn-2-500 dark:text-[#969696] flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {item.date && (
                        <time dateTime={item.date}>
                          {item.date.split("T")[0]}
                        </time>
                      )}

                      <Calender className="stroke-dark-gray size-5" />
                    </div>

                    {item.readingTime && (
                      <div className="flex items-center gap-2">
                        <span>{item.readingTime} دقیقه</span>
                        <Timer className="stroke-dark-gray size-5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}