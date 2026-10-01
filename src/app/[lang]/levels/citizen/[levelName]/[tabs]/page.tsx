import { Suspense, type ComponentType } from "react";
import { notFound } from "next/navigation";
import ReactDOM from "react-dom";

import GeneralInfo from "@/components/features/levels/GeneralInfo";
import Gem from "@/components/ui/Gem";
import Gift from "@/components/ui/Gift";
import Permission from "@/components/features/levels/Permissions";
import Prize from "@/components/features/levels/Prize";
import ImageBox from "@/components/features/levels/ImageBox";
import { Skeleton } from "@/components/ui/skeleton";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import {
  getLevelMeta,
  getMainData,
  getLevelData,
  getTabData,
  TAB_TITLE_MAP,
} from "@/components/utils/levelData";

type Params = { lang: string; levelName: string; tabs: string };
type Props = { params: Promise<Params> };

const TAB_COMPONENTS: Record<string, ComponentType<any>> = {
  "general-info": GeneralInfo,
  licenses: Permission,
  gem: Gem,
  gift: Gift,
  prize: Prize,
};

async function loadPageData({ lang, levelName, tabs }: Params) {
  const levelMeta = getLevelMeta(levelName);
  if (!levelMeta || !TAB_COMPONENTS[tabs]) notFound();

  const [mainData, singleLevel, levelTabs] = await Promise.all([
    getMainData(lang),
    getLevelData(levelMeta.id),
    getTabData(lang, levelName, tabs, levelMeta.id),
  ]);

  if (!singleLevel?.data || !levelTabs?.data) notFound();

  return { levelMeta, mainData, singleLevel, levelTabs };
}

export default async function LevelTabPage({ params }: Props) {
  const resolvedParams = await params;
  const { lang, tabs } = resolvedParams;

  const { mainData, singleLevel, levelTabs } = await loadPageData(resolvedParams);

  // جایگزین next/head (در App Router کار نمی‌کند)
  [singleLevel.data.general_info?.png_file, levelTabs.data?.png_file]
    .filter(Boolean)
    .forEach((href) =>
      ReactDOM.preload(href, { as: "image", crossOrigin: "anonymous" })
    );

  const TabComponent = TAB_COMPONENTS[tabs];

  return (
    <>
      <div className="grid-third w-full md:min-w-[65vw] xl:min-w-[65vw] px-1">
        <div className="relative min-h-[400px]">
          <TabComponent
            mainData={mainData}
            levelTabs={levelTabs}
            singleLevel={singleLevel}
            params={resolvedParams}
          />
        </div>
      </div>

      <div className="grid-forth flex-1 relative !mt-[-2px] mb-10 lg:mb-0">
       
          <ImageBox item={levelTabs.data} singleLevel={singleLevel} lang={lang} />
      </div>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { lang, levelName, tabs } = await params;

  const levelMeta = getLevelMeta(levelName);
  if (!levelMeta) return { title: "صفحه یافت نشد", description: "" };

  try {
    const [mainData, singleLevel, levelTabs] = await Promise.all([
      getMainData(lang),
      getLevelData(levelMeta.id),
      getTabData(lang, levelName, tabs, levelMeta.id),
    ]);

    if (!singleLevel?.data || !levelTabs?.data) {
      return { title: "صفحه یافت نشد", description: "" };
    }

    const levelTitle = findByUniqueId(mainData, levelMeta.unique_id);
    const tabUniqueId = TAB_TITLE_MAP[tabs];
    const tabTitle = tabUniqueId ? findByUniqueId(mainData, tabUniqueId) : "";
    const title = tabTitle ? `${tabTitle} ${levelTitle}` : levelTitle;

    const description = (
      levelTabs.data.description ||
      singleLevel.data.general_info?.description ||
      ""
    ).slice(0, 200);

    const imageUrl =
      levelTabs.data.png_file || singleLevel.data.general_info?.png_file;

    return {
      title,
      description,
      openGraph: {
        type: "website",
        title,
        description,
        locale: lang === "fa" ? "fa_IR" : "en_US",
        url: `https://metarang.com/${lang}/levels/citizen/${levelName}/${tabs}`,
        images: imageUrl ? [{ url: imageUrl, width: 800, height: 600 }] : [],
      },
    };
  } catch (error) {
    console.error("❌ Metadata error (LevelTabPage):", error);
    return {
      title: "سطوح متاورس رنگ",
      description: "مشکلی در بارگذاری اطلاعات صفحه رخ داده است",
    };
  }
}
