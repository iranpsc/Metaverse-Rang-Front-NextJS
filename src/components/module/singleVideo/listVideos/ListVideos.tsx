"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Like, Dislike, View, Video } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ListVideos = ({ DataVideos, params, theme }: any) => {
  const router = useRouter();

  const pusherSubcategory = (slugVideo: any) => {
    router.push(
      `/${params.lang}/education/category/${params.category}/${params.subcategory}/${slugVideo}`
    );
  };

  const stripHTML = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="my-[20px] flex flex-col md:grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-10 w-full pb-3 pt-16 xs:flex xs:justify-center xs:items-center px-5 lg:px-0">
      {DataVideos &&
        DataVideos.videos.map((item: any) => {
          console.log("Video item:", item); // ← این خط اضافه شد
          const titleRef = useRef<HTMLParagraphElement>(null);
          const [isTruncated, setIsTruncated] = useState(false);

          const checkTruncation = () => {
            const el = titleRef.current;
            if (el) {
              setIsTruncated(el.scrollWidth > el.clientWidth);
            }
          };

          useEffect(() => {
            checkTruncation();
            const observer = new ResizeObserver(() => {
              checkTruncation();
            });
            if (titleRef.current) {
              observer.observe(titleRef.current);
            }
            return () => {
              observer.disconnect();
            };
          }, [item.title]);

          // بررسی وجود category و sub_category
          const categorySlug = item.category?.slug || "";
          const categoryName = item.category?.name || "بدون دسته‌بندی";
          const subCategorySlug = item.sub_category?.slug || "";
          const subCategoryName = item.sub_category?.name || "بدون زیرشاخه";

          return (
            <div
              key={item.id}
              className="w-[100%] min-h-[240px] shadow-md hover:shadow-xl duration-300 hover:dark:shadow-dark rounded-[20px] overflow-hidden bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center"
              onClick={() => pusherSubcategory(item.slug)}
            >
              <div className="group w-full h-[266px] cursor-pointer relative">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  width={100}
                  height={100}
                  priority={true}
                  className="w-full h-full xs:p-3 hover:blur-none transition-all duration-150 ease-in-out rounded-t-[10px] object-cover"
                />
                <div className="w-full h-full bg-black/30 absolute z-0 top-0 flex justify-center items-center rounded-t-[10px]">
                  <div className="w-fit hover:scale-105 duration-100 rounded-full bg-white/30 dark:bg-black/35 flex items-center justify-center p-5">
                    <Video width={40} height={40} />
                  </div>
                </div>
              </div>

              <div className="w-[95%] flex flex-row justify-start items-center gap-1 mt-[-10px] pe-16">
                <Link
                  href={`/${params.lang}/education/category/${categorySlug}`}
                  className="text-start text-gray dark:text-dark-gray font-medium font-azarMehr text-[13px] 3xl:text-[16px]"
                >
                  {categoryName}
                </Link>
                <span className="font-azarMehr text-gray dark:text-dark-gray">/</span>
                <Link
                  href={`/${params.lang}/education/category/${categorySlug}/${subCategorySlug}`}
                  className="text-start text-gray dark:text-dark-gray whitespace-nowrap font-medium font-azarMehr text-[13px] 3xl:text-[16px]"
                  data-tooltip-id={subCategoryName}
                >
                  {subCategoryName.length > 30
                    ? subCategoryName.slice(0, 25) + "..."
                    : subCategoryName}
                </Link>
                <ReactTooltip
                  id={subCategoryName}
                  content={subCategoryName}
                  place="bottom"
                  style={{
                    backgroundColor: theme === "dark" ? "#000" : "#e9eef8",
                    color: theme === "dark" ? "#fff" : "#000",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                />
              </div>

              <p
                ref={titleRef}
                className={`text-start text-black dark:text-white w-[95%] font-azarMehr truncate cursor-pointer font-bold text-[18px] 3xl:text-[22px] mt-[-15px] ${
                  isTruncated ? "hover:overflow-visible hover:animate-rtlMarquee" : ""
                }`}
              >
                {item.title}
              </p>
              <p className="w-[95%] mt-[-20px] text-textGray dark:text-lightGray text-[12px] 3xl:text-[16px] line-clamp-2 overflow-hidden">
                {stripHTML(item.description)}
              </p>

              <div className="w-[95%] pb-2 flex flex-row justify-between items-center">
                <Link
                  href={`https://rgb.irpsc.com/${params.lang}/citizen/${item.creator.code}`}
                  target="_blank"
                >
                  <div className="flex flex-row justify-start items-center gap-2">
                    <Image
                      src={item.creator.image}
                      alt={item.creator.code}
                      width={1000}
                      height={1000}
                      loading="lazy"
                      className="w-[45px] h-[45px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
                    />
                    <span className="text-blueLink cursor-pointer text-[14px] 3xl:text-[18px] whitespace-nowrap font-medium hover:font-bold uppercase">
                      {item.creator.code}
                    </span>
                  </div>
                </Link>
                <div className="flex flex-row justify-start items-center gap-5">
                  <div className="flex items-center gap-[5px]">
                    <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                      {formatNumber(item.dislikes_count)}
                    </span>
                    <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px]" />
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                      {formatNumber(item.likes_count)}
                    </span>
                    <Dislike className="stroke-gray dark:stroke-dark-gray stroke-2" />
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                      {formatNumber(item.views_count)}
                    </span>
                    <View className="stroke-gray dark:stroke-dark-gray stroke-2" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ListVideos;
