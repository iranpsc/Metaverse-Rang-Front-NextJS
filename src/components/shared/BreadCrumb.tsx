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
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/citizens`,
    },
    {
      name: "levels",
      en: "levels",
      fa: "سطح",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen`,
    },
    {
      name: "citizen",
      en: "citizen",
      fa: "شهروند",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen`,
    },
    // -baguette is a key
    {
      name: "citizen-baguette",
      en: "rank-1",
      fa: "رنک-۱",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "reporter-baguette",
      en: "rank-1",
      fa: "رنک-۱",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "participation-baguette",
      en: "rank-1",
      fa: "رنک-۱",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "developer-baguette",
      en: "rank-1",
      fa: "رنک-۱",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "inspector-baguette",
      en: "rank-1",
      fa: "رنک-۱",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "businessman-baguette",
      en: "rank-1",
      fa: "رنک-۱",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "lawyer-baguette",
      en: "rank-1",
      fa: "رنک-۱",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "city-council-baguette",
      en: "rank-1",
      fa: "رنک-۱",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "the-mayor-baguette",
      en: "rank-1",
      fa: "رنک-۱",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "governor-baguette",
      en: "rank-1",
      fa: "رنک-۱",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "minister-baguette",
      en: "rank-1",
      fa: "رنک-۱",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "judge-baguette",
      en: "rank-1",
      fa: "رنک-۱",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "legislator-baguette",
      en: "rank-1",
      fa: "رنک-۱",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "general-info",
      en: "general info",
      fa: "اطلاعات اولیه سطح",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "licenses",
      en: "licenses",
      fa: "مجوزها و دسترسی ها",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "gem",
      en: "gem",
      fa: "نگین سطح",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "gift",
      en: "gift",
      fa: "هدیه همراه",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/levels/citizen/${params.levelName}/${params.tabs}`,
    },
    {
      name: "prize",
      en: "prize",
      fa: "پاداش رسیدن به سطح",
      color: "text-black",
      darkColor: "text-white",
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
      color: "text-blueLink",
      darkColor: "text-dark-yellow",
      font: "font-normal",
      link: `/${params.lang}`,
    },
  ];
  temp.map((x) => {
    staticData.map((y) => {
      if (y.name == x) buildedArray.push(y);
    });
  });

  return (
    <div className="flex flex-wrap font-azarMehr text-[16px] lg:text-[18px] 2xl:text-[20px] py-[20px]">
      {direction == "rtl"
        ? buildedArray.map((x, index) => (
            <Link
              href={x.link}
              className={`${x.color} dark:${x.darkColor} ${x.font} flex items-center`}
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
              className={`${x.color} dark:${x.darkColor} ${x.font} flex items-center`}
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
