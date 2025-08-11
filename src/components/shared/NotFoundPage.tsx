// src/components/NotFoundPage.tsx
import React from "react";
import SideBar from "@/components/module/sidebar/SideBar";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import BreadCrumb from "@/components/shared/BreadCrumb";

interface NotFoundPageProps {
  lang: string;
  params: any;
  langData: any;
  langArray: any;
  updatedTabsMenu: any[];
  footerTabs: any[];
  mainData: any;
}

export default function NotFoundPage({
  lang,
  params,
  langData,
  langArray,
  updatedTabsMenu,
  footerTabs,
  mainData,
}: NotFoundPageProps) {
  return (
    <div className="flex h-screen overflow-hidden" dir={langData.direction}>
      {/* Sidebar */}
      <SideBar
        tabsMenu={updatedTabsMenu}
        langData={langData}
        langArray={langArray}
        params={params}
       pageSide="citizen"
      />

      {/* Main Content */}
      <section className="w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 bg-[#f8f8f8] dark:bg-black xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
        <div>
          <BreadCrumb params={params} />
        </div>

        {/* 404 Message */}
        <div className="flex flex-col gap-5 items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-[#00000024] text-2xl md:text-[100px] font-bold">
            404
          </h1>
          <h2 className="text-[#33353B] text-xl md:text-3xl">
            صفحه یافت نشد..!
          </h2>
          <p className="text-[#868B90] max-w-[500px]">
            صفحه‌ای که دنبال آن هستید وجود ندارد. از جستجو کردن کمک بگیرید یا
            به صفحه اصلی بروید.
          </p>
          <a
            href={`/${lang}`}
            className="text-blue-500 underline"
          >
            بازگشت به صفحه اصلی
          </a>
        </div>

        {/* Footer */}
        <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1 mt-auto">
          <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
        </div>
      </section>
    </div>
  );
}
