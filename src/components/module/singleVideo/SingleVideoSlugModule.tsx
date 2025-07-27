"use client";

import Link from "next/link";

export default function SingleVideoSlugModule({ DataVideo, params }: any) {
  return (
    <>
      <div className="flex flex-wrap xs:px-3 justify-start items-center gap-2 xs:gap-4 w-full h-fit pt-5 bg-white dark:bg-dark-background rounded-t-[20px]">
        <Link
          className="w-fit ps-5 font-normal font-azarMehr text-[15px] xs:text-[12px] text-start text-[#575757] dark:text-lightGray cursor-pointer  hover:text-blueLink hover:dark:text-dark-yellow"
          href={`/${params.lang}/education`}
        >
          آموزش
        </Link>

        <span className="text-[#575757] dark:text-lightGray font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>

        <Link
          className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] xs:text-[12px] text-start text-[#575757] dark:text-lightGray  hover:text-blueLink hover:dark:text-dark-yellow xs:whitespace-nowrap"
          href={`/${params.lang}/education/category/all`}
        >
          دسته بندی ها
        </Link>

        <span className="text-[#575757] dark:text-lightGray font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>

        <Link
          className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] xs:text-[12px] text-start text-[#575757] dark:text-lightGray  hover:text-blueLink hover:dark:text-dark-yellow xs:whitespace-nowrap"
          href={`/${params.lang}/education/category/${DataVideo.category.slug}`}
        >
          {DataVideo.category.name}
        </Link>

        <span className="text-[#575757] dark:text-lightGray font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>

        <Link
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
