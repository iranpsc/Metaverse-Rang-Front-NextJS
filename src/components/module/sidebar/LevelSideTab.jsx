"use client";

import { MenuDataItem } from "@/types/listMenu";

import ListMenuSvgModule from "./list/ListMenuSvgModule";
import ListMenuTitleModule from "./list/ListMenuTitleModule";

import ListMenuArrow from "./list/ListMenuArrow";

import { Modals_fa, Modals_en } from "@/components/utils/modals-content";
import { useState } from "react";
import Modal from "@/components/templates/modal";
import ListMenuActiveIconModule from "./list/ListMenuActiveIconModule";


export default function SideBarContent({
  tabsMenu,
  languageSelected,
  isClosed,
}) {
 console.log('tabsMenu',tabsMenu);
 

  return (
    <>
 
      <ul
        id="light-scrollbar"
        className={`h-full z-[1] list-none overflow-y-scroll no-scrollbar relative pt-3 w-full bg-white dark:bg-dark-background transition-all duration-300 ease-linear max-lg:w-fit`}
      >
        {tabsMenu &&
          tabsMenu.map((item, i) => (
            //*HINT*the way to pass parameters to function in nextjs "onTabClick(item)"
            <li key={item.id} >
               <Link
              className="hoverCardLevel flex  flex-col items-center rounded-[20px] box-border hover:border hover:border-[#0066FF] dark:hover:bg-[#1A1A18]  dark:hover:border-[#FFC700]"
              href={`/${languageSelected}/levels/${item.id}/general-info`}
          >
                <div
                  className={`w-full flex flex-row items-center gap-2 group py-[12px] 3xl:py-[16px]
                  ${isClosed ? "justify-center" : "justify-start"}`}
                >
                  <Image
                   src={item}
                   alt='png'
                   width={100}
                   height={180}
                   className=" w-full h-full object-contain"
                 />:""
         
                  <ListMenuSvgModule item={item} i={i} activeNav={activeNav} />
                  {!isClosed && (
                    <ListMenuTitleModule
                      item={item}
                      i={i}
                      activeNav={activeNav}
                    />
                  )}
                  <ListMenuArrow item={item} />
                </div>
              </Link>
            </li>
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
