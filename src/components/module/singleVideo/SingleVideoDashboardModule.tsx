"use client";
import { useContext, useState } from "react";
// import { AuthContext } from "@/components/context/AuthContext";
// import { useToken } from "@/components/context/TokenContext";
import { CopyIcon } from "@/components/svgs/SvgCategories";
import { Like, Dislike, View, Comment } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import axios from "axios";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

const SingleVideoDashboardModule = ({
  DataVideo,
  setOpenSharedPage,
  // translateSingleVideo,
  mainData,
  params,
}: any) => {
  // const { code, token } = useToken();
  const [cookies] = useCookies(["auth"]);

  // const { setShowAuthCard } = useContext(AuthContext);
  const category = params.category;
  const subcategory = params.subcategory;
  const [newData, setNewData] = useState(DataVideo);

  const handlerLikeComments = async () => {
    if (cookies.auth) {
      try {
        const requestData = {
          data: " ",
        };
        const response = await axios.post(
          `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.id}/like`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${cookies.auth}`,
            },
          }
        );

        const resVideo = await axios.get(
          `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.slug}`
        );
        setNewData(resVideo.data.data);
      } catch (error: any) {
        console.error("خطا:", error?.response?.status);
      }
    } else {
      // setShowAuthCard(true);
    }
  };
  const handlerDisLikeComments = async () => {
    if (cookies.auth) {
      try {
        const requestData = {
          data: " ",
        };
        const response = await axios.post(
          `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.id}/dislike`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${cookies.auth}`,
            },
          }
        );

        const resVideo = await axios.get(
          `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.slug}`
        );
        setNewData(resVideo.data.data);
      } catch (error: any) {
        console.error("خطا:", error?.response?.status);
      }
    } else {
      // setShowAuthCard(true);
    }
  };

  return (
    <div className="w-full flex flex-row justify-evenly items-center pt-3 bg-white dark:bg-dark-background z-40 relative">
      <div className="flex flex-row justify-center items-center gap-2 xs:hidden">
        <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white  xs:text-[12px]">
          {/* {checkData(
            translateSingleVideo.find(
              (item: any) => item.name === "publication date"
            )?.translation
          )} */}
          {checkData(findByUniqueId(mainData, 191))}
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
          {/* {checkData(
            translateSingleVideo.find((item: any) => item.name === "share")
              ?.translation
          )} */}
          {checkData(findByUniqueId(mainData, 244))}
        </p>
        <CopyIcon className="fill-singleVideo-gray dark:fill-white xs:size-[24px]" />
      </div>

      <div className="flex flex-row justify-center items-center gap-2">
        <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
          {checkData(DataVideo.comments)}
        </p>
        <Comment className="stroke-singleVideo-gray dark:stroke-white xs:size-[24px]" />
      </div>
      <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
        <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
          {checkData(newData.likes_count)}
        </p>
        <motion.div
          className=" xs:size-[24px] outline-none border-none stroke-singleVideo-gray dark:stroke-white"
          whileTap={{ scale: 1.2 }}
          onClick={handlerLikeComments}
        >
          <Like className="stroke-singleVideo-gray dark:stroke-white size-full" />
        </motion.div>
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
          {checkData(newData.dislikes_count)}
        </p>
        <motion.div
          className=" xs:size-[24px] outline-none border-none stroke-singleVideo-gray dark:stroke-white cursor-pointer"
          whileTap={{ scale: 1.2 }}
          onClick={handlerDisLikeComments}
        >
          <Dislike className="stroke-singleVideo-gray dark:stroke-white size-full" />
        </motion.div>
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
