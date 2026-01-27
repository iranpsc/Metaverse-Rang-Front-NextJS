"use client";

import Tooltip from "@mui/material/Tooltip";
import ListMenuSvgModule from "./list/ListMenuSvgModule";
import ListMenuTitleModule from "./list/ListMenuTitleModule";
import ListMenuArrow from "./list/ListMenuArrow";
import { useState, useEffect } from "react";
// import ListMenuActiveIconModule from "./list/ListMenuActiveIconModule";
// import DropdownLanguageModule from "./list/dropdowns/DropdownLanguageModule";
import { ActiveMenuIcon } from "@/components/svgs";
import { useRouter } from "next/navigation";
import React from "react";
// import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);
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
  const handleItemMouseDown = (e, item) => {
    e.stopPropagation();

    let href = `/${params.lang}`;
    if (item.route_name && item.route_name !== "home") {
      href = `/${params.lang}/levels/citizen/${item.route_name}/general-info`;
    }

    // 🟢 کلیک وسط → تب جدید
    if (e.button === 1) {
      window.open(href, "_blank");
      return;
    }

    // 🔵 کلیک چپ → ناوبری + لودر
    if (e.button === 0) {
      setActiveNav(item.route_name || "");
      setLoading(true);
      router.push(href);
    }
  };

  return (
    <>
      {loading && (
        <div className={`${isClosed ? "!w-[96.4vw]" : "xl:w-[83vw] 2xl:w-[83.5vw]"}
          fixed w-full  rtl:left-0 ltr:right-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm`} >
          <div className="container flex w-full h-screen items-center justify-center">
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
          </div>
        </div>
      )}

      <ul
        id="light-scrollbar"
        className="h-full z-[1] list-none overflow-y-scroll no-scrollbar relative pt-3 w-full menu-transition max-lg:w-fit"
      >
        {tabsMenu &&
          tabsMenu.map((item, i) => (
            <React.Fragment key={item.unique_id + "-" + i}>
              {item.menuItem === true && (
                <li onMouseDown={(e) => handleItemMouseDown(e, item)}>
                  <Tooltip

                    arrow
                    placement={
                      langData.direction === "rtl" ? "left-end" : "right-end"
                    }
                    slotProps={{
                      tooltip: {
                        className: `
                        !bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343] !font-azarMehr !font-medium  dark:!text-white !text-[14px] 
                        ${isClosed ? "block" : "hidden"}
                      `,
                      },
                      arrow: {
                        className: `
                    !text-[#E9E9E9] dark:!text-[#434343] mt-[-7px]
                  `,
                      },
                    }}
                    PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: { offset: [-20, 0] },
                        },
                      ],
                    }}
                  >
                    {item.route_name && item.route_name !== "language" ? (
                      <div className="px-2 flex cursor-pointer flex-col items-center box-border menu-transition">
                        <div
                          className={`w-full flex flex-row items-center group py-2 ${isClosed ? "justify-center" : "justify-start"
                            } rounded-[10px]`}
                        >
                          {activeNav === item?.route_name ? (
                            <div className="flex items-center">
                              <ActiveMenuIcon
                                className={` ${isClosed ? "w-[10px] pr-[17px]" : ""}  ${activeNav === item?.route_name

                                  } visible  h-[35px] absolute start-0 fill-blueLink dark:fill-dark-yellow pr-[20px] w-[25px] rtl:rotate-180 `}
                              />
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
                          ) : (
                            <>
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
                            </>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </Tooltip>
                </li>
              )}

              {/* {item.route_name === "language" && (
                <li key={"language-" + item.unique_id}>
                  <div onClick={handleLangBtn} data-tooltip-id={item.name}>
                    <div
                      className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px] px-3
                    group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700] cursor-pointer menu-transition
                    ${isClosed ? "justify-start items-center " : "justify-start items-center"
                        }`}
                    >
                      <ListMenuActiveIconModule
                        item={item}
                        languageSelected={langData.code}
                        isClosed={isClosed}
                      />
                      <div className="flex items-center">
                        <ListMenuSvgModule item={item} />
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule item={item} isClosed={isClosed} />
                        <ListMenuArrow
                          item={(item = { name: "language" })}
                          isOpen={langDropDown}
                          isClosed={isClosed}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${langDropDown ? "h-fit" : "h-0 overflow-hidden"
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
              )} */}
            </React.Fragment>
          ))}
      </ul>
    </>
  );
}