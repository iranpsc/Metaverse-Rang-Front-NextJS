"use client";
import DynamicVideoPlayer from "@/components/module/singleVideo/DynamicVideoPlayer";
import SingleVideoDashboardModule from "@/components/module/singleVideo/SingleVideoDashboardModule";
// import SingleVideoDetailsModule from "@/components/module/singleVideo/SingleVideoDetailsModule";
import SingleVideoProfileModule from "@/components/module/singleVideo/SingleVideoProfileModule";
import CommentSection from "@/components/module/singleVideo/comments/CommentSection";
// import ListVideos from "@/components/module/singleVideo/listVideos/ListVideos";
// import Pagination from "@/components/module/singleVideo/listVideos/Pagination";
import NewEducationSectionTemp from "./NewEducationSectionTemp";
import SingleVideoSlugModule from "@/components/module/singleVideo/SingleVideoSlugModule";
import { useEffect, useState } from "react";
import axios from "axios";
import DynamicDetails from "@/components/module/singleVideo/DynamicDetails";
import { AnimatePresence } from "framer-motion";
import SharedPageVideos from "@/components/module/singleVideo/SharedPageVideos";

const VideoSection = ({
  // translateSingleVideo,
  // setOpenSharedPage,
  mainData,
  DataVideo,
  newEducationsVideos,
  dataCommentsVideo,
  params,
}: any) => {
  const [refreshComment, setRefreshComment] = useState<boolean>(false);
  const [DataComment, setDataComment] = useState<any>(dataCommentsVideo);
  const [openSharedPage, setOpenSharedPage] = useState<boolean>(false);

useEffect(() => {
  let isMounted = true; // ✅ flag

  const handlerGetComments = async () => {
    try {
      const comments = await axios.get(
        `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.id}/comments?page=1`
      );
      if (isMounted) setDataComment(comments.data); // فقط اگر mount است
    } catch (error: any) {
      console.error("خطا:", error?.response?.status);
    }
  };

  handlerGetComments();

  return () => {
    isMounted = false; // هنگام unmount flag false شود
  };
}, [refreshComment]);


  return (
    <>
      <div className="w-full  bg-[#F5F5F5] dark:bg-black grid grid-cols-12   xs:flex xs:flex-col 3xl:flex select-none mt-10 rounded-[20px] ">
        <div className="w-auto 3xl:w-[79%] xl:max-h-fit lg:max-h-fit md:h-full sm:h-full xs:h-full  xl:me-10 lg:me-5 md:md-2 xs:me-1 xl:col-span-9 lg:col-span-9 sm:col-span-12 h-fit flex flex-col justify-start items-center ">
          <SingleVideoSlugModule DataVideo={DataVideo} params={params} />
          {/* Player */}
          <DynamicVideoPlayer DataVideo={DataVideo} />
          {/* VIDEO details */}
          <SingleVideoDashboardModule
            params={params}
            DataVideo={DataVideo}
            setOpenSharedPage={setOpenSharedPage}
            // translateSingleVideo={translateSingleVideo}
            mainData={mainData}
            dataCommentsVideo={dataCommentsVideo}
          />
          {/* USER */}
          <SingleVideoProfileModule
            params={params}
            DataVideo={DataVideo}
            // translateSingleVideo={translateSingleVideo}
            mainData={mainData}
          />
          {/* DESC / send comment */}
          <DynamicDetails
            DataVideo={DataVideo}
            // translateSingleVideo={translateSingleVideo}
            mainData={mainData}
            setRefreshComment={setRefreshComment}
          />
          {/* COMMENTS */}

          <CommentSection
            DataVideo={DataVideo}
            // translateSingleVideo={translateSingleVideo}
            mainData={mainData}
            dataCommentsVideo={DataComment}
            setRefreshComment={setRefreshComment}
            refreshComment={refreshComment}
            params={params}
          />
          <div className="xl:hidden lg:hidden md:block sm:block xs:block h-fit w-full lg:mx-5 md:md-2 xs:mx-1  bg-white dark:bg-dark-background mt-10 rounded-[20px]">
            <NewEducationSectionTemp
              newEducationsVideos={newEducationsVideos}
              // translateSingleVideo={translateSingleVideo}
              mainData={mainData}
              params={params}
            />
          </div>

          {/* <Pagination /> */}
        </div>
        <div className="bg-white max-h-[2050px]  dark:bg-dark-background xl:block lg:block md:hidden xs:hidden sm:hidden 3xl:w-[21%] no-scrollbar overflow-y-scroll overflow-x-clip xl:col-span-3 lg:col-span-3 rounded-[20px] mt-14 lg:mt-0">
          <NewEducationSectionTemp
            newEducationsVideos={newEducationsVideos}
            mainData={mainData}
            params={params}
          // translateSingleVideo={translateSingleVideo}
          />
        </div>

        <AnimatePresence>
          {openSharedPage && (
            <SharedPageVideos
              setOpenSharedPage={setOpenSharedPage}
              DataVideo={DataVideo}
              // translateSingleVideo={translateSingleVideo}
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
