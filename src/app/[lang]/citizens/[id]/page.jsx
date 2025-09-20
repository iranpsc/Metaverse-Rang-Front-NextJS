import dynamic from "next/dynamic";
import { Suspense } from "react";
import NotFoundPage from "@/components/shared/NotFoundPage";

import Profile from "@/components/templates/Profile";
import ProfileAbout from "@/components/module/profile/ProfileAbout";
import ProfileDetails from "@/components/module/profile/ProfileDatails";
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getUserData,
} from "@/components/utils/actions";
import { getStaticMenu } from "@/components/utils/constants";

// داینامیک لود برای SideBar
const SideBar = dynamic(() => import("@/components/module/sidebar/SideBar"), {
  suspense: true,
});

export default async function citizenSinglePage({ params }) {
  try {
    const [profileData, langData, langArray] = await Promise.all([
      getUserData(params.id),
      getTranslation(params.lang),
      getLangArray(),
    ]);

    const mainData = await getMainFile(langData);

    // 🟢 منوی citizen
    const citizenModal = await findByModalName(mainData, "Citizenship-profile");
    const citizenTabsMenu = await findByTabName(citizenModal, "menu");

    // 🟢 منوی اصلی (before-login)
    const centralPageModal = await findByModalName(mainData, "central-page");
    const mainTabsMenu = await findByTabName(centralPageModal, "before-login");

    // 🟢 استاتیک منو
    const staticMenuToShow = getStaticMenu(params.lang);
    
    // تابعی برای آپدیت منو با staticMenu
    const mapMenu = (tabsMenu) =>
      tabsMenu.map((tab) => {
        const findInStatic = staticMenuToShow.find(
          (val) => tab.unique_id === val.unique_id
        );
        return findInStatic
          ? {
              ...tab,
              url: findInStatic.url,
              order: findInStatic.order,
              toShow: true,
            }
          : tab;
      });

    // 🟢 نهایی: ترکیب citizen + منوی اصلی
    const updatedTabsMenu = [
      ...mapMenu(citizenTabsMenu),
      ...mapMenu(mainTabsMenu),
    ];

    // اگر داده پیدا نشد → صفحه 404
    if (!profileData || !profileData.data) {
      return (
        <NotFoundPage
          lang={params.lang}
          params={params}
          langData={langData}
          langArray={langArray}
          updatedTabsMenu={updatedTabsMenu}
          footerTabs={[]}
          mainData={mainData}
        />
      );
    }

    // ساخت عنوان و نام کاربر
    let titleData = "";
    let nameUser = "";
    if (params.lang === "fa") {
      if (profileData.data?.kyc?.fname) {
        nameUser = `${profileData.data.kyc.fname} ${profileData.data.kyc.lname}`;
        titleData = `${nameUser} | ${profileData.data.code}`;
      } else if (profileData.data.name) {
        titleData = `${profileData.data.name} | ${profileData.data.code}`;
        nameUser = `${profileData.data.name}`;
      } else {
        titleData = "متاورس رنگ";
      }
    } else {
      if (profileData.data.name) {
        titleData = `${profileData.data.name} | ${profileData.data.code}`;
        nameUser = `${profileData.data.name}`;
      } else if (profileData.data?.kyc?.fname) {
        nameUser = `${profileData.data.kyc.fname} ${profileData.data.kyc.lname}`;
        titleData = `${nameUser} | ${profileData.data.code}`;
      } else {
        titleData = "Metaverse Rgb";
      }
    }

    const makeLessCharacter = () =>
      profileData.data?.customs?.about
        ? profileData.data.customs.about.slice(0, 200)
        : "";

    const singleCitizenSchema = {
      "@context": "https://schema.org/",
      "@type": "Person",
      name: `${profileData.data.name}`,
      image: profileData.data?.profilePhotos?.map((item) => item.url),
      url: `https://rgb.irpsc.com/fa/citizens/${params.id}`,
      jobTitle: `${profileData.data?.customs?.occupation}`,
      description: `${makeLessCharacter()}`,
      birthDate: `${profileData.data?.kyc?.birth_date}`,
      email: `${profileData.data?.kyc?.email}`,
      alternateName: `${profileData.data.code}`,
    };

    return (
      <>
        <head>
          <link
            rel="canonical"
            href={`https://rgb.irpsc.com/${params.lang}/citizens/${params.id}`}
          />
          <link
            rel="alternate"
            hrefLang="x-default"
            href={`https://rgb.irpsc.com/fa/citizens/${params.id}`}
          />
          <link
            rel="alternate"
            hrefLang="fa-IR"
            href={`https://rgb.irpsc.com/fa/citizens/${params.id}`}
          />
          <link
            rel="alternate"
            hrefLang="en-US"
            href={`https://rgb.irpsc.com/en/citizens/${params.id}`}
          />
        </head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(singleCitizenSchema),
          }}
        />
        <main
          className="flex h-screen dark:bg-black w-full"
          dir={langData.direction}
        >
          <div className="relative overflow-y-scroll lg:overflow-hidden w-full xs:px-1 mt-[60px] lg:mt-0">
            <div className="flex h-full" dir={langData.direction}>
              <Suspense fallback={<div>Loading...</div>}>
                <SideBar
                  tabsMenu={updatedTabsMenu}
                  langData={langData}
                  langArray={langArray}
                  params={params}
                  pageSide="citizen"
                />
              </Suspense>
              <section className="relative w-full bg-[#e9eef8] dark:bg-black flex flex-col lg:flex-row gap-[10px] p-[8px]">
                <section className="lg:w-[35%] flex flex-col lg:overflow-auto">
                  <Profile
                    profileData={profileData}
                    titleData={titleData}
                    langData={langData}
                    nameUser={nameUser}
                    mainData={mainData}
                    params={params}
                  />
                </section>
                <section className="lg:w-[35%] flex flex-col ">
                  <ProfileDetails
                    profileData={profileData}
                    mainData={mainData}
                  />
                </section>
                <section className="lg:w-[30%] flex flex-col lg:overflow-auto">
                  <ProfileAbout
                    profileData={profileData}
                    mainData={mainData}
                    titleData={titleData}
                    params={params}
                  />
                </section>
              </section>
            </div>
          </div>
        </main>
      </>
    );
  } catch (error) {
    return <div className="p-5 text-red-500">خطا: {String(error)}</div>;
  }
}

