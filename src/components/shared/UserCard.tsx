"use client";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import GemImage from "@/components/templates/citizen/gemImage";
import Link from "next/link";
import { Text } from "../svgs/SvgEducation";
import LockGem from '@/public/Frame1000003193.png';
// import { Like } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { useId } from "react";
export default function UserCard({ item, params, buttonText, minWidth, scoreElement, hidePreviousLevels, mainData, activeBtnId,
  setActiveBtnId, }: any) {
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
    // اگر همون دکمه دوباره کلیک شد، کاری نکن
    if (isLoading) return;

    // دکمه‌های قبلی خاموش می‌شن
    setActiveBtnId(item.code);

    router.push(`/${params.lang}/citizens/${item.code.toLowerCase()}`);
  };




  const uid = useId();
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
  useEffect(() => {
    const curId = currentGem?.id ?? currentGem?.slug ?? null;
    const matchedRoute = staticRouteNames.find((x) => {
      if (curId == null) return false;
      return x.id === Number(curId);
    })?.route_name;
    setUrlForGem(matchedRoute);
  }, [currentGem]);

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
      className={`  px-2 !max-w-[281px] `}
      style={minWidth ? { width: minWidth, minWidth: minWidth } : {}}
    >
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
      <div
        className={`group hover:scale-105 base-transition-1 shadow-lg  mt-10 relative bg-[#fff] dark:bg-[#1A1A18] flex flex-col justify-between gap-3 py-3 sm:py-4 md:py-5 items-center rounded-[20px] border-transparent border border-solid hover:border-[#0066FF] hover:bg-white dark:hover:bg-[#1A1A18] dark:hover:border-[#FFC700] hover:shadow-[0_0px_20px_rgba(0,102,255,0.4)] dark:hover:shadow-[0_0px_35px_-12px_rgba(255,199,0,9)]`}
      >
        <figure className="w-[120px] h-[120px] relative overflow-hidden rounded-full mt-10 ">
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
            {item.name} {item.code && ["hm-2000001", "hm-2000002"].includes(item.code.trim()) && (
              <span className=" mt-[-2px] mx-1 text-xs font-medium text-blue-600 dark:text-yellow-400 bg-blue-50 dark:bg-yellow-900/20 px-3 py-[2px] rounded-full ">
                {findByUniqueId(mainData, 1593) || "بنیان گذار"}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-4 justify-center">
          {/* <div className="flex items-center gap-[5px]">
            <span className="font-azarMehr text-gray dark:text-dark-gray  md:text-base">
              {item.score}
            </span>
            <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[15px] h-[15px] mt-[-2px]" />
          </div> */}
          <Link onClickCapture={() => setLinkLoading(true)}
            className="min-h-[30px] uppercase text-blueLink dark:text-blue-500 accumulating font-azarMehr text-[16px] cursor-pointer"
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

        <button aria-label="citizen information"
          onClick={handleButtonClick}
          disabled={isLoading}
          className={`w-[80%] ${isLoading ? "rotating-border cursor-not-allowed" : ""} p-[1px] bg-transparent`}
        >
          <div className="w-full h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-3 sm:px-6 rounded-[10px] flex flex-row justify-between items-center relative z-10">
            <span
              className={` transition-opacity text-blueLink dark:text-dark-yellow font-azarMehr font-medium text-[14px] ${isLoading ? "opacity-70" : "opacity-100"
                }`}
            >
              {buttonText}
            </span>
            <Text className="h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
          </div>
        </button>




        <div className="absolute top-4 left-[-7px] group">
          {/* LIGHT – NORMAL */}
          <svg
            width={100}
            height={29}
            viewBox="0 0 100 29"
            fill="none"
            className="relative block dark:hidden group-hover:hidden"
          >
            <g clipPath={`url(#clip-${uid}-ln)`}>
              <path d="M0 2.0182V8.12H5.88235V0H0.987497C0.442242 0 0 0.903835 0 2.0182Z" fill={`url(#paint0-${uid}-ln)`} />
              <path d="M0 26.8548C0 28.0384 2.04025 29.0003 4.55074 29.0003H97.1356C98.9938 29.0003 100.329 28.1528 99.7826 27.3125L90.6356 17.3178L99.8963 6.10007C100.389 5.26688 99.062 4.44441 97.2266 4.44441H19.3406L4.619 4.46229C2.10851 4.46587 0.0682611 3.50394 0.0682611 2.32031L0 26.8548Z" fill={`url(#paint1-${uid}-ln)`} />
            </g>
            <defs>
              <linearGradient id={`paint0-${uid}-ln`} x1={-0.413825} y1={4.06181} x2={9.17874} y2={4.06181} gradientUnits="userSpaceOnUse">
                <stop stopColor="#A6A6A6" />
                <stop offset={0.99} stopColor="#5B5B5B" />
              </linearGradient>
              <linearGradient id={`paint1-${uid}-ln`} x1={-14.1176} y1={16.2403} x2={89.3916} y2={15.6456} gradientUnits="userSpaceOnUse">
                <stop stopColor="#AFAFAF" />
                <stop offset={1} stopColor="#E9E9E9" />
              </linearGradient>
              <clipPath id={`clip-${uid}-ln`}>
                <rect width={29} height={100} fill="white" transform="matrix(0 1 1 0 0 0)" />
              </clipPath>
            </defs>
            <foreignObject x="0" y="0" width="100" height="29">
              <Link onClickCapture={() => setLinkLoading(true)} href={`/${params.lang}/levels/citizen/${urlForGem}/general-info`}
                {...({ xmlns: "http://www.w3.org/1999/xhtml" } as any)}
                className="w-full h-full flex items-center justify-center text-xs font-azarMehr rtl:ms-1 ltr:me-1 mt-[1px] text-black text-center px-1 overflow-hidden break-words"
              >
                {currentGem
                  ? getRouteName(currentGem.id, params.lang, currentGem.name, staticRouteNames)
                  : params.lang === "fa"
                    ? "تازه وارد"
                    : "Newcomer"}
              </Link>
            </foreignObject>
          </svg>

          {/* LIGHT – HOVER */}
          <svg
            width={100}
            height={29}
            viewBox="0 0 100 29"
            fill="none"
            className="relative hidden dark:hidden dark:group-hover:hidden group-hover:block"
          >
            <g clipPath={`url(#clip-${uid}-lh)`}>
              <path d="M0 2.0182V8.12H5.88235V0H0.987497C0.442242 0 0 0.903835 0 2.0182Z" fill={`url(#paint0-${uid}-lh)`} />
              <path d="M0 26.8548C0 28.0384 2.04025 29.0003 4.55074 29.0003H97.1356C98.9938 29.0003 100.329 28.1528 99.7826 27.3125L90.6356 17.3178L99.8963 6.10007C100.389 5.26688 99.062 4.44441 97.2266 4.44441H19.3406L4.619 4.46229C2.10851 4.46587 0.0682611 3.50394 0.0682611 2.32031L0 26.8548Z" fill={`url(#paint1-${uid}-lh)`} />
            </g>
            <defs>
              <linearGradient id={`paint0-${uid}-lh`} x1={-0.413825} y1={4.06181} x2={9.17874} y2={4.06181} gradientUnits="userSpaceOnUse">
                <stop stopColor="#2C80FF" />
                <stop offset={0.99} stopColor="#001E4A" />
              </linearGradient>
              <linearGradient id={`paint1-${uid}-lh`} x1={-14.1176} y1={16.2403} x2={89.3916} y2={15.6456} gradientUnits="userSpaceOnUse">
                <stop stopColor="#0053CF" />
                <stop offset={1} stopColor="#65A3FF" />
              </linearGradient>
              <clipPath id={`clip-${uid}-lh`}>
                <rect width={29} height={100} fill="white" transform="matrix(0 1 1 0 0 0)" />
              </clipPath>
            </defs>
            <foreignObject x="0" y="0" width="100" height="29">
              <Link onClickCapture={() => setLinkLoading(true)} href={`/${params.lang}/levels/citizen/${urlForGem}/general-info`}
                {...({ xmlns: "http://www.w3.org/1999/xhtml" } as any)}
                className="w-full h-full flex items-center justify-center text-xs font-azarMehr rtl:ms-1 ltr:me-1 mt-[1px] text-white text-center px-1 overflow-hidden break-words"
              >
                {currentGem
                  ? getRouteName(currentGem.id, params.lang, currentGem.name, staticRouteNames)
                  : params.lang === "fa"
                    ? "تازه وارد"
                    : "Newcomer"}
              </Link>
            </foreignObject>
          </svg>

          {/* DARK – NORMAL */}
          <svg
            width={100}
            height={29}
            viewBox="0 0 100 29"
            fill="none"
            className="relative hidden dark:block group-hover:hidden"
          >
            <g clipPath={`url(#clip-${uid}-dn)`}>
              <path d="M0 2.0182V8.12H5.88235V0H0.987497C0.442242 0 0 0.903835 0 2.0182Z" fill={`url(#paint0-${uid}-dn)`} />
              <path d="M0 26.8548C0 28.0384 2.04025 29.0003 4.55074 29.0003H97.1356C98.9938 29.0003 100.329 28.1528 99.7826 27.3125L90.6356 17.3178L99.8963 6.10007C100.389 5.26688 99.062 4.44441 97.2266 4.44441H19.3406L4.619 4.46229C2.10851 4.46587 0.0682611 3.50394 0.0682611 2.32031L0 26.8548Z" fill={`url(#paint1-${uid}-dn)`} />
            </g>
            <defs>
              <linearGradient id={`paint0-${uid}-dn`} x1={-0.413825} y1={4.06181} x2={9.17874} y2={4.06181} gradientUnits="userSpaceOnUse">
                <stop stopColor="#1A1A18" />
                <stop offset={1} stopColor="#393939" />
              </linearGradient>
              <linearGradient id={`paint1-${uid}-dn`} x1={-14.1176} y1={16.2403} x2={89.3916} y2={15.6456} gradientUnits="userSpaceOnUse">
                <stop stopColor="#1A1A18" />
                <stop offset={1} stopColor="#393939" />
              </linearGradient>
              <clipPath id={`clip-${uid}-dn`}>
                <rect width={29} height={100} fill="white" transform="matrix(0 1 1 0 0 0)" />
              </clipPath>
            </defs>
            <foreignObject x="0" y="0" width="100" height="29">
              <Link onClickCapture={() => setLinkLoading(true)} href={`/${params.lang}/levels/citizen/${urlForGem}/general-info`}
                {...({ xmlns: "http://www.w3.org/1999/xhtml" } as any)}
                className="w-full h-full flex items-center justify-center text-xs font-azarMehr text-white rtl:ms-1 ltr:me-1 mt-[1px]  text-center px-1 overflow-hidden break-words"
              >
                {currentGem
                  ? getRouteName(currentGem.id, params.lang, currentGem.name, staticRouteNames)
                  : params.lang === "fa"
                    ? "تازه وارد"
                    : "Newcomer"}
              </Link>
            </foreignObject>
          </svg>

          {/* DARK – HOVER */}
          <svg
            width={100}
            height={29}
            viewBox="0 0 100 29"
            fill="none"
            className="relative hidden dark:group-hover:block"
          >
            <g clipPath={`url(#clip-dark-${uid})`}>
              <path
                d="M0 2.0182V8.12H5.88235V0H0.987497C0.442242 0 0 0.903835 0 2.0182Z"
                fill={`url(#paint0-dark-${uid})`}
              />
              <path
                d="M0 26.8548C0 28.0384 2.04025 29.0003 4.55074 29.0003H97.1356C98.9938 29.0003 100.329 28.1528 99.7826 27.3125L90.6356 17.3178L99.8963 6.10007C100.389 5.26688 99.062 4.44441 97.2266 4.44441H19.3406L4.619 4.46229C2.10851 4.46587 0.0682611 3.50394 0.0682611 2.32031L0 26.8548Z"
                fill={`url(#paint1-dark-${uid})`}
              />
            </g>

            <defs>
              {/* ----------- گرادیانت دقیق بدون هیچ تغییر ----------- */}
              <linearGradient
                id={`paint0-dark-${uid}`}
                x1="-0.413825"
                y1="4.06181"
                x2="9.17874"
                y2="4.06181"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFD232" />
                <stop offset="0.99" stopColor="#2D2302" />
              </linearGradient>

              <linearGradient
                id={`paint1-dark-${uid}`}
                x1="-14.1176"
                y1="16.2403"
                x2="89.3916"
                y2="15.6456"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#CDA000" />
                <stop offset="1" stopColor="#FFCE1F" />
              </linearGradient>

              {/* ----------- clipPath داینامیک ----------- */}
              <clipPath id={`clip-dark-${uid}`}>
                <rect
                  width="29"
                  height="100"
                  fill="white"
                  transform="matrix(0 1 1 0 0 0)"
                />
              </clipPath>
            </defs>
            <foreignObject x="0" y="0" width="100" height="29">
              <Link onClickCapture={() => setLinkLoading(true)} href={`/${params.lang}/levels/citizen/${urlForGem}/general-info`}
                {...({ xmlns: "http://www.w3.org/1999/xhtml" } as any)}
                className="w-full h-full flex items-center justify-center text-xs font-azarMehr text-white dark:text-black text-center rtl:ms-1 ltr:me-1 mt-[1px] overflow-hidden break-words"
              >
                {currentGem
                  ? getRouteName(currentGem.id, params.lang, currentGem.name, staticRouteNames)
                  : params.lang === "fa"
                    ? "تازه وارد"
                    : "Newcomer"}
              </Link>
            </foreignObject>
          </svg>

          {/* TEXT LABEL */}

        </div>
      </div>

    </div>
  );
}
