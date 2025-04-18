import { Like, Dislike, View, Videos } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export const DashboardHeaderModule = ({
  categoryData,
  shows,
  mainData,
  setShows,
  contentRef,
}: any) => {
  return (
    <>
      <div className=" relative z-10 mt-[-50px] ms-[25%] xs:ms-[8%] w-[50%] xs:w-[85%] min-h-[100px] pt-5  rounded-2xl flex flex-col justify-canter gap-10 items-center bg-white dark:bg-dark-background shadow-xl">
        <div className="w-full flex flex-row justify-evenly gap-1 items-center">
          {categoryData.videos_count && (
            <div className="flex flex-row items-center justify-center gap-3">
              <Videos className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] fill-gray dark:fill-dark-gray" />
              <span className=" whitespace-nowrap font-azarMehr font-normal text-[22px] xs:text-[16px] text-gray dark:text-dark-gray">
                {formatNumber(categoryData.videos_count)}
              </span>
            </div>
          )}

          {categoryData.videos_count && (
            <div className="flex flex-row items-center justify-center gap-3">
              <View className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] stroke-gray dark:stroke-dark-gray" />
              <span className=" whitespace-nowrap font-azarMehr font-normal text-[22px] xs:text-[16px] text-gray dark:text-dark-gray">
                {formatNumber(categoryData.views_count)}
              </span>
            </div>
          )}

          {categoryData.videos_count && (
            <div className="flex flex-row items-center justify-center gap-3">
              <Like className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] stroke-gray dark:stroke-dark-gray" />
              <span className=" whitespace-nowrap font-azarMehr font-medium text-[22px] xs:text-[16px] text-gray dark:text-dark-gray">
                {formatNumber(categoryData.likes_count)}
              </span>
            </div>
          )}

          {categoryData.videos_count && (
            <div className="flex flex-row items-center justify-center gap-3">
              <Dislike className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] stroke-gray dark:stroke-dark-gray" />
              <span className=" whitespace-nowrap font-azarMehr font-normal text-[22px] xs:text-[16px] text-gray dark:text-dark-gray">
                {formatNumber(categoryData.dislikes_count)}
              </span>
            </div>
          )}
        </div>
        <div
          className={`absolute w-fit px-5 h-[50px] w-[100px] bg-blueLink dark:bg-dark-yellow  rounded-2xl bottom-[-25px] flex justify-center items-center cursor-pointer`}
          onClick={() => setShows(!shows)}
        >
          <p className="font-azarMehr text-[16px] text-white dark:text-black font-medium">
            {findByUniqueId(mainData, 164)}
            {/* tozihat */}
          </p>
        </div>
        <div
          ref={contentRef}
          className={`w-full h-fit flex flex-col justify-start px-3 items-center dark:text-white text-black ${
            shows ? "pb-14" : "pb-0"
          }`}
        >
          {shows && (
            <p
              className={`w-full font-azarMehr font-normal text-[16px] text-justify `}
              dangerouslySetInnerHTML={{ __html: categoryData.description }}
            />
          )}
        </div>
      </div>
    </>
  );
};
