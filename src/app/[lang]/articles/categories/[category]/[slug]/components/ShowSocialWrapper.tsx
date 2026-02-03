"use client";

import { useState } from "react";
import ShredPageArticle from "./ShredpageArticle";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { CopyIcon } from "@/components/svgs/SvgCategories";
import { Like, Dislike, Comment } from "@/components/svgs/SvgEducation";

interface ArticleStats {
  comments: number;
  likes: number;
  dislikes: number;

}

interface Article {
  stats: ArticleStats;
  slug: string;             // اضافه شد
  categorySlug?: string;    // اضافه شد
}

export default function ShowSocialWrapper({
  params,
  mainData,
  article,
}: {
  params: any;
  mainData: any;
  article: Article;
}) {
  const [showSocial, setShowSocial] = useState(false);

  return (
    <div className="flex w-full gap-5 items-center justify-between px-[2px]">

      <div
        onClick={() => setShowSocial(!showSocial)}
        className="dark:bg-dark-yellow bg-blueLink flex flex-row w-max items-center gap-2 cursor-pointer rounded-[10px] 3xl:py-[3px] 3xl:px-4 lg:py-2 lg:px-2 md:py-2 md:px-4 sm:py-2 sm:px-4 xs:py-1 xs:px-2"
      >
        <span className="font-azarMehr dark:text-[#000] text-[#fff] font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle sm:text-smTitle xs:text-smTitle">
          {findByUniqueId(mainData, 244)}
        </span>
        <CopyIcon className="dark:fill-[#000] fill-[#fff] 3xl:w-[20px] 3xl:h-[20px] md:w-[20px] md:h-[20px]" />
      </div>

      <div className="flex md:hidden items-center text-sm md:text-base w-full">
        <div className="flex justify-end  items-center gap-5 w-full text-textGray dark:text-[#888888]">
          <span className=" items-center gap-1 flex">
            <Comment className="stroke-textGray dark:stroke-[#888888] size-[16px]" />
            {article.stats.comments}
          </span>
          <span className=" items-center gap-1 flex">
            <Like className="stroke-textGray dark:stroke-[#888888] size-[16px]" />
            {article.stats.likes}
          </span>
          <span className=" items-center gap-1 flex">
            <Dislike className="stroke-textGray dark:stroke-[#888888] size-[16px]" />
            {article.stats.dislikes}
          </span>
        </div>
      </div>

      {/* مودال یا بخش اشتراک‌گذاری */}
      {showSocial && (
        <ShredPageArticle
          params={params}
          mainData={mainData}
          setShowSocial={setShowSocial}
          article={article}
        />
      )}
    </div>
  );
}
