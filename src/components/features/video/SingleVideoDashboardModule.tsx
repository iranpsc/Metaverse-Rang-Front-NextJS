
"use client";

import { useState, useEffect } from "react";
import { CopyIcon } from "@/components/svgs/SvgCategories";
import {
  Like,
  Dislike,
  View,
  Comment,
} from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import axios from "axios";
import { motion } from "motion/react";
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

  const [userInteraction, setUserInteraction] = useState<
    null | boolean
  >(DataVideo?.user_interaction ?? null);

  // --------------------------------------------------
  // Sync DataVideo
  // --------------------------------------------------
  useEffect(() => 
    {

        console.log("🔄 DataVideo after refresh:", DataVideo);
  console.log(
    "❤️ user_interaction:",
    DataVideo?.user_interaction
  );
    setNewData(DataVideo);

    setUserInteraction(
      DataVideo?.user_interaction ?? null
    );
  }, [DataVideo]);

  // --------------------------------------------------
  // گرفتن Token از Cookie
  // --------------------------------------------------
  const getAuthToken = (): string | null => {
    const auth = cookies?.auth;

    if (!auth) {
      return null;
    }

    try {
      // ---------------------------------------------
      // اگر auth به صورت object باشد
      // ---------------------------------------------
      if (typeof auth === "object") {
        if (auth?.token) {
          return auth.token;
        }

        return null;
      }

      // ---------------------------------------------
      // اگر auth به صورت string باشد
      // ---------------------------------------------
      if (typeof auth === "string") {
        // حالت:
        // token=XXXX&...
        try {
          const params = new URLSearchParams(auth);
          const token = params.get("token");

          if (token) {
            return token;
          }
        } catch (error) {
          console.error(
            "خطا در parse کردن auth cookie:",
            error
          );
        }

        // -----------------------------------------
        // fallback
        // اگر ساختار cookie مثلاً:
        // token=XXXX
        // باشد
        // -----------------------------------------
        if (auth.startsWith("token=")) {
          return auth
            .split("&")[0]
            .replace(/^token=/, "");
        }
      }

      return null;
    } catch (error) {
      console.error(
        "خطا در دریافت Token:",
        error
      );

      return null;
    }
  };

  // --------------------------------------------------
  // لایک / دیسلایک
  // --------------------------------------------------
  const handleInteraction = async (
    isLike: boolean
  ) => {
    // Token را دقیقاً در لحظه کلیک می‌گیریم
    const token = getAuthToken();

    console.log("========== INTERACTION ==========");
    console.log("auth cookie:", cookies?.auth);
    console.log("token:", token ? "EXISTS" : "NOT FOUND");
    console.log("isLike:", isLike);
    console.log(
      "userInteraction:",
      userInteraction
    );
    console.log("=================================");

    // ---------------------------------------------
    // کاربر لاگین نیست
    // ---------------------------------------------
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    // ---------------------------------------------
    // جلوگیری از چند درخواست همزمان
    // ---------------------------------------------
    if (isLiking || isDisliking) {
      return;
    }

    // ---------------------------------------------
    // اگر همان interaction قبلاً ثبت شده
    // ---------------------------------------------
    if (userInteraction === isLike) {
      return;
    }

    // ---------------------------------------------
    // Loading
    // ---------------------------------------------
    if (isLike) {
      setIsLiking(true);
    } else {
      setIsDisliking(true);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tutorials/${DataVideo.id}/interactions?liked=${
          isLike ? 1 : 0
        }`,
        {
          data: " ",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(
        "Interaction response:",
        response.data
      );

      // ---------------------------------------------
      // آپدیت تعدادها
      // ---------------------------------------------
      setNewData((prevData: any) => {
        let likes = Number(
          prevData?.likes_count ?? 0
        );

        let dislikes = Number(
          prevData?.dislikes_count ?? 0
        );

        // -----------------------------------------
        // قبلاً Like بوده
        // الان Dislike
        // -----------------------------------------
        if (
          userInteraction === true &&
          isLike === false
        ) {
          likes = Math.max(0, likes - 1);
          dislikes += 1;
        }

        // -----------------------------------------
        // قبلاً Dislike بوده
        // الان Like
        // -----------------------------------------
        else if (
          userInteraction === false &&
          isLike === true
        ) {
          dislikes = Math.max(
            0,
            dislikes - 1
          );
          likes += 1;
        }

        // -----------------------------------------
        // هیچ interaction نداشته
        // Like
        // -----------------------------------------
        else if (
          userInteraction === null &&
          isLike === true
        ) {
          likes += 1;
        }

        // -----------------------------------------
        // هیچ interaction نداشته
        // Dislike
        // -----------------------------------------
        else if (
          userInteraction === null &&
          isLike === false
        ) {
          dislikes += 1;
        }

        return {
          ...prevData,
          likes_count: likes,
          dislikes_count: dislikes,
        };
      });

      // ---------------------------------------------
      // وضعیت interaction کاربر
      // ---------------------------------------------
      setUserInteraction(isLike);
    } catch (error: any) {
      console.error(
        "================================="
      );

      console.error(
        `خطا در ${
          isLike
            ? "لایک"
            : "دیس‌لایک"
        }`
      );

      console.error(
        "Status:",
        error?.response?.status
      );

      console.error(
        "Response:",
        error?.response?.data
      );

      console.error(
        "================================="
      );

      // ---------------------------------------------
      // Token منقضی یا نامعتبر شده
      // ---------------------------------------------
      if (
        error?.response?.status === 401
      ) {
        setShowLoginModal(true);
      }
    } finally {
      // ---------------------------------------------
      // Loading OFF
      // ---------------------------------------------
      setIsLiking(false);
      setIsDisliking(false);
    }
  };

  return (
    <>
      {/* ================================================= */}
      {/* DASHBOARD */}
      {/* ================================================= */}

      <div className="w-full flex flex-row justify-evenly items-center pt-3 bg-white dark:bg-dark-background z-40 relative">

        {/* --------------------------------------------- */}
        {/* DATE */}
        {/* --------------------------------------------- */}

        <div className="flex flex-row justify-center items-center gap-2 xs:hidden">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
            {checkData(
              findByUniqueId(mainData, 191)
            )}
          </p>

          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
            {checkData(
              newData?.created_at
            )}
          </p>
        </div>

        {/* --------------------------------------------- */}
        {/* SHARE */}
        {/* --------------------------------------------- */}

        <div
          className="flex flex-row justify-center items-center gap-2 cursor-pointer"
          onClick={() =>
            setOpenSharedPage(true)
          }
        >
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px]">
            {checkData(
              findByUniqueId(
                mainData,
                244
              )
            )}
          </p>

          <CopyIcon className="fill-singleVideo-gray dark:fill-white size-[15px] md:size-[18px]" />
        </div>

        {/* --------------------------------------------- */}
        {/* COMMENTS */}
        {/* --------------------------------------------- */}

        <div className="flex flex-row justify-center items-center gap-2">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px] md:text-lg">
            {checkData(
              dataCommentsVideo?.data
                ?.length ?? 0
            )}
          </p>

          <Comment className="stroke-matn-2 dark:stroke-white size-[15px] md:size-[18px]" />
        </div>

        {/* ================================================= */}
        {/* LIKE */}
        {/* ================================================= */}

        <div className="flex flex-row justify-center items-center gap-2">

          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px] md:text-lg">
            {checkData(
              newData?.likes_count ?? 0
            )}
          </p>

          <motion.div
            className={`size-[15px] md:size-[18px] outline-none border-none stroke-gray-1 dark:stroke-white flex items-center justify-center ${
              isLiking ||
              userInteraction === true
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            whileTap={{
              scale:
                isLiking ||
                userInteraction === true
                  ? 1
                  : 1.2,
            }}
            onClick={() =>
              handleInteraction(true)
            }
          >
            {isLiking ? (
              <div className="size-[15px] border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Like className="size-full" />
            )}
          </motion.div>
        </div>

        {/* ================================================= */}
        {/* DISLIKE */}
        {/* ================================================= */}

        <div className="flex flex-row justify-center items-center gap-2">

          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px] md:text-lg">
            {checkData(
              newData?.dislikes_count ?? 0
            )}
          </p>

          <motion.div
            className={`size-[15px] md:size-[18px] outline-none border-none stroke-gray-1 dark:stroke-white flex items-center justify-center ${
              isDisliking ||
              userInteraction === false
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            whileTap={{
              scale:
                isDisliking ||
                userInteraction === false
                  ? 1
                  : 1.2,
            }}
            onClick={() =>
              handleInteraction(false)
            }
          >
            {isDisliking ? (
              <div className="size-[15px] border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Dislike className="size-full" />
            )}
          </motion.div>
        </div>

        {/* --------------------------------------------- */}
        {/* VIEWS */}
        {/* --------------------------------------------- */}

        <div className="flex flex-row justify-center items-center gap-2 xs:hidden">
          <p className="font-azarMehr font-normal text-singleVideo_medium dark:text-white xs:text-[12px] md:text-lg">
            {checkData(
              newData?.views_count ?? 0
            )}
          </p>

          <View className="stroke-matn-2 dark:stroke-white xs:size-[24px] md:size-[18px]" />
        </div>
      </div>

      {/* ================================================= */}
      {/* LOGIN MODAL */}
      {/* ================================================= */}

      {showLoginModal && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">

          <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg max-w-sm w-full">

            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-center dark:text-white mb-4">
              برای لایک و دیسلایک باید وارد شوید
            </h2>

            <div className="flex gap-2 justify-between items-center w-full mt-5">

              <LoginButtonModule
                params={mainData}
              />

              <div className="w-1/2 flex justify-center">

                <button
                  className="w-full bg-dark-gray dark:bg-extraGray text-black dark:text-white font-azarMehr py-2 px-2 md:px-4 font-medium text-[15px] rounded-[10px] hover:bg-matn-2-400 active:scale-105 duration-300"
                  onClick={() =>
                    setShowLoginModal(false)
                  }
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

