"use client";
import Header from "./Header";
import AllSideTab from "./AllSideTab";
import LevelSideTab from './LevelSideTab'
import { useState, useCallback, useEffect  } from "react";
import LoginMenuModule from "./LoginMenuModule";
import ThemeMenuModule from "@/components/module/sidebar/ThemeMenuModule";
import HeaderMobile from "@/components/module/sidebar/HeaderMobile";

export default function SideBar({
  tabsMenu,
  langData,
  langArray,
  defaultTheme,
  params,
  pageSide,
}) {
  
  // Retrieve the sidebar state from localStorage (default to true if not found)
  const [isClosed, setIsClosed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarClosed") === "true";
    }
    return true;
  });

  // Update localStorage whenever isClosed changes
  useEffect(() => {
    localStorage.setItem("sidebarClosed", isClosed);
  }, [isClosed]);

  const toggleSide = useCallback(() => {
    setIsClosed((prev) => !prev);
  }, []);
  
  return (
    <>
      <HeaderMobile
        tabsMenu={tabsMenu}
        isClosed={isClosed}
        toggleSide={toggleSide}
      />
      <div className={`z-[60] h-screen dark:bg-dark-background fixed top-0 rtl:right-0 ltr:left-0 z-[1] lg:relative lg:top-0 lg:right-0 ${
        isClosed ? "" : ""
      }`}>
        <div
          className={`shadow-left dark:shadow-leftDark xl:min-h-screen scroll lg:min-h-screen md:min-h-screen relative sm:min-h-screen xs:min-h-screen ${
            isClosed
              ? "sm:hidden xs:hidden md:hidden menu-transition xl:block lg:block"
              : "sm:block xs:block bg-blackTransparent/30"
          }   absolute xl:relative lg:relative xl:w-fit lg:w-fit md:w-full z-[60] sm:w-full xs:w-full no-scrollbar  `}
        >
          <aside
            className={`${
              isClosed
                ? "w-[70px] max-lg:hidden"
                : "w-[260px] lg:w-[16.5vw] sm:shadow-[#000000] xs:sm:shadow-[#000000] visible"
              }  
              flex flex-col h-screen relative bg-white  dark:bg-dark-background menu-transition`}
          >
            <div className="sticky w-full h-fit top-0 pt-4 z-50 bg-white dark:bg-dark-background menu-transition">
              <Header
                isClosed={isClosed}
                tabsMenu={tabsMenu}
                toggleSide={toggleSide}
                params={params}
              />
            </div>
            {/* <MenuProfileModule /> */}
            {pageSide == 'citizen' &&
            <AllSideTab
              tabsMenu={tabsMenu}
              isClosed={isClosed}
              toggleSide={toggleSide}
              langData={langData}
              langArray={langArray}
              params={params}
            />}
            {pageSide == 'level' && 
            <LevelSideTab
              tabsMenu={tabsMenu}
              isClosed={isClosed}
              params={params}
              toggleSide={toggleSide}
              langArray={langArray}
              langData={langData}
              />}
            <div
              className={`${
                isClosed
                  ? "sm:hidden xs:hidden md:hidden xl:block lg:block"
                  : ""
              } w-full h-fit z-[100] transition-all duration-300 ease-linear bg-white dark:bg-dark-background bottom-0 py-5 flex flex-col items-center justify-center gap-3 menu-transition`}
            >
              {/*_________ login BTN __________*/}
              <div className='w-[80%] m-auto'>
              <LoginMenuModule isClosed={isClosed} tabsMenu={tabsMenu} params={params} />
              </div>

              <div className="w-full pt-3 pb-1 flex flex-col items-center justify-center">
                <div className="h-[1px] bg-gray opacity-50 dark:bg-mediumGray w-[80%] " />
              </div>
              <ThemeMenuModule
                isClosed={isClosed}
                defaultTheme={defaultTheme}
                params={params}
              />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
