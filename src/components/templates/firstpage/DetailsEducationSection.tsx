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
      <div className="relative w-full h-[533px] mt-12 flex justify-center items-start">
        <div className="flex flex-col justify-center items-center gap-7 relative z-50 mt-[100px]">
          <p className="font-azarMehr font-bold xl:text-[44px] lg:text-[44px] md:text-[38px] sm:text-[32px] xs:text-[20px] text-white">
            {localFind("the attractiveness of education in the 3d world")}
          </p>
          <a href="https://rgb.irpsc.com/metaverse/">
            <div className="border-[1px] border-white bg-white rounded-full w-[305px] h-[77px] flex flex-row justify-between items-center ps-6 pe-1">
              <p className="w-fit text-start text-[20px] text-black font-azarMehr font-medium ">
                ورود به دنیای متاورس
              </p>
              <div className="bg-dark-yellow size-[70px] rounded-full flex justify-center items-center">
                <Arrow className="size-[36px]" />
              </div>
            </div>
          </a>
        </div>

        <div className="absolute bottom-0 rounded-b-[72px] pt-10 pb-3 w-full z-10 h-[150px] gap-5 flex flex-row justify-center items-center backdrop-blur-sm">
          <div className="bg-white xl:px-10 lg:px-10 md:px-5 sm:px-4 xs:px-3 py-3 rounded-full ms-5">
            <p className="font-azarMehr font-medium text-[20px] text-black whitespace-nowrap">
              {localFind("establishment of educational centers")}
            </p>
          </div>
          <p className="font-azarMehr font-medium text-[20px] text-white whitespace-pre-wrap">
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
          className=" w-full h-full absolute z-0 top-0 start-0  object-cover rounded-[72px]"
        />
      </div>
    </>
  );
};

export default DetailsEducationSection;
