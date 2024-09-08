"use client";
import { translateFooter } from "@/components/utils/education";
import GemImage from "@/components/templates/citizen/gemImage";
import Link from "next/link";
import { Text } from "@/components/svgs/SvgEducation";
// import { getAllCitizen } from "@/components/utils/actions";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";


export default function CitizenList({
  levelListArrayContent,
  params,
  citizenListArrayContent,
  allCitizenArray,
}) {
  function localFind2(_name) {
    return levelListArrayContent.find((item) => item.name == _name)
      ?.translation;
  }

  console.log("allCitizenArray", allCitizenArray);

  const [localCitizenArray, setLocalCitizenArray] = useState(allCitizenArray);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
  const [isMounted, setIsMounted] = useState(false);
  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // fetch for first time and only first time
    // if (isMounted) {
    //   handleLoadMore();
    // }
  }, [isMounted]);

  const handleLoadMore = async () => {
    setCurrentPage(currentPage + 1);
    let oldArray = localCitizenArray;
    console.log("oldArray", oldArray);
    axios.get(`https://api.rgbdev.irpsc.com/api/users?page=${currentPage}`).then((res) => {
      console.log('RESSSS', res)
      setLastPage(res.data.meta.to);
      res.data.data.map((item) => {oldArray.push(item)})
      setLocalCitizenArray(oldArray);
      if (currentPage >= lastPage) {
        setIsDisabled(true);
      }
  
      console.log(
        "Route",
        `https://api.rgbdev.irpsc.com/api/users?page=${currentPage}`
      );
      console.log("newArray", res.data.data);
      console.log("concat array", localCitizenArray);
    }).catch()

  };
  return (
    <>
      {localCitizenArray.map((item, index) => (
        <div
          key={index}
          className="w-[280px] sm:w-1/3 lg:w-1/4 2xl:w-1/5 3xl:w-1/6 hover:scale-105 base-transition-1 px-2"
        >
          <div className="shadow-lg mt-10 relative bg-[#fff] dark:bg-[#1A1A18] flex flex-col justify-between gap-3 py-3 sm:py-4 md:py-5 items-center rounded-[20px]">
            <Image
              src={item.profile_photo || "/temp-1.png"}
              alt={"citizen image"}
              width={120}
              height={120}
              loading="lazy"
              className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] shadow-md transition-all duration-300 shadow-gray rounded-full"
            />
            <p
              // data-atropos-offset="-5"
              className="font-bold text-[14px] sm:text-16 md:text-[18px] 2xl:text-[20px] dark:text-white font-azarMehr sm:mt-2"
            >
              {item.name}
            </p>

            {/* <Link
              href={`https://rgb.irpsc.com/${params.lang}/citizen/${item.code}`}
              target="_blank"
            > */}
            <span
              // data-atropos-offset="-1"
              className="text-blueLink font-medium font-azarMehr text-[12px] sm:text-[16px]"
            >
              {item.code}
            </span>
            {/* </Link> */}

            <span className="dark:text-[#969696] text-[12px] sm:text-[14px] md:text-[16px] 2xl:text-[18px]">
              {localFind2("developer")}
            </span>

            <div className="w-[95%] min-h-[75px] overflow-auto light-scrollbar dark:dark-scrollbar pb-2">
              <div className="w-max flex m-auto">
                {item.levels?.previous?.map((item2, index2) => (
                  <GemImage key={index2} item={item2} />
                ))}
              </div>
            </div>
            <Link
              href={`/${params.lang}/citizen/${item.code}`}
              className="w-[80%]"
            >
              <div
                // data-atropos-offset="5"
                className="w-full h-[40px] sm:h-[50px] md:h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-3 sm:px-6 rounded-[10px] flex flex-row justify-between items-center"
              >
                <span className="text-blueLink dark:text-dark-yellow font-azarMehr font-medium text-[10px] sm:text-[14px]">
                  {translateFooter(citizenListArrayContent, "citizen page")}
                </span>

                <Text className="w-[14px] h-[14px] sm:w-[24px] sm:h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
              </div>
            </Link>
          </div>
        </div>
      ))}
      <div className="w-full flex justify-center mt-[40px]">
        <button
          disabled={isDisabled}
          title={isDisabled ? "صفحه آخر" : ""}
          className={`${
            isDisabled ? "cursor-not-allowed" : ""
          } text-black dark:text-dark-yellow rounded-[10px] px-[40px] py-[20px] border-2 border-transparent hover:border-2 hover:border-dark-yellow base-transition-1`}
          onClick={handleLoadMore}
        >
          مشاهده بیشتر
        </button>
      </div>
    </>
  );
}
