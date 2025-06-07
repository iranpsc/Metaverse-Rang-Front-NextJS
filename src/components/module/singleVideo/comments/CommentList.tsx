"use client";

import { useEffect, useState } from "react";
import { MessageRepeat, Like, Dislike } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import { handleChange, handleSubmit, handlerReportComments } from "./utils/helper";
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
  params: any;
  setRefreshComment: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentList = ({
  DataItem,
  mainData,
  params,
  setRefreshComment,
}: CommentListProps) => {
  const [activeMenu, setActiveMenu] = useState(0);
  const [editMode, setEditMode] = useState(0);
  const [editedText, setEditedText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSelfCommentModal, setShowSelfCommentModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(0);

  const token = GetAuthData("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
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
          setCode(response.data.data.code);
        }
      } catch (err: any) {
        console.error("خطا در دریافت اطلاعات کاربر:", err?.response?.status, err?.response?.data);
        if (err.response?.status === 403 || err.response?.status === 401) {
          setShowLoginModal(true);
        }
      }
    };
    fetchUserData();
  }, [token]);

  const handlerLikeComments = async (
    token: string | null,
    commentId: number,
    videoId: number,
    userCode: string | null,
    setRefreshComment: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    if (userCode === code) {
      setShowSelfCommentModal(true);
      return;
    }
    try {
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
      setRefreshComment((prev) => !prev);
    } catch (error: any) {
      console.error("خطا در ثبت لایک:", error?.response?.status, error?.response?.data);
      if (error.response?.status === 403 || error.response?.status === 401) {
        setShowLoginModal(true);
      }
    }
  };

  const handlerDisLikeComments = async (
    token: string | null,
    commentId: number,
    videoId: number,
    userCode: string | null,
    setRefreshComment: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    if (userCode === code) {
      setShowSelfCommentModal(true);
      return;
    }
    try {
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
      setRefreshComment((prev) => !prev);
    } catch (error: any) {
      console.error("خطا در ثبت دیسلایک:", error?.response?.status, error?.response?.data);
      if (error.response?.status === 403 || error.response?.status === 401) {
        setShowLoginModal(true);
      }
    }
  };

  const handleReportClick = (commentId: number) => {
    setShowReportModal(commentId);
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <>
      {DataItem.data &&
        DataItem.data.map((itemComment: any) => (
          <div
            key={itemComment.id}
            className={`relative min-h-fit bg-singleVideo-backgroundInput bg-[#ECECEC] dark:bg-[#1A1A18] rounded-[20px] xl:p-7 lg:p-7 md:p-5 sm:p-4 xs:p-3 mb-10 flex flex-col justify-between items-center
              ${itemComment.user.code == code
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
                params={params}
                
                
              />
              {activeMenu === itemComment.id && (
                <EditSectionComment
                  itemComment={itemComment}
                  setRefreshComment={setRefreshComment}
                  setShowAuthCard={setShowLoginModal}
                  mainData={mainData}
                  setEditMode={setEditMode}
                  setEditedText={setEditedText}
                  setEdited={() => { }}
                  code={code}
                  setError={setError}
                />
              )}
            </div>

            <div className="w-full mt-5">
              {editMode === itemComment.id && code === itemComment.user.code ? (
                <form
                  onSubmit={(e) => {
                    setError(null);
                    handleSubmit(
                      e,
                      itemComment.video_id,
                      itemComment.id,
                      token,
                      editedText,
                      setEditMode,
                      setShowLoginModal,
                      setRefreshComment,
                      setError
                    );
                  }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => handleChange(e, setEditedText)}
                      className="w-full p-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary rounded-[10px] bg-bgGray dark:bg-black dark:text-dark-gray"
                      placeholder="متن کامنت را وارد کنید"
                    />

                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                  </div>
                  <button
                    type="submit"
                    className="bg-light-primary dark:bg-dark-yellow px-3 py-[6px] rounded-xl text-white dark:text-black"
                  >
                    {checkData(findByUniqueId(mainData, 460))}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(0)}
                    className="bg-bgGray dark:bg-black  px-3 py-[6px] rounded-xl dark:text-white"
                  >
                    لغو
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
                    setError={setError}
                  />
                )}
                <div className="flex flex-row justify-center items-center gap-1 cursor-pointer">
                  <p className="font-azarMehr font-normal text-black dark:text-white text-singleVideo_medium">
                    {checkData(itemComment?.likes)}
                  </p>
                  <motion.div
                    className="xs:size-[24px] outline-none border-none stroke-singleVideo-gray dark:stroke-white cursor-pointer  flex items-center justify-center"
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
                    className="xs:size-[24px] outline-none border-none stroke-singleVideo-gray dark:stroke-white cursor-pointer  flex items-center justify-center"
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
                    onClick={() => handleReportClick(itemComment.id)}
                  >
                    <p className="font-azarMehr font-normal text-black dark:text-white text-singleVideo_medium">
                      {checkData(findByUniqueId(mainData, 193))}
                    </p>
                    <motion.div
                      className="xs:size-[24px] outline-none border-none stroke-singleVideo-gray dark:stroke-white cursor-pointer  flex items-center justify-center"
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

            {showReportModal === itemComment.id && (
              <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
                <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg max-w-sm w-full">
                  <h2 className="text-lg md:text-xl font-azarMehr font-bold text-center dark:text-white mb-4">
                    گزارش کامنت
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 dark:text-white">
                    آیا مطمئن هستید که می‌خواهید این کامنت را گزارش کنید؟
                  </p>
                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                  {successMessage && (
                    <p className="text-green-500 text-sm mb-4">{successMessage}</p>
                  )}
                  <div className="flex gap-2 justify-between items-center w-full">
                    <button
                      className="w-1/2 bg-blueLink dark:bg-dark-yellow text-white dark:text-black font-azarMehr py-2 px-4 font-medium text-[15px] rounded-[10px] hover:bg-yellow-600 active:scale-105 duration-300"
                      onClick={() => {
                        handlerReportComments({
                          token,
                          commentId: itemComment.id,
                          videoId: itemComment.video_id,
                          setShowAuthCard: setShowLoginModal,
                          setRefreshComment,
                          setError,
                        });
                        setSuccessMessage("گزارش با موفقیت ارسال شد.");
                        setTimeout(() => setShowReportModal(0), 1000);
                      }}
                    >
                      ارسال گزارش
                    </button>
                    <button
                      className="w-1/2  dark:bg-extraGray text-activeButton dark:text-white font-azarMehr py-2 px-4 font-medium text-[15px] rounded-[10px] hover:bg-gray-400 active:scale-105 duration-300"
                      onClick={() => setShowReportModal(0)}
                    >
                      لغو
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

      {showLoginModal && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
          <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-center dark:text-white mb-4">
              برای لایک، دیسلایک یا گزارش باید وارد شوید
            </h2>
            <div className="flex gap-2 justify-between items-center w-full mt-5">
              <LoginButtonModule params={mainData} />
              <div className="w-1/2 flex justify-center">
                <button
                  className="w-full  dark:bg-extraGray text-activeButton dark:text-white font-azarMehr py-2 px-2 md:px-4 font-medium text-center text-[15px] rounded-[10px] hover:bg-gray-400 active:scale-105 duration-300"
                  onClick={() => setShowLoginModal(false)}
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSelfCommentModal && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
          <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-center dark:text-white mb-4">
              نمی‌توانید روی کامنت خودتان لایک یا دیسلایک کنید
            </h2>
            <div className="flex justify-center w-full mt-5">
              <button
                className="w-1/2  dark:bg-extraGray text-activeButton dark:text-white font-azarMehr py-2 px-2 md:px-4 font-medium text-center text-[15px] rounded-[10px] hover:bg-gray-400 active:scale-105 duration-300"
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