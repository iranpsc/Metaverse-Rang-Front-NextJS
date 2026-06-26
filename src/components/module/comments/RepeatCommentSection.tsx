import { Repeat } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { checkData } from "@/components/utils/targetDataName";

const RepeatCommentSection = ({ mainData, type }: any) => {
  return (
    <div
      className={` flex-row justify-center items-center gap-1 cursor-pointer 
    
    ${
      type === "xl"
        ? "xl:flex lg:flex md:flex sm:hidden xs:hidden"
        : " flex  xl:hidden lg:hidden md:hidden"
    }
    `}
    >
      <span className="text-blueLink dark:text-dark-yellow font-azarMehr text-singleVideo_medium font-normal">
        {/* {checkData(
          translateSingleVideo.find((item: any) => item.name === "response")
            ?.translation
        )} */}
        {findByUniqueId(mainData, 458)}
      </span>
      <Repeat className="size-[24px] stroke-blueLink dark:stroke-dark-yellow" />
    </div>
  );
};

export default RepeatCommentSection;
