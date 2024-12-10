import { Arrow, ArrowRight, ButtonClick } from "@/components/svgs";
import { Dislike, Like, View, Video } from "@/components/svgs/SvgEducation";

import Image from "next/image";
import Link from "next/link";

const DetailsEducationSection = ({ firstPageArrayContent }: any) => {
  function localFind(_name: any) {
    return firstPageArrayContent.find((item: any) => item.name == _name)
      .translation;
  }
  return (
    <>
      <div className="relative w-full h-[193px] sm:h-[250px] md:h-[350px] lg:h-[450px] xl:h-[533px] mt-12 flex justify-center items-start">
        <div className="flex flex-col justify-center items-center gap-2 md:gap-3 lg:gap-5 xl:gap-7 relative z-50 mt-[20px] sm:mt-[30px] md:mt-[50px] lg:mt-[80px] xl:mt-[100px]">
          <p className="font-azarMehr font-bold xl:text-[44px] lg:text-[38px] md:text-[32px] sm:text-[24px] xs:text-[20px] text-white">
            {localFind("the attractiveness of education in the 3d world")}
          </p>
          <a href="https://rgb.irpsc.com/metaverse/">
            <div className="border-[1px] border-white bg-white rounded-full w-[130px] sm:w-[160px] md:w-[210px] lg:w-[250px] xl:w-[305px] h-[34px] sm:h-[40px] md:h-[50px] lg:h-[60px] xl:h-[77px] flex flex-row justify-between items-center ps-2 sm:ps-3 md:ps-4 lg:ps-5 xl:ps-6 pe-1">
              <p className="w-fit text-start text-[10px] sm:text-[13px] md:text-[15px] lg:text-[18px] xl:text-[20px] text-black font-azarMehr font-medium ">
                ورود به دنیای متاورس
              </p>
              <div className="bg-dark-yellow  size-[30px] sm:size-[32px] md:size-[42px] lg:size-[52px] xl:size-[70px] rounded-full flex justify-center items-center">
                <Arrow className="size-[9px] sm:size-[12px] md:size-[18px] lg:size-[24px] xl:size-[36px]" />
              </div>
            </div>
          </a>
        </div>

        <div className="absolute bottom-0 rounded-b-[72px] pt-10 pb-3 w-full z-10 gap-5 py-5 sm:py-6 md:py-9 lg:py-14 xl:py-16 flex flex-row justify-center items-center backdrop-blur-sm">
          <div className="bg-white xl:px-10 lg:px-10 md:px-5 sm:px-4 xs:px-3 py-3 rounded-full ms-5">
            <p className="font-azarMehr font-medium text-[10px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] text-black whitespace-nowrap">
              {localFind("establishment of educational centers")}
            </p>
          </div>
          <p className="font-azarMehr font-medium text-[10px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] text-white whitespace-pre-wrap">
            {localFind(
              "a single, stable and three-dimensional virtual space where people experience"
            )}
          </p>
        </div>
        <Image
          src={`/firstpage/details.png`}
          alt="/firstpage/img2.jpg"
          width={600}
          height={600}
          loading="lazy"
          className=" w-full h-full absolute z-0 top-0 start-0  object-cover rounded-[20px] md:rounded-[40px] lg:rounded-[50px] xl:rounded-[72px]"
        />
      </div>
    </>
  );
};

export default DetailsEducationSection;
