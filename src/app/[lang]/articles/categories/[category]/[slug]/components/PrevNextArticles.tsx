"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { articles } from "@/components/utils/articles";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";

interface PrevNextArticlesProps {
  params: { lang: string; slug: string ; category: string};
}

const PrevNextArticles = ({ params }: PrevNextArticlesProps) => {
  const currentIndex = articles.findIndex((a) => a.slug === params.slug);

  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <section className="w-full my-10 2xl:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:gap-10 3xl:gap-[100px]">
        {/* کارت مقاله قبلی */}
        <div className="flex flex-col items-center w-full">
          <h3 className="text-center font-bold mb-3 dark:text-white">
            مقاله قبلی
          </h3>
          <div className="w-full">
            {prevArticle ? (
              <Link
                href={`/${params.lang}/articles/categories/${params.category}/${prevArticle.slug}`}
                className="flex flex-col gap-1  bg-white dark:bg-[#1A1A18] shadow-md rounded-2xl overflow-hidden w-full h-[390px]"
              >
                <div className="p-3 w-full">
                  <div className=" w-full h-60  overflow-hidden">
                    <Image
                      src={prevArticle.image}
                      alt={prevArticle.title}
                      fill
                      className="object-cover rounded-lg !static"
                    />
                  </div>
                </div>

                <div className="p-4 pt-0 flex flex-col  justify-between gap-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2 dark:text-[#868B90]">
                    <span>تاریخ انتشار: {prevArticle.date}</span>
                    <div className="flex items-center gap-3 text-[#888888]">
                      <span className="flex items-center gap-1">
                        <View className="stroke-[#888888] size-[14px]" /> {prevArticle.stats.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Like className="stroke-[#888888] size-[14px]" /> {prevArticle.stats.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Dislike className="stroke-[#888888] size-[14px]" /> {prevArticle.stats.dislikes}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm lg:text-xl line-clamp-1 dark:text-white">
                      {prevArticle.title}
                    </h4>
                    <p className="text-xs lg:text-sm text-gray-600 mt-1 line-clamp-2 text-[#868B90]">
                      {prevArticle.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        </div>

        {/* کارت مقاله بعدی */}
        <div className="flex flex-col items-center w-full">
          <h3 className="text-center font-bold mb-3 dark:text-white">
            مقاله بعدی
          </h3>
          <div className=" w-full">
            {nextArticle ? (
              <Link
                href={`/${params.lang}/articles/categories/${params.category}/${nextArticle.slug}`}
                className="flex flex-col gap-1  bg-white dark:bg-[#1A1A18] shadow-md rounded-2xl overflow-hidden w-full h-[390px]"
              >
                {/* تصویر */}
                <div className="p-3">
                  <div className=" w-full h-60 ">
                    <Image
                      src={nextArticle.image}
                      alt={nextArticle.title}
                      fill
                      className="object-cover rounded-lg !static"
                    />
                  </div>
                </div>

                {/* جزئیات */}
                <div className="p-4 flex flex-col ggap-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2 dark:text-white">
                    <span>تاریخ انتشار: {nextArticle.date}</span>
                    <div className="flex items-center gap-3 text-[#888888] ">
                      <span className="flex items-center gap-1">
                        <View className="stroke-[#888888] size-[14px]" /> {nextArticle.stats.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Like className="stroke-[#888888] size-[14px]" /> {nextArticle.stats.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Dislike className="stroke-[#888888] size-[14px]" /> {nextArticle.stats.dislikes}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm lg:text-xl line-clamp-1 dark:text-white">
                      {nextArticle.title}
                    </h4>
                    <p className="text-xs lg:text-sm text-gray-600 mt-1 line-clamp-2 text-[#868B90] ">
                      {nextArticle.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrevNextArticles;
