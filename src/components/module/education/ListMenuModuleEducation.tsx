import router from "next/router";
//Types
import {
  ListMenuModuleProps,

  LanguageDataItem,
} from "@/types/listMenu";

import { ActiveMenuIcon, Arrow } from "@/svgs/index";
import SvgIcon from "@/module/SvgIcon";

const ListMenuEducation: React.FC<ListMenuModuleProps> = ({
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
  
  
  
  const namesToDelete = [
    ,
    "meta rgb",
    "metaverse rang",
    "log in",
    "logout",
    "citizenship page",
    "enter the metaverse",
  ];


  const filteredItems = menuData.filter(
    (item: any) => !namesToDelete.includes(item.name)
  );


  const selectItemMenuRoute = ((item:any)=>{
   
  })



  return (
    <>
      <ul className="list-none relative pt-3 w-full  bg-white dark:bg-dark-background  transition-all duration-300 ease-linear max-lg:w-fit   ">
        {filteredItems &&
          filteredItems.map((item) => (
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
                        } visible  h-[35px] absolute start-0 fill-blueLink dark:fill-dark-yellow`
                      : "hidden"
                  }
                />
                <span
                  className={`${
                    isCollapsed ? "ms-0" : "ms-5"
                  }  inline-block xl:text-[16px]  lg:text-[15px] max-lg:text-[15px]`}
                >
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
                  <div className="p-0 m-0 w-full  ">
                 
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
                        {languagesData.map((item: LanguageDataItem) => (
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
                    A</div>
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

export default ListMenuEducation;
