"use client";
import { DashboardHeaderModule } from "@/components/module/categories/DashboardHeaderModule";
import { Dislike, Like, Video, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SubcategoryComponent({
  subCategoryData,
  params,
  mainData,
}: any) {
  const [height, setHeight] = useState(0);
  const [shows, setShows] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  console.log("CategoryData", subCategoryData);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(shows ? contentRef.current.scrollHeight : 0);
    }
  }, [shows]);

  const pushRgb = (data: any) => {
    router.push(`https://rgb.irpsc.com/${params.lang}/citizen/${data}`);
  };

  return (
    <>
      <div
        className={`relative w-full px-4 mt-10 bg-white dark:bg-black transition-all duration-300 ease-in-out`}
        style={{ height: shows ? `${height + 500}px` : "500px" }}
      >
        <Image
          src={subCategoryData.image}
          alt="img"
          width={500}
          height={400}
          priority={true}
          className=" w-full h-[400px] rounded-xl object-cover"
        />
        <DashboardHeaderModule
          mainData={mainData}
          categoryData={subCategoryData}
          shows={shows}
          setShows={setShows}
          contentRef={contentRef}
        />
      </div>

      {/* <div className="flex flex-wrap justify-start items-center gap-2 w-full  relative z-50">
        <Link
          href={`/${params.lang}/education`}
          className="w-fit ms-5 font-normal font-azarMehr text-[15px] text-start text-[#575757] cursor-pointer"
        >
          آموزش
        </Link>
        <span className="text-[#575757] font-normal font-azarMehr text-[15px]">
          /
        </span>
        <Link
          href={`/${params.lang}/education/category/all`}
          className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] text-start text-[#575757] whitespace-nowrap  hover:text-blueLink hover:dark:text-dark-yellow"
        >
          دسته بندی ها
        </Link>
        <span className="text-[#575757] font-normal font-azarMehr text-[15px]">
          /
        </span>
        <Link
          href={`/${params.lang}/education/category/${subCategoryData.category.slug}`}
          className="w-fit font-normal font-azarMehr text-[15px] text-start text-[#575757] whitespace-nowrap cursor-pointer hover:text-blueLink hover:dark:text-dark-yellow"
        >
          {subCategoryData.category.name}
        </Link>
        <span className="text-[#575757] font-normal font-azarMehr text-[15px]">
          /
        </span>
        <p className="w-fit font-normal font-azarMehr text-[15px] text-start text-blueLink dark:text-dark-yellow whitespace-nowrap">
          {subCategoryData.name}
        </p>
      </div> */}

      <p className="w-full text-black dark:text-white ps-5 mt-10 font-bold font-azarMehr text-[22px] text-start">
        {findByUniqueId(mainData, 344)} {subCategoryData.name}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-full h-fit px-5 mt-10">
        {subCategoryData &&
          subCategoryData.videos.map((item: any) => (
            <div
              key={item.id}
              className="w-[100%]   min-h-[240px]  shadow-md hover:shadow-xl hover:dark:shadow-dark  rounded-[10px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center"
            >
              <div className=" group w-full h-[266px] rounded-t-[10px] relative">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  width={600}
                  height={600}
                  priority={true}
                  className=" w-full h-full transition-all duration-150 ease-in-out rounded-t-[10px]  object-cover"
                />
                <div className="w-full h-full bg-black/20 absolute z-0 top-0 flex justify-center items-center">
                  <Link
                    className="w-fit"
                    href={`/${params.lang}/education/category/${subCategoryData.category.slug}/${subCategoryData.slug}/${item.slug}`}
                  >
                    <Video className="w-[78px] h-[78px] p-3 fill-blueLink dark:fill-dark-yellow  rounded-full bg-white/80" />
                  </Link>
                </div>
              </div>

              <Link
                className="w-[95%]"
                href={`/${params.lang}/education/category/${subCategoryData.category.slug}/${subCategoryData.slug}/${item.slug}`}
              >
                <p className="text-start  w-full font-azarMehr truncate cursor-pointer font-bold mt-[8px] text-[18px] 3xl:text-[22px] dark:text-white text-black">
                  {item.title}
                </p>
              </Link>
              <div className="flex flex-row items-center justify-start  mt-[-8px] w-[98%]"></div>
              <div className="w-[95%] pb-2 flex flex-row justify-between  items-center">
                <>
                  <Link
                    href={`/${params.lang}/citizen/${item.creator.code}`}
                    target="_blank"
                  >
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Image
                        src={item.creator.image}
                        alt={item.creator.code}
                        width={1000}
                        height={1000}
                        loading="lazy"
                        className="w-[45px] h-[45px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
                        onClick={() => pushRgb(item.creator.code)}
                      />
                      <span
                        className="text-blueLink  cursor-pointer text-[14px] 3xl:text-[18px] whitespace-nowrap font-medium hover:font-bold uppercase "
                        onClick={() => pushRgb(item.creator.code)}
                      >
                        {item.creator.code}
                      </span>
                    </div>
                  </Link>
                  <div className="flex flex-row justify-start items-center gap-5">
                    <span className=" whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray me-[-13px]">
                      {formatNumber(item.dislikes_count)}
                    </span>
                    <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px] " />
                    <span className="whitespace-nowrap font-azarMehr font-normal  3xl:text-[18px] text-gray dark:text-dark-gray me-[-10px]">
                      {formatNumber(item.likes_count)}
                    </span>
                    <Dislike className="stroke-gray  dark:stroke-dark-gray stroke-2 " />

                    <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray me-[-13px]">
                      {formatNumber(item.views_count)}
                    </span>
                    <View className="stroke-gray dark:stroke-dark-gray stroke-2 " />
                  </div>
                </>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
