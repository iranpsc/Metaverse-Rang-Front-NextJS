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

 const [activeNav, setActiveNav] = useState(params.levelName);
 const staticRouteNames = [
  { id: 5360, route_name: "citizen-baguette" },
  { id: 5367, route_name: "reporter-baguette" },
  { id: 5374, route_name: "participation-baguette" },
  { id: 5381, route_name: "developer-baguette" },
  { id: 5388, route_name: "inspector-baguette" },
  { id: 5395, route_name: "businessman-baguette" },
  { id: 5402, route_name: "lawyer-baguette" },
  { id: 5409, route_name: "city-council-baguette" },
  { id: 5416, route_name: "the-mayor-baguette" },
  { id: 5423, route_name: "governor-baguette" },
  { id: 5430, route_name: "minister-baguette" },
  { id: 5437, route_name: "judge-baguette" },
  { id: 5444, route_name: "legislator-baguette" },
];
tabsMenu.forEach((el1) => {
  staticRouteNames.forEach((el2) => {
    if (el1.id == el2.id) {
      el1.route_name = el2.route_name;
    }
  });
});

 const onTabClick = (item, tabNumber) => {
  setActiveNav(tabNumber);}

  return (
    <>
      <ul
        id="light-scrollbar"
        className={`h-full z-[1] list-none overflow-y-scroll no-scrollbar relative pt-3 w-full menu-transition max-lg:w-fit`}
      >
        {tabsMenu &&
          tabsMenu.map((item, i) => (
            //*HINT*the way to pass parameters to function in nextjs "onTabClick(item)"
            // 389 is levels tab id
           item.menuItem === true &&
           <div key={item.id}>
            <li onClick={() => onTabClick(item, i)} data-tooltip-id={item.name}>
              {item.route_name ?
               <Link
              className={`px-2 flex  flex-col items-center  box-border `}
              href={`/${langData.code}/levels/citizen/${item?.route_name}/general-info`}
          >
                <div
                  className={`${activeNav == item?.route_name ? "bg-grayLight dark:bg-black":''} w-full flex flex-row items-center gap-2 group py-[5px]
                  ${isClosed ? "justify-start" : "justify-start"} rounded-[10px] hover:border hover:border-[#0066FF] dark:hover:bg-[#1A1A18]  dark:hover:border-[#FFC700]`}
                >
                  <span className="ps-[8px]">
                    <ListMenuSvgModule item={item} i={i} activeNav={activeNav} />
                  </span>
                    <ListMenuTitleModule
                      isClosed={isClosed}
                      item={item}
                      i={i}
                      activeNav={activeNav}
                    />
                  <ListMenuArrow item={item} />
                </div>
              </Link>
              :
              <Link
                className={`px-2 flex  flex-col items-center box-border`}
                href={`/${langData.code}`}
              >
                <div
                  className={`w-full flex flex-row items-center gap-2 group py-[5px]
                  ${isClosed ? "justify-start" : "justify-start"} rounded-[10px] hover:border hover:border-[#0066FF] dark:hover:bg-[#1A1A18]  dark:hover:border-[#FFC700]`}
                >
                  <span className="ps-[8px]">
                    <ListMenuSvgModule item={item} i={i} activeNav={activeNav} />
                  </span>
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

