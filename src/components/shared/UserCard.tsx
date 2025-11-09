"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import GemImage from "@/components/templates/citizen/gemImage";
import Link from "next/link";
import { Text } from "../svgs/SvgEducation";
import LockGem from '@/public/Frame1000003193.png';

export default function UserCard({ item, params, buttonText, minWidth, scoreElement, hidePreviousLevels }: any) {
  const staticRouteNames = [
    { id: 1, route_name: "citizen-baguette" },
    { id: 2, route_name: "reporter-baguette" },
    { id: 3, route_name: "participation-baguette" },
    { id: 4, route_name: "developer-baguette" },
    { id: 5, route_name: "inspector-baguette" },
    { id: 6, route_name: "businessman-baguette" },
    { id: 7, route_name: "lawyer-baguette" },
    { id: 8, route_name: "city-council-baguette" },
    { id: 9, route_name: "the-mayor-baguette" },
    { id: 10, route_name: "governor-baguette" },
    { id: 11, route_name: "minister-baguette" },
    { id: 12, route_name: "judge-baguette" },
    { id: 13, route_name: "legislator-baguette" },
  ];

  // isTruncated برای اسم کاربر
  const nameRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const checkTruncation = () => {
    const el = nameRef.current;
    if (el) setIsTruncated(el.scrollWidth > el.clientWidth);
  };

  useEffect(() => {
    checkTruncation();
    const observer = new ResizeObserver(() => {
      checkTruncation();
    });
    if (nameRef.current) observer.observe(nameRef.current);
    return () => observer.disconnect();
  }, [item.name]);

  // تعداد کل جواهرها
  const totalGems = 13;

  // مرتب‌سازی لول‌ها و حذف تکراری‌ها
  const previousGems = item.levels?.previous || [];
  const currentGem = item.levels?.current;

  // حذف لول فعلی از آرایه قبلی‌ها (اگر موجود است)
  const uniquePreviousGems = previousGems.filter((gem: { slug: any; }) => gem.slug !== currentGem?.slug);

  // مرتب‌سازی قبلی‌ها طبق staticRouteNames
  const sortedPreviousGems = [...uniquePreviousGems].sort((a, b) => {
    const indexA = staticRouteNames.findIndex(route => route.id === a.id);
    const indexB = staticRouteNames.findIndex(route => route.id === b.id);
    return indexA - indexB;
  });

  // آرایه نهایی برای نمایش: قبلی‌ها + فعلی در انتها
  const displayGems = currentGem ? [...sortedPreviousGems, currentGem] : sortedPreviousGems;
  const remainingGemsCount = totalGems - displayGems.length;

  const getRouteName = (id: number, lang: string, name: string, staticRouteNames: any[]) => {
    if (lang === "fa") return name;
    const found = staticRouteNames.find(r => r.id === id);
    return found?.route_name.split("-")[0] || name;
  };

  return (
    <div
      className={`hover:scale-105 base-transition-1 px-2 !max-w-[281px]`}
      style={minWidth ? { width: minWidth, minWidth: minWidth } : {}}
    >
      <div
        className={`shadow-lg mt-10 relative bg-[#fff] dark:bg-[#1A1A18] flex flex-col justify-between gap-3 py-3 sm:py-4 md:py-5 items-center rounded-[20px] border-transparent border border-solid hover:border-[#0066FF] hover:bg-white dark:hover:bg-[#1A1A18] dark:hover:border-[#FFC700] hover:shadow-[0_0px_20px_rgba(0,0,0,0.45)] dark:hover:shadow-[0_0px_33px_-11px_rgba(255,255,255,255.9)]`}
      >
        <figure className="w-[120px] h-[120px] relative overflow-hidden rounded-full">
          <Image
            src={item.profile_photo || "/firstpage/temp-1.webp"}
            alt="citizen image"
            fill
            loading="lazy"
            sizes="120px"
            quality={100}
            className="object-cover shadow-md transition-all duration-300 shadow-gray"
          />
        </figure>

        <div className="w-full overflow-x-hidden">
          <p
            ref={nameRef}
            className={`font-bold text-[20px] dark:text-white font-azarMehr sm:mt-2 truncate w-full text-center ps-3 ${isTruncated ? "hover:overflow-visible hover:animate-rtlMarquee" : ""}`}
          >
            {item.name}
          </p>
        </div>

        <Link
          className="min-h-[30px] uppercase text-blueLink dark:text-blue-500 accumulating font-azarMehr text-[16px] cursor-pointer"
          href={`/${params.lang}/citizens/${item.code}`}
          title={`Go to citizen ${item.code}`}
          aria-label={`Go to citizen ${item.code}`}
        >
          {item.code}
        </Link>

        <span className="dark:text-[#969696] text-[18px] font-azarMehr">
          {currentGem
            ? getRouteName(currentGem.id, params.lang, currentGem.name, staticRouteNames)
            : params.lang === "fa"
            ? "تازه وارد"
            : "Newcomer"}
        </span>

        {scoreElement}

        {!hidePreviousLevels && (
          <div className="w-full min-h-[75px] pb-2">
            <div className="w-full flex flex-wrap justify-center">
              {displayGems.map((gem: any) => (
                <GemImage key={`gem-${gem.slug}`} item={gem} params={params} picSize={33} />
              ))}
              {Array.from({ length: remainingGemsCount }).map((_, index) => (
                <Image
                  key={`lock-${index}`}
                  src={LockGem}
                  alt="Locked Gem"
                  width={33}
                  height={33}
                  loading="lazy"
                  className="w-[33px] h-[33px]"
                />
              ))}
            </div>
          </div>
        )}

        <Link href={`/${params.lang}/citizens/${item.code}`} className="w-[80%]">
          <div className="w-full h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-3 sm:px-6 rounded-[10px] flex flex-row justify-between items-center">
            <span className="text-blueLink dark:text-dark-yellow font-azarMehr font-medium text-[14px]">
              {buttonText}
            </span>
            <Text className="h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
          </div>
        </Link>
      </div>
    </div>
  );
}
