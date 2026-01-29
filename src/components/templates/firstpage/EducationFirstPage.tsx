"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "@/components/svgs";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import axios from "axios";
import VideoCard from "@/components/templates/education/VideoCard";
import { useCookies } from "react-cookie";
import Link from "next/link";

interface Params {
  lang: "fa" | "en";
}

const EducationFirstPage = ({ mainData, params }: { mainData: any; params: Params }) => {
  const [videos, setVideos] = useState<any[]>([]);
  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";
  const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);
  const direction = params.lang === "fa" ? "rtl" : "ltr";
  const [linkLoading, setLinkLoading] = useState(false);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("https://api.rgb.irpsc.com/api/tutorials?page=1");
        const apiVideos = res.data.data;

        // مرتب‌سازی جدیدترین ویدیوها
        const sorted = apiVideos.sort((a: any, b: any) => {
          const dateA = a.created_at || "";
          const dateB = b.created_at || "";
          return dateB.localeCompare(dateA);
        });

        // فقط ۳ تا آخر
        setVideos(sorted.slice(0, 3));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      {linkLoading && (
        <div className="fixed top-0 left-0 bottom-0  w-full  h-screen z-[40] flex items-center justify-center bg-black/60 backdrop-blur-sm" >
          <div className="container flex w-full h-screen items-center justify-center md:ms-[25vw] lg:ms-[17vw] xl:ms-[15vw] 3xl:ms-[16vw]">
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
          </div>
        </div>
      )}
      {/* عنوان بخش */}
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {findByUniqueId(mainData, 1462)}
        </p>
        <Link onClickCapture={() => setLinkLoading(true)} href={`/${params.lang}/education/category`} >
          <div className="flex justify-center items-center gap-4">
            <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
              {findByUniqueId(mainData, 171)}
            </p>
            <ArrowRight
              className={`dark:stroke-white stroke-black w-[24px] h-full ${direction === "rtl" ? "rotate-180" : "rotate-0"
                }`}
            />
          </div>
        </Link>
      </div>

      {/* نمایش ۳ ویدیو آخر */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-10 mt-6 md:mt-12">
        {videos.map((item: any) => (
          <VideoCard key={item.id} item={item} params={params} theme={theme} activeLoadingId={activeLoadingId} setActiveLoadingId={setActiveLoadingId}/>
        ))}
      </div>
    </div>
  );
};

export default EducationFirstPage;
