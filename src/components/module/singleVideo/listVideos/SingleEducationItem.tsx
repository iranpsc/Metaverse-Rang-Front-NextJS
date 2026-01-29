"use client";
import { Like } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { checkData } from "@/components/utils/targetDataName";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SingleEducationItem = ({ item, mainData, params, theme }: any) => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const checkTruncation = () => {
    const el = titleRef.current;
    if (el) {
      setIsTruncated(el.scrollWidth > el.clientWidth);
    }
  };

  useEffect(() => {
    checkTruncation();
    const observer = new ResizeObserver(() => checkTruncation());
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    return () => observer.disconnect();
  }, [item.title]);

  return (
    <div className="w-full h-fit flex flex-col gap-5 pt-2 justify-start items-center">
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
      <div className="w-[90%] flex flex-row justify-between gap-3 items-center">
        <Image
          src={item.creator.image && item.creator.image}
          alt={item.creator.image && item.creator.code}
          width={50}
          height={50}
          loading="lazy"
          className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
        />
        <Link onClickCapture={() => setLinkLoading(true)}
          className="w-full truncate"
          href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}/${item.slug}`}
         
        >
          <p
            ref={titleRef}
            className={`w-full font-azarMehr font-medium text-singleVideo-gray dark:text-white text-[16px] text-start truncate ${
              isTruncated
                ? "hover:overflow-visible hover:animate-rtlMarquee"
                : ""
            }`}
          >
            {item.title}
          </p>
        </Link>
      </div>

      <div className="w-[90%] flex flex-row justify-between items-center">
        <p className="w-full font-azarMehr dark:text-white font-medium text-singleVideo_medium flex items-center gap-1 text-sm md:text-base">
          <span>{findByUniqueId(mainData, 563)}</span>
          {" : "}
          <span className="mb-[-2px] text-blueLink dark:text-blue-500 uppercase">
            <Link onClickCapture={() => setLinkLoading(true)}
              href={`https://rgb.irpsc.com/${params.lang}/citizen/${item.creator.code}`}
            >
              {checkData(item.creator.code)}
            </Link>
          </span>
        </p>
        <div className="flex flex-row justify-center items-center gap-0">
          <p className="w-full font-azarMehr text-singleVideo-gray dark:text-white font-normal text-[14px]">
            {item.likes_count}
          </p>
          <Like className="stroke-gray dark:stroke-white !size-[26px]" />
        </div>
      </div>
      <hr className="h-[2px] w-[90%] text-singleVideo-backgroundInput dark:text-dark-background" />
    </div>
  );
};

export default SingleEducationItem;
