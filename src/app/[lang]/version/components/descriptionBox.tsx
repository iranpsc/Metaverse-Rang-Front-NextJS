"use client";
import React from "react";

export default function DescriptionBox(){



return (

    <div
    id="versionInfo"
    className="versionInfo hidden lg:bg-[#FFFFFF] dark:bg-[#080807] lg:h-[804px] lg:self-start lg:px-[15px] lg:flex lg:flex-col lg:items-center 
    lg:transition-[width,margin-left] lg:duration-300 lg:ease-in-out lg:w-full lg:dark:bg-[#080807] lg:pt-[15px] lg:rounded-[20px]"
  >
    <div className="lineBox flex justify-between items-center w-full min-h-[48px]">
      <p className="versionP m-0 font-[600] z-[1] text-[#0066FF] dark:text-[#FFC700] text-[100%] lg:font-rokh lg:font-[600] lg:text-[200%]">
        ورژن :
      </p>
      <hr
        className="flex-grow border-none h-[2px] my-[2px] bg-transparent bg-bottom bg-repeat-x bg-[length:15px_100%]
       [background-image:linear-gradient(to_right,#BABABA_40%,#ffffff13_0%)] dark:[background-image:linear-gradient(to_right,#000_40%,#ffffff13_0%)]"
      />

      <p
        id="displayVersionDes"
        className="displayVersionDes text-[170%] font-[700] z-[2] text-[#0066FF] dark:text-[#FFC700]"
      >
        V 1. 1.1. 21
      </p>
    </div>

    <div className="lineBox flex justify-between items-center w-full min-h-[48px]">
      <p className="toseVbehbod font-rokh dark:text-[#FCF9FE] z-[1] whitespace-nowrap text-[140%]">
        توسعه ها و بهبود یافته ها
      </p>
      <hr className="flex-grow border-none h-[2px] my-[2px] bg-transparent bg-bottom bg-repeat-x bg-[length:15px_100%] [background-image:linear-gradient(to_right,#BABABA_40%,#ffffff13_0%)] dark:[background-image:linear-gradient(to_right,#000_40%,#ffffff13_0%)]" />

      <p
        id="textVersion inline-block whitespace-nowrap pl-[15px] text-[90%] text-[#868B90] lg:text-[100%]Des"
        className="toseVbehbodDate text-[#868B90] z-[1] whitespace-nowrap text-[120%]"
      >
        1402/03/16
      </p>
    </div>

    <div className="descriptionBox flex justify-between items-center  w-full min-h-[48px]">
      <p className="description transition-[max-height] duration-300 ease-in-out font-[Vazir] self-start text-bold dark:text-white lg:w-full lg:self-end lg:p-0">
        توضیحات :
      </p>
    </div>

    <div
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      className="descriptionParagraph   leading-[37px] transition-[max-height] duration-300 ease-in-out text-[90%] w-full pb-[20px] h-auto bg-transparent text-[#C4C4C4] lg:text-[#908986] lg:overflow-auto lg:h-[40%]"
    >
      <p className="justify-between pt-[10px] text-justify ">
        رندر با نقطه دید Z از نگین های سطوح کارت شهروند متارنگ
        ریدیزاین تب حساب کاربری 3. تولید محتوا برای متاورس 4.
        ریدیزاین تب حساب کاربری 3. تولید محتوا برای متاورس 4.
        محدودیت در خرید زمین متارنگ حل تمامی مشکلات فاز یک متاورس
        محدودیت در خرید زمین متارنگ حل تمامی مشکلات فاز یک متاورس
        رنگ بخش فرانت
      </p>
    </div>
  </div>


)

}