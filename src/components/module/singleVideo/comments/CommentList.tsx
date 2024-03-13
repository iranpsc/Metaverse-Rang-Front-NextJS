import {
  Repeat,
  MessageRepeat,
  Like,
  Dislike,
  Trash,
  MenuCommentIcon,
  EditIcon,
} from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import Image from "next/image";
import { useState } from "react";

const CommentList = ({ DataVideo, typeData }: any) => {
  const [activeMenu, setActiveMenu] = useState(false);
  return (
    <div
      className={` relative min-h-[258px] bg-singleVideo-backgroundInput dark:bg-dark-background rounded-[20px] p-7 ${
        typeData === "me" ? "ms-[50px] w-[90%]" : "ms-0 w-full"
      }`}
    >
      <div className="w-full flex flex-row justify-between items-center ">
        <div className="flex flex-row justify-start items-center gap-2 h-[50px] ">
          <Image
            src={DataVideo.creator.image}
            alt={DataVideo.creator.code}
            width={1000}
            height={1000}
            loading="lazy"
            className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
            // onClick={() => pushRgb(item.creator.code)}
          />
          <div className="flex flex-col justify-center items-center gap-1 h-[40px]">
            <span
              className="text-singleVideo-gray dark:text-white  text-start cursor-pointer text-[16px] xs:text-[12px] font-medium w-full "
              // onClick={() => pushRgb(item.creator.code)}
            >
              {checkData(DataVideo.creator.name)}
            </span>
            <span
              className="text-blueLink  cursor-pointer text-[14px] xs:text-[12px] font-medium whitespace-nowrap"
              // onClick={() => pushRgb(item.creator.code)}
            >
              {checkData(DataVideo.creator.code)}
              {" : "}
              {checkData(DataVideo.creator.code)}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <p className="font-azarMehr font-normal text-singleVideo_medium xs:text-[10px] xs:hidden text-singleVideo-gray dark:text-white">
            تاریخ انتشار :{" "}
          </p>
          <p className="font-azarMehr font-normal text-singleVideo_medium xs:text-[10px] text-singleVideo-gray dark:text-white">
            {checkData(DataVideo.created_at)}
          </p>
        </div>
        <MenuCommentIcon
          className="size-[24px] cursor-pointer xl:hidden lg:hidden md:hidden sm:block xs:block"
          onClick={() => setActiveMenu(!activeMenu)}
        />
        {activeMenu && (
          <div className="w-fit h-[50px] absolute bg-[#f5f5f5] end-5 top-[75px] rounded-[12px] shadow-xl flex flex-row justify-between items-center px-4 gap-5">
            <div className="flex flex-row justify-center items-center gap-2 ">
              <p className="font-azarMehr font-normal text-[12px] text-error ">
                Undefined
              </p>
              <Trash className="size-[24px] stroke-error" />
            </div>

            <div className="flex flex-row justify-center items-center gap-2">
              <p className="font-azarMehr font-normal text-[12px]">
                {checkData(DataVideo?.Comments)}
              </p>
              <EditIcon className="stroke-[#414040] size-[24px]" />
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <p className="font-azarMehr font-normal text-[12px]">
                {checkData(DataVideo?.Comments)}
              </p>
              <MessageRepeat className="stroke-[#414040] size-[24px]" />
            </div>
          </div>
        )}
      </div>

      <p className="text-[#1A1A18] dark:text-white  text-start cursor-pointer font-azarMehr text-[16px] xs:text-[12px] font-normal w-full mt-5">
        سخت و متون و فرهنگ پیشرو فراوان و با موجود شامل جامعه که، در صنعت طراحان
        خلاقی داشت استفاده و کاربردهای از شرایط و متخصصان جامعه ابزارهای کاربردی
        لازم در با هدف طراحان طراحان خلاقی در و سطر و مجله برای طراحی با، شامل و
        دشواری در بلکه شناخبردهای موجود و مجله می باشد و زمان بهبود در این صورت
        تایپ سخت
      </p>

      <div className="w-full flex flex-row justify-between   items-center mt-10 xs:mt-7">
        <div className="w-[291px] xs:w-full flex flex-row justify-start xs:justify-between items-center gap-5">
          {typeData === "me" && (
            <div className="flex flex-row justify-center items-center gap-2 xl:flex lg:flex md:flex xs:hidden sm:hidden">
              {" "}
              <p className="font-azarMehr font-normal text-singleVideo_medium text-error ">
                Undefined
              </p>{" "}
              <Trash className="size-[24px] stroke-error" />
            </div>
          )}

          <div className="flex flex-row justify-center items-center gap-2">
            <p className="font-azarMehr font-normal text-singleVideo_medium">
              {checkData(DataVideo?.likes_count)}
            </p>
            <Like className="stroke-[#414040] dark:stroke-white" />
          </div>

          <div className="flex flex-row justify-center items-center gap-2">
            <p className="font-azarMehr font-normal text-singleVideo_medium">
              {checkData(DataVideo?.dislikes_count)}
            </p>
            <Dislike className="stroke-[#414040] dark:stroke-white" />
          </div>

          <div className="flex flex-row justify-center items-center gap-2 xs:hidden">
            <p className="font-azarMehr font-normal text-singleVideo_medium">
              {checkData(DataVideo?.Comments)}
            </p>
            <MessageRepeat className="stroke-[#414040] dark:stroke-white" />
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xs:visible">
            <span className="text-blueLink font-azarMehr text-singleVideo_medium font-normal">
              {checkData(DataVideo.created_sat)}
            </span>
            <Repeat className="size-[24px]" />
          </div>
        </div>

        <div className="flex flex-row justify-center items-center gap-1 xs:hidden">
          <span className="text-blueLink dark:text-dark-yellow font-azarMehr text-singleVideo_medium font-normal">
            {checkData(DataVideo.created_sat)}
          </span>
          <Repeat className="size-[24px] stroke-blueLink dark:stroke-dark-yellow" />
        </div>
      </div>
    </div>
  );
};

export default CommentList;
