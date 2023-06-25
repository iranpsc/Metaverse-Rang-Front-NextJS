import React, { useState, useEffect } from "react";
import like from "../../../../public/png/like.png";
import axiosHelper from "@/helper/axios";
import Link from "next/link";
import Image from "next/image";
import type { Video, SingleVideo, VideoData } from "@/types/api/index"


export default function SingleVideoSideBar({links, meta, data}: VideoData) {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  return (
    <div className="h-screen">
    {data.map((result: any, index:any) => (
    <>
      <div className="grid grid-cols-2 w-full hover:bg-blue-light">
        <div className="col-span-1">
          <Link
            href={`${baseUrl}/trainings/${result.id}`}
            className="h-[70px] flex items-center rounded-sm"
          >
            <h1 className="text-gray border-orange mr-[5px] text-[12px]">
              {result.title}
            </h1>
          </Link>
        </div>
        <div className="col-span-1 mt-[10px]">
          <div className="grid grid-cols-5">
            <div className="col-span-3">
              <div className="flex justify-end mt-[25px] -ml-[30%] lg:ml-[5px]">
                <p className="BebasNeue-Regular text-gray flex items-center justify-end ml-[10px] mt-[5px]">
                  {result.likes}
                </p>
                <Image
                  src={like}
                  alt="like"
                  height={7}
                  width={14}
                  className="w-[15px] h-[15px] mt-[8px] ml-[10px]"
                />
                <Link
                className="font-Bruno mt-[8px] text-blue whitespace-nowrap font-bold text-sm flex justify-end"
                href={`${baseUrl}/citizen/${result.creator_code}`}
                >
                {result.creator_code}
              </Link>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-end ml-[10px] lg:justify-start">
              <Image
                src={result.creator_image}
                height={100}
                width={100}
                alt={result.category_name}
                className="rounded-full h-[50px] w-[50px]"
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="border-0 border-b-[1px] border-gray-lighter my-[5px] flex justify-center mx-[30px]" />
    </>
    ))}
    </div>
  );
}
