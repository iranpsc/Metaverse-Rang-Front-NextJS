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
import { getTransletion, getMainFile } from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import useServerDarkMode from "src/hooks/use-server-dark-mode";

export default async function LangPage({
  params,
}: {
  params: { lang: "en" | "fa" };
}) {
  //

  //
  const langData = await getTransletion(params.lang);
  const mainData = await getMainFile(langData);
  const defaultTheme = useServerDarkMode();

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
        (modal: any) => modal.name === "footer-menu"
      ).tabs;

      const footerTabs = footerData.find(
        (item: any) => item.name === "our-systems"
      ).fields;

      return footerTabs;
    } catch (error) {}
  }
  const footerTabs = await fetchData();

  return (
    // <>
    <div className="flex" dir={langData.direction}>
      <SideBar
        languageSelected={params.lang}
        langData={langData}
        mainData={mainData}
        defaultTheme={defaultTheme}
        params={params}
      />
      <section
        // id={`${
        //   themeDataActive == "dark" ? "dark-scrollbar" : "light-scrollbar"
        // }`}

        className={`h-screen overflow-y-auto relative`}
      >
        <section
          className={`w-full relative flex  flex-col justify-start overflow-x-clip overflow-y-auto items-center bg-[#f8f8f8] dark:bg-[#2F2D28] bg-opacity20 `}
        >
          <div className="relative w-full xl:min-h-screen xs:min-h-max grid grid-cols-12  bg-[#2F2D28]">
            <HeaderFirstPage />

            <div className="w-full xl:h-[230px] xs:min-h-fit col-span-12 bg-[#303030]/60 backdrop-blur-md xl:absolute lg:absolute md:relative sm:relative xs:relative bottom-0  order-3 grid grid-cols-12">
              <div
                className="xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 flex flex-col justify-start items-start gap-4 mt-10 ps-32
                    lg:ps-32 md:ps-0 sm:ps-0 xs:ps-0
                    "
              >
                <Frame1 className="size-[36px]" />
                <h5 className="text-white font-bold text-[18px] font-azarMehr">
                  مسابقات متفاوت
                </h5>
                <p className="w-full   text-justify   text-white font-azarMehr font-medium ">
                  با استفاده از فناوری‌های پیشرفته واقعیت مجازی و افزوده،
                  می‌توانید با دیگران در دنیای متافرم به گفتگو بپردازید، محیط را
                  کاوش کنید و تجربه‌های نزدیک به واقعیت را در دستان داشته باشید
                </p>
              </div>

              <div
                className="xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 flex flex-col justify-start items-start gap-4 mt-10 xl:ps-32
                    lg:ps-32 md:ps-0 sm:ps-0 xs:ps-0
                    "
              >
                <Frame2 className="size-[36px]" />
                <h5 className="text-white font-bold text-[18px] font-azarMehr">
                  تعاملات واقعی
                </h5>
                <p className="w-full   text-justify   text-white font-azarMehr font-medium ">
                  با استفاده از فناوری‌های پیشرفته واقعیت مجازی و افزوده،
                  می‌توانید با دیگران در دنیای متافرم به گفتگو بپردازید، محیط را
                  کاوش کنید و تجربه‌های نزدیک به واقعیت را در دستان داشته باشید
                </p>
              </div>
            </div>
          </div>

          <div className="w-full relative h-fit ">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center filter blur-sm "></div>
            <SectionTimer />
          </div>

          <div className="relative w-full h-fit grid grid-cols-12  mt-36 ">
            <div className="absolute bg-dark-yellow/10 z-0 size-[250px] start-[0px] bottom-[0px] rounded-xl blur-3xl filter"></div>
            <SectionTeam />
          </div>

          <div className="w-[90%] h-fit mt-[300px]">
            <TopCitizen />
          </div>

          <div className="w-[90%] h-fit mt-[300px]">
            <LastNews />
          </div>

          <div className="relative w-[100%] h-fit  mt-[300px] flex items-center justify-center">
            <Image
              src={`/firstpage/circle.png`}
              alt="/firstpage/img2.jpg"
              width={1000}
              height={1000}
              className=" w-fit h-[850px] absolute z-0 top-0 end-0"
            />
            <Section3D />
          </div>

          <div className="w-[100%] h-fit mt-[300px]">
            <TopTrainersFirstPage />
          </div>

          <div className="w-[90%] h-fit mt-[300px]">
            <EducationFirstPage />
          </div>

          <div className="w-[90%] h-fit mt-[300px]">
            <LastContent />
          </div>

          <div className="relative w-[90%] h-fit mt-[300px]">
            <div className="absolute bg-dark-yellow/10 z-0 size-[250px] end-[0px] top-[-30px] rounded-xl blur-2xl filter"></div>
            <DetailsEducationSection />
          </div>

          <div className="relative w-[90%] h-fit mt-[300px]">
            <div className="absolute bg-dark-white/10 z-0 size-[250px] start-[0px] top-[0px] rounded-xl blur-2xl filter"></div>
            <VersionSection />
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
