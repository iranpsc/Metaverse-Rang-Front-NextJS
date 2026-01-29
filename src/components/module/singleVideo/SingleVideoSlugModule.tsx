"use client";

import Link from "next/link";
import { useState } from "react";

export default function SingleVideoSlugModule({ DataVideo, params }: any) {
  const [linkLoading, setLinkLoading] = useState(false);
  return (
    <>
    {linkLoading && (
              <div className="fixed top-0 left-0 bottom-0  w-full  h-screen z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm" >
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
      <div className="flex flex-wrap px-5 xl:px-10 justify-start items-center gap-2 xs:gap-4 w-full h-fit pt-5 bg-white dark:bg-dark-background rounded-t-[20px] ">
        <Link onClickCapture={() => setLinkLoading(true)}
          className="w-fit font-normal font-azarMehr text-[15px] xs:text-[12px] text-start text-[#575757] dark:text-lightGray cursor-pointer  hover:text-blueLink hover:dark:text-dark-yellow"
          href={`/${params.lang}/education`}
        >
          آموزش
        </Link>

        <span className="text-[#575757] dark:text-lightGray font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>

        <Link onClickCapture={() => setLinkLoading(true)}
          className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] xs:text-[12px] text-start text-[#575757] dark:text-lightGray  hover:text-blueLink hover:dark:text-dark-yellow xs:whitespace-nowrap"
          href={`/${params.lang}/education/category`}
        >
          دسته بندی ها
        </Link>

        <span className="text-[#575757] dark:text-lightGray font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>

        <Link onClickCapture={() => setLinkLoading(true)}
          className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] xs:text-[12px] text-start text-[#575757] dark:text-lightGray  hover:text-blueLink hover:dark:text-dark-yellow xs:whitespace-nowrap"
          href={`/${params.lang}/education/category/${DataVideo.category.slug}`}
        >
          {DataVideo.category.name}
        </Link>

        <span className="text-[#575757] dark:text-lightGray font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>

        <Link onClickCapture={() => setLinkLoading(true)}
          className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] xs:text-[12px] text-start text-[#575757] dark:text-lightGray  hover:text-blueLink hover:dark:text-dark-yellow xs:whitespace-nowrap"
          href={`/${params.lang}/education/category/${DataVideo.category.slug}/${DataVideo.sub_category.slug}`}
        >
          {DataVideo.sub_category.name}
        </Link>

        <span className="text-[#575757] dark:text-lightGray font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>
        <p className="w-fit font-normal font-azarMehr text-[15px]  xs:text-[12px] text-start text-blueLink dark:text-dark-yellow xs:whitespace-nowrap">
          {DataVideo.title}
        </p>
      </div>
    </>
  );
}
