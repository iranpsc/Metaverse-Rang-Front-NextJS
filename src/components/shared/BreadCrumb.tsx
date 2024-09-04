"use client";
import { usePathname } from "next/navigation";
import { ArrowMenu } from "@/svgs/index";

export default function () {
  const staticData = [
    {
      name: "citizen",
      en: "citizen",
      fa: "شهروندان",
      color: "text-black",
      darkColor: "text-white",
      font: "font-bold",
    },
  ];
  const pathname = usePathname();
  let temp = pathname.split("/");
  // delete empty string in array
  temp.shift();
  let direction = temp[0] == "fa" ? "rtl" : "ltr";
  let buildedArray: any[] = [
    {
      name: "home",
      en: "Home",
      fa: "صفحه نخست",
      color: "text-blueLink",
      darkColor: "text-dark-yellow",
      font: "font-normal",
    },
  ];
  temp.map((x) => {
    staticData.map((y) => {
      if (y.name == x) buildedArray.push(y);
    });
  });

  return (
    <div className="flex font-azarMehr text-[16px] lg:text-[18px] 2xl:text-[20px] py-[20px]">
      {direction == "rtl"
        ? buildedArray.map((x, index) => (
            <a
              href=""
              className={`${x.color} dark:${x.darkColor} ${x.font} flex items-center`}
              key={index}
            >
              {x.fa}
              {buildedArray.length - 1 != index && (
                <ArrowMenu
                  className={`w-[7px] h-[13px] stroke-gray dark:stroke-white mx-2 rotate-180`}
                />
              )}
            </a>
          ))
        : buildedArray.map((x, index) => (
            <a
              href=""
              className={`${x.color} dark:${x.darkColor} ${x.font} flex items-center`}
            >
              {x.en}
              {buildedArray.length - 1 != index && (
                <ArrowMenu
                  className={`w-[7px] h-[13px] stroke-gray dark:stroke-white mx-2 rotate-0`}
                />
              )}
            </a>
          ))}
    </div>
  );
}
