"use client"; // ⚠️ حتما اضافه شود

import { useState } from "react";
import { Like, Dislike, View, Folder } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";


// کامپوننت متن کوتاه/بلند
const Description = ({ shortText, fullText }: { shortText: string; fullText: string }) => {
  const [expanded, setExpanded] = useState(false);

  if (!shortText) return null; // قبل از Hydration، هیچ چیزی رندر نمی‌کنیم

  return (
    <p className="w-full font-azarMehr font-normal text-[16px] text-justify dark:text-[#84858F] !inline">
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
  // console.log(categoryData);
  return (
    <div className="relative z-10 flex flex-col justify-center lg:justify-start gap-5 w-full lg:w-1/2 xl:w-[65%] 3xl:w-[70%]">
      <h1 className="text-start font-azarMehr dark:text-white text-black whitespace-nowrap font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px]  text-xl text-wrap">
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
      <div className="w-full grid grid-cols-3 gap-y-10 lg:grid-cols-7 justify-between lg:justify-start  lg:gap-10 items-center">
        {categoryData.videos_count !== undefined && categoryData.videos_count !== null &&(
          <div className="flex flex-col gap-1 md:gap-2 w-max">
            <div className="flex flex-row items-center justify-start gap-1 md:gap-3">
              <Folder className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] stroke-[#84858F] stroke-[1.5px]" />
              <span className="whitespace-nowrap font-azarMehr font-normal text-sm lg:text-[20px]  text-[#84858F] ">
                زیر دسته ها
              </span>
            </div>
            <span className="whitespace-nowrap font-azarMehr font-medium text-sm lg:text-[20px] text-gray dark:text-white ms-1">
              {formatNumber(categoryData.videos_count)} عدد  
            </span>
          </div>
        )}
        <hr className="h-[50px] mx-auto w-[1px] border-l-0 border-y-0  border-solid border-[#D9D9D9] dark:border-[#434343]" />
        {categoryData.likes_count !== undefined && categoryData.likes_count !== null && (
          <div className="flex flex-col gap-1 md:gap-2  w-max">
            <div className="flex flex-row items-center justify-start gap-1 md:gap-3">
              <Like className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] stroke-[#84858F]" />
              <span className="whitespace-nowrap font-azarMehr font-medium text-sm lg:text-[20px] text-[#84858F] ">
                پسندیدند
              </span>
            </div>
            <span className="whitespace-nowrap font-azarMehr font-medium text-sm lg:text-[20px] text-gray dark:text-white ms-1">
              {formatNumber(categoryData.likes_count)}
            </span>
          </div>
        )}

        <hr className="h-[50px] hidden mx-auto  w-[1px] md:block border-l-0 border-y-0  border-solid border-[#D9D9D9] dark:border-[#434343]" />
        {categoryData.dislikes_count !== undefined && categoryData.likes_count !== null && (
          <div className="flex flex-col gap-1 md:gap-2  w-max">
            <div className="flex flex-row items-center justify-start gap-1 md:gap-3">
              <Dislike className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] stroke-[#84858F]" />
              <span className="whitespace-nowrap font-azarMehr font-normal text-sm lg:text-[20px] text-[#84858F] dark:text-dark-gray">
                نپسندیدند
              </span>
            </div>
            <span className="whitespace-nowrap font-azarMehr font-medium text-sm lg:text-[20px] text-gray dark:text-white ms-1">
              {formatNumber(categoryData.dislikes_count)}
            </span>
          </div>
        )}
        <hr className="h-[50px] mx-auto  w-[1px] border-l-0 border-y-0  border-solid border-[#D9D9D9] dark:border-[#434343]" />
        {categoryData.views_count !== undefined && categoryData.views_count !== null &&(
          <div className="flex flex-col gap-1 md:gap-2  w-max">
            <div className="flex flex-row items-center justify-start gap-1 md:gap-3">
              <View className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] stroke-[#84858F] " />
              <span className="whitespace-nowrap font-azarMehr font-normal text-sm lg:text-[20px] text-[#84858F] ">
                بازدید
              </span>
            </div>
            <span className="whitespace-nowrap font-azarMehr font-medium text-sm lg:text-[20px]  text-gray dark:text-white ">{formatNumber(categoryData.views_count)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
