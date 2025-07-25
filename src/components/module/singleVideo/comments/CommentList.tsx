"use client";

import { useEffect, useState } from "react";
import { Like, Dislike, Repeat } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import { handleChange, handleSubmit, handlerReportComments } from "./utils/helper";
import ProfileComment from "./ProfileComment";
import EditSectionComment from "./utils/EditSectionComment";
import ControlCommentSection from "./ControlCommentSection";
import { motion } from "framer-motion";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import GetAuthData from "@/components/utils/getAuthData";
import axios from "axios";
import LoginButtonModule from "../LoginButtonModule";
import ReplyList from "./ReplyList";

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
  const [activeMenu, setActiveMenu] = useState<number>(0);
  const [editMode, setEditMode] = useState<number>(0);
  const [editedText, setEditedText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [code, setCode] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSelfCommentModal, setShowSelfCommentModal] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<number>(0);
  const [interactionLoading, setInteractionLoading] = useState<{ [key: number]: boolean }>({});
  const [userInteractions, setUserInteractions] = useState<{ [key: number]: boolean | null }>({});
  const [repliesData, setRepliesData] = useState<{ [key: number]: any[] }>({});
  const [showReplyForm, setShowReplyForm] = useState<{ [key: number]: boolean }>({});
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});

  const token = GetAuthData("token");

  // تعریف پیام‌های دوزبانه
  const messages = {
    replySuccess: {
      fa: "پاسخ شما با موفقیت ثبت شد!",
      en: "Your reply was successfully submitted!",
    },
    emptyReplyError: {
      fa: "متن پاسخ نمی‌تواند خالی باشد",
      en: "Reply text cannot be empty",
    },
    replyTooLongError: {
      fa: "متن پاسخ نمی‌تواند بیشتر از 2000 کاراکتر باشد",
      en: "Reply text cannot exceed 2000 characters",
    },
    invalidReplyError: {
      fa: "متن پاسخ نامعتبر است",
      en: "Invalid reply text",
    },
    selfReplyError: {
      fa: "نمی‌توانید به کامنت خود پاسخ دهید",
      en: "You cannot reply to your own comment",
    },
    commentNotFoundError: {
      fa: "کامنت موردنظر یافت نشد",
      en: "Comment not found",
    },
    replyError: {
      fa: "خطایی در ارسال پاسخ رخ داد",
      en: "Error submitting reply",
    },
    loadRepliesError: {
      fa: "خطا در بارگذاری پاسخ‌ها",
      en: "Error loading replies",
    },
    likeDislikeError: {
      fa: "خطا در انجام لایک یا دیسلایک",
      en: "Error performing like or dislike",
    },
    loginRequired: {
      fa: "برای ثبت پاسخ، لایک یا دیسلایک باید وارد شوید",
      en: "You must log in to submit a reply, like, or dislike",
    },
    selfInteractionError: {
      fa: "نمی‌توانید روی کامنت خودتان لایک یا دیسلایک کنید",
      en: "You cannot like or dislike your own comment",
    },
    reportSuccess: {
      fa: "گزارش با موفقیت ارسال شد",
      en: "Report submitted successfully",
    },
  };

  const getMessage = (key: keyof typeof messages) => {
    return params.lang.toLowerCase() === "fa" ? messages[key].fa : messages[key].en;
  };

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
        console.error("Error fetching user data:", err?.response?.status, err?.response?.data);
        if (err.response?.status === 403 || err.response?.status === 401) {
          setShowLoginModal(true);
        }
      }
    };
    fetchUserData();
  }, [token]);

  useEffect(() => {
    const fetchCommentInteractions = async () => {
      if (!token || !DataItem.data) return;
      try {
        const interactions: { [key: number]: boolean | null } = {};
        for (const comment of DataItem.data) {
          interactions[comment.id] = comment.user_interaction ?? null;
        }
        setUserInteractions(interactions);
      } catch (error) {
        console.error("Error loading user interactions:", error);
      }
    };
    fetchCommentInteractions();
  }, [DataItem.data, token]);

  const fetchReplies = async (commentId: number) => {
    try {
      const response = await axios.get(
        `https://api.rgb.irpsc.com/api/comments/${commentId}/replies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRepliesData((prev: { [key: number]: any[] }) => ({
        ...prev,
        [commentId]: response.data.data,
      }));
    } catch (error) {
      console.error(`Error fetching replies for comment ${commentId}:`, error);
      setError(getMessage("loadRepliesError"));
    }
  };

  useEffect(() => {
    if (!DataItem.data) return;
    DataItem.data.forEach((comment: any) => {
      if (comment.replies_count > 0) {
        fetchReplies(comment.id);
      }
    });
  }, [DataItem.data]);

  useEffect(() => {
    if (showSuccessModal) {
      const duration = 1000;
      const intervalTime = 50;
      const increment = (intervalTime / duration) * 100;

      const interval = setInterval(() => {
        setProgress((prev: number) => {
          const nextProgress = prev + increment;
          if (nextProgress >= 100) {
            clearInterval(interval);
            setShowSuccessModal(null);
            setShowReportModal(0); // ریست کردن مودال گزارش
            return 100;
          }
          return nextProgress;
        });
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [showSuccessModal]);

  const handleInteraction = async (
    commentId: number,
    videoId: number,
    userCode: string | null,
    isLike: boolean
  ) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    if (userCode === code) {
      setShowSelfCommentModal(true);
      return;
    }
    if (interactionLoading[commentId]) return;

    setInteractionLoading((prev: { [key: number]: boolean }) => ({ ...prev, [commentId]: true }));

    try {
      await axios.post(
        `https://api.rgb.irpsc.com/api/tutorials/${videoId}/comments/${commentId}/interactions?liked=${isLike ? 1 : 0}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setUserInteractions((prev: { [key: number]: boolean | null }) => ({ ...prev, [commentId]: isLike }));
      setRefreshComment((prev: boolean) => !prev);
    } catch (error: any) {
      console.error(`Error in ${isLike ? "like" : "dislike"}:`, error?.response?.status, error?.response?.data);
      if (error.response?.status === 403 || error.response?.status === 401) {
        setShowLoginModal(true);
      } else {
        setError(getMessage("likeDislikeError"));
      }
    } finally {
      setInteractionLoading((prev: { [key: number]: boolean }) => ({ ...prev, [commentId]: false }));
    }
  };

  const handleReplySubmit = async (e: React.FormEvent, commentId: number) => {
    e.preventDefault();
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    if (!replyText[commentId]?.trim()) {
      setError(getMessage("emptyReplyError"));
      return;
    }
    if (replyText[commentId]?.length > 2000) {
      setError(getMessage("replyTooLongError"));
      return;
    }

    try {
      await axios.post(
        `https://api.rgb.irpsc.com/api/comments/${commentId}/reply`,
        { content: replyText[commentId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setReplyText((prev: { [key: number]: string }) => ({ ...prev, [commentId]: "" }));
      setShowReplyForm((prev: { [key: number]: boolean }) => ({ ...prev, [commentId]: false }));
      setShowSuccessModal("reply");
      setProgress(0);
      setRefreshComment((prev: boolean) => !prev);
      await fetchReplies(commentId);
    } catch (error: any) {
      console.error("Error submitting reply:", error?.response?.status, error?.response?.data);
      if (error.response?.status === 401 || error.response?.status === 403) {
        setShowLoginModal(true);
      } else if (error.response?.status === 422) {
        setError(getMessage("invalidReplyError"));
      } else if (error.response?.status === 403) {
        setError(getMessage("selfReplyError"));
      } else if (error.response?.status === 404) {
        setError(getMessage("commentNotFoundError"));
      } else {
        setError(getMessage("replyError"));
      }
    }
  };

  const handleReportClick = (commentId: number) => {
    setShowReportModal(commentId);
    setError(null);
    setShowSuccessModal(null);
  };

  return (
    <>
      {DataItem.data &&
        DataItem.data.map((itemComment: any) => (
          <div className="flex flex-col  w-full ">
            <div
              key={itemComment.id}
              className={`relative min-h-fit bg-[#ECECEC] dark:bg-[#333333] rounded-[20px]  md:p-5 sm:p-5 xs:p-4  flex flex-col justify-between items-center shadow-sm
              ${itemComment.user.code == code
                  ? "xl:ms-[50px] lg:ms-[50px] xs:ms-0 w-[95%] xs:w-full"
                  : "ms-0 w-full"
                }`}
            >
              <div className="w-full flex flex-row justify-between items-center">
                <ProfileComment
                  itemComment={itemComment}
                  mainData={mainData}
                  activeMenuId={activeMenu}
                  setActiveMenuId={setActiveMenu}
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
                        className="w-full p-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 rounded-[10px] bg-gray-100 dark:bg-[#222222] dark:text-dark-gray"
                        placeholder={params.lang.toLowerCase() === "fa" ? "متن کامنت را وارد کنید" : "Enter comment text"}
                      />
                      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 dark:bg-yellow-400 px-4 py-2 lg:py-[10px] rounded-xl text-white dark:text-black  "
                    >
                      {checkData(findByUniqueId(mainData, 460))}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(0)}
                      className="bg-gray-200 dark:bg-[#222222] px-4 py-2 lg:py-[10px] rounded-xl dark:text-white"
                    >
                      {params.lang.toLowerCase() === "fa" ? "لغو" : "Cancel"}
                    </button>
                  </form>
                ) : (
                  <p className="text-[#1B1B1B] dark:text-white text-start cursor-pointer font-azarMehr text-[18px] xs:text-[14px] font-normal">
                    {checkData(itemComment.content)}
                  </p>
                )}
              </div>

              <div className="w-full flex flex-row justify-between items-center mt-10 xs:mt-7">
                <div className="xl:w-fit lg:w-fit md:w-fit sm:w-full xs:w-full flex flex-row justify-start items-center gap-4">
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
                    <p className="font-azarMehr font-medium text-[16px] text-black dark:text-white">
                      {checkData(itemComment?.likes)}
                    </p>
                    <motion.div
                      className={`xs:size-[20px] outline-none border-none stroke-darkGray dark:stroke-white flex items-center justify-center ${interactionLoading[itemComment.id] || !token || userInteractions[itemComment.id] === true
                        ? ""
                        : "cursor-pointer"
                        }`}
                      whileTap={{
                        scale: interactionLoading[itemComment.id] || !token || userInteractions[itemComment.id] === true ? 1 : 1.2,
                      }}
                      onClick={() =>
                        handleInteraction(itemComment.id, itemComment.video_id, itemComment.user.code, true)
                      }
                    >
                      <Like
                        className={`size-full `}
                      />
                    </motion.div>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-1 cursor-pointer">
                    <p className="font-azarMehr font-medium text-[16px] text-black dark:text-white">
                      {checkData(itemComment?.dislikes)}
                    </p>
                    <motion.div
                      className={`xs:size-[20px] outline-none border-none stroke-darkGray dark:stroke-white flex items-center justify-center ${interactionLoading[itemComment.id] || !token || userInteractions[itemComment.id] === false
                        ? ""
                        : "cursor-pointer"
                        }`}
                      whileTap={{
                        scale: interactionLoading[itemComment.id] || !token || userInteractions[itemComment.id] === false ? 1 : 1.2,
                      }}
                      onClick={() =>
                        handleInteraction(itemComment.id, itemComment.video_id, itemComment.user.code, false)
                      }
                    >
                      <Dislike
                        className={`size-full `}
                      />
                    </motion.div>
                  </div>
                  {itemComment.user.code !== code && (
                    <div
                      className="flex flex-row justify-center items-center gap-1 cursor-pointer"
                      onClick={() => handleReportClick(itemComment.id)}
                    >
                      <p className="font-azarMehr font-medium text-blue-500 dark:text-yellow-400 text-[16px]">
                        {checkData(findByUniqueId(mainData, 193))}
                      </p>
                    </div>
                  )}

                </div>
                {itemComment.user.code !== code && (
                  <div
                    className="flex flex-row justify-center items-center gap-1 cursor-pointer flex-nowrap "
                    onClick={() => setShowReplyForm((prev: { [key: number]: boolean }) => ({ ...prev, [itemComment.id]: !prev[itemComment.id] }))}
                  >
                    <p className="font-azarMehr font-medium text-blue-500 dark:text-yellow-400 text-sm md:text-[16px] text-nowrap">
                      {checkData(findByUniqueId(mainData, 458))} ({repliesData[itemComment.id]?.length || 0})
                    </p>
                    <motion.div
                      className="xs:size-[20px] outline-none border-none stroke-blue-500 dark:stroke-yellow-400 flex items-center justify-center"
                      whileTap={{ scale: 1.2 }}
                    >
                      <Repeat className="size-[24px] stroke-blue-500 dark:stroke-yellow-400" />
                    </motion.div>
                  </div>
                )}
              </div>

              {showReplyForm[itemComment.id] && (
                <motion.form
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={(e) => handleReplySubmit(e, itemComment.id)}
                  className="w-full mt-4 flex items-center gap-4"
                >
                  <div className="flex w-full items-center">
                    <input
                      type="text"
                      value={replyText[itemComment.id] || ""}
                      onChange={(e) =>
                        setReplyText((prev: { [key: number]: string }) => ({ ...prev, [itemComment.id]: e.target.value }))
                      }
                      className="w-full p-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 rounded-[10px] bg-gray-100 dark:bg-[#222222] dark:text-dark-gray"
                      placeholder={params.lang.toLowerCase() === "fa" ? "پاسخ خود را وارد کنید" : "Enter your reply"}
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 dark:bg-yellow-400 px-4 py-2 lg:py-[10px] rounded-xl text-white dark:text-black"
                  >
                    {params.lang.toLowerCase() === "fa" ? "ارسال" : "Submit"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowReplyForm((prev: { [key: number]: boolean }) => ({ ...prev, [itemComment.id]: false }));
                      setReplyText((prev: { [key: number]: string }) => ({ ...prev, [itemComment.id]: "" }));
                      setError(null);
                    }}
                    className="bg-white dark:bg-[#222222] px-4 py-2  lg:py-[10px] rounded-xl dark:text-white"
                  >
                    {params.lang.toLowerCase() === "fa" ? "لغو" : "Cancel"}
                  </button>
                </motion.form>
              )}



              {showReportModal === itemComment.id && (
                <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
                  <div className="bg-white dark:bg-[#333333] p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-lg md:text-xl font-azarMehr font-bold text-center dark:text-white mb-4">
                      {params.lang.toLowerCase() === "fa" ? "گزارش کامنت" : "Report Comment"}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 dark:text-white">
                      {params.lang.toLowerCase() === "fa"
                        ? "آیا مطمئن هستید که می‌خواهید این کامنت را گزارش کنید؟"
                        : "Are you sure you want to report this comment?"}
                    </p>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {showSuccessModal === "report" && (
                      <>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div
                            className="bg-green-600 h-2.5 rounded-full transition-all duration-50 ease-linear"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <h2 className="text-lg md:text-xl font-azarMehr font-bold text-green-600 dark:text-green-400 my-5">
                          {getMessage("reportSuccess")}
                        </h2>
                      </>
                    )}
                    {!showSuccessModal && (
                      <div className="flex gap-2 justify-between items-center w-full">
                        <button
                          className="w-1/2 bg-blue-500 dark:bg-yellow-400 text-white dark:text-black font-azarMehr py-2 px-4 font-medium text-[15px] rounded-[10px] hover:bg-yellow-600 active:scale-105 duration-300"
                          onClick={async () => {
                            try {
                              await handlerReportComments({
                                token,
                                commentId: itemComment.id,
                                videoId: itemComment.video_id,
                                setShowAuthCard: setShowLoginModal,
                                setRefreshComment,
                                setError,
                              });
                              setShowSuccessModal("report");
                              setProgress(0);
                            } catch (error: any) {
                              console.error("Error reporting comment:", error?.response?.status, error?.response?.data);
                              setError(getMessage("replyError"));
                            }
                          }}
                        >
                          {params.lang.toLowerCase() === "fa" ? "ارسال گزارش" : "Submit Report"}
                        </button>
                        <button
                          className="w-1/2 bg-gray-200 dark:bg-[#222222] text-black dark:text-white font-azarMehr py-2 px-4 font-medium text-[15px] rounded-[10px] hover:bg-gray-400 active:scale-105 duration-300"
                          onClick={() => setShowReportModal(0)}
                        >
                          {params.lang.toLowerCase() === "fa" ? "لغو" : "Cancel"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <ReplyList
              commentId={itemComment.id}
              videoId={itemComment.video_id}
              repliesData={repliesData[itemComment.id] || []}
              mainData={mainData}
              token={token}
              code={code}
              setRefreshComment={setRefreshComment}
              setShowLoginModal={setShowLoginModal}
              setShowSelfCommentModal={setShowSelfCommentModal}
              setRepliesData={setRepliesData}
              params={params}

            />
          </div>
        ))}

      {showLoginModal && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
          <div className="bg-white dark:bg-[#333333] p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-center dark:text-white mb-4">
              {getMessage("loginRequired")}
            </h2>
            <div className="flex gap-2 justify-between items-center w-full mt-5">
              <LoginButtonModule params={mainData} />
              <div className="w-1/2 flex justify-center">
                <button
                  className="w-full bg-gray-200 dark:bg-[#222222] text-black dark:text-white font-azarMehr py-2 px-2 md:px-4 font-medium text-center text-[15px] rounded-[10px] hover:bg-gray-400 active:scale-105 duration-300"
                  onClick={() => setShowLoginModal(false)}
                >
                  {params.lang.toLowerCase() === "fa" ? "بستن" : "Close"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSelfCommentModal && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
          <div className="bg-white dark:bg-[#333333] p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-center dark:text-white mb-4">
              {getMessage("selfInteractionError")}
            </h2>
            <div className="flex justify-center w-full mt-5">
              <button
                className="w-1/2 bg-gray-200 dark:bg-[#222222] text-black dark:text-white font-azarMehr py-2 px-2 md:px-4 font-medium text-center text-[15px] rounded-[10px] hover:bg-gray-400 active:scale-105 duration-300"
                onClick={() => setShowSelfCommentModal(false)}
              >
                {params.lang.toLowerCase() === "fa" ? "بستن" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && showSuccessModal !== "report" && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
          <div className="bg-white dark:bg-[#333333] p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full transition-all duration-50 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-green-600 dark:text-green-400 my-5">
              {getMessage("replySuccess")}
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentList;
