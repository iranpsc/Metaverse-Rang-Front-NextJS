import { Discord, Frame1, Frame2 } from "@/components/svgs";
import React, { Suspense } from 'react';
import { headers } from 'next/headers';
import dynamic from "next/dynamic";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam  from "@/components/shared/CleanAutoRetryParam";
// Lazy load components
const HeaderFirstPage = React.lazy(() => import('@/components/templates/firstpage/HeaderFirstPage'));
const SectionTimer = React.lazy(() => import('@/components/templates/firstpage/SectionTimer'));
const SectionTeam = React.lazy(() => import('@/components/templates/firstpage/TeamSection'));
const TopCitizen = React.lazy(() => import('@/components/templates/firstpage/TopCitizen'));
const LastNews = React.lazy(() => import('@/components/templates/firstpage/LastNews'));
// const Section3D = React.lazy(() => import('@/components/templates/firstpage/Section3D'));
const FristPageVideo = React.lazy(() => import('@/components/templates/firstpage/FristPageVideo.tsx'));
import TopTrainersFirstPage, { getTopTrainerUsers } from "@/components/templates/firstpage/TopTrainersFirstPage";
const EducationFirstPage = React.lazy(() => import('@/components/templates/firstpage/EducationFirstPage'));
// const LastContent = React.lazy(() => import('@/components/templates/firstpage/LastContent'));
const DetailsEducationSection = React.lazy(() => import('@/components/templates/firstpage/DetailsEducationSection'));
const VersionSection = React.lazy(() => import('@/components/templates/firstpage/VersionSection'));
// import TeamImg from '@/public/firstpage/teams.jpg';
const LastContent = dynamic(
  () => import("@/components/templates/firstpage/LastContent"),
  { ssr: false }
);
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  // getLangArray,
  getAllVersions
} from "@/components/utils/actions";
import Head from 'next/head';
import { findByUniqueId } from "@/components/utils/findByUniqueId";

