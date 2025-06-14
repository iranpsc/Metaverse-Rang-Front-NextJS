"use client";
import Image from "next/image";
import GemImage from "@/components/templates/citizen/gemImage";
import Link from "next/link";
import { Text } from "../svgs/SvgEducation";

export default function UserCard({ item, params, buttonText, minWidth, scoreElement, hidePreviousLevels }: any) {
  return (
    <div
      className={`hover:scale-105 base-transition-1 px-2`}
      style={minWidth ? { width: minWidth, minWidth: minWidth } : {}}
    >
      <div
        className={`shadow-lg mt-10 relative bg-[#fff] dark:bg-[#1A1A18] flex flex-col justify-between gap-3 py-3 sm:py-4 md:py-5 items-center rounded-[20px]`}
      >
        <figure className="w-[120px] h-[120px] relative overflow-hidden rounded-full">
          <Image
            src={item.profile_photo || "/firstpage/temp-1.webp"}
            alt="citizen image"
            fill
            loading="lazy"
            sizes="120px"
            quality={100}
            className="object-cover shadow-md transition-all duration-300 shadow-gray"
          />
        </figure>

        <p
          // data-atropos-offset="-5"
          className="font-bold text-[20px] dark:text-white font-azarMehr sm:mt-2"
        >
          {item.name}
        </p>

        <Link
          className="min-h-[30px] uppercase text-blueLink font-medium font-azarMehr text-[16px] cursor-pointer"
          href={`/${params.lang}/citizens/${item.code}`}
          title={`Go to citizen ${item.code}`} // Optional
          aria-label={`Go to citizen ${item.code}`}
        >
          {item.code}
        </Link>

        <span className="dark:text-[#969696] text-[18px] font-azarMehr">
          {item.levels?.current
            ? item.levels.current.name
            : params.lang == "fa"
              ? "تازه وارد"
              : "Newcomer"}
        </span>
        {scoreElement}

        {!hidePreviousLevels && (
          <div className="w-[95%] min-h-[75px] overflow-auto light-scrollbar dark:dark-scrollbar pb-2">
            <div className="w-max flex m-auto">
              {item.levels?.previous?.map((item2: any, index2: any) => (
                <GemImage
                  key={index2}
                  item={item2}
                  params={params}
                  picSize={50}
                />
              ))}
            </div>
          </div>
        )}

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
  );
}
