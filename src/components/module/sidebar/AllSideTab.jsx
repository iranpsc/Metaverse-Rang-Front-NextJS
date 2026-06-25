"use client";
import Link from "next/link";
import ListMenuSvgModule from "./list/ListMenuSvgModule";
import ListMenuTitleModule from "./list/ListMenuTitleModule";
import ListMenuArrow from "./list/ListMenuArrow";
import DropdownLanguageModule from "./list/dropdowns/DropdownLanguageModule";
import { Modals_fa, Modals_en } from "@/components/utils/modals-content";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/modal/modal";
import ListMenuActiveIconModule from "./list/ListMenuActiveIconModule";
import { useRouter, usePathname } from "next/navigation";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default function SideBarContent({
  tabsMenu,
  langData,
  isClosed,
  langArray,
  params,
  pageSide,
  levelTabs,
  mainData
}) {

  const pathName = usePathname();
  const router = useRouter();

  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [langDropDown, setLangDropDown] = useState(false);
  const [trainingDropDown, setTrainingDropDown] = useState(false);
  const [articleDropDown, setArticlesDropDown] = useState(false);
  const [whitePaperDropDown, setWhitePaperDropDown] = useState(false);
  const [citizensDropDown, setCitizensDropDown] = useState(false);
  const [newsDropDown, setNewsDropDown] = useState(false); // اضافه شده برای اخبار

  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);
  const dropdownRef3 = useRef(null);
  const dropdownRef4 = useRef(null);
  const dropdownRef5 = useRef(null); // اضافه شده برای اخبار

  // خاموش شدن لودر وقتی صفحه عوض شد
  useEffect(() => {
    setLoading(false);
  }, [pathName]);

  const handleTrainingBtn = () => setTrainingDropDown((prev) => !prev);
  const handleArticlesBtn = () => setArticlesDropDown((prev) => !prev);
  const handleCitizensBtn = () => setCitizensDropDown((prev) => !prev);
  const handleWhitePaper = () => setWhitePaperDropDown((prev) => !prev);
  const handleNewsBtn = () => setNewsDropDown((prev) => !prev); // اضافه شده برای اخبار
  const handleLangBtn = () => setLangDropDown((prev) => !prev);

  useEffect(() => {
    if (langDropDown && dropdownRef.current) {
      setTimeout(() => {
        dropdownRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    }
  }, [langDropDown]);

  // تنظیم منو بر اساس pageSide
  const finalTabsMenu = pageSide === "level" && levelTabs?.data ? levelTabs.data : tabsMenu;

  const [menuItems, setMenuItems] = useState([]);

  // تشخیص اینکه در بخش آموزش هستیم یا نه
  const isEducationSectionActive = pathName.startsWith(`/${params.lang}/education`);
  const isWhitePaperSectionActive =
  pathName.startsWith(`/${params.lang}/whitepaper`);
  const isArticlesSectionActive = pathName.startsWith(`/${params.lang}/articles`);
  const isNewsSectionActive = pathName.startsWith(`/${params.lang}/news`); // اضافه شده برای اخبار
  const isCitizensSectionActive =
    pathName === `/${params.lang}/citizens` ||
    pathName === `/${params.lang}/citizens/` ||
    pathName === `/${params.lang}/rand-id/hm`;

  const pathSegments = pathName.split("/").filter(Boolean);
  const isEducationFinalContent =
    pathSegments[1] === "education" &&
    pathSegments[2] === "category" &&
    pathSegments.length > 5;
  const isEducationCategory =
    pathSegments[1] === "education" &&
    pathSegments[2] === "category" &&
    !isEducationFinalContent;
  const isCategoriesActive = isEducationCategory;
  const isTrainingsActive =
    pathName === `/${params.lang}/education` ||
    isEducationFinalContent;

  const isNewsMainActive = pathName === `/${params.lang}/news` ||
    pathName === `/${params.lang}/news/` ||
    (pathName.startsWith(`/${params.lang}/news/categories/`) &&
      pathName.split('/').length > 5);

  const isNewsCategoriesActive = (pathName === `/${params.lang}/news/categories` ||
    pathName === `/${params.lang}/news/categories/`) ||
    (pathName.startsWith(`/${params.lang}/news/categories`) &&
      pathName.split('/').length === 5);
  useEffect(() => {
    if (!finalTabsMenu) return;


    const cleanPath = pathName.endsWith("/") ? pathName.slice(0, -1) : pathName;

    const citizenProfilePath = `/${params.lang}/citizens/${params.id}`;
    const referralPath = `${citizenProfilePath}/referral`;

    const updatedMenu = finalTabsMenu.map((item) => {
      // زبان هیچوقت اکتیو نشه
      if (item.unique_id == 1414) {
        return { ...item, active: false };
      }

      let urlThemp;
      if (item.url == "referral") {
        urlThemp = `/${params.lang}/citizens/${params.id}/referral`;
        item.url = `/citizens/${params.id}/referral`;
      } else if (item.unique_id == "1374") {
        urlThemp = `/${params.lang}/citizens/${params.id}`;
      } else if (item.unique_id == "149") {
        urlThemp = `/${params.lang}`;
      } else if (item.unique_id == 1458) {
        urlThemp = `/${params.lang}/version`;
      } else {
        urlThemp = `/${params.lang}${item.url ? "/" + item.url : ""}`;
      }

      let isActive = false;

      // --- صفحه اصلی ---
      if (item.unique_id == "149") {
        isActive =
          pathName === `/${params.lang}` || pathName === `/${params.lang}/`;
      }
      // --- education و زیرمجموعه‌ها ---
      else if (
        item.unique_id == "1462" &&
        pathName.startsWith(`/${params.lang}/education`)
      ) {
        isActive = true;
      }
      // --- news و زیرمجموعه‌ها ---
      else if (
        item.unique_id == "NEWS_UNIQUE_ID" && // باید با unique_id واقعی جایگزین شود
        pathName.startsWith(`/${params.lang}/news`)
      ) {
        isActive = true;
      }
      // --- version و زیرمجموعه‌ها ---
      else if (
        item.unique_id == 1458 &&
        pathName.startsWith(`/${params.lang}/version`)
      ) {
        isActive = true;
      }
      // --- سایر صفحات (match دقیق) ---
      else if (urlThemp && pathName === urlThemp) {
        isActive = true;
      }

      // --- referral ---
      if (pathName === `/${params.lang}/citizens/${params.id}/referral`) {
        isActive = item.unique_id == "1419";
      }

      return { ...item, active: isActive };
    });

    setMenuItems(updatedMenu);
    setTrainingDropDown(cleanPath.startsWith(`/${params.lang}/education`));
    setArticlesDropDown(cleanPath.startsWith(`/${params.lang}/articles`));
    setNewsDropDown(cleanPath.startsWith(`/${params.lang}/news`)); // اضافه شده برای اخبار
    setCitizensDropDown(isCitizensSectionActive);

  }, [finalTabsMenu, pathName, params.lang, params.id]);

  // هندلر اصلی کلیک (کلیک چپ + کلیک وسط)
  const handleItemClick = (e, url = null, item = null) => {
    e.stopPropagation();

    // کلیک وسط → تب جدید
    if (e.button === 1) {
      if (!url && !item?.url) return;

      let targetUrl = url || item?.url || "";

      if (targetUrl === "referral") targetUrl = `/citizens/${params.id}/referral`;
      else if (item?.unique_id === "1374") targetUrl = `/citizens/${params.id}`;
      else if (item?.unique_id === "149") targetUrl = "";
      else if (item?.unique_id === 1458) targetUrl = "/version";
      else if (item?.unique_id === "NEWS_UNIQUE_ID") targetUrl = "/news"; // اضافه شده برای اخبار

      const fullUrl = targetUrl.startsWith("http")
        ? targetUrl
        : `/${params.lang}${targetUrl.startsWith("/") ? targetUrl : "/" + targetUrl}`;

      window.open(fullUrl, "_blank");
      return;
    }

    // کلیک چپ → ناوبری یا مودال
    if (e.button === 0) {
      if (url !== null || item?.url !== undefined) {
        let targetUrl = url || item?.url || "";

        if (targetUrl === "referral") targetUrl = `/citizens/${params.id}/referral`;
        else if (item?.unique_id === "1374") targetUrl = `/citizens/${params.id}`;
        else if (item?.unique_id === "149") targetUrl = "";
        else if (item?.unique_id === 1458) targetUrl = "/version";
        else if (item?.unique_id === "NEWS_UNIQUE_ID") targetUrl = "/news"; // اضافه شده برای اخبار

        const fullUrl = targetUrl.startsWith("http")
          ? targetUrl
          : `/${params.lang}${targetUrl.startsWith("/") ? targetUrl : "/" + targetUrl}`;

        if (targetUrl.startsWith("http")) {
          window.open(fullUrl, "_blank");
        } else {
          setLoading(true);
          router.push(fullUrl);
        }
      } else {
        // مودال
        const itemId = e.currentTarget.dataset.id;
        const modals = langData.code === "fa" ? Modals_fa : Modals_en;
        const temp = modals.find((x) => x.id == itemId);
        if (temp) {
          setModalShow(true);
          setModalData(temp);
        }
      }
    }
  };

  return (
    <>
      {/* لودر تمام صفحه */}
      {loading && (
        <div className={`${isClosed ? "!w-[96.4vw]" : "xl:w-[83vw] 2xl:w-[83.5vw]"}
          fixed w-full rtl:left-0 ltr:right-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm`} >
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

      {modalShow && <Modal dataObject={modalData} close={() => setModalShow(false)} />}

      <ul className="h-full flex flex-col list-none overflow-y-scroll relative no-scrollbar pt-3 w-full menu-transition max-lg:w-fit">
        {menuItems.map((item, i) => (
          <React.Fragment key={`menu-item-${item.id}-${i}`}>
            {item.toShow && (
              <li style={{ order: item.order }}>
                <Tooltip
                  title={item.translation}
                  placement={langData.direction === "rtl" ? "left-end" : "right-end"}
                  arrow
                  slotProps={{
                    tooltip: {
                      className: `!bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343] dark:!text-white !font-azarMehr !font-medium !text-[14px] ${isClosed ? "block" : "hidden"}`,
                    },
                    arrow: { className: "!text-[#E9E9E9] dark:!text-[#434343]" },
                  }}
                  PopperProps={{ modifiers: [{ name: "offset", options: { offset: [0, -10] } }] }}
                >
                  <Link
                    onMouseDown={(e) => handleItemClick(e, item.url, item)}
                    href={`/${params.lang}/${item.url}`}

                    className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px] cursor-pointer menu-transition
                      ${item.active ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-700 dark:text-gray-300"}
                      group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700]
                      ${isClosed ? "justify-start gap-0" : "justify-start gap-2"}`}
                  >
                    <ListMenuActiveIconModule item={item} languageSelected={langData.code} isClosed={isClosed} />
                    <span className="ps-[15px]"><ListMenuSvgModule item={item} /></span>
                    <div className="w-full flex justify-between items-center">
                      <ListMenuTitleModule item={item} isClosed={isClosed} />
                      <ListMenuArrow item={item} />
                    </div>
                  </Link>
                </Tooltip>
              </li>
            )}

            {/* بخش آموزش‌ها */}
            {item.unique_id == 1462 && (
              <li style={{ order: "-2" }}>
                <Tooltip
                  title={params.lang === "fa" ? "راهنمای جامع" : "Comprehensive guide"}
                  placement={langData.direction === "rtl" ? "left-end" : "right-end"}
                  arrow
                  slotProps={{
                    tooltip: {
                      className: `!bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343] dark:!text-white !font-azarMehr !font-medium !text-[14px] ${isClosed ? "block" : "hidden"}`,
                    },
                    arrow: { className: "!text-[#E9E9E9] dark:!text-[#434343]" },
                  }}
                >
                  <div onClick={handleTrainingBtn} className="cursor-pointer">
                    <div className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px] menu-transition
                      ${isEducationSectionActive ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-700 dark:text-gray-300"}
                      group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700]
                      ${isClosed ? "justify-start gap-0" : "justify-start gap-2"}`}>
                      <ListMenuActiveIconModule item={{ active: isEducationSectionActive }} languageSelected={langData.code} isClosed={isClosed} />
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ unique_id: 1462, active: isEducationSectionActive }} />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule
                          item={{ translation: params.lang === "fa" ? "راهنمای جامع" : "Comprehensive guide", active: isEducationSectionActive }}
                          isClosed={isClosed}
                        />
                        <ListMenuArrow item={{ name: "trainings" }} isOpen={trainingDropDown} isClosed={isClosed} />
                      </div>
                    </div>
                  </div>
                </Tooltip>

                <div ref={dropdownRef2} className={`${trainingDropDown ? "h-fit" : "h-0 overflow-hidden"} base-transition-1 bg-slate-100 dark:bg-darkGray`}>
                  {/* آموزش‌ها */}
                  <Link
                    href={`/${params.lang}/education`}
                    onMouseDown={(e) => handleItemClick(e, "/education")}
                    className={`block w-full py-[12px] 3xl:py-[16px] menu-transition cursor-pointer
                      ${pathName === `/${params.lang}/education` || pathName === `/${params.lang}/education/` ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-600 dark:text-gray-400"}
                      hover:text-[#0066FF] dark:hover:text-[#FFC700] ${isClosed ? "ps-0" : "ps-3"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="ps-[15px]">
                        <ListMenuSvgModule
                          item={{
                            name: "trainers",
                            active: isTrainingsActive
                          }}
                        />
                      </span>
                      <ListMenuTitleModule
                        item={{
                          translation: params.lang === "fa" ? "آموزش‌ها" : "Trainings",
                          active: isTrainingsActive
                        }}
                        isClosed={isClosed}
                      />
                    </div>
                  </Link>

                  {/* دسته‌بندی‌ها */}
                  <Link
                    href={`/${params.lang}/education/category`}
                    onMouseDown={(e) => handleItemClick(e, "/education/category")}
                    className={`block w-full py-[12px] 3xl:py-[16px] menu-transition cursor-pointer
                      ${pathName.startsWith(`/${params.lang}/education/category`) ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-600 dark:text-gray-400"}
                      hover:text-[#0066FF] dark:hover:text-[#FFC700] ${isClosed ? "ps-0" : "ps-3"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="ps-[15px]">
                        <ListMenuSvgModule
                          item={{
                            name: "categories",
                            active: isCategoriesActive
                          }}
                        />
                      </span>
                      <ListMenuTitleModule
                        item={{
                          translation: params.lang === "fa" ? "دسته‌بندی‌ها" : "Categories",
                          active: isCategoriesActive
                        }}
                        isClosed={isClosed}
                      />
                    </div>
                  </Link>
                </div>
              </li>
            )}
                        {item.unique_id == 1462  && (
              <li style={{ order: "-2" }}>
                <Tooltip
                  title={findByUniqueId(mainData, 1758 )}
                  placement={langData.direction === "rtl" ? "left-end" : "right-end"}
                  arrow
                  slotProps={{
                    tooltip: {
                      className: `!bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343] dark:!text-white !font-azarMehr !font-medium !text-[14px] ${isClosed ? "block" : "hidden"}`,
                    },
                    arrow: { className: "!text-[#E9E9E9] dark:!text-[#434343]" },
                  }}
                >
                  <div onClick={handleWhitePaper} className="cursor-pointer">
                    <div className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px] menu-transition
                     ${isWhitePaperSectionActive ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-700 dark:text-gray-300"}
                      group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700]
                      ${isClosed ? "justify-start gap-0" : "justify-start gap-2"}`}>
                      <ListMenuActiveIconModule item={{ active: isWhitePaperSectionActive  }} languageSelected={langData.code} isClosed={isClosed} />
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{name:"docs", active: isWhitePaperSectionActive  }} />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule
                          item={{ translation:findByUniqueId(mainData, 1758 ), active: isWhitePaperSectionActive  }}
                          isClosed={isClosed}
                        />
                        <ListMenuArrow item={{ name: "trainings" }} isOpen={whitePaperDropDown} isClosed={isClosed} />
                      </div>
                    </div>
                  </div>
                </Tooltip>

                <div ref={dropdownRef2} className={`${whitePaperDropDown ? "h-fit" : "h-0 overflow-hidden"} base-transition-1 bg-slate-100 dark:bg-darkGray`}>
                  {/* آموزش‌ها */}
                  <Link
                    href={`/${params.lang}/whitepaper`}
                    onMouseDown={(e) => handleItemClick(e, "/whitepaper")}
                    className={`block w-full py-[12px] 3xl:py-[16px] menu-transition cursor-pointer
                      ${pathName === `/${params.lang}/whitepaper` || pathName === `/${params.lang}/whitepaper/` ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-600 dark:text-gray-400"}
                      hover:text-[#0066FF] dark:hover:text-[#FFC700] ${isClosed ? "ps-0" : "ps-3"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="ps-[15px]">
                        <ListMenuSvgModule
                          item={{
                            name: "whitepaper",
                            active: isWhitePaperSectionActive 
                          }}
                        />
                      </span>
                      <ListMenuTitleModule
                        item={{
                          translation:  findByUniqueId(mainData, 1759 ),
                          active: isWhitePaperSectionActive 
                        }}
                        isClosed={isClosed}
                      />
                    </div>
                  </Link>

                </div>
              </li>
            )}

            {/* بخش مقالات متارنگ */}
            {item.unique_id == 258 && (
              <li style={{ order: "-1" }}>
                <Tooltip
                  title={params.lang === "fa" ? " مقالات متارنگ" : "MetaRang Articles"}
                  placement={langData.direction === "rtl" ? "left-end" : "right-end"}
                  arrow
                  slotProps={{
                    tooltip: {
                      className: `!bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343] dark:!text-white !font-azarMehr !font-medium !text-[14px] ${isClosed ? "block" : "hidden"}`,
                    },
                    arrow: { className: "!text-[#E9E9E9] dark:!text-[#434343]" },
                  }}
                >
                  <div onClick={handleArticlesBtn} className="cursor-pointer">
                    <div className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px] menu-transition
                      ${isArticlesSectionActive ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-700 dark:text-gray-300"}
                      group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700]
                      ${isClosed ? "justify-start gap-0" : "justify-start gap-2"}`}>
                      <ListMenuActiveIconModule item={{ active: isArticlesSectionActive }} languageSelected={langData.code} isClosed={isClosed} />
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ unique_id: 258, active: isArticlesSectionActive }} />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule
                          item={{ translation: params.lang === "fa" ? " مقالات متارنگ" : "MetaRang Articles", active: isArticlesSectionActive }}
                          isClosed={isClosed}
                        />
                        <ListMenuArrow item={{ name: "trainings" }} isOpen={articleDropDown} isClosed={isClosed} />
                      </div>
                    </div>
                  </div>
                </Tooltip>

                <div ref={dropdownRef3} className={`${articleDropDown ? "h-fit" : "h-0 overflow-hidden"} base-transition-1 bg-slate-100 dark:bg-darkGray`}>
                  {/* مقالات */}
                  <Link
                    href={`/${params.lang}/articles`}
                    onMouseDown={(e) => handleItemClick(e, "/articles")}
                    className={`block w-full py-[12px] 3xl:py-[16px] menu-transition cursor-pointer
                      ${pathName === `/${params.lang}/articles` || pathName === `/${params.lang}/articles/` ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-600 dark:text-gray-400"}
                      hover:text-[#0066FF] dark:hover:text-[#FFC700] ${isClosed ? "ps-0" : "ps-3"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ unique_id: 258, active: pathName === `/${params.lang}/articles` || pathName === `/${params.lang}/articles/` }} />
                      </span>
                      <ListMenuTitleModule item={{ translation: params.lang === "fa" ? "مقالات" : "Articles", active: pathName === `/${params.lang}/articles` || pathName === `/${params.lang}/articles/` }} isClosed={isClosed} />
                    </div>
                  </Link>

                  {/* دسته‌بندی‌ها */}
                  <Link href={`/${params.lang}/articles/categories`}
                    onMouseDown={(e) => handleItemClick(e, "/articles/categories")}
                    className={`block w-full py-[12px] 3xl:py-[16px] menu-transition cursor-pointer
                      ${pathName.startsWith(`/${params.lang}/articles/categories`) ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-600 dark:text-gray-400"}
                      hover:text-[#0066FF] dark:hover:text-[#FFC700] ${isClosed ? "ps-0" : "ps-3"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ name: "categories", active: pathName.startsWith(`/${params.lang}/articles/categories`) }} />
                      </span>
                      <ListMenuTitleModule item={{ translation: params.lang === "fa" ? "دسته‌بندی‌ها" : "Categories", active: pathName.startsWith(`/${params.lang}/articles/categories`) }} isClosed={isClosed} />
                    </div>
                  </Link>
                </div>
              </li>
            )}

            {/* بخش اخبار (NEWS) - اضافه شده */}
            {item.unique_id == 255 && ( // عدد 259 را با unique_id واقعی اخبار جایگزین کنید
              <li style={{ order: "-1" }}> {/* order را بر اساس نیاز تنظیم کنید */}
                <Tooltip
                  title={params.lang === "fa" ? "اخبار متارنگ" : "MetaRang News"}
                  placement={langData.direction === "rtl" ? "left-end" : "right-end"}
                  arrow
                  slotProps={{
                    tooltip: {
                      className: `!bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343] dark:!text-white !font-azarMehr !font-medium !text-[14px] ${isClosed ? "block" : "hidden"}`,
                    },
                    arrow: { className: "!text-[#E9E9E9] dark:!text-[#434343]" },
                  }}
                >
                  <div onClick={handleNewsBtn} className="cursor-pointer">
                    <div className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px] menu-transition
                      ${isNewsSectionActive ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-700 dark:text-gray-300"}
                      group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700]
                      ${isClosed ? "justify-start gap-0" : "justify-start gap-2"}`}>
                      <ListMenuActiveIconModule item={{ active: isNewsSectionActive }} languageSelected={langData.code} isClosed={isClosed} />
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ unique_id: 255, active: isNewsSectionActive }} />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule
                          item={{ translation: params.lang === "fa" ? "اخبار متارنگ" : "MetaRang News", active: isNewsSectionActive }}
                          isClosed={isClosed}
                        />
                        <ListMenuArrow item={{ name: "trainings" }} isOpen={newsDropDown} isClosed={isClosed} />
                      </div>
                    </div>
                  </div>
                </Tooltip>

                <div ref={dropdownRef5} className={`${newsDropDown ? "h-fit" : "h-0 overflow-hidden"} base-transition-1 bg-slate-100 dark:bg-darkGray`}>
                  {/* لیست اخبار */}
                  <Link
                    href={`/${params.lang}/news`}
                    onMouseDown={(e) => handleItemClick(e, "/news")}
                    className={`block w-full py-[12px] 3xl:py-[16px] menu-transition cursor-pointer
                      ${isNewsMainActive ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-600 dark:text-gray-400"}
                      hover:text-[#0066FF] dark:hover:text-[#FFC700] ${isClosed ? "ps-0" : "ps-3"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ unique_id: 255, active: isNewsMainActive }} />
                      </span>
                      <ListMenuTitleModule
                        item={{
                          translation: params.lang === "fa" ? " اخبار" : "News",
                          active: isNewsMainActive
                        }}
                        isClosed={isClosed}
                      />
                    </div>
                  </Link>

                  {/* دسته‌بندی اخبار */}
                  <Link
                    href={`/${params.lang}/news/categories`}
                    onMouseDown={(e) => handleItemClick(e, "/news/categories")}
                    className={`block w-full py-[12px] 3xl:py-[16px] menu-transition cursor-pointer
                      ${isNewsCategoriesActive ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-600 dark:text-gray-400"}
                      hover:text-[#0066FF] dark:hover:text-[#FFC700] ${isClosed ? "ps-0" : "ps-3"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ name: "categories", active: isNewsCategoriesActive }} />
                      </span>
                      <ListMenuTitleModule
                        item={{
                          translation: params.lang === "fa" ? "دسته‌بندی‌ها" : "Categories",
                          active: isNewsCategoriesActive
                        }}
                        isClosed={isClosed}
                      />
                    </div>
                  </Link>
                </div>
              </li>
            )}

            {/* بخش شهروندان */}
            {item.unique_id == 263 && (
              <li style={{ order: "-2" }}>
                <Tooltip
                  title={findByUniqueId(mainData, 1588)}
                  placement={langData.direction === "rtl" ? "left-end" : "right-end"}
                  arrow
                  slotProps={{
                    tooltip: {
                      className: `!bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343] dark:!text-white !font-azarMehr !font-medium !text-[14px] ${isClosed ? "block" : "hidden"}`,
                    },
                    arrow: { className: "!text-[#E9E9E9] dark:!text-[#434343]" },
                  }}
                >
                  <div onClick={handleCitizensBtn} className="cursor-pointer">
                    <div className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px] menu-transition
                      ${isCitizensSectionActive ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-700 dark:text-gray-300"}
                      group-hover:text-[#0066FF] dark:group-hover:text-[#FFC700]
                      ${isClosed ? "justify-start gap-0" : "justify-start gap-2"}`}>
                      <ListMenuActiveIconModule item={{ active: isCitizensSectionActive }} languageSelected={langData.code} isClosed={isClosed} />
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ unique_id: 263, active: isCitizensSectionActive }} />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule
                          item={{ translation: findByUniqueId(mainData, 1588), active: isCitizensSectionActive }}
                          isClosed={isClosed}
                        />
                        <ListMenuArrow item={{ name: "trainings" }} isOpen={citizensDropDown} isClosed={isClosed} />
                      </div>
                    </div>
                  </div>
                </Tooltip>

                <div ref={dropdownRef4} className={`${citizensDropDown ? "h-fit" : "h-0 overflow-hidden"} base-transition-1 bg-slate-100 dark:bg-darkGray`}>
                  {/* شهروندان */}
                  <Link
                    href={`/${params.lang}/citizens`}
                    onMouseDown={(e) => handleItemClick(e, "/citizens")}
                    className={`block w-full py-[12px] 3xl:py-[16px] menu-transition cursor-pointer
                      ${pathName === `/${params.lang}/citizens` || pathName === `/${params.lang}/citizens/` ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-600 dark:text-gray-400"}
                      hover:text-[#0066FF] dark:hover:text-[#FFC700] ${isClosed ? "ps-0" : "ps-3"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ unique_id: 263, active: pathName === `/${params.lang}/citizens` || pathName === `/${params.lang}/citizens/` }} />
                      </span>
                      <ListMenuTitleModule item={{ translation: findByUniqueId(mainData, 1589), active: pathName === `/${params.lang}/citizens` || pathName === `/${params.lang}/citizens/` }} isClosed={isClosed} />
                    </div>
                  </Link>

                  {/* دسته‌بندی‌ها */}
                  <Link
                    href={`/${params.lang}/rand-id/hm`}
                    onMouseDown={(e) => handleItemClick(e, "/rand-id/hm")}
                    className={`block w-full py-[12px] 3xl:py-[16px] menu-transition cursor-pointer
                      ${pathName.startsWith(`/${params.lang}/rand-id/hm`) ? "text-[#0066FF] dark:text-[#FFC700]" : "text-gray-600 dark:text-gray-400"}
                      hover:text-[#0066FF] dark:hover:text-[#FFC700] ${isClosed ? "ps-0" : "ps-3"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ unique_id: 1490, active: pathName.startsWith(`/${params.lang}/rand-id/hm`) }} />
                      </span>
                      <ListMenuTitleModule item={{ translation: findByUniqueId(mainData, 1490), active: pathName.startsWith(`/${params.lang}/rand-id/hm`) }} isClosed={isClosed} />
                    </div>
                  </Link>
                </div>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
}