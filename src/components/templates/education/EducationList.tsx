"use client";
import { useTheme } from "next-themes";
import SyncLoader from "react-spinners/SyncLoader";
import { formatNumber, translateFooter } from "@/components/utils/education";
import ListDataEducation from "./ListDataEducation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Dislike, Like, Video, View } from "@/components/svgs/SvgEducation";
import axios from "axios";
import { useCookies } from "react-cookie";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default function EducationList({ mainData, allCatVideos, params }: any) {
  const [videoToShow, setVideoToShow] = useState(allCatVideos);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(2);

  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";

  const handleLoadMore = async () => {
    try {
      setLoading(true);

      // Increment page AFTER getting the data to avoid incorrect requests
      const nextPage = currentPage + 1;

      const res = await axios.get(
        `https://api.rgb.irpsc.com/api/tutorials?page=${nextPage}`
      );

      setLastPage(res.data.meta.to);

      // Update state correctly without mutating the existing array
      setVideoToShow((prevVideos: any) => [...prevVideos, ...res.data.data]);

      setCurrentPage(nextPage);

      if (nextPage >= lastPage) {
        // setIsDisabled(true);
      }
    } catch (error) {
      console.error("Error fetching more videos:", error);
    } finally {
      setLoading(false); // Always stop loading
    }
  };

  return (
    <>
      <div className="w-[95%] xs:w-[90%] h-fit mt-24  flex flex-col justify-center items-center ">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {/* ******** */}
          {videoToShow &&
            videoToShow.map((item: any) => (
              <div
                key={item.id}
                className="w-[100%] min-h-[240px]  shadow-md hover:shadow-xl hover:dark:shadow-dark  rounded-[10px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center"
              >
                <div className=" group w-full h-[266px]   rounded-t-[10px] relative">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={600}
                    height={600}
                    priority={true}
                    className=" w-full h-full hover:blur-none transition-all duration-150 ease-in-out rounded-t-[10px]  object-cover"
                  />
                  <div className="w-full h-full bg-black/20 absolute z-0 top-0 flex justify-center items-center">
                    <Link
                      className="w-fit hover:scale-105 duration-100"
                      href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}/${item.slug}`}
                    >
                      <Video className="w-[78px] h-[78px] p-3 fill-blueLink dark:fill-dark-yellow  rounded-full bg-white/80" />
                    </Link>
                  </div>
                </div>

                <div className=" w-[95%] flex flex-row justify-start items-center gap-1  mt-[-10px] pe-16">
                  <p
                    className="text-start text-gray dark:text-dark-gray font-medium font-azarMehr text-[13px]  3xl:text-[16px] cursor-pointer hover:text-blueLink hover:dark:text-dark-yellow"
                    // onClick={() => pusher(item.category.slug)}
                  >
                    {item.category.name}
                  </p>
                  <span className="font-azarMehr text-start text-gray dark:text-dark-gray font-medium text-[13px] 3xl:text-[16px]">
                    /
                  </span>

                  <p
                    className=" text-start  text-gray dark:text-dark-gray  whitespace-nowrap font-medium font-azarMehr text-[13px] 3xl:text-[16px] cursor-pointer hover:text-blueLink hover:dark:text-dark-yellow"
                    // onClick={() =>
                    //   pusherSubcategory(
                    //     item.category.slug,
                    //     item.sub_category.slug
                    //   )
                    // }
                    data-tooltip-id={item.sub_category.name}
                  >
                    {item.sub_category.name.length > 30
                      ? item.sub_category.name.slice(0, 25) + "..."
                      : item.sub_category.name}
                  </p>
                  <ReactTooltip
                    id={item.sub_category.name}
                    place="bottom"
                    content={item.sub_category.name}
                    style={{
                      backgroundColor: `${
                        theme === "dark" ? "#000" : "#e9eef8"
                      }`,
                      color: `${theme === "dark" ? "#fff" : "#000"}`,
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  />
                </div>

                <Link
                  className="w-[95%]"
                  href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}/${item.slug}`}
                >
                  <p className="dark:text-white text-blac text-start w-full font-azarMehr truncate cursor-pointer font-bold mt-[8px] text-[18px] 3xl:text-[22px] ">
                    {item.title}
                  </p>
                </Link>

                <div className="w-[95%] pb-2 flex flex-row justify-between  items-center">
                  <Link
                    href={`/${params.lang}/citizen/${item.creator.code}`}
                    target="_blank"
                  >
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Image
                        src={item.creator.image}
                        alt={item.creator.code}
                        width={100}
                        height={100}
                        loading="lazy"
                        className="w-[45px] h-[45px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
                        // onClick={() => pushRgb(item.creator.code)}
                      />
                      <span
                        className="text-blueLink  cursor-pointer text-[14px] 3xl:text-[18px] whitespace-nowrap font-medium hover:font-bold uppercase "
                        // onClick={() => pushRgb(item.creator.code)}
                      >
                        {item.creator.code}
                      </span>
                    </div>
                  </Link>
                  <div className="flex flex-row justify-start items-center gap-5">
                    <span className=" whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray me-[-13px]">
                      {formatNumber(item.dislikes_count)}
                    </span>
                    <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px] " />
                    <span className="whitespace-nowrap font-azarMehr font-normal  3xl:text-[18px] text-gray dark:text-dark-gray me-[-10px]">
                      {formatNumber(item.likes_count)}
                    </span>
                    <Dislike className="stroke-gray  dark:stroke-dark-gray stroke-2 " />

                    <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray me-[-13px]">
                      {formatNumber(item.views_count)}
                    </span>
                    <View className="stroke-gray dark:stroke-dark-gray stroke-2 " />
                  </div>
                </div>
              </div>
            ))}
          {/* *********** */}
        </div>
        <div className="w-full flex justify-center mt-[40px]">
          {!loading ? (
            <button
              disabled={isDisabled}
              title={isDisabled ? "صفحه آخر" : ""}
              className={`${
                isDisabled ? "cursor-not-allowed" : ""
              } bg-transparent text-black dark:text-dark-yellow rounded-[10px] px-[40px] py-[20px] base-transition-1 border-2 border-transparent hover:border-black hover:dark:border-dark-yellow`}
              onClick={handleLoadMore}
            >
              {findByUniqueId(mainData, 271)}
            </button>
          ) : (
            <SyncLoader
              color={`${theme == "dark" ? "#FFC700" : "#0066ff"}`}
              size={10}
            />
          )}
        </div>
      </div>
    </>
  );
}
