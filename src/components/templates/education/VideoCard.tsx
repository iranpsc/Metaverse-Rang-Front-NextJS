import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";
import { Tooltip as ReactTooltip } from "react-tooltip";


export default function VideoCard({ item, params, theme }: any) {
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


    console.log("eductions VideoCard content main page list:", item);

    const observer = new ResizeObserver(() => {
      checkTruncation();
    });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [item.title, item]);

  // تابع برای حذف تگ‌های HTML
  const stripHTML = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };


  return (
    <div className="w-[100%] min-h-[240px] shadow-md hover:shadow-xl hover:dark:shadow-dark rounded-[10px] overflow-hidden bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center">
      <div className="group w-full h-[266px] rounded-t-[10px] relative">
        <Image
          src={item.image_url}
          alt={item.title}
          width={600}
          height={600}
          priority={true}
          className="w-full h-full object-cover rounded-t-[10px]"
        />
        <div className="w-full h-full   absolute top-0 z-0 flex justify-center items-center">
          <Link
            className="w-fit hover:scale-105 duration-100"
            href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}/${item.slug}`}
          >
            <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect className="fill-white/80 dark:fill-black/70" width="78" height="78" rx="39" fillOpacity="0.51" />
              <path className="fill-white " d="M54 34.3039C58 36.6133 58 42.3868 54 44.6962L35.25 55.5215C31.25 57.8309 26.25 54.9441 26.25 50.3253V28.6747C26.25 24.0559 31.25 21.1691 35.25 23.4785L54 34.3039Z" />
            </svg>
          </Link>
        </div>
      </div>

     <div className="w-[95%] flex flex-row justify-start items-center gap-1 mt-[-10px] pe-16">
        <Link href={`/${params.lang}/education/category/${item.category.slug}`} className="text-start text-gray dark:text-dark-gray font-medium font-azarMehr text-[13px] 3xl:text-[16px]">
          {item.category.name}
        </Link>
        <span className="font-azarMehr text-gray dark:text-dark-gray">/</span>
        <Link href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}`}
          className="text-start text-gray dark:text-dark-gray whitespace-nowrap font-medium font-azarMehr text-[13px] 3xl:text-[16px]"
          data-tooltip-id={item.sub_category.name}
        >
          {item.sub_category.name.length > 30
            ? item.sub_category.name.slice(0, 25) + "..."
            : item.sub_category.name}
        </Link>
        <ReactTooltip
          id={item.sub_category.name}
          content={item.sub_category.name}
          place="bottom"
          style={{
            backgroundColor: theme === "dark" ? "#000" : "#e9eef8",
            color: theme === "dark" ? "#fff" : "#000",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        />
      </div>

      <Link
        className="w-[95%] mt-[-24px]"
        href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}/${item.slug}`}
      >
        <p
          ref={titleRef}
          className={`dark:text-white text-blac text-start w-full font-azarMehr truncate cursor-pointer font-bold mt-[8px] text-[18px] 3xl:text-[22px] ${isTruncated ? "hover:overflow-visible hover:animate-rtlMarquee" : ""
            }`}
        >
          {item.title}
        </p>
      </Link>
      <Link
        className="w-[95%] mt-[-20px] text-textGray dark:text-lightGray"
        href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}/${item.slug}`}
      >
        <p className=" text-[12px] 3xl:text-[16px] line-clamp-2 overflow-hidden">
          {stripHTML(item.description)}
        </p>
      </Link>



      <div className="w-[95%] pb-2 flex flex-row justify-between items-center">
        <Link href={`/${params.lang}/citizen/${item.creator.code}`} target="_blank">
          <div className="flex flex-row justify-start items-center gap-2">
            <Image
              src={item.creator.image}
              alt={item.creator.code}
              width={100}
              height={100}
              loading="lazy"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <span className="text-blueLink text-[14px] 3xl:text-[18px] font-medium uppercase">
              {item.creator.code}
            </span>
          </div>
        </Link>
        <div className="flex flex-row justify-start items-center gap-5">
                    <div className="flex items-center gap-[5px]">
            <span className="font-azarMehr text-gray dark:text-dark-gray text-[13px] 3xl:text-[18px]">
              {formatNumber(item.likes_count)}
            </span>
             <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px]" />
          </div>
          <div className="flex items-center gap-[5px]">
            <span className="font-azarMehr text-gray dark:text-dark-gray text-[13px] 3xl:text-[18px]">
              {formatNumber(item.dislikes_count)}
            </span>
           <Dislike className="stroke-gray dark:stroke-dark-gray stroke-2" />
          </div>

          <div className="flex items-center gap-[5px]">
            <span className="font-azarMehr text-gray dark:text-dark-gray text-[13px] 3xl:text-[18px]">
              {formatNumber(item.views_count)}
            </span>
            <View className="stroke-gray dark:stroke-dark-gray stroke-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
