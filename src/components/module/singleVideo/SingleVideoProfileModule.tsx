"use client";
import Image from "next/image";
import Link from "next/link";
import { checkData } from "@/components/utils/targetDataName";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { useState } from "react";

const SingleVideoProfileModule = ({
  DataVideo,
  // translateSingleVideo,
  mainData,
  params,
}: any) => {
  // console.log("Data single Video", DataVideo);
const [linkLoading, setLinkLoading] = useState(false);
  return (
    
    <div className="w-full pb-2 flex flex-row gap-2 items-center pt-10 bg-white dark:bg-dark-background ps-5 ">
       {linkLoading && (
        <div className="fixed top-0 left-0 bottom-0  w-full  h-screen z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm" >
          <div className="container flex w-full h-screen items-center justify-center md:ms-[25vw] lg:ms-[17vw] xl:ms-[15vw] 3xl:ms-[16vw]">
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
          </div>
        </div>
      )}
      <Link onClickCapture={() => setLinkLoading(true)}
        href={`https://rgb.irpsc.com/${params.lang}/citizen/${DataVideo.creator.code}`}
        
      >
        <div className="flex flex-row justify-start items-center gap-2">
          <Image
            src={DataVideo.creator.image}
            alt={"creator name " + DataVideo.creator.name || "creator name"}
            width={80}
            height={80}
            loading="lazy"
            className="w-[80px] h-[80px] xs:size-[50px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
          // onClick={() => pushRgb(item.creator.code)}
          />
        </div>
      </Link>
      <div className="flex flex-col justify-between gap-1">
        <p className="text-xs md:text-xl dark:text-white"> {checkData(DataVideo.creator.name)}</p>
        <p className="text-xs md:text-base dark:text-white">
          <span>{findByUniqueId(mainData, 563)}</span>
          {" : "}
          <span className="mb-[-2px] uppercase text-blueLink dark:text-blue-500"><Link onClickCapture={() => setLinkLoading(true)} href={`https://rgb.irpsc.com/${params.lang}/citizen/${DataVideo.creator.code}`}> {checkData(DataVideo.creator.code)}</Link></span>
        </p>

      </div>
    </div>
  );
};

export default SingleVideoProfileModule;