"use client";
import Link from "next/link";
import ListMenuSvgModule from "./list/ListMenuSvgModule";
import ListMenuTitleModule from "./list/ListMenuTitleModule";
import ListMenuArrow from "./list/ListMenuArrow";
import { Modals_fa, Modals_en } from "@/components/utils/modals-content";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/modal/modal";
import ListMenuActiveIconModule from "./list/ListMenuActiveIconModule";
import { useRouter, usePathname } from "next/navigation";
import Tooltip from "./SidebarTooltip";
import React from "react";

// =====================================================
// کامپوننت مشترک تولتیپ (برای آیتم‌ها، هدر دراپ‌دان‌ها و زیرمنوها)
// =====================================================
const MenuTooltip = ({ title, langData, isClosed, children }) => (
  <Tooltip
    title={title || ""}
    placement={langData.direction === "rtl" ? "left-end" : "right-end"}
    arrow
    slotProps={{
      tooltip: {
        className: `!bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343] dark:!text-white !font-azarMehr !font-medium !text-[14px] ${
          isClosed ? "block" : "hidden"
        }`,
      },
      arrow: { className: "!text-[#E9E9E9] dark:!text-[#434343]" },
    }}
    PopperProps={{
      modifiers: [{ name: "offset", options: { offset: [0, -10] } }],
    }}
  >
    {children}
  </Tooltip>
);

