import SideBar from "@/components/shared/sidebar/SideBar";
import BreadCrumb from "@/components/shared/BreadCrumb";
import NotFoundPage from "@/components/error/NotFoundPage";
import DynamicFooter from "@/components/shared/footer/DynamicFooter";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
import FeaturesSummary from "./FeaturesSummary";
import Map from "./Map"

import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getUserData,
} from "@/components/utils/actions";

import { getStaticMenu } from "@/components/utils/constants";

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
      getUserData(id),
    ]);

    /* ------------------------ build sidebar -------------------------- */
    async function buildUpdatedTabsMenu(mainData: any) {
      const staticMenuToShow = getStaticMenu(resolvedParams);

      const citizenModal = await findByModalName(
        mainData,
        "Citizenship-profile"
      );
      const citizenTabs = (await findByTabName(citizenModal, "menu")) || [];

      const centralModal = await findByModalName(mainData, "central-page");
      const mainTabs =
        (await findByTabName(centralModal, "before-login")) || [];

      const mapMenu = (tabs: any[]) =>
        tabs.map((tab) => {
          const staticItem = staticMenuToShow.find(
            (s) => s.unique_id === tab.unique_id
          );
          return staticItem
            ? {
                ...tab,
                url: staticItem.url,
                order: staticItem.order,
                toShow: true,
              }
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

    const updatedTabsMenu = await buildUpdatedTabsMenu(mainData);

    /* ----------------------------- render ---------------------------- */
    return (
      <>
        <CleanAutoRetryParam />

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
            mainData={mainData}
          />

          <section className="relative w-full overflow-y-auto mt-[60px] lg:mt-0 bg-[#f8f8f8] dark:bg-black px-2 light-scrollbar dark:dark-scrollbar">
            <div className="px-12">
              <BreadCrumb params={resolvedParams} />
            </div>

            <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
              <FeaturesSummary params={resolvedParams} mainData={mainData} />
              <Map />
            </div>

            <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
              <DynamicFooter mainData={mainData} params={resolvedParams} />
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

  try {
    const profileData = await getUserData(id);

    if (!profileData?.data) {
      return {
        title: "404 - پیدا نشد",
        description: "صفحه مورد نظر یافت نشد",
      };
    }

    const fullName = profileData.data?.kyc?.fname
      ? `${profileData.data.kyc.fname} ${profileData.data.kyc.lname}`
      : profileData.data.name || "Citizen";

    return {
      title:
        lang === "fa"
          ? `کاربری‌های ${fullName}`
          : `Feature summary of ${fullName}`,
      description:
        lang === "fa"
          ? "خلاصه کاربری‌های ملک به تفکیک نوع"
          : "Citizen property feature (karbari) summary by type",
      alternates: {
        canonical: `https://metarang.com/${lang}/citizens/${id}/features-summary`,
        languages: {
          "fa-IR": `https://metarang.com/fa/citizens/${id}/features-summary`,
          "en-US": `https://metarang.com/en/citizens/${id}/features-summary`,
          "x-default": `https://metarang.com/fa/citizens/${id}/features-summary`,
        },
      },
    };
  } catch {
    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}
