"use client";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import GemImage from "@/components/templates/citizen/gemImage";
import Link from "next/link";
import { Text } from "../svgs/SvgEducation";
import LockGem from '@/public/Frame1000003193.png';
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { useId } from "react";
import LevelBadge from "./LevelBadge";  // فرض می‌کنیم این کامپوننت جداگانه ساخته شده

export default function UserCard({
  item,
  params,
  buttonText,
  minWidth,
  scoreElement,
  hidePreviousLevels,
  mainData,
  activeBtnId,
  setActiveBtnId,
}: any) {
  const [urlForGem, setUrlForGem] = useState<string | undefined>(undefined);
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

  const router = useRouter();
  const isLoading = activeBtnId === item.code;
  const [linkLoading, setLinkLoading] = useState(false);

  const handleButtonClick = () => {
    if (isLoading) return;
    setActiveBtnId(item.code);
    router.push(`/${params.lang}/citizens/${item.code.toLowerCase()}`);
  };

  const uid = useId();
  const nameRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (nameRef.current) {
        setIsTruncated(nameRef.current.scrollWidth > nameRef.current.clientWidth);
      }
    };
    checkTruncation();
    const observer = new ResizeObserver(checkTruncation);
    if (nameRef.current) observer.observe(nameRef.current);
    return () => observer.disconnect();
  }, [item.name]);

  const totalGems = 13;
  const previousGems = item.levels?.previous || [];
  const currentGem = item.levels?.current;

  // محاسبه urlForGem – پشتیبانی همزمان از slug و id
  useEffect(() => {
    if (!currentGem) {
      setUrlForGem(undefined);
      return;
    }

    let matchedRouteName: string | undefined;

    // اولویت ۱: slug رشته‌ای آماده (حالت جدید)
    if (
      currentGem.slug &&
      typeof currentGem.slug === "string" &&
      currentGem.slug.includes("-baguette")
    ) {
      const found = staticRouteNames.find((r) => r.route_name === currentGem.slug);
      if (found) matchedRouteName = found.route_name;
    }

    // اولویت ۲: اگر slug نبود → از id استفاده کن (حالت قدیمی)
    if (!matchedRouteName && currentGem.id != null) {
      const idNum = Number(currentGem.id);
      if (!isNaN(idNum)) {
        const found = staticRouteNames.find((r) => r.id === idNum);
        if (found) matchedRouteName = found.route_name;
      }
    }

    setUrlForGem(matchedRouteName);

    // دیباگ (بعد از تست می‌تونی حذف کنی)
    console.log("currentGem در UserCard:", currentGem);
    console.log("urlForGem نهایی:", matchedRouteName);
  }, [currentGem]);

  // فیلتر و مرتب‌سازی جواهرات
  const uniquePreviousGems = previousGems.filter(
    (gem: { slug: any }) => gem.slug !== currentGem?.slug
  );

  const sortedPreviousGems = [...uniquePreviousGems].sort((a, b) => {
    const indexA = staticRouteNames.findIndex((route) => route.id === a.id);
    const indexB = staticRouteNames.findIndex((route) => route.id === b.id);
    return indexA - indexB;
  });

  const displayGems = currentGem ? [...sortedPreviousGems, currentGem] : sortedPreviousGems;
  const remainingGemsCount = totalGems - displayGems.length;

  // تابع محاسبه نام لیبل – پشتیبانی همزمان از slug و id
  const getRouteName = (gem: any, lang: string) => {
    if (!gem) {
      return lang === "fa" ? "تازه وارد" : "Newcomer";
    }

    // فارسی همیشه نام اصلی
    if (lang === "fa") {
      return gem.name || "تازه وارد";
    }

    // انگلیسی: اولویت با slug، بعد id
    let base = "";

    if (gem.slug && typeof gem.slug === "string" && gem.slug.includes("-baguette")) {
      base = gem.slug.split("-baguette")[0];
    } else if (gem.id != null) {
      const idNum = Number(gem.id);
      if (!isNaN(idNum)) {
        const found = staticRouteNames.find((r) => r.id === idNum);
        if (found) {
          base = found.route_name.split("-")[0];
        }
      }
    }

    if (base) {
      return base.charAt(0).toUpperCase() + base.slice(1);
    }

    return gem.name || "Newcomer";
  };

  return (
    <div className={`px-2 !max-w-[281px]`} style={minWidth ? { width: minWidth, minWidth } : {}}>
      <div
        className={`${
          linkLoading
            ? "!cursor-not-allowed group scale-105 base-transition-1 bg-white dark:bg-[#1A1A18] !border-[#0066FF] dark:!border-[#FFC700] glow-svg !pointer-events-none"
            : "hover:border-[#0066FF] hover:bg-white dark:hover:bg-[#1A1A18] dark:hover:border-[#FFC700] hover:shadow-[0_0px_20px_rgba(0,102,255,0.4)] dark:hover:shadow-[0_0px_35px_-12px_rgba(255,199,0,9)]"
        } group hover:scale-105 base-transition-1 shadow-lg mt-10 relative bg-[#fff] dark:bg-[#1A1A18] flex flex-col justify-between gap-3 py-3 sm:py-4 md:py-5 items-center rounded-[20px] border-transparent border border-solid`}
      >
        <figure className="w-[120px] h-[120px] relative overflow-hidden rounded-full mt-10">
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
            className={`font-bold text-[20px] dark:text-white font-azarMehr sm:mt-2 truncate w-full text-center ps-3 ${
              isTruncated ? "hover:overflow-visible hover:animate-rtlMarquee" : ""
            }`}
          >
            {item.name}{" "}
            {item.code &&
              ["hm-2000001", "hm-2000002"].includes(item.code.trim()) && (
                <span className="mt-[-2px] mx-1 text-xs font-medium text-blue-600 dark:text-yellow-400 bg-blue-50 dark:bg-yellow-900/20 px-3 py-[2px] rounded-full">
                  {findByUniqueId(mainData, 1593) || "بنیان گذار"}
                </span>
              )}
          </p>
        </div>

        <div className="flex items-center gap-4 justify-center">
          <Link
            onClick={(e) => {
              e.preventDefault();
              setLinkLoading(true);
              setTimeout(() => {
                router.push(`/${params.lang}/citizens/${item.code}`);
              }, 300);
            }}
            className={`min-h-[30px] uppercase text-blueLink dark:text-blue-500 accumulating font-azarMehr text-[16px] cursor-pointer ${
              linkLoading ? "!cursor-not-allowed" : ""
            }`}
            href={`/${params.lang}/citizens/${item.code}`}
            title={`Go to citizen ${item.code}`}
            aria-label={`Go to citizen ${item.code}`}
          >
            {item.code}
          </Link>
        </div>

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

        <button
          aria-label="citizen information"
          onClick={handleButtonClick}
          disabled={isLoading}
          className={`w-[80%] ${isLoading ? "rotating-border cursor-not-allowed" : ""} p-[1px] bg-transparent`}
        >
          <div className="w-full h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-3 sm:px-6 rounded-[10px] flex flex-row justify-between items-center relative z-10">
            <span
              className={`transition-opacity text-blueLink dark:text-dark-yellow font-azarMehr font-medium text-[14px] ${
                isLoading ? "opacity-70" : "opacity-100"
              }`}
            >
              {buttonText}
            </span>
            <Text className="h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
          </div>
        </button>

        {/* کامپوننت جداگانه برای نشانگر سطح */}
        <LevelBadge
          currentGem={currentGem}
          lang={params.lang}
          urlForGem={urlForGem}
          setLinkLoading={setLinkLoading}
          uid={uid}
        />
      </div>
    </div>
  );
}