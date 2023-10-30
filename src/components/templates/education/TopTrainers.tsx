import Image from "next/image";
import {Arrow, Like, Text } from "@/components/svgs";

export default function TopTrainers() {

    return (
      <>
        <div className="w-full h-[500px] mt-20 ">
          <div className="w-full flex flex-row justify-between items-center pe-10">
            <h1 className="text-[24px] flex flex-col  font-bold text-gray ms-5">
              مربیان برتر
            </h1>
            <p className="text-[15px] flex flex-col  font-bold text-[#426dae] ">
              مشاهده همه
            </p>
          </div>

          <div className="relative w-full h-[400px] mt-20 flex flex-row gap-5 items-center justify-evenly">
            <div className="w-[300px] h-full cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl bg-white dark:bg-[#1A1A18] flex flex-col justify-evenly items-center rounded-[20px]">
              <Image
                src="/profile/prof.png"
                alt="profile"
                width={1000}
                height={1000}
                className="w-[165px] h-[165px]"
              />
              <h3 className="font-bold text-[20px]">مهدی قربانزاده</h3>
              <span className="text-[#0066FF] font-medium">hm-20003</span>

              <span>
                125
                <Like className="inline ms-2" />
              </span>

              <div className="w-[90%] h-[55px] bg-[#F5F9FF] dark:bg-[#000000] px-2 rounded-[10px] flex flex-row justify-between items-center">
                <span className="text-[#0066FF] font-medium text-[14px]">
                  رزمه مدرس
                </span>
                <Text className="w-[24px] h-[24px]" />
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
          </div>
        </div>
      </>
    );
}