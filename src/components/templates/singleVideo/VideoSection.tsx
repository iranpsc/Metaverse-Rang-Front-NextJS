import DynamicVideoPlayer from "@/components/module/singleVideo/DynamicVideoPlayer";
import SingleVideoDashboardModule from "@/components/module/singleVideo/SingleVideoDashboardModule";
import SingleVideoDetailsModule from "@/components/module/singleVideo/SingleVideoDetailsModule";
import SingleVideoProfileModule from "@/components/module/singleVideo/SingleVideoProfileModule";
import CommentSection from "@/components/module/singleVideo/comments/CommentSection";
import ListVideos from "@/components/module/singleVideo/listVideos/ListVideos";
import Pagination from "@/components/module/singleVideo/listVideos/Pagination";
import NewEducationSectionTemp from "./NewEducationSectionTemp";
import SingleVideoSlugModule from "@/components/module/singleVideo/SingleVideoSlugModule";
import { useEffect, useState } from "react";
import axios from "axios";
import DynamicDetails from "@/components/module/singleVideo/DynamicDetails";

const VideoSection = ({
  translateSingleVideo,
  setOpenSharedPage,
  DataVideo,
  DataVideos,
  newEducationsVideos,
  dataCommentsVideo,
}: any) => {
  const [refreshComment, setRefreshComment] = useState<boolean>(false);
  const [DataComment, setDataComment] = useState<any>(dataCommentsVideo);

  useEffect(() => {
    const handlerGetComments = async () => {
      try {
        const comments = await axios.get(
          `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.id}/comments?page=1`
        );
        setDataComment(comments.data);
      } catch (error: any) {
        console.error("خطا:", error?.response?.status);
      }
    };

    handlerGetComments();
  }, [refreshComment]);

  return (
    <>
      <div className="w-full bg-[#F5F5F5] dark:bg-black grid grid-cols-12   xs:flex xs:flex-col select-none ">
        <div className="w-auto xl:max-h-[2050px] lg:max-h-[2050px] md:h-full sm:h-full xs:h-full  xl:mx-10 lg:mx-5 md:md-2 xs:mx-1 xl:col-span-9 lg:col-span-9 sm:col-span-12 h-fit flex flex-col justify-start items-center">
          <SingleVideoSlugModule DataVideo={DataVideo} />
          <DynamicVideoPlayer DataVideo={DataVideo} />
          <SingleVideoDashboardModule
            DataVideo={DataVideo}
            setOpenSharedPage={setOpenSharedPage}
            translateSingleVideo={translateSingleVideo}
          />
          <SingleVideoProfileModule
            DataVideo={DataVideo}
            translateSingleVideo={translateSingleVideo}
          />
          <DynamicDetails
            DataVideo={DataVideo}
            translateSingleVideo={translateSingleVideo}
            setRefreshComment={setRefreshComment}
          />
          <CommentSection
            DataVideo={DataVideo}
            translateSingleVideo={translateSingleVideo}
            dataCommentsVideo={DataComment}
            setRefreshComment={setRefreshComment}
            refreshComment={refreshComment}
          />
          <div className="xl:hidden lg:hidden md:block sm:block xs:block h-fit w-full lg:mx-5 md:md-2 xs:mx-1  bg-white dark:bg-singleVideo-dark-background">
            <NewEducationSectionTemp
              newEducationsVideos={newEducationsVideos}
              translateSingleVideo={translateSingleVideo}
            />
          </div>

          {/* <div className="mt-10">
        <Pagination />
        ListVideos
      </div> */}
        </div>
        <div className="bg-white max-h-[2050px]  dark:bg-singleVideo-dark-background xl:block lg:block md:hidden xs:hidden sm:hidden xl:w-auto no-scrollbar overflow-y-scroll overflow-x-clip xl:col-span-3 lg:col-span-3 rounded-[20px]">
          <NewEducationSectionTemp
            newEducationsVideos={newEducationsVideos}
            translateSingleVideo={translateSingleVideo}
          />
        </div>
      </div>
    </>
  );
};

export default VideoSection;
