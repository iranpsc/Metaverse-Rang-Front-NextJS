"use client";

// import { MenuDataItem } from "@/types/listMenu";
import Tooltip from '@mui/material/Tooltip';
import ListMenuSvgModule from "./list/ListMenuSvgModule";
import ListMenuTitleModule from "./list/ListMenuTitleModule";
import ListMenuArrow from "./list/ListMenuArrow";
import { useState } from "react";
import ListMenuActiveIconModule from "./list/ListMenuActiveIconModule";
import DropdownLanguageModule from "./list/dropdowns/DropdownLanguageModule";
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from "next/link";

export default function SideBarContent({
  tabsMenu,
  isClosed,
  params,
  langData,
  langArray
}) {
  
 const router = useRouter();
 const [langDropDown, setLangDropDown] = useState(false);
 const [activeNav, setActiveNav] = useState(params.levelName);
 const staticRouteNames = [
  { name: '1', route_name: "citizen-baguette" },
  { name: '2', route_name: "reporter-baguette" },
  { name: 'participant', route_name: "participation-baguette" },
  { name: '4', route_name: "developer-baguette" },
  { name: '5', route_name: "inspector-baguette" },
  { name: 'businessman', route_name: "businessman-baguette" },
  { name: '7', route_name: "lawyer-baguette" },
  { name: 'city council', route_name: "city-council-baguette" },
  { name: 'the mayor', route_name: "the-mayor-baguette" },
  { name: '10', route_name: "governor-baguette" },
  { name: '11', route_name: "minister-baguette" },
  { name: '12', route_name: "judge-baguette" },
  { name: '13', route_name: "legislator-baguette" },
  // { name: 'citizen', route_name: "citizen-baguette" },
  // { name: 'journalist', route_name: "reporter-baguette" },
  // { name: 'participant', route_name: "participation-baguette" },
  // { name: 'developer', route_name: "developer-baguette" },
  // { name: 'inspector', route_name: "inspector-baguette" },
  // { name: 'businessman', route_name: "businessman-baguette" },
  // { name: 'lawyer', route_name: "lawyer-baguette" },
  // { name: 'city council', route_name: "city-council-baguette" },
  // { name: 'the mayor', route_name: "the-mayor-baguette" },
  // { name: 'governor', route_name: "governor-baguette" },
  // { name: 'minister', route_name: "minister-baguette" },
  // { name: 'judge', route_name: "judge-baguette" },
  // { name: 'legislator', route_name: "legislator-baguette" },
];
tabsMenu.forEach((el1) => {
  staticRouteNames.forEach((el2) => {
    if (el1.name == el2.name) {
      el1.route_name = el2.route_name;
    }
  });
});

 const onTabClick = (item, tabNumber) => {
  setActiveNav(tabNumber);
  let href = item?.route_name ? `/${langData.code}/levels/citizen/${item?.route_name}/general-info` : `/${langData.code}`
  router.push(href);
}
const handleLangBtn = () => {
  setLangDropDown(!langDropDown)
}

console.log('levelsidetab', tabsMenu);

  return (
    <>
      <ul
        id="light-scrollbar"
        className={`h-full z-[1] list-none overflow-y-scroll no-scrollbar relative pt-3 w-full menu-transition max-lg:w-fit`}
      >
        {tabsMenu &&
          tabsMenu.map((item, i) => (
            <React.Fragment key={item.id + i || `menu-item-${i}`}>
              {item.menuItem === true && (
                <li key={item.id + i} onClick={() => onTabClick(item, i)}>
                  <Tooltip
                    title={item.translation}
                    placement={langData.direction === "rtl" ? "left-end" : "right-end"}
                    slotProps={{
                      tooltip: {
                        className:
                          "bg-white dark:bg-dark-background font-azarMehr font-medium text-black dark:text-white text-[14px] lg:text-[16px]",
                      },
                    }}
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
                    {item.route_name && item.name != "language" ? (
                      <div
                        className={`px-2 flex cursor-pointer flex-col items-center  box-border menu-transition`}
                      >
                        <div
                          className={`${
                            activeNav == item?.route_name
                              ? "bg-grayLight dark:bg-black"
                              : ""
                          } w-full flex flex-row items-center  group py-2 ${
                            isClosed ? "justify-center" : "justify-start"
                          } rounded-[10px]`}
                        >
                          <span className="flex">
                            <ListMenuSvgModule
                              item={item}
                              i={i}
                              activeNav={activeNav}
                            />
                          </span>
                          <ListMenuTitleModule
                            isClosed={isClosed}
                            item={item}
                            i={i}
                            activeNav={activeNav}
                          />
                          <ListMenuArrow item={item} />
                        </div>
                      </div>
                    ) : (
                      ""
                      // <div
                      //   className={`px-2 flex cursor-pointer flex-col items-center box-border`}
                      // >
                      //   <div
                      //     className={`w-full flex flex-row items-center  group py-[5px] ${
                      //       isClosed ? "justify-center" : "justify-start"
                      //     } rounded-[10px]`}
                      //   >
                      //     <span className="">
                      //       <ListMenuSvgModule
                      //         item={item}
                      //         i={i}
                      //         activeNav={activeNav}
                      //       />
                      //     </span>
                      //     {!isClosed && (
                      //       <ListMenuTitleModule
                      //         item={item}
                      //         i={i}
                      //         activeNav={activeNav}
                      //       />
                      //     )}
                      //     <ListMenuArrow item={item} />
                      //   </div>
                      // </div>
                    )}
                  </Tooltip>
                </li>
              )}

              {item.name == "language" ?
              <li key={item.id}>
                <div onClick={handleLangBtn} data-tooltip-id={item.name}>
                  <div
                    className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px]
                    group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700] cursor-pointer menu-transition
                    ${isClosed ? "justify-start gap-0" : "justify-start gap-2"}`}
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
                      <ListMenuTitleModule
                        item={item}
                        isClosed={isClosed}
                        />
                      <ListMenuArrow item={item} isOpen={langDropDown} />
                    </div>
                  </div>              
                </div>

                <div className={`${langDropDown ? "h-fit" : 'h-0 overflow-hidden'}
                  base-transition-1 bg-Field dark:bg-darkGrey`}>
                  <DropdownLanguageModule
                    languagesData={langData}
                    langArray={langArray}
                    params={params}
                    isClosed={isClosed}
                    />
                </div>
              </li>:''}
            </React.Fragment>
          ))}

      </ul>
    </>
  );
}

