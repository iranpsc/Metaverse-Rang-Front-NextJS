import SideBar from "@/components/shared/sidebar/SideBar";
import {
  getTranslation,
  getMainFile,
  getLangArray,
  findByTabName,
  findByModalName,
} from "@/components/utils/actions";
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

    const [levelsModal, citizenModal] = await Promise.all([
      findByModalName(mainData, "levels"),
      findByModalName(mainData, "Citizenship-profile"),
    ]);

    const [activetabsMenu, tabsMenu1] = await Promise.all([
      findByTabName(levelsModal, "levels-menu"),
      findByTabName(citizenModal, "menu"),
    ]);

    // مثل قبل، فقط menuItem اضافه می‌کنیم
    const tabsMenu = (activetabsMenu || []).map((item: any) => ({
      ...item,
      menuItem: true,
    }));

    // همون منطق قبلی، بدون تغییر
    tabsMenu.push(tabsMenu1?.find((item: any) => item.name === "meta rgb"));
    tabsMenu.push(
      tabsMenu1?.find((item: any) => item.name === "metaverse rang")
    );

    return (
<div className="flex w-full h-screen overflow-hidden">
        <main className="flex dark:bg-black !w-full h-screen light-scrollbar dark:dark-scrollbar" dir={langData.direction}>
        <SideBar
          pageSide="level"
          langArray={langArray}
          langData={langData}
          tabsMenu={tabsMenu.filter(Boolean)} // جلوگیری از undefined
          params={resolvedParams}
          mainData={mainData}
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