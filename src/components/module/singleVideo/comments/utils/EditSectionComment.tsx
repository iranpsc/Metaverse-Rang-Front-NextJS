import { EditIcon, MessageRepeat, Trash } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import {
  handleClick,
  handlerDeleteComments,
  handlerReportComments,
} from "./helper";
// import { useToken } from "@/components/context/TokenContext";
import RepeatCommentSection from "../RepeatCommentSection";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import getAuthData from "@/components/utils/getAuthData";

const EditSectionComment = ({
  itemComment,
  setRefreshComment,
  setShowAuthCard,
  // translateSingleVideo,
  mainData,
  setEditMode,
  setEditedText,
  setEdited,
  code,
}: any) => {
  // const { code, token } = useToken();
  const token = getAuthData("token");

  return (
    <div className="w-fit h-[50px] absolute bg-[#f5f5f5] dark:bg-dark-background  end-5 top-[75px] rounded-[12px] shadow-xl flex flex-row justify-between items-center px-4 gap-5">
      {itemComment.user.code === code && (
        <>
          <div
            className="flex flex-row justify-center items-center gap-2 "
            onClick={() =>
              handlerDeleteComments(
                token,
                itemComment.id,
                itemComment.video_id,
                setRefreshComment,
                setShowAuthCard
              )
            }
          >
            <p className="font-azarMehr font-normal text-[12px] text-error ">
              {/* {checkData(
                translateSingleVideo.find((item: any) => item.name === "delete")
                  ?.translation
              )} */}
              {findByUniqueId(mainData, 369)}
            </p>
            <Trash className="size-[24px] stroke-error" />
          </div>

          <div
            className="flex flex-row justify-center items-center gap-2"
            onClick={(e: any) =>
              handleClick(
                itemComment.content,
                itemComment.id,
                setEditMode,
                setEditedText
              )
            }
          >
            <p className="font-azarMehr text-white font-normal text-[12px]">
              {/* {checkData(
                translateSingleVideo.find((item: any) => item.name === "edit")
                  ?.translation
              )} */}
              {findByUniqueId(mainData, 460)}
            </p>
            <EditIcon className="stroke-[#414040] dark:stroke-white  size-[24px]" />
          </div>
        </>
      )}
      <div
        className="flex flex-row justify-center items-center gap-1 cursor-pointer "
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
          {findByUniqueId(mainData, 193)}
        </p>
        <MessageRepeat className="stroke-[#414040] dark:stroke-white cursor-pointer" />
      </div>
    </div>
  );
};

export default EditSectionComment;
