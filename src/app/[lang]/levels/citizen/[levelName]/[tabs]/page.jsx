import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import NotFoundPage from "@/components/shared/NotFoundPage";
import {
  getFooterData,
  getTranslation,
  getMainFile,
  getSingleLevel,
  getLevelTabs,
  findByModalName,
  findByTabName,
} from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import TabContentWrapper from "./TabContentWrapper";
import TabLoadingProvider from "./TabLoadingProvider";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam from "@/components/shared/CleanAutoRetryParam";
const GeneralInfo = dynamic(() => import('@/components/module/levelComponent/GeneralInfo'));
const TabSelector = dynamic(() => import('@/components/module/levelComponent/TabSelector'));
const Gem = dynamic(() => import('@/components/module/levelComponent/Gem'));
const Gift = dynamic(() => import('@/components/module/levelComponent/Gift'));
const Permission = dynamic(() => import('@/components/module/levelComponent/Permissions'));
const Prize = dynamic(() => import('@/components/module/levelComponent/Prize'));
const DynamicFooter = dynamic(() => import('@/components/module/footer/DynamicFooter'));
const BreadCrumb = dynamic(() => import('@/components/shared/BreadCrumb'));
const ImageBox = dynamic(() => import('@/components/module/levelComponent/ImageBox'));
import { Features } from "@/components/module/levelComponent/Features";


const STATIC_ROUTE_NAMES = [
  { id: 1, unique_id: 382, route_name: "citizen-baguette" },
  { id: 2, unique_id: 383, route_name: "reporter-baguette" },
  { id: 3, unique_id: 589, route_name: "participation-baguette" },
  { id: 4, unique_id: 68, route_name: "developer-baguette" },
  { id: 5, unique_id: 69, route_name: "inspector-baguette" },
  { id: 6, unique_id: 590, route_name: "businessman-baguette" },
  { id: 7, unique_id: 71, route_name: "lawyer-baguette" },
  { id: 8, unique_id: 591, route_name: "city-council-baguette" },
  { id: 9, unique_id: 592, route_name: "the-mayor-baguette" },
  { id: 10, unique_id: 74, route_name: "governor-baguette" },
  { id: 11, unique_id: 75, route_name: "minister-baguette" },
  { id: 12, unique_id: 76, route_name: "judge-baguette" },
  { id: 13, unique_id: 77, route_name: "legislator-baguette" },
];

async function fetchData(params) {
  const { lang } = params;
  const levelMeta = STATIC_ROUTE_NAMES.find(x => x.route_name === params.levelName);
  const levelId = levelMeta?.id;
  const levelUniqueId = levelMeta?.unique_id;
  const TAB_TITLE_MAP = {
    "general-info": 387,
    "licenses": 388,
    "gem": 389,
    "gift": 390,
    "prize": 391,
  };

  const [
    langData,
    footerTabs,
    singleLevel,
    levelTabs,
    mainData,
  ] = await Promise.all([
    getTranslation(lang),
    getFooterData(params),
    getSingleLevel(levelId),
    getLevelTabs(params, levelId),
    getMainFile(await getTranslation(lang)),
  ]);

  return {
    langData,
    footerTabs,
    singleLevel,
    levelTabs,
    mainData,
    levelUniqueId,
  };
}

function getLevelTitle(concatArrayContent, uniqueId) {
  return concatArrayContent.find(item => Number(item.unique_id) === Number(uniqueId))?.translation || '';
}

function buildBreadcrumbSchema(mainData, params) {
  const baseUrl = `https://metarang.com/${params.lang}/levels/citizen/${params.levelName}`;
  const ids = [387, 388, 389, 390, 391];
  const urls = ['general-info', 'licenses', 'gem', 'gift', 'prize'];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": ids.map((id, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: findByUniqueId(mainData, id),
      item: `${baseUrl}/${urls[index]}`
    }))
  };
}

