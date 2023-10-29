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
import { sidebarFilteredData } from "@/components/utils/sidebarfuncs";

interface LanguageItem {
  id: number;
  code: string;
  name: string;
  direction: string;
  icon: string;
  file_url: string;
}

export default function SideBarEducation({ setShowAuthCard, pageName }: any) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [loginData,setLoginData]=useState([]);
  const [headerData,setHeaderData]=useState([]);
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
        const res = await axios.get(
          "https://play.irpsc.com/metaverse/lang/fa.json"
        );
      
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
            break;
              case 'education':
                setData(
                  sidebarFilteredData(res.data.modals, pageName)
                    ?.filteredItemsEducation
                );
        setLoginData(
          sidebarFilteredData(res.data.modals, pageName)?.filteredLoginEducation
        );
        setHeaderData(
          sidebarFilteredData(res.data.modals, pageName)?.filteredHeaderEducation
        );
          default:
            return [];
        }  
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDirChange = (item: LanguageItem) => {
    setLanguagesSelected({
      id: item.id,
      code: item.code,
      name: item.name,
      dir: item.direction,
      icon: item.icon,
      file_url: item.file_url,
    });
    router.push(`/${item.code}/citizen/${userId}`);
  };
  return (
    <div
      className={`xl:min-h-screen  lg:min-h-screen md:min-h-screen overflow-y-scroll bg-white dark:bg-dark-background relative sm:max-h-screen xs:max-h-screen ${
        isCollapsed
          ? "sm:hidden xs:hidden pe-[10px] xl:block lg:block md:block "
          : "backdrop-blur-sm  bg-blackTransparent/30 "
      }   sm:absolute xs:absolute xl:relative lg:relative md:relative xl:w-fit lg:w-fit md:w-fit z-[60] sm:w-full xs:w-full no-scrollbar`}
    >
      <aside
        className={`${
          isCollapsed
            ? "w-[70px] max-lg:hidden"
            : "xl:w-[250px]  lg:w-[250px] md:w-[250px] sm:w-[175px] xs:w-[175px] sm:shadow-[#000000] xs:sm:shadow-[#000000] visible"
        }  min-h-screen    sm:z-50 transition-all duration-300 ease-linear p-0
        flex flex-col justify-between items-center sticky pb-10
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

        <div
          className={` ${
            isCollapsed ? "invisible" : "visible"
          } rounded-full w-[90%] cursor-pointer flex flex-row justify-evenly items-center mt-3 py-1 bg-[#F4F4F4] dark:bg-black`}
        >
          <div
            className={`
          ${theme === "dark" ? "bg-[#1A1A18]" : ""}
          w-[135px] h-[30px] rounded-full flex flex-row  justify-center items-center gap-3 ms-1`}
            onClick={() => setTheme("dark")}
          >
            <p className={` ${theme === "dark" ? "text-white" : "text-black"}`}>
              تیره
            </p>
            <Dark
              className={` ${
                theme === "dark" ? "stroke-white" : "stroke-gray"
              }  stroke-[2px]`}
            />
          </div>
          <div
            className={`
          ${theme === "dark" ? "#1A1A18" : "bg-[#fcfcfc]"}
          w-[135px] h-[30px] rounded-full flex flex-row  justify-center items-center gap-3`}
            onClick={() => setTheme("light")}
          >
            <p className={` ${theme === "dark" ? "text-gray" : "text-black"}`}>
              روشن
            </p>
            <Light
              className={` ${
                theme === "dark"
                  ? "stroke-gray fill-gray"
                  : "stroke-black fill-black"
              }`}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
