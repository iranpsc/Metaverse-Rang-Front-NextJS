import { Frame1, Frame2 } from "@/components/svgs";
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
import dynamic from "next/dynamic";

import TopCitizen from '@/components/templates/firstpage/TopCitizenClient';
import TopTrainersFirstPage from "@/components/templates/firstpage/TopTrainersFirstPage";
import TopTrainersSkeleton from "@/components/skeleton/TopTrainersSkeleton";
import LastContent from '@/components/templates/firstpage/LastContent.client';
import {
  getTranslation,
  getMainFile,
} from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import {
  getHomeCitizens,
  getHomeNews,
  getHomeTutorials,
  getHomeVersions,
} from "@/components/templates/firstpage/homeData";

const HeaderFirstPage = dynamic(
  () => import('@/components/templates/firstpage/HeaderFirstPage')
);
const SectionTimer = dynamic(
  () => import('@/components/templates/firstpage/SectionTimer')
);
const SectionTeam = dynamic(
  () => import('@/components/templates/firstpage/TeamSection')
);
const LastNews = dynamic(
  () => import('@/components/templates/firstpage/LastNews')
);
const FristPageVideo = dynamic(
  () => import('@/components/templates/firstpage/FristPageVideo')
);
const EducationFirstPage = dynamic(
  () => import('@/components/templates/firstpage/EducationFirstPage')
);
const DetailsEducationSection = dynamic(
  () => import('@/components/templates/firstpage/DetailsEducationSection')
);
const VersionSection = dynamic(
  () => import('@/components/templates/firstpage/VersionSection')
);

const DESKTOP_POSTER = "/firstpage/Untitled-1.webp";
const MOBILE_POSTER = "/firstpage/metaverse-rang-mobile-app.webp";
const DESKTOP_VIDEO =
  "https://s3.metarang.com/metarang/firstpage/metaverse-rang.mp4";
const MOBILE_VIDEO =
  "https://s3.metarang.com/metarang/firstpage/mob2.mp4";

