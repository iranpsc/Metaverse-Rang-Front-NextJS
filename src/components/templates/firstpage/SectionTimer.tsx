import { ArrowRight } from "@/components/svgs";
import Image from "next/image";
import TimerSection from "./Timer";
import DynamicTimer from "./DynamicTimer";

const SectionTimer = ({ firstPageArrayContent }: any) => {
  function localFind(_name: any) {
    return firstPageArrayContent.find((item: any) => item.name == _name)
      .translation;
  }
  return (
    <div className="w-full flex flex-wrap justify-evenly xl:gap-1 lg:gap-1 md:gap-5 sm:gap-5 xs:gap-5 items-center mt-36 min-h-[300px]">
      <div className="w-full  h-[50px] xl:hidden lg:hidden md:flex sm:flex xs:flex justify-center items-center gap-10">
        <div className="bg-dark-yellow rounded-full size-[50px] flex justify-center items-center  ">
          <ArrowRight className=" stroke-[#1b1b1b] size-[24px]" />
        </div>
        <div className="bg-dark-yellow rounded-full size-[50px] flex justify-center items-center">
          <ArrowRight className="stroke-[#1b1b1b] size-[24px] rotate-180" />
        </div>
      </div>

      <div className="bg-dark-yellow rounded-full size-[50px] xl:flex lg:flex md:hidden sm:hidden xs:hidden justify-center items-center  ">
        <ArrowRight className=" stroke-[#1b1b1b] size-[24px]" />
      </div>

      <div
        className="relative max-w-[660px] h-fit  p-4 border-2 border-[#343434] rounded-[50px]
      flex xl:flex-row lg:flex-row md:flex-nowrap sm:flex-wrap xs:flex-wrap xl:gap-0 lg:gap-0 md:gap-0 sm:gap-5  xs:gap-5 justify-center items-center"
        style={{ borderColor: "linear-gradient(to right, #000, #fff)" }}
      >
        <div className="absolute bg-white/10 z-0 size-[150px] top-[10px] end-[20%] blur-3xl  filter"></div>
        <Image
          className="w-full h-full rounded-[32px] border-none"
          src="/firstpage/img1.jpg"
          alt="header"
          width={1000}
          height={1000}
        />
        <div className="">
          <h6 className="w-fit text-start text-[32px] text-white font-azarMehr font-medium ms-5">
            خانه سه بعدی جدید با معماری Brutalism
          </h6>
          <p className="w-fit text-start text-[20px] text-white font-azarMehr font-medium mt-10 ms-5">
            ساختمان‌های این سبک از معماری به ظاهر خشن و رویدادگرا هستند و دارای
            ضخامت و جرات بصری قوی می‌باشند. و ......
          </p>
        </div>
      </div>

      <div
        className="xl:max-w-[410px] lg:max-w-[410px] md:w-full sm:w-full xs:w-full h-[300px] rounded-[50px] border-2 border-[#343434] p-4
      flex flex-col justify-between items-center relative "
      >
        <div className="absolute bg-white/10 z-0 size-[150px] top-[-10px] end-[-20px] rounded-xl blur-3xl  filter"></div>
        <DynamicTimer />
        <p className="w-full rounded-[28px] py-3 z-50 text-center text-[20px] text-black bg-dark-yellow  font-azarMehr font-medium mt-5 ">
          پیش خرید
        </p>
        <p className="w-full rounded-[28px] py-3 mt-5 text-center text-[20px] text-white bg-[#343434]  font-azarMehr font-medium ">
          مشاهده آبجکت
        </p>
      </div>

      <div className="bg-dark-yellow rounded-full size-[50px] flex justify-center items-center xl:flex lg:flex md:hidden sm:hidden xs:hidden">
        <ArrowRight className="stroke-[#1b1b1b] size-[24px] rotate-180" />
      </div>
    </div>
  );
};

export default SectionTimer;
