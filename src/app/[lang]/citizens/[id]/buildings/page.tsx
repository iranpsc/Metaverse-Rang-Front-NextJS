import SideBar from "@/components/shared/sidebar/SideBar";
import BreadCrumb from "@/components/shared/BreadCrumb";
import NotFoundPage from "@/components/error/NotFoundPage";
import DynamicFooter from "@/components/shared/footer/DynamicFooter";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
import BuildingsSummary from "./BuildingsSummary";

import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getUserData,
} from "@/components/utils/actions";

import { getStaticMenu } from "@/components/utils/constants";
import BuildingsHeader from "./BuildingsHeader";

/* ------------------------------------------------------------------ */
/*                                TYPES                               */
/* ------------------------------------------------------------------ */
interface CitizenBuildingsProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

/* ------------------------------------------------------------------ */
/*                                PAGE                                */
/* ------------------------------------------------------------------ */
export default async function CitizenBuildings({ params }: CitizenBuildingsProps) {
  const resolvedParams = await params;
  const { lang, id } = resolvedParams;

  try {
    const [langData, profileData] = await Promise.all([
      getTranslation(lang),
      getUserData(id),
    ]);

    async function buildUpdatedTabsMenu(mainData: any) {
      const staticMenuToShow = getStaticMenu(resolvedParams);

      const citizenModal = await findByModalName(mainData, "Citizenship-profile");
      const citizenTabs = (await findByTabName(citizenModal, "menu")) || [];

      const centralModal = await findByModalName(mainData, "central-page");
      const mainTabs = (await findByTabName(centralModal, "before-login")) || [];

      const mapMenu = (tabs: any[]) =>
        tabs.map((tab) => {
          const staticItem = staticMenuToShow.find((s) => s.unique_id === tab.unique_id);
          return staticItem
            ? { ...tab, url: staticItem.url, order: staticItem.order, toShow: true }
            : tab;
        });

      const merged = [...mapMenu(citizenTabs), ...mapMenu(mainTabs)];

      const seen = new Set();
      return merged.filter((tab) => {
        if (seen.has(tab.unique_id)) return false;
        seen.add(tab.unique_id);
        return true;
      });
    }

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

    const [mainData, langArray] = await Promise.all([
      getMainFile(langData),
      getLangArray(),
    ]);

    const updatedTabsMenu = await buildUpdatedTabsMenu(mainData);

    /* ------------------------- JSON-LD schema ------------------------- */
    const isFa = lang === "fa";

    const kyc = profileData?.data?.kyc;
    const fullName = kyc?.fname
      ? `${kyc.fname} ${kyc.lname}`
      : profileData?.data?.name || (isFa ? "شهروند" : "Citizen");

    const canonicalUrl = `https://metarang.com/${lang}/citizens/${id}/buildings`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": canonicalUrl,
          url: canonicalUrl,
          name: isFa ? `بناهای ${fullName}` : `Buildings of ${fullName}`,
          description: isFa
            ? "خلاصه، نمودار و لیست بناهای تکمیل‌شده"
            : "Completed buildings summary, chart, and list",
          inLanguage: isFa ? "fa-IR" : "en-US",
          isPartOf: {
            "@type": "WebSite",
            name: "Metarang",
            url: "https://metarang.com",
          },
          about: {
            "@type": "Person",
            name: fullName,
            url: `https://metarang.com/${lang}/citizens/${id}`,
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
              name: isFa ? "کاربران" : "Citizens",
              item: `https://metarang.com/${lang}/citizens`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: fullName,
              item: `https://metarang.com/${lang}/citizens/${id}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: isFa ? "بناها" : "Buildings",
              item: canonicalUrl,
            },
          ],
        },
      ],
    };

    return (
      <>
        <CleanAutoRetryParam />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="flex h-screen overflow-hidden" dir={langData.direction}>
          <SideBar
            tabsMenu={updatedTabsMenu}
            langData={langData}
            langArray={langArray}
            params={resolvedParams}
            pageSide="citizen"
            mainData={mainData}
          />

          <section className="relative w-full overflow-y-auto mt-[60px] lg:mt-0 bg-bg-primary  px-2 light-scrollbar dark:dark-scrollbar">
            <div className="px-12">
              <BreadCrumb params={resolvedParams} />
            </div>

            <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
              <BuildingsHeader referralPageArrayContent={undefined} params={resolvedParams} mainData={mainData} />
              <BuildingsSummary params={resolvedParams} mainData={mainData} />
            </div>
            <DynamicFooter mainData={mainData} params={resolvedParams} />
            <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">

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

    console.error("❌ Error in CitizenBuildings:", serializedError);
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
  const isFa = lang === "fa";

  try {
    const profileData = await getUserData(id);

    if (!profileData?.data) {
      return {
        title: isFa ? "404 - پیدا نشد" : "404 - Not found",
        description: isFa ? "صفحه مورد نظر یافت نشد" : "The requested page could not be found",
        robots: { index: false, follow: false },
      };
    }

    const fullName = profileData.data?.kyc?.fname
      ? `${profileData.data.kyc.fname} ${profileData.data.kyc.lname}`
      : profileData.data.name || (isFa ? "شهروند" : "Citizen");

    const title = isFa ? `بناهای ${fullName}` : `Buildings of ${fullName}`;
    const description = isFa
      ? "خلاصه، نمودار و لیست بناهای تکمیل‌شده"
      : "Completed buildings summary, chart, and list";

    const canonicalUrl = `https://metarang.com/${lang}/citizens/${id}/buildings`;
    const ogImage = profileData.data?.profilePhotos?.[0]?.url || "/logo.png";

    return {
      title,
      description,
      keywords: isFa
        ? [fullName, "بناها", "ساختمان‌ها", "متاورس رنگ", profileData.data.code]
        : [fullName, "buildings", "completed buildings", "Metarang metaverse", profileData.data.code],
      alternates: {
        canonical: canonicalUrl,
        languages: {
          "fa-IR": `https://metarang.com/fa/citizens/${id}/buildings`,
          "en-US": `https://metarang.com/en/citizens/${id}/buildings`,
          "x-default": `https://metarang.com/fa/citizens/${id}/buildings`,
        },
      },
      openGraph: {
        type: "website",
        title,
        description,
        locale: isFa ? "fa_IR" : "en_US",
        url: canonicalUrl,
        siteName: "Metarang",
        images: [
          {
            url: ogImage,
            width: 800,
            height: 600,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return {
      title: isFa ? "خطا" : "Error",
      description: isFa ? "مشکلی در بارگذاری صفحه رخ داده است" : "An error occurred while loading the page",
    };
  }
}