import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import DynamicFooter from "@/components/templates/education/DynamicFooter";
import ListSubCategories from "./ListSubCategories";
import { DashboardHeaderModule } from "@/components/module/categories/DashboardHeaderModule";
import SlugsModule from "@/components/module/categories/SlugsModule";
const CategoryComponent = ({
  CategoryData,
  translateData,
  footerTabs,
}: any) => {
  const router = useRouter();
  const { Category } = router.query;

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [shows, setShows] = useState<boolean>(false);
  const [videos, setVideos] = useState(CategoryData);

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
            src={CategoryData.image}
            alt="img"
            width={500}
            height={400}
            priority={true}
            className=" w-full h-[400px] rounded-xl object-cover"
          />
          <DashboardHeaderModule
            categoryData={CategoryData}
            shows={shows}
            setShows={setShows}
          />
        </div>

        <div className="w-full h-fit pt-5 flex flex-col justify-center items-center bg-white dark:bg-black  transition-all duration-300 easy-in-out">
          <SlugsModule categoryName={CategoryData.name} />
          <h1 className="w-full ms-5 mt-10 font-bold font-azarMehr text-[22px] text-start">
            لیست زیر دسته های مرتبط با {CategoryData.name}
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