export default function SideBarContent({
  tabsMenu,
  langData,
  isClosed,
  params,
  pageSide,
  levelTabs,
  sidebarLabels,
}) {
  const pathName = usePathname();
  const router = useRouter();

  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [langDropDown] = useState(false);
  const [trainingDropDown, setTrainingDropDown] = useState(false);
  const [articleDropDown, setArticlesDropDown] = useState(false);
  const [whitePaperDropDown, setWhitePaperDropDown] = useState(false);
  const [citizensDropDown, setCitizensDropDown] = useState(false);
  const [newsDropDown, setNewsDropDown] = useState(false);

  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null); // وایت‌پیپر
  const dropdownRef2 = useRef(null); // آموزش
  const dropdownRef3 = useRef(null); // مقالات
  const dropdownRef4 = useRef(null); // شهروندان
  const dropdownRef5 = useRef(null); // اخبار

  // خاموش شدن لودر وقتی صفحه عوض شد
  useEffect(() => {
    setLoading(false);
  }, [pathName]);

  const handleTrainingBtn = () => setTrainingDropDown((prev) => !prev);
  const handleArticlesBtn = () => setArticlesDropDown((prev) => !prev);
  const handleCitizensBtn = () => setCitizensDropDown((prev) => !prev);
  const handleWhitePaper = () => setWhitePaperDropDown((prev) => !prev);
  const handleNewsBtn = () => setNewsDropDown((prev) => !prev);

  useEffect(() => {
    if (langDropDown && dropdownRef.current) {
      setTimeout(() => {
        dropdownRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    }
  }, [langDropDown]);

  // تنظیم منو بر اساس pageSide
  const finalTabsMenu =
    pageSide === "level" && levelTabs?.data ? levelTabs.data : tabsMenu;

  const [menuItems, setMenuItems] = useState([]);

  // تشخیص بخش‌های فعال
  const isEducationSectionActive = pathName.startsWith(`/${params.lang}/education`);
  const isWhitePaperSectionActive = pathName.startsWith(`/${params.lang}/whitepaper`);
  const isArticlesSectionActive = pathName.startsWith(`/${params.lang}/articles`);
  const isNewsSectionActive = pathName.startsWith(`/${params.lang}/news`);
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
    pathName === `/${params.lang}/education` || isEducationFinalContent;

  const isNewsMainActive =
    pathName === `/${params.lang}/news` ||
    pathName === `/${params.lang}/news/` ||
    (pathName.startsWith(`/${params.lang}/news/categories/`) &&
      pathName.split("/").length > 5);

  const isNewsCategoriesActive =
    pathName === `/${params.lang}/news/categories` ||
    pathName === `/${params.lang}/news/categories/` ||
    (pathName.startsWith(`/${params.lang}/news/categories`) &&
      pathName.split("/").length === 5);

  useEffect(() => {
    if (!finalTabsMenu) return;

    const cleanPath = pathName.endsWith("/") ? pathName.slice(0, -1) : pathName;

    const updatedMenu = finalTabsMenu.map((item) => {
      // زبان هیچوقت active نشود
      if (item.unique_id == 1414) {
        return { ...item, active: false };
      }

      let urlThemp = "";

      // HOME
      if (item.unique_id == "149") {
        urlThemp = `/${params.lang}`;
      }
      // CITIZEN PROFILE
      else if (item.unique_id == "1374") {
        if (params.id) {
          urlThemp = `/${params.lang}/citizens/${params.id}`;
        } else {
          return { ...item, toShow: false, active: false };
        }
      }
      // REFERRAL
      else if (item.unique_id == "1419") {
        if (params.id) {
          urlThemp = `/${params.lang}/citizens/${params.id}/referral`;
        } else {
          return { ...item, toShow: false, active: false };
        }
      }
      // VERSION
      else if (item.unique_id == 1458) {
        urlThemp = `/${params.lang}/version`;
      }
      // EDUCATION
      else if (
        item.unique_id == "1462" &&
        pathName.startsWith(`/${params.lang}/education`)
      ) {
        urlThemp = `/${params.lang}/education`;
      }
      // NEWS
      else if (
        item.unique_id == "NEWS_UNIQUE_ID" &&
        pathName.startsWith(`/${params.lang}/news`)
      ) {
        urlThemp = `/${params.lang}/news`;
      }
      // سایر آیتم‌ها
      else {
        urlThemp = `/${params.lang}${item.url ? "/" + item.url : ""}`;
      }

      let isActive = false;

      if (item.unique_id == "149") {
        isActive = pathName === `/${params.lang}` || pathName === `/${params.lang}/`;
      } else if (
        item.unique_id == "1462" &&
        pathName.startsWith(`/${params.lang}/education`)
      ) {
        isActive = true;
      } else if (
        item.unique_id == "NEWS_UNIQUE_ID" &&
        pathName.startsWith(`/${params.lang}/news`)
      ) {
        isActive = true;
      } else if (
        item.unique_id == 1458 &&
        pathName.startsWith(`/${params.lang}/version`)
      ) {
        isActive = true;
      } else if (item.unique_id == "1419") {
        isActive =
          !!params.id &&
          pathName === `/${params.lang}/citizens/${params.id}/referral`;
      } else if (urlThemp && pathName === urlThemp) {
        isActive = true;
      }

      return {
        ...item,
        active: isActive,
        ...(item.unique_id == "1419" && params.id
          ? { url: `/citizens/${params.id}/referral` }
          : item.unique_id == "1374" && params.id
          ? { url: `/citizens/${params.id}` }
          : {}),
      };
    });

    // آیتم‌های استاتیک (فقط داخل صفحه‌ی یک شهروند خاص)
    const staticCitizenItems = params.id
      ? [
          {
            name: "wallet",
            unique_id: "STATIC_WALLET",
            url: `citizens/${params.id}/wallet`,
            translation: params.lang === "fa" ? "دارایی ها" : "property",
            toShow: true,
            order: -3,
            active: pathName === `/${params.lang}/citizens/${params.id}/wallet`,
          },
          {
            name: "summary",
            unique_id: "STATIC_SUMMARY",
            url: `citizens/${params.id}/summary`,
            translation: params.lang === "fa" ? "املاک و مستغلات" : "Real Estate",
            toShow: true,
            order: -3,
            active: pathName === `/${params.lang}/citizens/${params.id}/summary`,
          },
          {
            name: "buildings",
            unique_id: "STATIC_BUILDINGS",
            url: `citizens/${params.id}/buildings`,
            translation: params.lang === "fa" ? "املاک دارای بنا" : "Built Properties",
            toShow: true,
            order: -3,
            active: pathName === `/${params.lang}/citizens/${params.id}/buildings`,
          },
        ]
      : [];

    setMenuItems([...updatedMenu, ...staticCitizenItems]);
    setTrainingDropDown(cleanPath.startsWith(`/${params.lang}/education`));
    setArticlesDropDown(cleanPath.startsWith(`/${params.lang}/articles`));
    setNewsDropDown(cleanPath.startsWith(`/${params.lang}/news`));
    setCitizensDropDown(isCitizensSectionActive);
  }, [finalTabsMenu, pathName, params.lang, params.id]);

  // هندلر اصلی کلیک (کلیک چپ + کلیک وسط)
  const handleItemClick = (e, url = null, item = null) => {
    e.stopPropagation();

    let targetUrl = url || item?.url || "";

    if (item?.unique_id == "1419") {
      if (!params.id) return;
      targetUrl = `/citizens/${params.id}/referral`;
    } else if (item?.unique_id == "1374") {
      if (!params.id) return;
      targetUrl = `/citizens/${params.id}`;
    } else if (item?.unique_id == "149") {
      targetUrl = "";
    } else if (item?.unique_id == 1458) {
      targetUrl = "/version";
    } else if (item?.unique_id == "NEWS_UNIQUE_ID") {
      targetUrl = "/news";
    }

    const fullUrl = targetUrl.startsWith("http")
      ? targetUrl
      : `/${params.lang}${targetUrl.startsWith("/") ? targetUrl : "/" + targetUrl}`;

    // MIDDLE CLICK
    if (e.button === 1) {
      if (!targetUrl) return;
      window.open(fullUrl, "_blank");
      return;
    }

    // LEFT CLICK
    if (e.button === 0) {
      if (targetUrl !== null && targetUrl !== undefined) {
        if (targetUrl.startsWith("http")) {
          window.open(fullUrl, "_blank");
        } else {
          setLoading(true);
          router.push(fullUrl);
        }
        return;
      }

      // MODAL
      const itemId = e.currentTarget.dataset.id;
      const modals = langData.code === "fa" ? Modals_fa : Modals_en;
      const temp = modals.find((x) => x.id == itemId);

      if (temp) {
        setModalShow(true);
        setModalData(temp);
      }
    }
  };

  // کلاس مشترک هدر دراپ‌دان‌ها
  const headerClass = (active) => `w-full flex flex-row items-center group py-[12px] 3xl:py-[16px] menu-transition
    ${active ? "text-primary " : "matn-2-700 dark:tmatn-2-300"}
    group-hover:text-primary dark:group-hover:text-primary
    ${isClosed ? "justify-start gap-0" : "justify-start gap-2"}`;

  // کلاس مشترک زیرمنوها
  const subLinkClass = (active) => `block w-full py-[12px] 3xl:py-[16px] menu-transition cursor-pointer
    ${active ? "text-primary " : "matn-2-600 dark:tmatn-2-400"}
    hover:text-primary dark:hover:text-primary ${isClosed ? "ps-0" : "ps-3"}`;

  const isFa = params.lang === "fa";

  const isEducationMain =
    pathName === `/${params.lang}/education` || pathName === `/${params.lang}/education/`;
  const isWhitePaperMain =
    pathName === `/${params.lang}/whitepaper` || pathName === `/${params.lang}/whitepaper/`;
  const isArticlesMain =
    pathName === `/${params.lang}/articles` || pathName === `/${params.lang}/articles/`;
  const isArticlesCategories = pathName.startsWith(`/${params.lang}/articles/categories`);
  const isCitizensMain =
    pathName === `/${params.lang}/citizens` || pathName === `/${params.lang}/citizens/`;
  const isRandId = pathName.startsWith(`/${params.lang}/rand-id/hm`);

  return (
    <>
      {/* لودر تمام صفحه */}
      {loading && (
        <div
          className={`${isClosed ? "!w-[96.4vw]" : "xl:w-[83vw] 2xl:w-[83.5vw]"}
          fixed w-full rtl:left-0 ltr:right-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm`}
        >
          <div className="container flex w-full h-screen items-center justify-center">
            <div className="holder"><div className="box"></div></div>
            <div className="holder"><div className="box"></div></div>
            <div className="holder"><div className="box"></div></div>
          </div>
        </div>
      )}

      {modalShow && <Modal dataObject={modalData} close={() => setModalShow(false)} />}

      <ul className="h-full flex flex-col list-none overflow-y-scroll relative no-scrollbar pt-3 w-full menu-transition max-lg:w-fit">
        {menuItems.map((item, i) => (
          <React.Fragment key={`menu-item-${item.id}-${i}`}>
            {item.toShow && (
              <li style={{ order: item.order }}>
                <MenuTooltip title={item.translation} langData={langData} isClosed={isClosed}>
                  <Link
                    onMouseDown={(e) => handleItemClick(e, item.url, item)}
                    href={
                      item.unique_id == "1419"
                        ? `/${params.lang}/citizens/${params.id}/referral`
                        : item.unique_id == "1374"
                        ? `/${params.lang}/citizens/${params.id}`
                        : `/${params.lang}/${item.url}`
                    }
                    className={`w-full flex flex-row items-center group py-[12px] 3xl:py-[16px] cursor-pointer menu-transition
                      ${item.active ? "text-primary " : "matn-2-700 dark:tmatn-2-300"}
                      group-hover:text-primary dark:group-hover:text-primary
                      ${isClosed ? "justify-start gap-0" : "justify-start gap-2"}`}
                  >
                    <ListMenuActiveIconModule item={item} languageSelected={langData.code} isClosed={isClosed} />
                    <span className="ps-[15px]"><ListMenuSvgModule item={item} /></span>
                    <div className="w-full flex justify-between items-center">
                      <ListMenuTitleModule item={item} isClosed={isClosed} />
                      <ListMenuArrow item={item} />
                    </div>
                  </Link>
                </MenuTooltip>
              </li>
            )}

            {/* ===================== بخش آموزش‌ها ===================== */}
            {item.unique_id == 1462 && (
              <li style={{ order: "-2" }}>
                <MenuTooltip
                  title={isFa ? "راهنمای جامع" : "Comprehensive guide"}
                  langData={langData}
                  isClosed={isClosed}
                >
                  <div onClick={handleTrainingBtn} className="cursor-pointer">
                    <div className={headerClass(isEducationSectionActive)}>
                      <ListMenuActiveIconModule item={{ active: isEducationSectionActive }} languageSelected={langData.code} isClosed={isClosed} />
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ unique_id: 1462, active: isEducationSectionActive }} />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule
                          item={{ translation: isFa ? "راهنمای جامع" : "Comprehensive guide", active: isEducationSectionActive }}
                          isClosed={isClosed}
                        />
                        <ListMenuArrow item={{ name: "trainings" }} isOpen={trainingDropDown} isClosed={isClosed} />
                      </div>
                    </div>
                  </div>
                </MenuTooltip>

                <div ref={dropdownRef2} className={`${trainingDropDown ? "h-fit" : "h-0 overflow-hidden"} base-transition-1 bg-slate-100 dark:bg-gray-1`}>
                  {/* آموزش‌ها */}
                  <MenuTooltip title={isFa ? "آموزش‌ها" : "Trainings"} langData={langData} isClosed={isClosed}>
                    <Link
                      href={`/${params.lang}/education`}
                      onMouseDown={(e) => handleItemClick(e, "/education")}
                      className={subLinkClass(isEducationMain)}
                    >
                      <div className="flex items-center gap-2">
                        <span >
                          <ListMenuSvgModule item={{ name: "trainers", active: isTrainingsActive }} />
                        </span>
                        <ListMenuTitleModule
                          item={{ translation: isFa ? "آموزش‌ها" : "Trainings", active: isTrainingsActive }}
                          isClosed={isClosed}
                        />
                      </div>
                    </Link>
                  </MenuTooltip>

                  {/* دسته‌بندی‌ها */}
                  <MenuTooltip title={isFa ? "دسته‌بندی‌ها" : "Categories"} langData={langData} isClosed={isClosed}>
                    <Link
                      href={`/${params.lang}/education/category`}
                      onMouseDown={(e) => handleItemClick(e, "/education/category")}
                      className={subLinkClass(pathName.startsWith(`/${params.lang}/education/category`))}
                    >
                      <div className="flex items-center gap-2">
                        <span >
                          <ListMenuSvgModule item={{ name: "categories", active: isCategoriesActive }} />
                        </span>
                        <ListMenuTitleModule
                          item={{ translation: isFa ? "دسته‌بندی‌ها" : "Categories", active: isCategoriesActive }}
                          isClosed={isClosed}
                        />
                      </div>
                    </Link>
                  </MenuTooltip>
                </div>
              </li>
            )}

            {/* ===================== بخش وایت‌پیپر ===================== */}
            {item.unique_id == 1462 && (
              <li style={{ order: "-2" }}>
                <MenuTooltip title={sidebarLabels?.whitePaper} langData={langData} isClosed={isClosed}>
                  <div onClick={handleWhitePaper} className="cursor-pointer">
                    <div className={headerClass(isWhitePaperSectionActive)}>
                      <ListMenuActiveIconModule item={{ active: isWhitePaperSectionActive }} languageSelected={langData.code} isClosed={isClosed} />
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ name: "docs", active: isWhitePaperSectionActive }} />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule
                          item={{ translation: sidebarLabels?.whitePaper, active: isWhitePaperSectionActive }}
                          isClosed={isClosed}
                        />
                        <ListMenuArrow item={{ name: "trainings" }} isOpen={whitePaperDropDown} isClosed={isClosed} />
                      </div>
                    </div>
                  </div>
                </MenuTooltip>

                <div ref={dropdownRef} className={`${whitePaperDropDown ? "h-fit" : "h-0 overflow-hidden"} base-transition-1 bg-slate-100 dark:bg-gray-1`}>
                  <MenuTooltip title={sidebarLabels?.whitePaperChild} langData={langData} isClosed={isClosed}>
                    <Link
                      href={`/${params.lang}/whitepaper`}
                      onMouseDown={(e) => handleItemClick(e, "/whitepaper")}
                      className={subLinkClass(isWhitePaperMain)}
                    >
                      <div className="flex items-center gap-2">
                        <span >
                          <ListMenuSvgModule item={{ name: "whitepaper", active: isWhitePaperSectionActive }} />
                        </span>
                        <ListMenuTitleModule
                          item={{ translation: sidebarLabels?.whitePaperChild, active: isWhitePaperSectionActive }}
                          isClosed={isClosed}
                        />
                      </div>
                    </Link>
                  </MenuTooltip>
                </div>
              </li>
            )}

            {/* ===================== بخش مقالات متارنگ ===================== */}
            {item.unique_id == 258 && (
              <li style={{ order: "-1" }}>
                <MenuTooltip
                  title={isFa ? "مقالات متارنگ" : "MetaRang Articles"}
                  langData={langData}
                  isClosed={isClosed}
                >
                  <div onClick={handleArticlesBtn} className="cursor-pointer">
                    <div className={headerClass(isArticlesSectionActive)}>
                      <ListMenuActiveIconModule item={{ active: isArticlesSectionActive }} languageSelected={langData.code} isClosed={isClosed} />
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ unique_id: 258, active: isArticlesSectionActive }} />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule
                          item={{ translation: isFa ? " مقالات متارنگ" : "MetaRang Articles", active: isArticlesSectionActive }}
                          isClosed={isClosed}
                        />
                        <ListMenuArrow item={{ name: "trainings" }} isOpen={articleDropDown} isClosed={isClosed} />
                      </div>
                    </div>
                  </div>
                </MenuTooltip>

                <div ref={dropdownRef3} className={`${articleDropDown ? "h-fit" : "h-0 overflow-hidden"} base-transition-1 bg-slate-100 dark:bg-gray-1`}>
                  {/* مقالات */}
                  <MenuTooltip title={isFa ? "مقالات" : "Articles"} langData={langData} isClosed={isClosed}>
                    <Link
                      href={`/${params.lang}/articles`}
                      onMouseDown={(e) => handleItemClick(e, "/articles")}
                      className={subLinkClass(isArticlesMain)}
                    >
                      <div className="flex items-center gap-2">
                        <span >
                          <ListMenuSvgModule item={{ unique_id: 258, active: isArticlesMain }} />
                        </span>
                        <ListMenuTitleModule
                          item={{ translation: isFa ? "مقالات" : "Articles", active: isArticlesMain }}
                          isClosed={isClosed}
                        />
                      </div>
                    </Link>
                  </MenuTooltip>

                  {/* دسته‌بندی‌ها */}
                  <MenuTooltip title={isFa ? "دسته‌بندی‌ها" : "Categories"} langData={langData} isClosed={isClosed}>
                    <Link
                      href={`/${params.lang}/articles/categories`}
                      onMouseDown={(e) => handleItemClick(e, "/articles/categories")}
                      className={subLinkClass(isArticlesCategories)}
                    >
                      <div className="flex items-center gap-2">
                        <span >
                          <ListMenuSvgModule item={{ name: "categories", active: isArticlesCategories }} />
                        </span>
                        <ListMenuTitleModule
                          item={{ translation: isFa ? "دسته‌بندی‌ها" : "Categories", active: isArticlesCategories }}
                          isClosed={isClosed}
                        />
                      </div>
                    </Link>
                  </MenuTooltip>
                </div>
              </li>
            )}

            {/* ===================== بخش اخبار ===================== */}
            {item.unique_id == 255 && (
              <li style={{ order: "-1" }}>
                <MenuTooltip
                  title={isFa ? "اخبار متارنگ" : "MetaRang News"}
                  langData={langData}
                  isClosed={isClosed}
                >
                  <div onClick={handleNewsBtn} className="cursor-pointer">
                    <div className={headerClass(isNewsSectionActive)}>
                      <ListMenuActiveIconModule item={{ active: isNewsSectionActive }} languageSelected={langData.code} isClosed={isClosed} />
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ unique_id: 255, active: isNewsSectionActive }} />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule
                          item={{ translation: isFa ? "اخبار متارنگ" : "MetaRang News", active: isNewsSectionActive }}
                          isClosed={isClosed}
                        />
                        <ListMenuArrow item={{ name: "trainings" }} isOpen={newsDropDown} isClosed={isClosed} />
                      </div>
                    </div>
                  </div>
                </MenuTooltip>

                <div ref={dropdownRef5} className={`${newsDropDown ? "h-fit" : "h-0 overflow-hidden"} base-transition-1 bg-slate-100 dark:bg-gray-1`}>
                  {/* لیست اخبار */}
                  <MenuTooltip title={isFa ? "اخبار" : "News"} langData={langData} isClosed={isClosed}>
                    <Link
                      href={`/${params.lang}/news`}
                      onMouseDown={(e) => handleItemClick(e, "/news")}
                      className={subLinkClass(isNewsMainActive)}
                    >
                      <div className="flex items-center gap-2">
                        <span >
                          <ListMenuSvgModule item={{ unique_id: 255, active: isNewsMainActive }} />
                        </span>
                        <ListMenuTitleModule
                          item={{ translation: isFa ? " اخبار" : "News", active: isNewsMainActive }}
                          isClosed={isClosed}
                        />
                      </div>
                    </Link>
                  </MenuTooltip>

                  {/* دسته‌بندی اخبار */}
                  <MenuTooltip title={isFa ? "دسته‌بندی‌ها" : "Categories"} langData={langData} isClosed={isClosed}>
                    <Link
                      href={`/${params.lang}/news/categories`}
                      onMouseDown={(e) => handleItemClick(e, "/news/categories")}
                      className={subLinkClass(isNewsCategoriesActive)}
                    >
                      <div className="flex items-center gap-2">
                        <span >
                          <ListMenuSvgModule item={{ name: "categories", active: isNewsCategoriesActive }} />
                        </span>
                        <ListMenuTitleModule
                          item={{ translation: isFa ? "دسته‌بندی‌ها" : "Categories", active: isNewsCategoriesActive }}
                          isClosed={isClosed}
                        />
                      </div>
                    </Link>
                  </MenuTooltip>
                </div>
              </li>
            )}

            {/* ===================== بخش شهروندان ===================== */}
            {item.unique_id == 263 && (
              <li style={{ order: "-2" }}>
                <MenuTooltip title={sidebarLabels?.citizens} langData={langData} isClosed={isClosed}>
                  <div onClick={handleCitizensBtn} className="cursor-pointer">
                    <div className={headerClass(isCitizensSectionActive)}>
                      <ListMenuActiveIconModule item={{ active: isCitizensSectionActive }} languageSelected={langData.code} isClosed={isClosed} />
                      <span className="ps-[15px]">
                        <ListMenuSvgModule item={{ unique_id: 263, active: isCitizensSectionActive }} />
                      </span>
                      <div className="w-full flex justify-between items-center">
                        <ListMenuTitleModule
                          item={{ translation: sidebarLabels?.citizens, active: isCitizensSectionActive }}
                          isClosed={isClosed}
                        />
                        <ListMenuArrow item={{ name: "trainings" }} isOpen={citizensDropDown} isClosed={isClosed} />
                      </div>
                    </div>
                  </div>
                </MenuTooltip>

                <div ref={dropdownRef4} className={`${citizensDropDown ? "h-fit" : "h-0 overflow-hidden"} base-transition-1 bg-slate-100 dark:bg-gray-1`}>
                  {/* همه شهروندان */}
                  <MenuTooltip title={sidebarLabels?.allCitizens} langData={langData} isClosed={isClosed}>
                    <Link
                      href={`/${params.lang}/citizens`}
                      onMouseDown={(e) => handleItemClick(e, "/citizens")}
                      className={subLinkClass(isCitizensMain)}
                    >
                      <div className="flex items-center gap-2">
                        <span >
                          <ListMenuSvgModule item={{ unique_id: 263, active: isCitizensMain }} />
                        </span>
                        <ListMenuTitleModule
                          item={{ translation: sidebarLabels?.allCitizens, active: isCitizensMain }}
                          isClosed={isClosed}
                        />
                      </div>
                    </Link>
                  </MenuTooltip>

                  {/* شناسه ملی */}
                  <MenuTooltip title={sidebarLabels?.nationalId} langData={langData} isClosed={isClosed}>
                    <Link
                      href={`/${params.lang}/rand-id/hm`}
                      onMouseDown={(e) => handleItemClick(e, "/rand-id/hm")}
                      className={subLinkClass(isRandId)}
                    >
                      <div className="flex items-center gap-2">
                        <span >
                          <ListMenuSvgModule item={{ unique_id: 1490, active: isRandId }} />
                        </span>
                        <ListMenuTitleModule
                          item={{ translation: sidebarLabels?.nationalId, active: isRandId }}
                          isClosed={isClosed}
                        />
                      </div>
                    </Link>
                  </MenuTooltip>
                </div>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
}