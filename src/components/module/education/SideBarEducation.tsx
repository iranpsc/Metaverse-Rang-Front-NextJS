import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
//CONTEXT
import { SideBarContext } from "@/context/SidebarContext";
//LANGUAGE
import { LangContext } from "@/context/LangContext";
//MODULES
import LoginMenuModule from "@/module/menu/LoginMenuModule";
import HeaderMenuEducationModule from "./HeaderMenuEducationModule";
//UTILS
import ThemeMenuModule from "../menu/ThemeMenuModule";
import NewListModule from "../menu/NewListModule";

interface LanguageItem {
  id: number;
  code: string;
  name: string;
  native_name: string;
  direction: string;
  icon: string;
  file_url: string;
}

export default function SideBarEducation({
  setShowAuthCard,
  pageName,
  profileData,
  setShowLogOut,
}: any) {
  const router = useRouter();
  const { state, dispatch } = useContext(SideBarContext);
  const { languagesData, languageSelected, setLanguagesSelected } =
    useContext(LangContext);

  useEffect(() => {
    dispatch({ type: "CLEAR_ACTIVE_DROPDOWN" });
  }, [languageSelected.name]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${languageSelected.file_url}`);

        dispatch({
          type: "SET_DATA_HEADER",
          payload: { pageName, dataHeader: res.data.modals },
        });
        dispatch({
          type: "SET_DATA_ITEMS",
          payload: { pageName, dataMenu: res.data.modals },
        });
        dispatch({
          type: "SET_DATA_THEME",
          payload: { dataTheme: res.data.modals },
        });
        dispatch({
          type: "SET_DATA_LOGIN",
          payload: { dataLogin: res.data.modals },
        });
        dispatch({
          type: "SUB_ITEMS_MENU_DATA",
          payload: { dataSubItems: res.data.modals },
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [languageSelected.file_url]);

  const handleDirChange = (item: LanguageItem) => {
    setLanguagesSelected({
      id: item.id,
      code: item.code,
      name: item.name,
      native_name: item.native_name,
      dir: item.direction,
      icon: item.icon,
      file_url: item.file_url,
    });
    const { lang } = router.query;
    const secondPart = router.asPath.split(`/${lang}/`)[1];
    const newUrl = `/${item.code}/${secondPart}`;
    router.push(newUrl);
  };

  useEffect(() => {
    const element = document.querySelector(".scroll");
    if (element) {
      setTimeout(() => {
        const maxScroll = element.scrollHeight - element.clientHeight;
        let currentScroll = element.scrollTop;

        const scrollStep = () => {
          currentScroll += 5;
          if (state.activeDropdown.length >= 1)
            element.scrollTop = currentScroll;
          if (state.showFullModal) {
            element.scrollTop = currentScroll;
          } else {
            window.scrollTo(0, currentScroll);
          }
          if (currentScroll < maxScroll) {
            setTimeout(scrollStep, 10);
          }
        };

        scrollStep();
      }, 300);
    }
  }, [
    state.activeDropdown.some((item) => item.key === "language"),
    state.showFullModal,
  ]);

  return (
    <div className="   xl:relative lg:relative   dark:bg-dark-background  overflow-y-clip">
      <div
        className={` shadow-left dark:shadow-leftDark xl:min-h-screen scroll lg:min-h-screen md:min-h-screen overflow-y-scroll  relative sm:min-h-screen xs:min-h-screen ${
          state.isCollapsed
            ? "sm:hidden xs:hidden md:hidden transition-2 xl:block lg:block"
            : "backdrop-blur-sm  bg-blackTransparent/30"
        }   sm:absolute  xs:absolute  xl:relative lg:relative md:absolute xl:w-fit lg:w-fit md:w-full z-[60] sm:w-full xs:w-full no-scrollbar  `}
        onClick={() => dispatch({ type: "TOGGLE_COLLAPSE" })}
      >
        <aside
          className={`${
            state.isCollapsed
              ? "w-[70px] max-lg:hidden"
              : "xl:w-[250px]   lg:w-[150px] md:w-[250px] sm:w-[175px] xs:w-[175px] sm:shadow-[#000000] xs:sm:shadow-[#000000] visible"
          }  h-screen relative   bg-white  dark:bg-dark-background transition-all duration-300 ease-linear 
        `}
          onClick={() => dispatch({ type: "TOGGLE_COLLAPSE" })}
        >
          <div className="sticky w-full top-4 z-50 bg-white dark:bg-dark-background transition-all duration-300 ease-linear">
            <HeaderMenuEducationModule />
          </div>
          {/* <MenuProfileModule/> */}
          <NewListModule
            pageName={pageName}
            languageSelected={languageSelected}
            languagesData={languagesData}
            handleDirChange={handleDirChange}
          />
        </aside>
      </div>
      <div
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
      </div>
    </div>
  );
}
