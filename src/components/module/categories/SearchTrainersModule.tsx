import { ArrowMenu, Search } from "@/components/svgs";
import Image from "next/image";
import { translateFooter } from "@/components/utils/education";

export const SearchTrainersModule = ({ showFilterItems, translateData }: any) => {
  return (
    <>
      <div
        className="flex flex-row justify-between items-center w-full px-3 cursor-pointer"
        onClick={() => showFilterItems("trainers")}
      >
        <p className="font-azarMehr font-medium text-[14px]">مربیان</p>

        <ArrowMenu
          className={`stroke-gray stroke-2 dark:stroke-dark-background h-full w-[10px]  ${
            showFilterItems === "trainers" ? "rotate-90" : "rotate-[-90deg]"
          }`}
        />
      </div>

      {/* {showFilterItems === "trainers" && ( */}
        <>
          <div className="w-[275px] flex flex-row items-center rounded-md border-[1px]  py-2">
            <Search className="ms-8 fill-blueLink dark:fill-dark-yellow" />
            <input
              placeholder={translateFooter(
                translateData,
                "search for the training you need"
              )}
              className="w-[80%]  outline-none border-none 
              placeholder-[#868B90] text-[14px] xs:text-[10px] ms-2  font-azarMehr font-medium  dark:bg-[#1A1A18]  dark:placeholder-dark-gray "
            />
          </div>

          <div className="w-full h-full mb-[75px] ">
            <div className="w-[99%] h-[65px] mt-2 hover:dark:shadow-darkSearch transition-all duration-300  bg-white dark:bg-dark-background border-b-[1px] border-mediumGray dark:border-mediumGray hover:shadow-md  cursor-pointer flex flex-row justify-between items-center">
              <p className="ms-7 font-azarMehr truncate  text-[16px] xs:text-[12px] font-medium ">
                مرضیه ثاقب علیزاده
              </p>
              <div className="flex flex-row justify-between items-center gap-3 min-w-fit ">
                <div className="h-full flex flex-col gap-0 ">
                  <p className="uppercase  font-azarMehr text-[14px] xs:text-[10px] font-bold  text-blueLink">
                    HM-2000001
                  </p>
                </div>
                <Image
                  src="/profile/marziyeh-alizadeh.jpg"
                  alt="{item.creator_image}"
                  loading="lazy"
                  width={1000}
                  height={1000}
                  className=" w-[50px] h-[50px] xs:w-[40px] xs:h-[40px] me-2 my-5  shadow-sm shadow-gray rounded-full"
                />
              </div>
            </div>
          </div>
        </>
      {/* )} */}
    </>
  );
};