"use client";
import { useState } from "react";
// import { AuthContext } from "@/components/context/AuthContext";
// import { useToken } from "@/components/context/TokenContext";
import { MessageRepeat, Like, Dislike } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";

import {
  handleChange,
  handleSubmit,
  handlerDisLikeComments,
  handlerLikeComments,
  handlerReportComments,
} from "./utils/helper";
import ProfileComment from "./ProfileComment";
import EditSectionComment from "./utils/EditSectionComment";
import ControlCommentSection from "./ControlCommentSection";
import RepeatCommentSection from "./RepeatCommentSection";
import { motion } from "framer-motion";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import GetAuthData from "@/components/utils/getAuthData";

const CommentList = ({
  DataItem,
  // translateSingleVideo,
  mainData,
  setRefreshComment,
}: any) => {
  const [activeMenu, setActiveMenu] = useState(0);
  // const { code, token } = useToken();
  // const { setShowAuthCard } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(0);
  const [editedText, setEditedText] = useState("");
  const [edited, setEdited] = useState(false);

  const token = GetAuthData("token");

  return (
    <>
      {DataItem.data &&
        DataItem.data.map((itemComment: any) => (
          <div
            key={itemComment.id}
            className={`relative min-h-fit bg-singleVideo-backgroundInput dark:bg-dark-background rounded-[20px] xl:p-7 lg:p-7 md:p-5 sm:p-4 xs:p-3 mb-10 flex flex-col justify-between items-center
          ${
            itemComment.user.code == "2000001"
              ? "xl:ms-[50px] lg:ms-[50px] xs:ms-0 w-[95%] xs:w-full"
              : "ms-0 w-full"
          }`}
          >
            <div className="w-full flex flex-row justify-between items-center ">
              <ProfileComment
                itemComment={itemComment}
                // translateSingleVideo={translateSingleVideo}
                mainData={mainData}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />

              {activeMenu === itemComment.id && (
                <EditSectionComment
                  itemComment={itemComment}
                  setRefreshComment={setRefreshComment}
                  setShowAuthCard={setShowAuthCard}
                  // translateSingleVideo={translateSingleVideo}
                  mainData={mainData}
                  setEditMode={setEditMode}
                  setEditedText={setEditedText}
                  setEdited={setEdited}
                />
              )}
            </div>
            {/* Edit Module */}
            <div className="w-full mt-5">
              {!edited &&
              editMode === itemComment.id &&
              code === itemComment.user.code ? (
                <form
                  onSubmit={(e: any) =>
                    handleSubmit(
                      e,
                      itemComment.video_id,
                      itemComment.id,
                      token,
                      editedText,
                      setEditMode,
                      setShowAuthCard,
                      setRefreshComment
                    )
                  }
                >
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
                    {/* {checkData(
                      translateSingleVideo.find(
                        (item: any) => item.name === "edit"
                      )?.translation
                    )} */}
                    {checkData(findByUniqueId(mainData, 460))}
                  </button>
                </form>
              ) : (
                <p className="text-[#1A1A18] dark:text-white  text-start cursor-pointer font-azarMehr text-[16px] xs:text-[12px] font-normal ">
                  {checkData(itemComment.content)}
                </p>
              )}
            </div>

            <div className="w-full flex flex-row justify-between items-center mt-10 xs:mt-7 ">
              <div className="xl:w-fit lg:w-fit md:w-fit sm:w-full xs:w-full flex flex-row justify-start xs:justify-between items-center gap-5">
                {itemComment.user.code === code && (
                  <ControlCommentSection
                    itemComment={itemComment}
                    setRefreshComment={setRefreshComment}
                    setShowAuthCard={setShowAuthCard}
                    // translateSingleVideo={translateSingleVideo}
                    mainData={mainData}
                    setEditMode={setEditMode}
                    setEditedText={setEditedText}
                  />
                )}

                <div className="flex flex-row justify-center items-center gap-1 cursor-pointer">
                  <p className="font-azarMehr font-normal text-singleVideo_medium">
                    {checkData(itemComment?.likes)}
                  </p>
                  <motion.div
                    className=" xs:size-[24px] outline-none border-none stroke-singleVideo-gray dark:stroke-white cursor-pointer"
                    whileTap={{ scale: 1.2 }}
                    onClick={() =>
                      handlerLikeComments(
                        token,
                        itemComment.id,
                        itemComment.video_id,
                        setRefreshComment,
                        setShowAuthCard
                      )
                    }
                  >
                    <Like className="stroke-[#414040] dark:stroke-white cursor-pointer" />
                  </motion.div>
                </div>

                <div className="flex flex-row justify-center items-center gap-1 cursor-pointer">
                  <p className="font-azarMehr font-normal text-singleVideo_medium">
                    {checkData(itemComment?.dislikes)}
                  </p>
                  <motion.div
                    className=" xs:size-[24px] outline-none border-none stroke-singleVideo-gray dark:stroke-white cursor-pointer"
                    whileTap={{ scale: 1.2 }}
                    onClick={() =>
                      handlerDisLikeComments(
                        token,
                        itemComment.id,
                        itemComment.video_id,
                        setRefreshComment,
                        setShowAuthCard
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
                        setShowAuthCard
                      )
                    }
                  >
                    <p className="font-azarMehr font-normal text-singleVideo_medium">
                      {/* {checkData(
                        translateSingleVideo.find(
                          (item: any) => item.name === "submit report"
                        )?.translation
                      )} */}
                      {checkData(findByUniqueId(mainData, 193))}
                    </p>
                    <motion.div
                      className=" xs:size-[24px] outline-none border-none stroke-singleVideo-gray dark:stroke-white cursor-pointer"
                      whileTap={{ scale: 1.2 }}
                    >
                      <MessageRepeat className="stroke-[#414040] dark:stroke-white cursor-pointer" />
                    </motion.div>
                  </div>
                )}

                <RepeatCommentSection
                  // translateSingleVideo={translateSingleVideo}
                  mainData={mainData}
                  type={"mob"}
                />
              </div>

              <RepeatCommentSection
                // translateSingleVideo={translateSingleVideo}
                mainData={mainData}
                type={"xl"}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default CommentList;
