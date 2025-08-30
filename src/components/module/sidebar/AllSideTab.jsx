"use client";
import ListMenuSvgModule from "./list/ListMenuSvgModule";
import ListMenuTitleModule from "./list/ListMenuTitleModule";
import ListMenuArrow from "./list/ListMenuArrow";
import DropdownLanguageModule from "./list/dropdowns/DropdownLanguageModule";
import { Modals_fa, Modals_en } from "@/components/utils/modals-content";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/templates/modal";
import ListMenuActiveIconModule from "./list/ListMenuActiveIconModule";
import { useRouter, usePathname } from "next/navigation";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import Link from "next/link";

export default function SideBarContent({
  tabsMenu,
  langData,
  isClosed,
  langArray,
  params,
}) {
  const pathName = usePathname();
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [langDropDown, setLangDropDown] = useState(false);
  const [trainingDropDown, setTrainingDropDown] = useState(
    pathName.endsWith(`/${params.lang}/education`) ||
      pathName.includes(`/category/all`)
      ? true
      : false
  );
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const closeModal = () => {
    setModalShow(false);
  };

  const onTabClick = (item) => {
    if (item.url) {
      if (item.url.startsWith("http://") || item.url.startsWith("https://")) {
        window.open(item.url, "_blank");
      } else {
        router.push(`/${params.lang}/${item.url}`);
      }
    } else {
      const modals = langData.code === "fa" ? Modals_fa : Modals_en;
      const temp = modals.find((x) => x.id == item.id);
      if (temp) {
        setModalShow(true);
        setModalData(temp);
      }
    }
  };

  const handleLangBtn = () => {
    setLangDropDown(!langDropDown);
  };

  const handleTrainingBtn = () => {
    setTrainingDropDown(!trainingDropDown);
  };

  useEffect(() => {
    if (langDropDown && dropdownRef.current) {
      setTimeout(() => {
        dropdownRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
    if (trainingDropDown && dropdownRef2.current) {
      setTimeout(() => {
        dropdownRef2.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [langDropDown, trainingDropDown]);

  tabsMenu.forEach((item) => {
    let urlThemp;
    if (item.url == "referral") {
      urlThemp = `/${params.lang}/citizens/${params.id}/referral`;
      item.url = `/citizens/${params.id}/referral`;
    } else if (item.unique_id == "1374") {
      urlThemp = `/${params.lang}/citizens/${params.id}`;
    } else if (item.unique_id == "149") {
      urlThemp = `/${params.lang}`;
    } else {
      urlThemp = `/${params.lang}${item.url ? "/" + item.url : ""}`;
    }
    if (item.unique_id == "149") {
      item.active = pathName === `/${params.lang}`;
    } else if (
      item.unique_id == "1462" &&
      pathName.startsWith(`/${params.lang}/education`)
    ) {
      item.active = true;
    } else if (
      urlThemp &&
      pathName.includes(urlThemp) &&
      item.unique_id != 1414
    ) {
      item.active = true;
    }
    if (pathName === `/${params.lang}/citizens/${params.id}/referral`) {
      if (item.unique_id == "1419") {
        item.active = true;
      } else {
        item.active = false;
      }
    }
  });

  const versionItem = {
    name: "version",
    unique_id: 1458,
    url: "version",
    order: -1,
    translation: params.lang.toLowerCase() === "fa" ? "ورژن متاورس" : "Metaverse version",
    active: pathName.startsWith(`/${params.lang}/version`),
  };

  const guideItem = {
    name: "Comprehensiveguide",
    order: -2,
    translation: params.lang.toLowerCase() === "fa" ? "راهنمای جامع" : "Comprehensive guide",
    active: pathName.includes(`/${params.lang}/education`),
  };

  return (
    <>
      {modalShow && <Modal dataObject={modalData} close={closeModal} />}
      <ul
        id="light-scrollbar"
        className={`h-full z-[100] flex flex-col list-none overflow-y-scroll relative no-scrollbar pt-3 w-full menu-transition max-lg:w-fit`}
      >
        {tabsMenu &&
          tabsMenu.map((item, i) => (
            <React.Fragment key={`fragment-${item.id}-${i}`}>
              {item.toShow && (
                <li style={{ order: item.order }}>
                  <Tooltip
                    title={item.translation}
                    placement={
                      langData.direction === "rtl" ? "left-end" : "right-end"
                    }
                    arrow
                    slotProps={{
                      tooltip: {
                        className: `
                          !bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343] !font-azarMehr !font-medium dark:!text-white !text-[14px] !top-[-20px]
                          ${isClosed ? "block" : "hidden"}
                        `,
                      },
                      arrow: {
                        className: `!text-[#E9E9E9] dark:!text-[#434343] mt-[6px]`,
                      },
                    }}
                    PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -10],
                          },
                        },
                      ],
                    }}
                  >
                    <span style={{ order: item.order }}>
                      {item.url ? (
                        <Link
                          href={
                            item.url.startsWith("http://") ||
                              item.url.startsWith("https://")
                              ? item.url
                              : `/${params.lang}/${item.url}`
                          }
                          target={
                            item.url.startsWith("http://") ||
                              item.url.startsWith("https://")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            item.url.startsWith("http://") ||
                              item.url.startsWith("https://")
                              ? "noopener noreferrer"
                              : undefined
                          }
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
                            <ListMenuTitleModule item={item} isClosed={isClosed} />
                            <ListMenuArrow item={item} />
                          </div>
                        </Link>
                      ) : (
                        <div
                          onClick={() => onTabClick(item, i)}
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
                            <ListMenuTitleModule item={item} isClosed={isClosed} />
                            <ListMenuArrow item={item} />
                          </div>
                        </div>
                      )}
                    </span>
                  </Tooltip>
                </li>
              )}
              {item.unique_id == 1414 ? (
                <li>
                  <Tooltip
                    title={item.translation}
                    placement={langData.direction === "rtl" ? "left-end" : "right-end"}
                    arrow
                    slotProps={{
                      tooltip: {
                        className: `
                          !bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343]
                          !font-azarMehr !font-medium dark:!text-white !text-[14px] !top-[-20px]
                          ${isClosed ? "block" : "hidden"}
                        `,
                      },
                      arrow: {
                        className: `!text-[#E9E9E9] dark:!text-[#434343] mt-[6px]`,
                      },
                    }}
                    PopperProps={{
                      modifiers: [{ name: "offset", options: { offset: [0, -10] } }],
                    }}
                  >
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
                          <ListMenuTitleModule item={item} isClosed={isClosed} />
                          <ListMenuArrow
                            item={{ name: "language" }}
                            isOpen={langDropDown}
                            isClosed={isClosed}
                          />
                        </div>
                      </div>
                    </div>
                  </Tooltip>

                  {/* Dropdown Content */}
                  <div
                    ref={dropdownRef}
                    className={`${langDropDown ? "h-fit" : "h-0 overflow-hidden"} base-transition-1 bg-Field dark:bg-darkGray`}
                  >
                    {langArray.map((lang, idx) => (
                      <Tooltip
                        key={idx}
                        title={lang.translation}
                        placement={langData.direction === "rtl" ? "left-end" : "right-end"}
                        arrow
                        slotProps={{
                          tooltip: {
                            className: `
                              !bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343]
                              !font-azarMehr !font-medium dark:!text-white !text-[14px] !top-[-20px]
                              ${isClosed ? "block" : "hidden"}
                            `,
                          },
                          arrow: {
                            className: `!text-[#E9E9E9] dark:!text-[#434343] mt-[6px]`,
                          },
                        }}
                        PopperProps={{
                          modifiers: [{ name: "offset", options: { offset: [0, -10] } }],
                        }}
                      >
                        <div>
                          <DropdownLanguageModule
                            languagesData={langData}
                            langArray={[lang]}
                            params={params}
                            isClosed={isClosed}
                          />
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </li>
              ) : (
                ""
              )}
            </React.Fragment>
          ))}
        {/* Dynamic Guide Item */}
        <li style={{ order: -3 }}>
          <Tooltip
            title={guideItem.translation}
            placement={langData.direction === "rtl" ? "left-end" : "right-end"}
            arrow
            slotProps={{
              tooltip: {
                className: `
                  !bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343]
                  !font-azarMehr !font-medium dark:!text-white !text-[14px] !top-[-20px]
                  ${isClosed ? "block" : "hidden"}
                `,
              },
              arrow: {
                className: `!text-[#E9E9E9] dark:!text-[#434343] mt-[6px]`,
              },
            }}
            PopperProps={{
              modifiers: [{ name: "offset", options: { offset: [0, -10] } }],
            }}
          >
            <div onClick={handleTrainingBtn}>
              <div
                className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px]
                  group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700] cursor-pointer menu-transition
                  ${isClosed ? "justify-start gap-0" : "justify-start gap-2"}`}
              >
                <ListMenuActiveIconModule
                  item={guideItem}
                  languageSelected={langData.code}
                  isClosed={isClosed}
                />
                <span className="ps-[15px]">
                  <ListMenuSvgModule item={{ name: "trainings", active: guideItem.active }} />
                </span>
                <div className="w-full flex justify-between items-center">
                  <ListMenuTitleModule item={guideItem} isClosed={isClosed} />
                  <ListMenuArrow
                    item={{ name: "trainings" }}
                    isOpen={trainingDropDown}
                    isClosed={isClosed}
                  />
                </div>
              </div>
            </div>
          </Tooltip>

          {/* Dropdown Content */}
          <div
            ref={dropdownRef2}
            className={`${trainingDropDown ? "h-fit" : "h-0 overflow-hidden"} base-transition-1 bg-slate-100 dark:bg-darkGray`}
          >
            {/* Trainings Link */}
            <Tooltip
              title={params.lang.toLowerCase() === "fa" ? "آموزش‌ها" : "Trainings"}
              placement={langData.direction === "rtl" ? "left-end" : "right-end"}
              arrow
              slotProps={{
                tooltip: {
                  className: `
                    !bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343]
                    !font-azarMehr !font-medium dark:!text-white !text-[14px] !top-[-20px]
                    ${isClosed ? "block" : "hidden"}
                  `,
                },
                arrow: { className: `!text-[#E9E9E9] dark:!text-[#434343] mt-[6px]` },
              }}
              PopperProps={{
                modifiers: [{ name: "offset", options: { offset: [0, -10] } }],
              }}
            >
              <Link
                href={`/${params.lang}/education`}
                className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px]
                  group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700] cursor-pointer menu-transition
                  ${isClosed ? "justify-start gap-0" : "justify-start gap-2 ps-3"}`}
              >
                <span className="ps-[15px]">
                  <ListMenuSvgModule
                    item={{
                      name: "trainers",
                      active: pathName.endsWith(`/${params.lang}/education`),
                    }}
                  />
                </span>
                <div className="w-full flex justify-between items-center">
                  <ListMenuTitleModule
                    item={{
                      translation: params.lang.toLowerCase() === "fa" ? "آموزش‌ها" : "Trainings",
                      active: pathName.endsWith(`/${params.lang}/education`),
                    }}
                    isClosed={isClosed}
                  />
                </div>
              </Link>
            </Tooltip>

            {/* Categories Link */}
            <Tooltip
              title={params.lang.toLowerCase() === "fa" ? "دسته‌بندی‌ها" : "Categories"}
              placement={langData.direction === "rtl" ? "left-end" : "right-end"}
              arrow
              slotProps={{
                tooltip: {
                  className: `
                    !bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343]
                    !font-azarMehr !font-medium dark:!text-white !text-[14px] !top-[-20px]
                    ${isClosed ? "block" : "hidden"}
                  `,
                },
                arrow: { className: `!text-[#E9E9E9] dark:!text-[#434343] mt-[6px]` },
              }}
              PopperProps={{
                modifiers: [{ name: "offset", options: { offset: [0, -10] } }],
              }}
            >
              <Link
                href={`/${params.lang}/education/category/all`}
                className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px]
                  group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700] cursor-pointer menu-transition
                  ${isClosed ? "justify-start gap-0" : "justify-start gap-2 ps-3"}`}
              >
                <span className="ps-[15px]">
                  <ListMenuSvgModule
                    item={{
                      name: "categories",
                      active: pathName.includes("category/all"),
                    }}
                  />
                </span>
                <div className="w-full flex justify-between items-center">
                  <ListMenuTitleModule
                    item={{
                      translation: params.lang.toLowerCase() === "fa" ? "دسته‌بندی‌ها" : "Categories",
                      active: pathName.includes("category/all"),
                    }}
                    isClosed={isClosed}
                  />
                </div>
              </Link>
            </Tooltip>
          </div>
        </li>
        {/* Static Version Item */}
        {pathName !== `/${params.lang}/citizens/${params.id}` && pathName !== `/${params.lang}/citizens/${params.id}/referral` && (
          <li style={{ order: -1 }}>
            <Tooltip
              title={versionItem.translation}
              placement={langData.direction === "rtl" ? "left-end" : "right-end"}
              arrow
              slotProps={{
                tooltip: {
                  className: `
                    !bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343] !font-azarMehr !font-medium dark:!text-white !text-[14px] !top-[-20px]
                    ${isClosed ? "block" : "hidden"}
                  `,
                },
                arrow: {
                  className: `!text-[#E9E9E9] dark:!text-[#434343] mt-[6px]`,
                },
              }}
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -10],
                    },
                  },
                ],
              }}
            >
              <span style={{ order: -1 }}>
                <Link
                  href={`/${params.lang}/version`}
                  className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px]
                    group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700] cursor-pointer menu-transition
                    ${isClosed ? "justify-start gap-0" : "justify-start gap-2"}`}
                >
                  <ListMenuActiveIconModule
                    item={versionItem}
                    languageSelected={langData.code}
                    isClosed={isClosed}
                  />
                  <span className="ps-[15px]">
                    <ListMenuSvgModule item={versionItem} />
                  </span>
                  <div className="w-full flex justify-between items-center">
                    <ListMenuTitleModule item={versionItem} isClosed={isClosed} />
                    <ListMenuArrow item={versionItem} />
                  </div>
                </Link>
              </span>
            </Tooltip>
          </li>
        )}
      </ul>
    </>
  );
}