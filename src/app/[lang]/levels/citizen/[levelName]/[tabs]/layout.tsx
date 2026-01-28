// import dynamic from "next/dynamic";
// const SideBar = dynamic(() => import("@/components/module/sidebar/SideBar"), {
//   ssr: false, // Load on the client side
//   loading: () => (
//     <div className="text-center text-[20px]">Loading SideBar...</div>
//   ),
// });
import SideBar from "@/components/module/sidebar/SideBar";
import {
  getTranslation,
  getMainFile,
  getLangArray,
  findByTabName,
  findByModalName,
} from "@/components/utils/actions";
import CustomErrorPage from "@/components/shared/CustomErrorPage";

export default async function CitizensLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  try {
  const [langData, langArray] = await Promise.all([
    getTranslation(params.lang),
    getLangArray(),
  ]);

  const mainData = await getMainFile(langData);

  const [levels, modalsProfile] = await Promise.all([
    findByModalName(mainData, "levels"),
    findByModalName(mainData, "Citizenship-profile"),
  ]);

  // const activetabsMenu = await findByTabName(levels, "levels-menu");
  // const tabsMenu1 = await findByTabName(modalsProfile, "menu");

  const [activetabsMenu, tabsMenu1] = await Promise.all([
    findByTabName(levels, "levels-menu"),
    findByTabName(modalsProfile, "menu"),
  ]);

  const tabsMenu = activetabsMenu.map((x: any) => ({
    ...x,
    menuItem: true,
  }));

  tabsMenu.push(tabsMenu1.find((item: any) => item.name === "meta rgb"));
  tabsMenu.push(tabsMenu1.find((item: any) => item.name === "metaverse rang"));

  return (
    // <Suspense
    //   fallback={<div className="text-center text-[20px]">Loading...2</div>}
    // >
    <main
      className="flex dark:bg-black  !w-full"
      dir={langData.direction}
    >
      <SideBar
        pageSide="level"
        langArray={langArray}
        langData={langData}
        tabsMenu={tabsMenu}
        params={params}
             mainData={mainData}
      />
      <div dir={langData.direction}
        className={`light-scrollbar dark:dark-scrollbar w-full h-[calc(100vh-60px)] lg:h-screen overflow-y-auto relative mt-[60px] lg:mt-0 lg:pt-0 lg:pt-[0] `}
      >
        {children}
      </div>
    </main>
    // </Suspense>
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

  console.error("❌ Error in EductionPage:", serializedError);

  return <CustomErrorPage error={serializedError} />;
} }
