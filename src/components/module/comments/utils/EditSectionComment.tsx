import { EditIcon, MessageRepeat, Trash } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import {
  handleClick,
  handlerDeleteComments,
  handlerReportComments,
} from "./helper";
import RepeatCommentSection from "../RepeatCommentSection";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import getAuthData from "@/components/utils/getAuthData";

interface EditSectionCommentProps {
  itemComment: {
    id: number;
    video_id: number;
    content: string;
    user: { code: string };
  };
  setRefreshComment: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAuthCard: (value: boolean) => void;
  mainData: any; // در صورت امکان، تایپ دقیق‌تر تعریف کنید
  setEditMode: (id: number) => void;
  setEditedText: (text: string) => void;
  setEdited: (value: boolean) => void;
  code: string | null;
  setError: (error: string | null) => void;
}

const EditSectionComment = ({
  itemComment,
  setRefreshComment,
  setShowAuthCard,
  mainData,
  setEditMode,
  setEditedText,
  setEdited,
  code,
  setError,
}: EditSectionCommentProps) => {
  const token = getAuthData("token");

  return (
    <div className="w-fit h-[50px] absolute bg-[#f5f5f5] dark:bg-dark-background end-5 top-[75px] rounded-[12px] shadow-xl flex flex-row justify-between items-center px-4 gap-5">
      {itemComment.user.code === code && (
        <>
          <div
            className="flex flex-row justify-center items-center gap-2 cursor-pointer"
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
            <p className="font-azarMehr font-normal text-[12px] text-error">
              {checkData(findByUniqueId(mainData, 369))}
            </p>
            <Trash className="size-[24px] stroke-error" />
          </div>

          <div
            className="flex flex-row justify-center items-center gap-2 cursor-pointer"
            onClick={() =>
              handleClick(
                itemComment.content,
                itemComment.id,
                setEditMode,
                setEditedText
              )
            }
          >
            <p className="font-azarMehr font-normal text-[12px] md:text-base text-white">
              {checkData(findByUniqueId(mainData, 460))}
            </p>
            <EditIcon className="stroke-[#414040] dark:stroke-white size-[24px]" />
          </div>
        </>
      )}
      <div
        className="flex flex-row justify-center items-center gap-1 cursor-pointer"
        onClick={() =>
          handlerReportComments({
            token,
            commentId: itemComment.id,
            videoId: itemComment.video_id,
            setShowAuthCard,
            setRefreshComment,
            setError,
          })
        }
      >
        <p className="font-azarMehr font-normal text-singleVideo_medium text-black dark:text-white">
          {checkData(findByUniqueId(mainData, 193))}
        </p>
        <MessageRepeat className="stroke-[#414040] dark:stroke-white cursor-pointer" />
      </div>
    </div>
  );
};

export default EditSectionComment;