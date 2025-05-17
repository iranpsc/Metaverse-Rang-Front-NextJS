"use client";

import Tooltip from "@mui/material/Tooltip";
import ListMenuSvgModule from "./list/ListMenuSvgModule";
import ListMenuTitleModule from "./list/ListMenuTitleModule";
import ListMenuArrow from "./list/ListMenuArrow";
import { useState } from "react";
import ListMenuActiveIconModule from "./list/ListMenuActiveIconModule";
import DropdownLanguageModule from "./list/dropdowns/DropdownLanguageModule";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";

export default function SideBarContent({
  tabsMenu,
  isClosed,
  params,
  langData,
  langArray,
}) {
  const router = useRouter();
  const [langDropDown, setLangDropDown] = useState(false);
  const [activeNav, setActiveNav] = useState(params.levelName);

  const staticRouteNames = [
    { unique_id: 303, route_name: "home" },
    { unique_id: 382, route_name: "citizen-baguette" },
    { unique_id: 383, route_name: "reporter-baguette" },
    { unique_id: 331, route_name: "participation-baguette" },
    { unique_id: 68, route_name: "developer-baguette" },
    { unique_id: 69, route_name: "inspector-baguette" },
    { unique_id: 70, route_name: "businessman-baguette" },
    { unique_id: 71, route_name: "lawyer-baguette" },
    { unique_id: 72, route_name: "city-council-baguette" },
    { unique_id: 73, route_name: "the-mayor-baguette" },
    { unique_id: 74, route_name: "governor-baguette" },
    { unique_id: 75, route_name: "minister-baguette" },
    { unique_id: 76, route_name: "judge-baguette" },
    { unique_id: 77, route_name: "legislator-baguette" },
    { unique_id: 1414, route_name: "language" },
  ];

  // Match route_name to tabsMenu based on unique_id
  tabsMenu.forEach((el1) => {
    const match = staticRouteNames.find(
      (el2) => el2.unique_id === el1.unique_id
    );
    if (match) el1.route_name = match.route_name;
  });

  const onTabClick = (item) => {
    setActiveNav(item.route_name || "");
  
    let href = `/${params.lang}`; // مسیر پیش‌فرض صفحه اصلی
  
    if (item.route_name && item.route_name !== "home") {
      href = `/${params.lang}/levels/citizen/${item.route_name}/general-info`;
    }
  
    router.push(href);
  };
  
  

  const handleLangBtn = () => {
    setLangDropDown(!langDropDown);
  };

  return (
    <>
      <ul
        id="light-scrollbar"
        className="h-full z-[1] list-none overflow-y-scroll no-scrollbar relative pt-3 w-full menu-transition max-lg:w-fit"
      >
        {tabsMenu &&
          tabsMenu.map((item, i) => (
            <React.Fragment key={item.unique_id + "-" + i}>
              {item.menuItem === true && (
                <li onClick={() => onTabClick(item, i)}>
                  <Tooltip
                    title={item.translation}
                    placement={
                      langData.direction === "rtl" ? "left-end" : "right-end"
                    }
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
                          options: { offset: [0, -13] },
                        },
                      ],
                    }}
                  >
                    {item.route_name && item.route_name !== "language" ? (
                      <div className="px-2 flex cursor-pointer flex-col items-center box-border menu-transition">
                        <div
                          className={`${
                            activeNav === item?.route_name
                              ? "bg-grayLight dark:bg-black"
                              : ""
                          } w-full flex flex-row items-center group py-2 ${
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
                    ) : null}
                  </Tooltip>
                </li>
              )}

              {item.route_name === "language" && (
                <li key={"language-" + item.unique_id}>
                  <div onClick={handleLangBtn}>
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

                  <div
                    className={`${
                      langDropDown ? "h-fit" : "h-0 overflow-hidden"
                    } base-transition-1 bg-Field dark:bg-darkGray`}
                  >
                    <DropdownLanguageModule
                      languagesData={langData}
                      langArray={langArray}
                      params={params}
                      isClosed={isClosed}
                    />
                  </div>
                </li>
              )}
            </React.Fragment>
          ))}
      </ul>
    </>
  );
}
