import Image from "next/image";
import { targetData } from "@/components/utils/targetDataName";
import { Development, Income, Orders, Update } from "@/components/svgs";

export const Features = ({ levelsTranslatePage }: any) => {
  return (
    <div className="pt-8 flex flex-col flex-wrap lg:flex-nowrap sm:flex-row justify-between dark:text-white">
      <div className="flex flex-col items-center py-3 px-2 w-full sm:w-1/2  lg:w-1/4 2xl:w-[340px] 3xl:w-[380px]">
        <div className="mb-[-65px] xl:mb-[-90px] 2xl:mb-[-100px]  w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] xl:w-[150px] xl:h-[150px] 2xl:w-[170px] 2xl:h-[170px] 3xl:w-[180px] 3xl:h-[180px]  box-content  p-4 text-center dark:bg-darkGray_1 bg-bgLightGrey rounded-full z-[1]">
          <Income className="w-full h-full" />
        </div>
        <div className="w-full rounded-[20px] cursor-cell p-3 pb-[15%] pt-[95px] xl:pt-[120px] 2xl:pt-[130px] 3xl:pt-[150px] h-[195px] lg:h-[210px] xl:h-[260px] 2xl:h-[280px] 2xl  flex flex-col  justify-center items-center dark:bg-[#080807] bg-white base-shadow-1 hover:border hover:border-blueLink hover:dark:border-dark-yellow">
          <span className="text-xl xl:text-2xl font-bold py-2">
            {targetData(levelsTranslatePage, "income")}
          </span>
          <p className="text-center text-base 2xl:text-xl font-[400]">
            {targetData(
              levelsTranslatePage,
              "a list of earned income by titles and clients"
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center py-3 px-2 w-full sm:w-1/2 lg:w-1/4 xl:w-[300px] 2xl:w-[340px] 3xl:w-[380px]">
        <div className="mb-[-65px] xl:mb-[-90px] 2xl:mb-[-100px]  w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] xl:w-[150px] xl:h-[150px] 2xl:w-[170px] 2xl:h-[170px] 3xl:w-[180px] 3xl:h-[180px] box-content p-4 text-center dark:bg-darkGray_1 bg-bgLightGrey rounded-full z-[1]">
          <Orders className="w-full h-full" />
        </div>
        <div className="w-full rounded-[20px] cursor-cell p-3 pb-[15%] pt-[95px] xl:pt-[120px] 2xl:pt-[130px] 3xl:pt-[150px] h-[195px] lg:h-[210px] xl:h-[260px] 2xl:h-[280px] 2xl  flex flex-col justify-center items-center  dark:bg-[#080807] bg-white base-shadow-1 hover:border hover:border-blueLink hover:dark:border-dark-yellow">
          <span className="text-xl xl:text-2xl font-bold py-2">
            {targetData(levelsTranslatePage, "orders")}
          </span>
          <p className="text-center text-base 2xl:text-xl font-[400]">
            {targetData(
              levelsTranslatePage,
              "a list of registered orders with the ability to be attracted by correspondent level holders"
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center py-3 px-2 w-full sm:w-1/2  lg:w-1/4 xl:w-[300px] 2xl:w-[340px] 3xl:w-[380px]">
        <div className="mb-[-65px] xl:mb-[-90px] 2xl:mb-[-100px]  w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] xl:w-[150px] xl:h-[150px] 2xl:w-[170px] 2xl:h-[170px] 3xl:w-[180px] 3xl:h-[180px]  box-content  p-4 text-center dark:bg-darkGray_1 bg-bgLightGrey rounded-full z-[1]">
          <Development className="w-full h-full" />
        </div>
        <div className="w-full rounded-[20px] cursor-cell p-3 pb-[15%] pt-[95px] xl:pt-[120px] 2xl:pt-[130px] 3xl:pt-[150px] h-[195px] lg:h-[210px] xl:h-[260px] 2xl:h-[280px] 2xl  flex flex-col  justify-center items-center dark:bg-[#080807] bg-white   base-shadow-1 hover:border hover:border-blueLink hover:dark:border-dark-yellow">
          <span className="text-xl xl:text-2xl font-bold py-2">
            {targetData(levelsTranslatePage, "development")}
          </span>
          <p className="text-center text-base 2xl:text-xl font-[400]">
            {targetData(
              levelsTranslatePage,
              "recording citizens' criticisms and suggestions regarding performance and capabilities"
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center py-3 px-2 w-full sm:w-1/2  lg:w-1/4 xl:w-[300px] 2xl:w-[340px] 3xl:w-[380px]">
        <div className="mb-[-65px] xl:mb-[-90px] 2xl:mb-[-100px]  w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] xl:w-[150px] xl:h-[150px] 2xl:w-[170px] 2xl:h-[170px] 3xl:w-[180px] 3xl:h-[180px] box-content  p-4 text-center dark:bg-darkGray_1 bg-bgLightGrey rounded-full z-[1]">
          <Update className="w-full h-full" />
        </div>
        <div className="w-full rounded-[20px] cursor-cell p-3 pb-[15%] pt-[95px] xl:pt-[120px] 2xl:pt-[130px] 3xl:pt-[150px] h-[195px] lg:h-[210px] xl:h-[260px] 2xl:h-[280px] 2xl  flex flex-col  justify-center items-center dark:bg-[#080807] bg-white base-shadow-1 hover:border hover:border-blueLink hover:dark:border-dark-yellow">
          <span className="text-xl xl:text-2xl font-bold py-2">
            {targetData(levelsTranslatePage, "update")}
          </span>
          <p className="text-center text-base 2xl:text-xl font-[400]">
            {targetData(
              levelsTranslatePage,
              "decisions made to improve reporter level performance"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
