"use client";

import { useEffect, useState } from "react";
import { Like, Dislike } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import { motion } from "framer-motion";
import ProfileComment from "./ProfileComment";
import axios from "axios";

interface ReplyListProps {
  commentId: number;
  videoId: number;
  repliesData: any[];
  mainData: any;
  token: string | null;
  code: string | null;
  setRefreshComment: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSelfCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRepliesData: React.Dispatch<React.SetStateAction<{ [key: number]: any[] }>>;
  params: any; // اضافه کردن params برای زبان
}

const ReplyList = ({
  commentId,
  videoId,
  repliesData,
  mainData,
  token,
  code,
  setRefreshComment,
  setShowLoginModal,
  setShowSelfCommentModal,
  setRepliesData,
  params,
}: ReplyListProps) => {
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [interactionLoading, setInteractionLoading] = useState<{ [key: number]: boolean }>({});
  const [userInteractions, setUserInteractions] = useState<{ [key: number]: boolean | null }>({});

  // تعریف پیام‌های دوزبانه
  const messages = {
    replySuccess: {
      fa: "پاسخ شما با موفقیت ثبت شد!",
      en: "Your reply was successfully submitted!",
    },
    deleteSuccess: {
      fa: "پاسخ با موفقیت حذف شد!",
      en: "Reply was successfully deleted!",
    },
    loadRepliesError: {
      fa: "خطا در بارگذاری پاسخ‌ها",
      en: "Error loading replies",
    },
    replyNotFound: {
      fa: "پاسخ یافت نشد",
      en: "Reply not found",
    },
    likeDislikeError: {
      fa: "خطا در انجام لایک یا دیسلایک",
      en: "Error performing like or dislike",
    },
    deleteError: {
      fa: "خطایی در حذف پاسخ رخ داد",
      en: "Error deleting reply",
    },
  };

  const getMessage = (key: keyof typeof messages) => {
    return params.lang.toLowerCase() === "fa" ? messages[key].fa : messages[key].en;
  };

  const fetchReplies = async () => {
    try {
      const response = await axios.get(
        `https://api.rgb.irpsc.com/api/comments/${commentId}/replies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRepliesData((prev) => ({
        ...prev,
        [commentId]: response.data.data,
      }));
    } catch (error) {
      console.error(`Error fetching replies for comment ${commentId}:`, error);
      setError(getMessage("loadRepliesError"));
    }
  };

  useEffect(() => {
    if (repliesData?.length > 0) {
      const interactions: { [key: number]: boolean | null } = {};
      for (const reply of repliesData) {
        interactions[reply.id] = reply.user_interaction ?? null;
      }
      setUserInteractions(interactions);
    }
  }, [repliesData]);

  useEffect(() => {
    if (showSuccessModal) {
      const duration = 1000;
      const intervalTime = 50;
      const increment = (intervalTime / duration) * 100;

      const interval = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + increment;
          if (nextProgress >= 100) {
            clearInterval(interval);
            setShowSuccessModal(null);
            return 100;
          }
          return nextProgress;
        });
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [showSuccessModal]);

  const handleInteraction = async (
    replyId: number,
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
    if (interactionLoading[replyId]) return;

    setInteractionLoading((prev) => ({ ...prev, [replyId]: true }));

    try {
      const endpoint = `https://api.rgb.irpsc.com/api/comments/${commentId}/replies/${replyId}/interactions?liked=${isLike ? 1 : 0}`;
      await axios.post(endpoint, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setUserInteractions((prev) => ({ ...prev, [replyId]: isLike }));
      setRefreshComment((prev) => !prev);
      await fetchReplies();
    } catch (error: any) {
      console.error(`Error in ${isLike ? "like" : "dislike"}:`, error?.response?.status, error?.response?.data);
      if (error.response?.status === 403 || error.response?.status === 401) {
        setShowLoginModal(true);
      } else if (error.response?.status === 404) {
        setError(getMessage("replyNotFound"));
      } else {
        setError(getMessage("likeDislikeError"));
      }
    } finally {
      setInteractionLoading((prev) => ({ ...prev, [replyId]: false }));
    }
  };

  const handleDeleteReply = async (replyId: number) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      await axios.delete(
        `https://api.rgb.irpsc.com/api/comments/${commentId}/replies/${replyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setShowSuccessModal("delete");
      setProgress(0);
      await fetchReplies();
      setRefreshComment((prev) => !prev);
    } catch (error: any) {
      console.error("Error deleting reply:", error?.response?.status, error?.response?.data);
      if (error.response?.status === 401 || error.response?.status === 403) {
        setShowLoginModal(true);
      } else if (error.response?.status === 404) {
        setError(getMessage("replyNotFound"));
      } else {
        setError(getMessage("deleteError"));
      }
    }
  };

  return (
    <div className="w-full ps-4 md:ps-5 lg:ps-10 my-5">
      {repliesData && repliesData.length > 0 ? (
        <div>
          {repliesData.map((reply: any) => (
            <div className="border-solid border-y-0 border-e-0 ps-4 md:ps-5 lg:ps-12 border-[#F5F5F5] dark:border-[#2A2A28] ">
              <div
                key={reply.id}
                className="bg-[#F5F5F5] dark:bg-[#2A2A28] rounded-[15px] p-5 mb-4 flex flex-col my-5 "
              >
                <ProfileComment
                  itemComment={reply}
                  mainData={mainData}
                  activeMenu={0}
                  setActiveMenu={() => {}}
                  params={params}
                />
                <p className="text-[#1A1A18] dark:text-white text-start font-azarMehr text-[14px] mt-5">
                  {checkData(reply.content)}
                </p>
                <div className="flex flex-row justify-start items-center gap-5 mt-4">
                  <div className="flex flex-row justify-center items-center gap-1 cursor-pointer">
                    <p className="font-azarMehr font-normal text-black dark:text-white text-singleVideo_medium">
                      {checkData(reply?.likes)}
                    </p>
                    <motion.div
                      className={`xs:size-[20px] outline-none border-none stroke-singleVideo-gray dark:stroke-white flex items-center justify-center ${
                        interactionLoading[reply.id] || !token || userInteractions[reply.id] === true
                          ? "opacity-50"
                          : "cursor-pointer"
                      }`}
                      whileTap={{
                        scale: interactionLoading[reply.id] || !token || userInteractions[reply.id] === true ? 1 : 1.2,
                      }}
                      onClick={() => handleInteraction(reply.id, reply.user.code, true)}
                    >
                      <Like
                        className={`size-full  ${
                          userInteractions[reply.id] === true
                            ? "fill-blue-500"
                            : "stroke-[#414040] dark:stroke-white"
                        } cursor-pointer`}
                      />
                    </motion.div>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-1 cursor-pointer">
                    <p className="font-azarMehr font-normal text-singleVideo_medium text-black dark:text-white">
                      {checkData(reply?.dislikes)}
                    </p>
                    <motion.div
                      className={`xs:size-[20px] outline-none border-none stroke-singleVideo-gray dark:stroke-white flex items-center justify-center ${
                        interactionLoading[reply.id] || !token || userInteractions[reply.id] === false
                          ? ""
                          : "cursor-pointer"
                      }`}
                      whileTap={{
                        scale: interactionLoading[reply.id] || !token || userInteractions[reply.id] === false ? 1 : 1.2,
                      }}
                      onClick={() => handleInteraction(reply.id, reply.user.code, false)}
                    >
                      <Dislike
                        className={`size-full ${
                          userInteractions[reply.id] === false
                            ? "fill-red-500"
                            : "stroke-[#414040] dark:stroke-white"
                        } cursor-pointer`}
                      />
                    </motion.div>
                  </div>
                  {reply.user.code === code && (
                    <div
                      className="flex flex-row justify-center items-center gap-1 cursor-pointer"
                      onClick={() => handleDeleteReply(reply.id)}
                    >
                      <p className="font-azarMehr font-normal text-red-500 text-singleVideo_medium">
                        {params.lang.toLowerCase() === "fa" ? "حذف" : "Delete"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 hidden">
          {params.lang.toLowerCase() === "fa" ? "هنوز پاسخی وجود ندارد" : "No replies yet"}
        </p>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {showSuccessModal && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
          <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full transition-all duration-50 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-green-600 dark:text-green-400 my-5">
              {showSuccessModal === "delete" ? getMessage("deleteSuccess") : getMessage("replySuccess")}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyList;