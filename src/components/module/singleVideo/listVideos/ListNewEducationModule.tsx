"use client";
import { Like } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { checkData } from "@/components/utils/targetDataName";
// import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
const ListNewEducationModule = ({ videos, mainData, params }: any) => {
  // const { theme } = useTheme();

  const [theme, setTheme] = useState("");
  useEffect(() => {
    const htmlElement = document.documentElement;

    if (htmlElement.classList.contains("dark")) {
      setTheme("dark");
    } else if (htmlElement.classList.contains("light")) {
      setTheme("light");
    }
  }, []);
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
                className="w-full truncate"
                href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}/${item.slug}`}
                //href="/kk"
                target="_blank"
              >
                <p
                  className="w-full font-azarMehr font-medium text-singleVideo-gray dark:text-white text-[16px] text-start truncate"
                  data-tooltip-id={item.title}
                >
                  {item.title}
                </p>
                <ReactTooltip
                  id={item.title}
                  place="bottom"
                  content={item.title}
                  style={{
                    backgroundColor: `${theme === "dark" ? "#000" : "#e9eef8"}`,
                    color: `${theme === "dark" ? "#fff" : "#000"}`,
                    fontSize: "13px",
                    fontWeight: "normal",
                  }}
                />
              </Link>
            </div>

            <div className="w-[90%]  flex flex-row justify-between items-center">
              <p className="w-full font-azarMehr text-blueLink  font-medium text-singleVideo_medium flex items-center gap-1">
                <span>{findByUniqueId(mainData, 563)}</span>
                {" : "}
                <span className="mb-[-2px]"><Link href={`https://rgb.irpsc.com/${params.lang}/citizen/${item.creator.code}`}> {checkData(item.creator.code)}</Link></span>
              </p>
              <div className="flex flex-row justify-center items-center gap-0">
                <p className="w-full font-azarMehr text-singleVideo-gray dark:text-white font-normal text-[14px] ">
                  {item.likes_count}
                </p>
                <Like className="stroke-gray dark:stroke-white !size-[26px]" />
              </div>
            </div>
            <hr className="h-[2px] w-[90%] text-singleVideo-backgroundInput dark:text-dark-background" />
          </div>
        ))}
    </>
  );
};

export default ListNewEducationModule;
