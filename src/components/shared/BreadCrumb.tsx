"use client";
import { usePathname } from "next/navigation";
import { ArrowMenu } from "@/svgs/index";
import Link from "next/link";

export default function ({ params }: any) {
  const staticData = [
    {
      name: "citizen",
      en: "citizen",
      fa: "شهروندان",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
      link: `/${params.lang}/citizen`,
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
    <div className="flex font-azarMehr text-[16px] lg:text-[18px] 2xl:text-[20px] py-[20px] xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
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
