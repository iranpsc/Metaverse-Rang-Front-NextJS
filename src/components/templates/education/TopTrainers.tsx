import { useContext } from "react";

import { LangContext } from "@/context/LangContext";
import Image from "next/image";
import { Arrow, Like, Text } from "@/components/svgs";

export default function TopTrainers() {
        const { languageSelected } = useContext(LangContext);
  return (
    <>
      <div className="w-full h-[500px] mt-20 flex flex-col justify-center items-center">
        <h1 className="w-full text-[24px] flex flex-col  font-bold text-[#414040] ps-10 pb-10">
          مربیان برتر
        </h1>

        <div className="relative w-[95%] h-[400px] mt-20 flex flex-row gap-5 items-center justify-evenly">
          <div className="w-[300px] h-full cursor-pointer shadow-xl hover:shadow-2xl bg-white dark:bg-[#1A1A18] flex flex-col justify-evenly pt-[70px]  items-center rounded-[20px]">
            <Image
              src="/profile/prof.png"
              alt="profile"
              width={1000}
              height={1000}
              className="w-[150px] h-[150px] absolute top-[-75px] shadow-md hover:top-[-88px] transition-all duration-300 shadow-gray rounded-full"
            />
            <h3 className="font-bold text-[20px]">مهدی قربانزاده</h3>
            <span className="text-[#0066FF] font-medium">hm-20003</span>

            <span>
              125
              <Like className="inline ms-2" />
            </span>

            <div className="w-[90%] h-[55px] bg-[#426dae] dark:bg-[#000000] px-2 rounded-[10px] flex flex-row justify-between items-center">
              <span className="text-[#ffffff] font-medium text-[14px]">
                رزمه مدرس
              </span>
              <Text className="w-[24px] h-[24px] stroke-white" />
            </div>
          </div>
          <div className="w-[300px] h-full cursor-pointer shadow-xl hover:shadow-2xl bg-white dark:bg-[#1A1A18] flex flex-col justify-evenly pt-[70px]  items-center rounded-[20px]">
            <Image
              src="/profile/prof.png"
              alt="profile"
              width={1000}
              height={1000}
              className="w-[150px] h-[150px] absolute top-[-75px] shadow-md hover:top-[-88px] transition-all duration-300 shadow-gray rounded-full"
            />
            <h3 className="font-bold text-[20px]">مهدی قربانزاده</h3>
            <span className="text-[#0066FF] font-medium">hm-20003</span>

            <span>
              125
              <Like className="inline ms-2" />
            </span>

            <div className="w-[90%] h-[55px] bg-[#426dae] dark:bg-[#000000] px-2 rounded-[10px] flex flex-row justify-between items-center">
              <span className="text-[#ffffff] font-medium text-[14px]">
                رزمه مدرس
              </span>
              <Text className="w-[24px] h-[24px] stroke-white" />
            </div>
          </div>
          <div className="w-[300px] h-full cursor-pointer shadow-xl hover:shadow-2xl bg-white dark:bg-[#1A1A18] flex flex-col justify-evenly pt-[70px]  items-center rounded-[20px]">
            <Image
              src="/profile/prof.png"
              alt="profile"
              width={1000}
              height={1000}
              className="w-[150px] h-[150px] absolute top-[-75px] shadow-md hover:top-[-88px] transition-all duration-300 shadow-gray rounded-full"
            />
            <h3 className="font-bold text-[20px]">مهدی قربانزاده</h3>
            <span className="text-[#0066FF] font-medium">hm-20003</span>

            <span>
              125
              <Like className="inline ms-2" />
            </span>

            <div className="w-[90%] h-[55px] bg-[#426dae] dark:bg-[#000000] px-2 rounded-[10px] flex flex-row justify-between items-center">
              <span className="text-[#ffffff] font-medium text-[14px]">
                رزمه مدرس
              </span>
              <Text className="w-[24px] h-[24px] stroke-white" />
            </div>
          </div>
          <div className="w-[300px] h-full cursor-pointer shadow-xl hover:shadow-2xl bg-white dark:bg-[#1A1A18] flex flex-col justify-evenly pt-[70px]  items-center rounded-[20px]">
            <Image
              src="/profile/prof.png"
              alt="profile"
              width={1000}
              height={1000}
              className="w-[150px] h-[150px] absolute top-[-75px] shadow-md hover:top-[-88px] transition-all duration-300 shadow-gray rounded-full"
            />
            <h3 className="font-bold text-[20px]">مهدی قربانزاده</h3>
            <span className="text-[#0066FF] font-medium">hm-20003</span>

            <span>
              125
              <Like className="inline ms-2" />
            </span>

            <div className="w-[90%] h-[55px] bg-[#426dae] dark:bg-[#000000] px-2 rounded-[10px] flex flex-row justify-between items-center">
              <span className="text-[#ffffff] font-medium text-[14px]">
                رزمه مدرس
              </span>
              <Text className="w-[24px] h-[24px] stroke-white" />
            </div>
          </div>
          <div className="w-[300px] h-full cursor-pointer shadow-xl hover:shadow-2xl bg-white dark:bg-[#1A1A18] flex flex-col justify-center  items-center rounded-[20px]">
            <div className="w-[60px] h-[60px] bg-[#0066FF] dark:bg-[#FFC700] dark:bg-opacity-20 bg-opacity-20 rounded-full flex justify-center items-center">
              <Arrow
                className={` ${
                  languageSelected.dir === "rtl" ? "" : "rotate-180"
                } ms-1 w-[10px] h-[20px] stroke-2 stroke-[#0066FF] dark:stroke-[#FFC700]`}
              />
            </div>
            <h3 className="font-bold text-[16px] mt-3 text-[#0066FF] dark:text-[#FFC700]">
              View other trainers
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
