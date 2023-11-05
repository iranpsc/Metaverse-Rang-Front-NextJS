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

interface LanguageItem {
  id: number;
  code: string;
  name: string;
  native_name:string;
  direction: string;
  icon: string;
  file_url: string;
}

export default function SideBarEducation({ setShowAuthCard, pageName }: any) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [loginData,setLoginData]=useState([]);
  const [headerData,setHeaderData]=useState([]);
  const [themeData,setThemeData]=useState<any[]>([]);
  const [activeItem, SetActiveItem] = useState<number>(0);
  const [data, setData] = useState<any>([]);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const { isCollapsed, toggleCollapseHandler } = useContext(SideBarContext);
  const { languagesData, languageSelected, setLanguagesSelected } =
    useContext(LangContext);
  const { userId } = router.query;

  useEffect(() => {
    setActiveDropdown(false);
  }, [languageSelected.name, isCollapsed]);

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
              sidebarFilteredData(res.data.modals, pageName)
                ?.filteredLoginEducation
            );
            setHeaderData(
              sidebarFilteredData(res.data.modals, pageName)
                ?.filteredHeaderEducation
            );
          default:
            return [];
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [languageSelected.file_url]);

  const handleDirChange = (item: LanguageItem) => {
    setLanguagesSelected({
      id: item.id,
      code: item.code,
      name: item.name,
      native_name:item.native_name,
      dir: item.direction,
      icon: item.icon,
      file_url: item.file_url,
    });
    router.push(`/${item.code}/citizen/${userId}`);
  };

  const changeTheme =()=>{
    if(theme === "dark"){
      setTheme("light")
    }else{
setTheme("dark")
    }
  }
  return (
    <div className=" xl:relative lg:relative md:relative bg-white dark:bg-dark-background">
      <div
        className={`xl:min-h-screen  lg:min-h-screen md:min-h-screen overflow-y-scroll  relative sm:max-h-screen xs:max-h-screen ${
          isCollapsed
            ? "sm:hidden xs:hidden  xl:block lg:block md:block "
            : "backdrop-blur-sm  bg-blackTransparent/30 "
        }   sm:absolute xs:absolute   xl:relative lg:relative md:relative xl:w-fit lg:w-fit md:w-fit z-[60] sm:w-full xs:w-full no-scrollbar`}
      >
        <aside
          className={`${
            isCollapsed
              ? "w-[70px] max-lg:hidden"
              : "xl:w-[250px]  lg:w-[175px] md:w-[250px] sm:w-[175px] xs:w-[175px] sm:shadow-[#000000] xs:sm:shadow-[#000000] visible"
          }  min-h-screen    sm:z-50 transition-all duration-300 ease-linear
        flex flex-col justify-between items-center sticky
        `}
        >
          <div className="sticky w-full top-0 z-50 bg-white dark:bg-dark-background  transition-all duration-300 ease-linear ">
            <HeaderMenuModule
              isCollapsed={isCollapsed}
              toggleCollapseHandler={toggleCollapseHandler}
            />

            <HeaderMenuEducationModule
              isCollapsed={isCollapsed}
              menuData={headerData}
              toggleCollapseHandler={toggleCollapseHandler}
            />
          </div>
          {/* <MenuProfileModule/> */}
          <ListMenuModule
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
          <LoginMenuModule
            isCollapsed={isCollapsed}
            toggleCollapseHandler={toggleCollapseHandler}
            setShowAuthCard={setShowAuthCard}
            menuData={loginData}
          />
        </aside>
      </div>

      {isCollapsed ? (
        <div className="flex justify-center items-center xl:flex lg:flex md:flex sm:hidden xs:hidden">
          <div className="absolute bottom-3  w-[50px] h-[50px] flex flex-col justify-center items-center  z-[100]  bg-white dark:bg-dark-background ">
            <hr
              className={`${
                isCollapsed ? "mx-5" : "mx-2"
              } border-[1px] w-[90%] border-[#00000017] dark:border-[#3F3F3F] mb-3`}
            />
            <div className="z-50 rounded-full w-[90%] cursor-pointer flex flex-row justify-evenly items-center bg-[#e8e8e8]  dark:bg-[#000] ">
              <div
                className={`
          ${theme === "dark" ? "bg-[#1A1A18]" : ""}
          w-[30px] h-[30px] my-1 rounded-full flex flex-row  justify-center items-center `}
                onClick={changeTheme}
              >
                {theme === "dark" ? (
                  <Dark
                    className={` ${
                      theme === "dark" ? "stroke-white" : "stroke-gray"
                    }  stroke-[2px] `}
                  />
                ) : (
                  <Light
                    className={` ${
                      theme === "dark"
                        ? "stroke-gray fill-gray"
                        : "stroke-black fill-black"
                    }`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="xl:w-[250px]  lg:w-[175px] md:w-[250px] sm:w-[175px] xs:w-[175px] absolute xl:bottom-3  lg:bottom-3  md:bottom-3 sm:bottom-0 xs:bottom-0  w-full h-[50px] flex flex-col justify-center items-center  z-[100]  bg-white dark:bg-dark-background ">
          <hr
            className={`${
              isCollapsed ? "mx-5" : "mx-2"
            } border-[1px] w-[90%] border-[#00000017] dark:border-[#3F3F3F] xl:mb-3`}
          />
          <div className="z-50 rounded-full w-[90%] cursor-pointer flex flex-row justify-evenly items-center bg-[#e8e8e8]  dark:bg-[#000] ">
            <div
              className={`
          ${theme === "dark" ? "#1A1A18" : "bg-[#fcfcfc]"}
          w-[135px] h-[30px] my-1 ms-1 rounded-full flex flex-row  justify-center items-center gap-3`}
              onClick={() => setTheme("light")}
            >
              <Light
                className={` ${
                  theme === "dark"
                    ? "stroke-gray fill-gray"
                    : "stroke-black fill-black"
                }`}
              />
              <p
                className={` ${
                  theme === "dark" ? "text-white" : "text-black"
                } font-azarMehr font-medium text-[15px] mb-1 `}
              >
                {themeData[0]?.name && themeData[0].translation}
              </p>
            </div>

            <div
              className={`
          ${theme === "dark" ? "bg-[#1A1A18]" : ""}
          w-[135px] h-[30px] my-1 rounded-full flex flex-row  justify-center items-center gap-3 me-1 `}
              onClick={() => setTheme("dark")}
            >
              <Dark
                className={` ${
                  theme === "dark" ? "stroke-white" : "stroke-gray"
                }  stroke-[2px] `}
              />
              <p
                className={` ${
                  theme === "dark" ? "text-white" : "text-black"
                } font-azarMehr text-[15px] font-medium mb-1`}
              >
                {themeData[1]?.name && themeData[1].translation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
