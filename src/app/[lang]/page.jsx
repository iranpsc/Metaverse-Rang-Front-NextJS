import { Discord, Frame1, Frame2 } from "@/components/svgs";
import React, { Suspense } from 'react';
import { headers } from 'next/headers';

// Lazy load components
const HeaderFirstPage = React.lazy(() => import('@/components/templates/firstpage/HeaderFirstPage'));
const SectionTimer = React.lazy(() => import('@/components/templates/firstpage/SectionTimer'));
const SectionTeam = React.lazy(() => import('@/components/templates/firstpage/TeamSection'));
const TopCitizen = React.lazy(() => import('@/components/templates/firstpage/TopCitizen'));
const LastNews = React.lazy(() => import('@/components/templates/firstpage/LastNews'));
const Section3D = React.lazy(() => import('@/components/templates/firstpage/Section3D'));
const TopTrainersFirstPage = React.lazy(() => import('@/components/templates/firstpage/TopTrainersFirstPage'));
const EducationFirstPage = React.lazy(() => import('@/components/templates/firstpage/EducationFirstPage'));
const LastContent = React.lazy(() => import('@/components/templates/firstpage/LastContent'));
const DetailsEducationSection = React.lazy(() => import('@/components/templates/firstpage/DetailsEducationSection'));
const VersionSection = React.lazy(() => import('@/components/templates/firstpage/VersionSection'));
// const TopVideo = React.lazy(() => import('@/components/templates/firstpage/TopVideo'));
const SideBar = React.lazy(() => import('@/components/module/sidebar/SideBar'));
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getAllVersions
} from "@/components/utils/actions";
const DynamicFooter = React.lazy(() => import("@/components/module/footer/DynamicFooter"  ))
import { getStaticMenu } from "@/components/utils/constants";
import Head from 'next/head';
import { findByUniqueId } from "@/components/utils/findByUniqueId";

