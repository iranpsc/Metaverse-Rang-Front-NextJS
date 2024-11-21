"use client";
import { usePathname } from "next/navigation";
import { ArrowMenu } from "@/svgs/index";
import Link from "next/link";

export default function ({ params }: any) {
  const staticData = [
    {
      name: "citizens",
      en: "citizens",
      fa: "شهروندان",
      font: "font-bold",
      link: `/${params.lang}/citizens`,
    },
    {
      name: "levels",
      en: "levels",
      fa: "سطوح",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen`,
    },
    {
      name: "citizen",
      en: "citizen",
      fa: "شهروند",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen`,
    },
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
      fa: "شهروند رنک-۱",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "reporter-baguette",
      en: "reporter rank-1",
      fa: "ژورنالیست رنک-۱",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "participation-baguette",
      en: "participation rank-1",
      fa: "مشارکت کننده رنک-۱",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "developer-baguette",
      en: "developer rank-1",
      fa: "توسعه دهنده رنک-۱",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "inspector-baguette",
      en: "inspector rank-1",
      fa: "بازرس رنک-۱",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "businessman-baguette",
      en: "businessman rank-1",
      fa: "بازرگان رنک-۱",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "lawyer-baguette",
      en: "lawyer rank-1",
      fa: "وکیل رنک-۱",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "city-council-baguette",
      en: "city council rank-1",
      fa: "شورای شهر رنک-۱",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "the-mayor-baguette",
      en: "the mayor rank-1",
      fa: "شهردار رنک-۱",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "governor-baguette",
      en: "governor rank-1",
      fa: "استاندار رنک-۱",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "minister-baguette",
      en: "minister rank-1",
      fa: "وزیر رنک-۱",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "judge-baguette",
      en: "judge rank-1",
      fa: "قاضی رنک-۱",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "legislator-baguette",
      en: "legislator rank-1",
      fa: "قانون گذار رنک-۱",
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
                index == temp.length - 1 ? "text-black" : "text-blueLink"
              } 
              dark:${
                index == temp.length - 1 ? "text-white" : "text-dark-yellow"
              } ${x.font} flex items-center`}
              key={index}
            >
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
                index == temp.length - 1 ? "text-black" : "text-blueLink"
              } 
            dark:${
              index == temp.length - 1 ? "text-white" : "text-dark-yellow"
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
