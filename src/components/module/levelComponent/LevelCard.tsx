import Image from "next/image";
import Link from "next/link";
import { FlagSatar, StairsUp } from "@/components/svgs";

export default function LevelCard({
  item,
  allLevelArrayContent,
  params,
}: {
  item: any;
  allLevelArrayContent: any;
  params: any;
}) {
  console.log("itemssssss", item);

  function localFind(_name: any) {
    return allLevelArrayContent.find((item: any) => item.name == _name)
      ?.translation;
  }
  return (
    <div className="py-[10px] px-[14px] w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 flex justify-center">
      <Link
        className="w-full max-w-[296px] lg:max-w-[333px] py-[25px] base-transition-1 hoverCardLevel flex flex-col items-center rounded-[20px] box-border border border-transparent hover:border hover:border-[#0066FF] dark:hover:bg-[#1A1A18] dark:hover:border-[#FFC700]"
        href={`/${params.lang}/levels/citizen/${item.route_name}/general-info`}
      >
        <Image
          src={item.photo}
          alt={item.name}
          width={180}
          height={170}
          className="z-[2] w-[147px] h-[147px] lg:w-[180px] lg:h-[180px] translate-y-2 lg:translate-y-6"
        />
        <div className="boxDataLevel w-full h-[216px] lg:h-[239px] rounded-[20px] flex flex-col  justify-end bg-white border border-[rgba(0,0,0,0.14)] dark:bg-[#1A1A18] mt-[-65px]">
          <span className="text-center  dark:text-white font-azarMehr font-medium  text-[#33353B] mx-2 font-semibold text-[20px] lg:text-[24px]">
            {item.name}
          </span>
          <span className="text-center  dark:text-[#84858F] font-azarMehr font-normal text-[#484950] mx-2 text-[16px] lg:text-[20px] py-2">
            {localFind("required points")}
            <span className="ps-1 font-medium">{item.score}</span>
          </span>
          <span className="mb-3 w-full flex justify-evenly font-azarMehr text-[16px] lg:text-[20px]">
            <span className="flex items-center dark:bg-black bg-[#F6F6F6] rounded-[20px] p-[4px] w-5/12">
              <FlagSatar className="stroke-[#0066FF] dark:stroke-[#FFC700] text-[24px]" />
              <span className="dark:text-[#868B90] text-[#84858F] px-1 font-normal">
                {localFind("rank")}
              </span>
              <span className="dark:text-[#fff] text-[#33353B] font-normal">
                {item.rank}
              </span>
            </span>
            <span className="flex items-center dark:bg-black bg-[#F6F6F6] rounded-[20px] p-[4px] w-5/12">
              <StairsUp className="stroke-[#0066FF] dark:stroke-[#FFC700] text-[24px]" />
              <span className="dark:text-[#868B90] text-[#84858F] px-1 font-normal text-[16px] lg:text-[20px]">
                {localFind("level")}:
              </span>
              <span className="dark:text-[#fff] text-[#33353B] font-normal text-[16px] lg:text-[20px]">
                {item.slug}
              </span>
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}
