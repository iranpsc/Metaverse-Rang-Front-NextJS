import Image from "next/image";
import { targetData } from "@/components/utils/targetDataName";
import { Development, Income, Orders, Update } from "@/components/svgs";
import {
  LevelIncome,
  LevelOrders,
  LevelDevelopment,
  LevelUpdate,
} from "@/components/svgs/SvgLevels";

export const Features = ({ levelsTranslatePage }: any) => {
  return (
    <div className="pt-8 flex flex-wrap justify-center dark:text-white">
      <div className="flex justify-center items-end px-3 sm:px-4 2xl:px-6 h-[300px] xl:h-[400px] w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="w-[90%] relative rounded-[20px] cursor-cell p-3 pb-[15%] pt-[95px] xl:pt-[120px] 2xl:pt-[130px] 3xl:pt-[150px] h-[195px] lg:h-[210px] xl:h-[260px] 2xl:h-[280px] 2xl flex flex-col justify-center items-center dark:bg-[#080807] bg-white base-shadow-1 border border-transparent hover:border hover:border-blueLink hover:dark:border-dark-yellow hover:scale-110 base-transition-1">
          <div className="absolute bottom-[calc(100%-70px)]">
            <div className="w-[140px] h-[140px] flex justify-center items-center bg-bgLightGrey dark:bg-darkGrey_1 rounded-full">
              <LevelIncome className="w-[100px] h-[100px]" />
            </div>
          </div>
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

      <div className="flex justify-center items-end px-3 sm:px-4 2xl:px-6 h-[300px] xl:h-[400px] w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="w-[90%] relative rounded-[20px] cursor-cell p-3 pb-[15%] pt-[95px] xl:pt-[120px] 2xl:pt-[130px] 3xl:pt-[150px] h-[195px] lg:h-[210px] xl:h-[260px] 2xl:h-[280px] 2xl flex flex-col justify-center items-center dark:bg-[#080807] bg-white base-shadow-1 border border-transparent hover:border hover:border-blueLink hover:dark:border-dark-yellow hover:scale-110 base-transition-1">
          <div className="absolute bottom-[calc(100%-70px)]">
            <div className="w-[140px] h-[140px] flex justify-center items-center bg-bgLightGrey dark:bg-darkGrey_1 rounded-full">
              <LevelOrders className="w-[100px] h-[100px]" />
            </div>
          </div>
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

      <div className="flex justify-center items-end px-3 sm:px-4 2xl:px-6 h-[300px] xl:h-[400px] w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="w-[90%] relative rounded-[20px] cursor-cell p-3 pb-[15%] pt-[95px] xl:pt-[120px] 2xl:pt-[130px] 3xl:pt-[150px] h-[195px] lg:h-[210px] xl:h-[260px] 2xl:h-[280px] 2xl flex flex-col justify-center items-center dark:bg-[#080807] bg-white base-shadow-1 border border-transparent hover:border hover:border-blueLink hover:dark:border-dark-yellow hover:scale-110 base-transition-1">
          <div className="absolute bottom-[calc(100%-70px)]">
            <div className="w-[140px] h-[140px] flex justify-center items-center bg-bgLightGrey dark:bg-darkGrey_1 rounded-full">
              <LevelDevelopment className="w-[100px] h-[100px]" />
            </div>
          </div>
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

      <div className="flex justify-center items-end px-3 sm:px-4 2xl:px-6 h-[300px] xl:h-[400px] w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="w-[90%] relative rounded-[20px] cursor-cell p-3 pb-[15%] pt-[95px] xl:pt-[120px] 2xl:pt-[130px] 3xl:pt-[150px] h-[195px] lg:h-[210px] xl:h-[260px] 2xl:h-[280px] 2xl flex flex-col justify-center items-center dark:bg-[#080807] bg-white base-shadow-1 border border-transparent hover:border hover:border-blueLink hover:dark:border-dark-yellow hover:scale-110 base-transition-1">
          <div className="absolute bottom-[calc(100%-70px)]">
            <div className="w-[140px] h-[140px] flex justify-center items-center bg-bgLightGrey dark:bg-darkGrey_1 rounded-full">
              <LevelUpdate className="w-[100px] h-[100px]" />
            </div>
          </div>
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
