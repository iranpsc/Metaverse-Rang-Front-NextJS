import { Like, Dislike, View, Videos } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";

export const DashboardHeaderModule = ({
  categoryData,
  shows,
  setShows,
}: any) => {
  return (
    <>
      <div className="absolute top-[350px] start-[25%] xs:start-[13%] w-[50%] xs:w-[75%] min-h-[100px] pt-5 transition-all duration-300 easy-in-out rounded-2xl flex flex-col justify-canter gap-10 items-center bg-white dark:bg-dark-background	shadow-xl">
        <div className="w-full flex flex-row justify-evenly gap-1 items-center">
          <div className="flex flex-row items-center justify-center gap-3">
            <Videos className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] fill-gray dark:fill-dark-gray" />
            <span className=" whitespace-nowrap font-azarMehr font-normal text-[22px] xs:text-[16px] text-gray dark:text-dark-gray">
              {formatNumber(categoryData ? categoryData.videos_count : 0)}
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            <View className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] stroke-gray dark:stroke-dark-gray" />
            <span className=" whitespace-nowrap font-azarMehr font-normal text-[22px] xs:text-[16px] text-gray dark:text-dark-gray">
              {formatNumber(categoryData ? categoryData.views_count : 0)}
            </span>
          </div>

          <div className="flex flex-row items-center justify-center gap-3">
            <Like className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] stroke-gray dark:stroke-dark-gray" />
            <span className=" whitespace-nowrap font-azarMehr font-medium text-[22px] xs:text-[16px] text-gray dark:text-dark-gray">
              {formatNumber(categoryData ? categoryData.likes_count : 0)}
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            <Dislike className="w-[20px] h-[20px] xs:w-[17px] xs:h-[17px] stroke-gray dark:stroke-dark-gray" />
            <span className=" whitespace-nowrap font-azarMehr font-normal text-[22px] xs:text-[16px] text-gray dark:text-dark-gray">
              {formatNumber(categoryData ? categoryData.dislikes_count : 0)}
            </span>
          </div>
        </div>

        <div
          className={`absolute w-fit px-5 h-[50px] bg-blueLink dark:bg-dark-yellow  rounded-2xl  ${
            shows ? "top-[370px]" : "top-[75px]"
          } transition-all duration-300 easy-in-out flex justify-center items-center cursor-pointer`}
          onClick={() => setShows(!shows)}
        >
          <p className="font-azarMehr text-[16px] text-white dark:text-black font-medium">
            توضیحات
          </p>
        </div>

        <div
          className={`w-full ${
            shows ? "h-[300px]" : "h-0"
          } flex flex-col justify-start px-3 items-center transition-all duration-300 easy-in-out`}
        >
          <p
            className={`w-full  font-azarMehr font-normal text-[16px] text-justify transition-all duration-75 easy-in-out ${
              shows ? "visible" : "invisible"
            }`}
          >
            {categoryData.description}
          </p>
        </div>
      </div>
    </>
  );
};
