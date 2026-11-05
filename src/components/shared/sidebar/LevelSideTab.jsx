"use client";

import Tooltip from "./SidebarTooltip";
import ListMenuSvgModule from "./list/ListMenuSvgModule";
import ListMenuTitleModule from "./list/ListMenuTitleModule";
import ListMenuArrow from "./list/ListMenuArrow";
import { useEffect, useState } from "react";
import { ActiveMenuIcon } from "@/components/svgs";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import GemImage, { getGemPrimaryColor } from "@/components/shared/gemImage";


export default function SideBarContent({ tabsMenu, isClosed, params }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const handleItemMouseDown = (e, item) => {
    e.stopPropagation();
    const href = item.route_name && item.route_name !== "home"
      ? `/${params.lang}/levels/citizen/${item.route_name}/general-info`
      : `/${params.lang}`;

    if (e.button === 1) {
      window.open(href, "_blank");
      return;
    }

    if (e.button === 0) {
      setLoading(true);
      router.push(href);
    }
  };

  return (
    <>
      {loading && (
        <div
          className={`${isClosed ? "w-[96.4vw]!" : "xl:w-[83vw] 2xl:w-[83.5vw]"}
          fixed w-full rtl:left-0 ltr:right-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-xs`}
        >
          <div className="container flex w-full h-screen items-center justify-center">
            <div className="holder"><div className="box"></div></div>
            <div className="holder"><div className="box"></div></div>
            <div className="holder"><div className="box"></div></div>
          </div>
        </div>
      )}

      <ul
        id="light-scrollbar"
        className="h-full z-1 list-none overflow-y-scroll no-scrollbar relative pt-3 w-full menu-transition max-lg:w-fit"
      >
        {tabsMenu?.map((item, i) => {
          if (item.menuItem !== true) return null;

          const isHome = item.route_name === "home";
          const isActive = isHome
            ? pathname === `/${params.lang}` || pathname === `/${params.lang}/`
            : pathname.startsWith(`/${params.lang}/levels/citizen/${item.route_name}/`);
          const activeGemColor = isActive && !isHome ? getGemPrimaryColor(item) : undefined;

          return (
            <React.Fragment key={`${item.unique_id}-${i}`}>
              <li onMouseDown={(e) => handleItemMouseDown(e, item)}>
                <Tooltip title={item.translation || ""} enabled={isClosed}>
                  <div className="px-2 flex cursor-pointer flex-col items-center box-border menu-transition">
                    <div
                      className={`w-full flex flex-row items-center group py-2 ${isClosed ? "justify-center gap-0" : "justify-start gap-3"} rounded-[10px]`}
                    >
                      {isActive && (
                        <div className="flex items-center">
                          <ActiveMenuIcon
                            className={`${isClosed ? "w-[10px] pr-[17px]" : ""} visible h-[35px] absolute inset-s-0 pr-[20px] w-[25px] rtl:rotate-180`}
                            style={activeGemColor ? { fill: activeGemColor } : undefined}
                          />
                        </div>
                      )}
                      <span className="flex  shrink-0 items-center justify-center">
                        {isHome ? (
                          <ListMenuSvgModule item={{ ...item, active: isActive }} />
                        ) : (
                         <div className={`${isActive ? "ps-0 -ms-0.5" : "ps-2.5" }`}>
                           <GemImage
                            item={item}
                            params={params}
                            picSize={28}
                            href={`/${params.lang}/levels/citizen/${item.route_name}/general-info`}
                            showGlow
                            isActive={isActive}
                            preventNavigation
                            unoptimized
                            eager
                          />
                         </div>
                        )}
                      </span>
                      <ListMenuTitleModule
                        isClosed={isClosed}
                        activeColor={activeGemColor}
                        item={{ ...item, active: isActive }}
                      />
                      <ListMenuArrow item={item} />
                    </div>
                  </div>
                </Tooltip>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
}
