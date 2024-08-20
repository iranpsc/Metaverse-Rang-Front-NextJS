import { Frame1, Frame2 } from "@/components/svgs";
import HeaderFirstPage from "@/components/templates/firstpage/HeaderFirstPage";
import SectionTimer from "@/components/templates/firstpage/SectionTimer";
import SectionTeam from "@/components/templates/firstpage/TeamSection";
import TopCitizen from "@/components/templates/firstpage/TopCitizen";
import LastNews from "@/components/templates/firstpage/LastNews";
import Image from "next/image";
import Section3D from "@/components/templates/firstpage/Section3D";
import TopTrainersFirstPage from "@/components/templates/firstpage/TopTrainersFirstPage";
import EducationFirstPage from "@/components/templates/firstpage/EducationFirstPage";
import LastContent from "@/components/templates/firstpage/LastContent";
import DetailsEducationSection from "@/components/templates/firstpage/DetailsEducationSection";
import VersionSection from "@/components/templates/firstpage/VersionSection";
import SideBar from "@/components/module/sidebar/SideBar";
import {
  getTransletion,
  getMainFile,
  findByModalName,
} from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import useServerDarkMode from "src/hooks/use-server-dark-mode";

export default async function LangPage({params}) {
  //

  //
  const langData = await getTransletion(params.lang);
  const mainData = await getMainFile(langData);
  const defaultTheme = useServerDarkMode();

  const modalsProfile = mainData.modals.find(
    (modal) => modal.name === "Citizenship-profile"
  ).tabs;
  const tabsMenu = modalsProfile.find(
    (item) => item.name === "menu"
  ).fields;

  // find specific modal
  const centralPageModal = await findByModalName(mainData, "central-page");

  // find inside modal and return its fields(result is array)
  const firstPageArrayContent = centralPageModal.find(
    (item) => item.name === "first-page"
  ).fields;

  // to find in an array with key(_name)
  function localFind(_name) {
    return firstPageArrayContent.find((item) => item.name == _name)
      .translation;
  }

  async function fetchData() {
    let languageSelectedUrl = "";
    let nameSite = "";
    let localSite = "fa_IR";
    try {
      if (params.lang === "en") {
        localSite = "en-US";
        nameSite = "Metaverse Rgb";
        languageSelectedUrl = "https://rgb.irpsc.com/lang/en.json";
      } else {
        nameSite = "متاورس رنگ";
        localSite = "fa_IR";
        languageSelectedUrl = "https://rgb.irpsc.com/lang/fa.json";
      }
      const res = await fetch(languageSelectedUrl);
      const resJson = await res.json();
      const footerData = resJson.modals.find(
        (modal) => modal.name === "footer-menu"
      ).tabs;

      const footerTabs = footerData.find(
        (item) => item.name === "our-systems"
      ).fields;

      return footerTabs;
    } catch (error) {}
  }
  const footerTabs = await fetchData();

  return (
    // <>
    <div className="flex border-4" dir={langData.direction}>
      <SideBar
        languageSelected={params.lang}
        langData={langData}
        mainData={tabsMenu}
        defaultTheme={defaultTheme}
        params={params}
        pageSide="citizen"
      />
      <section
        // id={`${defaultTheme == "dark" ? "dark-scrollbar" : "light-scrollbar"}`}
        className={`h-screen overflow-y-auto relative no-scrollbar bg-[#2F2D28]`}
      >
        <section className="flex flex-col">
          <div
            className="relative w-full xs:min-h-max grid grid-cols-12 
             md:pe-0 sm:pe-5 xs:pe-5
            xl:ps-32 lg:ps-32 md:ps-5 sm:ps-5 xs:ps-5  bg-[#2F2D28] "
          >
            <HeaderFirstPage firstPageArrayContent={firstPageArrayContent} />
          </div>
          <div
            className="w-full  xs:min-h-fit col-span-12 md:mt-[-200px] 2xl:mt-[-200px] 4xl:mt-[-300px]
            xl:pe-32 lg:pe-32 md:pe-5 sm:pe-5 xs:pe-5
            xl:ps-32 lg:ps-32 md:ps-5 sm:ps-5 xs:ps-5 
            bg-[#151515] bg-opacity-40   py-10 grid grid-cols-12 z-[1]"
          >
            <div
              className="xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 flex flex-col justify-start items-start gap-4  ps-32
                    lg:ps-32 md:ps-0 sm:ps-0 xs:ps-0
                    "
            >
              <Frame1 className="size-[36px]" />
              <h5 className="text-white font-bold text-[18px] font-azarMehr">
                {localFind("different competitions")}
              </h5>
              <p className="w-full  text-justify   text-white font-azarMehr font-medium ">
                {localFind(
                  "metaverse rang invites you to an exciting world of competition"
                )}
              </p>
            </div>

            <div
              className="xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 flex flex-col justify-start items-start gap-4 mt-10 md:mt-0 xl:ps-32
                    lg:ps-32 md:ps-0 sm:ps-0 xs:ps-0
                    "
            >
              <Frame2 className="size-[36px]" />
              <h5 className="text-white font-bold text-[18px] font-azarMehr">
                {localFind("real interactions")}
              </h5>
              <p className="w-full   text-justify   text-white font-azarMehr font-medium ">
                {localFind(
                  "metaverse rang invites you to an exciting world of real interactions"
                )}
              </p>
            </div>
          </div>
        </section>
        <section
          className={`w-full relative flex  flex-col justify-start overflow-x-clip overflow-y-auto items-center bg-[#f8f8f8] dark:bg-[#2F2D28] bg-opacity20 
            xl:pe-32 lg:pe-32 md:pe-5 sm:pe-5 xs:pe-5
            xl:ps-32 lg:ps-32 md:ps-5 sm:ps-5 xs:ps-5`}
        >
          <div className="w-full relative h-fit mt-10 md:mt-36">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center filter blur-sm "></div>
            <SectionTimer firstPageArrayContent={firstPageArrayContent} />
          </div>

          <div className="relative w-[90%] h-fit grid grid-cols-12 mt-10 md:mt-36 ">
            <div className="absolute bg-dark-yellow/10 z-0 size-[250px] start-[0px] bottom-[0px] rounded-xl blur-3xl filter"></div>
            <SectionTeam firstPageArrayContent={firstPageArrayContent} />
          </div>

          <div className="w-[90%] h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <TopCitizen firstPageArrayContent={firstPageArrayContent} />
          </div>

          <div className="w-[90%] h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <LastNews firstPageArrayContent={firstPageArrayContent} />
          </div>

          <div className="relative w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px] flex items-center justify-center">
            {/* <Image
              src={`/firstpage/circle.png`}
              alt="/firstpage/img2.jpg"
              width={1000}
              height={1000}
              className=" w-fit h-[850px] absolute z-[1000] top-[50%] start-[50%] translate-x-1/2 translate-y-1/2"
            /> */}
            <Section3D />
          </div>

          <div className="w-[90%] h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <TopTrainersFirstPage
              firstPageArrayContent={firstPageArrayContent}
              params={params}
            />
          </div>

          <div className="w-[90%] h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <EducationFirstPage firstPageArrayContent={firstPageArrayContent} />
          </div>

          <div className="w-[90%] h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <LastContent firstPageArrayContent={firstPageArrayContent} />
          </div>

          <div className="w-[90%] relative h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <div className="absolute bg-dark-yellow/10 z-0 size-[250px] end-[0px] top-[-30px] rounded-xl blur-2xl filter"></div>
            <DetailsEducationSection
              firstPageArrayContent={firstPageArrayContent}
            />
          </div>

          <div className="w-[90%] relative h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <div className="absolute bg-dark-white/10 z-0 size-[250px] start-[0px] top-[0px] rounded-xl blur-2xl filter"></div>
            <VersionSection firstPageArrayContent={firstPageArrayContent} />
          </div>

          <div className="flex flex-col justify-center items-center">
            <DynamicFooter footerTabs={footerTabs} />
          </div>
        </section>
      </section>
    </div>
    // </>
  );
}