export default async function LevelSinglePage({ params }) {
  try {
    const resolvedParams = await params;
    console.log("TABS:", resolvedParams.tabs);
    const { lang } = resolvedParams;

    const {
      langData,
      footerTabs,
      singleLevel,
      levelTabs,
      mainData,
      levelUniqueId
    } = await fetchData(resolvedParams);

    // اگر داده‌ها ناقص بودند، صفحه 404 نمایش داده شود
    if (!singleLevel?.data || !levelTabs?.data) {
      return (
        <NotFoundPage
          lang={params.lang}
          params={params}
          langData={langData}
          langArray={mainData?.languages || []}
          updatedTabsMenu={mainData?.tabsMenu || []}
          footerTabs={footerTabs}
          mainData={mainData}
          hideSidebar={true}
        />
      );
    }

    // افزودن unique_id در صورت نیاز
    STATIC_ROUTE_NAMES.forEach(item => {
      if (item.id === singleLevel.data.slug) {
        singleLevel.data.unique_id = item.unique_id;
      }
    });

    const levels = await findByModalName(mainData, "levels");
    const [levelPageArrayContent, levelListArrayContent] = await Promise.all([
      findByTabName(levels, "levels-page"),
      findByTabName(levels, "level-list"),
    ]);
    const concatArrayContent = [...levelPageArrayContent, ...levelListArrayContent];
    const TAB_TITLE_MAP = {
      "general-info": 387,
      "licenses": 388,
      "gem": 389,
      "gift": 390,
      "prize": 391,
    };

    const tabUniqueId = TAB_TITLE_MAP[params.tabs];
    const tabTitle = tabUniqueId
      ? findByUniqueId(mainData, tabUniqueId)
      : "";

    const levelTitle = getLevelTitle(concatArrayContent, levelUniqueId);

    // عنوان نهایی
    const pageTitle = tabTitle
      ? `${tabTitle} ${levelTitle} `
      : levelTitle;

    const breadcrumbSchema = buildBreadcrumbSchema(mainData, params);
console.log("TAB:", params.tabs);
console.log("DATA:", levelTabs.data);
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Head>
          {singleLevel.data.general_info?.png_file && (
            <link
              rel="preload"
              href={singleLevel.data.general_info.png_file}
              as="image"
              type="image/png"
              crossOrigin="anonymous"
            />
          )}
          {levelTabs.data?.png_file && (
            <link
              rel="preload"
              href={levelTabs.data.png_file}
              as="image"
              type="image/png"
              crossOrigin="anonymous"
            />
          )}
        </Head>

        <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-3 w-full font-azarMehr ">
          <BreadCrumb params={resolvedParams} />

          <div className="grid-container gap-x-7 bg-white dark:bg-[#080807] rounded-[20px] p-5 3xl:p-[30px] relative">
            <div className="self-start md:order-none w-full md:min-w-[65vw] xl:min-w-[65vw] flex items-center justify-between font-bold pt-[3px] pb-5 dark:text-white text-lg sm:text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl">
              <h1 className="text-base  md:text-[28px] lg:text-[30px] xl:text-[32px]">{pageTitle}</h1>
              <button className="w-max py-[5px] md:py-3 px-5 text-[14px] dark:bg-bgLightGrey2 bg-bgLightGrey dark:text-white font-bold text-textGray rounded-[12px]">
                {findByUniqueId(mainData, 392)}
              </button>
            </div>

            <TabLoadingProvider>
              {/* Tabs (ثابت – بدون Skeleton) */}
              <div className="grid-second overflow-hidden mb-5 self-start w-full md:min-w-[65vw] xl:min-w-[65vw]">
                <TabSelector
                  params={resolvedParams}
                  mainData={mainData}
                />
              </div>

              {/* Tab Content (Skeleton می‌شود) */}
              <div className="grid-third w-full md:min-w-[65vw] xl:min-w-[65vw] px-1">
                <TabContentWrapper>
                  {params.tabs === "general-info" && (
                    <GeneralInfo
                      mainData={mainData}
                      levelTabs={levelTabs}
                      singleLevel={singleLevel}
                      params={resolvedParams}
                      concatArrayContent={concatArrayContent}
                    />
                  )}

                  {params.tabs === "gem" && (
                    <Gem
                      mainData={mainData}
                      levelTabs={levelTabs}
                      singleLevel={singleLevel}
                      params={resolvedParams}
                      concatArrayContent={concatArrayContent}
                    />
                  )}

                  {params.tabs === "gift" && (
                    <Gift
                      mainData={mainData}
                      levelTabs={levelTabs}
                      singleLevel={singleLevel}
                      params={resolvedParams}
                      concatArrayContent={concatArrayContent}
                    />
                  )}

                  {params.tabs === "licenses" && (
                    <Permission
                      mainData={mainData}
                      levelTabs={levelTabs}
                      singleLevel={singleLevel}
                      params={resolvedParams}
                    />
                  )}

                  {params.tabs === "prize" && (
                    <Prize
                      mainData={mainData}
                      levelTabs={levelTabs}
                      singleLevel={singleLevel}
                      params={resolvedParams}
                      concatArrayContent={concatArrayContent}
                    />
                  )}
                </TabContentWrapper>
              </div>
            


            <div className="grid-forth flex-1 relative !mt-[-2px]">
              <Suspense fallback={<div>image box loading ...</div>}>
                <ImageBox item={levelTabs.data} singleLevel={singleLevel} />
              </Suspense>
            </div>
            </TabLoadingProvider>
          </div>

          <Features mainData={mainData} params={resolvedParams} />
        </div>

        <div className="flex flex-col justify-center items-center xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
          <DynamicFooter footerTabs={footerTabs} mainData={mainData} params={resolvedParams} />
        </div>
      </>
    );
  } catch (error) {
    const serializedError = {
      message:
        error instanceof Error ? error.message : "Unknown error",
      stack:
        error instanceof Error ? error.stack : null,
      name:
        error instanceof Error ? error.name : "Error",
    };

    console.error("❌ Error in LevelTabPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}
export async function generateMetadata({ params }) {
  try {
    // ✅ الگوی استاندارد پروژه
    const resolvedParams = await params;
    const { lang, levelName, tabs } = resolvedParams;

    const STATIC_ROUTE_NAMES = [
      { id: 1, unique_id: 382, route_name: "citizen-baguette" },
      { id: 2, unique_id: 383, route_name: "reporter-baguette" },
      { id: 3, unique_id: 589, route_name: "participation-baguette" },
      { id: 4, unique_id: 68, route_name: "developer-baguette" },
      { id: 5, unique_id: 69, route_name: "inspector-baguette" },
      { id: 6, unique_id: 590, route_name: "businessman-baguette" },
      { id: 7, unique_id: 71, route_name: "lawyer-baguette" },
      { id: 8, unique_id: 591, route_name: "city-council-baguette" },
      { id: 9, unique_id: 592, route_name: "the-mayor-baguette" },
      { id: 10, unique_id: 74, route_name: "governor-baguette" },
      { id: 11, unique_id: 75, route_name: "minister-baguette" },
      { id: 12, unique_id: 76, route_name: "judge-baguette" },
      { id: 13, unique_id: 77, route_name: "legislator-baguette" },
    ];

    const levelMeta = STATIC_ROUTE_NAMES.find(
      (x) => x.route_name === levelName
    );

    if (!levelMeta) {
      return {
        title: "صفحه یافت نشد",
        description: "",
      };
    }

    const levelId = levelMeta.id;
    const levelUniqueId = levelMeta.unique_id;

    const [langData, singleLevel, levelTabs] = await Promise.all([
      getTranslation(lang),
      getSingleLevel(levelId),
      getLevelTabs(resolvedParams, levelId),
    ]);

    if (!singleLevel?.data || !levelTabs?.data) {
      return {
        title: "صفحه یافت نشد",
        description: "",
      };
    }

    const mainData = await getMainFile(langData);

    const levels = await findByModalName(mainData, "levels");
    const [levelPageArrayContent, levelListArrayContent] = await Promise.all([
      findByTabName(levels, "levels-page"),
      findByTabName(levels, "level-list"),
    ]);

    const concatArrayContent = [
      ...levelPageArrayContent,
      ...levelListArrayContent,
    ];

    const levelTitle =
      concatArrayContent.find(
        (item) =>
          Number(item.unique_id) === Number(levelUniqueId)
      )?.translation || "";

    const TAB_TITLE_MAP = {
      "general-info": 387,
      "licenses": 388,
      "gem": 389,
      "gift": 390,
      "prize": 391,
    };

    const tabUniqueId = TAB_TITLE_MAP[tabs];
    const tabTitle = tabUniqueId
      ? findByUniqueId(mainData, tabUniqueId)
      : "";

    const title = tabTitle
      ? `${tabTitle} ${levelTitle}`
      : levelTitle;

    const description =
      levelTabs.data.description ||
      singleLevel.data.general_info?.description ||
      "";

    const shortDescription = description.slice(0, 200);

    const imageUrl =
      levelTabs.data.png_file ||
      singleLevel.data.general_info?.png_file;

    const url = `https://metarang.com/${lang}/levels/citizen/${levelName}${
      tabs ? `/${tabs}` : ""
    }`;

    return {
      title,
      description: shortDescription,
      openGraph: {
        type: "website",
        title,
        description: shortDescription,
        locale: lang === "fa" ? "fa_IR" : "en_US",
        url,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: 800,
                height: 600,
              },
            ]
          : [],
      },
    };
  } catch (error) {
    console.error("❌ Metadata error (LevelSinglePage):", error);

    return {
      title: "سطوح متاورس رنگ",
      description: "مشکلی در بارگذاری اطلاعات صفحه رخ داده است",
    };
  }
}

