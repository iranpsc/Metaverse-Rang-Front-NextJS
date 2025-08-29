"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/svgs";
import { Dislike, Like, View, Video } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import Image from "next/image";
import Link from "next/link";


interface Params {
  lang: "fa" | "en";
}

interface EducationItem {
  title: { fa: string; en: string };
  desc: { fa: string; en: string };
  url: string;
  categories: { fa: string; en: string };
}

const EducationFirstPage = ({ mainData, params }: { mainData: any; params: Params }) => {
  const staticData: EducationItem[] = [
    {
      title: {
        fa: "ورود به متاورس ایرانی چگونه است؟ | متاورس",
        en: "How to Enter the Iranian Metaverse? | Metaverse",
      },
      desc: {
        fa: "در حال حاضر هیچ قانونی conversão para a imagem completa: قانون کپی‌رایت، قانون افترا، قانون قرارداد و غیره وجود ندارد. با این حال، همان قوانین کلی که در مورد اینترنت اعمال می‌شود، در مورد متاورس نیز اعمال می‌شود.",
        en: "Currently, there is no specific law regulating the metaverse or other virtual worlds. However, the general laws that apply to the internet also apply to the metaverse, including copyright law, defamation law, contract law, and more.",
      },
      url: "https://video.irpsc.com/watch/SyNzKDuIfWvYfJX",
      categories: {
        fa: "متاورس رنگ",
        en: "Rang Metaverse",
      },
    },
    {
      title: {
        fa: "خانواده در متاورس چه تعریفی دارد؟",
        en: "What is the Definition of Family in the Metaverse?",
      },
      desc: {
        fa: "فضای مجازی ممکن است جملات زیادی از زبان مدیران اجرایی مانند مارک زاکربرگ یا ساتیا نادلا در مورد متاورس شنیده باشید. متاورس آینده اینترنت است.",
        en: "You may have heard many statements from executives like Mark Zuckerberg or Satya Nadella about the metaverse. The metaverse is the future of the internet.",
      },
      url: "https://video.irpsc.com/watch/QoIGOoEJFpwpYKC",
      categories: {
        fa: "متاورس رنگ",
        en: "Rang Metaverse",
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
      categories: {
        fa: "متاورس رنگ",
        en: "Rang Metaverse",
      },
    },
  ];

  // تعیین جهت بر اساس زبان
  const direction = params.lang === "fa" ? "rtl" : "ltr";

  return (
    <div >
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {findByUniqueId(mainData, 1462)}
        </p>
        <a href="https://video.irpsc.com/videos/category/1036?page_id=1" target="_blank">
          <div className="flex justify-center items-center gap-4">
            <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
              {findByUniqueId(mainData, 171)}
            </p>
            <ArrowRight
              className={`dark:stroke-white stroke-black w-[24px] h-full ${direction === "rtl" ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </a>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-10 mt-6 md:mt-12">
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
              className="w-full shadow-md rounded-[20px] overflow-hidden bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center"
            >
              <div className="w-full flex flex-col justify-center items-center max-h-[265px] overflow-hidden">
                <Link
                  href={item.url}
                  className="group w-full rounded-t-[10px] relative"
                  aria-label={params.lang === "fa" ? "آموزش" : "education"}
                >
                  <Image
                    src={`/firstpage/static-education-${index}.webp`}
                    alt={params.lang === "fa" ? "تصویر آموزشی" : "education pic"}
                    width={500}
                    height={357}
                    quality={75}
                    loading="lazy"
                    className="w-full h-full rounded-t-[10px] object-cover"
                  />
                </Link>
              </div>

              <div className="py-3 px-3 flex flex-col justify-between gap-5 w-full">
                <div className="w-[95%] flex flex-row justify-start items-center gap-1 mt-[-20px]">
                  <p className="text-gray dark:text-dark-gray font-medium font-azarMehr text-[13px] 3xl:text-[16px] cursor-pointer hover:text-blueLink hover:dark:text-dark-yellow">
                    {item.categories[params.lang]}
                  </p>
                </div>

                <a className="w-[95%] mt-[-10px]" href={item.url}>
                  <h4
                    ref={titleRef}
                    className={`w-full font-azarMehr truncate cursor-pointer font-bold text-[18px] xl:text-[20px] 3xl:text-[22px] dark:text-white text-gray ${
                      isTruncated
                        ? direction === "rtl"
                          ? "hover:overflow-visible hover:animate-rtlMarquee"
                          : "hover:overflow-visible hover:animate-ltrMarquee"
                        : ""
                    } ${direction === "rtl" ? "text-right" : "text-left"}`}
                  >
                    {item.title[params.lang]}
                  </h4>
                  <p className={`line-clamp-2 text-darkGray dark:text-lightGray ${direction === "rtl" ? "text-right" : "text-left"}`}>
                    {item.desc[params.lang]}
                  </p>
                </a>

                <div className="w-[95%] flex flex-row justify-between items-center">
                  <Link href={`/${params.lang}/citizen/Hm-2000003`} target="_blank">
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Image
                        src="/firstpage/alizadeh.webp"
                        alt={params.lang === "fa" ? "تصویر شهروند" : "citizen image"}
                        width={1000}
                        height={1000}
                        loading="lazy"
                        className="w-[45px] h-[45px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
                      />
                      <span className="text-blueLink cursor-pointer text-[14px] 3xl:text-[18px] whitespace-nowrap font-medium hover:font-bold uppercase">
                        Hm-2000003
                      </span>
                    </div>
                  </Link>
                  <div className="flex flex-row justify-end items-center gap-4 md:gap-3 xl:gap-4 3xl:gap-5">
                    <span className="flex items-center gap-2">
                      <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                        125
                      </span>
                      <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px]" />
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                        10
                      </span>
                      <Dislike className="stroke-gray dark:stroke-dark-gray stroke-2" />
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                        610
                      </span>
                      <View className="stroke-gray dark:stroke-dark-gray stroke-2 ms-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EducationFirstPage;