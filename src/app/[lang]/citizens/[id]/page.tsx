import dynamic from "next/dynamic";
import { Suspense } from "react";

import NotFoundPage from "@/components/error/NotFoundPage";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";

import Profile from "@/components/templates/Profile";
import ProfileAbout from "@/components/features/profile/ProfileAbout";
import ProfileDetails from "@/components/features/profile/ProfileDatails";

import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getUserData,
} from "@/components/utils/actions";

import { getStaticMenu } from "@/components/utils/constants";

// lazy sidebar
const SideBar = dynamic(
  () => import("@/components/shared/sidebar/SideBar"),
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
    /* --------------------------- fetch data -------------------------- */
    const [profileData, langData, langArray] = await Promise.all([
      getUserData(id),
      getTranslation(lang),
      getLangArray(),
    ]);

    const mainData = await getMainFile(langData);

    /* ------------------------------ menus ----------------------------- */
    const citizenModal = await findByModalName(
      mainData,
      "Citizenship-profile"
    );
    const citizenTabsMenu = await findByTabName(citizenModal, "menu");

    const centralPageModal = await findByModalName(
      mainData,
      "central-page"
    );
    const mainTabsMenu = await findByTabName(
      centralPageModal,
      "before-login"
    );

    const staticMenuToShow = getStaticMenu(resolvedParams);

    const mapMenu = (tabsMenu: any[]) =>
      tabsMenu.map((tab) => {
        const staticItem = staticMenuToShow.find(
          (item) => item.unique_id === tab.unique_id
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

    const mergedTabs = [
      ...mapMenu(citizenTabsMenu),
      ...mapMenu(mainTabsMenu),
    ];

    const seen = new Set();
    const updatedTabsMenu = mergedTabs.filter((tab) => {
      if (seen.has(tab.unique_id)) return false;
      seen.add(tab.unique_id);
      return true;
    });

    /* ---------------------------- not found --------------------------- */
    if (!profileData?.data) {
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

    /* ------------------------ title & username ------------------------ */
    let titleData = "";
    let nameUser = "";

    if (lang === "fa") {
      if (profileData.data?.kyc?.fname) {
        nameUser = `${profileData.data.kyc.fname} ${profileData.data.kyc.lname}`;
        titleData = `${nameUser} | ${profileData.data.code}`;
      } else if (profileData.data.name) {
        nameUser = profileData.data.name;
        titleData = `${nameUser} | ${profileData.data.code}`;
      } else {
        titleData = "متاورس رنگ";
      }
    } else {
      if (profileData.data.name) {
        nameUser = profileData.data.name;
        titleData = `${nameUser} | ${profileData.data.code}`;
      } else if (profileData.data?.kyc?.fname) {
        nameUser = `${profileData.data.kyc.fname} ${profileData.data.kyc.lname}`;
        titleData = `${nameUser} | ${profileData.data.code}`;
      } else {
        titleData = "Metaverse RGB";
      }
    }

    const makeLessCharacter = () =>
      profileData.data?.customs?.about
        ? profileData.data.customs.about.slice(0, 200)
        : "";

    /* ------------------------------- schema --------------------------- */
    const singleCitizenSchema = {
      "@context": "https://schema.org/",
      "@type": "Person",
      name: nameUser,
      image: profileData.data?.profilePhotos?.map((p: { url: any; }) => p.url),
      url: `https://metarang.com/${lang}/citizens/${id}`,
      jobTitle: profileData.data?.customs?.occupation,
      description: makeLessCharacter(),
      birthDate: profileData.data?.kyc?.birth_date,
      email: profileData.data?.kyc?.email,
      alternateName: profileData.data.code,
    };

    /* ------------------------------- render --------------------------- */
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(singleCitizenSchema),
          }}
        />

        <main
          className="flex h-screen w-full dark:bg-black"
          dir={langData.direction}
        >
          <div className="relative w-full overflow-y-scroll lg:overflow-hidden mt-[60px] lg:mt-0 xs:px-1">
            <CleanAutoRetryParam />

            <div className="flex h-full" dir={langData.direction}>
              <Suspense fallback={<div>Loading menu...</div>}>
                <SideBar
                  tabsMenu={updatedTabsMenu}
                  langData={langData}
                  langArray={langArray}
                  params={resolvedParams}
                  pageSide="citizen"
                  mainData={mainData}
                />
              </Suspense>

              <section className="relative w-full bg-[#e9eef8] dark:bg-black flex flex-col lg:flex-row gap-[10px] p-[8px]">
                <section className="lg:w-[35%] flex flex-col lg:overflow-auto light-scrollbar dark:dark-scrollbar">
                  <Profile
                    profileData={profileData}
                    titleData={titleData}
                    langData={langData}
                    nameUser={nameUser}
                    mainData={mainData}
                    params={resolvedParams}
                  />
                </section>

                <section className="lg:w-[35%] flex flex-col lg:overflow-auto light-scrollbar dark:dark-scrollbar">
                  <ProfileDetails
                    profileData={profileData}
                    mainData={mainData}
                  />
                </section>

                <section className="lg:w-[30%] flex flex-col lg:overflow-auto light-scrollbar dark:dark-scrollbar">
                  <ProfileAbout
                    profileData={profileData}
                    mainData={mainData}
                    titleData={titleData}
                    params={resolvedParams}
                  />
                </section>
              </section>
            </div>
          </div>
        </main>
      </>
    );
  } catch (error) {
    const serializedError = {
      message:
        error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : null,
      name: error instanceof Error ? error.name : "Error",
    };

    console.error("❌ Error in CitizenSinglePage:", serializedError);
    return <CustomErrorPage error={serializedError} />;
  }
}

/* ------------------------------------------------------------------ */
/*                              SEO META                               */
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
        title: "صفحه یافت نشد",
        description: "شهروند مورد نظر پیدا نشد",
      };
    }

    const description =
      profileData.data?.customs?.about?.slice(0, 160) || "";

    const fullName =
      profileData.data?.kyc?.fname
        ? `${profileData.data.kyc.fname} ${profileData.data.kyc.lname}`
        : profileData.data.name || "Citizen";

    return {
      title: `${fullName} | ${profileData.data.code}`,
      description,
      alternates: {
        canonical: `https://metarang.com/${lang}/citizens/${id}`,
        languages: {
          "fa-IR": `https://metarang.com/fa/citizens/${id}`,
          "en-US": `https://metarang.com/en/citizens/${id}`,
          "x-default": `https://metarang.com/fa/citizens/${id}`,
        },
      },
      openGraph: {
        type: "profile",
        title: fullName,
        description,
        locale: lang === "fa" ? "fa_IR" : "en_US",
        url: `https://metarang.com/${lang}/citizens/${id}`,
        images: [
          {
            url:
              profileData.data?.profilePhotos?.[0]?.url ||
              "/logo.png",
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