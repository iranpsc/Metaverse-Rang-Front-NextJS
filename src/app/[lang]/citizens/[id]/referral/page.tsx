import SideBar from "@/components/module/sidebar/SideBar";
import BreadCrumb from "@/components/shared/BreadCrumb";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getFooterData,
} from "@/components/utils/actions";
import { staticMenuToShow as MenuStaticData } from "@/components/utils/constants";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import InviteBox from "./components/invite-box";
import Image from "next/image";

import "./style/style.css";
import InviteList from "./components/invite-list";
// import "./style/output.css";

export default async function CitizenRefferal({ params }: { params: any }) {
  // THEME
  const defaultTheme = useServerDarkMode();
  const [langData] = await Promise.all([
    // getUserData(params.id),
    getTranslation(params.lang),
  ]);

  const [mainData, langArray, footerTabs] = await Promise.all([
    getMainFile(langData),
    getLangArray(),
    getFooterData(params),
  ]);
  const centralPageModal = await findByModalName(
    mainData,
    "Citizenship-profile"
  );
  const tabsMenu = await findByTabName(centralPageModal, "menu");

  const staticMenuToShow = MenuStaticData;

  // add staticMenuToShow values to siblings tabsMenu values
  tabsMenu.forEach((tab: any) => {
    let findInStatic = staticMenuToShow.find(
      (val: any) => tab.name == val.name
    );
    if (findInStatic) {
      tab.url = findInStatic.url;
      tab.order = findInStatic.order;
      tab.toShow = true;
    }
  });
  const positions: [number, number, number][] = [
    [-5, 0, 24],
    [-3, -3, 12],
    [-5, -5, 10],
    [-3, 5, 8],
  ];
  return (
    <>
      <div className="flex h-screen overflow-hidden" dir={langData.direction}>
        <SideBar
          tabsMenu={tabsMenu}
          langData={langData}
          langArray={langArray}
          defaultTheme={defaultTheme}
          params={params}
          pageSide="citizen"
        />
        <section
          className={`overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20`}
        >
          {/* Breadcrumb */}
          <div className="px-12">
            <BreadCrumb params={params} />
          </div>

          <InviteBox />
          <InviteList />

          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <DynamicFooter footerTabs={footerTabs} />
          </div>
        </section>
      </div>
    </>
  );
}
