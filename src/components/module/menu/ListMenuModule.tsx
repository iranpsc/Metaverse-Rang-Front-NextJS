import Image from "next/image";
import router from "next/router";

//Types
import {
  ListMenuModuleProps,
  MenuDataItem,
  LanguageDataItem,
} from "@/types/listMenu";

import { ActiveMenuIcon } from "@/svgs/index";
import SvgIcon from "@/module/SvgIcon";

const ListMenuModule: React.FC<ListMenuModuleProps> = ({
  menuData,
  setActiveItem,
  isCollapsed,
  activeItem,
  languageSelected,
  setActiveDropdown,
  activeDropdown,
  languagesData,
  handleDirChange,
}) => {
  const selectItemMenuRoute = (item: any) => {
    setActiveItem(item.id);
    //  router.push(`/${item.code}/citizen/hm-2222/home`);
  };

  return (
    <>
      <ul
        className={`list-none ${
          activeDropdown ? "pb-[50px] " : "pb-0"
        } relative pt-3 w-full  bg-white dark:bg-dark-background  transition-all duration-300 ease-linear max-lg:w-fit`}
      >
        {menuData &&
          menuData.map((item: MenuDataItem) => (
            <li
              key={item.id}
              className="flex relative font-[1rem] no-underline text-black py-[12px]"
              onClick={() => selectItemMenuRoute(item)}
            >
              <div
                className={`flex w-full   ${
                  isCollapsed ? "justify-center" : "justify-start"
                } gap-2 items-center`}
              >
                <ActiveMenuIcon
                  className={
                    item.id === activeItem
                      ? ` ${isCollapsed ? "w-[10px] pr-[17px]" : ""}  ${
                          languageSelected.dir === "rtl"
                            ? "pr-[20px] w-[25px] rotate-180"
                            : "pr-[20px] w-[25px]"
                        } visible  h-[35px] absolute start-0 fill-blueLink dark:fill-dark-yellow `
                      : "hidden"
                  }
                />
                <span
                  className={`${
                    isCollapsed ? "ms-0" : "ms-5"
                  }  inline-block xl:text-[16px] lg:text-[15px] max-lg:text-[15px]`}
                >
                  <SvgIcon
                    name={item.name}
                    color={`${
                      item.id == activeItem
                        ? "stroke-blueLink   dark:dark:stroke-dark-yellow"
                        : `   ${
                            item.name === "home"
                              ? "stroke-blueLink   dark:dark:stroke-dark-yellow "
                              : "stroke-gray"
                          }`
                    }`}
                  />
                </span>
                {item.name === "language" ? (
                  <div>
                    <div className="dropdown relative ">
                      <button
                        className={`bg-gray-300 rounded inline-flex items-center ${
                          isCollapsed ? "hidden" : "visible"
                        }`}
                        onClick={() => setActiveDropdown(!activeDropdown)}
                      >
                        <span
                          className={`font-medium  font-azarMehr  no-underline hover:text-[#0000ffd9] dark:hover:text-dark-yellow ${
                            !activeDropdown
                              ? "text-gray"
                              : "text-[#0066FF] dark:text-dark-yellow"
                          }  `}
                        >
                          {item.translation}
                        </span>
                      </button>
                      <ul
                        className={`dropdown-menu absolute end-0  text-center  ${
                          activeDropdown ? "block " : "hidden"
                        }  text-gray pt-1`}
                      >
                        {languagesData.map((item: LanguageDataItem) => (
                          <li
                            key={item.id}
                            className={`   border-none mt-4   ${
                              languageSelected.name === item.name
                                ? "text-[#0066FF] dark:text-dark-yellow"
                                : ""
                            } flex flex-row items-center  cursor-pointer hover:text-[#0066FF]`}
                            onClick={() => handleDirChange(item)}
                          >
                            <div className=" p-1 w-10  ">
                              {languageSelected.name === item.name && <></>}
                            </div>
                            <div className="flex flex-row justify-evenly items-center w-full">
                              <Image
                              src={item.icon}
                              alt=""
                              width={100}
                              height={100}
                              className={"w-7 h-6 me-10"}
                            />
                           <p className="font-azarMehr font-normal hover:text-[#0000ffd9] dark:hover:text-dark-yellow">{item.native_name}</p> 
                            </div>
                            
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <span
                    className={`   ${
                      item.id === activeItem
                        ? "text-blueLink dark:text-dark-yellow "
                        : `   ${
                            item.name === "home"
                              ? "text-[#0000ffd9] dark:text-dark-yellow "
                              : "text-gray dark:text-gray "
                          }`
                    }  capitalize font-azarMehr font-normal  cursor-pointer hover:text-[#0000ffd9] dark:hover:text-dark-yellow ${
                      isCollapsed ? "hidden" : "visible"
                    } `}
                  >
                    {item.translation}
                  </span>
                )}
              </div>
            </li>
          ))}
        <br />
        <br />
      </ul>
    </>
  );
};

export default ListMenuModule;
