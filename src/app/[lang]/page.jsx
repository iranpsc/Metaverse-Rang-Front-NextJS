import { Discord, Frame1, Frame2 } from "@/components/svgs";
import HeaderFirstPage from "@/components/templates/firstpage/HeaderFirstPage";
import SectionTimer from "@/components/templates/firstpage/SectionTimer";
import SectionTeam from "@/components/templates/firstpage/TeamSection";
import TopCitizen from "@/components/templates/firstpage/TopCitizen";
import LastNews from "@/components/templates/firstpage/LastNews";
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
  findByTabName,
  getLangArray
} from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import useServerDarkMode from "src/hooks/use-server-dark-mode";

export default async function LangPage({params}) {

  const langArray = await getLangArray();
  const langData = await getTransletion(params.lang);
  const mainData = await getMainFile(langData);
  const defaultTheme = useServerDarkMode();

  const centralPageModal = await findByModalName(mainData, "central-page");
  const firstPageArrayContent = await findByTabName(centralPageModal, "first-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

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
    <div className="flex h-screen" dir={langData.direction}>
      <SideBar
        tabsMenu={tabsMenu}
        langData={langData}
        langArray={langArray}
        defaultTheme={defaultTheme}
        params={params}
        pageSide="citizen"
      />
      <section
        // id={`${defaultTheme == "dark" ? "dark-scrollbar" : "light-scrollbar"}`}
        className={`overflow-y-auto relative no-scrollbar bg-[#2F2D28]`}
      >
        <section className="flex flex-col h-fit lg:h-screen relative">
          <div
            className="w-full h-full flex flex-col-reverse lg:flex-row px-5 lg:ps-[32px] lg:pe-0 bg-[#2F2D28] "
          >
            <HeaderFirstPage firstPageArrayContent={firstPageArrayContent} />
          </div>
          <div
            className="w-full flex flex-col lg:flex-row gap-4 lg:gap-10 lg:absolute bottom-0 xl:pe-32 lg:pe-32 md:pe-5 sm:pe-5 xs:pe-5 xl:ps-32 lg:ps-32 md:ps-5 sm:ps-5 xs:ps-5 bg-[#151515] bg-opacity-40 py-3 xl:py-6 2xl:py-10 z-[1]"
          >
            <div
              className="lg:w-1/2 flex flex-col justify-start items-start gap-4"
            >
              <Frame1 className="size-[36px]" />
              <h5 className="text-white font-bold text-[18px] 3xl:text-[28px] font-azarMehr">
                {localFind("different competitions")}
              </h5>
              <p className="w-full  text-justify text-[16px] 3xl:text-[22px] text-white font-azarMehr font-medium ">
                {localFind(
                  "metaverse rang invites you to an exciting world of competition"
                )}
              </p>
            </div>

            <div
              className="lg:w-1/2 xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 flex flex-col justify-start items-start gap-4 mt-10 md:mt-0"
            >
              <Frame2 className="size-[36px]" />
              <h5 className="text-white font-bold text-[18px] 3xl:text-[28px] font-azarMehr">
                {localFind("real interactions")}
              </h5>
              <p className="w-full text-justify text-[16px] 3xl:text-[22px] text-white font-azarMehr font-medium ">
                {localFind(
                  "metaverse rang invites you to an exciting world of real interactions"
                )}
              </p>
            </div>
          </div>
        </section>

        <section
          className={`w-full relative flex  flex-col justify-start overflow-x-clip overflow-y-auto items-center bg-[#f8f8f8] dark:bg-[#2F2D28] bg-opacity20 
            xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1`}
        >
          <div className="w-full relative lg:h-[350px] 2xl:h-[400px] mt-10 md:mt-36">
            {/* <div className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center filter blur-sm "></div> */}
            <SectionTimer firstPageArrayContent={firstPageArrayContent} />
          </div>

          <div className="relative w-[90%] h-fit grid grid-cols-12 mt-10 md:mt-36 ">
            {/* <div className="absolute bg-dark-yellow/10 z-0 size-[250px] start-[0px] bottom-[0px] rounded-xl blur-3xl filter"></div> */}
            <SectionTeam firstPageArrayContent={firstPageArrayContent} />
          </div>

          <div className="w-[90%] h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <TopCitizen firstPageArrayContent={firstPageArrayContent} params={params} />
          </div>

          <div className="w-[90%] h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <LastNews firstPageArrayContent={firstPageArrayContent} params={params} />
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

          <div className="w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <TopTrainersFirstPage
              firstPageArrayContent={firstPageArrayContent}
              params={params}
            />
          </div>

          <div className="w-[90%] h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <EducationFirstPage params={params} firstPageArrayContent={firstPageArrayContent} />
          </div>

          <div className="w-[90%] h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <LastContent firstPageArrayContent={firstPageArrayContent} params={params}/>
          </div>

          <div className="w-[90%] relative h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            {/* <div className="absolute bg-dark-yellow/10 z-0 size-[250px] end-[0px] top-[-30px] rounded-xl blur-2xl filter"></div> */}
            <DetailsEducationSection
              firstPageArrayContent={firstPageArrayContent}
            />
          </div>

          <div className="w-[90%] relative h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            {/* <div className="absolute bg-dark-white/10 z-0 size-[250px] start-[0px] top-[0px] rounded-xl blur-2xl filter"></div> */}
            <VersionSection firstPageArrayContent={firstPageArrayContent} />
          </div>

          <div className="flex flex-col justify-center items-center">
            <DynamicFooter footerTabs={footerTabs} />
          </div>
        </section>
      </section>
      <a href="https://discord.gg/sW6XCY96hh" className="fixed rtl:left-[20px] ltr:right-[20px] bottom-[20px] z-[2]">
      <Discord className="size-[50px] " /></a>
      
    </div>
    // </>
  );
}
