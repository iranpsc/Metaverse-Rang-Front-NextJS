"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense, useRef, useState } from "react";
import axios from "axios";

import ListSubCategories from "./ListSubCategories";
import { DashboardHeaderModule } from "@/components/module/categories/DashboardHeaderModule";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

const SearchComponent = dynamic(() => import("@/components/shared/SearchComponent"), { suspense: true });

const CategoryComponent = ({ CategoryData, mainData, params }: any) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState(CategoryData.subcategories || []);
  const [shows, setShows] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);

    const resVideos = await axios.get(
      `https://api.rgb.irpsc.com/api/tutorials?page=${nextPage}`
    );

    const newVideosData = resVideos.data.data;
    setVideos((prevVideos: any) => [...prevVideos, ...newVideosData]);
    setLoading(false);
  };

  // اضافه کردن videos به CategoryData برای ListSubCategories
  const CategoryDataWithSubcategories = {
    ...CategoryData,
    subcategories: videos
  };

  return (
    <section className="w-full h-fit flex flex-col justify-start items-center relative mt-10">
      <section className="w-full h-fit flex flex-col justify-center items-center">
        <div className="relative w-full px-4 gap-5 lg:gap-10 flex flex-col lg:flex-row transition-all duration-300 ease-in-out">
          <div className="w-full md:w-1/2 lg:w-[35%] 3xl:w-[30%] h-max">
            <div className="relative w-full h-[365px] 3xl:h-[400px]">
              <Image
                src={CategoryData.image}
                alt="img"
                fill
                priority
                fetchPriority="high"
                quality={70}
                sizes="
                  (max-width: 640px) 200px,
                  (max-width: 1024px) 350px,
                  (max-width: 1536px) 540px,
                  512px
                "
                className="object-cover rounded-xl"
              />
            </div>
          </div>

          <DashboardHeaderModule
            mainData={mainData}
            categoryData={CategoryData}
            shows={shows}
            setShows={setShows}
            contentRef={contentRef}
          />
        </div>

        <div className="w-full h-fit pt-5 flex flex-col justify-center items-center gap-[24px] transition-all duration-300 easy-in-out">
          <div className="flex flex-col-reverse lg:gap-5 lg:flex-row lg:justify-between items-center w-full px-5 lg:px-0">
            <h1 className="md:w-1/2 lg:ms-5 mt-5 font-bold font-azarMehr text-[22px] text-start dark:text-white text-black">
              {findByUniqueId(mainData, 455)} {CategoryData.name}
            </h1>

            <Suspense fallback={<div className="text-center !mx-0 w-full text-[20px] lg:w-1/2">loading...</div>}>
              <SearchComponent searchLevel="education" mainData={mainData} params={params} />
            </Suspense>
          </div>

          {/* لیست زیرمجموعه‌ها با Load More */}
          <ListSubCategories
            params={params}
            loadMore={loadMore}
            CategoryData={CategoryDataWithSubcategories}
            loading={loading}
            mainData={mainData}
          />
        </div>
      </section>
    </section>
  );
};

export default CategoryComponent;
