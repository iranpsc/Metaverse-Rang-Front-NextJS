import { Vector } from "@/components/svgs";
import Image from "next/image";
import Link from "next/link";

const SectionTeam = ({ firstPageArrayContent, params }: any) => {
  function localFind(_name: any) {
    return firstPageArrayContent.find((item: any) => item.name == _name)
      .translation;
  }
  return (
    <>
      <div className="xl:col-span-5 lg:col-span-5 md:col-span-5 sm:col-span-12 xs:col-span-12">
        <Image
          className=" w-full h-full sm:h-[360px] md:h-auto object-cover origin-center rounded-[64px] border-none"
          src="/firstpage/img2.jpg"
          alt="header"
          width={539}
          height={509}
          loading="lazy"
          layout="responsive"
          quality={75}
        />
      </div>
      <div className="xl:col-span-7 lg:col-span-7 md:col-span-7 sm:col-span-12 xs:col-span-12 flex flex-col justify-between items-start md:ps-10 gap-1">
        <h2 className="w-full text-start font-bold text-[20px] md:text-[26px] lg:text-[32px] text-gray dark:text-white mt-5 font-azarMehr">
          متاورس رنگ
        </h2>

        <Vector className="w-[20%] h-10" />

        <h4 className="w-full text-gray dark:text-white text-[20px] md:text-[24px] lg:text-[28px] text-start pb-2 font-bold ">
          {localFind("a revolution in virtual platforms")}
        </h4>

        <p className="w-full  pt-5 md:pt-0 text-justify   text-black dark:text-lightGray font-azarMehr font-medium text-[14px] md:text-[16px] lg:text-[22px]">
          {localFind("imagine seeing objects and people in 3d on the internet")}
        </p>

        <div className="w-full flex flex-row justify-start items-center pt-5 md:pt-0">
          <div className="relative flex flex-row justify-start items-start ">
            <Image
              className="xl:size-[60px] lg:size-[50px] md:size-[70px] sm:size-[50px] xs:size-[44px] rounded-full border-2 border-white z-50"
              src="/firstpage/ghadiri.jpg"
              alt="header"
              width={1000}
              height={1000}
            />
            <Image
              className="xl:size-[60px] lg:size-[50px] md:size-[70px] sm:size-[50px] xs:size-[44px] rounded-full border-2 border-white ms-[-20px] z-40"
              src="/firstpage/alizadeh.jpg"
              alt="header"
              width={1000}
              height={1000}
            />
            <Image
              className="xl:size-[60px] lg:size-[50px] md:size-[70px] sm:size-[50px] xs:size-[44px] rounded-full border-2 border-white ms-[-20px] z-30"
              src="/firstpage/person3.jpg"
              alt="header"
              width={1000}
              height={1000}
            />
            <Image
              className="xl:size-[60px] lg:size-[50px] md:size-[70px] sm:size-[50px] xs:size-[44px] rounded-full border-2 border-white ms-[-20px] z-20"
              src="/firstpage/person4.jpg"
              alt="header"
              width={1000}
              height={1000}
            />
            <Image
              className="xl:size-[60px] lg:size-[50px] md:size-[70px] sm:size-[50px] xs:size-[44px] rounded-full border-2 border-white ms-[-20px] z-10"
              src="/firstpage/person5.jpg"
              alt="header"
              width={1000}
              height={1000}
            />
          </div>

          <p className="ps-2 text-justify text-dark-yellow font-azarMehr font-medium text-[12px] md:text-[18px] lg:text-[24px]">
            + 40 &nbsp;
            {localFind("metarang team")}
          </p>
        </div>
        <Link href={`/${params.lang}/about`}>
          <p className="w-fit rounded-[24px] py-3 px-10 mt-5 text-center text-[14px] md:text-[16px] lg:text-[20px] text-white bg-[#343434]  font-azarMehr font-medium ">
            بیشتر بخوانید
          </p>
        </Link>
      </div>
    </>
  );
};

export default SectionTeam;
