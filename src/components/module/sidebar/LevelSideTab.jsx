"use client";

import { MenuDataItem } from "@/types/listMenu";
import { Tooltip as ReactTooltip } from "react-tooltip";

import ListMenuSvgModule from "./list/ListMenuSvgModule";
import ListMenuTitleModule from "./list/ListMenuTitleModule";

import ListMenuArrow from "./list/ListMenuArrow";

import { Modals_fa, Modals_en } from "@/components/utils/modals-content";
import { useState } from "react";
import Modal from "@/components/templates/modal";
import ListMenuActiveIconModule from "./list/ListMenuActiveIconModule";
import Image from "next/image";
import Link from "next/link";

export default function SideBarContent({
  tabsMenu,
  isClosed,
  params,
  langData
}) {
console.log(tabsMenu);

 const [activeNav, setActiveNav] = useState(params.levelId);

 const onTabClick = (item, tabNumber) => {
  setActiveNav(tabNumber);}

  return (
    <>
      <ul
        id="light-scrollbar"
        className={`h-full z-[1] list-none overflow-y-scroll no-scrollbar relative pt-3 w-full bg-white dark:bg-dark-background transition-all duration-300 ease-linear max-lg:w-fit`}
      >
        {tabsMenu &&
          tabsMenu.map((item, i) => (
            //*HINT*the way to pass parameters to function in nextjs "onTabClick(item)"
           item.tab_id === 389 &&
           <div key={item.id}>
            <li onClick={() => onTabClick(item, i)} data-tooltip-id={item.name}>
              {i!==0 ?
               <Link
              className={`px-2 flex  flex-col items-center  box-border `}
              href={`/${langData.code}/levels/${i}/general-info`}
          >
                <div
                  className={`${activeNav == i ? "bg-grayLight dark:bg-black":''} w-full flex flex-row items-center gap-2 group py-[5px]
                  ${isClosed ? "justify-center" : "justify-start"} rounded-[10px] hover:border hover:border-[#0066FF] dark:hover:bg-[#1A1A18]  dark:hover:border-[#FFC700]`}
                >
          
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
              :
              <Link
              className={`px-2 flex  flex-col items-center box-border`}
              href={`/${langData.code}/levels`}
          >
                <div
                  className={`w-full flex flex-row items-center gap-2 group py-[5px]
                  ${isClosed ? "justify-center" : "justify-start"} rounded-[10px] hover:border hover:border-[#0066FF] dark:hover:bg-[#1A1A18]  dark:hover:border-[#FFC700]`}
                >
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
              }
            </li>
             <ReactTooltip
             id={item.name}
             className="tooltip-bg-color"
             content={item.translation}
           />
           </div>
          ))}
      </ul>
    </>
  );
}

