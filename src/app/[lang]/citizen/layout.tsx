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
  const staticMenuToShow = [
    { name: "home", url: "", order: "-1" },
    { name: "citizens", url: "/citizen", order: "-1" },
    // { name: "list of levels", url: "/levels/citizen", order: "-1" },
    { name: "property", url: "" },
    { name: "real estate", url: "" },
    { name: "structures", url: "" },
    { name: "belongings", url: "" },
    { name: "permissions", url: "" },
    { name: "invitations", url: "" },
    { name: "transaction", url: "" },
    { name: "reward", url: "" },
    { name: "dynasty", url: "" },
    { name: "connections", url: "" },
    { name: "crimes", url: "" },
    { name: "news", url: "" },
    { name: "articles", url: "" },
    { name: "trainings", url: "" },
    { name: "about", url: "" },
    { name: "contact", url: "" },
    { name: "version", url: "" },
    { name: "calendar", url: "" },
    { name: "overview", url: "" },
  ];

  // add staticMenuToShow values to siblings tabsMenu values
  tabsMenu.forEach((tab: any) => {
    let findInStatic = staticMenuToShow.find((val) => tab.name == val.name);
    if (findInStatic) {
      tab.url = findInStatic.url;
      tab.order = findInStatic.order;
      tab.toShow = true;
    }
  });

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
