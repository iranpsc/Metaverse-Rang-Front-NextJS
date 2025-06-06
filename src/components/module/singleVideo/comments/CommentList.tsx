"use client";

import { useEffect, useState } from "react";
import { MessageRepeat, Like, Dislike } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import { handleChange, handlerReportComments } from "./utils/helper";
import ProfileComment from "./ProfileComment";
import EditSectionComment from "./utils/EditSectionComment";
import ControlCommentSection from "./ControlCommentSection";
import RepeatCommentSection from "./RepeatCommentSection";
import { motion } from "framer-motion";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import GetAuthData from "@/components/utils/getAuthData";
import axios from "axios";
import LoginButtonModule from "../LoginButtonModule";

interface CommentListProps {
  DataItem: any;
  mainData: any;
  setRefreshComment: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentList = ({
  DataItem,
  mainData,
  setRefreshComment,
}: CommentListProps) => {
  const [activeMenu, setActiveMenu] = useState(0);
  const [editMode, setEditMode] = useState(0);
  const [editedText, setEditedText] = useState("");
  const [edited, setEdited] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSelfCommentModal, setShowSelfCommentModal] = useState(false); // state برای مودال کامنت خود

  const token = GetAuthData("token");

  // دریافت اطلاعات کاربر برای گرفتن کد کاربر (code)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          // console.log("Fetching user data with token:", token);
          const response = await axios.post(
            "https://api.rgb.irpsc.com/api/auth/me",
            null,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log("Response from /auth/me:", response.data);
          setCode(response.data.data.code);
        } else {
          // console.log("No token found for /auth/me");
        }
      } catch (err: any) {
        // console.error("خطا در دریافت اطلاعات کاربر:", err);
        // console.log("Error details:", err.response?.data, err.response?.status);
        if (err.response?.status === 403 || err.response?.status === 401) {
          setShowLoginModal(true);
        }
      }
    };
    fetchUserData();
  }, [token]);

  // تابع مدیریت لایک کامنت
  const handlerLikeComments = async (
    token: string | null,
    commentId: number,
    videoId: number,
    userCode: string | null,
    setRefreshComment: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!token) {
      // console.log("No token found, showing login modal");
      setShowLoginModal(true);
      return;
    }

    // بررسی اینکه آیا کاربر روی کامنت خودش کلیک کرده است
    if (userCode === code) {
      // console.log("User tried to like their own comment, showing error modal");
      setShowSelfCommentModal(true);
      return;
    }

    try {
      // console.log(
      //   `Sending like request for videoId: ${videoId}, commentId: ${commentId}, token: ${token}`
      // );
      const response = await axios.post(
        `https://api.rgb.irpsc.com/api/tutorials/${videoId}/comments/${commentId}/like`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      // console.log("Like response:", response.data);
      setRefreshComment((prev) => !prev);
    } catch (error: any) {
      // console.error("خطا در ثبت لایک:", error);
      // console.log("Response Data:", error.response?.data);
      // console.log("Response Status:", error.response?.status);
      if (error.response?.status === 403 || error.response?.status === 401) {
        // console.log("Unauthorized or Forbidden, showing login modal");
        setShowLoginModal(true);
      }
    }
  };

  // تابع مدیریت دیسلایک کامنت
  const handlerDisLikeComments = async (
    token: string | null,
    commentId: number,
    videoId: number,
    userCode: string | null,
    setRefreshComment: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!token) {
      // console.log("No token found, showing login modal");
      setShowLoginModal(true);
      return;
    }

    // بررسی اینکه آیا کاربر روی کامنت خودش کلیک کرده است
    if (userCode === code) {
      // console.log("User tried to dislike their own comment, showing error modal");
      setShowSelfCommentModal(true);
      return;
    }

    try {
      // console.log(
      //   `Sending dislike request for videoId: ${videoId}, commentId: ${commentId}, token: ${token}`
      // );
      const response = await axios.post(
        `https://api.rgb.irpsc.com/api/tutorials/${videoId}/comments/${commentId}/dislike`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      // console.log("Dislike response:", response.data);
      setRefreshComment((prev) => !prev);
    } catch (error: any) {
      // console.error("خطا در ثبت دیسلایک:", error);
      // console.log("Response Data:", error.response?.data);
      // console.log("Response Status:", error.response?.status);
      if (error.response?.status === 403 || error.response?.status === 401) {
        // console.log("Unauthorized or Forbidden, showing login modal");
        setShowLoginModal(true);
      }
    }
  };

  return (
    <>
      {DataItem.data &&
        DataItem.data.map((itemComment: any) => (
          <div
            key={itemComment.id}
            className={`relative min-h-fit bg-singleVideo-backgroundInput dark:bg-dark-background rounded-[20px] xl:p-7 lg:p-7 md:p-5 sm:p-4 xs:p-3 mb-10 flex flex-col justify-between items-center
            ${
              itemComment.user.code == code
                ? "xl:ms-[50px] lg:ms-[50px] xs:ms-0 w-[95%] xs:w-full"
                : "ms-0 w-full"
            }`}
          >
            <div className="w-full flex flex-row justify-between items-center">
              <ProfileComment
                itemComment={itemComment}
                mainData={mainData}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />

              {activeMenu === itemComment.id && (
                <EditSectionComment
                  itemComment={itemComment}
                  setRefreshComment={setRefreshComment}
                  code={code}
                  mainData={mainData}
                  setEditMode={setEditMode}
                  setEditedText={setEditedText}
                  setEdited={setEdited}
                />
              )}
            </div>

            <div className="w-full mt-5">
              {!edited &&
              editMode === itemComment.id &&
              code === itemComment.user.code ? (
                <form>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => handleChange(e, setEditedText)}
                    className="pe-10 w-fit h-fit"
                  />
                  <button
                    className="bg-dark-yellow px-3 py-1 ms-4 rounded-xl text-black"
                    type="submit"
                  >
                    {checkData(findByUniqueId(mainData, 460))}
                  </button>
                </form>
              ) : (
                <p className="text-[#1A1A18] dark:text-white text-start cursor-pointer font-azarMehr text-[16px] xs:text-[12px] font-normal">
                  {checkData(itemComment.content)}
                </p>
              )}
            </div>

            <div className="w-full flex flex-row justify-between items-center mt-10 xs:mt-7">
              <div className="xl:w-fit lg:w-fit md:w-fit sm:w-full xs:w-full flex flex-row justify-start xs:justify-between items-center gap-5">
                {itemComment.user.code === code && (
                  <ControlCommentSection
                    itemComment={itemComment}
                    setRefreshComment={setRefreshComment}
                    mainData={mainData}
                    setEditMode={setEditMode}
                    setEditedText={setEditedText}
                  />
                )}

                <div className="flex flex-row justify-center items-center gap-1 cursor-pointer">
                  <p className="font-azarMehr font-normal text-black dark:text-white text-singleVideo_medium">
                    {checkData(itemComment?.likes)}
                  </p>
                  <motion.div
                    className="xs:size-[24px] outline-none border-none stroke-singleVideo-gray dark:stroke-white cursor-pointer"
                    whileTap={{ scale: 1.2 }}
                    onClick={() =>
                      handlerLikeComments(
                        token,
                        itemComment.id,
                        itemComment.video_id,
                        itemComment.user.code,
                        setRefreshComment
                      )
                    }
                  >
                    <Like className="stroke-[#414040] dark:stroke-white cursor-pointer" />
                  </motion.div>
                </div>

                <div className="flex flex-row justify-center items-center gap-1 cursor-pointer">
                  <p className="font-azarMehr font-normal text-singleVideo_medium text-black dark:text-white">
                    {checkData(itemComment?.dislikes)}
                  </p>
                  <motion.div
                    className="xs:size-[24px] outline-none border-none stroke-singleVideo-gray dark:stroke-white cursor-pointer"
                    whileTap={{ scale: 1.2 }}
                    onClick={() =>
                      handlerDisLikeComments(
                        token,
                        itemComment.id,
                        itemComment.video_id,
                        itemComment.user.code,
                        setRefreshComment
                      )
                    }
                  >
                    <Dislike className="stroke-[#414040] dark:stroke-white cursor-pointer" />
                  </motion.div>
                </div>

                {itemComment.user.code !== code && (
                  <div
                    className="flex flex-row justify-center items-center gap-1 cursor-pointer xs:hidden"
                    onClick={() =>
                      handlerReportComments(
                        token,
                        itemComment.id,
                        itemComment.video_id,
                        setShowLoginModal
                      )
                    }
                  >
                    <p className="font-azarMehr font-normal text-black dark:text-white text-singleVideo_medium">
                      {checkData(findByUniqueId(mainData, 193))}
                    </p>
                    <motion.div
                      className="xs:size-[24px] outline-none border-none stroke-singleVideo-gray dark:stroke-white cursor-pointer"
                      whileTap={{ scale: 1.2 }}
                    >
                      <MessageRepeat className="stroke-[#414040] dark:stroke-white cursor-pointer" />
                    </motion.div>
                  </div>
                )}

                <RepeatCommentSection mainData={mainData} type={"mob"} />
              </div>

              <RepeatCommentSection mainData={mainData} type={"xl"} />
            </div>
          </div>
        ))}

      {/* مودال ورود */}
      {showLoginModal && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
          <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-center dark:text-white mb-4">
              برای لایک یا دیسلایک باید وارد شوید
            </h2>
            <div className="flex gap-2 justify-between items-center w-full mt-5">
              <LoginButtonModule params={mainData} />
              <div className="w-1/2 flex justify-center">
                <button
                  className="w-full bg-dark-gray dark:bg-extraGray text-black dark:text-white font-azarMehr py-2 px-2 md:px-4 font-medium text-center text-[15px] rounded-[10px] hover:bg-gray-400 active:scale-105 duration-300"
                  onClick={() => setShowLoginModal(false)}
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* مودال خطا برای کامنت خود کاربر */}
      {showSelfCommentModal && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
          <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-center dark:text-white mb-4">
              نمی‌توانید روی کامنت خودتان لایک یا دیسلایک کنید
            </h2>
            <div className="flex justify-center w-full mt-5">
              <button
                className="w-1/2 bg-dark-gray dark:bg-extraGray text-black dark:text-white font-azarMehr py-2 px-2 md:px-4 font-medium text-center text-[15px] rounded-[10px] hover:bg-gray-400 active:scale-105 duration-300"
                onClick={() => setShowSelfCommentModal(false)}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentList;