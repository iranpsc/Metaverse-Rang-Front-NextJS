import { MenuCommentIcon } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import Image from "next/image";

const ProfileComment = ({
  itemComment,
  translateSingleVideo,
  activeMenu,
  setActiveMenu,
}: any) => {
  return (
    <>
      <div className="flex flex-row justify-start items-center gap-2 h-[50px] ">
        <Image
          src={itemComment.user.image ? itemComment.user.image : "/profile.png"}
          alt={itemComment.user.code}
          width={1000}
          height={1000}
          loading="lazy"
          className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
          // onClick={() => pushRgb(item.creator.code)}
        />
        <div className="flex flex-col justify-center items-center gap-1 h-[40px] ">
          <span
            className="text-singleVideo-gray dark:text-white  text-start cursor-pointer text-[16px] xs:text-[12px] font-medium w-full "
            // onClick={() => pushRgb(item.creator.code)}
          >
            {checkData(itemComment.user.name)}
          </span>
          <span
            className="text-blueLink  cursor-pointer text-[14px] xs:text-[12px] font-medium whitespace-wrap"
            // onClick={() => pushRgb(item.creator.code)}
          >
            {checkData(
              translateSingleVideo.find(
                (item: any) => item.name === "citizen id"
              )?.translation
            )}
            {" : "}
            {checkData(itemComment.user.code)}
          </span>
        </div>
      </div>
      <div className="flex flex-row  justify-center items-center xs:place-items-end xs:pb-1 gap-1  xs:h-full">
        <p className="font-azarMehr font-normal text-singleVideo_medium xs:text-[10px] xs:hidden text-singleVideo-gray dark:text-white">
          {checkData(
            translateSingleVideo.find(
              (item: any) => item.name === "publication date"
            )?.translation
          )}
        </p>
        <p className="font-azarMehr font-normal text-singleVideo_medium xs:text-[10px] text-singleVideo-gray dark:text-white">
          {checkData(itemComment.created_at)}
        </p>
      </div>
      <MenuCommentIcon
        className="size-[24px] cursor-pointer xl:hidden lg:hidden md:hidden sm:block xs:block stroke-[#414040] dark:stroke-white"
        onClick={() =>
          setActiveMenu(activeMenu === itemComment.id ? 0 : itemComment.id)
        }
      />
    </>
  );
};

export default ProfileComment;