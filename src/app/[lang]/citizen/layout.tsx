import SideBar from "@/components/module/sidebar/SideBar";
import {
  getTransletion,
  getMainFile,
  getLangArray,
  findByModalName,
  findByTabName,
} from "@/components/utils/actions";
import useServerDarkMode from "src/hooks/use-server-dark-mode";

export default async function CitizensLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: "en" | "fa" };
}) {
  const defaultTheme = useServerDarkMode();

  //
  const langData = await getTransletion(params.lang);
  const mainData = await getMainFile(langData);
  const langArray = await getLangArray();
  const citizenProfileModals = await findByModalName(
    mainData,
    "Citizenship-profile"
  );
  const tabsMenu = await findByTabName(citizenProfileModals, "menu");

  return (
    <main className="flex h-screen dark:bg-black" dir={langData.direction}>
      <SideBar
        tabsMenu={tabsMenu}
        langData={langData}
        langArray={langArray}
        defaultTheme={defaultTheme}
        params={params}
        pageSide="citizen"
      />
      <div
        className={`overflow-y-auto relative light-scrollbar dark:dark-scrollbar xs:pt-14 sm:pt-14 lg:pt-[0] w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1`}
      >
        {children}
      </div>
    </main>
  );
}
