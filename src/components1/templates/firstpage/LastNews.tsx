import { ArrowRight } from "@/components/svgs";
import { Dislike, Like, View, Video } from "@/components/svgs/SvgEducation";

import Image from "next/image";
import Link from "next/link";

const LastNews = () => {
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center ">
        <p className="font-azarMehr font-medium text-[32px]">اخرین اخبار</p>

        <div className="flex justify-center items-center gap-4">
          <p className="font-azarMehr font-medium text-[20px]"> مشاهده همه</p>
          <ArrowRight className="stroke-white rotate-180 w-[24px] h-full" />
        </div>
      </div>

      <div className="grid  lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-10 mt-12">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-[100%] min-h-[240px]  shadow-md hover:shadow-xl hover:dark:shadow-dark  rounded-[10px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center"
          >
            <div className=" group w-full h-[266px]   rounded-t-[10px] relative">
              <Image
                src={`/firstpage/img-l-${index}.jpg`}
                alt="/firstpage/img2.jpg"
                width={600}
                height={600}
                priority={true}
                className=" w-full h-full hover:blur-none transition-all duration-150 ease-in-out rounded-t-[10px]  object-cover"
              />
              <div className="w-full h-full backdrop-blur-[3px] bg-black/20 hover:backdrop-blur-none xs:backdrop-blur-none absolute z-0 top-0 flex justify-center items-center">
                <Video className="w-[78px] h-[78px] p-3 fill-blueLink dark:fill-dark-yellow  rounded-full bg-white/80" />
              </div>
            </div>

            <div className=" w-[95%] flex flex-row justify-start items-center gap-1  mt-[-10px] pe-16">
              <p
                className="text-start text-gray dark:text-dark-gray font-medium font-azarMehr text-[13px]  3xl:text-[16px] cursor-pointer hover:text-blueLink hover:dark:text-dark-yellow"
                //   onClick={() => pusher(item.category.slug)}
              >
                27 اسفند 1402
              </p>
            </div>

            <Link className="w-[95%]" href={"#"}>
              <h1 className="text-start  w-full font-azarMehr truncate cursor-pointer font-bold mt-[8px] text-[18px] 3xl:text-[22px] ">
                زمین های خالی سندباکس
              </h1>
            </Link>

            <div className="w-[95%] pb-2 flex flex-row justify-between  items-center">
              <Link href="#" target="_blank">
                <div className="flex flex-row justify-start items-center gap-2">
                  <Image
                    src="/firstpage/img2.jpg"
                    alt="/firstpage/img2.jpg"
                    width={1000}
                    height={1000}
                    loading="lazy"
                    className="w-[45px] h-[45px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
                    // onClick={() => pushRgb(item.creator.code)}
                  />
                  <span
                    className="text-blueLink  cursor-pointer text-[14px] 3xl:text-[18px] whitespace-nowrap font-medium hover:font-bold uppercase "
                    // onClick={() => pushRgb(item.creator.code)}
                  >
                    Hm-2000003
                  </span>
                </div>
              </Link>
              <div className="flex flex-row justify-start items-center gap-5">
                <span className=" whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray me-[-13px]">
                  125
                </span>
                <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px] " />
                <span className="whitespace-nowrap font-azarMehr font-normal  3xl:text-[18px] text-gray dark:text-dark-gray me-[-10px]">
                  10
                </span>
                <Dislike className="stroke-gray  dark:stroke-dark-gray stroke-2 " />

                <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray me-[-13px]">
                  610
                </span>
                <View className="stroke-gray dark:stroke-dark-gray stroke-2 " />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LastNews;
