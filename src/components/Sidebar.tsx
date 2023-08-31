import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SideBarContext } from "./context/SidebarContext";
import { useTheme } from "next-themes";
import {
  ActiveMenuIcon,
  CLoseIcon,
  MenuIcon,
} from "./svgs";
import LanguageList from "./templates/LanguageList";
import { LangContext } from "@/components/context/LangContext";
import { useRouter } from "next/router";
import AuthCard from "./layout/AuthCards";

import LoginMenuModule from './module/menu/LoginMenuModule';
import HeaderMenuModule from './module/menu/HeaderMenuModule';
import TopMenuModule from './module/menu/TopMenuModule';
import ListMenuModule from "./module/menu/ListMenuModule";



export default function Sidebar({ setShowAuthCard }:any) {
  const router = useRouter();
  const [activeItem, SetActiveItem] = useState<number>(0);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const { isCollapsed, toggleCollapseHandler } = useContext(SideBarContext);
  const { menuData, languagesData, languageSelected, setLanguagesSelected } =
    useContext(LangContext);
  const { systemTheme, theme, setTheme } = useTheme();
  const { lang, userId } = router.query;

  useEffect(() => {
    setActiveDropdown(false);
  }, [languageSelected.name, isCollapsed]);
  const handleDirChange = (item: any) => {
    setLanguagesSelected({
      id: item.id,
      code: item.code,
      name: item.name,
      dir: item.direction,
      icon: item.icon,
    });
    router.push(`/${item.code}/citizen/${userId}`);
  };
  return (
    <div
      className={`min-h-screen overflow-y-scroll  relative max-lg:h-[100px] ${
        isCollapsed
          ? "max-lg:hidden "
          : "backdrop-blur-sm pe-10 bg-blackTransparent/30 "
      }   max-lg:absolute  w-fit  z-[60] max-lg:w-full   no-scrollbar`}
    >
      <aside
        className={`${
          isCollapsed
            ? "w-[70px] max-lg:hidden"
            : "xl:w-[250px]  lg:w-[250px] max-lg:w-[175px] max-lg:bg-white max-lg:shadow-[#000000] visible"
        }  min-h-screen  dark:bg-dark-background   sm:z-50 transition-all duration-300 ease-linear p-0
        flex flex-col justify-between items-center sticky
        `}
      >
        <div className="sticky w-full top-0 z-50 bg-white dark:bg-dark-background  transition-all duration-300 ease-linear ">
          <HeaderMenuModule
            isCollapsed={isCollapsed}
            toggleCollapseHandler={toggleCollapseHandler}
          />

          <TopMenuModule isCollapsed={isCollapsed} menuData={menuData} />
        </div>

        <ListMenuModule
          isCollapsed={isCollapsed}
          menuData={menuData}
          SetActiveItem={SetActiveItem}
          activeItem={activeItem}
          languageSelected={languageSelected}
          setActiveDropdown={setActiveDropdown}
          activeDropdown={activeDropdown}
          languagesData={languagesData}
          handleDirChange={handleDirChange}
        />

        <LoginMenuModule
          isCollapsed={isCollapsed}
          setShowAuthCard={setShowAuthCard}
          menuData={menuData}
        />
      </aside>
    </div>
  );
}
