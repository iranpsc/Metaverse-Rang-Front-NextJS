import { Like } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const ListNewEducationModule = ({ videos }: any) => {
  const router = useRouter();
  const { lang } = router.query;
  // console.log(videos.category.slug);

  return (
    <>
      {videos &&
        videos.map((item: any, index: number) => (
          <div
            key={index}
            className="w-full h-fit flex flex-col gap-5 pt-2  justify-start items-center"
          >
            <div className=" w-[90%] flex flex-row justify-between gap-3 items-center">
              <Image
                src={item.creator.image && item.creator.image}
                alt={item.creator.image && item.creator.code}
                width={1000}
                height={1000}
                loading="lazy"
                className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
                // onClick={() => pushRgb(item.creator.code)}
              />
              <Link
                href={`/${lang}/education/category/${item.category.slug}/${item.sub_category.slug}/${item.slug}`}
                //href="/kk"
                target="_blank"
              >
                <p className="w-full font-azarMehr font-medium text-singleVideo-gray dark:text-white text-[18px] truncate">
                  {item.title}
                </p>
              </Link>
            </div>

            <div className="w-[90%]  flex flex-row justify-between items-center">
              <p className="w-full font-azarMehr text-blueLink  font-medium text-singleVideo_medium ">
                {checkData(item.creator.name)}
              </p>
              <div className="flex flex-row justify-center items-center gap-0">
                <p className="w-full font-azarMehr text-singleVideo-gray dark:text-white font-normal text-[14px] ">
                  {item.likes_count}
                </p>
                <Like className="stroke-singleVideo-gray dark:stroke-white size-[24px]" />
              </div>
            </div>
            <hr className="h-[2px] w-[90%] text-singleVideo-backgroundInput dark:text-dark-background" />
          </div>
        ))}
    </>
  );
};

export default ListNewEducationModule;
