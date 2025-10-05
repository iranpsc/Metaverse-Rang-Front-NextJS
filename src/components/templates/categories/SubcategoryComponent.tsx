
"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import axios from "axios";
import { DashboardHeaderModule } from "@/components/module/categories/DashboardHeaderModule";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import ListVideos from "@/components/shared/ListVideos";

const SearchComponent = dynamic(
  () => import("@/components/shared/SearchComponent"),
  { suspense: false  }
);


export default function SubcategoryComponent({ subCategoryData, params, mainData }: any) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(
    (subCategoryData.videos?.length || 0) < (subCategoryData.videos_count || 0)
  );
  const [shows, setShows] = useState<boolean>(false);
  const [videos, setVideos] = useState(subCategoryData.videos || []);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (page === 1) return; // صفحه اول رو داریم
    const fetchMore = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.rgb.irpsc.com/api/tutorials/${subCategoryData.slug}?page=${page}`
        );
        const newVideos = res.data.videos || res.data.data || [];

        setVideos((prev: any) => [...prev, ...newVideos]);

        // اگر تعداد کل ویدیوها رسید به videos_count → تموم شده
        const total = res.data.videos_count || subCategoryData.videos_count;
        if (videos.length + newVideos.length >= total) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Load more error:", err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchMore();
  }, [page, subCategoryData.slug]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <section className="w-full h-fit flex flex-col justify-start items-center relative mt-10">
      <section className="w-full h-fit flex flex-col justify-center items-center">
        <div className="relative w-full px-4 gap-10 flex flex-col lg:flex-row transition-all duration-300 ease-in-out">
          <div className="w-full md:w-1/2 lg:w-[35%] 3xl:w-[30%] h-max">
            <Image
              src={subCategoryData.image}
              alt="img"
              width={500}
              height={400}
              priority={true}
              className="w-full rounded-xl h-auto object-cover"
            />
          </div>
          <DashboardHeaderModule
            mainData={mainData}
            categoryData={subCategoryData}
            shows={shows}
            setShows={setShows}
            contentRef={contentRef}
          />
        </div>

        <div className="w-full h-fit pt-5 flex flex-col justify-center items-center gap-[60px] transition-all duration-300 easy-in-out">
          <div className="flex flex-col gap-5 lg:flex-row lg:justify-between items-center w-full">
            <h1 className="md:w-1/2 ms-5 mt-10 font-bold font-azarMehr text-[22px] text-start dark:text-white text-black">
              {findByUniqueId(mainData, 344)} {subCategoryData.name}
            </h1>

            <Suspense fallback={<div className="text-center !mx-0 w-full text-[20px] lg:w-1/2">loading...</div>}>
              <SearchComponent searchLevel="education" mainData={mainData} params={params} />
            </Suspense>
          </div>

          <ListVideos
            params={params}
            loadMore={loadMore}
            videos={videos}
            loading={loading}
            subCategoryData={subCategoryData}
            hasMore={hasMore}
          />

         
        </div>
      </section>
    </section>
  );
}
