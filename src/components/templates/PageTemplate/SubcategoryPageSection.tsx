"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { DashboardHeaderModule } from "@/components/features/categories/DashboardHeaderModule";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import SyncLoader from "react-spinners/SyncLoader";
import EducationCategoryCardSkeleton from "@/components/skeleton/EducationCategoryCardSkeleton";

const SearchComponent = dynamic(
  () => import("@/components/Search/SearchComponent")
);

import ListVideos from "@/components/list/ListVideosSubCategories";

export default function SubcategoryPageSection({
  subCategoryData,
  params,
  mainData,
}: any) {
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState<boolean>(false);

  const [hasMore, setHasMore] = useState<boolean>(
    (subCategoryData.videos?.length || 0) <
    (subCategoryData.videos_count || 0)
  );

  const [shows, setShows] = useState<boolean>(false);

  const [videos, setVideos] = useState(
    subCategoryData.videos || []
  );

  const [visibleCount, setVisibleCount] = useState(9);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const [activeLoadingId, setActiveLoadingId] = useState<string | null>(
    null
  );

  // -----------------------------------------
  // Video cards skeleton
  // -----------------------------------------
  const [showVideoSkeleton, setShowVideoSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideoSkeleton(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // -----------------------------------------
  // Load more videos
  // -----------------------------------------
  useEffect(() => {
    if (page === 1) return;

    const fetchMore = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tutorials/${subCategoryData.slug}?page=${page}`
        );

        const newVideos =
          res.data.videos || res.data.data || [];

        setVideos((prev: any) => [
          ...prev,
          ...newVideos,
        ]);

        const total =
          res.data.videos_count ||
          subCategoryData.videos_count;

        if (
          videos.length + newVideos.length >= total
        ) {
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

  // -----------------------------------------
  // Load more button
  // -----------------------------------------
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setVisibleCount((prev) => prev + 9);

      if (visibleCount + 9 > videos.length) {
        setPage((prev) => prev + 1);
      }
    }
  };

  return (
    <section className="w-full h-fit flex flex-col justify-start items-center relative mt-10">
      <section className="w-full h-fit flex flex-col justify-center items-center">

        {/* =========================================
            TOP SECTION
        ========================================= */}
        <div className="relative w-full px-4 gap-5 lg:gap-10 flex flex-col lg:flex-row transition-all duration-300 ease-in-out">

          {/* Category Image */}
          <div className="w-full md:w-1/2 lg:w-[35%] 3xl:w-[30%] h-max">
            <div className="relative w-full h-[365px] 3xl:h-[400px]">

              <Image
                src={subCategoryData.image}
                alt={"pic " + subCategoryData.name}
                fill
                priority
                fetchPriority="high"
                quality={70}
                sizes="(max-width: 640px) 270px, (max-width: 1024px) 48vw, (max-width: 1536px) 31vw, 25vw"
                className="object-cover rounded-xl"
              />

            </div>
          </div>

          {/* Header */}
          <DashboardHeaderModule
            mainData={mainData}
            categoryData={subCategoryData}
            shows={shows}
            setShows={setShows}
            contentRef={contentRef}
          />
        </div>

        {/* =========================================
            VIDEOS SECTION
        ========================================= */}
        <div className="w-full h-fit pt-5 flex flex-col justify-center items-center gap-[24px] transition-all duration-300 easy-in-out">

          {/* =========================================
              TITLE + SEARCH
          ========================================= */}
          <div className="flex flex-col-reverse lg:gap-5 lg:flex-row lg:justify-between items-center w-full px-4">

            <h1 className="md:w-1/2 ms-5 mt-10 font-bold font-azarMehr text-[22px] text-start dark:text-white text-black">
              {findByUniqueId(mainData, 344)}{" "}
              {subCategoryData.name}
            </h1>

            <SearchComponent
              searchLevel="education"
              mainData={mainData}
              params={params}
            />

          </div>

          {/* =========================================
              ONLY VIDEO CARDS LOADING
          ========================================= */}
          {showVideoSkeleton ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-full h-fit px-5 mt-5">
              {Array.from({ length: 9 }).map((_, index) => (
                <EducationCategoryCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <ListVideos
              params={params}
              loadMore={handleLoadMore}
              videos={videos.slice(0, visibleCount)}
              loading={loading}
              subCategoryData={subCategoryData}
              hasMore={
                hasMore && visibleCount < videos.length
              }
              activeLoadingId={activeLoadingId}
              setActiveLoadingId={setActiveLoadingId}
            />
          )}

          {/* =========================================
              LOAD MORE
          ========================================= */}
          {!showVideoSkeleton &&
            (visibleCount < videos.length || hasMore) ? (
            <div className="w-full flex justify-center mt-[40px] relative">

              {!loading ? (
                <button
                  disabled={loading}
                  className="bg-white dark:bg-gray-1 text-primary md:text-lg rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-primary hover:text-primary"
                  onClick={handleLoadMore}
                >
                  {findByUniqueId(mainData, 271)}
                </button>
              ) : (
                <SyncLoader
                  color="currentColor"
                  size={10}
                  className="text-primary"
                />
              )}

            </div>
          ) : null}

        </div>
      </section>
    </section>
  );
}