// SEO**
export async function generateMetadata({ params }) {
  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const centralPageModal = await findByModalName(mainData, "central-page");
  const firstPageArrayContent = await findByTabName(centralPageModal, "first-page");
  
    //to make description less than 200 character
    async function makeLessCharacter(){
      let temp = findByUniqueId(mainData,482)
      temp = temp.slice(0,200)
      return temp
    }

    


  return {
    title: findByUniqueId(mainData,256),
    description: await makeLessCharacter(),
    openGraph: {
      type: 'website',
      // url: `https://yourwebsite.com/posts/${params.id}`,
      title: findByUniqueId(mainData,256),
      description: await makeLessCharacter(),
      locale: params.lang == 'fa'? 'fa_IR' : 'en_US',
      url: `https://rgb.irpsc.com/${params.lang}`,
      images: [
        {
          url: "https://rgb.irpsc.com/_next/image?url=%2Flogo.png&w=120&q=75",
          width: 800,
          height: 600,
          alt: findByUniqueId(mainData,256),
        },
      ],
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: post.title,
    //   description: post.description,
    //   images: [post.imageUrl],
    // },
  };
}

export default async function LangPage({params}) {
  // if we are in mobile or not
  const headersList = headers();
  const viewportWidth = headersList.get('viewport-width');
  const userAgent = headersList.get('user-agent') || '';

  // Check if it's mobile using viewport width or user agent
  const isMobile = viewportWidth
    ? parseInt(viewportWidth, 10) < 1024
    : /mobile|android|iphone|ipad|phone/i.test(userAgent);

  const [langArray, langData] = await Promise.all([
    getLangArray(),
    getTranslation(params.lang)
  ])
  const mainData = await getMainFile(langData);

  // const allVersionList = await getAllVersions();

  // const Citizenship = await findByModalName(mainData, "Citizenship-profile");
  // const citizenListArrayContent = await findByTabName(
  //   Citizenship,
  //   "list-citizen"
  // );

  // const levelModals = await findByModalName(mainData, "levels");
  // const levelListArrayContent = await findByTabName(levelModals, "level-list");

  const centralPageModal = await findByModalName(mainData, "central-page");
  // const firstPageArrayContent = await findByTabName(centralPageModal, "first-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = getStaticMenu(params.id);

  // add staticMenuToShow values to siblings tabsMenu values
  const updatedTabsMenu = tabsMenu.map((tab) => {
    let findInStatic = staticMenuToShow.find((val) => tab.unique_id === val.unique_id);
    
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


  //to make description less than 200 character
  async function makeLessCharacter(){
    let temp = findByUniqueId(mainData,482)
    temp = temp.slice(0,200)
    return temp
  }

  const landingSchema = {
    "@context": "https://schema.org/",
    "@type": "ProfessionalService",
    "name": `${findByUniqueId(mainData,256)}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "میرداماد، 824H+JG2",
      "addressCountry": "ایران",
      "addressRegion": "استان قزوین",
      "addressLocality": "قزوین"
    },
    "image": 'https://rgb.irpsc.com/logo.png',
    "telephone": "09120820120",
    "url": `https://rgb.irpsc.com/${params.lang}`,
    "logo": `https://rgb.irpsc.com/logo.png`,
    "email": "info@rgb.irpsc.com",
    "description": await makeLessCharacter(),
    "alternateName": "MetaRGB"
  }
  return (
    <>
      <Head>
        {/* Preload poster image for video */}
        <link rel="preload" href="/firstpage/replaced_pic.webp" as="image" />
        <link rel="preload" href="/firstpage/3d_rgb.irpsc.webm" as="video" type="video/mp4" />
      </Head>
      {/* SCHEMA** */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingSchema) }}
      />
      {/* schema END */}

      <div className="flex h-screen overflow-hidden" dir={langData.direction}>
        <Suspense>
          <SideBar
            tabsMenu={updatedTabsMenu}
            langData={langData}
            langArray={langArray}
            params={params}
            pageSide="citizen"
            />
        </Suspense>
        <section
          // id={`${defaultTheme == "dark" ? "dark-scrollbar" : "light-scrollbar"}`}
          className={`overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20`}
        >
          <section className="flex flex-col h-fit tall0:min-h-[600px] min-h-[calc(100vh-60px)] lg:h-screen relative">

          {/* lazy loaded video which have poster (shown before loading) */}
          {/* <TopVideo /> */}
          {/* Desktop */}
          {!isMobile && (
            <video
              poster="/firstpage/replaced_pic.webp"
              autoPlay
              muted
              loop
              playsInline
              className="hidden lg:block absolute w-full h-full ltr:rotate-y-180 object-cover object-[-115px] sm:object-left"
            >
              <source src="/firstpage/3d_rgb.irpsc.webm" type="video/webm" />
              <source src="/firstpage/3d_rgb.irpsc.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            )}
          {/* Mobile */}

          {isMobile && (
            <video
              poster="/firstpage/mobile_replaced_pic.webp"
              autoPlay
              muted
              loop
              playsInline
              className="block lg:hidden absolute w-full h-full ltr:rotate-y-180 object-cover"
            >
              <source src="/firstpage/mobile_3d_rgb.irpsc.webm" type="video/webm" />
              <source src="/firstpage/mobile_3d_rgb.irpsc.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
            <div
              className="w-full h-full flex flex-col-reverse lg:flex-row px-5 lg:ps-[32px] lg:pe-0 z-[1]"
            >
              <Suspense fallback={<div>Loading Header...</div>}>
                <HeaderFirstPage mainData={mainData} params={params} />
              </Suspense>
            </div>
            {/* MD to larg shown-1 */}
            <div
              className="w-full max-h-[40vh] overflow-y-auto light-scrollbar dark:dark-scrollbar tall0:max-h-[50vh] lg:max-h-[35vh] hidden lg:flex flex-col lg:flex-row gap-4 xl:gap-10 absolute bottom-0 xl:pe-32 lg:pe-32 xs:pe-5 xl:ps-32 lg:ps-32 md:ps-5 sm:ps-5 xs:ps-5 bg-[#151515] bg-opacity-40 py-3 z-[1] mt-4"
            >
              <div
                className="lg:w-1/2 flex flex-col justify-start items-start gap-4"
              >
                <div className="flex items-center">
                  <Frame1 className="size-[36px]" />
                  <h3 className="text-white font-bold text-[16px] 2xl:text-[24px] 3xl:text-[28px] ps-2 font-azarMehr">
                    {/* {localFind("different competitions")} */}
                    {findByUniqueId(mainData,484)}
                  </h3>
                </div>
                <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
                  {/* {localFind(
                    "metaverse rang invites you to an exciting world of competition"
                  )} */}
                    {findByUniqueId(mainData,485)}

                </p>
              </div>

              <div
                className="lg:w-1/2 xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 flex flex-col justify-start items-start gap-4 mt-10 md:mt-0"
              >
                <div className="flex items-center">
                  <Frame2 className="size-[36px]" />
                  <h3 className="text-white font-bold text-[16px] 2xl:text-[24px] 3xl:text-[28px] ps-2 font-azarMehr">
                    {/* {localFind("real interactions")} */}
                    {findByUniqueId(mainData,486)}
                    {findByUniqueId(mainData,486)}
                  </h3>
                </div>
                <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
                  {/* {localFind(
                    "metaverse rang invites you to an exciting world of real interactions"
                  )} */}
                    {findByUniqueId(mainData,487)}
                </p>
              </div>
            </div>
          </section>
            {/* small to MD shown-1 */}
            <div
              className="w-full overflow-y-auto light-scrollbar dark:dark-scrollbar flex flex-col md:flex-row lg:hidden gap-4 xl:gap-10 px-5 lg:px-32 bg-[#151515] bg-opacity-40 py-3 z-[1] mt-4"
            >
              <div
                className="lg:w-1/2 flex flex-col justify-start items-start gap-4"
              >
                <div className="flex items-center">
                  <Frame1 className="size-[36px]" />
                  <h3 className="text-white font-bold text-[16px] 2xl:text-[24px] 3xl:text-[28px] ps-2 font-azarMehr">
                    {/* {localFind("different competitions")} */}
                    {findByUniqueId(mainData,484)}

                  </h3>
                </div>
                <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
                  {/* {localFind(
                    "metaverse rang invites you to an exciting world of competition"
                  )} */}
                    {findByUniqueId(mainData,485)}

                </p>
              </div>

              <div
                className="lg:w-1/2 xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 flex flex-col justify-start items-start gap-4 mt-10 md:mt-0"
              >
                <div className="flex items-center">
                  <Frame2 className="size-[36px]" />
                  <h3 className="text-white font-bold text-[16px] 2xl:text-[24px] 3xl:text-[28px] ps-2 font-azarMehr">
                    {/* {localFind("real interactions")} */}
                    {findByUniqueId(mainData,486)}

                  </h3>
                </div>
                <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
                  {/* {localFind(
                    "metaverse rang invites you to an exciting world of real interactions"
                  )} */}
                    {findByUniqueId(mainData,487)}

                </p>
              </div>
            </div>
          <section
            className={`w-full relative flex no-scrollbar flex-col justify-start overflow-x-clip overflow-y-auto items-center 
              xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1`}
          >
            <div className="w-full relative lg:h-[350px] 2xl:h-[400px] mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              {/* <div className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center filter blur-sm "></div> */}
              <Suspense fallback={<div>Loading Header...</div>}>
                <SectionTimer />
              </Suspense>
            </div>

            <div className="relative w-full h-fit flex mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <Suspense fallback={<div>Loading Header...</div>}>
              <SectionTeam mainData={mainData} params={params} />
            </Suspense>
            </div>

            <div className="w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <Suspense fallback={<div>Loading Header...</div>}>
                <TopCitizen
                // firstPageArrayContent={firstPageArrayContent}
                params={params}
                mainData={mainData}
                // citizenListArrayContent={citizenListArrayContent}
                // levelListArrayContent={levelListArrayContent}
                />
              </Suspense>
            </div>

            <div className="w-[90%] h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <Suspense fallback={<div>Loading Header...</div>}>
                <LastNews mainData={mainData} params={params} />
              </Suspense>
            </div>

            <div className="relative w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px] flex items-center justify-center">
              <Suspense fallback={<div>Loading Header...</div>}>
                <Section3D params={params} />
              </Suspense>
            </div>

            <div className="w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <TopTrainersFirstPage
                params={params}
                mainData={mainData}
              />
            </div>

            <div className="w-[90%] h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <Suspense fallback={<div>Loading Header...</div>}>
                <EducationFirstPage params={params} mainData={mainData} />
              </Suspense>
            </div>

            <div className="w-[90%] h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <Suspense fallback={<div>Loading Header...</div>}>
                <LastContent mainData={mainData} params={params}/>
              </Suspense>
            </div>

            <div className="w-[90%] relative h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <Suspense fallback={<div>Loading Header...</div>}>
                <DetailsEducationSection
                  mainData={mainData}
                />
              </Suspense>
            </div>

            <div className="w-[90%] relative h-fit  mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              {/*<Suspense fallback={<div>Loading Header...</div>}>
                <VersionSection firstPageArrayContent={firstPageArrayContent} allVersionList={allVersionList} />
              </Suspense>*/}
            </div>

            <div className="flex flex-col justify-center items-center">
              <Suspense fallback={<div>Loading Header...</div>}>
                <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
              </Suspense>
            </div>
          </section>
        </section>
        <a href="https://discord.gg/sW6XCY96hh" aria-label="Join us on Discord" title='Discord' className="fixed rtl:left-[20px] ltr:right-[20px] bottom-[20px] z-[2]">
          <Discord className="size-[50px]" />
        </a>
        
      </div>
    </>
  );
}
