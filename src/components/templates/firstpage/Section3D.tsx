import { ArrowRight, ButtonClick } from "@/components/svgs";
import { Dislike, Like, View, Video } from "@/components/svgs/SvgEducation";

import Image from "next/image";
import Link from "next/link";

const Section3D = () => {
  return (
    <>
      <div className="relative w-[95%] h-[533px] flex justify-center items-center mt-[100px]">
        <ButtonClick className="z-50 relative size-[130px]" />
        <div className="absolute bottom-12 start-5 w-fit z-10 h-fit gap-5 flex flex-row justify-center items-center">
          <div className="bg-white px-10 py-3 rounded-full">
            <p className="font-azarMehr font-medium text-[20px] text-black whitespace-nowrap">
              معرفی متاورس رنگ
            </p>
          </div>
          <p className="font-azarMehr font-medium text-[20px] text-white">
            انقلابی در پلتفرم های مجازی ایرانی
          </p>
        </div>
        <Image
          src={`/firstpage/frame.jpg`}
          alt="/firstpage/img2.jpg"
          width={1000}
          height={1000}
          priority={true}
          className=" w-full h-full absolute z-0 top-0 start-0  object-cover rounded-[72px]"
        />
      </div>
    </>
  );
};

export default Section3D;
