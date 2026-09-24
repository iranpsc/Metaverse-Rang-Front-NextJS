import SideBar from "@/components/shared/sidebar/SideBar";
import {
  getTranslation,
  getMainFile,
  getLangArray,
} from "@/components/utils/actions";
import { buildSidebarLabels } from "@/components/utils/buildShellTranslations";
import { buildLevelTabsMenu } from "@/components/utils/buildTabsMenu";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
export default async function CitizensLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  try {
    // ✅ دقیقاً مثل بقیه صفحات
    const resolvedParams = await params;
    const { lang } = resolvedParams;

    const [langData, langArray] = await Promise.all([
      getTranslation(lang),
      getLangArray(),
    ]);

    const mainData = await getMainFile(langData);

    const tabsMenu = buildLevelTabsMenu(mainData);
    const sidebarLabels = buildSidebarLabels(mainData);

    return (
<div className="flex w-full h-screen overflow-hidden bg-bg-primary">
        <main className="flex  !w-full h-screen light-scrollbar dark:dark-scrollbar" dir={langData.direction}>
        <SideBar
          pageSide="level"
          langArray={langArray}
          langData={langData}
          tabsMenu={tabsMenu}
          params={resolvedParams}
          sidebarLabels={sidebarLabels}
        />

        <div
          dir={langData.direction}
          className="light-scrollbar dark:dark-scrollbar w-full h-[calc(100vh-60px)] lg:h-screen overflow-y-auto relative mt-[60px] lg:mt-0"
        >
          {children}
          <CleanAutoRetryParam />
        </div>
      </main>
</div>
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

    console.error("❌ Error in CitizensLayout:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}