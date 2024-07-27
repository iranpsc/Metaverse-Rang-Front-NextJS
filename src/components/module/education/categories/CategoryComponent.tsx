"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import DynamicFooter from "@/components/module/education/DynamicFooter";
import ListSubCategories from "./ListSubCategories";
import { DashboardHeaderModule } from "@/components/module/education/categories/DashboardHeaderModule";
import SlugsModule from "@/components/module/education/categories/SlugsModule";
import { motion, useAnimation } from "framer-motion";
const CategoryComponent = ({
  CategoryData,
  translateData,
  translates,
  footerTabs,
  params,
}: any) => {

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [shows, setShows] = useState<boolean>(false);
  const [videos, setVideos] = useState(CategoryData);
  const [height, setHeight] = useState(0);

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(shows ? contentRef.current.scrollHeight : 0);
    }
  }, [shows]);
  const controls = useAnimation();

  const handleToggle = () => {
    controls.start({
      height: shows ? "auto" : "500px", // مقدار ارتفاع مورد نظر خود را قرار دهید
      transition: { duration: 0.3, ease: "easeInOut" },
    });
    setShows(!shows);
  };

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
          className={`relative w-full px-4  bg-white dark:bg-black transition-all duration-300 ease-in-out`}
          style={{ height: shows ? `${height + 500}px` : "500px" }}
        >
          <Image
            src={CategoryData.image}
            alt="img"
            width={500}
            height={400}
            priority={true}
            className=" w-full h-[400px] rounded-xl object-cover"
          />
          <DashboardHeaderModule
            translates={translates}
            categoryData={CategoryData}
            shows={shows}
            setShows={setShows}
            contentRef={contentRef}
          />
        </div>

        <div className="w-full h-fit pt-5 flex flex-col justify-center items-center bg-white dark:bg-black  transition-all duration-300 easy-in-out">
          <SlugsModule categoryName={CategoryData.name} params={params} />
          <h1 className="w-full ms-5 mt-10 font-bold font-azarMehr text-[22px] text-start">
            {
              translates.find(
                (item: any) => item.name === "list of subcategories related to"
              ).translation
            }{" "}
            {CategoryData.name}
          </h1>
          <ListSubCategories
            loadMore={loadMore}
            CategoryData={CategoryData}
            loading={loading}
            translateData={translateData}
            
          />
          <DynamicFooter footerTabs={footerTabs} />
        </div>
      </section>
    </section>
  );
};

export default CategoryComponent;