// SEO
export async function generateMetadata({ params }) {
  try {
  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const centralPageModal = await findByModalName(mainData, "central-page");


  const firstPageArrayContent = await findByTabName(centralPageModal, "first-page");
  const allVersionList = await getAllVersions(mainData);
  async function makeLessCharacter() {
    let temp = findByUniqueId(mainData, 482);
    temp = temp.slice(0, 200);
    return temp;
  }

  return {
    title: findByUniqueId(mainData, 1457),
    description: await makeLessCharacter(),
    openGraph: {
      type: 'website',
      title: findByUniqueId(mainData, 256),
      description: await makeLessCharacter(),
      locale: params.lang === 'fa' ? 'fa_IR' : 'en_US',
      url: `https://rgb.irpsc.com/${params.lang}`,
      images: [
        {
          url: "https://frdevelop2.irpsc.com/_next/static/media/teams.6efc25f4.jpg",
          width: 800,
          height: 600,
          alt: findByUniqueId(mainData, 1457),
        },
      ],
    },
  };
} catch (error) {
    console.error("❌ Metadata error (MainPAge):", error);

    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}

export default async function LangPage({ params }) {
  try {
  const headersList = headers();
  const users = await getTopTrainerUsers();

  const viewportWidth = headersList.get('viewport-width');
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = viewportWidth
    ? parseInt(viewportWidth, 10) < 1024
    : /mobile|android|iphone|ipad|phone/i.test(userAgent);

  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const centralPageModal = await findByModalName(mainData, "central-page");

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
    } catch (error) {
      console.error("Error fetching footer data:", error);
      return [];
    }
  }

  async function makeLessCharacter() {
    let temp = findByUniqueId(mainData, 482);
    temp = temp.slice(0, 200);
    return temp;
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
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/firstpage/Untitled-1.webp" as="image" />
        <link rel="preload" href="/firstpage/metaverse-rang.mp4" as="video" type="video/mp4" />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingSchema) }}
      />
      <CleanAutoRetryParam />
      <section className=" relative  mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity-20">
        <section className="flex flex-col h-fit tall0:min-h-[600px] min-h-[calc(100vh-60px)] lg:h-screen relative">
          {!isMobile && (
            <video
              poster="/firstpage/Untitled-1.webp"
              autoPlay
              muted
              loop
              playsInline
              className="hidden lg:block absolute w-full h-full ltr:rotate-y-180 object-fill  sm:object-left"
            >
              <source src="/firstpage/Untitled-1.webp" type="video/webm" />
              <source src="/firstpage/metaverse-rang.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {isMobile && (
            <video
              poster="/firstpage/metaverse-rang-mobile-app.webp"
              autoPlay
              muted
              loop
              playsInline
              className="block lg:hidden absolute w-full h-full object-fill"
            >
              <source src="/firstpage/metaverse-rang-mobile-app.webp" type="video/webm" />
              <source src="/firstpage/mob2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="w-full h-full flex flex-col-reverse lg:flex-row px-5 lg:ps-[32px] lg:pe-0 z-[1]">
            <Suspense fallback={<div>Loading Header...</div>}>
              <HeaderFirstPage mainData={mainData} params={params} />
            </Suspense>
          </div>
          <div className="w-full max-h-[40vh] overflow-y-auto light-scrollbar dark:dark-scrollbar tall0:max-h-[50vh] lg:max-h-[35vh] hidden lg:flex flex-col lg:flex-row gap-4 xl:gap-20 absolute bottom-0 xl:pe-32 lg:pe-32 xs:pe-5 xl:ps-32 lg:ps-32 md:ps-5 sm:ps-5 xs:ps-5 bg-[#151515] bg-opacity-40 pt-4 pb-3 2xl:px-20 3xl:px-[100px] z-[1] mt-4">
            <div className="lg:w-1/2 flex flex-col justify-start items-start gap-4">
              <div className="flex items-center gap-1">
                <Frame1 className="size-[36px]" />
                <h3 className="text-white font-bold text-[16px] 2xl:text-[24px] 3xl:text-[28px] ps-2 font-azarMehr">
                  {findByUniqueId(mainData, 484)}
                </h3>
              </div>
              <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
                {findByUniqueId(mainData, 485)}
              </p>
            </div>
            <div className="lg:w-1/2 xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 flex flex-col justify-start items-start gap-4 mt-10 md:mt-0">
              <div className="flex items-center gap-1">
                <Frame2 className="size-[36px]" />
                <h3 className="text-white font-bold text-[16px] 2xl:text-[24px] 3xl:text-[28px] ps-2 font-azarMehr">
                  {findByUniqueId(mainData, 486)}
                </h3>
              </div>
              <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
                {findByUniqueId(mainData, 487)}
              </p>
            </div>
          </div>
        </section>
        <div className="w-full overflow-y-auto light-scrollbar dark:dark-scrollbar flex flex-col md:flex-row lg:hidden gap-4 xl:gap-10 px-5 lg:px-32 bg-[#151515] bg-opacity-40 py-3 z-[1] mt-4">
          <div className="lg:w-1/2 flex flex-col justify-start items-start gap-4">
            <div className="flex items-center">
              <Frame1 className="size-[36px]" />
              <h3 className="text-white font-bold text-[16px] 2xl:text-[24px] 3xl:text-[28px] ps-2 font-azarMehr">
                {findByUniqueId(mainData, 484)}
              </h3>
            </div>
            <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
              {findByUniqueId(mainData, 485)}
            </p>
          </div>
          <div className="lg:w-1/2 xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 flex flex-col justify-start items-start gap-4 mt-10 md:mt-0">
            <div className="flex items-center">
              <Frame2 className="size-[36px]" />
              <h3 className="text-white font-bold text-[16px] 2xl:text-[24px] 3xl:text-[28px] ps-2 font-azarMehr">
                {findByUniqueId(mainData, 486)}
              </h3>
            </div>
            <p className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[18px]">
              {findByUniqueId(mainData, 487)}
            </p>
          </div>
        </div>
        <section className="w-full relative flex no-scrollbar flex-col justify-start overflow-x-clip overflow-y-auto items-center xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
          <div className="w-full relative lg:h-[350px] 2xl:h-[400px] mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <Suspense fallback={<div>Loading Header...</div>}>
              <SectionTimer params={params} />
            </Suspense>
          </div>
          <div className="relative w-full h-fit flex mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <Suspense fallback={<div>Loading Header...</div>}>
              <SectionTeam mainData={mainData} params={params} />
            </Suspense>
          </div>
          <div className="w-[90%] md:w-full h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <Suspense fallback={<div>Loading Header...</div>}>
              <TopCitizen params={params} mainData={mainData} />
            </Suspense>
          </div>
          <div className="w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <Suspense fallback={<div>Loading Header...</div>}>
              <LastNews mainData={mainData} params={params} />
            </Suspense>
          </div>
          <div className="relative w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px] flex items-center justify-center">
            <Suspense fallback={<div>Loading Header...</div>}>
              {/* <Section3D params={params} /> */}
               <FristPageVideo params={params} />
            </Suspense>
          </div>
          <div className="w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <TopTrainersFirstPage params={params} mainData={mainData}  users={users} />
          </div>
          <div className="w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <Suspense fallback={<div>Loading Header...</div>}>
              <EducationFirstPage params={params} mainData={mainData} />
            </Suspense>
          </div>
          <div className="w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <Suspense fallback={<div>Loading Header...</div>}>
              <LastContent mainData={mainData} params={params} />
            </Suspense>
          </div>
          <div className="w-[90%] relative h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <Suspense fallback={<div>Loading Header...</div>}>
              <DetailsEducationSection mainData={mainData} />
            </Suspense>
          </div>
          <div className="w-[90%] relative h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <Suspense fallback={<div>Loading Header...</div>}>
            <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white ">{findByUniqueId(mainData, 501)}</p>
              <VersionSection mainData={mainData} params={params}  />

            </Suspense>
          </div>

        </section>
      </section>
    </>
  );
} catch (error) {
  const serializedError = {
    message:
      error instanceof Error ? error.message : "Unknown error",
    stack:
      error instanceof Error ? error.stack : null,
    name:
      error instanceof Error ? error.name : "Error",
  };

  console.error("❌ Error in MainPage:", serializedError);

  return <CustomErrorPage error={serializedError} />;
} }