"use client";
import { usePathname } from "next/navigation";
import { ArrowMenu } from "@/svgs/index";
import Link from "next/link";
import { getUserData } from "@/components/utils/actions";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ({ params }: any) {
  const [userName, setUserName] = useState("");
  // retrive name according to userId
  useEffect(() => {
    if (!params.id) return;
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
        if (params.lang.toLowerCase() == "fa") {
          setUserName(`${firstName} ${lastName}`);
        } else if (params.lang.toLowerCase() == "en") {
          setUserName(temp.name ? temp.name : `${firstName} ${lastName}`);
        }
      } catch (error) {
        console.error("fetch user data", error);
      }
    };
    fetchUserData();
  }, [params.id]);

  const staticData = [
    {
      name: "login",
      en: "login",
      fa: "ورود",
      font: "font-bold",
      link: `/${params.lang}/education/category/login`,
    },
    {
      name: "dynasty",
      en: "dynasty",
      fa: "سلسله",
      font: "font-bold",
      link: `/${params.lang}/education/category/dynasty`,
    },
    {
      name: "setting",
      en: "setting",
      fa: "تنظیمات",
      font: "font-bold",
      link: `/${params.lang}/education/category/setting`,
    },
    {
      name: "kyc",
      en: "kyc",
      fa: "احراز هویت",
      font: "font-bold",
      link: `/${params.lang}/education/category/kyc`,
    },
    {
      name: "notification",
      en: "notification",
      fa: "اعلان ها",
      font: "font-bold",
      link: `/${params.lang}/education/category/notification`,
    },
    {
      name: "register",
      en: "register",
      fa: "ثبت نام",
      font: "font-bold",
      link: `/${params.lang}/education/category/register`,
    },
    {
      name: "sanad",
      en: "documents",
      fa: "اسناد",
      font: "font-bold",
      link: `/${params.lang}/education/category/sanad`,
    },
    {
      name: "a&q",
      en: "a&q",
      fa: "پاسخ به سوالات",
      font: "font-bold",
      link: `/${params.lang}/education/category/a&q`,
    },
    {
      name: "feature",
      en: "feature",
      fa: "املاک",
      font: "font-bold",
      link: `/${params.lang}/education/category/feature`,
    },
    {
      name: "all",
      en: "all",
      fa: "همه",
      font: "font-bold",
      link: `/${params.lang}/education/category/all`,
    },
    {
      name: "category",
      en: "category",
      fa: "دسته بندی",
      font: "font-bold",
      link: `/${params.lang}/education/category/all`,
    },
    {
      name: "education",
      en: "education",
      fa: " آموزش ها",
      font: "font-bold",
      link: `/${params.lang}/education`,
    },
    {
      name: "version",
      en: "metaverse version",
      fa: "ورژن متاورس",
      font: "font-bold",
      link: `/${params.lang}/version`,
    },
    {
      name: `${params.id}`,
      en: `${userName}'s invites`,
      fa: `دعوتی های ${userName}`,
      font: "font-bold",
      link: `/${params.lang}/citizens/${params.id}`,
    },
    {
      name: "citizens",
      en: "citizens",
      fa: "شهروندان",
      font: "font-bold",
      link: `/${params.lang}/citizens`,
    },
    {
      name: "levels",
      en: "List Of Levels",
      fa: "لیست سطوح ",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen`,
    },
    // {
    //   name: "citizen",
    //   en: "",
    //   fa: "شهروند",
    //   font: "font-bold",
    //   link: `/${params.lang}/levels/citizen`,
    // },
    {
      name: "about",
      en: "about us",
      fa: "درباره ما",
      font: "font-bold",
      link: `/${params.lang}/about`,
    },
    {
      name: "contact",
      en: "contact us",
      fa: "تماس با ما",
      font: "font-bold",
      link: `/${params.lang}/contact`,
    },
    // -baguette is a key
    {
      name: "citizen-baguette",
      en: "citizen rank-1",
      fa: "شهروند رتبه یک",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "reporter-baguette",
      en: "reporter rank-1",
      fa: "خبرنگار رتبه یک",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "participation-baguette",
      en: "participation rank-1",
      fa: "مشارکت کننده رتبه یک",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "developer-baguette",
      en: "developer rank-1",
      fa: "توسعه دهنده رتبه یک",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "inspector-baguette",
      en: "inspector rank-1",
      fa: "بازرس رتبه یک",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "businessman-baguette",
      en: "businessman rank-1",
      fa: "بازرگان رتبه یک",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "lawyer-baguette",
      en: "lawyer rank-1",
      fa: "وکیل رتبه یک",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "city-council-baguette",
      en: "city council rank-1",
      fa: "شورای شهر رتبه یک",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "the-mayor-baguette",
      en: "the mayor rank-1",
      fa: "شهردار رتبه یک",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "governor-baguette",
      en: "governor rank-1",
      fa: "استاندار رتبه یک",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "minister-baguette",
      en: "minister rank-1",
      fa: "وزیر رتبه یک",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "judge-baguette",
      en: "judge rank-1",
      fa: "قاضی رتبه یک",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "legislator-baguette",
      en: "legislator rank-1",
      fa: "قانون گذار رتبه یک",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "general-info",
      en: "general info",
      fa: "اطلاعات اولیه سطح",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "licenses",
      en: "licenses",
      fa: "مجوزها و دسترسی ها",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "gem",
      en: "gem",
      fa: "نگین سطح",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "gift",
      en: "gift",
      fa: "هدیه همراه",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "prize",
      en: "prize",
      fa: "پاداش رسیدن به سطح",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
  ];
  const pathname = usePathname();
  let temp = pathname.split("/");
  // delete empty string in array
  temp.shift();
  let direction = temp[0] == "fa" ? "rtl" : "ltr";

  let buildedArray: any[] = [
    // always show in breadCrumb
    {
      name: "home",
      en: "Home",
      fa: "صفحه نخست",
      font: "font-bold",
      link: `/${params.lang}`,
    },
  ];
  temp.map((x) => {
    staticData.map((y) => {
      if (y.name == x) buildedArray.push(y);
    });
  });

  return (
    <div className="flex flex-wrap font-azarMehr text-[16px] lg:text-[18px] 2xl:text-[20px] py-[20px] capitalize">
      {direction == "rtl"
        ? buildedArray.map((x, index) => (
            <Link
              href={x.link}
              className={`${
                index == buildedArray.length - 1
                  ? "text-black"
                  : "text-blueLink"
              } 
              dark:${
                index == buildedArray.length - 1
                  ? "text-white"
                  : "text-dark-yellow"
              } ${x.font} flex items-center`}
              key={index}
            >
              {/* TEXT */}
              {x.fa}

              {buildedArray.length - 1 != index && (
                <ArrowMenu
                  className={`w-[7px] h-[13px] stroke-gray dark:stroke-white mx-2 rotate-180`}
                />
              )}
            </Link>
          ))
        : buildedArray.map((x, index) => (
            <Link
              href={x.link}
              className={`${
                index == buildedArray.length - 1
                  ? "text-black"
                  : "text-blueLink"
              } 
            dark:${
              index == buildedArray.length - 1
                ? "text-white"
                : "text-dark-yellow"
            } ${x.font} flex items-center`}
              key={index}
            >
              {x.en}
              {buildedArray.length - 1 != index && (
                <ArrowMenu
                  className={`w-[7px] h-[13px] stroke-gray dark:stroke-white mx-2 rotate-0`}
                />
              )}
            </Link>
          ))}
    </div>
  );
}
