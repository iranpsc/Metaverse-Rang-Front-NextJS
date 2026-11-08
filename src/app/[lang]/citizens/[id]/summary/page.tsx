import SideBar from "@/components/shared/sidebar/SideBar";
import BreadCrumb from "@/components/shared/BreadCrumb";
import NotFoundPage from "@/components/error/NotFoundPage";
import DynamicFooter from "@/components/shared/footer/DynamicFooter";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
import FeaturesSummary from "./FeaturesSummary";
import FeaturesMap from "./FeaturesMap";

import {
  getTranslation,
  getMainFile,
  getLangArray,
  getUserData,
  getMetadataDictionary,
} from "@/components/utils/actions";
import { buildSidebarLabels } from "@/components/utils/buildShellTranslations";

import { getStaticMenu } from "@/components/utils/constants";
import { buildTabsMenu } from "@/components/utils/buildTabsMenu";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import InviteBox from "@/components/templates/referral/invite-box";

/* ------------------------------------------------------------------ */
/*                                TYPES                               */
/* ------------------------------------------------------------------ */
interface CitizenFeaturesSummaryProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

/* ------------------------------------------------------------------ */
/*                                PAGE                                */
/* ------------------------------------------------------------------ */
export default async function CitizenFeaturesSummary({
  params,
}: CitizenFeaturesSummaryProps) {
  const resolvedParams = await params;
  const { lang, id } = resolvedParams;

  try {
    /* --------------------------- base data --------------------------- */
    const [langData, profileData] = await Promise.all([
      getTranslation(lang),
      getUserData(id, 5000),
    ]);

    /* ------------------------ build sidebar -------------------------- */
    function buildUpdatedTabsMenu(mainData: any) {
      return buildTabsMenu(mainData, getStaticMenu(resolvedParams));
    }

    /* ---------------------------- not found -------------------------- */
    if (!profileData?.data) {
      const [mainData, langArray] = await Promise.all([
        getMainFile(langData),
        getLangArray(),
      ]);

      return (
        <NotFoundPage
          lang={lang}
          params={resolvedParams}
          langData={langData}
          langArray={langArray}
          mainData={mainData}
        />
      );
    }

    /* ------------------------- page data ----------------------------- */
    const [mainData, langArray] = await Promise.all([
      getMainFile(langData),
      getLangArray(),
    ]);

    const updatedTabsMenu = buildUpdatedTabsMenu(mainData);
    const sidebarLabels = buildSidebarLabels(mainData);

    /* ------------------------- JSON-LD schema ------------------------- */
    const kyc = profileData?.data?.kyc;
    const fullName = kyc?.fname
      ? `${kyc.fname} ${kyc.lname}`
      : profileData?.data?.name || "Citizen";

    const isFa = lang === "fa";
    const canonicalUrl = `https://metarang.com/${lang}/citizens/${id}/features-summary`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": canonicalUrl,
          url: canonicalUrl,
          name: isFa
            ? `کاربری‌های ${fullName} | ${findByUniqueId(mainData, 148)}`
            : `Feature summary of ${fullName} | ${findByUniqueId(mainData, 148)}`,
          description: isFa
            ? "خلاصه کاربری‌های ملک به تفکیک نوع"
            : "Citizen property feature (karbari) summary by type",
          inLanguage: isFa ? "fa-IR" : "en-US",
          isPartOf: {
            "@type": "WebSite",
            name: "Metarang",
            url: "https://metarang.com",
          },
          about: {
            "@type": "Person",
            name: fullName,
          },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: isFa ? "خانه" : "Home",
              item: `https://metarang.com/${lang}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: isFa ? "کاربری‌ها" : "Citizens",
              item: `https://metarang.com/${lang}/citizens`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: isFa
                ? `کاربری‌های ${fullName}`
                : `Feature summary of ${fullName}`,
              item: canonicalUrl,
            },
          ],
        },
      ],
    };

    /* ----------------------------- render ---------------------------- */
    return (
      <>
        <CleanAutoRetryParam />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div
          className="flex h-screen overflow-hidden"
          dir={langData.direction}
        >
          <SideBar
            tabsMenu={updatedTabsMenu}
            langData={langData}
            langArray={langArray}
            params={resolvedParams}
            pageSide="citizen"
            sidebarLabels={sidebarLabels}
          />

          <section className="relative w-full overflow-y-auto mt-[60px] lg:mt-0 bg-bg-primary  px-2 light-scrollbar dark:dark-scrollbar lg:ps-20 xl:ps-2">
            <div className="px-12">
              <BreadCrumb params={resolvedParams} />
            </div>

            <div className="xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1">
              <InviteBox
                params={resolvedParams}
                mainData={mainData}
                imageLight="https://s3.metarang.com/metarang/asset/summary-light.png"
                imageDark="https://s3.metarang.com/metarang/asset/summary-dark.png"
                descriptionId={1783}
                urlSuffix="summary"
              />
              <FeaturesSummary params={resolvedParams} mainData={mainData} />
              <FeaturesMap params={resolvedParams} mainData={mainData} />
            </div>

            <div className="xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1">
              <DynamicFooter
                mainData={mainData}
                params={resolvedParams}
              />
            </div>
          </section>
        </div>
      </>
    );
  } catch (error) {
    const serializedError = {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : null,
      name: error instanceof Error ? error.name : "Error",
    };

    console.error("❌ Error in CitizenFeaturesSummary:", serializedError);
    return <CustomErrorPage error={serializedError} />;
  }
}

/* ------------------------------------------------------------------ */
/*                                SEO                                 */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;

  // Citizen data and language metadata are independent; fetch them together
  // so metadata generation does not wait for sequential network round trips.
  try {
    // Use bundled dictionaries for fa/en so metadata generation does not
    // wait for the Admin API or remote dictionary host. Other active languages
    // retain their API-driven translation behavior.
    const [profileData, mainData] = await Promise.all([
      getUserData(id, 5000),
      getMetadataDictionary(lang),
    ]);

    if (!profileData?.data) {
      return {
        title: lang === "fa" ? "شهروند پیدا نشد | متارنگ" : "Citizen not found | MetaRang",
        description: lang === "fa"
          ? "اطلاعات شهروند مورد نظر یافت نشد."
          : "The requested citizen could not be found.",
      };
    }

    const fullName = profileData.data?.kyc?.fname
      ? `${profileData.data.kyc.fname} ${profileData.data.kyc.lname || ""}`.trim()
      : profileData.data.name || "Citizen";

    const titlePrefix = findByUniqueId(mainData, 58);
    const siteTitle = findByUniqueId(mainData, 148);

    return {
      title: `${titlePrefix} ${fullName} | ${siteTitle}`,
      description:
        lang === "fa"
          ? "خلاصه ویژگی‌های کاربری املاک شهروندان بر اساس نوع"
          : "Citizen property feature (karbari) summary by type",
      alternates: {
        canonical: `https://metarang.com/${lang}/citizens/${id}/summary`,
        languages: {
          "fa-IR": `https://metarang.com/fa/citizens/${id}/summary`,
          "en-US": `https://metarang.com/en/citizens/${id}/summary`,
          "x-default": `https://metarang.com/fa/citizens/${id}/summary`,
        },
      },
    };
  } catch (error) {
    console.error("[Summary generateMetadata] Failed:", error);
    return {
      title: lang === "fa" ? "خلاصه کاربری‌های شهروند | متارنگ" : "Citizen feature summary | MetaRang",
      description: lang === "fa"
        ? "خلاصه ویژگی‌های کاربری املاک شهروندان بر اساس نوع"
        : "Citizen property feature (karbari) summary by type",
    };
  }
}
