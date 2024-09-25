import Image from "next/image";
import Link from "next/link";
import { FlagSatar, StairsUp } from "@/components/svgs";
import { targetData } from "@/components/utils/targetDataName";

export default function LevelCard({
  item,
  allLevelArrayContent,
  params,
}: {
  item: any;
  allLevelArrayContent: any;
  params: any;
}) {
  function localFind(_name: any) {
    return allLevelArrayContent.find((item: any) => item.name == _name)
      ?.translation;
  }
  return (
    <div className="w-4/5 sm:w-2/5 md:w-1/3 xl:w-1/4 3xl:w-1/5 py-[10px] px-[14px] lg:px-[16px] 2xl:px-[25px] 3xl:px-[50px] ">
      <Link
        className="hoverCardLevel flex  flex-col items-center rounded-[20px] box-border hover:border hover:border-[#0066FF] dark:hover:bg-[#1A1A18]  dark:hover:border-[#FFC700]"
        href={`/${params.lang}/levels/citizen/${item.route_name}/general-info`}
      >
        <Image
          src={item.photo}
          alt={item.name}
          width={180}
          height={170}
          className="z-[2] w-2/3 "
        />
        <div className="boxDataLevel w-full pt-[70px]  rounded-[20px] flex flex-col  justify-center bg-white border border-[rgba(0,0,0,0.14)]   dark:bg-[#1A1A18] mt-[-65px]">
          <span className="text-center  dark:text-white font-azarMehr font-medium  text-[#33353B] mx-2 lg:text-2xl  ">
            {item.name}
          </span>
          <span className="text-center  dark:text-[#84858F] font-azarMehr font-medium  text-[#484950] mx-2 xs:text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[14px] 2xl:text-[16px] py-2">
            {localFind("required points")}
            <span className="ps-1 font-medium">{item.score}</span>
          </span>
          <span className="mb-3 w-full flex justify-evenly font-azarMehr xs:text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px]">
            <span className="flex items-center dark:bg-black bg-[#F6F6F6] rounded-[20px] p-[4px] w-5/12">
              <FlagSatar className="stroke-[#0066FF] dark:stroke-[#FFC700]" />
              <span className="dark:text-[#868B90] text-[#84858F] px-1 font-medium">
                {localFind("rank")}
              </span>
              <span className="dark:text-[#fff] text-[#33353B] font-medium">
                {item.rank}
              </span>
            </span>
            <span className="flex items-center dark:bg-black bg-[#F6F6F6] rounded-[20px] p-[4px] w-5/12">
              <StairsUp className="stroke-[#0066FF] dark:stroke-[#FFC700]" />
              <span className="dark:text-[#868B90] text-[#84858F] px-1 font-medium">
                {localFind("level")}:
              </span>
              <span className="dark:text-[#fff] text-[#33353B] font-medium">
                {item.slug}
              </span>
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}
