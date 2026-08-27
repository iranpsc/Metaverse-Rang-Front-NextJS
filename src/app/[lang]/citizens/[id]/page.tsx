import dynamic from "next/dynamic";
import { Suspense } from "react";

import NotFoundPage from "@/components/error/NotFoundPage";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";

import ProfileSectionSkeleton from "@/components/skeleton/ProfileSectionSkeleton";
import ProfileData from "@/components/features/profile/ProfileContent";

import {
  getTranslation,
  getMainFile,
  getLangArray,
} from "@/components/utils/actions";
import { buildSidebarLabels } from "@/components/utils/buildShellTranslations";

import { getStaticMenu } from "@/components/utils/constants";
import { buildTabsMenu } from "@/components/utils/buildTabsMenu";

// lazy sidebar
const SideBar = dynamic(
  () => import("@/components/shared/sidebar/SideBar")
);

/* ------------------------------------------------------------------ */
/*                               TYPES                                */
/* ------------------------------------------------------------------ */

interface CitizenSinglePageProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

/* ------------------------------------------------------------------ */
/*                                PAGE                                */
/* ------------------------------------------------------------------ */

export default async function CitizenSinglePage({
  params,
}: CitizenSinglePageProps) {
  const resolvedParams = await params;
  const { lang, id } = resolvedParams;

  try {
    /* -------------------------------------------------------------- */
    /*                         BASIC DATA                             */
    /* -------------------------------------------------------------- */

    const [langData, langArray] = await Promise.all([
      getTranslation(lang),
      getLangArray(),
    ]);

    /* -------------------------------------------------------------- */
    /*                           MAIN DATA                             */
    /* -------------------------------------------------------------- */

    const mainData = await getMainFile(langData);
    const sidebarLabels = buildSidebarLabels(mainData);

    /* -------------------------------------------------------------- */
    /*                             MENUS                               */
    /* -------------------------------------------------------------- */

    const staticMenuToShow = getStaticMenu(resolvedParams);
    const updatedTabsMenu = buildTabsMenu(mainData, staticMenuToShow);

    /* -------------------------------------------------------------- */
    /*                              RENDER                             */
    /* -------------------------------------------------------------- */

    return (
      <main
        className="flex h-screen w-full"
        dir={langData.direction}
      >
        <div className="relative w-full overflow-y-scroll lg:overflow-hidden mt-[60px] lg:mt-0 xs:px-1">
          <CleanAutoRetryParam />

          <div
            className="flex h-full"
            dir={langData.direction}
          >
            {/* ------------------------------------------------------ */}
            {/*                         SIDEBAR                         */}
            {/* ------------------------------------------------------ */}

            <Suspense fallback={<div>Loading menu...</div>}>
              <SideBar
                tabsMenu={updatedTabsMenu}
                langData={langData}
                langArray={langArray}
                params={resolvedParams}
                pageSide="citizen"
                sidebarLabels={sidebarLabels}
              />
            </Suspense>

            {/* ------------------------------------------------------ */}
            {/*                         PROFILE                         */}
            {/* ------------------------------------------------------ */}

            <section className="relative w-full bg-bg-primary flex flex-col lg:flex-row gap-[10px] p-[8px]">
              <Suspense
                fallback={<ProfileSectionSkeleton />}
              >
                <ProfileData
                  id={id}
                  lang={lang}
                  params={resolvedParams}
                  langData={langData}
                  mainData={mainData}
                  // langArray={langArray}
                />
              </Suspense>
            </section>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    const serializedError = {
      message:
        error instanceof Error
          ? error.message
          : "Unknown error",

      stack:
        error instanceof Error
          ? error.stack
          : null,

      name:
        error instanceof Error
          ? error.name
          : "Error",
    };

    console.error(
      "❌ Error in CitizenSinglePage:",
      serializedError
    );

    return (
      <CustomErrorPage
        error={serializedError}
      />
    );
  }
}

/* ------------------------------------------------------------------ */
/*                              SEO META                               */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}) {
  const { lang, id } = await params;

  try {
    /*
     * توجه:
     * generateMetadata جدا از page اجرا می‌شود.
     * بنابراین اینجا getUserData همچنان لازم است.
     */

    const {
      getUserData,
    } = await import(
      "@/components/utils/actions"
    );

    const profileData = await getUserData(id);

    if (!profileData?.data) {
      return {
        title: "صفحه یافت نشد",
        description: "شهروند مورد نظر پیدا نشد",
      };
    }

    const description =
      profileData.data?.customs?.about?.slice(
        0,
        160
      ) || "";

    const fullName =
      profileData.data?.kyc?.fname
        ? `${profileData.data.kyc.fname} ${
            profileData.data.kyc.lname || ""
          }`.trim()
        : profileData.data.name || "Citizen";

    return {
      title: `${fullName} | ${profileData.data.code}`,

      description,

      alternates: {
        canonical: `https://metarang.com/${lang}/citizens/${id}`,

        languages: {
          "fa-IR":
            `https://metarang.com/fa/citizens/${id}`,

          "en-US":
            `https://metarang.com/en/citizens/${id}`,

          "x-default":
            `https://metarang.com/fa/citizens/${id}`,
        },
      },

      openGraph: {
        type: "profile",

        title: fullName,

        description,

        locale:
          lang === "fa"
            ? "fa_IR"
            : "en_US",

        url:
          `https://metarang.com/${lang}/citizens/${id}`,

        images: [
          {
            url:
              profileData.data?.profilePhotos?.[0]
                ?.url || "/logo.png",

            width: 800,

            height: 600,
          },
        ],
      },
    };
  } catch {
    return {
      title: "خطا",

      description:
        "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}