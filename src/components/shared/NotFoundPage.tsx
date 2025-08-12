import React from "react";
import SideBar from "@/components/module/sidebar/SideBar";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import Image from "next/image";
import Rafiki from '@/public/rafiki.png';
import RafikiDark from '@/public/rafiki-dark.png';

interface NotFoundPageProps {
  lang: string;
  params: any;
  langData: any;
  langArray: any;
  updatedTabsMenu: any[];
  footerTabs: any[];
  mainData: any;
  hideSidebar?: boolean;  // این پراپ رو اضافه کردیم، اختیاری
}

export default function NotFoundPage({
  lang,
  params,
  langData,
  langArray,
  updatedTabsMenu,
  footerTabs,
  mainData,
  hideSidebar = false,  // مقدار پیش‌فرض false
}: NotFoundPageProps) {
  return (
    <div className="flex h-screen overflow-hidden" dir={langData.direction}>
      {/* Sidebar فقط وقتی hideSidebar false باشه */}
      {!hideSidebar && (
        <SideBar
          tabsMenu={updatedTabsMenu}
          langData={langData}
          langArray={langArray}
          params={params}
          pageSide="citizen"
        />
      )}

      {/* Main Content */}
      <section className="w-full pt-7 overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 bg-[#f8f8f8] dark:bg-black xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">


        <div className=" bg-white dark:bg-[#1A1A18] rounded-[20px] flex flex-col lg:flex-row gap-5 p-5 w-full">
          {/* 404 Message */}
          <div className="flex flex-col gap-10 justify-center lg:justify-start items-center lg:items-start text-center lg:text-start w-full lg:w-[60%] p-1 lg:ps-7">
            <h1 className="text-[#33353B] dark:text-white text-8xl md:text-[120px] 2xl:text-[176px] font-bold mt-5  h-max lg:ps-5">
              404
            </h1>
            <h2 className="text-[#33353B] dark:text-white text-2xl md:text-3xl ">
              صفحه یافت نشد..!
            </h2>
            <p className="text-[#868B90] text-xl 2xl:text-2xl w-full left-10 !leading-[50px]">
              صفحه‌ای که دنبال آن هستید وجود ندارد. از جستجو کردن کمک بگیرید یا
              به صفحه اصلی بروید.
            </p>
            <a href={`/${lang}`} className="text-light-primary dark:text-dark-yellow md:text-xl rounded-xl border border-solid border-light-primary dark:border-dark-yellow w-max py-3 px-2 lg:px-5">
              بازگشت به صفحه اصلی
            </a>
          </div>
          <div className="lg:mt-[270px] w-full lg:w-[40%] p-2">
            <Image
              src={Rafiki}
              alt="404 pic"
              loading="lazy"
              className="w-full dark:hidden "
            />
            <Image
              src={RafikiDark}
              alt="404 pic"
              loading="lazy"
              className="w-full hidden dark:block"
            />

          </div>
        </div>

        {/* Footer */}
        <div className="mt-[-120px]">
          <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
        </div>
      </section>
    </div>
  );
}
