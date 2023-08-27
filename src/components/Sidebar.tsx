import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SideBarContext } from "./context/SidebarContext";
import { useTheme } from "next-themes";
import SvgIcon from "./module/SvgIcon";
import { ActiveMenuIcon, CLoseIcon, HomeIcon, MenuIcon } from "./svgs";
import LanguageList from "./templates/LanguageList";
import { LangContext } from "@/components/context/LangContext";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const [activeItem, SetActiveItem] = useState<number>(0);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const { isCollapsed, toggleCollapseHandler } = useContext(SideBarContext);
  const { menuData, languagesData, languageSelected, setLanguagesSelected } =
    useContext(LangContext);
  const { systemTheme, theme, setTheme } = useTheme();

  // const handleDirChange = (event: any) => {
  //   console.log("object:",event.target.value)
  //   const [selectedId,selectedCode, selectedLangName,selectedDirection] = event.target.value.split(",");
  //   setLanguagesSelected({ id: selectedId, code:selectedCode,name: selectedLangName ,dir:selectedDirection});
  //   router.push(`/${selectedCode}/citizen/test`);
  // };

  useEffect(() => {
    setActiveDropdown(false);
  }, [languageSelected.name, isCollapsed]);
  const handleDirChange = (item: any) => {
    console.log("object:", item);
    // const [selectedId,selectedCode, selectedLangName,selectedDirection] = event.target.value.split(",");
    setLanguagesSelected({
      id: item.id,
      code: item.code,
      name: item.name,
      dir: item.direction,
      icon: item.icon,
    });
    router.push(`/${item.code}/citizen/profile`);
  };

  // overflow-y-scroll  no-scrollbar
  return (
    <div
      className={`min-h-screen overflow-y-scroll  relative max-lg:h-[100px] ${
        isCollapsed
          ? "max-lg:hidden"
          : "backdrop-blur-sm bg-blackTransparent/30 "
      }   max-lg:absolute z-50 max-lg:w-full   no-scrollbar`}
    >
      <aside
        className={`${
          isCollapsed
            ? "w-[70px] max-lg:hidden"
            : "xl:w-[250px]  lg:w-[250px] max-lg:w-[175px] max-lg:bg-white max-lg:w-fit visible"
        }  min-h-screen  dark:bg-dark-background  sm:z-50 transition-all duration-300 ease-linear p-0`}
      >
        <div className="sticky top-0 z-50 bg-white dark:bg-dark-background  transition-all duration-300 ease-linear ">
          <div className="flex   justify-between flex-row items-center p-2 pb-7">
            {!isCollapsed ? (
              <CLoseIcon
                className="fill-[#2B2B2B] dark:fill-gray  cursor-pointer w-[25px]"
                onClick={toggleCollapseHandler}
              />
            ) : (
              <MenuIcon
                className="stroke-[#2B2B2B] dark:stroke-gray    cursor-pointer w-[35px]"
                onClick={toggleCollapseHandler}
              />
            )}
            <Image
              src={theme === "dark" ? "/light.png" : "/moon.png"}
              alt=""
              width={20}
              height={20}
              className={`${
                isCollapsed
                  ? "hidden"
                  : "visible cursor-pointer  xl:mx-10 lg:mx-10 mx-4"
              }`}
              onClick={() =>
                theme == "dark" ? setTheme("light") : setTheme("dark")
              }
            />
          </div>
          <div
            className={` ${
              isCollapsed ? "w-full" : "w-full"
            } flex items-center gap-1 justify-center pb-[1rem]`}
          >
            <Image
              src="/cdlogo.png"
              width={1000}
              height={1000}
              alt=""
              className=" xl:w-[50px] xl:h-[50px] lg:w-[33px] lg:h-[33px] max-lg:w-[30px] max-lg:h-[30px] object-cover rounded-[1rem]"
            />
            <div className="inline-block w-full ">
              <p
                className={`${
                  isCollapsed
                    ? "hidden"
                    : "visible dark:text-white block font-azarMehr  font-bold xl:text-xl lg:text-md max-lg:text-md text-black"
                }`}
              >
                Meta Rgb
              </p>
              <p
                className={`${
                  isCollapsed
                    ? "hidden"
                    : "dark: text-dark-gray visible font-normal text-mediumGray xl:text-lg lg:text-sm max-lg:text-sm"
                }`}
              >
                Metaverse Rang
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full">
          <hr className="w-full  mx-12 text-lightGray" />
        </div>
        <ul className="list-none bg-white dark:bg-dark-background  transition-all duration-300 ease-linear max-lg:w-fit   ">
          {menuData &&
            menuData.map((item: any) => (
              <li
                key={item.id}
                className="flex font-[1rem] no-underline text-black py-[12px]"
                onClick={() => SetActiveItem(item.id)}
              >
                <div className=" flex w-full relative  justify-start gap-2 items-center">
                  <ActiveMenuIcon
                    className={
                      item.id === activeItem
                        ? ` ${isCollapsed ? " w-[10px] pr-[25px]" : ""}  ${
                            languageSelected.dir === "rtl"
                              ? "pr-[20px] w-[30px] rotate-180"
                              : "pr-[20px] w-[30px]"
                          } visible  h-[35px] absolute   fill-blueLink dark:fill-dark-yellow`
                        : "hidden"
                    }
                  />
                  <span className=" inline-block xl:text-[16px] lg:text-[15px] max-lg:text-[15px]">
                    <SvgIcon
                      name={item.name}
                      color={`${
                        item.id == activeItem
                          ? "stroke-blueLink   dark:dark:stroke-dark-yellow"
                          : "stroke-gray"
                      }`}
                    />
                  </span>
                  {item.name === "language" ? (
                    <div className="p-0 m-0 w-full ">
                      <div className="dropdown inline-block  relative ">
                        <button
                          className={`bg-gray-300  py-2  rounded inline-flex items-center ${
                            isCollapsed ? "hidden" : "visible"
                          }`}
                          onClick={() => setActiveDropdown(!activeDropdown)}
                        >
                          <span
                            className={`font-medium mx-3 font-azarMehr no-underline ${
                              !activeDropdown
                                ? "text-gray"
                                : "text-[#0066FF] dark:text-dark-yellow"
                            } text-black`}
                          >
                            {languageSelected.name}
                          </span>
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                          </svg>
                        </button>
                        <ul
                          className={`dropdown-menu absolute text-center ${
                            activeDropdown ? "block" : "hidden"
                          }  text-gray pt-1`}
                        >
                          {languagesData.map((item: any) => (
                            <li
                              key={item.id}
                              className={`border-none font-azarMehr font-normal ${
                                languageSelected.name === item.name
                                  ? "text-[#0066FF] dark:text-dark-yellow"
                                  : ""
                              } flex flex-row  items-center cursor-pointer hover:text-[#0066FF]`}
                              onClick={() => handleDirChange(item)}
                            >
                              <div className=" p-1 w-10 ">
                                {languageSelected.name === item.name && (
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 16 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1 7.25L4.81818 11L15 1"
                                      stroke="#0066FF"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </div>

                              {item.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <span
                      className={`   ${
                        item.id === activeItem
                          ? "text-blueLink dark:text-dark-yellow  "
                          : "text-gray dark:text-gray"
                      }  capitalize font-azarMehr font-normal cursor-pointer hover:text-[#0000ffd9] ${
                        isCollapsed ? "hidden" : "visible"
                      } `}
                    >
                      {item.name}
                    </span>
                  )}
                </div>
              </li>
            ))}

          {/* {menuData.length > 1 && <LanguageList />} */}
          <br />

          <br />
          <br />
          <br />
          <br />
        </ul>
      </aside>
    </div>
  );
}
