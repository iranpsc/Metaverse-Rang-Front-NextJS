"use client";
import { usePathname } from "next/navigation";
import { ArrowMenu } from "@/svgs/index";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

// تابع برای پاکسازی HTML
const stripHtml = (html: string, maxLength: number = 160): string => {
  if (typeof window === "undefined") {
    // برای SSR
    const text = html.replace(/<|>/g, "");
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  const div = document.createElement("div");
  div.innerHTML = html;

  const text = div.textContent || div.innerText || "";

  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};


export default function BreadCrumb({ params, eventTitle, title, articleCat }: { params: any; eventTitle?: string, title?: string; articleCat?: string; }) {
  const [userName, setUserName] = useState("");
  const pathname = usePathname();
  const [linkLoading, setLinkLoading] = useState(false);
  // دریافت نام کاربر برای مسیرهای citizens
  useEffect(() => {
    if (!params.id || !pathname.includes("/citizens")) return;
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://api.rgb.irpsc.com/api/citizen/${params.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let temp = response.data.data;
        let firstName = temp?.kyc?.fname ? temp?.kyc?.fname : "";
        let lastName = temp?.kyc?.lname ? temp?.kyc?.lname : "";
        if (params.lang.toLowerCase() === "fa") {
          setUserName(`${firstName} ${lastName}`);
        } else if (params.lang.toLowerCase() === "en") {
          setUserName(temp.name ? temp.name : `${firstName} ${lastName}`);
        }
      } catch (error) {
        console.error("fetch user data", error);
      }
    };
    fetchUserData();
  }, [params.id, params.lang]);

  const staticData = [
    {
      name: "home",
      en: "Home",
      fa: "صفحه نخست",
      font: "font-normal",
      link: `/${params.lang}`,
    },
    {
      name: "calendar",
      en: "events calendar",
      fa: "تقویم رویدادها",
      font: "font-normal",
      link: `/${params.lang}/calendar`,
    },
    ...(eventTitle && pathname.includes(`/calendar/${params.id}`)
      ? [
        {
          name: `event-${params.id}`,
          en: stripHtml(eventTitle),
          fa: stripHtml(eventTitle),
          font: "font-normal",
          link: `/${params.lang}/calendar/${params.id}`,
        },
      ]
      : []),
    {
      name: "citizens",
      en: "List of citizens",
      fa: "لیست شهروندان",
      font: "font-normal",
      link: `/${params.lang}/citizens`,
    },
    ...(pathname.includes("/citizens")
      ? [
        {
          name: `citizen-${params.id}`,
          en: `${userName}'s invites`,
          fa: `دعوتی‌های ${userName}`,
          font: "font-normal",
          link: `/${params.lang}/citizens/${params.id}`,
        },
      ]
      : []),
    {
      name: "rand-id",
      en: "Random Metaverse IDs",
      fa: "شناسه های رند متاورس",
      font: "font-normal",
      link: `/${params.lang}/rand-id/hm`,
    },
    {
      name: "login",
      en: "login",
      fa: "ورود",
      font: "font-normal",
      link: `/${params.lang}/education/category/login`,
    },
    {
      name: "dynasty",
      en: "dynasty",
      fa: "سلسله",
      font: "font-normal",
      link: `/${params.lang}/education/category/dynasty`,
    },
    {
      name: "setting",
      en: "setting",
      fa: "تنظیمات",
      font: "font-normal",
      link: `/${params.lang}/education/category/setting`,
    },
    {
      name: "kyc",
      en: "kyc",
      fa: "احراز هویت",
      font: "font-normal",
      link: `/${params.lang}/education/category/kyc`,
    },
    {
      name: "notification",
      en: "notification",
      fa: "اعلان‌ها",
      font: "font-normal",
      link: `/${params.lang}/education/category/notification`,
    },
    {
      name: "register",
      en: "register",
      fa: "ثبت‌نام",
      font: "font-normal",
      link: `/${params.lang}/education/category/register`,
    },
    {
      name: "sanad",
      en: "documents",
      fa: "اسناد",
      font: "font-normal",
      link: `/${params.lang}/education/category/sanad`,
    },
    {
      name: "a&q",
      en: "a&q",
      fa: "پاسخ به سوالات",
      font: "font-normal",
      link: `/${params.lang}/education/category/a&q`,
    },
    {
      name: "feature",
      en: "feature",
      fa: "املاک",
      font: "font-normal",
      link: `/${params.lang}/education/category/feature`,
    },
    {
      name: "all",
      en: "all",
      fa: "همه",
      font: "font-normal",
      link: `/${params.lang}/education/category`,
    },
    {
      name: "category",
      en: "category",
      fa: "دسته‌بندی",
      font: "font-normal",
      link: `/${params.lang}/education/category`,
    },
    {
      name: "education",
      en: "education",
      fa: "آموزش‌ها",
      font: "font-normal",
      link: `/${params.lang}/education`,
    },
    {
      name: "version",
      en: "metaverse version",
      fa: "ورژن متاورس",
      font: "font-normal",
      link: `/${params.lang}/version`,
    },
    {
      name: "levels",
      en: "List Of Levels",
      fa: "لیست سطوح",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen`,
    },
    {
      name: "about",
      en: "about us",
      fa: "درباره ما",
      font: "font-normal",
      link: `/${params.lang}/about`,
    },
    {
      name: "contact",
      en: "contact us",
      fa: "تماس با ما",
      font: "font-normal",
      link: `/${params.lang}/contact`,
    },
    {
      name: "citizen-baguette",
      en: "citizen rank-1",
      fa: "شهروند رتبه یک",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "reporter-baguette",
      en: "reporter rank-1",
      fa: "خبرنگار رتبه یک",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "participation-baguette",
      en: "participation rank-1",
      fa: "مشارکت‌کننده رتبه یک",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "developer-baguette",
      en: "developer rank-1",
      fa: "توسعه‌دهنده رتبه یک",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "inspector-baguette",
      en: "inspector rank-1",
      fa: "بازرس رتبه یک",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "businessman-baguette",
      en: "businessman rank-1",
      fa: "بازرگان رتبه یک",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "lawyer-baguette",
      en: "lawyer rank-1",
      fa: "وکیل رتبه یک",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "city-council-baguette",
      en: "city council rank-1",
      fa: "شورای شهر رتبه یک",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "the-mayor-baguette",
      en: "the mayor rank-1",
      fa: "شهردار رتبه یک",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "governor-baguette",
      en: "governor rank-1",
      fa: "استاندار رتبه یک",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "minister-baguette",
      en: "minister rank-1",
      fa: "وزیر رتبه یک",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "judge-baguette",
      en: "judge rank-1",
      fa: "قاضی رتبه یک",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "legislator-baguette",
      en: "legislator rank-1",
      fa: "قانون‌گذار رتبه یک",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "general-info",
      en: "general info",
      fa: "اطلاعات اولیه سطح",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "licenses",
      en: "licenses",
      fa: "مجوزها و دسترسی‌ها",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "gem",
      en: "gem",
      fa: "نگین سطح",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "gift",
      en: "gift",
      fa: "هدیه همراه",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "prize",
      en: "prize",
      fa: "پاداش رسیدن به سطح",
      font: "font-normal",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
     {
      name: "news",
      en: "news",
      fa: "اخبار",
      font: "font-normal",
      link: `/${params.lang}/news`,
    },
     {
      name: "categories",
      en: "news categories",
      fa: "دسته بندی اخبار",
      font: "font-normal",
      link: `/${params.lang}/news/categories`,
    },
         {
      name: `${params.category}`,
      en: `${params.category}`,
      fa: decodeURIComponent(articleCat || ""),
      font: "font-normal",
      link: `/${params.lang}/news/categories/${params.category}`,
    },
    {
      name: "articles",
      en: "articles",
      fa: "مقالات",
      font: "font-normal",
      link: `/${params.lang}/articles`,
    },
    {
      name: "categories",
      en: "articles categories",
      fa: "دسته بندی مقالات",
      font: "font-normal",
      link: `/${params.lang}/articles/categories`,
    },
    {
      name: `${params.category}`,
      en: decodeURIComponent(articleCat || ""),
      fa: decodeURIComponent(articleCat || ""),
      font: "font-normal",
      link: `/${params.lang}/articles/categories/${params.category}`,
    },
    {
      name: `${params.slug}`,
      en: `${title}`,
      fa: `${title}`,
      font: "font-normal",
      link: `/${params.lang}/articles/categories/${params.category}/${params.slug}`,
    },
       
  ];

  let temp = pathname.split("/").filter((x) => x);
  let direction = temp[0] === "fa" ? "rtl" : "ltr";

  let buildedArray: any[] = [
    {
      name: "home",
      en: "Home",
      fa: "صفحه نخست",
      font: "font-normal",
      link: `/${params.lang}`,
    },
  ];

  temp.forEach((x) => {
    const matchedItem = staticData.find(
      (y) => y.name === x || y.name === `event-${x}` || y.name === `citizen-${x}`
    );
    if (matchedItem) {
      // فقط آیتم‌هایی که با مسیر فعلی مطابقت دارند اضافه شوند
      if (
        (pathname.includes("/calendar") && matchedItem.link.includes("/calendar")) ||
        (pathname.includes("/citizens") && matchedItem.link.includes("/citizens")) ||
        (!pathname.includes("/calendar") && !pathname.includes("/citizens"))
      ) {
        buildedArray.push(matchedItem);
      }
    }
  });

  // حذف آیتم‌های تکراری بر اساس لینک
  buildedArray = Array.from(new Set(buildedArray.map((item) => item.link))).map((link) =>
    buildedArray.find((item) => item.link === link)
  );

  return (

    <div className="flex flex-wrap font-azarMehr text-[16px] lg:text-[18px] !font-normal py-[20px] capitalize">
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
      {direction === "rtl"
        ? buildedArray.map((x, index) => (
          <Link onClickCapture={() => {
            if (index !== buildedArray.length - 1) {
              setLinkLoading(true);
            }
          }}
            href={x.link}
            className={`${index === buildedArray.length - 1
              ? "text-blueLink dark:text-dark-yellow"
              : "text-extraGray"
              } 
                ${index === buildedArray.length - 1
                ? "dark:text-dark-yellow"
                : "dark:text-white"
              } ${x.font} flex items-center`}
            key={index}
          >
            {x.fa}
            {buildedArray.length - 1 !== index && (
              <ArrowMenu
                className={`w-[7px] h-[13px] stroke-gray dark:stroke-white mx-2 rotate-180`}
              />
            )}
          </Link>
        ))
        : buildedArray.map((x, index) => (
          <Link
            href={x.link}
            className={`${index === buildedArray.length - 1
              ? "text-blueLink dark:text-dark-yellow"
              : "text-extraGray"
              } 
                ${index === buildedArray.length - 1
                ? "dark:text-dark-yellow"
                : "dark:text-white"
              } ${x.font} flex items-center`}
            key={index}
          >
            {x.en}
            {buildedArray.length - 1 !== index && (
              <ArrowMenu
                className={`w-[7px] h-[13px] stroke-gray dark:stroke-white mx-2 rotate-0`}
              />
            )}
          </Link>
        ))}
    </div>
  );
}