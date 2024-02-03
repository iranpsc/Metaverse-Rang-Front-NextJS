import Image from "next/image";
import { useState } from "react";
import axios from "axios";

import DynamicFooter from "@/components/templates/education/DynamicFooter";
import ListSubCategories from "./ListSubCategories";
import { DashboardHeaderModule } from "@/components/module/categories/DashboardHeaderModule";
import SlugsModule from "@/components/module/categories/SlugsModule";
const CategoryComponent = ({ videosData, translateData, footerTabs }: any) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [shows, setShows] = useState<boolean>(false);
  const [videos, setVideos] = useState(videosData);

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
    <section className="w-full h-fit flex flex-col justify-start items-center bg-[#f8f8f8] dark:bg-[#000] relative ">
      <section className="  w-full h-fit flex  flex-col justify-center items-center">
        <div
          className={`relative w-full px-4 ${
            shows ? "h-[800px]" : "h-[500px]"
          } bg-white dark:bg-black transition-all duration-300 easy-in-out`}
        >
          <Image
            src="/header.jpg"
            alt="img"
            width={500}
            height={500}
            loading="lazy"
            className=" w-full h-[400px] rounded-xl"
          />
          <DashboardHeaderModule shows={shows} setShows={setShows} />
        </div>

        <div className="w-full h-fit pt-5 flex flex-col justify-center items-center bg-white dark:bg-black  transition-all duration-300 easy-in-out">
          <SlugsModule />
          <h1 className="w-full ms-5 mt-10 font-bold font-azarMehr text-[22px] text-start">
            لیست زیر دسته های مرتبط با "عنوان دسته مادر"
          </h1>
          <ListSubCategories
            loadMore={loadMore}
            videosData={videos}
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
