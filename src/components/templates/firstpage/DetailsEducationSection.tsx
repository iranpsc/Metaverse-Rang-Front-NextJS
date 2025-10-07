import { Arrow, ArrowRight, ButtonClick } from "@/components/svgs";
import { Dislike, Like, View, Video } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

import Image from "next/image";

const DetailsEducationSection = ({ mainData }: any) => {
  // function localFind(_name: any) {
  //   return firstPageArrayContent.find((item: any) => item.name == _name)
  //     .translation;
  // }
  return (
    <>
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] mt-12 flex justify-center items-start">
        <div className="flex flex-col justify-center items-center gap-2 md:gap-3 lg:gap-5 xl:gap-7 relative z-50 mt-[20px] sm:mt-[30px] md:mt-[50px] lg:mt-[80px] xl:mt-[100px]">
          <p className="font-azarMehr text-center font-bold xl:text-[44px] lg:text-[38px] md:text-[32px] sm:text-[24px] xs:text-[20px] text-white">
            {/* {localFind("the attractiveness of education in the 3d world")} */}
            {findByUniqueId(mainData, 498)}
          </p>
          <a href="https://rgb.irpsc.com/metaverse/">
            <div className="border-[1px] border-white bg-white rounded-full w-max  flex flex-row justify-between items-center ps-2 sm:ps-3 md:ps-4 lg:ps-5 xl:ps-6 pe-[5px] gap-5 py-[5px]">
              <p className="w-fit text-start text-[10px] sm:text-[13px] md:text-[15px] lg:text-[18px] xl:text-[20px] text-black font-azarMehr font-medium ">
               {findByUniqueId(mainData, 483)}
              </p>
              <div className="bg-light-primary dark:bg-dark-yellow  size-[30px] sm:size-[32px] md:size-[42px] lg:size-[52px] xl:size-[70px] rounded-full flex justify-center items-center">
                <Arrow className="size-[9px] sm:size-[12px] md:size-[18px] lg:size-[24px] xl:size-[36px] ltr:rotate-90" />
              </div>
            </div>
          </a>
        </div>

        <div className="absolute bottom-0 rounded-b-[18px] lg:rounded-b-[72px] pb-3 w-full z-10 gap-4 pt-2 md:py-6 lg:py-14 xl:py-16 flex flex-col-reverse justify-center items-center backdrop-blur-sm bg-black/20">
          <div className="bg-white px-3 py-2 md:px-10 rounded-full ms-5">
            <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] text-black whitespace-nowrap">
              {/* {localFind("establishment of educational centers")} */}
              {findByUniqueId(mainData, 499)}
            </p>
          </div>
          <p className="font-azarMehr font-medium text-wrap px-3 text-[12px]  md:text-[16px] lg:text-[18px] xl:text-[22px] text-white whitespace-pre-wrap">
            {/* {localFind(
              "a single, stable and three-dimensional virtual space where people experience"
            )} */}
            {findByUniqueId(mainData, 500)}
          </p>
        </div>
        <Image
          src={`/firstpage/details.webp`}
          alt=""
          width={700}
          height={500}
          loading="lazy"
          className=" w-full h-full absolute z-0 top-0 start-0  object-cover rounded-[20px] md:rounded-[40px] lg:rounded-[50px] xl:rounded-[72px] bg-cover"
        />
      </div>
    </>
  );
};

export default DetailsEducationSection;
