"use client";
import Image from "next/image";
import Link from "next/link";
import { checkData } from "@/components/utils/targetDataName";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

const SingleVideoProfileModule = ({
  DataVideo,
  // translateSingleVideo,
  mainData,
  params,
}: any) => {
  // console.log("Data single Video", DataVideo);

  return (
    <div className="w-full pb-2 flex flex-row gap-2 items-center pt-10 bg-white dark:bg-dark-background ps-5 ">
      <Link
        href={`https://rgb.irpsc.com/${params.lang}/citizen/${DataVideo.creator.code}`}
        target="_blank"
      >
        <div className="flex flex-row justify-start items-center gap-2">
          <Image
            src={DataVideo.creator.image}
            alt={"creator name " + DataVideo.creator.name || "creator name"}
            width={100}
            height={100}
            loading="lazy"
            className="w-[80px] h-[80px] xs:size-[50px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
          // onClick={() => pushRgb(item.creator.code)}
          />
        </div>
      </Link>
      <div className="flex flex-col justify-between gap-1">
        <p className="text-xs md:text-xl dark:text-white"> {checkData(DataVideo.creator.name)}</p>
        <p className="text-xs md:text-base text-blueLink dark:text-blue-500">
          <span>{findByUniqueId(mainData, 563)}</span>
          {" : "}
          <span className="mb-[-2px]"><Link href={`https://rgb.irpsc.com/${params.lang}/citizen/${DataVideo.creator.code}`}> {checkData(DataVideo.creator.code)}</Link></span>
        </p>

      </div>
    </div>
  );
};

export default SingleVideoProfileModule;