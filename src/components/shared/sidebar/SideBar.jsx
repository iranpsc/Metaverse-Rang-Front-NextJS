"use client";

import SideBarHeaderMobileSkeleton from "./SideBarHeaderMobileSkeleton";
import SideBarSkeleton from "./SideBarSkeleton";

import Header from "./Header";
import AllSideTab from "./AllSideTab";
import LevelSideTab from "./LevelSideTab";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";

import LoginMenuModule from "./LoginMenuModule";
import HeaderMobile from "@/components/shared/sidebar/HeaderMobile";

export default function SideBar({
  tabsMenu,
  langData,
  langArray,
  params,
  pageSide,
  mainData,
  initialIsClosed = true,
}) {
  const [isClosed, setIsClosed] =
    useState(initialIsClosed);

  const [hydrated, setHydrated] =
    useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const toggleSide = useCallback(() => {
    setIsClosed((prev) => {
      const next = !prev;

      document.cookie = [
        `sidebarClosed=${next}`,
        "path=/",
        "max-age=31536000",
        "SameSite=Lax",
      ].join("; ");

      return next;
    });
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const handleClickOutside = (event) => {
      if (
        window.innerWidth < 1024 &&
        !isClosed &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsClosed(true);

        document.cookie = [
          "sidebarClosed=true",
          "path=/",
          "max-age=31536000",
          "SameSite=Lax",
        ].join("; ");
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [isClosed, hydrated]);

  /*
   * Skeleton از همان مقدار Server استفاده می‌کند.
   */
  if (!hydrated) {
    return (
      <>
        <SideBarHeaderMobileSkeleton />

        <SideBarSkeleton
          isClosed={initialIsClosed}
        />
      </>
    );
  }

  /*
   * از اینجا Sidebar واقعی
   */

  return (
    <>
      <HeaderMobile
        tabsMenu={tabsMenu}
        isClosed={isClosed}
        toggleSide={toggleSide}
        params={params}
        langData={langData}
        languagesData={langData}
        langArray={langArray}
      />

      <div
        className="
          z-[1000]
          h-dvh
          dark:bg-dark-background
          fixed
          top-0
          rtl:right-0
          ltr:left-0
          xl:relative
          xl:top-0
          xl:right-0
        "
      >
        <div
          className={`
            shadow-left
            dark:shadow-leftDark
            xl:min-h-dvh
            lg:min-h-dvh
            md:min-h-dvh
            sm:min-h-dvh
            xs:min-h-dvh
            relative

            ${
              isClosed
                ? "sm:hidden xs:hidden md:hidden menu-transition xl:block lg:block"
                : "sm:block xs:block bg-blackTransparent/30"
            }

            absolute
            xl:relative
            lg:relative
            xl:w-fit
            lg:w-fit
            md:w-full
            sm:w-full
            xs:w-full
            z-[100]
            no-scrollbar
          `}
        >
          <aside
            ref={sidebarRef}
            className={`
              ${
                isClosed
                  ? "w-[70px] max-lg:hidden"
                  : "w-[260px] md:w-[242px] lg:w-[262px] xl:w-[18.2vw] 2xl:w-[16.5vw] sm:shadow-[#000000] visible"
              }

              flex
              flex-col
              h-dvh
              relative
              bg-white
              dark:bg-dark-background
              menu-transition
            `}
          >
            <div
              className="
                flex
                flex-col
                sticky
                w-full
                h-fit
                top-0
                pt-1
                z-50
                bg-white
                dark:bg-dark-background
                menu-transition
              "
            >
              <Header
                isClosed={isClosed}
                tabsMenu={tabsMenu}
                toggleSide={toggleSide}
                params={params}
                langData={langData}
                languagesData={langData}
                langArray={langArray}
              />
            </div>

            {pageSide === "citizen" && (
              <AllSideTab
                tabsMenu={tabsMenu}
                isClosed={isClosed}
                toggleSide={toggleSide}
                langData={langData}
                langArray={langArray}
                params={params}
                mainData={mainData}
              />
            )}

            {pageSide === "citizen/referal" && (
              <AllSideTab
                tabsMenu={tabsMenu}
                isClosed={isClosed}
                toggleSide={toggleSide}
                langData={langData}
                langArray={langArray}
                params={params}
              />
            )}

            {pageSide === "level" && (
              <LevelSideTab
                tabsMenu={tabsMenu}
                isClosed={isClosed}
                params={params}
                toggleSide={toggleSide}
                langArray={langArray}
                langData={langData}
              />
            )}

            <div
              className={`
                ${
                  isClosed
                    ? "sm:hidden xs:hidden md:hidden xl:block lg:block"
                    : ""
                }

                w-full
                h-fit
                z-[100]
                transition-all
                duration-300
                ease-linear
                bg-white
                dark:bg-dark-background
                bottom-0
                py-5
                flex
                flex-col
                items-center
                justify-center
                gap-3
                menu-transition
              `}
            >
              <div className="w-[80%] m-auto">
                <LoginMenuModule
                  isClosed={isClosed}
                  tabsMenu={tabsMenu}
                  params={params}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}