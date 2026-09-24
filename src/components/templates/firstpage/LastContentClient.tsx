"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/svgs";
import ArticleCard from "@/components/card/ArticleCard";
import type { HomeArticle } from "./homeData";

interface LastContentClientProps {
  articles: HomeArticle[];
  params: { lang: string };
  title?: string;
  moreLabel?: string;
}

/**
 * فقط بخش‌های تعاملی (overlay لودینگ لینک و کارت فعال) کلاینتی هستند.
 * ظاهر دقیقاً همان LastContent قبلی است.
 */
export default function LastContentClient({
  articles,
  params,
  title,
  moreLabel,
}: LastContentClientProps) {
  const [linkLoading, setLinkLoading] = useState(false);
  const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);
  const direction = params.lang === "fa" ? "rtl" : "ltr";

  return (
    <section className="w-full relative">
      {linkLoading && (
        <div className="fixed top-0 left-0 bottom-0  w-full  h-screen z-[40] flex items-center justify-center bg-black/60 backdrop-blur-sm">
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

      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {title}
        </p>
        <Link
          onClickCapture={() => setLinkLoading(true)}
          href={`/${params.lang}/articles`}
        >
          <div className="flex justify-center items-center gap-4">
            <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
              {moreLabel}
            </p>
            <ArrowRight
              className={`dark:stroke-white stroke-black w-[24px] h-full ${
                direction === "rtl" ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-10 mt-6 md:mt-12">
        {articles.map((item) => (
          <ArticleCard
            key={String(item.id)}
            item={item}
            params={params}
            activeLoadingId={activeLoadingId}
            setActiveLoadingId={setActiveLoadingId}
            imagePriority={false}
          />
        ))}
      </div>
    </section>
  );
}
