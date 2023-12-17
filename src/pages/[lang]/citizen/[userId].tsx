import Head from "next/head";
import { useContext, useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import Profile from "@/templates/Profile";
import ProfileDetails from "@/templates/ProfileDatails";
import ProfileAbout from "@/templates/ProfileAbout";
import { LangContext } from "@/context/LangContext";
import ModalCard from "@/templates/ModalCard";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import axios from "axios";
import StaticMobileMenu from "@/components/module/StaticMobileMenu";
import ShredPage from "@/components/templates/ShredPage";
import { AnimatePresence } from "framer-motion";
import LogoutPage from "@/components/templates/LogoutPage";

export default function Home({ profileData, titleData,nameSite,localSite, error,nameUser }: any) {
  const { languageSelected } = useContext(LangContext);
  const router = useRouter();
  const { lang, userId } = router.query;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSharedPage, setShowSharedPage] = useState<boolean>(false);
  const [showLogOut, setShowLogOut] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState({ title: "", desc: "" });
   const [activeItem, SetActiveItem] = useState<number>(0);


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
      <DefaultSeo
        title={titleData}
        description={profileData?.customs?.about}
        openGraph={{
          title: titleData,
          locale: localSite,
          siteName: nameSite,
          description: `${profileData?.customs?.about}`,
          type: "Personal",
          url: `https://rgb.irpsc.com/en/citizen/${profileData?.code}`,
          images: [
            {
              url: `${
                profileData &&
                profileData.profilePhotos &&
                profileData.profilePhotos[0] &&
                profileData?.profilePhotos[0]?.url
              }`,
              alt: titleData,
            },
          ],
        }}
      />

      <section
        dir={languageSelected.dir}
        className=" overflow-clip h-screen relative   "
      >
        <AnimatePresence>
          {showLogOut && (
            <LogoutPage showLogOut={showLogOut} setShowLogOut={setShowLogOut} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSharedPage && (
            <ShredPage
              showSharedPage={showSharedPage}
              setShowSharedPage={setShowSharedPage}
              profileData={profileData}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showModal && (
            <ModalCard
              showModal={showModal}
              setShowModal={setShowModal}
              dataModal={dataModal}
              titleData={titleData}
            />
          )}
        </AnimatePresence>
        <Head>
          <title>{titleData}</title>
          <meta name="description" content="job" key="desc" />
          <meta
            name="google-site-verification"
            content="lmf8kBJQgLHew_wXcxGQwJQWiOSFy8odEBRTLOoX7Q4"
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={addPageJsonLd()}
            key="job-jsonld"
          />
        </Head>

        <BaseLayout
          profileData={profileData}
          error={error}
          titleData={titleData}
          setShowLogOut={setShowLogOut}
          activeItem={activeItem}
          SetActiveItem={SetActiveItem}
        >
          <div className=" xl:hidden lg:hidden md:visible sm:visible xs:visible w-full h-fit  fixed bottom-0 z-40">
            <div className="w-full h-fit dark:bg-black bg-[#fff] fixed bottom-0">
              <StaticMobileMenu
                activeItem={activeItem}
                SetActiveItem={SetActiveItem}
              />
            </div>
          </div>
          <div
            className={`xl:grid lg:grid xl:grid-auto ${
              showModal || showSharedPage ? "" : ""
            }  lg:grid-cols-12 xl:grid-cols-12  w-full md:flex md:flex-col relative sm:flex sm:flex-col
        sm:gap-5 xs:gap-5 xl:gap-0 lg:gap-0 md:gap-0
        `}
          >
            <section
              className="col-span-5 flex flex-col  3xl:h-screen xl:h-screen lg:h-screen md:h-fit sm:h-fit xs:h-fit dark:bg-black bg-[#e9eef8] 
            3xl:p-[12px]
            xl:p-[6px] 
            lg:p-[4px] 
            md:p-[6px]
            sm:p-[4px]
            xs:p-[4px]
                   "
            >
              <Profile
                profileData={profileData}
                titleData={titleData}
                setShowSharedPage={setShowSharedPage}
                nameUser={nameUser}
              />
            </section>
            <div
              className="col-span-4 flex flex-col 3xl:h-screen xl:h-screen lg:h-screen sm:h-fit xs:h-fit md:h-fit dark:bg-black bg-[#e9eef8]
             3xl:px-[0px] 3xl:py-[12px] 
             xl:px-[0px]   xl:py-[6px]
             lg:p-[4px]  
             md:p-[6px] 
             sm:p-[2px]
             xs:p-[2px]
                 "
            >
              <ProfileDetails
                setShowModal={setShowModal}
                setDataModal={setDataModal}
              />
            </div>
            <div
              className="col-span-3 flex flex-col h-screen dark:bg-black md:h-screen  bg-[#e9eef8] 
            3xl:p-[12px]
            xl:p-[6px] 
            lg:p-[4px] 
            md:p-[6px]
            sm:p-[2px] 
            xs:p-[2px]
            "
            >
              <ProfileAbout
                setShowModal={setShowModal}
                setDataModal={setDataModal}
                profileData={profileData}
              />
            </div>
          </div>
        </BaseLayout>
      </section>
    </>
  );
}



export async function getServerSideProps(context:any) {
  try {
    const userId = context.query.userId;

    // درخواست به API
    const res = await axios.get(
      `https://api.rgb.irpsc.com/api/citizen/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // استخراج profileData
    const profileData = res.data.data;

    // تعیین زبان از URL
    const path = context.req.url.split("/");
    const languageCode = path[1]; // 'en' یا 'fa'

    // تعریف متغیر برای عنوان
    let titleData = "";
    let nameUser="";
    let nameSite="";
    let localSite ="fa_IR";

    // تنظیم عنوان بر اساس زبان و داده‌ها
    if (languageCode === "fa") {
      nameSite =  "متاورس رنگ";
       localSite ="fa_IR";
      if (profileData.kyc?.fname) {
        nameUser = `${profileData.kyc.fname} ${profileData.kyc.lname}`
        titleData = `${profileData.kyc.fname} ${profileData.kyc.lname} | ${profileData.code}`;
      } else if (profileData.name) {
        titleData = `${profileData.name} | ${profileData.code}`;
         nameUser = `${profileData.name} `;
      } else {
        titleData = "متاورس رنگ";
      }
    } else if (languageCode === "en") {
       localSite ="en-US";
      nameSite= "Metaverse Rgb";
      if (profileData.name) {
        titleData = `${profileData.name} | ${profileData.code}`;
         nameUser = `${profileData.name} `;
      } else {
        titleData = "Metaverse Rgb";
      }
    }
    return { props: { profileData, titleData, nameSite, localSite, nameUser } };
  } catch (err) {
    // در صورت وجود خطا
    return { props: { error: "خطا در دریافت داده‌ها" } };
  }
}


