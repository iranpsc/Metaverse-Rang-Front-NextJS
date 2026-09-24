"use client";
import SyncLoader from "react-spinners/SyncLoader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import VideoCard from "@/components/card/VideoCard";

interface EducationListProps {
  mainData: any;
  params: any;
  // اگه از سرور پاس داده بشه (initialVideos)، دیگه فچ اولیه‌ی کلاینتی
  // انجام نمی‌شه و مستقیم همینا نمایش داده می‌شن — یه round-trip کامل
  // بعد از هیدریت حذف می‌شه. اگه پاس داده نشه، دقیقاً رفتار قبلی
  // (فچ خودکار صفحه ۱ با useEffect) حفظ می‌شه، پس بک‌ورد-کامپاتیبله.
  initialVideos?: any[];
}

export default function EducationList({ mainData, params, initialVideos }: EducationListProps) {
  const hasInitialData = Array.isArray(initialVideos) && initialVideos.length > 0;

  const [videoToShow, setVideoToShow] = useState<any[]>(
    hasInitialData
      ? [...initialVideos].sort((a, b) => {
          const dateA = a.created_at || "";
          const dateB = b.created_at || "";
          return dateB.localeCompare(dateA);
        })
      : []
  );
  const [isDisabled, setIsDisabled] = useState(false);
  // اگه initialVideos داشتیم، دیگه لودینگ اولیه لازم نیست
  const [loading, setLoading] = useState(!hasInitialData);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";
  const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);

  // ------------------------------
  // Fetch initial page (page 1) — فقط اگه initialVideos از سرور نیومده باشه
  // ------------------------------
  useEffect(() => {
    if (hasInitialData) return; // ✅ دیتای سرور از قبل موجوده، نیازی به فچ نیست

    const fetchInitial = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tutorials?page=1`
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
      } catch (error) {
        console.error("Error fetching initial videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tutorials?page=${nextPage}`
      );

      const apiVideos = res.data.data;

      setVideoToShow((prevVideos: any) => {
        const merged = [...prevVideos, ...apiVideos];

        const uniqueVideos = merged.filter(
          (video, index, self) =>
            index === self.findIndex((v) => v.id === video.id)
        );

        const sorted = uniqueVideos.sort((a, b) => {
          const dateA = a.created_at || "";
          const dateB = b.created_at || "";
          return dateB.localeCompare(dateA);
        });

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
      <p className="mt-2 mb-7 text-start w-full font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
        {findByUniqueId(mainData, 1462)}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
        {videoToShow.map((item: any) => (
          <VideoCard key={item.id} item={item} params={params} theme={theme} activeLoadingId={activeLoadingId} setActiveLoadingId={setActiveLoadingId} />
        ))}
      </div>
      <div className="w-full flex justify-center mt-[40px]">
        {!loading ? (
          <button
            disabled={isDisabled || loading}
            title={isDisabled ? "صفحه آخر" : ""}
            className={`${isDisabled ? "cursor-not-allowed" : ""
              } bg-white dark:bg-gray-1 text-primary md:text-lg  rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-primary hover:text-primary hover:`}
            onClick={handleLoadMore}
          >
            {findByUniqueId(mainData, 271)}
          </button>
        ) : (
          <SyncLoader
            color={`${theme === "dark" ? "#9100D9" : "#9100D9"}`}
            size={10}
          />
        )}
      </div>
    </div>
  );
}