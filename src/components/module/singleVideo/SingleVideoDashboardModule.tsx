"use client";
import { useState, useEffect } from "react";
import { CopyIcon } from "@/components/svgs/SvgCategories";
import { Like, Dislike, View, Comment } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import axios from "axios";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import LoginButtonModule from "./LoginButtonModule"; // فرض بر این است که LoginMenuModule در دسترس است

const SingleVideoDashboardModule = ({
  DataVideo,
  setOpenSharedPage,
  mainData,
  params,
  dataCommentsVideo,
}: any) => {
  const [cookies] = useCookies(["auth"]);
  const [newData, setNewData] = useState(DataVideo);
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // لود داده‌های اولیه به‌روز
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = cookies.auth?.split("&")[0].replace("token=", "");
        const headers: any = { "Cache-Control": "no-cache" };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const resVideo = await axios.get(
          `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.slug}`,
          { headers }
        );
        console.log("داده‌های اولیه:", resVideo.data.data);
        setNewData(resVideo.data.data);
      } catch (error: any) {
        console.error("خطا در لود داده‌های اولیه:", error?.response?.status, error?.response?.data);
        if (error?.response?.status === 401 && cookies.auth) {
          console.log("توکن نامعتبر است. هدایت به صفحه ورود...");
          setShowLoginModal(true);
        }
      }
    };
    fetchInitialData();
  }, [DataVideo.slug, cookies.auth]);

  const handlerLikeComments = async () => {
    if (!cookies.auth) {
      setShowLoginModal(true);
      return;
    }
    if (isLiking) return;
    setIsLiking(true);
    try {
      const token = cookies.auth.split("&")[0].replace("token=", "");
      const requestData = { data: " " };
      const response = await axios.post(
        `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.id}/like`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("پاسخ سرور برای لایک:", response.data);
      const resVideo = await axios.get(
        `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      console.log("داده‌های جدید ویدیو:", resVideo.data.data);
      setNewData(resVideo.data.data);
    } catch (error: any) {
      console.error("خطا در لایک:", error?.response?.status, error?.response?.data);
      if (error?.response?.status === 401) {
        console.log("توکن نامعتبر است. هدایت به صفحه ورود...");
        setShowLoginModal(true);
      }
    } finally {
      setIsLiking(false);
    }
  };

  const handlerDisLikeComments = async () => {
    if (!cookies.auth) {
      setShowLoginModal(true);
      return;
    }
    if (isDisliking) return;
    setIsDisliking(true);
    try {
      const token = cookies.auth.split("&")[0].replace("token=", "");
      const requestData = { data: " " };
      const response = await axios.post(
        `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.id}/dislike`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("پاسخ سرور برای دیسلایک:", response.data);
      const resVideo = await axios.get(
        `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      console.log("داده‌های جدید ویدیو:", resVideo.data.data);
      setNewData(resVideo.data.data);
    } catch (error: any) {
      console.error("خطا در دیسلایک:", error?.response?.status, error?.response?.data);
      if (error?.response?.status === 401) {
        console.log("توکن نامعتبر است. هدایت به صفحه ورود...");
        setShowLoginModal(true);
      }
    } finally {
      setIsDisliking(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-row justify-evenly items-center pt-3 bg-white dark:bg-dark-background z-40 relative">
        <div className="flex flex-row justify-center items-center gap-2 xs:hidden">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
            {checkData(findByUniqueId(mainData, 191))}
          </p>
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
            {checkData(newData.created_at)}
          </p>
        </div>

        <div
          className="flex flex-row justify-center items-center gap-2 cursor-pointer"
          onClick={() => setOpenSharedPage(true)}
        >
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
            {checkData(findByUniqueId(mainData, 244))}
          </p>
          <CopyIcon className="fill-singleVideo-gray dark:fill-white xs:size-[24px]" />
        </div>

        <div className="flex flex-row justify-center items-center gap-2">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
            {checkData(dataCommentsVideo?.data?.length ?? 0)}
          </p>
          <Comment className="stroke-singleVideo-gray dark:stroke-white xs:size-[24px]" />
        </div>

        <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
            {checkData(newData.likes_count)}
          </p>
          <motion.div
            className={`xs:size-[24px] outline-none border-none stroke-singleVideo-gray dark:stroke-white ${isLiking || !cookies.auth ? "opacity-50 " : "cursor-pointer"}`}
            whileTap={{ scale: isLiking || !cookies.auth ? 1 : 1.2 }}
            onClick={handlerLikeComments}
          >
            <Like className="stroke-singleVideo-gray dark:stroke-white size-full" />
          </motion.div>
        </div>

        <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
            {checkData(newData.dislikes_count)}
          </p>
          <motion.div
            className={`xs:size-[24px] outline-none border-none stroke-singleVideo-gray dark:stroke-white  ${isDisliking || !cookies.auth ? "opacity-50 " : "cursor-pointer "}`}
            whileTap={{ scale: isDisliking || !cookies.auth ? 1 : 1.2 }}
            onClick={handlerDisLikeComments}
          >
            <Dislike className="stroke-singleVideo-gray dark:stroke-white size-full" />
          </motion.div>
        </div>

        <div className="flex flex-row justify-center items-center gap-2 xs:hidden">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
            {checkData(newData.views_count)}
          </p>
          <View className="stroke-singleVideo-gray dark:stroke-white xs:size-[24px]" />
        </div>
      </div>

      {/* مودال ورود */}
      {showLoginModal && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
          <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg max-w-sm w-full ">
            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-center dark:text-white mb-4">
              برای لایک و دیسلایک باید وارد شوید
            </h2>
        <div className="flex gap-2 justify-between items-center w-full mt-5">
                      <LoginButtonModule params={mainData} />
            <div className="w-1/2 flex justify-center ">
              <button
                className=" w-full bg-dark-gray dark:bg-extraGray text-black dark:text-white font-azarMehr py-2 px-2 md:px-4  font-medium text-center text-[15px] rounded-[10px] hover:bg-gray-400 active:scale-105 duration-300"
                onClick={() => setShowLoginModal(false)}
              >
                بستن
              </button>
            </div>
        </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleVideoDashboardModule;