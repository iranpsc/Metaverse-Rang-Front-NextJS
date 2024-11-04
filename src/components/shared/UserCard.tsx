import Image from "next/image";
import GemImage from "@/components/templates/citizen/gemImage";
import Link from "next/link";
import { Text } from "../svgs/SvgEducation";

export default function UserCard({ item, params, buttonText, minWidth }: any) {
  return (
    <div
      className={`hover:scale-105 base-transition-1 px-2`}
      style={minWidth ? { width: minWidth, minWidth: minWidth } : {}}
    >
      <div
        className={`shadow-lg mt-10 relative bg-[#fff] dark:bg-[#1A1A18] flex flex-col justify-between gap-3 py-3 sm:py-4 md:py-5 items-center rounded-[20px]`}
      >
        <Image
          src={item.profile_photo || "/temp-1.png"}
          alt={"citizen image"}
          width={120}
          height={120}
          loading="lazy"
          className="w-[120px] h-[120px] shadow-md transition-all duration-300 shadow-gray rounded-full"
        />
        <p
          // data-atropos-offset="-5"
          className="font-bold text-[20px] dark:text-white font-azarMehr sm:mt-2"
        >
          {item.name}
        </p>

        <Link
          href={`https://rgb.irpsc.com/${params.lang}/citizens/${item.code}`}
        >
          <span
            // data-atropos-offset="-1"
            className="uppercase text-blueLink font-medium font-azarMehr text-[16px] cursor-pointer"
          >
            {item.code}
          </span>
        </Link>

        <span className="dark:text-[#969696] text-[18px]">
          {item.levels?.current
            ? item.levels.current.name
            : params.lang == "fa"
            ? "تازه وارد"
            : "Newcomer"}
        </span>

        <div className="w-[95%] min-h-[75px] overflow-auto light-scrollbar dark:dark-scrollbar pb-2">
          <div className="w-max flex m-auto">
            {item.levels?.previous?.map((item2: any, index2: any) => (
              <GemImage key={index2} item={item2} />
            ))}
          </div>
        </div>
        <Link
          href={`/${params.lang}/citizens/${item.code}`}
          className="w-[80%]"
        >
          <div
            // data-atropos-offset="5"
            className="w-full h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-3 sm:px-6 rounded-[10px] flex flex-row justify-between items-center"
          >
            <span className="text-blueLink dark:text-dark-yellow font-azarMehr font-medium text-[14px]">
              {buttonText}
            </span>

            <Text className="h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
          </div>
        </Link>
      </div>
    </div>
    // <Link href={`/${params.lang}/citizen/${item.code}`}>
    //   <div
    //     key={index}
    //     className="min-w-[258px] min-h-[150px] shadow-xl flex flex-col justify-start items-center gap-10 py-5 bg-white dark:bg-[#1A1A18] rounded-[24px] mx-3 hover:scale-105 base-transition-1"
    //   >
    //     <Image
    //       className="size-[170px] rounded-full border-none"
    //       src={item.profile_photo || "/temp-1.png"}
    //       alt="header"
    //       width={1000}
    //       height={1000}
    //       loading="lazy"
    //     />
    //     <p className="font-azarMehr font-medium text-[20px] text-black dark:text-white">
    //       {item.name}
    //     </p>
    //     <p className="font-azarMehr font-medium text-[18px] text-blueLink dark:text-dark-yellow">
    //       شهروندان پیشرو
    //     </p>
    //     <div className="flex justify-center items-center">
    //       <p className="font-azarMehr font-medium text-[20px] text-[#808080]">
    //         {item.like}
    //       </p>
    //       <Like className="size-[15px] stroke-[#808080]" />
    //     </div>
    //   </div>
    // </Link>
  );
}
