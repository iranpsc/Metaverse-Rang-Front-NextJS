import SideBar from "@/components/module/sidebar/SideBar";
import {
  getTranslation,
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
  params: any;
}) {
  const defaultTheme = useServerDarkMode();

  //
  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const langArray = await getLangArray();
  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");
  const citizenshipProfileModal = await findByModalName(
    mainData,
    "Citizenship-profile"
  );
  // const tabsMenu = await findByTabName(citizenshipProfileModal, "menu");

  const staticMenuToShow = [
    { name: "home", url: ``, order: "-1" },
    { name: "citizens", url: "citizens", order: "-1" },
    { name: "list of levels", url: "levels/citizen", order: "-1" },
    { name: "property" },
    { name: "real estate" },
    { name: "structures" },
    { name: "belongings" },
    { name: "permissions" },
    { name: "invitations" },
    { name: "transaction" },
    { name: "reward" },
    { name: "dynasty" },
    { name: "connections" },
    { name: "crimes" },
    { name: "news" },
    { name: "articles" },
    { name: "trainings" },
    { name: "about" },
    { name: "contact" },
    { name: "version" },
    { name: "calendar" },
    { name: "overview" },
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
        className={`overflow-y-auto relative light-scrollbar dark:dark-scrollbar w-full xs:px-1 mt-[60px] lg:mt-0`}
      >
        {children}
      </div>
    </main>
  );
}
