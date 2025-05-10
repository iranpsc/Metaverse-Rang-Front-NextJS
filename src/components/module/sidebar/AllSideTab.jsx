"use client";
//Types
import ListMenuSvgModule from "./list/ListMenuSvgModule";
import ListMenuTitleModule from "./list/ListMenuTitleModule";
import ListMenuArrow from "./list/ListMenuArrow";
import DropdownLanguageModule from "./list/dropdowns/DropdownLanguageModule";
import { Modals_fa, Modals_en } from "@/components/utils/modals-content";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/templates/modal";
import ListMenuActiveIconModule from "./list/ListMenuActiveIconModule";
import { useRouter, usePathname } from "next/navigation";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import Link from "next/link";

export default function SideBarContent({
  tabsMenu,
  langData,
  isClosed,
  langArray,
  params,
}) {
  const pathName = usePathname();

  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [langDropDown, setLangDropDown] = useState(false);
  const [trainingDropDown, setTrainingDropDown] = useState(
    pathName.endsWith(`/${params.lang}/education`) ||
      pathName.includes(`/category/all`)
      ? true
      : false
  );
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const closeModal = () => {
    setModalShow(false);
  };

  const onTabClick = (item) => {
    if (item.url != undefined) {
      // external LINKs
      if (item.url.startsWith("http://") || item.url.startsWith("https://")) {
        window.open(item.url, "_blank");
      } else {
        router.push(`/${params.lang}/${item.url}`);
      }
    } else {
      // internal LINKs
      if (langData.code === "fa") {
        const temp = Modals_fa.find((x) => x.id == item.id);

        if (temp) {
          setModalShow(true);
          setModalData(temp);
        }
      } else {
        const temp = Modals_en.find((x) => x.id == item.id);
        if (temp) {
          setModalShow(true);
          setModalData(temp);
        }
      }
    }
  };

  const handleTrainingBtn = () => {
    setTrainingDropDown(!trainingDropDown);
  };

  const handleLangBtn = () => {
    setLangDropDown(!langDropDown);
  };

  // scroll to bot when langDropDown is true
  useEffect(() => {
    if (langDropDown && dropdownRef.current) {
      setTimeout(() => {
        dropdownRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [langDropDown]);

  // *selected nav item (add item.active property to own obj)
  tabsMenu.forEach((item) => {
    let urlThemp;

    // Referral route handling
    if (item.url == "referral") {
      urlThemp = `/${params.lang}/citizens/${params.id}/referral`;
      item.url = `/citizens/${params.id}/referral`;
    } else if (item.unique_id == "1374") {
      // 1374 = Citizen Information
      urlThemp = `/${params.lang}/citizens/${params.id}`;
    } else if (item.unique_id == "149") {
      // 149 = Home (Set explicitly)
      urlThemp = `/${params.lang}`;
    } else {
      // Convert URL to match pathName
      urlThemp = `/${params.lang}${item.url ? "/" + item.url : ""}`;
    }

    //  Only mark home as active if it's exactly `/fa`
    if (item.unique_id == "149") {
      item.active = pathName === `/${params.lang}`;
    }
    // Mark "trainings" as active for `/education` and `/education/category/....`
    else if (
      item.unique_id == "87" &&
      pathName.startsWith(`/${params.lang}/education`)
    ) {
      item.active = true;
    }
    // ✅ General case for other items (excluding home & trainings), 1414 is language
    else if (
      urlThemp &&
      pathName.includes(urlThemp) &&
      item.unique_id != 1414
    ) {
      item.active = true;
    }
  });


  return (
    <>
      {/* ${
          // state.showFullModal ? "pb-[350px] xs:pb-[400px] " : "pb-[200px]"
        }  */}
      {modalShow && <Modal dataObject={modalData} close={closeModal} />}
      <ul
        id="light-scrollbar"
        className={`h-full z-[100] flex flex-col list-none overflow-y-scroll relative no-scrollbar relative pt-3 w-full menu-transition max-lg:w-fit`}
      >
        {tabsMenu &&
          tabsMenu.map((item, i) => (
            //*HINT*the way to pass parameters to function in nextjs "onTabClick(item)"
            <React.Fragment key={`fragment-${item.id}-${i}`}>
              {item.toShow && (
                <li style={{ order: item.order }}>
                  <Tooltip
                    title={item.translation}
                    placement={
                      langData.direction == "rtl" ? "left-end" : "right-end"
                    }
                    // slotProps is used to apply custom styles and props to the internal elements (slots)
                    slotProps={{
                      tooltip: {
                        // Applies Tailwind classes to the tooltip container
                        className:
                          "bg-white dark:bg-dark-background font-azarMehr font-medium text-black dark:text-white text-[14px] lg:text-[16px]",
                      },
                    }}
                    // PopperProps is used to configure the behavior and positioning
                    PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -13], // Adjusts tooltip offset
                          },
                        },
                      ],
                    }}
                  >
                    <span style={{ order: item.order }}>
                      {/* { item.toShow && */}
                      <div onClick={() => onTabClick(item, i)}>
                        <div
                          className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px]
                          group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700] cursor-pointer menu-transition
                          ${
                            isClosed
                              ? "justify-start gap-0"
                              : "justify-start gap-2"
                          }`}
                        >
                          <ListMenuActiveIconModule
                            item={item}
                            languageSelected={langData.code}
                            isClosed={isClosed}
                          />
                          <span className="ps-[15px]">
                            <ListMenuSvgModule item={item} />
                          </span>
                          <div
                            className={`w-full flex justify-between items-center`}
                          >
                            <ListMenuTitleModule
                              item={item}
                              isClosed={isClosed}
                            />
                            <ListMenuArrow item={item} />
                          </div>
                        </div>
                      </div>
                    </span>
                  </Tooltip>
                </li>
              )}
              {/* ________trainings______ */}
              {item.unique_id == 87 ? (
                <li style={{ order: "-2" }}>
                  <div onClick={handleTrainingBtn} data-tooltip-id={item.name}>
                    <div
                      className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px]
                    group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700] cursor-pointer menu-transition
                    ${
                      isClosed ? "justify-start gap-0" : "justify-start gap-2"
                    }`}
                    >
                      <ListMenuActiveIconModule
                        item={
                          (item = {
                            active: pathName.includes(
                              `/${params.lang}/education`
                            )
                              ? true
                              : false,
                          })
                        }
                        languageSelected={langData.code}
                        isClosed={isClosed}
                      />
                      <span className="ps-[15px]">
                        <ListMenuSvgModule
                          item={
                            (item = {
                              unique_id : 87,
                              active: pathName.includes(
                                `/${params.lang}/education`
                              )
                                ? true
                                : false,
                            })
                          }
                        />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule
                          item={
                            (item = {
                              active: pathName.includes(
                                `/${params.lang}/education`
                              )
                                ? true
                                : false,
                              translation:
                                params.lang.toLowerCase() == "fa"
                                  ? "آمورش"
                                  : "Trainings",
                            })
                          }
                          isClosed={isClosed}
                        />
                        <ListMenuArrow
                          item={(item = { name: "trainings" })}
                          isOpen={trainingDropDown}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Dropdown items */}
                  {/* 1 */}
                  <div
                    ref={dropdownRef2}
                    className={`${
                      trainingDropDown ? "h-fit" : "h-0 overflow-hidden"
                    }
                  base-transition-1 bg-Field dark:bg-darkGray`}
                  >
                    <Link
                      href={`/${params.lang}/education/category/all`}
                      className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px] ps-3
                    group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700] cursor-pointer menu-transition
                    ${
                      isClosed ? "justify-start gap-0" : "justify-start gap-2"
                    }`}
                    >
                      <span className="ps-[15px]">
                        <ListMenuSvgModule
                          item={
                            (item = {
                              name: "categories",
                              active: pathName.includes("category/all")
                                ? true
                                : false,
                            })
                          }
                        />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule
                          item={
                            (item = {
                              translation:
                                params.lang.toLowerCase() == "fa"
                                  ? "دسته بندی ها"
                                  : "categories",
                              active: pathName.includes("category/all")
                                ? true
                                : false,
                            })
                          }
                          isClosed={isClosed}
                        />
                      </div>
                    </Link>
                  </div>
                  {/* 2 */}
                  <div
                    ref={dropdownRef2}
                    className={`${
                      trainingDropDown ? "h-fit" : "h-0 overflow-hidden"
                    }
                  base-transition-1 bg-Field dark:bg-darkGray`}
                  >
                    <Link
                      href={`/${params.lang}/education`}
                      className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px] ps-3
                    group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700] cursor-pointer menu-transition
                    ${
                      isClosed ? "justify-start gap-0" : "justify-start gap-2"
                    }`}
                    >
                      <span className="ps-[15px]">
                        <ListMenuSvgModule
                          item={
                            (item = {
                              name: "trainers",
                              active: pathName.endsWith(
                                `/${params.lang}/education`
                              )
                                ? true
                                : false,
                            })
                          }
                        />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule
                          item={
                            (item = {
                              translation:
                                params.lang.toLowerCase() == "fa"
                                  ? "مربیان متاورس"
                                  : "metaverse trainers",
                              active: pathName.endsWith(
                                `/${params.lang}/education`
                              )
                                ? true
                                : false,
                            })
                          }
                          isClosed={isClosed}
                        />
                      </div>
                    </Link>
                  </div>
                </li>
              ) : (
                ""
              )}

              {/* ________language______ */}
              {item.unique_id == 1414 ? (
                <li>
                  <div onClick={handleLangBtn} data-tooltip-id={item.name}>
                    <div
                      className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px]
                    group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700] cursor-pointer menu-transition
                    ${
                      isClosed ? "justify-start gap-0" : "justify-start gap-2"
                    }`}
                    >
                      <ListMenuActiveIconModule
                        item={item}
                        languageSelected={langData.code}
                        isClosed={isClosed}
                      />
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={item} />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule item={item} isClosed={isClosed} />
                        <ListMenuArrow
                          item={(item = { name: "language" })}
                          isOpen={langDropDown}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    ref={dropdownRef}
                    className={`${
                      langDropDown ? "h-fit" : "h-0 overflow-hidden"
                    }
                  base-transition-1 bg-Field dark:bg-darkGray`}
                  >
                    <DropdownLanguageModule
                      languagesData={langData}
                      langArray={langArray}
                      params={params}
                      isClosed={isClosed}
                    />
                  </div>
                </li>
              ) : (
                ""
              )}
            </React.Fragment>
          ))}
      </ul>
    </>
  );
}

// const NewListModule: React.FC<any> = ({
//   languageSelected,
//   languagesData,
//   handleDirChange,
//   pageName,
// }) => {
// const { state, dispatch, toggleCollapseHandler } = useContext(SideBarContext);
// const [data, setData] = useState(state.dataMenu);

// useEffect(() => {
//   dispatch({
//     type: "SET_ITEM_ACTIVE",
//     payload: { pageName, activeItem: "" },
//   });

//   const handleResize = () => {
//     if (window.innerWidth <= 768) {
//       const filteredMenu = state.dataMenu.filter(
//         (item: any) =>
//           ![
//             "home",
//             "property",
//             "reward",
//             "transaction",
//             "connection",
//           ].includes(item.name)
//       );
//       setData(filteredMenu);
//     } else {
//       setData(state.dataMenu);
//     }
//   };

//   window.addEventListener("resize", handleResize);
//   handleResize();

//   return () => window.removeEventListener("resize", handleResize);
// }, [state.dataMenu]);

// const selectItemHandler = (value: string, i: number) => {
//   if (value !== "language") {
//     dispatch({
//       type: "SET_ITEM_ACTIVE",
//       payload: { pageName, activeItem: value },
//     });
//     if (pageName === "citizen") {
//       dispatch({ type: "SET_SHOW_MENU_ITEM", payload: i });
//     }
//   }
//   const selectedItem: DropdownItem = { key: value };
//   if (state.activeDropdown.some((item) => item.key === selectedItem.key)) {
//     dispatch({ type: "REMOVE_FROM_ACTIVE_DROPDOWN", payload: selectedItem });
//   } else {
//     dispatch({ type: "ADD_TO_ACTIVE_DROPDOWN", payload: selectedItem });
//     if (state.isCollapsed) {
//       toggleCollapseHandler();
//     }
//   }
// };

// return (
//   <>
//     <ul
//       id="light-scrollbar"
//       className={` list-none overflow-y-visible ${
//         state.showFullModal ? "pb-[350px] xs:pb-[400px] " : "pb-[200px]"
//       }
//       relative pt-3 w-full   bg-white dark:bg-dark-background  transition-all duration-300 ease-linear max-lg:w-fit`}
//     >
//       {state.dataMenu &&
//         data.map((item: MenuDataItem, i: number) => (
//           <li
//             key={item.id}
//             onClick={() => selectItemHandler(item.name, item.id)}
//           >
//             <div
//               className={`w-full flex flex-row ${
//                 state.isCollapsed ? "ms-4" : "ms-5"
//               }  justify-start items-center gap-2  group py-[12px] 3xl:py-[16px]`}
//             >
//               <ListMenuActiveIconModule
//                 item={item}
//                 languageSelected={languageSelected}
//               />
//               {/* <ListMenuSvgModule item={item} i={i} pageName={pageName} />
//               <ListMenuTitleModule item={item} i={i} pageName={pageName} /> */}
//               <ListMenuArrow item={item} />
//             </div>
//             {item.name === "trainings" &&
//               state.activeDropdown.some((item) => item.key === "trainings") &&
//               !state.isCollapsed && <DropdownTrainingsModule />}
//             {item.name === "language" &&
//               !state.isCollapsed &&
//               state.activeDropdown.some(
//                 (item) => item.key === "language"
//               ) && (
//                 <DropdownLanguageModule
//                   languagesData={languagesData}
//                   languageSelected={languageSelected}
//                   handleDirChange={handleDirChange}
//                 />
//               )}
//           </li>
//         ))}
//     </ul>
//   </>
// );
// };

// export default NewListModule;

// const sideBarContext: State = {
//   isCollapsed: true,
//   activeDropdown: [],
//   showFullModal: false,
//   showFullModalOutMenu: false,
//   activeItem: "",
//   pageName: "",
//   showMenuItem: -10,
//   dataHeader: [],
//   dataMenu: [],
//   dataTheme: [],
//   dataLogin: [],
//   dataSubItems: [],
// };

// interface LanguageSelected {
//   id: number;
//   name: string;
//   native_name: string;
//   code: string;
//   dir: string;
//   icon: string;
//   file_url: any;
// }
