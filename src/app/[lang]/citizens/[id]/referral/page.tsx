// app/[lang]/citizens/[id]/referral/page.tsx
import { Suspense } from "react";
import SideBar from "@/components/shared/sidebar/SideBar";
import BreadCrumb from "@/components/shared/BreadCrumb";
import NotFoundPage from "@/components/error/NotFoundPage";
import DynamicFooter from "@/components/shared/footer/DynamicFooter";
import InviteBox from "@/components/templates/referral/invite-box";

import InviteListLoader from "@/components/templates/referral/InviteListLoader";
import InviteChartLoader from "@/components/templates/referral/InviteChartLoader";
import InviteListSkeleton from "@/components/skeleton/InviteListSkeleton";
import InviteChartSkeleton from "@/components/skeleton/InviteChartSkeleton";

import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";

import {
  getTranslation,
  getMainFile,
  getLangArray,
  getUserData,
} from "@/components/utils/actions";
import { buildSidebarLabels } from "@/components/utils/buildShellTranslations";

import { getStaticMenu } from "@/components/utils/constants";
import { buildTabsMenu } from "@/components/utils/buildTabsMenu";
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
            sidebarLabels={sidebarLabels}
          />

          <section className="relative w-full overflow-y-auto mt-[60px] lg:mt-0 bg-bg-primary  px-2 light-scrollbar dark:dark-scrollbar">
            <div className="px-12">
              <BreadCrumb params={resolvedParams} />
            </div>

            <div className="xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1">
              <InviteBox
                referralPageArrayContent={mainData}
                params={resolvedParams}
                mainData={mainData}
              />

              <Suspense fallback={<InviteListSkeleton />}>
                <InviteListLoader
                  id={id}
                  params={resolvedParams}
                  referralPageArrayContent={mainData}
                  mainData={mainData}
                />
              </Suspense>

              <Suspense fallback={<InviteChartSkeleton />}>
                <InviteChartLoader
                  id={id}
                  params={resolvedParams}
                  referralPageArrayContent={mainData}
                  mainData={mainData}
                />
              </Suspense>
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