import Profile from "@/components/templates/Profile";
import ProfileAbout from "@/components/module/profile/ProfileAbout";
import ProfileDetails from "@/components/module/profile/ProfileDatails";
import { getTranslation, getMainFile, findByModalName, findByTabName, getLangArray, getUserData } from "@/components/utils/actions";
import SideBar from "@/components/module/sidebar/SideBar";
import { getStaticMenu } from "@/components/utils/constants";
import NotFound from "@/components/shared/NotFoundPage";

export default async function citizenSinglePage({ params }) {
  // گرفتن داده‌های اصلی و ترجمه‌ها
  const [profileData, langData] = await Promise.all([
    getUserData(params.id),
    getTranslation(params.lang),
  ]);

  // گرفتن داده‌های ثابت مثل mainData و langArray
  const [mainData, langArray] = await Promise.all([
    getMainFile(langData),
    getLangArray(),
  ]);

  // فرض: footerTabs از mainData استخراج می‌شود
  const footerTabs = mainData.footerTabs || [];

  // پیدا کردن modal اصلی و تب‌ها
  const centralPageModal = await findByModalName(mainData, "Citizenship-profile");
  const tabsMenu = await findByTabName(centralPageModal, "menu");

  // گرفتن منوی استاتیک برای پارامترهای ورودی
  const staticMenuToShow = getStaticMenu(params);

  // آپدیت تب‌ها با مقادیر منوی استاتیک
  const updatedTabsMenu = tabsMenu.map((tab) => {
    const findInStatic = staticMenuToShow.find((val) => tab.unique_id === val.unique_id);
    if (findInStatic) {
      return {
        ...tab,
        url: findInStatic.url,
        order: findInStatic.order,
        toShow: true,
      };
    }
    return tab;
  });

  // اگر اطلاعات پروفایل پیدا نشد، صفحه 404 با تمام پراپس‌ها نمایش بده
  if (!profileData || !profileData.code) {
    return (
      <NotFound
        lang={params.lang}
        params={params}
        langData={langData}
        langArray={langArray}
        updatedTabsMenu={updatedTabsMenu}
        footerTabs={footerTabs}
        mainData={mainData}
      />
    );
  }

  // ادامه استخراج داده‌ها برای رندر صفحه اصلی
  const modalsProfile = mainData.modals.find(modal => modal.name === "Citizenship-profile")?.tabs || [];

  const userProperty = modalsProfile.find(tab => tab.name === "home")?.fields || [];

  let titleData = "";
  let nameUser = "";
  let nameSite = "";
  let localSite = "fa_IR";

  if (params.lang === "fa") {
    nameSite = "متاورس رنگ";
    localSite = "fa_IR";
    if (profileData.kyc?.fname) {
      nameUser = `${profileData.kyc.fname} ${profileData.kyc.lname}`;
      titleData = `${profileData.kyc.fname} ${profileData.kyc.lname} | ${profileData.code}`;
    } else if (profileData.name) {
      titleData = `${profileData.name} | ${profileData.code}`;
      nameUser = `${profileData.name}`;
    } else {
      titleData = "متاورس رنگ";
    }
  } else if (params.lang === "en") {
    localSite = "en-US";
    nameSite = "Metaverse Rgb";
    if (profileData.name) {
      titleData = `${profileData.name} | ${profileData.code}`;
      nameUser = `${profileData.name}`;
    } else if (profileData.kyc?.fname) {
      nameUser = `${profileData.kyc.fname} ${profileData.kyc.lname}`;
      titleData = `${profileData.kyc.fname} ${profileData.kyc.lname} | ${profileData.code}`;
    } else {
      titleData = "Metaverse Rgb";
    }
  }

  async function makeLessCharacter() {
    let temp = "";
    if (profileData.customs?.about) {
      temp = profileData.customs.about.slice(0, 200);
    }
    return temp;
  }

  const singleCitizenSchema = {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": profileData.name || "",
    "image": profileData.profilePhotos?.map(item => item.url) || [],
    "url": `http://rgb.irpsc.com/fa/citizen/${params.id}`,
    "jobTitle": profileData.customs?.occupation || "",
    "description": await makeLessCharacter(),
    "birthDate": profileData.kyc?.birth_date || "",
    "email": profileData.kyc?.email || "",
    "alternateName": profileData.code || "",
  };

  return (
    <>
      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(singleCitizenSchema) }}
      />
      {/* schema END */}
      <main className="flex h-screen dark:bg-black" dir={langData.direction}>
        <div className="relative overflow-y-scroll lg:overflow-hidden light-scrollbar dark:dark-scrollbar w-full xs:px-1 mt-[60px] lg:mt-0">
          <div className="flex h-full" dir={langData.direction}>
            <SideBar
              tabsMenu={updatedTabsMenu}
              langData={langData}
              langArray={langArray}
              params={params}
              pageSide="citizen"
            />
            <section className="relative w-full bg-[#e9eef8] dark:bg-black">
              <div className="flex flex-col lg:flex-row h-fit lg:h-full gap-[10px] p-[8px]">
                {/* FIRST */}
                <section className="w-full h-fit lg:h-full gap-[6px] lg:w-[35%] flex flex-col no-scrollbar overflow-auto">
                  <Profile
                    profileData={profileData}
                    titleData={titleData}
                    langData={langData}
                    nameUser={nameUser}
                    mainData={mainData}
                    params={params}
                  />
                </section>
                {/* SECOND */}
                <section className="w-full h-fit lg:h-full lg:w-[35%] flex flex-col no-scrollbar overflow-auto sm:h-fit xs:h-fit md:h-fit">
                  <ProfileDetails
                    profileData={profileData}
                    mainData={mainData}
                  />
                </section>
                {/* THIRD */}
                <section className="w-full h-fit lg:h-full lg:w-[30%] flex flex-col no-scrollbar overflow-auto">
                  <ProfileAbout
                    profileData={profileData}
                    mainData={mainData}
                    titleData={titleData}
                    params={params}
                  />
                </section>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

// SEO
export async function generateMetadata({ params }) {
  const profileData = await getUserData(params.id);

  if (!profileData) {
    return {
      title: "User Not Found",
      description: "The requested user does not exist.",
      openGraph: {
        title: "User Not Found",
        description: "The requested user does not exist.",
        url: `https://rgb.irpsc.com/${params.lang}/citizen/${params.id}`,
        locale: params.lang === "fa" ? "fa_IR" : "en_US",
      },
    };
  }

  async function makeLessCharacter() {
    let temp = "";
    if (profileData.customs?.about) {
      temp = profileData.customs.about.slice(0, 200);
    }
    return temp;
  }

  return {
    title: `${profileData.kyc?.fname || ""} ${profileData.kyc?.lname || "citizen"}`,
    description: await makeLessCharacter(),
    openGraph: {
      type: "profile",
      title: profileData.name || "",
      description: await makeLessCharacter(),
      locale: params.lang === "fa" ? "fa_IR" : "en_US",
      url: `https://rgb.irpsc.com/${params.lang}/citizen/${params.id}`,
      profile: {
        first_name: profileData.name || "",
      },
      images: [
        {
          url: profileData.profilePhotos?.[0]?.url || "",
          width: 800,
          height: 600,
        },
      ],
    },
    other: {
      "google-site-verification": "lmf8kBJQgLHew_wXcxGQwJQWiOSFy8odEBRTLOoX7Q4",
    },
  };
}
