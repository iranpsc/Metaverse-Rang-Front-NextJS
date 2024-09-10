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
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getAllVersions
} from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import useServerDarkMode from "src/hooks/use-server-dark-mode";

export default async function LangPage({params}) {

  const langArray = await getLangArray();
  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const defaultTheme = await useServerDarkMode();
  const allVersionList = await getAllVersions();

  const Citizenship = await findByModalName(mainData, "Citizenship-profile");
  const citizenListArrayContent = await findByTabName(
    Citizenship,
    "list-citizen"
  );

  const levelModals = await findByModalName(mainData, "levels");
  const levelListArrayContent = await findByTabName(levelModals, "level-list");

  const centralPageModal = await findByModalName(mainData, "central-page");
  const firstPageArrayContent = await findByTabName(centralPageModal, "first-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = [
    {name:'home', url:`/`, order:'-1'},
    {name:'citizens', url:'/citizen', order:'-1'},
    // {name:'list of levels', url:'/levels/citizen', order:'-1'},
    {name:'property', url:''},
    {name:'real estate', url:''},
    {name:'structures', url:''},
    {name:'belongings', url:''},
    {name:'permissions', url:''},
    {name:'invitations', url:''},
    {name:'transaction', url:''},
    {name:'reward', url:''},
    {name:'dynasty', url:''},
    {name:'connections', url:''},
    {name:'crimes', url:''},
    {name:'news', url:''},
    {name:'articles', url:''},
    {name:'trainings', url:''},
    {name:'about', url:''},
    {name:'contact', url:''},
    {name:'version', url:''},
    {name:'calendar', url:''},
    {name:'overview', url:''},
  ]

  // add staticMenuToShow values to siblings tabsMenu values
  tabsMenu.forEach((tab) => {
    let findInStatic = staticMenuToShow.find(val => tab.name == val.name)

    if(findInStatic){
      tab.url = findInStatic.url
      tab.order = findInStatic.order
      tab.toShow = true
    }
  })


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
        className={`overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-[#2F2D28] bg-opacity20`}
      >
        <section className="flex flex-col h-fit tall0:min-h-[600px] min-h-[calc(100vh-60px)] lg:h-screen relative">

        {/* lazy loaded video which have poster (shown before loading) */}
        <video
          src='/firstpage/3d_rgb.irpsc.mp4'
          poster="/firstpage/replaced_pic.png"
          autoPlay
          muted
          loop
          playsInline
          loading="lazy"
          className="absolute w-full h-full ltr:rotate-y-180 object-cover object-[-115px] sm:object-left"
        />
          <div
            className="w-full h-full flex flex-col-reverse lg:flex-row px-5 lg:ps-[32px] lg:pe-0 z-[1]"
          >
            <HeaderFirstPage firstPageArrayContent={firstPageArrayContent} params={params} />
          </div>
          <div
            className="w-full max-h-[40vh] overflow-y-auto light-scrollbar dark:dark-scrollbar tall0:max-h-[50vh] lg:max-h-[35vh] flex flex-col lg:flex-row gap-4 xl:gap-10 absolute bottom-0 xl:pe-32 lg:pe-32 xs:pe-5 xl:ps-32 lg:ps-32 md:ps-5 sm:ps-5 xs:ps-5 bg-[#151515] bg-opacity-40 py-3 z-[1] mt-4"
          >
            <div
              className="lg:w-1/2 flex flex-col justify-start items-start gap-4"
            >
              <div className="flex items-center">
                <Frame1 className="size-[36px]" />
                <h5 className="text-white font-bold text-[16px] 2xl:text-[24px] 3xl:text-[28px] ps-2 font-azarMehr">
                  {localFind("different competitions")}
                </h5>
              </div>
              <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
                {localFind(
                  "metaverse rang invites you to an exciting world of competition"
                )}
              </p>
            </div>

            <div
              className="lg:w-1/2 xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 flex flex-col justify-start items-start gap-4 mt-10 md:mt-0"
            >
              <div className="flex items-center">
                <Frame2 className="size-[36px]" />
                <h5 className="text-white font-bold text-[16px] 2xl:text-[24px] 3xl:text-[28px] ps-2 font-azarMehr">
                  {localFind("real interactions")}
                </h5>
              </div>
              <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
                {localFind(
                  "metaverse rang invites you to an exciting world of real interactions"
                )}
              </p>
            </div>
          </div>
        </section>

        <section
          className={`w-full relative flex  flex-col justify-start overflow-x-clip overflow-y-auto items-center 
            xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1`}
        >
          <div className="w-full relative lg:h-[350px] 2xl:h-[400px] mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            {/* <div className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center filter blur-sm "></div> */}
            <SectionTimer firstPageArrayContent={firstPageArrayContent} />
          </div>

          <div className="relative w-[90%] h-fit grid grid-cols-12 mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            {/* <div className="absolute bg-dark-yellow/10 z-0 size-[250px] start-[0px] bottom-[0px] rounded-xl blur-3xl filter"></div> */}
            <SectionTeam firstPageArrayContent={firstPageArrayContent} />
          </div>

          <div className="w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <TopCitizen
            firstPageArrayContent={firstPageArrayContent}
            params={params}
            citizenListArrayContent={citizenListArrayContent}
            levelListArrayContent={levelListArrayContent}
            />
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
              citizenListArrayContent={citizenListArrayContent}
              levelListArrayContent={levelListArrayContent}
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
            <VersionSection firstPageArrayContent={firstPageArrayContent} allVersionList={allVersionList} />
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
