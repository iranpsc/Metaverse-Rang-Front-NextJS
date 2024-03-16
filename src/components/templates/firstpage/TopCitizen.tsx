import { ArrowRight } from "@/components/svgs";
import { Like } from "@/components/svgs/SvgEducation";
import Image from "next/image";

const TopCitizen = () => {
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-azarMehr font-medium text-[32px]">شهروندان پیشرو</p>

        <div className="flex justify-center items-center gap-4">
          <p className="font-azarMehr font-medium text-[20px]"> مشاهده همه</p>
          <ArrowRight className="stroke-white rotate-180 w-[24px] h-full" />
        </div>
      </div>
      <div className="w-full relative flex flex-row  xl:justify-center items-center overflow-x-auto gap-6 mt-12">
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
              loading="lazy"
            />
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
        ))}
      </div>
    </>
  );
};

export default TopCitizen;
