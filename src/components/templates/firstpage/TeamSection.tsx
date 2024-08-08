import { Vector } from "@/components/svgs";
import Image from "next/image";

const SectionTeam = ({ firstPageArrayContent }: any) => {
  function localFind(_name: any) {
    return firstPageArrayContent.find((item: any) => item.name == _name)
      .translation;
  }
  return (
    <>
      <div className="xl:col-span-5 lg:col-span-5 md:col-span-12 sm:col-span-12 xs:col-span-12">
        <Image
          className="w-full h-full rounded-[150px] border-none px-5"
          src="/firstpage/img2.jpg"
          alt="header"
          width={1000}
          height={1000}
        />
      </div>
      <div className="xl:col-span-7 lg:col-span-7 md:col-span-12 sm:col-span-12 xs:col-span-12 flex flex-col justify-between items-start ps-10 gap-1">
        <h1 className="w-full text-start font-bold text-[32px] text-white mt-5">
          متاورس رنگ
        </h1>

        <Vector className="w-[20%] h-10" />

        <h3 className="text-white text-[36px] text-start  w-[50%] font-bold ">
          {localFind("a revolution in virtual platforms")}
        </h3>

        <p className="w-full   text-justify   text-white font-azarMehr font-medium text-[24px] ">
          {localFind("imagine seeing objects and people in 3d on the internet")}
        </p>

        <div className="w-fit flex flex-row justify-start items-center">
          <div className="relative flex w-full flex-row justify-start items-start ">
            <Image
              className="xl:size-[80px] lg:size-[80px] md:size-[80px] sm:size-[70px] xs:size-[70px] rounded-full border-4 border-white z-50"
              src="/firstpage/ghadiri.jpg"
              alt="header"
              width={1000}
              height={1000}
            />
            <Image
              className="xl:size-[80px] lg:size-[80px] md:size-[80px] sm:size-[70px] xs:size-[70px] rounded-full border-4 border-white ms-[-30px] z-40"
              src="/firstpage/alizadeh.jpg"
              alt="header"
              width={1000}
              height={1000}
            />
            <Image
              className="xl:size-[80px] lg:size-[80px] md:size-[80px] sm:size-[70px] xs:size-[70px] rounded-full border-4 border-white ms-[-30px] z-30"
              src="/firstpage/person3.jpg"
              alt="header"
              width={1000}
              height={1000}
            />
            <Image
              className="xl:size-[80px] lg:size-[80px] md:size-[80px] sm:size-[70px] xs:size-[70px] rounded-full border-4 border-white ms-[-30px] z-20"
              src="/firstpage/person4.jpg"
              alt="header"
              width={1000}
              height={1000}
            />
            <Image
              className="xl:size-[80px] lg:size-[80px] md:size-[80px] sm:size-[70px] xs:size-[70px] rounded-full border-4 border-white ms-[-30px] z-10"
              src="/firstpage/person5.jpg"
              alt="header"
              width={1000}
              height={1000}
            />
          </div>

          <p className="w-full   text-justify   text-dark-yellow font-azarMehr font-medium text-[24px] ms-[100px]">
            + 5 <br />
            {localFind("metarang team")}
          </p>
        </div>
        <p className="w-fit rounded-[24px] py-3 px-10 mt-5 text-center text-[20px] text-white bg-[#343434]  font-azarMehr font-medium ">
          بیشتر بخوانید
        </p>
      </div>
    </>
  );
};

export default SectionTeam;
