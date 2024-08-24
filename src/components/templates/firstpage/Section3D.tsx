import { ArrowRight, ButtonClick } from "@/components/svgs";
import { Dislike, Like, View, Video } from "@/components/svgs/SvgEducation";

import Image from "next/image";
import Link from "next/link";

const Section3D = () => {
  return (
    <>
      <div className="relative w-full flex justify-center items-center ">
        {/* <ButtonClick className="z-50 absolute size-[130px] m-auto" /> */}
        <div className="absolute bottom-12 start-5 w-fit z-10 h-fit gap-5 flex flex-row justify-center items-center">
          <div className="bg-white px-10 py-2 sm:py-3 rounded-full">
            <p className="font-azarMehr font-medium text-[8px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-black whitespace-nowrap">
              معرفی متاورس رنگ
            </p>
          </div>
          <p className="font-azarMehr font-medium text-[10px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-white">
            انقلابی در پلتفرم های مجازی ایرانی
          </p>
        </div>
        <div className="md:h-[400px] rounded-[32px] sm:rounded-[72px] overflow-hidden flex items-center">
          {/* VIDEO */}
          <video
            className="w-full"
            autoPlay
            loop
            muted
            playsInline
            style={{ display: "block" }}
          >
            <source src="/firstpage/3d-rgb.irpsc.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* <Image
          src={`/firstpage/frame.jpg`}
          alt="/firstpage/img2.jpg"
          width={1000}
          height={1000}
          priority={true}
          className=" w-full h-full absolute z-0 top-0 start-0  object-cover rounded-[72px]"
        /> */}
      </div>
    </>
  );
};

export default Section3D;
