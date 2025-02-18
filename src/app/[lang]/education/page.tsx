import DynamicFooter from "@/components/module/footer/DynamicFooter";
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getAllCategoryVideos,
  getFooterData,
  getLangArray,
  getAllCategories,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import SideBar from "@/components/module/sidebar/SideBar";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import { getStaticMenu } from "@/components/utils/constants";
import SearchComponent from "@/components/shared/SearchComponent";
import TopTrainersFirstPage from "@/components/templates/firstpage/TopTrainersFirstPage";
import EducationCategories from "@/components/templates/education/categories";
import EducationList from "@/components/templates/education/EducationList";

export default async function CitizensPage({ params }: { params: any }) {
  const [footerTabs, langData, langArray] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);

  const allCatVideos = await getAllCategoryVideos("1");

  const mainData = await getMainFile(langData);
  const defaultTheme = useServerDarkMode();

  const categoriesData = await getAllCategories();

  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const Citizenship = await findByModalName(mainData, "Citizenship-profile");
  const citizenListArrayContent = await findByTabName(
    Citizenship,
    "list-citizen"
  );

  const levelModals = await findByModalName(mainData, "levels");
  const levelListArrayContent = await findByTabName(levelModals, "level-list");

  const trainingModal = await findByModalName(mainData, "training");
  // console.log("trainingModal", trainingModal);
  const trainingArrayContent = await findByTabName(
    trainingModal,
    "central-school"
  );
  console.log("trainingArrayContent", trainingArrayContent);

  // to find in an array with key(_name)
  function localFind(_name: any) {
    return trainingArrayContent.find((item: any) => item.name == _name)
      .translation;
  }

  const staticMenuToShow = getStaticMenu(params.id);
  // add staticMenuToShow values to siblings tabsMenu values
  const updatedTabsMenu = tabsMenu.map((tab: any) => {
    let findInStatic = staticMenuToShow.find((val) => tab.name === val.name);

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

  return (
    <>
      <div className="flex h-screen overflow-hidden" dir={langData.direction}>
        <SideBar
          tabsMenu={updatedTabsMenu}
          langData={langData}
          langArray={langArray}
          defaultTheme={defaultTheme}
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

          <h1 className="mt-[70px] text-center  text-gray dark:text-dark-gray font-azarMehr font-bold 2xl:text-[26px] xl:text-[26px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[16px] w-full">
            {localFind("page title")}
          </h1>
          <p className=" 2xl:w-[30%] xl:w-[30%] lg:w-[40%] md:w-[40%] sm:w-[50%] xs:w-[50%] mt-5 font-azarMehr font-normal text-gray dark:text-dark-gray 2xl:text-[14px] xl:text-[14px] lg:text-[13px] md:text-[12px] sm:text-[12px] xs:text-[10px]   text-center">
            {localFind("description")}
          </p>

          <SearchComponent
            searchLevel="education"
            citizenListArrayContent={trainingArrayContent}
            defaultTheme={defaultTheme}
          />

          <div className="w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <TopTrainersFirstPage
              firstPageArrayContent={trainingArrayContent}
              params={params}
              citizenListArrayContent={citizenListArrayContent}
              levelListArrayContent={levelListArrayContent}
            />
          </div>

          <EducationCategories
            categoriesData={categoriesData}
            categoriesTranslateData={trainingArrayContent}
            params={params}
          />

          <EducationList
            allCatVideos={allCatVideos}
            params={params}
            defaultTheme={defaultTheme}
          />

          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <DynamicFooter footerTabs={footerTabs} />
          </div>
        </section>
      </div>
    </>
  );
}
