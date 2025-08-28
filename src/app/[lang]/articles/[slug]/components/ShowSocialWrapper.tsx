"use client";

import { useState } from "react";
import ShredPageArticle from "./ShredpageArticle";
import { findByUniqueId } from "../../../../../components/utils/findByUniqueId";
import { CopyIcon } from "@/components/svgs/SvgCategories";
export default function ShowSocialWrapper({ params, mainData }: { params: any; mainData: any }) {
  const [showSocial, setShowSocial] = useState(false);

  return (
    <>
      <div  onClick={() => setShowSocial(!showSocial)} className=" dark:bg-dark-yellow bg-blueLink flex flex-row w-max items-center gap-2  rounded-[10px] 3xl:py-[3px] 3xl:px-4 lg:py-2 lg:px-2 md:py-2 md:px-4 sm:py-2 sm:px-4 xs:py-1 xs:px-2">
        <span className="font-azarMehr dark:text-[#000] text-[#fff] font-medium 3xl:text-xl3Title xl:text-xlTitle  lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle">
          {/* {targetData(userProperty, "share")} */}
          {findByUniqueId(mainData, 244)}
        </span>
        <CopyIcon className="dark:fill-[#000] fill-[#fff] 3xl:w-[20px] 3xl:h-[20px] md:w-[20px] md:h-[20px] " />
      </div>

      {showSocial && (
        <ShredPageArticle
          params={params}
          mainData={mainData}
          setShowSocial={setShowSocial}
        />
      )}
    </>
  );
}
