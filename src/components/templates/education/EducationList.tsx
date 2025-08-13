"use client";
import SyncLoader from "react-spinners/SyncLoader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import VideoCard from "./VideoCard";

export default function EducationList({ mainData, allCatVideos, params }: any) {
  const [videoToShow, setVideoToShow] = useState(allCatVideos);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(2);

  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";

  // Sort initial videos by upload_date (newest first)
  useEffect(() => {
    console.log("Initial videos:", allCatVideos); // دیباگ داده‌های اولیه
    const sortedVideos = [...allCatVideos].sort((a, b) => {
      const dateA = a.upload_date ? new Date(a.upload_date).getTime() : 0;
      const dateB = b.upload_date ? new Date(b.upload_date).getTime() : 0;
      return dateB - dateA; // جدید به قدیم
    });
    console.log("Sorted initial videos:", sortedVideos); // دیباگ پس از مرتب‌سازی
    setVideoToShow(sortedVideos);
  }, [allCatVideos]);

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const nextPage = currentPage + 1;

      const res = await axios.get(
        `https://api.rgb.irpsc.com/api/tutorials?page=${nextPage}`
      );

      console.log("API response:", res.data.data); // دیباگ داده‌های API
      setLastPage(res.data.meta.to);

      // Append new videos and sort the entire array by upload_date (newest first)
      setVideoToShow((prevVideos: any) => {
        const newVideos = [...prevVideos, ...res.data.data].sort((a, b) => {
          const dateA = a.upload_date ? new Date(a.upload_date).getTime() : 0;
          const dateB = b.upload_date ? new Date(b.upload_date).getTime() : 0;
          return dateB - dateA; // جدید به قدیم
        });
        console.log("Sorted combined videos:", newVideos); // دیباگ پس از مرتب‌سازی
        return newVideos;
      });

      setCurrentPage(nextPage);

      if (nextPage >= lastPage) {
        // setIsDisabled(true);
      }
    } catch (error) {
      console.error("Error fetching more videos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-[95%] xs:w-[90%] h-fit mt-24 flex flex-col justify-center items-center mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {videoToShow.map((item: any) => (
            <VideoCard key={item.id} item={item} params={params} theme={theme} />
          ))}
        </div>
        <div className="w-full flex justify-center mt-[40px]">
          {!loading ? (
            <button
              disabled={isDisabled}
              title={isDisabled ? "صفحه آخر" : ""}
              className={`${isDisabled ? "cursor-not-allowed" : ""
                } bg-white dark:bg-darkGray text-light-primary md:text-lg dark:text-dark-yellow rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-light-primary hover:text-light-primary hover:dark:border-dark-yellow`}
              onClick={handleLoadMore}
            >
              {findByUniqueId(mainData, 271)}
            </button>
          ) : (
            <SyncLoader
              color={`${theme == "dark" ? "#FFC700" : "#0066ff"}`}
              size={10}
            />
          )}
        </div>
      </div>
    </>
  );
}