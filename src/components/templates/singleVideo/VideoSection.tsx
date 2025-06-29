"use client";
import DynamicVideoPlayer from "@/components/module/singleVideo/DynamicVideoPlayer";
import SingleVideoDashboardModule from "@/components/module/singleVideo/SingleVideoDashboardModule";
import SingleVideoProfileModule from "@/components/module/singleVideo/SingleVideoProfileModule";
import CommentSection from "@/components/module/singleVideo/comments/CommentSection";
import NewEducationSectionTemp from "./NewEducationSectionTemp";
import SingleVideoSlugModule from "@/components/module/singleVideo/SingleVideoSlugModule";
import DynamicDetails from "@/components/module/singleVideo/DynamicDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import SharedPageVideos from "@/components/module/singleVideo/SharedPageVideos";

interface VideoSectionProps {
  mainData: any;
  DataVideo: { id: string };
  newEducationsVideos: any;
  dataCommentsVideo: { data: any[] };
  params: { lang: string; videoId: string };
}

const VideoSection = ({
  mainData,
  DataVideo,
  newEducationsVideos,
  dataCommentsVideo = { data: [] },
  params,
}: VideoSectionProps) => {
  const [refreshComment, setRefreshComment] = useState<boolean>(false);
  const [DataComment, setDataComment] = useState<{ data: any[] }>(dataCommentsVideo);
  const [openSharedPage, setOpenSharedPage] = useState<boolean>(false);

  useEffect(() => {
    const handlerGetComments = async () => {
      try {
        const comments = await axios.get(
          `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.id}/comments?page=1`
        );
        console.log("API response:", comments.data); // لاگ کردن پاسخ API
        setDataComment(comments.data);
      } catch (error: any) {
        console.error("Error fetching comments:", error?.response?.status, error?.response?.data);
      }
    };

    if (DataVideo.id) {
      handlerGetComments();
    }
  }, [refreshComment, DataVideo.id]);

  console.log("DataVideo:", DataVideo);
  console.log("DataComment:", DataComment);

  return (
    <>
      <div className="w-full bg-[#F5F5F5] dark:bg-black grid grid-cols-12 xs:flex xs:flex-col 3xl:flex select-none mt-10 rounded-[20px]">
        <div className="w-auto 3xl:w-[79%] xl:max-h-fit lg:max-h-fit md:h-full sm:h-full xs:h-full xl:me-10 lg:me-5 md:md-2 xs:me-1 xl:col-span-9 lg:col-span-9 sm:col-span-12 h-fit flex flex-col justify-start items-center">
          <SingleVideoSlugModule DataVideo={DataVideo} params={params} />
          <DynamicVideoPlayer DataVideo={DataVideo} />
          <SingleVideoDashboardModule
            params={params}
            DataVideo={DataVideo}
            setOpenSharedPage={setOpenSharedPage}
            mainData={mainData}
            dataCommentsVideo={DataComment}
          />
          <SingleVideoProfileModule params={params} DataVideo={DataVideo} mainData={mainData} />
          <DynamicDetails
            DataVideo={DataVideo}
            mainData={mainData}
            setRefreshComment={setRefreshComment}
          />
          <CommentSection
            DataVideo={DataVideo}
            mainData={mainData}
            dataCommentsVideo={DataComment}
            setRefreshComment={setRefreshComment}
            refreshComment={refreshComment}
            params={params}
          />
          <div className="xl:hidden lg:hidden md:block sm:block xs:block h-fit w-full lg:mx-5 md:md-2 xs:mx-1 bg-white dark:bg-dark-background mt-10 rounded-[20px]">
            <NewEducationSectionTemp
              newEducationsVideos={newEducationsVideos}
              mainData={mainData}
              params={params}
            />
          </div>
        </div>
        <div className="bg-white max-h-[2050px] dark:bg-dark-background xl:block lg:block md:hidden xs:hidden sm:hidden 3xl:w-[21%] no-scrollbar overflow-y-scroll overflow-x-clip xl:col-span-3 lg:col-span-3 rounded-[20px] mt-14 lg:mt-0">
          <NewEducationSectionTemp
            newEducationsVideos={newEducationsVideos}
            mainData={mainData}
            params={params}
          />
        </div>
        <AnimatePresence>
          {openSharedPage && (
            <SharedPageVideos
              setOpenSharedPage={setOpenSharedPage}
              DataVideo={DataVideo}
              mainData={mainData}
              params={params}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default VideoSection;