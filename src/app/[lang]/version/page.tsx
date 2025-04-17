import DynamicFooter from "@/components/module/footer/DynamicFooter";
import Footer from "@/components/module/footer/Footer";
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getAllCitizen,
  getFooterData,
  getLangArray,
} from "@/components/utils/actions";
import Version from "./components/version";
import BreadCrumb from "@/components/shared/BreadCrumb";
import SideBar from "@/components/module/sidebar/SideBar";
import { getStaticMenu } from "@/components/utils/constants";


export default async function VersionPage({ params }: { params: any }) {
  const [footerTabs, langData, langArray] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);

  const mainData = await getMainFile(langData);

  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = getStaticMenu(params.id);
  // add staticMenuToShow values to siblings tabsMenu values
  const updatedTabsMenu = tabsMenu.map((tab: any) => {
    let findInStatic = staticMenuToShow.find(
      (val) => tab.unique_id === val.unique_id
    );

    if (findInStatic) {
      // Return a new tab object with updated properties
      return {
        ...tab, // Spread the original tab properties
        url: findInStatic.url,
        order: findInStatic.order,
        toShow: true,
      };
    }

    // If no match found, return the original tab
    return tab;
  });
  let versions: any = [];
  try {
    const response = await fetch(
      "https://api.rgb.irpsc.com/api/calendar?type=version&page=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`خطا در دریافت اطلاعات: ${response.statusText}`);
    }

    const data = await response.json();
    interface VersionItem {
      id: number;
      title: string;
      description: string;
      starts_at: string;
      version_title: string;
    }
    
    versions = Array.isArray(data.data)
    ? data.data.map((item: VersionItem, index: number) => ({
        id: item.id,
        title: item.title,
        description: item.description.trim(),

        date: item.starts_at.split(" ")[0], 
        version: item.version_title, 
        customName: `نسخه ${index + 1}`, 

      }))
    : [];
  

  } catch (error) {
    console.error("خطا در دریافت داده از API:", error);
    versions = []; 
  }
  return (
    <>
      <div className="flex h-screen overflow-hidden" dir={langData.direction}>
        <SideBar
          tabsMenu={updatedTabsMenu}
          langData={langData}
          langArray={langArray}
          params={params}
          pageSide="citizen"
        />
        <section
          className={`w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20`}
        >
          {/* Breadcrumb */}
          <div className="px-12">
            <BreadCrumb params={params} />
          </div>

          {/* PLZ code here without container */}
          <div className="mainContainer w-full lg:h-auto dark:bg-black flex flex-col gap-[10px] lg:flex-row lg:items-start lg:justify-between">
            <div className="centerItem w-[100%] h-[90%] lg:px-7">
              <div className="self-center justify-between flex pt-8 w-full h-full gap-8">
                <Version versions={versions} params={params} mainData={mainData} />
              </div>
            </div>
          </div>
          <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            {/* <DynamicFooter footerTabs={footerTabs} mainData={mainData} /> */}
            <Footer footerTabs={footerTabs} mainData={mainData} />
          </div>
        </section>
      </div>
    </>
  );
}
