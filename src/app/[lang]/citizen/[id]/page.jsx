import Head from "next/head";

import Profile from "@/components/templates/Profile";
import ProfileAbout from "@/components/module/profile/ProfileAbout";
// import { LangContext } from "@/context/LangContext";
// import ModalCard from "@/templates/ModalCard";
import { DefaultSeo } from "next-seo";
// import StaticMobileMenu from "@/components/module/StaticMobileMenu";
// import ShredPage from "@/components/templates/ShredPage";
import { AnimatePresence } from "framer-motion";
import ProfileDetails from "@/components/module/profile/ProfileDatails";
// import LogoutPage from "@/components/templates/LogoutPage";
import { getTransletion, getMainFile } from "@/components/utils/actions";
import { log } from "console";

export default async function citizenSinglePage({
  params,
}) {
  const userId = params.id;
  //FETCH::
  async function getUserData() {
    try {
      const res = await fetch(
        `https://api.rgb.irpsc.com/api/citizen/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const temp = await res.json();

      return temp;
    } catch (err) {
      // در صورت وجود خطا
      return { props: { error: "خطا در دریافت داده‌ها" } };
    }
  }

  const profileData = await getUserData();

  const langData = await getTransletion(params.lang);
  const mainData = await getMainFile(langData);

  const modalsProfile = mainData.modals.find(
    (modal) => modal.name === "Citizenship-profile"
  ).tabs;

  const userProperty = modalsProfile.find(
    (tabs) => tabs.name === "home"
  ).fields;


  let titleData = "";
  let nameUser = "";
  let nameSite = "";
  let localSite = "fa_IR";

  if (params.lang === "fa") {
    nameSite = "متاورس رنگ";
    localSite = "fa_IR";
    if (profileData.data.kyc?.fname) {
      nameUser = `${profileData.data.kyc.fname} ${profileData.data.kyc.lname}`;
      titleData = `${profileData.data.kyc.fname} ${profileData.data.kyc.lname} | ${profileData.data.code}`;
    } else if (profileData.data.name) {
      titleData = `${profileData.data.name} | ${profileData.data.code}`;
      nameUser = `${profileData.data.name} `;
    } else {
      titleData = "متاورس رنگ";
    }
  } else if (params.lang === "en") {
    localSite = "en-US";
    nameSite = "Metaverse Rgb";
    if (profileData.data.name) {
      titleData = `${profileData.data.name} | ${profileData.data.code}`;
      nameUser = `${profileData.data.name} `;
    } else {
      titleData = "Metaverse Rgb";
    }
  }
  function addPageJsonLd() {
    return {
      __html: `{
        "@context": "http://schema.org",
  "@type": "JobPosting",
  "title": "سطح 4",
  "image": "https://uni.irpsc.com/wp-content/uploads/2022/01/gem4.jpg",
  "description": "توسعه دهنده",
  "datePosted": "2023-02-01",
  "validThrough": "2023-02-01",
  "employmentType": "Full-Time",
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "PSC",
    "value": {
      "@type": "QuantitativeValue",
      "value": 10,
      "unitText": "PSC"
    }
  },
  "hiringOrganization": {
    "@type": "Organization",
    "name": "سازمان متاورس ملی | متارنگ"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "استان قزوین، قزوین، میرداماد، 824H+JG2،",
      "addressLocality": "قزوین",
      "addressRegion": "Asia and the Pacific",
      "postalCode": "3415836589",
      "addressCountry": "fa"
    }
  }
      }`,
    };
  }

  return (
    <>
      <section className=" h-screen relative w-full">
        {/* <AnimatePresence>
          {showLogOut && (
          <LogoutPage showLogOut={showLogOut} setShowLogOut={setShowLogOut} />
          )}
        </AnimatePresence> */}

        {/* <AnimatePresence>
          {showSharedPage && (
          <ShredPage
                showSharedPage={showSharedPage}
                setShowSharedPage={setShowSharedPage}
                profileData.data={profileData.data}
            />
          )}
        </AnimatePresence> */}

        {/* <AnimatePresence>
          {showModal && (
          <ModalCard
            showModal={showModal}
            setShowModal={setShowModal}
            dataModal={dataModal}
            titleData={titleData}
          />
          )}
        </AnimatePresence> */}
        <Head>
          {/* <title>{titleData}</title> */}
          <meta name="description" content="job" key="desc" />
          <meta
            name="google-site-verification"
            content="lmf8kBJQgLHew_wXcxGQwJQWiOSFy8odEBRTLOoX7Q4"
          />
          <link rel="icon" href="/logo.png" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={addPageJsonLd()}
            key="job-jsonld"
          />
        </Head>

        <div className=" xl:hidden lg:hidden md:visible sm:visible xs:visible w-full h-fit absolute bottom-0 z-40">
          <div className="w-full h-fit dark:bg-black bg-white absolute bottom-0 shadow-3xl">
            {/* <StaticMobileMenu /> */}
          </div>
        </div>

        {/* ${showModal || showSharedPage ? "" : ""} DOWNNN  */}
        <div
          className={`flex flex-col lg:flex-row`}>
            {/* FIRST */}
          <section
            className="w-full lg:w-[40%] flex flex-col no-scrollbar overflow-auto lg:h-screen md:h-fit sm:h-fit xs:h-fit dark:bg-black bg-[#e9eef8] 3xl:p-[12px] xl:p-[6px] lg:p-[4px] md:p-[6px] sm:p-[4px] xs:p-[4px] gap-2"
          >
            <Profile
              profileData={profileData}
              titleData={titleData}
              langData={langData}
              nameUser={nameUser}
              userProperty={userProperty}
              params={params}
            />
          </section>
          {/* SECOND */}
          <section
            className="w-full lg:w-[30%] flex flex-col no-scrollbar overflow-auto 3xl:h-screen xl:h-screen lg:h-screen sm:h-fit xs:h-fit md:h-fit dark:bg-black bg-[#e9eef8] 3xl:px-[0px] 3xl:py-[12px] xl:px-[0px] xl:py-[6px] lg:p-[4px] md:p-[6px] sm:p-[2px] xs:p-[2px]"
          >
            <ProfileDetails
              profileData={profileData}
              userProperty={userProperty}
            />
          </section>
          {/* THIRD */}
          <section
            className="w-full lg:w-[30%] flex flex-col no-scrollbar overflow-auto h-screen dark:bg-black md:h-screen bg-[#e9eef8] 3xl:p-[12px] xl:p-[6px] lg:p-[4px] md:p-[6px] sm:p-[2px] xs:p-[2px]"
          >
            <ProfileAbout
              profileData={profileData}
              userProperty={userProperty}
              titleData={titleData}
              params={params}
            />
          </section>
        </div>
      </section>
    </>
  );
}
