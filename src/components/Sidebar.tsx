import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
//CONTEXT
import { SideBarContext } from "./context/SidebarContext";
//LANGUAGE
import { LangContext } from "@/context/LangContext";
//MODULES
import LoginMenuModule from './module/menu/LoginMenuModule';
import HeaderMenuModule from './module/finalMenu/HeaderMenuModule';
import TopMenuModule from './module/menu/TopMenuModule';
import ListMenuModule from "./module/menu/ListMenuModule";

interface LanguageItem {
  id: number;
  code: string;
  name: string;
  native_name:string;
  direction: string;
  icon: string;
  file_url: string;
}

export default function Sidebar({ setShowAuthCard,page }:any) {
  const router = useRouter();
  const [activeItem, SetActiveItem] = useState<number>(0);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const { isCollapsed, toggleCollapseHandler } = useContext(SideBarContext);
  const { languagesData, languageSelected, setLanguagesSelected,data } =
    useContext(LangContext);
  const {userId } = router.query;


  useEffect(() => {
    setActiveDropdown(false);
  }, [languageSelected.name, isCollapsed]);
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
    router.push(`/${item.code}/citizen/${userId}`);
  };
  return (
    <div
      className={`xl:min-h-screen lg:min-h-screen md:min-h-screen overflow-y-scroll bg-white dark:bg-dark-background relative sm:max-h-screen xs:max-h-screen ${
        isCollapsed
          ? "sm:hidden xs:hidden xl:block lg:block md:block "
          : "backdrop-blur-sm pe-20 bg-blackTransparent/30 "
      }   sm:absolute xs:absolute xl:relative lg:relative md:relative xl:w-fit lg:w-fit md:w-fit z-[60] sm:w-full xs:w-full no-scrollbar`}
    >
      <aside
        className={`${
          isCollapsed
            ? "w-[70px] max-lg:hidden"
            : "xl:w-[250px]  lg:w-[250px] md:w-[250px] sm:w-[175px] xs:w-[175px] sm:shadow-[#000000] xs:sm:shadow-[#000000] visible"
        }  min-h-screen    sm:z-50 transition-all duration-300 ease-linear p-0
        flex flex-col justify-between items-center sticky
        `}
      >
        <div className="sticky w-full top-0 z-50 bg-white dark:bg-dark-background  transition-all duration-300 ease-linear ">
          <HeaderMenuModule
            isCollapsed={isCollapsed}
            toggleCollapseHandler={toggleCollapseHandler}
          />

          <TopMenuModule isCollapsed={isCollapsed} menuData={data.data.menu} />
        </div>
        {/* <MenuProfileModule/> */}
        <ListMenuModule
        pageName="educaion"
          isCollapsed={isCollapsed}
          menuData={data.data.menu}
          setActiveItem={SetActiveItem}
          activeItem={activeItem}
          languageSelected={languageSelected}
          setActiveDropdown={setActiveDropdown}
          activeDropdown={activeDropdown}
          languagesData={languagesData}
          handleDirChange={handleDirChange}
        />
        <LoginMenuModule
          isCollapsed={isCollapsed}
          toggleCollapseHandler={toggleCollapseHandler}
          setShowAuthCard={setShowAuthCard}
          menuData={data.data.menu}
        />
      </aside>
    </div>
  );
}
