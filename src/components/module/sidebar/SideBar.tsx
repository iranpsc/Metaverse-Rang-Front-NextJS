"use client";
// import MenuProfileModule from "./MenuProfileModule";
import Header from "./Header";
import DarkMode from "@/components/dark-mode";
import AllSideTab from "./AllSideTab";
import { useState } from "react";

export default function SideBar({
  languageSelected,
  mainData,
  langData,
}: {
  languageSelected: String;
  mainData: any;
  langData: any;
}) {
  //
  const [isClosed, setisClosed] = useState(true);
  const toggleSide = () => {
    setisClosed(!isClosed);
  };
  //
  const modalsProfile = mainData.modals.find(
    (modal: any) => modal.name === "Citizenship-profile"
  ).tabs;
  const tabsMenu = modalsProfile.find(
    (item: any) => item.name === "menu"
  ).fields;
  console.log("tabsMenu", tabsMenu);

  return (
    <>
      <div className="h-screen overflow-clip dark:bg-dark-background">
        {/* <div
          className={` shadow-left dark:shadow-leftDark xl:min-h-screen scroll lg:min-h-screen md:min-h-screen overflow-y-scroll  relative sm:min-h-screen xs:min-h-screen ${
            state.isCollapsed
              ? "sm:hidden xs:hidden md:hidden transition-2 xl:block lg:block"
              : "backdrop-blur-sm  bg-blackTransparent/30"
          }   sm:absolute  xs:absolute  xl:relative lg:relative md:absolute xl:w-fit lg:w-fit md:w-full z-[60] sm:w-full xs:w-full no-scrollbar  `}
          onClick={() => dispatch({ type: "TOGGLE_COLLAPSE" })}
            > */}
        <aside
          className={`${
            //   state.isCollapsed
            isClosed
              ? "w-[70px] max-lg:hidden"
              : "xl:w-[250px]  lg:w-[150px] md:w-[250px] sm:w-[175px] xs:w-[175px] sm:shadow-[#000000] xs:sm:shadow-[#000000] visible"
          }  
            h-screen relative   bg-white  dark:bg-dark-background transition-all duration-300 ease-linear 
        `}
          //   onClick={() => dispatch({ type: "TOGGLE_COLLAPSE" })}
        >
          <div className="sticky w-full top-0 pt-4 z-50 bg-white dark:bg-dark-background transition-all duration-300 ease-linear">
            <Header
              isClosed={isClosed}
              tabsMenu={tabsMenu}
              toggleSide={toggleSide}
            />
          </div>
          {/* <MenuProfileModule /> */}
          <AllSideTab
            tabsMenu={tabsMenu}
            languageSelected={languageSelected}
            isClosed={isClosed}
            toggleSide={toggleSide}
            // pageName={pageName}
            // languagesData={languagesData}
            // handleDirChange={handleDirChange}
          />
        </aside>
        {/* </div> */}
        {/* <div
          className={`${
            state.isCollapsed
              ? "w-[70px] sm:hidden xs:hidden md:hidden transition-2 xl:block lg:block"
              : "xl:w-[250px]   lg:w-[150px] md:w-[250px] sm:w-[175px] xs:w-[175px]"
          }  h-fit absolute  z-[100] transition-all duration-300 ease-linear  bg-white dark:bg-dark-background bottom-0 py-5 flex flex-col items-center justify-center gap-3`}
        >
          <LoginMenuModule
            setShowAuthCard={setShowAuthCard}
            profileData={profileData}
            setShowLogOut={setShowLogOut}
          />
          <div className="w-full pt-3 pb-1 flex flex-col items-center justify-center">
            <div className="h-[1px] bg-gray opacity-50 dark:bg-mediumGray w-[80%] " />
          </div>
          <ThemeMenuModule />
        </div> */}
        <DarkMode />
      </div>
    </>
  );
}
