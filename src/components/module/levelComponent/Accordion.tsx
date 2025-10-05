"use client";
import { ChevronDown } from "@/components/svgs";
import { useState } from "react";

export default function Accordion({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div
      className={`w-full flex flex-wrap flex-col transition-all duration-300 border-b-2 border-solid border-t-0 border-x-0 border-[#ECECEC] dark:border-[#1A1A18] ${
        open ? "gap-4" : "gap-0"
      }`}
    >
      <div
        className="py-3 flex flex-row gap-3 font-bold items-center cursor-pointer text-[#414040] dark:text-white"
        onClick={() => setOpen(!open)}
      >
        <span
          className="text-ellipsis text-[#414040] dark:text-white font-[500] 2xl:font-[700] 
        text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]"
        >
          {title}
        </span>
        <ChevronDown
          width={12}
          height={12}
          className={` transition-all duration-300 ${open ? "" : "rotate-180"}`}
        />
      </div>

      <div
        className={`transition-all flex flex-col gap-6 duration-300 text-textGray dark:text-lightGray text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] [&_ul]:list-disc [&_ul]:pl-5
         [&_ol]:list-decimal [&_ol]:pl-5
         [&_li>p]:inline [&_li>p]:m-0${
          open
            ? "font-[400] max-h-[10000px] opacity-1  pb-5"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </div>
  );
}
