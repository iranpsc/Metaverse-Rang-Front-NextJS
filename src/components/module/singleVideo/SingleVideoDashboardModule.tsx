import { CopyIcon } from "@/components/svgs/SvgCategories";
import { Like, Dislike, View, Comment } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";

const SingleVideoDashboardModule = ({ DataVideo, setOpenSharedPage }: any) => {
  ////useCheckData

  return (
    <div className="w-full flex flex-row justify-evenly items-center pt-3 bg-white dark:bg-singleVideo-dark-background z-40 relative">
      <div className="flex flex-row justify-center items-center gap-2 xs:hidden">
        <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white  xs:text-[12px]">
          تاریخ انتشار :{" "}
        </p>
        <p className="font-azarMehr font-normal text-singleVideo_medium  dark:text-white xs:text-[12px]">
          {checkData(DataVideo.created_at)}
        </p>
      </div>

      <div
        className="flex flex-row justify-center items-center gap-2 cursor-pointer"
        onClick={() => setOpenSharedPage(true)}
      >
        <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
          undefined
        </p>
        <CopyIcon className="fill-singleVideo-gray dark:fill-white xs:size-[24px]" />
      </div>

      <div className="flex flex-row justify-center items-center gap-2">
        <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
          {checkData(DataVideo.comments)}
        </p>
        <Comment className="stroke-singleVideo-gray dark:stroke-white xs:size-[24px]" />
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
          {checkData(DataVideo.likes_count)}
        </p>
        <Like className="stroke-singleVideo-gray dark:stroke-white xs:size-[24px]" />
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
          {checkData(DataVideo.dislikes_count)}
        </p>
        <Dislike className="stroke-singleVideo-gray dark:stroke-white xs:size-[24px]" />
      </div>
      <div className="flex flex-row justify-center items-center gap-2 xs:hidden">
        <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
          {checkData(DataVideo.views_count)}
        </p>
        <View className="stroke-singleVideo-gray dark:stroke-white  xs:size-[24px]" />
      </div>
    </div>
  );
};

export default SingleVideoDashboardModule;
