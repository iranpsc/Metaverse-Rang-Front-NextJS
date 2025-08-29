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
const DynamicFooter = React.lazy(() => import("@/components/module/footer/DynamicFooter"))
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
  async function makeLessCharacter() {
    let temp = findByUniqueId(mainData, 482)
    temp = temp.slice(0, 200)
    return temp
  }




  return {
    title: findByUniqueId(mainData, 1457),
    description: await makeLessCharacter(),
    openGraph: {
      type: 'website',
      // url: `https://yourwebsite.com/posts/${params.id}`,
      title: findByUniqueId(mainData, 256),
      description: await makeLessCharacter(),
      locale: params.lang == 'fa' ? 'fa_IR' : 'en_US',
      url: `https://rgb.irpsc.com/${params.lang}`,
      images: [
        {
          url: "https://rgb.irpsc.com/_next/image?url=%2Flogo.png&w=120&q=75",
          width: 800,
          height: 600,
          alt: findByUniqueId(mainData, 1457),
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

export default async function LangPage({ params }) {
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
    } catch (error) { }
  }
  const footerTabs = await fetchData();


  //to make description less than 200 character
  async function makeLessCharacter() {
    let temp = findByUniqueId(mainData, 482)
    temp = temp.slice(0, 200)
    return temp
  }

  const landingSchema = {
    "@context": "https://schema.org/",
    "@type": "ProfessionalService",
    "name": `${findByUniqueId(mainData, 1457)}`,
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
              className="w-full max-h-[40vh] overflow-y-auto light-scrollbar dark:dark-scrollbar tall0:max-h-[50vh] lg:max-h-[35vh] hidden lg:flex flex-col lg:flex-row gap-4 xl:gap-20 absolute bottom-0 xl:pe-32 lg:pe-32 xs:pe-5 xl:ps-32 lg:ps-32 md:ps-5 sm:ps-5 xs:ps-5 bg-[#151515] bg-opacity-40 pt-4 pb-3 2xl:px-20 3xl:px-[100px] z-[1] mt-4 "
            >
              <div
                className="lg:w-1/2 flex flex-col justify-start items-start gap-4"
              >
                <div className="flex items-center gap-1">
                  <Frame1 className="size-[36px]" />
                  <h3 className="text-white font-bold text-[16px] 2xl:text-[24px] 3xl:text-[28px] ps-2 font-azarMehr">
                    {/* {localFind("different competitions")} */}
                    {findByUniqueId(mainData, 484)}
                  </h3>
                </div>
                <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
                  {/* {localFind(
                    "metaverse rang invites you to an exciting world of competition"
                  )} */}
                  {findByUniqueId(mainData, 485)}

                </p>
              </div>

              <div
                className="lg:w-1/2 xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 flex flex-col justify-start items-start gap-4 mt-10 md:mt-0"
              >
                <div className="flex items-center gap-1">
                  <Frame2 className="size-[36px]" />
                  <h3 className="text-white font-bold text-[16px] 2xl:text-[24px] 3xl:text-[28px] ps-2 font-azarMehr">
                    {/* {localFind("real interactions")} */}
                    {findByUniqueId(mainData, 486)}

                  </h3>
                </div>
                <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
                  {/* {localFind(
                    "metaverse rang invites you to an exciting world of real interactions"
                  )} */}
                  {findByUniqueId(mainData, 487)}
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
                  {findByUniqueId(mainData, 484)}

                </h3>
              </div>
              <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
                {/* {localFind(
                    "metaverse rang invites you to an exciting world of competition"
                  )} */}
                {findByUniqueId(mainData, 485)}

              </p>
            </div>

            <div
              className="lg:w-1/2 xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 flex flex-col justify-start items-start gap-4 mt-10 md:mt-0"
            >
              <div className="flex items-center">
                <Frame2 className="size-[36px]" />
                <h3 className="text-white font-bold text-[16px] 2xl:text-[24px] 3xl:text-[28px] ps-2 font-azarMehr">
                  {/* {localFind("real interactions")} */}
                  {findByUniqueId(mainData, 486)}

                </h3>
              </div>
              <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
                {/* {localFind(
                    "metaverse rang invites you to an exciting world of real interactions"
                  )} */}
                {findByUniqueId(mainData, 487)}

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
                <SectionTimer params={params}/>
              </Suspense>
            </div>

            <div className="relative w-full h-fit flex mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <Suspense fallback={<div>Loading Header...</div>}>
                <SectionTeam mainData={mainData} params={params} />
              </Suspense>
            </div>

            <div className="w-[90%] md:w-full h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
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
                <LastContent mainData={mainData} params={params} />
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
        <a href="https://discord.gg/sW6XCY96hh" aria-label="Join us on Discord" title='Discord' className="fixed rtl:left-10 ltr:right-10 bottom-[20px] z-[2]">

          <svg className="size-[60px] bg-light-primary rounded-full dark:bg-dark-yellow " width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.404297" width="64" height="64" rx="32" />
            <g clip-path="url(#clip0_2090_145)">
              <path className="dark:fill-black" d="M42.6454 22.3634C40.6874 21.465 38.5878 20.8031 36.3925 20.424C36.3525 20.4166 36.3126 20.4349 36.292 20.4715C36.0219 20.9518 35.7228 21.5783 35.5134 22.0708C33.1522 21.7173 30.8031 21.7173 28.4903 22.0708C28.2808 21.5674 27.9708 20.9518 27.6996 20.4715C27.679 20.4361 27.6391 20.4179 27.5991 20.424C25.405 20.8018 23.3053 21.4638 21.3461 22.3634C21.3292 22.3707 21.3146 22.3829 21.305 22.3987C17.3224 28.3486 16.2314 34.1523 16.7666 39.884C16.769 39.912 16.7848 39.9388 16.8066 39.9559C19.4342 41.8855 21.9794 43.057 24.4774 43.8335C24.5174 43.8457 24.5598 43.8311 24.5852 43.7981C25.1761 42.9912 25.7029 42.1403 26.1545 41.2456C26.1812 41.1932 26.1557 41.131 26.1012 41.1103C25.2657 40.7933 24.4702 40.4069 23.7049 39.9681C23.6444 39.9327 23.6395 39.8462 23.6952 39.8047C23.8563 39.684 24.0173 39.5585 24.1711 39.4317C24.1989 39.4086 24.2377 39.4037 24.2704 39.4183C29.2979 41.7137 34.7408 41.7137 39.709 39.4183C39.7417 39.4025 39.7805 39.4073 39.8095 39.4305C39.9634 39.5573 40.1244 39.684 40.2866 39.8047C40.3423 39.8462 40.3387 39.9327 40.2782 39.9681C39.5129 40.4154 38.7173 40.7933 37.8806 41.1091C37.8261 41.1298 37.8019 41.1932 37.8286 41.2456C38.2899 42.1391 38.8166 42.9899 39.3966 43.7969C39.4209 43.8311 39.4644 43.8457 39.5044 43.8335C42.0145 43.057 44.5598 41.8855 47.1874 39.9559C47.2104 39.9388 47.225 39.9132 47.2274 39.8852C47.8679 33.2587 46.1545 27.5027 42.6854 22.3999C42.6769 22.3829 42.6624 22.3707 42.6454 22.3634ZM26.9053 36.394C25.3916 36.394 24.1445 35.0043 24.1445 33.2977C24.1445 31.5911 25.3675 30.2015 26.9053 30.2015C28.4552 30.2015 29.6903 31.6033 29.6661 33.2977C29.6661 35.0043 28.4431 36.394 26.9053 36.394ZM37.1129 36.394C35.5993 36.394 34.3521 35.0043 34.3521 33.2977C34.3521 31.5911 35.5751 30.2015 37.1129 30.2015C38.6629 30.2015 39.8979 31.6033 39.8737 33.2977C39.8737 35.0043 38.6629 36.394 37.1129 36.394Z" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_2090_145">
                <rect width="30.72" height="30.72" fill="white" transform="translate(16.6396 17.0444)" />
              </clipPath>
            </defs>
          </svg>
        </a>

      </div>
    </>
  );
}
