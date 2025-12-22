"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/svgs";
import { Dislike, Like, View, Video } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import Image from "next/image";
import Link from "next/link";

// تعریف نوع برای params
interface Params {
  lang: "fa" | "en"; // محدود کردن lang به fa یا en
}

// تعریف نوع برای staticData
interface NewsItem {
  title: { fa: string; en: string };
  desc: { fa: string; en: string };
  url: string;
  date: { fa: string; en: string };
}

const LastNews = ({ mainData, params }: { mainData: any; params: Params }) => {
  const staticData: NewsItem[] = [
    {
      title: {
        fa: "کسب درآمد از اولین متاورس ایران متاورس رنگ، فرصتی نوین برای کارآفرینان دیجیتال",
        en: "Earning Income from Iran's First Metaverse, Rang Metaverse, a New Opportunity for Digital Entrepreneurs",
      },
      desc: {
        fa: "در حال حاضر هیچ قانونی وجود ندارد که به طور خاص متاورس یا سایر دنیای مجازی را تنظیم کند. با این حال، همان قوانین کلی که در مورد اینترنت اعمال می‌شود، در مورد متاورس نیز اعمال می‌شود، از جمله قانون کپی‌رایت، قانون افترا، قانون قرارداد و غیره.",
        en: "Currently, there is no specific law regulating the metaverse or other virtual worlds. However, the general laws that apply to the internet also apply to the metaverse, including copyright law, defamation law, contract law, and more.",
      },
      url: "https://meta.irpsc.com/2024/07/12/earning-income-from-the-first-metaverse-iran-metaverse-rang/",
      date: {
        fa: "22/تیر/1403",
        en: "12/July/2024",
      },
    },
    {
      title: {
        fa: "بازپس‌گیری جزیره آریانا در اولین متاورس ایران متاورس رنگ با اهدای 963 قطعه زمین(VOD) رایگان به ارزش 50371200000 ریال",
        en: "Reclaiming Ariana Island in Iran's First Metaverse, Rang Metaverse, with 963 Free VOD Land Plots Worth 50,371,200,000 Rials",
      },
      desc: {
        fa: "فضای مجازی ممکن است جملات زیادی از زبان مدیران اجرایی مانند مارک زاکربرگ یا ساتیا نادلا در مورد متاورس شنیده باشید. متاورس آینده اینترنت است.",
        en: "You may have heard many statements from executives like Mark Zuckerberg or Satya Nadella about the metaverse. The metaverse is the future of the internet.",
      },
      url: "https://meta.irpsc.com/2024/07/17/reclaiming-ariana-island-in-irans-first-metaverse/",
      date: {
        fa: "27/تیر/1403",
        en: "17/July/2024",
      },
    },
    {
      title: {
        fa: "VOD تجاری دارای بنا چیست؟ | متاورس",
        en: "What is a Commercial VOD with a Building? | Metaverse",
      },
      desc: {
        fa: "متاورس رنگ اولین متاورس ایران با هدف توسعه تاورس ملی اهداف زیادی از قبیل عدم خروج ارز از کشور و در فازهای بعدی ورود ارز به کشور را دارد که این‌ها همه بخشی کوچکی از اهداف متاورس ملی می‌باشد.",
        en: "Rang Metaverse, Iran's first metaverse, aims to develop a national metaverse with goals such as preventing currency outflow and, in later phases, bringing currency into the country, which is just a small part of the national metaverse's objectives.",
      },
      url: "https://video.irpsc.com/watch/F2x6VMfXJK8xhhT",
      date: {
        fa: "6/مرداد/1403",
        en: "27/July/2024",
      },
    },
  ];

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {findByUniqueId(mainData, 494)}
        </p>
        <a href="https://metatimes.ir/" target="_blank">
          <div className="flex justify-center items-center gap-4">
            <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
              {findByUniqueId(mainData, 171)}
            </p>
            <ArrowRight
              className={`dark:stroke-white stroke-black rotate-180 w-[24px] h-full ${params.lang === "en" ? "ltr:rotate-0" : ""}`}
            />
          </div>
        </a>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-10 mt-4 md:mt-12">
        {staticData.map((item, index) => {
          const titleRef = useRef<HTMLHeadingElement>(null);
          const [isTruncated, setIsTruncated] = useState(false);

          const checkTruncation = () => {
            const el = titleRef.current;
            if (el) {
              setIsTruncated(el.scrollWidth > el.clientWidth);
            }
          };

          useEffect(() => {
            checkTruncation();
            const observer = new ResizeObserver(checkTruncation);
            if (titleRef.current) {
              observer.observe(titleRef.current);
            }
            return () => {
              observer.disconnect();
            };
          }, [item.title[params.lang]]);

          return (
            <div
              key={index}
              className="w-[100%] min-h-[240px] base-transition-1 shadow-md hover:shadow-xl hover:dark:shadow-dark rounded-[20px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center overflow-hidden"
            >
              <div className="w-full flex flex-col justify-center items-center max-h-[265px] overflow-hidden">
                <Link
                  href={item.url}
                  className="group w-full rounded-t-[10px] flex relative"
                >
                  <Image
                    src={`/firstpage/static-news-${index}.webp` || "/rafiki-dark.png"}
                    alt={params.lang === "fa" ? "آخرین اخبار" : "latest news"}
                    width={380}
                    height={375}
                    loading="lazy"
                    quality={75}
                    className="w-full h-full transition-all duration-150 ease-in-out rounded-t-[10px] object-contain bg-cover"
                  />
                  <div className="w-full h-full  absolute z-0 top-0 flex justify-center items-center rounded-t-[10px]">
                    <div className="w-fit hover:scale-105 duration-100 rounded-full bg-white/30 dark:bg-black/35 flex items-center justify-center p-5">
                      <Video width={40} height={40} />
                    </div>
                  </div>
                </Link>
              </div>

              <div className="py-3 px-3 flex flex-col justify-between gap-5 w-full">
                <div className="w-[95%] flex flex-row justify-start items-center gap-1 mt-[-20px]">
                  <p className="text-start text-gray dark:text-dark-gray font-medium font-azarMehr text-[13px] 3xl:text-[16px] cursor-pointer hover:text-blueLink hover:dark:text-dark-yellow">
                    {item.date[params.lang]}
                  </p>
                </div>

                <a className="w-[95%] mt-[-10px] "  href={item.url}>
                  <h4
                    ref={titleRef}
                    className={`text-start w-full font-azarMehr truncate cursor-pointer font-bold text-[18px] xl:text-[20px] 3xl:text-[22px] dark:text-white text-gray ${
                      isTruncated ? "hover:overflow-visible hover:animate-rtlMarquee ltr:hover:animate-ltrMarquee " : ""
                    }`}
                  >
                    {item.title[params.lang]}
                  </h4>
                  <p className="line-clamp-2 text-darkGray dark:text-lightGray">
                    {item.desc[params.lang]}
                  </p>
                </a>

                <div className="w-full flex flex-row justify-between items-center">
                  <Link href={`/${params.lang}/citizen/hm-2000003`} target="_blank">
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Image
                        src="/firstpage/alizadeh.webp"
                        alt={params.lang === "fa" ? "تصویر شهروند" : "citizen image"}
                        width={1000}
                        height={1000}
                        loading="lazy"
                        className="w-[45px] h-[45px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
                      />
                      <span className="text-blueLink cursor-pointer text-[14px] 3xl:text-[18px] whitespace-nowrap font-medium  uppercase">
                        HM-2000003
                      </span>
                    </div>
                  </Link>
                  <div className="flex flex-row justify-end items-center gap-4 md:gap-3 xl:gap-2 3xl:gap-5">
                    <span className="flex items-center gap-2 xl:gap-1 3xl:gap-2">
                      <span className="whitespace-nowrap font-azarMehr font-normal xl:text-sm 3xl:text-[18px] text-gray dark:text-dark-gray">
                        125
                      </span>
                      <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px] xl:h-[14px] xl:w-[14px] 3xl:w-[18px] 3xl:h-[18px]" />
                    </span>
                    <span className="flex items-center gap-2 xl:gap-1 3xl:gap-2">
                      <span className="whitespace-nowrap font-azarMehr font-normal xl:text-sm 3xl:text-[18px] text-gray dark:text-dark-gray">
                        10
                      </span>
                      <Dislike className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px] xl:h-[14px] xl:w-[14px] 3xl:w-[18px] 3xl:h-[18px]" />
                    </span>
                    <span className="flex items-center gap-2 xl:gap-1 3xl:gap-2">
                      <span className="whitespace-nowrap font-azarMehr font-normal xl:text-sm 3xl:text-[18px] text-gray dark:text-dark-gray">
                        610
                      </span>
                      <View className="stroke-gray dark:stroke-dark-gray stroke-2 ms-1 w-[18px] h-[18px] xl:h-[14px] xl:w-[14px] 3xl:w-[18px] 3xl:h-[18px]" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LastNews;