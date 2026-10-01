import { notFound } from "next/navigation";
import SideBar from "@/components/shared/sidebar/SideBar";
import BreadCrumb from "@/components/shared/BreadCrumb";
import TabSelector from "@/components/features/levels/TabSelector";
import Footer from "@/components/shared/footer/DynamicFooter";
import { Features } from "@/components/features/levels/Features";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
import { getLangArray } from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { buildSidebarLabels } from "@/components/utils/buildShellTranslations";
import { buildLevelTabsMenu } from "@/components/utils/buildTabsMenu";
import {
  getLangData,
  getLevelMeta,
  getMainData,
  TAB_TITLE_MAP,
} from "@/components/utils/levelData";
import LevelHeader from "./LevelHeader";

export default async function LevelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string; levelName: string }>;
}) {
  const { lang, levelName } = await params;

  const levelMeta = getLevelMeta(levelName);
  if (!levelMeta) notFound();

  const [langData, mainData, langArray] = await Promise.all([
    getLangData(lang),
    getMainData(lang),
    getLangArray(),
  ]);

  const tabsMenu = buildLevelTabsMenu(mainData);
  const sidebarLabels = buildSidebarLabels(mainData);

  const levelTitle = findByUniqueId(mainData, levelMeta.unique_id);
  const tabTitles = Object.fromEntries(
    Object.entries(TAB_TITLE_MAP).map(([tab, id]) => [
      tab,
      findByUniqueId(mainData, id),
    ])
  );

  const baseUrl = `https://metarang.com/${lang}/levels/citizen/${levelName}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: Object.entries(TAB_TITLE_MAP).map(([tab, id], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: findByUniqueId(mainData, id),
      item: `${baseUrl}/${tab}`,
    })),
  };

  const layoutParams = { lang, levelName };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-bg-primary">
      <main
        className="flex !w-full h-screen light-scrollbar dark:dark-scrollbar"
        dir={langData.direction}
      >
        <SideBar
          pageSide="level"
          langArray={langArray}
          langData={langData}
          tabsMenu={tabsMenu}
          params={layoutParams}
          sidebarLabels={sidebarLabels}
        />

        <div
          dir={langData.direction}
          className="light-scrollbar dark:dark-scrollbar w-full h-[calc(100vh-60px)] lg:h-screen overflow-y-auto relative mt-[60px] lg:mt-0"
        >
          <CleanAutoRetryParam />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />

          <div className="xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-3 w-full font-azarMehr">
            <BreadCrumb params={layoutParams} />

            <div className="grid-container gap-x-7 bg-white dark:bg-gray-1 rounded-[20px] p-5 3xl:p-[30px] relative">
              <LevelHeader
                levelTitle={levelTitle}
                tabTitles={tabTitles}
                actionLabel={findByUniqueId(mainData, 392)}
              />

              <div className="grid-second overflow-hidden mb-5 self-start w-full md:min-w-[65vw] xl:min-w-[65vw]">
                <TabSelector params={layoutParams} mainData={mainData} />
              </div>

              {children}
            </div>

            <Features mainData={mainData} params={layoutParams} />
          </div>

          <div className="xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1 mt-10">
            <Footer mainData={mainData} params={layoutParams} />
          </div>
        </div>
      </main>
    </div>
  );
}