import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Dark, Light } from "@/svgs/index";
import { useTheme } from "next-themes";

//CONTEXT
import { SideBarContext } from "@/context/SidebarContext";
//LANGUAGE
import { LangContext } from "@/context/LangContext";
//MODULES
import LoginMenuModule from "@/module/menu/LoginMenuModule";
import ListMenuModule from "@/module/menu/ListMenuModule";
import HeaderMenuModule from "../menu/HeaderMenuModule";
import HeaderMenuEducationModule from "./HeaderMenuEducationModule";
//UTILS
import {
  sidebarFilteredData,
 
} from "@/components/utils/sidebarfuncs";
import ThemeMenuModule from "../menu/ThemeMenuModule";

interface LanguageItem {
  id: number;
  code: string;
  name: string;
  native_name:string;
  direction: string;
  icon: string;
  file_url: string;
}


export default function SideBarEducation({
  setShowAuthCard,
  pageName,
  profileData,
  titleData,
  setShowLogOut,
  activeItem,
  SetActiveItem,
}: any) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [loginData, setLoginData] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [themeData, setThemeData] = useState<any[]>([]);
  const [themeDataActive, setThemeDataActive] = useState<any>("light");
  const [data, setData] = useState<any>([]);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const { isCollapsed, toggleCollapseHandler } = useContext(SideBarContext);
  const { languagesData, languageSelected, setLanguagesSelected } =
    useContext(LangContext);
  const { userId } = router.query;

  useEffect(() => {
    setActiveDropdown(false);
  }, [languageSelected.name]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${languageSelected.file_url}`);

        switch (pageName) {
          case "citizen":
            setData(
              sidebarFilteredData(res.data.modals, pageName)?.filteredItems
            );
            setLoginData(
              sidebarFilteredData(res.data.modals, pageName)?.filteredLogin
            );
            setHeaderData(
              sidebarFilteredData(res.data.modals, pageName)?.filteredHeader
            );
            setThemeData(
              sidebarFilteredData(res.data.modals, pageName)?.filteredThemeMode
            );
            break;
          case "education":
            setData(
              sidebarFilteredData(res.data.modals, pageName)
                ?.filteredItemsEducation
            );
            setLoginData(
              sidebarFilteredData(res.data.modals, "citizen")?.filteredLogin
            );
            setHeaderData(
              sidebarFilteredData(res.data.modals, pageName)
                ?.filteredHeaderEducation
            );
          default:
            return [];
        }
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
    setThemeDataActive(theme);
  }, [theme]);

  useEffect(() => {
    const element = document.querySelector(".scroll");
    if (element) {
      setTimeout(() => {
        const maxScroll = element.scrollHeight - element.clientHeight;
        let currentScroll = element.scrollTop;

        const scrollStep = () => {
          currentScroll += 5;
          element.scrollTop = currentScroll;

          if (currentScroll < maxScroll) {
            setTimeout(scrollStep, 10);
          }
        };

        scrollStep();
      }, 300);
    }
  }, [activeDropdown]);

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <div className="  xl:relative lg:relative  bg-white dark:bg-dark-background ">
      <div
        className={`xl:min-h-screen scroll lg:min-h-screen md:min-h-screen overflow-y-scroll  relative sm:min-h-screen xs:min-h-screen ${
          isCollapsed
            ? "sm:hidden xs:hidden md:hidden transition-2 xl:block lg:block"
            : "backdrop-blur-sm  bg-blackTransparent/30"
        }   sm:absolute  xs:absolute  xl:relative lg:relative md:absolute xl:w-fit lg:w-fit md:w-full z-[60] sm:w-full xs:w-full no-scrollbar  `}
        onClick={toggleCollapseHandler}
      >
        <aside
          className={`${
            isCollapsed
              ? "w-[70px] max-lg:hidden"
              : "xl:w-[250px]   lg:w-[150px] md:w-[250px] sm:w-[175px] xs:w-[175px] sm:shadow-[#000000] xs:sm:shadow-[#000000] visible"
          }  h-screen relative   bg-white  dark:bg-dark-background transition-all duration-300 ease-linear 
        `}
          onClick={toggleCollapseHandler}
        >
          <div className="sticky w-full top-0 pt-4 z-50 bg-white dark:bg-dark-background transition-all duration-300 ease-linear">
            <HeaderMenuEducationModule
              isCollapsed={isCollapsed}
              menuData={headerData}
              toggleCollapseHandler={toggleCollapseHandler}
            />
          </div>
          {/* <MenuProfileModule/> */}
          <ListMenuModule
            pageName={pageName}
            isCollapsed={isCollapsed}
            menuData={data}
            setActiveItem={SetActiveItem}
            activeItem={activeItem}
            languageSelected={languageSelected}
            setActiveDropdown={setActiveDropdown}
            activeDropdown={activeDropdown}
            languagesData={languagesData}
            handleDirChange={handleDirChange}
          />
        </aside>
      </div>
      <div
        className={`${
          isCollapsed
            ? "w-[70px] sm:hidden xs:hidden md:hidden transition-2 xl:block lg:block"
            : "xl:w-[250px]   lg:w-[150px] md:w-[250px] sm:w-[175px] xs:w-[175px]"
        }  h-fit absolute  z-[100] transition-all duration-300 ease-linear  bg-white dark:bg-dark-background  bottom-0 py-5 flex flex-col items-center justify-center gap-3`}
      >
        <LoginMenuModule
          isCollapsed={isCollapsed}
          toggleCollapseHandler={toggleCollapseHandler}
          setShowAuthCard={setShowAuthCard}
          menuData={loginData}
          profileData={profileData}
          setShowLogOut={setShowLogOut}
        />
        <ThemeMenuModule />
      </div>
    </div>
  );
}
