import {
  getTranslation,
  getMainFile,
} from "@/components/utils/actions";
import SearchComponent from "@/components/Search/SearchComponent";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CitizenListLoader from "@/components/list/CitizenListLoader";
import CitizenListSkeleton from "@/components/skeleton/CitizenListSkeleton";
import useServerDarkMode from "@/hooks/use-server-dark-mode";
import React, { Suspense } from 'react';
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
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
    const [langData] = await Promise.all([
      getTranslation(lang),
    ]);

    const mainData = await getMainFile(langData);
    const defaultTheme = useServerDarkMode();

    // ❌ قبلاً اینجا بود: let allCitizenArray = await getAllCitizen("1");
    // این خط باعث می‌شد رندر کل صفحه (نه فقط لیست) منتظر جواب API بمونه؛
    // پس وقتی نوبت به <Suspense> می‌رسید دیتا از قبل آماده بود و هیچ‌وقت
    // چیزی سوسپند نمی‌شد. این فچ الان رفته توی CitizenListLoader (async
    // Server Component) که خودش داخل <Suspense> رندر می‌شه.

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
    };

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
            className={`w-full mt-[60px] lg:mt-0 lg:pt-0 bg-bg-primary  bg-opacity20`}
          >
            {/* Breadcrumb */}
            <div className="xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1">
              <BreadCrumb params={params} />
            </div>
            <div className="mt-[60px] lg:mt-[40px] xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1">
              <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
                {findByUniqueId(mainData, 593)}
              </h1>
              <p className="text-matn-2  dark:text-matn-2 font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
                {findByUniqueId(mainData, 596)}
              </p>
              <div className="flex justify-center w-full px-5 lg:px-0">
                <SearchComponent
                  searchLevel='citizen'
                  mainData={mainData}
                  params={resolvedParams}
                />
              </div>
            </div>
            {/* CITIZEN box Container */}
            <div className="flex flex-row flex-wrap justify-center md:justify-center w-full no-scrollbar overflow-y-auto py-[20px] gap-x-5">
              <Suspense fallback={<CitizenListSkeleton />}>
                <CitizenListLoader
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