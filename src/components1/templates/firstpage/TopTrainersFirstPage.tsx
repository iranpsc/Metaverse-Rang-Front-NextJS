import { ArrowRight } from "@/components/svgs";
import Image from "next/image";
import { Like, Text } from "@/components/svgs/SvgEducation";

const TopTrainersFirstPage = () => {
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-azarMehr font-medium text-[32px]">مربیان برتر</p>

        <div className="flex justify-center items-center gap-4">
          <p className="font-azarMehr font-medium text-[20px]"> مشاهده همه</p>
          <ArrowRight className="stroke-white rotate-180 w-[24px] h-full" />
        </div>
      </div>
      <div className="w-full relative flex flex-row xl:justify-center items-center gap-6 mt-12 overflow-x-auto h-[500px]">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="min-w-[258px] min-h-[150px] shadow-xl flex flex-col justify-start items-center gap-10 py-5 bg-[#1A1A18] rounded-[24px]"
          >
            <Image
              className="size-[170px] rounded-full border-none"
              src="/firstpage/img2.jpg"
              alt="header"
              width={1000}
              height={1000}
            />
            <div className="flex flex-col justify-start items-center gap-6">
              <p className="font-azarMehr font-medium text-[20px] text-white">
                بهراد جهانی
              </p>
              <p className="font-azarMehr font-medium text-[18px] text-dark-yellow">
                شهروندان پیشرو
              </p>
              <div className="flex justify-center items-center">
                <p className="font-azarMehr font-medium text-[20px] text-[#808080]">
                  125
                </p>
                <Like className="size-[15px] stroke-[#808080]" />
              </div>
            </div>
            <div className="w-[90%] h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-6 rounded-[10px] flex flex-row justify-between items-center">
              <span className="text-blueLink dark:text-dark-yellow font-azarMehr font-medium text-[14px]">
                رزمه مدرس
              </span>

              <Text className="w-[24px] h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopTrainersFirstPage;
