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
  const [userInteraction, setUserInteraction] = useState<null | boolean>(DataVideo.user_interaction ?? null);

  // همگام‌سازی newData با props وقتی DataVideo تغییر کنه (مثل رفرش)
  useEffect(() => {
    setNewData(DataVideo);
    setUserInteraction(DataVideo.user_interaction ?? null);
  }, [DataVideo]);

  // تابع مشترک برای مدیریت لایک و دیسلایک
  const handleInteraction = async (isLike: boolean) => {
    if (!cookies.auth) {
      setShowLoginModal(true);
      return;
    }
    if (isLiking || isDisliking) return;

    // اگر کاربر بخواد همون interaction رو تکرار کنه، چیزی تغییر نمی‌کنه
    if (userInteraction === isLike) return;

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
          withCredentials: true,
        }
      );
      console.log(`پاسخ سرور برای ${isLike ? "لایک" : "دیسلایک"}:`, response.data);

      // آپدیت محلی counts
      setNewData((prevData: any) => {
        let updatedLikes = prevData.likes_count || 0;
        let updatedDislikes = prevData.dislikes_count || 0;

        // اگر قبلاً لایک کرده و حالا دیسلایک می‌کنه
        if (userInteraction === true && !isLike) {
          updatedLikes -= 1;
          updatedDislikes += 1;
        }
        // اگر قبلاً دیسلایک کرده و حالا لایک می‌کنه
        else if (userInteraction === false && isLike) {
          updatedDislikes -= 1;
          updatedLikes += 1;
        }
        // اگر هیچ تعاملی نداشته و لایک می‌کنه
        else if (userInteraction === null && isLike) {
          updatedLikes += 1;
        }
        // اگر هیچ تعاملی نداشته و دیسلایک می‌کنه
        else if (userInteraction === null && !isLike) {
          updatedDislikes += 1;
        }

        return {
          ...prevData,
          likes_count: updatedLikes,
          dislikes_count: updatedDislikes,
        };
      });

      // آپدیت userInteraction
      setUserInteraction(isLike ? true : false);
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
            {checkData(newData.likes_count || 0)}
          </p>
          <motion.div
            className={`xs:size-[24px] md:size-[18px] outline-none border-none stroke-darkGray dark:stroke-white flex items-center justify-center ${isLiking || !cookies.auth || userInteraction === true ? "opacity-50" : "cursor-pointer"}`}
            whileTap={{ scale: isLiking || !cookies.auth || userInteraction === true ? 1 : 1.2 }}
            onClick={() => handleInteraction(true)}
          >
            <Like className={`size-full`} />
          </motion.div>
        </div>

        <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px] md:text-lg">
            {checkData(newData.dislikes_count || 0)}
          </p>
          <motion.div
            className={`xs:size-[24px] md:size-[18px] outline-none border-none stroke-darkGray dark:stroke-white flex items-center justify-center ${isDisliking || !cookies.auth || userInteraction === false ? "opacity-50" : "cursor-pointer"}`}
            whileTap={{ scale: isDisliking || !cookies.auth || userInteraction === false ? 1 : 1.2 }}
            onClick={() => handleInteraction(false)}
          >
            <Dislike className={`size-full`} />
          </motion.div>
        </div>

        <div className="flex flex-row justify-center items-center gap-2 xs:hidden">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px] md:text-lg">
            {checkData(newData.views_count || 0)}
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