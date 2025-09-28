"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense, useRef, useState } from "react";
import axios from "axios";
const SearchComponent = dynamic(() => import("@/components/shared/SearchComponent"), { suspense: true });
import ListSubCategories from "./ListSubCategories";
import { DashboardHeaderModule } from "@/components/module/categories/DashboardHeaderModule";
// import SlugsModule from "@/components/module/categories/SlugsModule";
// import { motion, useAnimation } from "framer-motion";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
const CategoryComponent = ({ CategoryData, mainData, params }: any) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [shows, setShows] = useState<boolean>(false);
  const [videos, setVideos] = useState(CategoryData);
  const [height, setHeight] = useState(0);

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

  return (
    <section className="w-full h-fit flex flex-col justify-start items-center relative mt-10 ">
      <section className="  w-full h-fit flex  flex-col justify-center items-center">
        <div
          className={`relative w-full px-4 gap-10 flex flex-col  lg:flex-row   transition-all duration-300 ease-in-out`}

        >
          <div className="w-full md:w-1/2 lg:w-[35%] 3xl:w-[30%] h-max">
            <Image
              src={CategoryData.image}
              alt="img"
              width={400}
              height={320}
              priority={true}
              className=" w-full rounded-xl h-auto object-cover"
            />
          </div>
          <DashboardHeaderModule
            // translates={translates}
            mainData={mainData}
            categoryData={CategoryData}
            shows={shows}
            setShows={setShows}
            contentRef={contentRef}
          />
        </div>

        <div className="w-full h-fit pt-5 flex flex-col justify-center items-center   gap-[60px]  transition-all duration-300 easy-in-out">
          {/* <SlugsModule params={params} categoryName={CategoryData.name} /> */}
          <div className="flex flex-col gap-5 lg:flex-row lg:justify-between items-center w-full">
            <h1 className=" md:w-1/2 ms-5 mt-10 font-bold font-azarMehr text-[22px] text-start dark:text-white text-black">
              {findByUniqueId(mainData, 455)} {CategoryData.name}
            </h1>

            <Suspense fallback={<div className="text-center !mx-0 w-full text-[20px] lg:w-1/2">loading...</div>}>
              <SearchComponent searchLevel="education" mainData={mainData} params={params} />
            </Suspense>
          </div>
          <ListSubCategories
            params={params}
            loadMore={loadMore}
            CategoryData={CategoryData}
            loading={loading}
          // translateData={translateData}
          />
        </div>
      </section>
    </section>
  );
};

export default CategoryComponent;
