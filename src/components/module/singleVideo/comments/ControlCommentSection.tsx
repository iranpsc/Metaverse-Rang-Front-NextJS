import { EditIcon, Trash } from "@/components/svgs/SvgEducation";
import { handleClick, handlerDeleteComments } from "./utils/helper";
import getAuthData from "@/components/utils/getAuthData";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
// import { useToken } from "@/components/context/TokenContext";

const ControlCommentSection = ({
  itemComment,
  setRefreshComment,
  setShowAuthCard,
  // translateSingleVideo,
  mainData,
  setEditMode,
  setEditedText,
}: any) => {
  // const { code, token } = useToken();
  const token = getAuthData("token");

  return (
    <>
      <button className="flex flex-row justify-center items-center cursor-pointer gap-1 xl:flex lg:flex md:flex xs:hidden sm:hidden active:scale-105 duration-300 bg-transparent"
        onClick={() =>
          handlerDeleteComments(
            token,
            itemComment.id,
            itemComment.video_id,
            setRefreshComment,
            setShowAuthCard
          )
        }>
        <p className="font-azarMehr font-normal text-singleVideo_medium text-error ">
          {/* {checkData(
            translateSingleVideo.find((item: any) => item.name === "delete")
              ?.translation
          )} */}
          {findByUniqueId(mainData, 369)}
        </p>
        <Trash
          className="size-[24px] stroke-error"
        />
      </button>
      <div
        className="xl:flex lg:flex flex-row justify-center items-center cursor-pointer gap-1 md:hidden sm:hidden xs:hidden"
        onClick={(e: any) =>
          handleClick(
            itemComment.content,
            itemComment.id,
            setEditMode,
            setEditedText
          )
        }
      >
        <p className="font-azarMehr text-black dark:text-white font-normal text-[12px]">
          {/* {checkData(
            translateSingleVideo.find((item: any) => item.name === "edit")
              ?.translation
          )} */}
          {findByUniqueId(mainData, 460)}
        </p>
        <EditIcon className="stroke-[#414040] dark:stroke-white size-[24px]" />
      </div>
    </>
  );
};

export default ControlCommentSection;
