import SideBar from "@/components/module/sidebar/SideBar";
import BreadCrumb from "@/components/shared/BreadCrumb";
import NotFoundPage from "@/components/shared/NotFoundPage";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import InviteBox from "./components/invite-box";
import InviteList from "./components/invite-list";
import InviteChart from "./components/invite-chart";

import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam from "@/components/shared/CleanAutoRetryParam";

import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getFooterData,
  getAllReferral,
  getUserData,
  getChartReferral,
} from "@/components/utils/actions";

import { getStaticMenu } from "@/components/utils/constants";
import "./style/style.css";

/* ------------------------------------------------------------------ */
/*                                TYPES                               */
/* ------------------------------------------------------------------ */
interface CitizenReferralProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

/* ------------------------------------------------------------------ */
/*                                PAGE                                */
/* ------------------------------------------------------------------ */
export default async function CitizenReferral({
  params,
}: CitizenReferralProps) {
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
      const citizenTabs =
        (await findByTabName(citizenModal, "menu")) || [];

      const centralModal = await findByModalName(
        mainData,
        "central-page"
      );
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

      const merged = [
        ...mapMenu(citizenTabs),
        ...mapMenu(mainTabs),
      ];

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

      const updatedTabsMenu = await buildUpdatedTabsMenu(mainData);

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
    const [
      mainData,
      langArray,
      initInviteList,
      footerTabs,
      chartDataFetch,
    ] = await Promise.all([
      getMainFile(langData),
      getLangArray(),
      getAllReferral(id),
      getFooterData(resolvedParams),
      getChartReferral(id, "yearly"),
    ]);

    const updatedTabsMenu = await buildUpdatedTabsMenu(mainData);

    const referralPageArrayContent = await findByTabName(
      await findByModalName(mainData, "Citizenship-profile"),
      "referral"
    );

    /* -------------------------- chart data --------------------------- */
    const convertToPersianDigits = (str: any) =>
      str?.toString()?.replace(/\d/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹"[d]);

    let initChartData = { labels: [], data: [[], []] };

    if (chartDataFetch?.chart_data) {
      initChartData.labels = chartDataFetch.chart_data.map((i: any) =>
        convertToPersianDigits(i.year)
      );
      initChartData.data[0] = chartDataFetch.chart_data.map(
        (i: any) => i.total_referrals_count
      );
      initChartData.data[1] = chartDataFetch.chart_data.map(
        (i: any) => i.total_referral_orders_amount
      );
    }

    /* ----------------------------- schema ---------------------------- */
    const aboutText =
      profileData.data?.customs?.about?.slice(0, 200) || "";

    const citizenReferralSchema = {
      "@context": "https://schema.org/",
      "@type": "Person",
      name:
        profileData.data?.name ||
        `${profileData.data?.kyc?.fname || ""} ${
          profileData.data?.kyc?.lname || ""
        }`,
      image:
        profileData.data?.profilePhotos?.map((p: any) => p.url) || [],
      url: `https://metarang.com/${lang}/citizens/${id}/referral`,
      jobTitle: profileData.data?.customs?.occupation || "",
      description: aboutText,
      birthDate: profileData.data?.kyc?.birth_date || "",
      email: profileData.data?.kyc?.email || "",
      alternateName: profileData.data?.code || "",
    };

    /* ----------------------------- render ---------------------------- */
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(citizenReferralSchema),
          }}
        />

        <CleanAutoRetryParam />

        <div className="flex h-screen overflow-hidden" dir={langData.direction}>
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
              {referralPageArrayContent && (
                <InviteBox
                  referralPageArrayContent={referralPageArrayContent}
                  params={resolvedParams}
                  mainData={mainData}
                />
              )}

              {initInviteList && referralPageArrayContent && (
                <InviteList
                  initInviteList={initInviteList}
                  params={resolvedParams}
                  referralPageArrayContent={referralPageArrayContent}
                  mainData={mainData}
                />
              )}

              {referralPageArrayContent && (
                <InviteChart
                  params={resolvedParams}
                  referralPageArrayContent={referralPageArrayContent}
                  initChartData={initChartData}
                  mainData={mainData}
                />
              )}
            </div>

            <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
              <DynamicFooter
                footerTabs={footerTabs}
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
      message:
        error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : null,
      name: error instanceof Error ? error.name : "Error",
    };

    console.error("❌ Error in CitizenReferral:", serializedError);
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

    const fullName =
      profileData.data?.kyc?.fname
        ? `${profileData.data.kyc.fname} ${profileData.data.kyc.lname}`
        : profileData.data.name || "Citizen";

    const description =
      profileData.data?.customs?.about?.slice(0, 160) ||
      "Citizen referral page";

    return {
      title:
        lang === "fa"
          ? `دعوتی‌های ${fullName}`
          : `Invites of ${fullName}`,
      description,
      alternates: {
        canonical: `https://metarang.com/${lang}/citizens/${id}/referral`,
        languages: {
          "fa-IR": `https://metarang.com/fa/citizens/${id}/referral`,
          "en-US": `https://metarang.com/en/citizens/${id}/referral`,
          "x-default": `https://metarang.com/fa/citizens/${id}/referral`,
        },
      },
      openGraph: {
        type: "profile",
        title:
          lang === "fa"
            ? `دعوتی‌های ${fullName}`
            : `Invites of ${fullName}`,
        description,
        locale: lang === "fa" ? "fa_IR" : "en_US",
        url: `https://metarang.com/${lang}/citizens/${id}/referral`,
        images: [
          {
            url:
              profileData.data?.profilePhotos?.[0]?.url || "/logo.png",
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch {
    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}