import Image from "next/image";
import {Arrow, Like, Text } from "@/components/svgs";

export default function TopTrainers() {

    return (
      <>
        <div className="w-full h-[500px] mt-20">
          <h1 className="text-[24px] flex flex-col  font-bold text-[#414040] ms-5">
            مربیان برتر
          </h1>

          <div className="relative w-full h-[439px] mt-16 flex flex-row gap-5 items-center justify-evenly">
            <div className="w-[270px] h-full bg-white dark:bg-[#1A1A18] flex flex-col justify-evenly items-center">
              <Image
                src="/profile/prof.png"
                alt="profile"
                width={1000}
                height={1000}
                className="w-[171px] h-[171px]"
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
            <div className="w-[270px] h-full bg-white dark:bg-[#1A1A18] flex flex-col justify-evenly items-center">
              <Image
                src="/profile/prof.png"
                alt="profile"
                width={1000}
                height={1000}
                className="w-[171px] h-[171px]"
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
            <div className="w-[270px] h-full bg-white dark:bg-[#1A1A18] flex flex-col justify-evenly items-center">
              <Image
                src="/profile/prof.png"
                alt="profile"
                width={1000}
                height={1000}
                className="w-[171px] h-[171px]"
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
            <div className="w-[270px] h-full bg-white dark:bg-[#1A1A18] flex flex-col justify-evenly items-center">
              <Image
                src="/profile/prof.png"
                alt="profile"
                width={1000}
                height={1000}
                className="w-[171px] h-[171px]"
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

            <div className=" end-5 bg-white dark:bg-[#1A1A18] w-[270px] h-full flex flex-col justify-center items-center">
              <span className="w-[60px] h-[60px] rounded-full bg-[#0066FF30] dark:bg-[#FFC70033] flex items-center justify-center">
                <Arrow className="stroke-[#0066FF] dark:stroke-dark-yellow w-[20px] h-[20px] stroke-[4px]" 
                />
              </span>
              <p className="text-[#0066FF] dark:text-dark-yellow font-bold mt-6">
                مشاهده دیگر مربیان
              </p>
            </div>
          </div>
        </div>
      </>
    );
}