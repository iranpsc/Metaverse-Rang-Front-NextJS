
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getAllCitizen,
  getFooterData,
  getLangArray
} from "@/components/utils/actions";
import SearchComponent from "@/components/shared/SearchComponent";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CitizenList from "@/components/templates/citizen/citizenList";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import React, { Suspense } from 'react';
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam from "@/components/shared/CleanAutoRetryParam";
// SEO**
export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;

  try {
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    const description = (findByUniqueId(mainData, 596) || "").slice(0, 160);

    return {
      title: findByUniqueId(mainData, 593),
      description,
      alternates: {
        canonical: `https://metarang.com/${lang}/citizen`,
        languages: {
          'fa-IR': 'https://metarang.com/fa/citizen',
          'en-US': 'https://metarang.com/en/citizen',
          'x-default': 'https://metarang.com/fa/citizen',
        },
      },
      openGraph: {
        type: 'website',
        title: findByUniqueId(mainData, 593),
        description,
        locale: lang === "fa" ? "fa_IR" : "en_US",
        url: `https://metarang.com/${lang}/citizen`,
        images: [
          {
            url: "/logo.png",
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (e) {
    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}
interface CitizensPageProps {
  params: Promise<{ lang: string }>;
}
export default async function CitizensPage({ params }: CitizensPageProps) {
   const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const [langData, langArray] = await Promise.all([

      getTranslation(lang),
      getLangArray(),
    ]);

    const mainData = await getMainFile(langData);
    const defaultTheme = useServerDarkMode();


    const Citizenship = await findByModalName(mainData, "Citizenship-profile");
    const citizenListArrayContent = await findByTabName(
      Citizenship,
      "list-citizen"
    );

    // ****
    const levelModals = await findByModalName(mainData, "levels");
    const levelListArrayContent = await findByTabName(levelModals, "level-list");

    let allCitizenArray = await getAllCitizen("1");

    //to make description less than 200 character
    async function makeLessCharacter() {
      let temp = findByUniqueId(mainData, 596)
      return await temp.slice(0, 200)
    }




    const citizenListSchema = {
      "@context": "https://schema.org/",
      "@type": "ProfessionalService",
      "name": `${await makeLessCharacter()}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "میرداماد، 824H+JG2",
        "addressCountry": "ایران",
        "addressRegion": "استان قزوین",
        "addressLocality": "قزوین"
      },
      "image": 'https://metarang.com/logo.png',
      "telephone": "09120820120",
      "url": `https://metarang.com/${lang}/citizen`,
      "logo": `https://metarang.com/logo.png`,
      "email": "info@metarang.com",
      "description": await makeLessCharacter(),
      "alternateName": "MetaRGB"
    }

    return (
      <>
        {/* SCHEMA** */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(citizenListSchema),
          }}
        />
        <div className=" w-full" dir={langData.direction}>
          <CleanAutoRetryParam />
          <section
            className={`w-full mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20`}
          >
            {/* Breadcrumb */}
            <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
              <BreadCrumb params={params} />
            </div>
            <div className="mt-[60px] lg:mt-[40px] xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
              <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
                {findByUniqueId(mainData, 593)}
              </h1>
              <p className="text-lightGray  dark:text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
                {findByUniqueId(mainData, 596)}
              </p>
              <div className="flex justify-center w-full px-5 lg:px-0">
                <SearchComponent
                  searchLevel='citizen'
                  mainData={mainData}
                  params={params}
                />
              </div>
            </div>
            {/* CITIZEN box Container */}
            <div className="flex flex-row flex-wrap justify-center md:justify-center w-full no-scrollbar overflow-y-auto py-[20px] gap-x-5">
              <Suspense fallback={<div>Loading citizens...</div>}>
                <CitizenList
                  allCitizenArray={allCitizenArray.data}
                  params={resolvedParams}
                  mainData={mainData}
                  defaultTheme={defaultTheme}
                />
              </Suspense>
            </div>


          </section>
        </div>
      </>
    );
  }
  catch (error) {
    const serializedError = {
      message:
        error instanceof Error ? error.message : "Unknown error",
      stack:
        error instanceof Error ? error.stack : null,
      name:
        error instanceof Error ? error.name : "Error",
    };

    console.error("❌ Error in CitizensPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }

}
