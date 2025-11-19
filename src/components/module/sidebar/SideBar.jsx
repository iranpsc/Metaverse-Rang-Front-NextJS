"use client";

import Header from "./Header";
import AllSideTab from "./AllSideTab";
import LevelSideTab from './LevelSideTab';
import { useState, useCallback, useEffect, useRef } from "react";
import LoginMenuModule from "./LoginMenuModule";
// import ThemeMenuModule from "@/components/module/sidebar/ThemeMenuModule";
import HeaderMobile from "@/components/module/sidebar/HeaderMobile";
import { useCookies } from "react-cookie";

export default function SideBar({
  tabsMenu,
  langData,
  langArray,
  params,
  pageSide,
}) {
  const [isClosed, setIsClosed] = useState(true); // Start with true (default for SSR)
  const [hydrated, setHydrated] = useState(false); // Track hydration
  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";
  const sidebarRef = useRef(null); // Reference to sidebar element

  useEffect(() => {
    const stored = localStorage.getItem("sidebarClosed");
    if (stored === null) {
      setIsClosed(true); // سایدبار به‌صورت پیش‌فرض بسته باشد
    } else {
      setIsClosed(stored === "true");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("sidebarClosed", isClosed);
    }
  }, [isClosed, hydrated]);

  // Handle clicks outside the sidebar in mobile view only
  useEffect(() => {
    const handleClickOutside = (event) => {
      // فقط در حالت موبایل (عرض صفحه کمتر از 1024px) اجرا شود
      if (window.innerWidth < 1024 && !isClosed && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsClosed(true); // بستن سایدبار
      }
    };

    // اضافه کردن رویداد کلیک به document
    document.addEventListener("mousedown", handleClickOutside);

    // پاکسازی رویداد هنگام unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClosed]); // وابستگی به isClosed برای به‌روزرسانی وضعیت

  const toggleSide = useCallback(() => {
    setIsClosed((prev) => !prev);
  }, []);

  // Prevent rendering until hydration completes
  if (!hydrated) return null;

  return (
    <>
      <HeaderMobile
        tabsMenu={tabsMenu}
        isClosed={isClosed}
        toggleSide={toggleSide}
         params={params}
      />
      <div className={`z-[60] h-screen dark:bg-dark-background fixed top-0 rtl:right-0 ltr:left-0 z-[1] lg:relative lg:top-0 lg:right-0 ${
        isClosed ? "" : ""
      }`}>
        <div
          className={`shadow-left dark:shadow-leftDark xl:min-h-screen scroll lg:min-h-screen md:min-h-screen relative sm:min-h-screen xs:min-h-screen ${
            isClosed
              ? "sm:hidden xs:hidden md:hidden menu-transition xl:block lg:block"
              : "sm:block xs:block bg-blackTransparent/30"
          } absolute xl:relative lg:relative xl:w-fit lg:w-fit md:w-full z-[60] sm:w-full xs:w-full no-scrollbar`}
        >
          <aside
            ref={sidebarRef}
            className={`${
              isClosed
                ? "w-[70px] max-lg:hidden"
                : "w-[260px] md:w-[242px] xl:w-[17vw] 2xl:w-[16.5vw] sm:shadow-[#000000] xs:sm:shadow-[#000000] visible"
            } flex flex-col h-screen relative bg-white dark:bg-dark-background menu-transition`}
          >
            <div className="flex flex-col sticky w-full h-fit top-0 pt-1 z-50 bg-white dark:bg-dark-background menu-transition">
              <Header
                isClosed={isClosed}
                tabsMenu={tabsMenu}
                toggleSide={toggleSide}
                params={params}
                langData={langData}
                languagesData={langData}
                langArray={langArray}
              />
            </div>
            {pageSide === 'citizen' && (
              <AllSideTab
                tabsMenu={tabsMenu}
                isClosed={isClosed}
                toggleSide={toggleSide}
                langData={langData}
                langArray={langArray}
                params={params}
              />
            )}
            {pageSide === 'citizen/referal' && (
              <AllSideTab
                tabsMenu={tabsMenu}
                isClosed={isClosed}
                toggleSide={toggleSide}
                langData={langData}
                langArray={langArray}
                params={params}
              />
            )}
            {pageSide === 'level' && (
              <LevelSideTab
                tabsMenu={tabsMenu}
                isClosed={isClosed}
                params={params}
                toggleSide={toggleSide}
                langArray={langArray}
                langData={langData}
              />
            )}
            <div
              className={`${
                isClosed
                  ? "sm:hidden xs:hidden md:hidden xl:block lg:block"
                  : ""
              } w-full h-fit z-[100] transition-all duration-300 ease-linear bg-white dark:bg-dark-background bottom-0 py-5 flex flex-col items-center justify-center gap-3 menu-transition`}
            >
              <div className="w-[80%] m-auto">
                <LoginMenuModule isClosed={isClosed} tabsMenu={tabsMenu} params={params} />
              </div>
              {/* <div className="w-full pt-3 pb-1 flex flex-col items-center justify-center">
                <div className="h-[1px] bg-gray opacity-50 dark:bg-mediumGray w-[80%]" />
              </div> */}
              
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}