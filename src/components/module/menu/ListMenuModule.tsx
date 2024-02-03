import { useState, useEffect, useContext } from "react";
import Image from "next/image";
//Types
import {
  ListMenuModuleProps,
  MenuDataItem,
  LanguageDataItem,
} from "@/types/listMenu";
import { ActiveMenuIcon, ArrowMenu } from "@/svgs/index";
import SvgIcon from "@/module/SvgIcon";
import { SideBarContext } from "@/components/context/SidebarContext";

const ListMenuModule: React.FC<ListMenuModuleProps> = ({
  menuData,
  setActiveItem,
  activeItem,
  languageSelected,
  setActiveDropdown,
  activeDropdown,
  languagesData,
  handleDirChange,
  pageName,
}) => {
  const [data, setData] = useState(menuData);
  const { isCollapsed, toggleCollapseHandler } = useContext(SideBarContext);

  const selectItemMenuRoute = (i: any, name: string) => {
    if (name !== "language") {
      if (pageName !== "education") setActiveItem(i);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        const filteredMenu = menuData.filter(
          (item: any) =>
            ![
              "home",
              "property",
              "reward",
              "transaction",
              "connection",
            ].includes(item.name)
        );
        setData(filteredMenu);
      } else {
        setData(menuData);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [menuData]);

  const submitLang = (name: string) => {
    if (name === "language") {
      setActiveDropdown(!activeDropdown);
      if (isCollapsed) {
        toggleCollapseHandler();
      } else {
      }
    }
  };

  return (
    <>
      <ul
        className={` list-none ${activeDropdown ? "pb-[50px]  " : "pb-0"} 
      
        
        
        relative pt-3 w-full   bg-white dark:bg-dark-background  transition-all duration-300 ease-linear max-lg:w-fit`}
      >
        {menuData &&
          data.map((item: MenuDataItem, i: number) => (
            <li
              key={item.id}
              className="flex relative font-[1rem] no-underline text-black py-[12px] 3xl:py-[16px]"
              onClick={() => selectItemMenuRoute(i, item.name)}
            >
              <div
                className={`flex w-full group  ${
                  isCollapsed ? "justify-center" : "justify-start"
                } gap-2 items-center`}
                onClick={() => submitLang(item.name)}
              >
                <ActiveMenuIcon
                  className={
                    item.name === "home"
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
                  }    inline-block cursor-pointer xl:text-[16px] 3xl:text-[20px] lg:text-[15px] max-lg:text-[15px] `}
                >
                  <SvgIcon
                    name={item.name}
                    color={`
                           ${
                             item.name === "home" ||
                             (item.name === "language" && activeDropdown)
                               ? "stroke-blueLink   dark:dark:stroke-dark-yellow "
                               : ""
                           }
                    group-hover:stroke-blueLink group-hover:dark:stroke-dark-yellow ${
                      activeItem == i
                        ? " stroke-blueLink dark:stroke-dark-yellow"
                        : "stroke-gray dark:stroke-dark-gray"
                    } w-[17px] h-[17px] `}
                  />
                </span>
                {item.name === "language" ? (
                  <div className="dropdown relative cursor-pointer ">
                    <span
                      className={` relative rounded flex justify-center  3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle  items-center ${
                        isCollapsed ? "hidden" : "visible"
                      }`}
                    >
                      <span
                        className={`font-medium pe-2  font-azarMehr  no-underline group-hover:text-[#0000ffd9] dark:group-hover:text-dark-yellow ${
                          !activeDropdown
                            ? "text-gray dark:text-dark-gray"
                            : "text-[#0066FF] dark:text-dark-yellow"
                        }  
                       
                        
                        `}
                      >
                        {item.translation}
                      </span>
                      <ArrowMenu
                        className={`ms-1 stroke-gray 
                        ${
                          activeDropdown ? "rotate-[90deg]" : "rotate-[270deg]"
                        }`}
                      />
                    </span>

                    <ul
                      className={` dropdown-menu absolute w-full text-center start-[-20px] ${
                        activeDropdown
                          ? "flex flex-col justify-center items-center  "
                          : "hidden"
                      }  text-gray pt-1`}
                    >
                      {languagesData.map((item: LanguageDataItem) => (
                        <li
                          key={item.id}
                          className={` border-none mt-4 w-full   ${
                            languageSelected.name === item.name
                              ? "text-[#0066FF] dark:text-dark-yellow"
                              : ""
                          } ${
                            isCollapsed ? "hidden" : "flex"
                          } flex flex-col items-center justify-start    cursor-pointer hover:text-[#0066FF]`}
                          onClick={() => handleDirChange(item)}
                        >
                          <div className=" w-10">
                            {languageSelected.name === item.name && <></>}
                          </div>
                          <div className="flex flex-row gap-2 justify-start  items-center w-full ">
                            <Image
                              src={item.icon}
                              alt=""
                              width={100}
                              height={100}
                              className={"w-6 h-6  3xl:w-7 3xl:h-7"}
                            />
                            <p className="font-azarMehr  w-full 3xl:text-[20px] font-normal hover:text-[#0000ffd9] dark:hover:text-dark-yellow">
                              {item.native_name}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <span
                    className={`${
                      item.name === "home"
                        ? "text-[#0000ffd9] dark:text-dark-yellow "
                        : " "
                    }
                     capitalize 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle
                      ${
                        activeItem === i
                          ? "text-[#0066FF] dark:text-dark-yellow"
                          : "text-gray dark:text-dark-gray "
                      }
                     font-azarMehr font-normal 3xl:text-[22px] cursor-pointer  group-hover:text-[#0000ffd9] dark:group-hover:text-dark-yellow ${
                       isCollapsed ? "hidden" : "visible"
                     } `}
                  >
                    {item.translation}
                  </span>
                )}
              </div>
            </li>
          ))}

        <li className=" h-[200px] w-full"></li>
      </ul>
    </>
  );
};

export default ListMenuModule;
