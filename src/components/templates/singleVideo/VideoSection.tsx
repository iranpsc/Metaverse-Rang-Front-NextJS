import DynamicVideoPlayer from "@/components/module/singleVideo/DynamicVideoPlayer";
import SingleVideoDashboardModule from "@/components/module/singleVideo/SingleVideoDashboardModule";
import SingleVideoDetailsModule from "@/components/module/singleVideo/SingleVideoDetailsModule";
import SingleVideoProfileModule from "@/components/module/singleVideo/SingleVideoProfileModule";
import CommentSection from "@/components/module/singleVideo/comments/CommentSection";
import ListVideos from "@/components/module/singleVideo/listVideos/ListVideos";
import Pagination from "@/components/module/singleVideo/listVideos/Pagination";
import NewEducationSectionTemp from "./NewEducationSectionTemp";
import SingleVideoSlugModule from "@/components/module/singleVideo/SingleVideoSlugModule";

const VideoSection = ({
  setOpenSharedPage,
  DataVideo,
  DataVideos,
  newEducationsVideos,
}: any) => {
  return (
    <>
      <div className="w-full bg-[#F5F5F5] dark:bg-black grid grid-cols-12  xs:flex xs:flex-col select-none ">
        <div className="w-auto xl:mx-10 lg:mx-5 md:md-2 xs:mx-1 xl:col-span-10 lg:col-span-9 sm:col-span-12 h-fit flex flex-col justify-start items-center">
          <SingleVideoSlugModule DataVideo={DataVideo} />
          <DynamicVideoPlayer DataVideo={DataVideo} />
          <SingleVideoDashboardModule
            DataVideo={DataVideo}
            setOpenSharedPage={setOpenSharedPage}
          />
          <SingleVideoProfileModule DataVideo={DataVideo} />
          <SingleVideoDetailsModule DataVideo={DataVideo} />
          <CommentSection DataVideo={DataVideo} />
          <div className="xl:hidden lg:hidden md:block sm:block xs:block w-full lg:mx-5 md:md-2 xs:mx-1  bg-white dark:bg-singleVideo-dark-background">
            <NewEducationSectionTemp
              newEducationsVideos={newEducationsVideos}
            />
          </div>
          <ListVideos DataVideos={DataVideos} />
          {/* <div className="mt-10">
        <Pagination />
        ListVideos
      </div> */}
        </div>
        <div className="bg-white dark:bg-singleVideo-dark-background xl:block lg:block xs:hidden sm:hidden xl:w-auto no-scrollbar h-screen overflow-y-scroll xl:col-span-2 lg:col-span-3 rounded-[20px]">
          <NewEducationSectionTemp newEducationsVideos={newEducationsVideos} />
        </div>
      </div>
    </>
  );
};

export default VideoSection;
