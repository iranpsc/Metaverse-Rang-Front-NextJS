"use client";
//Types
import { MenuDataItem } from "@/types/listMenu";
import ListMenuSvgModule from "./list/ListMenuSvgModule";
import ListMenuTitleModule from "./list/ListMenuTitleModule";
import ListMenuArrow from "./list/ListMenuArrow";
import DropdownLanguageModule from "./list/dropdowns/DropdownLanguageModule";
import { Modals_fa, Modals_en } from "@/components/utils/modals-content";
import { useEffect, useState } from "react";
import Modal from "@/components/templates/modal";
import ListMenuActiveIconModule from "./list/ListMenuActiveIconModule";
import { useRouter, usePathname  } from 'next/navigation';
import Tooltip from '@mui/material/Tooltip';

export default function SideBarContent({
  tabsMenu,
  langData,
  isClosed,
  langArray,
  params
}) {
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [langDropDown, setLangDropDown] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const closeModal = () => {
    setModalShow(false);
  };

  const onTabClick = (item) => {
    // if there is no Url in staticMenuToShow, open modal
    if(item.url != undefined){
      router.push(`/${params.lang}/${item.url}`)
    }else{

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
  const handleLangBtn = () => {
    setLangDropDown(!langDropDown)
  }
  
  // *selected nav item (add item.active property to own obj)
  const pathName = usePathname()

  tabsMenu.forEach((item)=>{
    // convert url to match pathName
    let urlThemp = `${params.lang}${item.url?"/"+item.url:''}`
    
    // home has url but its "empty", not "undefined"
    if(item.url != undefined && urlThemp && pathName.endsWith(urlThemp)){
      item.active = true;
    }
  })

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
            //*HINT*i<=12 is not a good solution,array must be change
            <div key={i} style={{order:item.order}}>
              <Tooltip title={item.translation} placement={langData.direction == 'rtl'?'left-end':'right-end'}
                  // slotProps is used to apply custom styles and props to the internal elements (slots)
                  slotProps={{
                    tooltip: {
                      // Applies Tailwind classes to the tooltip container
                      className: "bg-white dark:bg-dark-background font-azarMehr font-medium text-black dark:text-white text-[14px] lg:text-[16px]",
                    },
                  }}
                  // PopperProps is used to configure the behavior and positioning
                  PopperProps={{
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -13], // Adjusts tooltip offset
                        },
                      },
                    ],
                  }}
              >
              <div style={{order:item.order}}>
                { item.toShow &&
                  <li onClick={() => onTabClick(item, i)} data-tooltip-id={item.name}>
                    {/* (i == 0) for hiding first element of array"متاورس" */}
                    
                      <div
                        className={`w-full flex flex-row items-center gap-2 group py-[12px] 3xl:py-[16px]
                        group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700] cursor-pointer menu-transition
                        ${isClosed ? "justify-start" : "justify-start"}`}
                      >
                          <ListMenuActiveIconModule
                            item={item}
                            languageSelected={langData.code}
                            isClosed={isClosed}
                            />
                        <span className="ps-[15px]">
                          <ListMenuSvgModule item={item} />
                        </span>
                          <ListMenuTitleModule
                            item={item}
                            isClosed={isClosed}
                          />
                        <ListMenuArrow item={item} />
                      </div>              
                  </li>
              
                }
                {item.name === "language" && 
                  <>
                    <li onClick={handleLangBtn} data-tooltip-id={item.name}>
                      <div
                        className={`w-full flex flex-row items-center gap-2 group py-[12px] 3xl:py-[16px]
                        group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700] cursor-pointer menu-transition
                        ${isClosed ? "justify-start" : "justify-start"}`}
                        >
                          <ListMenuActiveIconModule
                            item={item}
                            languageSelected={langData.code}
                            isClosed={isClosed}
                            />
                        <span className="ps-[15px]">
                          <ListMenuSvgModule item={item} />
                        </span>
                          <ListMenuTitleModule
                            item={item}
                            isClosed={isClosed}
                          />
                        <ListMenuArrow item={item} isOpen={langDropDown} />
                      </div>              
                    </li>
                    <div className={`${langDropDown ? "h-full" : 'h-0 overflow-hidden'}
                      base-transition-1 bg-Field dark:bg-darkGrey`}>
                      <DropdownLanguageModule
                        languagesData={langData}
                        langArray={langArray}
                        params={params}
                        isClosed={isClosed}
                        />
                    </div>
                  </>
                }
              </div>
              </Tooltip>

            </div>
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
