//"use client";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getAllCitizen,
  getFooterData,
  getLangArray,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import SideBar from "@/components/module/sidebar/SideBar";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import { staticMenuToShow as MenuStaticData } from "@/components/utils/constants";
import VersionBox from "./components/versionBox";
import DescriptionBox from "./components/descriptionBox";
export default async function CitizensPage({ params }: { params: any }) {
  const [footerTabs, langData, langArray] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);

  const mainData = await getMainFile(langData);
  const defaultTheme = useServerDarkMode();

  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = MenuStaticData;
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

          {/* PLZ code here without container */}
          <div className="mainContainer w-full  lg:h-auto dark:bg-black flex flex-col  gap-[10px] lg:flex-row lg:items-start lg:justify-between">
            <div className="centerItem w-[100%] h-[90%] lg:px-7">
              <div className="self-start justify-between flex pt-8 w-full h-full gap-8">
                {/*sssssssssssssssssssss*/}
                <div
                  className="searchAndVersionHistory w-full mx-[20px] self-start flex flex-col items-center lg:w-[35%] lg:min-w-[350px] lg:h-full lg:flex-shrink-0 lg:rounded-[20px]"
                >
                  <VersionBox />
                </div>

                <DescriptionBox />
              </div>
            </div>
          </div>
          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <DynamicFooter footerTabs={footerTabs} />
          </div>
        </section>
      </div>
    </>
  );
}
