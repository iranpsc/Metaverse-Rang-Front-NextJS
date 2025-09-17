"use client";
import SyncLoader from "react-spinners/SyncLoader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import VideoCard from "./VideoCard";

export default function EducationList({ mainData, params }: any) {
  const [videoToShow, setVideoToShow] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";

  // ------------------------------
  // Fetch initial page (page 1)
  // ------------------------------
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.rgb.irpsc.com/api/tutorials?page=1`
        );

        const apiVideos = res.data.data;

        const sorted = apiVideos.sort((a: any, b: any) => {
          const dateA = a.created_at || "";
          const dateB = b.created_at || "";
          return dateB.localeCompare(dateA);
        });

        setVideoToShow(sorted);
        setLastPage(res.data.meta.last_page);
        setCurrentPage(1);

        //  لاگ مقایسه API و UI
        // console.log("===== Initial Load =====");
        // console.log("API videos (page 1):", apiVideos.length);
        // console.log("UI videos (after sort):", sorted.length);
        // console.log("========================");
      } catch (error) {
        console.error("Error fetching initial videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, []);

  // ------------------------------
  // Load More handler
  // ------------------------------
  const handleLoadMore = async () => {
    if (loading || (lastPage !== null && currentPage >= lastPage)) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;

      const res = await axios.get(
        `https://api.rgb.irpsc.com/api/tutorials?page=${nextPage}`
      );

      const apiVideos = res.data.data;

      setVideoToShow((prevVideos: any) => {
        // ترکیب قبلی‌ها + جدیدها
        const merged = [...prevVideos, ...apiVideos];

        // حذف ویدیوهای تکراری (بر اساس id)
        const uniqueVideos = merged.filter(
          (video, index, self) =>
            index === self.findIndex((v) => v.id === video.id)
        );

        // مرتب‌سازی جدیدترین اول
        const sorted = uniqueVideos.sort((a, b) => {
          const dateA = a.created_at || "";
          const dateB = b.created_at || "";
          return dateB.localeCompare(dateA);
        });

        //  لاگ مقایسه API و UI بعد Load More
        // console.log("===== Load More =====");
        // console.log("API page:", nextPage);
        // console.log("API videos (this page):", apiVideos.length);
        // console.log("UI videos (after merge & sort):", sorted.length);
        // console.log("=====================");

        return sorted;
      });

      setCurrentPage(nextPage);
      setLastPage(res.data.meta.last_page);

      if (res.data.meta.last_page && nextPage >= res.data.meta.last_page) {
        setIsDisabled(true);
      }
    } catch (error) {
      console.error("Error fetching more videos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[95%] xs:w-[90%] h-fit mt-24 flex flex-col justify-center items-center mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
        {videoToShow.map((item: any) => (
          <VideoCard key={item.id} item={item} params={params} theme={theme} />
        ))}
      </div>
      <div className="w-full flex justify-center mt-[40px]">
        {!loading ? (
          <button
            disabled={isDisabled || loading}
            title={isDisabled ? "صفحه آخر" : ""}
            className={`${
              isDisabled ? "cursor-not-allowed" : ""
            } bg-white dark:bg-darkGray text-light-primary md:text-lg dark:text-dark-yellow rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-light-primary hover:text-light-primary hover:dark:border-dark-yellow`}
            onClick={handleLoadMore}
          >
            {findByUniqueId(mainData, 271)}
          </button>
        ) : (
          <SyncLoader
            color={`${theme === "dark" ? "#FFC700" : "#0066ff"}`}
            size={10}
          />
        )}
      </div>
    </div>
  );
}
