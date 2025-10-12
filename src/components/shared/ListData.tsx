import { useEffect, useRef, useState } from "react";
import randomcolor from "randomcolor";
import Link from "next/link";
import Image from "next/image";

import { Videos, Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";

// SafeImage با Optimization + Skeleton + Fallback
function SafeImage({
  src,
  alt,
  className,
  fallback = "/rafiki-dark.png", // تصویر fallback
}: {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative w-full h-full rounded-[8px] overflow-hidden">
      {/* Skeleton / Pulse */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
      )}

      {!isError ? (
        <Image
          src={src || fallback}
          alt={alt}
          fill
          className={`${className} ${!isLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          onLoadingComplete={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-400">
          <Image src={fallback} alt="fallback" fill className="object-cover" />
        </div>
      )}
    </div>
  );
}

export default function ListData({ nameComponent, data, params }: any) {
  const [colors, setColors] = useState<string[]>([]);
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [truncatedIndexes, setTruncatedIndexes] = useState<number[]>([]);

  useEffect(() => {
    if (data?.subcategories) {
      const newColors = data.subcategories.map(() =>
        randomcolor({
          format: "rgba",
          alpha: 0.1,
          luminosity: "bright",
        })
      );
      setColors(newColors);
    }
  }, [data]);

  useEffect(() => {
    if (!data?.subcategories) return;

    const observer = new ResizeObserver(() => {
      const newTruncated: number[] = [];
      titleRefs.current.forEach((el, i) => {
        if (el && el.scrollWidth > el.clientWidth) {
          const shift = el.scrollWidth - el.clientWidth;
          el.style.setProperty("--marquee-shift", `${shift}px`);
          const duration = Math.max(5, Math.floor(shift / 50));
          el.style.setProperty("--marquee-duration", `${duration}s`);
          newTruncated.push(i);
        }
      });
      setTruncatedIndexes(newTruncated);
    });

    titleRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data]);

  const safeImage = (url: string | undefined) => {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      return parsed.href;
    } catch {
      return "";
    }
  };

  return (
    <>
      {data &&
        data.subcategories?.map((item: any, index: number) => {
          const href =
            nameComponent === "categories"
              ? `/${params.lang}/education/category/${item.slug}`
              : `/${params.lang}/education/category/${decodeURIComponent(
                  params.category
                )}/${item.slug}`;

          const isTruncated = truncatedIndexes.includes(index);

          return (
            <Link
              href={href}
              key={item.id}
              className="w-full min-h-[240px] cursor-pointer shadow-md hover:shadow-xl hover:dark:shadow-dark rounded-[12px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-2 items-center"
            >
              {/* تصویر */}
              <div className="group w-full relative px-4 pt-4 overflow-hidden ">
                <div className="relative w-full h-[250px]">
                  <SafeImage
                    src={safeImage(item.image)}
                    alt={"pic " + item.name}
                    className="object-cover brightness-75"
                  />
                </div>
              </div>

              {/* متن با انیمیشن */}
              <div className="w-full overflow-x-hidden pt-3">
                <p
                  ref={(el) => (titleRefs.current[index] = el)}
                  className={`text-center w-full font-azarMehr truncate cursor-pointer font-bold text-[16px] 2xl:text-xl dark:text-white text-black px-5 whitespace-nowrap ${
                    isTruncated
                      ? "hover:overflow-visible hover:animate-rtlMarquee"
                      : ""
                  }`}
                >
                  {item.name}
                </p>
              </div>

              {/* توضیحات */}
              <p
                className="text-center dark:text-[#868B90] line-clamp-2 px-4 text-[#656565] text-xs md:text-sm"
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></p>

              {/* بخش پایین */}
              <div className="w-full mt-2 flex flex-row justify-between items-center px-5 ">
                <div className="flex flex-row justify-evenly items-center w-full h-fit py-3 border border-x-0 border-b-0 border-solid border-[#D9D9D9] dark:border-[#434343]">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Videos className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray " />
                    <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                      {formatNumber(item.videos_count)}
                    </span>
                  </div>
                  <hr className="h-[28px] border-l-0 border-y-0 border-solid border-[#D9D9D9] dark:border-[#434343]" />
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Like className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray" />
                    <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                      {formatNumber(item.likes_count)}
                    </span>
                  </div>
                  <hr className="h-[28px] border-l-0 border-y-0 border-solid border-[#D9D9D9] dark:border-[#434343]" />
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Dislike className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray" />
                    <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                      {formatNumber(item.dislikes_count)}
                    </span>
                  </div>
                  <hr className="h-[28px] border-l-0 border-y-0 border-solid border-[#D9D9D9] dark:border-[#434343]" />
                  <div className="flex flex-row items-center justify-center gap-3">
                    <View className="w-[18px] h-[18px] stroke-gray dark:stroke-dark-gray" />
                    <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-dark-gray">
                      {formatNumber(item.views_count)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center ">
                <span className="bg-light-primary dark:bg-dark-yellow text-white  px-7 py-3 mb-4 rounded-[10px] dark:text-black font-light hover:cursor-pointer text-sm">
                  مشاهده ویدیو
                </span>
              </div>
            </Link>
          );
        })}
    </>
  );
}
