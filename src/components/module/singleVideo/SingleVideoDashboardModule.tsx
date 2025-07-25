"use client";
import { useState, useEffect } from "react";
import { CopyIcon } from "@/components/svgs/SvgCategories";
import { Like, Dislike, View, Comment } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import axios from "axios";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import LoginButtonModule from "./LoginButtonModule";

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
  const [userInteraction, setUserInteraction] = useState<null | boolean>(null); // null: بدون تعامل، true: لایک، false: دیسلایک

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
        setNewData(resVideo.data.data);
        // فرض می‌کنیم API داده‌ای برای وضعیت تعامل کاربر ارائه می‌دهد
        setUserInteraction(resVideo.data.data.user_interaction ?? null);
      } catch (error: any) {
        console.error("خطا در لود داده‌های اولیه:", error?.response?.status, error?.response?.data);
        if (error?.response?.status === 401 && cookies.auth) {
          setShowLoginModal(true);
        }
      }
    };
    fetchInitialData();
  }, [DataVideo.slug, cookies.auth]);

  // تابع مشترک برای مدیریت لایک و دیسلایک
  const handleInteraction = async (isLike: boolean) => {
    if (!cookies.auth) {
      setShowLoginModal(true);
      return;
    }
    if (isLiking || isDisliking) return;

    const setLoading = isLike ? setIsLiking : setIsDisliking;
    setLoading(true);

    try {
      const token = cookies.auth.split("&")[0].replace("token=", "");
      const response = await axios.post(
        `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.id}/interactions?liked=${isLike ? 1 : 0}`,
        { data: " " },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`پاسخ سرور برای ${isLike ? "لایک" : "دیسلایک"}:`, response.data);

      // به‌روزرسانی داده‌های ویدیو
      const resVideo = await axios.get(
        `https://api.rgb.irpsc.com/api/tutorials/${DataVideo.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      setNewData(resVideo.data.data);
      setUserInteraction(isLike); // به‌روزرسانی وضعیت تعامل کاربر
    } catch (error: any) {
      console.error(`خطا در ${isLike ? "لایک" : "دیسلایک"}:`, error?.response?.status, error?.response?.data);
      if (error?.response?.status === 401) {
        setShowLoginModal(true);
      }
    } finally {
      setLoading(false);
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
          <CopyIcon className="fill-singleVideo-gray dark:fill-white xs:size-[24px] md:size-[18px]" />
        </div>

        <div className="flex flex-row justify-center items-center gap-2">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px] md:text-lg">
            {checkData(dataCommentsVideo?.data?.length ?? 0)}
          </p>
          <Comment className="stroke-textGray dark:stroke-white xs:size-[24px] md:size-[18px]" />
        </div>

        <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px] md:text-lg">
            {checkData(newData.likes_count)}
          </p>
          <motion.div
            className={`xs:size-[24px] md:size-[18px] outline-none border-none stroke-darkGray dark:stroke-white flex items-center justify-center ${isLiking || !cookies.auth || userInteraction === true ? "opacity-50" : "cursor-pointer"}`}
            whileTap={{ scale: isLiking || !cookies.auth || userInteraction === true ? 1 : 1.2 }}
            onClick={() => handleInteraction(true)}
          >
            <Like className={`size-full `} />
          </motion.div>
        </div>

        <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px] md:text-lg">
            {checkData(newData.dislikes_count)}
          </p>
          <motion.div
            className={`xs:size-[24px] md:size-[18px] outline-none border-none stroke-darkGray dark:stroke-white flex items-center justify-center ${isDisliking || !cookies.auth || userInteraction === false ? "opacity-50" : "cursor-pointer"}`}
            whileTap={{ scale: isDisliking || !cookies.auth || userInteraction === false ? 1 : 1.2 }}
            onClick={() => handleInteraction(false)}
          >
            <Dislike className={`size-full `} />
          </motion.div>
        </div>

        <div className="flex flex-row justify-center items-center gap-2 xs:hidden">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px] md:text-lg">
            {checkData(newData.views_count)}
          </p>
          <View className="stroke-textGray dark:stroke-white xs:size-[24px] md:size-[18px]" />
        </div>
      </div>

      {/* مودال ورود */}
      {showLoginModal && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
          <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-center dark:text-white mb-4">
              برای لایک و دیسلایک باید وارد شوید
            </h2>
            <div className="flex gap-2 justify-between items-center w-full mt-5">
              <LoginButtonModule params={mainData} />
              <div className="w-1/2 flex justify-center">
                <button
                  className="w-full bg-dark-gray dark:bg-extraGray text-black dark:text-white font-azarMehr py-2 px-2 md:px-4 font-medium text-[15px] rounded-[10px] hover:bg-gray-400 active:scale-105 duration-300"
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