// SEO
export async function generateMetadata({ params }) {
  try {
    const profileData = await getUserData(params.id);

    if (!profileData || !profileData.data) {
      return {
        title: "صفحه یافت نشد",
        description: "شهروند مورد نظر پیدا نشد",
      };
    }

    const makeLessCharacter = () =>
      profileData.data?.customs?.about
        ? profileData.data.customs.about.slice(0, 200)
        : "";

    return {
      title: `${
        profileData.data?.kyc?.fname || ""
      } ${profileData.data?.kyc?.lname || "citizen"}`,
      description: makeLessCharacter() || "about citizen",
      alternates: {
        canonical: `https://rgb.irpsc.com/${params.lang}/citizens/${params.id}`,
        languages: {
          "x-default": `https://rgb.irpsc.com/fa/citizens/${params.id}`,
          "fa-IR": `https://rgb.irpsc.com/fa/citizens/${params.id}`,
          "en-US": `https://rgb.irpsc.com/en/citizens/${params.id}`,
        },
      },
      openGraph: {
        type: "profile",
        title: `${profileData.data?.name || ""}`,
        description: makeLessCharacter(),
        locale: params.lang === "fa" ? "fa_IR" : "en_US",
        url: `https://rgb.irpsc.com/${params.lang}/citizens/${params.id}`,
        profile: {
          first_name: `${profileData.data?.name || ""}`,
        },
        images: [
          {
            url: `${
              profileData.data?.profilePhotos?.[0]?.url || "/default.jpg"
            }`,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch {
    return {
      title: "صفحه یافت نشد",
      description: "شهروند مورد نظر پیدا نشد",
    };
  }
}
