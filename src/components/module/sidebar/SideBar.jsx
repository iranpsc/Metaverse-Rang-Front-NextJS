"use client";
// import MenuProfileModule from "./MenuProfileModule";
import axios from 'axios';
// import { useRouter } from 'next/navigation';
import Header from "./Header";
import AllSideTab from "./AllSideTab";
import LevelSideTab from './LevelSideTab'
import { useState, useCallback  } from "react";
import LoginMenuModule from "./LoginMenuModule";
import ThemeMenuModule from "@/components/module/sidebar/ThemeMenuModule";
import HeaderMobile from "@/components/module/sidebar/HeaderMobile";

export default function SideBar({
  languageSelected,
  mainData,
  langData,
  defaultTheme,
  params,
  pageSide,
}) {
  //
  const [isClosed, setisClosed] = useState(true);
  // const router = useRouter()
  const toggleSide = useCallback(() => {
    setisClosed((prev) => !prev);
  }, []);
  const handleLogin = async () => {
    // try {
      const res = await axios.get('https://api.rgb.irpsc.com/api/auth/redirect',{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res) {
        const redirectUrl = res.data.url
        window.location.href= redirectUrl
      }else{
        throw new Error('Failed to fetch redirectUrl, client');
      }
  }

  return (
    <>
      <HeaderMobile
        tabsMenu={mainData}
        isClosed={isClosed}
        toggleSide={toggleSide}
      />
      <div className={`z-[60] h-screen dark:bg-dark-background fixed top-0 right-0 z-[1] lg:relative lg:top-0 lg:right-0 ${
        isClosed ? "" : ""
      }`}>
        <div
          className={`shadow-left dark:shadow-leftDark xl:min-h-screen scroll lg:min-h-screen md:min-h-screen relative sm:min-h-screen xs:min-h-screen ${
            isClosed
              ? "sm:hidden xs:hidden md:hidden transition-2 xl:block lg:block"
              : "sm:block xs:block bg-blackTransparent/30"
          }   sm:absolute  xs:absolute  xl:relative lg:relative md:absolute xl:w-fit lg:w-fit md:w-full z-[60] sm:w-full xs:w-full no-scrollbar  `}
        >
          <aside
            className={`${
              isClosed
                ? "w-[70px] max-lg:hidden"
                : "xl:w-[250px]  lg:w-[150px] md:w-[250px] sm:w-[175px] xs:w-[175px] sm:shadow-[#000000] xs:sm:shadow-[#000000] visible"
              }  
              flex flex-col h-screen relative bg-white  dark:bg-dark-background transition-all duration-300 ease-linear`}
          >
            <div className="sticky w-full top-0 pt-4 z-50 bg-white dark:bg-dark-background transition-all duration-300 ease-linear">
              <Header
                isClosed={isClosed}
                tabsMenu={mainData}
                toggleSide={toggleSide}
              />
            </div>
            {/* <MenuProfileModule /> */}
            {pageSide == 'citizen' &&
            <AllSideTab
              tabsMenu={mainData}
              isClosed={isClosed}
              toggleSide={toggleSide}
              langData={langData}
            />}
            {pageSide == 'level' && 
            <LevelSideTab
              tabsMenu={mainData}
              isClosed={isClosed}
              params={params}
              toggleSide={toggleSide}
              langData={langData}
              />}
            <div
              className={`${
                isClosed
                  ? "w-[70px] sm:hidden xs:hidden md:hidden transition-2 xl:block lg:block"
                  : "xl:w-[250px] lg:w-[150px] md:w-[250px] sm:w-[175px] xs:w-[175px]"
              }  h-fit z-[100] transition-all duration-300 ease-linear  bg-white dark:bg-dark-background bottom-0 py-5 flex flex-col items-center justify-center gap-3`}
            >
              {/* <LoginMenuModule /> */}
              {/*_________ login BTN __________*/}
              <button
                className="w-[80%] bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[15px]
                           h-[40px]  flex flex-row xs:px-2 justify-around gap-5 items-center
                           text-white dark:text-dark-background font-azarMehr font-medium text-center text-[15px] m-auto"
                          onClick={handleLogin}>
                {/* <LoginMenu className={`stroke-white stroke-2 dark:stroke-dark-background h-full w-5 
                                    ${tate.isCollapsed ? "hidden" : "visibale"}`}/> */}
                  {/* <p className="text-white dark:text-dark-background font-azarMehr font-medium text-center text-[15px]"> */}
                    login
                  {/* </p> */}
              </button>
              <div className="w-full pt-3 pb-1 flex flex-col items-center justify-center">
                <div className="h-[1px] bg-gray opacity-50 dark:bg-mediumGray w-[80%] " />
              </div>
              <ThemeMenuModule
                isClosed={isClosed}
                defaultTheme={defaultTheme}
              />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
