"use client"; // ⚠️ حتما اضافه شود

import { useState } from "react";
import { Like, Dislike, View, Videos } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

// کامپوننت متن کوتاه/بلند
const Description = ({ shortText, fullText }: { shortText: string; fullText: string }) => {
  const [expanded, setExpanded] = useState(false);

  if (!shortText) return null; // قبل از Hydration، هیچ چیزی رندر نمی‌کنیم

  return (
    <p className="w-full font-azarMehr font-normal text-[16px] text-justify dark:text-white !inline">
      {!expanded ? (
        <>
          <span className="!inline  [&>p]:inline ![&>p>ol>li]:inline" dangerouslySetInnerHTML={{ __html: shortText }} />
          {fullText.length > shortText.length && (
            <button
              onClick={() => setExpanded(true)}
              className="bg-transparent  text-sm dark:text-white"
            >
              ...
              <span className="text-light-primary dark:text-dark-yellow hover:underline">مشاهده بیشتر</span>
            </button>
          )}
        </>
      ) : (
        <>
          <span dangerouslySetInnerHTML={{ __html: fullText }} />
          <button
            onClick={() => setExpanded(false)}
            className="inline bg-transparent text-light-primary dark:text-dark-yellow hover:underline text-sm"
          >
            مشاهده کمتر
          </button>
        </>
      )}
    </p>
  );
};

export const DashboardHeaderModule = ({ categoryData, mainData }: any) => {
  return (
    <div className="relative z-10 flex flex-col justify-center lg:justify-start gap-5 w-full lg:w-1/2 xl:w-[65%] 3xl:w-[70%]">
      <h1 className="text-start font-azarMehr dark:text-white text-black whitespace-nowrap font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[14px]">
        {categoryData.name}
      </h1>
      <Description
        shortText={
    categoryData.description
      ? categoryData.description.length > 900
        ? categoryData.description.slice(0, 900)
        : categoryData.description
      : "" 
  }
        fullText={categoryData.description}
      />

      {/* آمار */}
      <div className="w-full flex flex-row justify-evenly gap-1 items-center">
        {categoryData.videos_count && (
          <div className="flex flex-row items-center justify-center gap-3">
            <Videos className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] fill-gray dark:fill-dark-gray" />
            <span className="whitespace-nowrap font-azarMehr font-normal text-[22px] xs:text-[16px] text-gray dark:text-dark-gray">
              {formatNumber(categoryData.videos_count)}
            </span>
          </div>
        )}
        {categoryData.views_count && (
          <div className="flex flex-row items-center justify-center gap-3">
            <View className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] stroke-gray dark:stroke-dark-gray" />
            <span className="whitespace-nowrap font-azarMehr font-normal text-[22px] xs:text-[16px] text-gray dark:text-dark-gray">
              {formatNumber(categoryData.views_count)}
            </span>
          </div>
        )}
        {categoryData.likes_count && (
          <div className="flex flex-row items-center justify-center gap-3">
            <Like className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] stroke-gray dark:stroke-dark-gray" />
            <span className="whitespace-nowrap font-azarMehr font-medium text-[22px] xs:text-[16px] text-gray dark:text-dark-gray">
              {formatNumber(categoryData.likes_count)}
            </span>
          </div>
        )}
        {categoryData.dislikes_count && (
          <div className="flex flex-row items-center justify-center gap-3">
            <Dislike className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] stroke-gray dark:stroke-dark-gray" />
            <span className="whitespace-nowrap font-azarMehr font-normal text-[22px] xs:text-[16px] text-gray dark:text-dark-gray">
              {formatNumber(categoryData.dislikes_count)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
