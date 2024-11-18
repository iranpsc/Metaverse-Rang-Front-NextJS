"use client";

// import { MenuDataItem } from "@/types/listMenu";
import Tooltip from '@mui/material/Tooltip';
import ListMenuSvgModule from "./list/ListMenuSvgModule";
import ListMenuTitleModule from "./list/ListMenuTitleModule";
import ListMenuArrow from "./list/ListMenuArrow";
import { useState } from "react";
import ListMenuActiveIconModule from "./list/ListMenuActiveIconModule";
import DropdownLanguageModule from "./list/dropdowns/DropdownLanguageModule";



import Link from "next/link";

export default function SideBarContent({
  tabsMenu,
  isClosed,
  params,
  langData,
  langArray
}) {
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
}
const handleLangBtn = () => {
  setLangDropDown(!langDropDown)
}


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
                  <li onClick={() => onTabClick(item, i)}>
                    {item.route_name ?
                    <Link
                    className={`px-2 flex  flex-col items-center  box-border menu-transition`}
                    href={`/${langData.code}/levels/citizen/${item?.route_name}/general-info`}
                      >
                      <div
                        className={`${activeNav == item?.route_name ? "bg-grayLight dark:bg-black":''} w-full flex flex-row items-center  group py-2
                        ${isClosed ? "justify-center" : "justify-start"} rounded-[10px]`}
                      >
                        <span className="">
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
                        className={`w-full flex flex-row items-center  group py-[5px]
                        ${isClosed ? "justify-center" : "justify-start"} rounded-[10px]`}
                      >
                        <span className="">
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
                  {
                  item.name === "language" && 
                  <>
                    <li onClick={handleLangBtn} data-tooltip-id={item.name}>
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
              </Tooltip>
           </div>
          ))}
      </ul>
    </>
  );
}