// SEO
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  try {
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    const title = findByUniqueId(mainData, 1457) || (lang === 'fa' ? "متاورس رنگ - پلتفرم واقعیت افزوده و متاورس ایرانی" : "Metaverse Rang - Iranian AR/VR & Metaverse Platform");
    const descriptionRaw = findByUniqueId(mainData, 482) || "";
    const description = descriptionRaw.slice(0, 160);

    const canonical = `https://metarang.com/${lang}`;

    return {
      title,
      description,
      metadataBase: new URL('https://metarang.com'),
      alternates: {
        canonical,
        languages: {
          'fa-IR': 'https://metarang.com/fa',
          'en-US': 'https://metarang.com/en',
          'x-default': 'https://metarang.com/fa',
        },
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: lang === 'fa' ? "متاورس رنگ" : "Metaverse Rang",
        images: [
          {
            url: "/logo.png",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: lang === 'fa' ? 'fa_IR' : 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ["/logo.png"],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);
    return {
      title: lang === 'fa' ? "خطا در بارگذاری" : "Loading Error",
      description: "مشکلی رخ داده است",
    };
  }
}

interface LangPageProps {
  params: Promise<{ lang: any }>;
}
export default async function LangPage({ params }: LangPageProps) {
  const resolvedParams = await params;
  const { lang } = await params;
  try {
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    const [homeCitizens, homeVideos, homeNews, homeVersions] =
      await Promise.all([
        getHomeCitizens(),
        getHomeTutorials(),
        getHomeNews(10),
        getHomeVersions(),
      ]);

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
      "image": 'https://metarang.com/logo.png',
      "telephone": "09120820120",
      "url": `https://metarang.com/${lang}`,
      "logo": `https://metarang.com/logo.png`,
      "email": "info@metarang.com",
      "description": await makeLessCharacter(),
      "alternateName": "MetaRGB"
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(landingSchema) }}
        />
        <CleanAutoRetryParam />
        <section className=" relative  mt-[60px] lg:mt-0 lg:pt-0 bg-bg-primary ">
          <section className="flex flex-col h-fit tall0:min-h-[600px] min-h-[calc(100vh-60px)] lg:h-screen relative">
            {/* Desktop hero — CSS-gated so we never call headers() (keeps route cacheable). */}
            <video
              poster={DESKTOP_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="hidden lg:block absolute w-full h-full ltr:rotate-y-180 object-fill sm:object-left"
            >
              <source src={DESKTOP_VIDEO} type="video/mp4" />
            </video>
            {/* Mobile hero */}
            <video
              poster={MOBILE_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="block lg:hidden absolute w-full h-full object-fill"
            >
              <source src={MOBILE_VIDEO} type="video/mp4" />
            </video>
            <div className="w-full h-full flex flex-col-reverse lg:flex-row px-5 lg:ps-[32px] lg:pe-0 z-[1]">
              <Suspense fallback={<div>Loading Header...</div>}>
                <HeaderFirstPage mainData={mainData} params={resolvedParams} />
              </Suspense>
            </div>
            <div className="w-full max-h-[40vh] overflow-y-auto light-scrollbar dark:dark-scrollbar tall0:max-h-[50vh] lg:max-h-[35vh] hidden lg:flex flex-col lg:flex-row gap-4 xl:gap-20 absolute bottom-0 xl:pe-8 lg:pe-8 xs:pe-5 xl:ps-8 lg:ps-8 md:ps-5 sm:ps-5 xs:ps-5 bg-[#151515] bg-opacity-40 pt-4 pb-3 2xl:px-20 3xl:px-[100px] z-[1] mt-4">
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
          <div className="w-full overflow-y-auto light-scrollbar dark:dark-scrollbar flex flex-col md:flex-row lg:hidden gap-4 xl:gap-10 px-5 lg:px-8 bg-[#151515] bg-opacity-40 py-3 z-[1] mt-4">
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
          <section className="w-full relative flex no-scrollbar flex-col justify-start overflow-x-clip overflow-y-auto items-center xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1">
            <div className="w-full relative lg:h-[350px] 2xl:h-[400px] mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <SectionTimer params={resolvedParams} />
            </div>
            <div className="relative w-full h-fit flex mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <SectionTeam mainData={mainData} params={resolvedParams} />
            </div>
            <div className="w-[90%] md:w-full h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <TopCitizen
                params={resolvedParams}
                mainData={mainData}
                initialCitizens={homeCitizens}
              />
            </div>
            <div className="w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <LastNews
                mainData={mainData}
                params={resolvedParams}
                initialNews={homeNews}
              />
            </div>
            <div className="relative w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px] flex items-center justify-center">
              <Suspense fallback={<div>Loading Header...</div>}>
                <FristPageVideo params={resolvedParams} />
              </Suspense>
            </div>
            <div className="w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <Suspense fallback={<TopTrainersSkeleton />}>
                <TopTrainersFirstPage params={resolvedParams} mainData={mainData} />
              </Suspense>
            </div>
            <div className="w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <Suspense fallback={<div>Loading Header...</div>}>
                <EducationFirstPage
                  params={resolvedParams}
                  mainData={mainData}
                  initialVideos={homeVideos}
                />
              </Suspense>
            </div>
            <div className="w-[90%] h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <Suspense fallback={<div>Loading Header...</div>}>
                <LastContent mainData={mainData} params={resolvedParams} />
              </Suspense>
            </div>
            <div className="w-[90%] relative h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <Suspense fallback={<div>Loading Header...</div>}>
                <DetailsEducationSection mainData={mainData} />
              </Suspense>
            </div>
            <div className="w-[90%] relative h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
              <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white ">
                {findByUniqueId(mainData, 501)}
              </p>
              <VersionSection
                params={resolvedParams}
                initialVersions={homeVersions}
              />
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
  }
}
