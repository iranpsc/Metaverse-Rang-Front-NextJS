import { SendIcon, View } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import { useState } from "react";

const SingleVideoDetailsModule = ({ DataVideo }: any) => {
  const [isComplete, setIsComplete] = useState(false);
  return (
    <div className="w-full pt-6 bg-white dark:bg-singleVideo-dark-background rounded-b-[20px] pb-10 ps-5">
      <h1 className="w-full text-start  text-singleVideo_title xs:text-[16px] text-singleVideo-gray dark:text-white font-azarMehr font-bold ">
        {checkData(DataVideo?.title)}
      </h1>
      <div className="w-full xl:hidden flex flex-row justify-start gap-5 mt-4 items-center bg-white dark:bg-singleVideo-dark-background relative">
        <div className=" flex flex-row justify-center items-center gap-2">
          <p className="font-azarMehr font-normal text-singleVideo_medium  xs:text-[12px]">
            تاریخ انتشار :{" "}
          </p>
          <p className="font-azarMehr font-normal text-singleVideo_medium xs:text-[12px]">
            {checkData(DataVideo.created_at)}
          </p>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <p className="font-azarMehr font-normal text-singleVideo_medium xs:text-[12px]">
            {checkData(DataVideo.views_count)}
          </p>
          <View className="stroke-singleVideo-gray dark:stroke-white  xs:size-[24px]" />
        </div>
      </div>
      <p className="w-full text-start h-fit transition-all duration-300 ease-in-out text-[22px] xs:text-[16px]  text-singleVideo-gray dark:text-white font-azarMehr font-normal mt-5">
        {!isComplete
          ? checkData(DataVideo.description.slice(0, 500))
          : checkData(DataVideo.description)}

        {DataVideo?.description.length > 500 && (
          <>
            <span className="font-azarMehr font-medium xl:text-[12px]text-gray">
              {" "}
              ...
            </span>
            <span
              className="dark:text-dark-yellow mx-2 text-blueLink font-azarMehr font-medium cursor-pointer 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle"
              onClick={() => setIsComplete(!isComplete)}
            >
              مشاهده بیشتر
            </span>
          </>
        )}
      </p>

      <div className="relative mt-10 px-3 w-[640px] xs:w-[95%] h-[48px]">
        <input
          type="text"
          className="w-full h-full ps-2 pe-[50px] bg-singleVideo-backgroundInput dark:bg-dark-background rounded-[12px] placeholder-singleVideo-textInput focus:outline-none focus:shadow-md"
          placeholder={checkData(DataVideo?.titles)}
        />
        <SendIcon className="absolute end-8 top-1/4 w-[24px] h-[24px]" />
      </div>
    </div>
  );
};

export default SingleVideoDetailsModule;
