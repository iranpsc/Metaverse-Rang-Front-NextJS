import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout";
import Profile from "@/templates/Profile";
import ProfileDetails from "@/templates/ProfileDatails";
import ProfileAbout from "@/templates/ProfileAbout";
import { LangContext } from "@/context/LangContext";
import ModalCard from "@/templates/ModalCard";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import axios from "axios";


export default function Home({ profileData, titleData, error }: any) {
  const { languageSelected } = useContext(LangContext);
  const router = useRouter();
  const { lang, userId } = router.query;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState({ title: "", desc: "" });
 

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
        description={titleData + profileData.name + profileData.code}
        openGraph={{
          type: "website",
          url: `https://rgb.irpsc.com/en/citizen/${profileData.code}`,
          title: `${titleData}`,
          description: `${titleData + profileData.name + profileData.code}`,
          images: [
            {
              url: `${
                profileData &&
                profileData.profilePhotos &&
                profileData.profilePhotos[0] &&
                profileData?.profilePhotos[0]?.url
              }`,
              alt: `${titleData}`,
            },
          ],
        }}
      />

      <section
        dir={languageSelected.dir}
        className=" overflow-clip h-screen relative  "
      >
        <Head>
          <title>{titleData}</title>
          <meta name="description" content="job" key="desc" />
          <meta
            name="google-site-verification"
            content="lmf8kBJQgLHew_wXcxGQwJQWiOSFy8odEBRTLOoX7Q4"
          />
          <meta property="og:title" content={titleData} />
          <meta
            property="og:description"
            content={titleData + profileData.name + profileData.code}
          />
          <meta
            property="og:url"
            content={`http://localhost:5173/${lang}/citizen/${userId}`}
          />
          <meta
            property="og:image"
            content={profileData?.profilePhotos[0]?.url}
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
        >
          <div
            className="xl:grid lg:grid md:grid xl:grid-auto   lg:grid-cols-12 xl:grid-cols-12 w-full md:grid-flow-col md:auto-cols-fr  relative sm:flex sm:flex-col
        sm:gap-5 xl:gap-0 lg:gap-0 md:gap-0
        "
          >
            <section className="col-span-5 xl:h-[100vh] lg:h-[100vh] md:h-[100vh] sm:h-fit dark:bg-black bg-[#e9eef8] ms-1">
              {showModal ? (
                <ModalCard
                  setShowModal={setShowModal}
                  dataModal={dataModal}
                  titleData={titleData}
                />
              ) : null}

              <Profile profileData={profileData} />
            </section>
            <div className="col-span-4 xl:h-screen lg:h-screen sm:h-fit md:h-screen dark:bg-black bg-[#e9eef8] ">
              <ProfileDetails
                setShowModal={setShowModal}
                setDataModal={setDataModal}
              />
            </div>
            <div className="col-span-3 h-screen dark:bg-black md:h-screen  bg-[#e9eef8]">
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

    // تنظیم عنوان بر اساس زبان و داده‌ها
    if (languageCode === "fa") {
      if (profileData.kyc?.fname) {
        titleData = `${profileData.kyc.fname} ${profileData.kyc.lname} | ${profileData.code}`;
      } else if (profileData.name) {
        titleData = `${profileData.name} | ${profileData.code}`;
      } else {
        titleData = "متاورس رنگ";
      }
    } else if (languageCode === "en") {
      if (profileData.name) {
        titleData = `${profileData.name} | ${profileData.code}`;
      } else {
        titleData = "Metaverse Rang";
      }
    }

    // ارسال داده‌های دریافتی به کامپوننت صفحه
    return { props: { profileData, titleData } };
  } catch (err) {
    // در صورت وجود خطا
    return { props: { error: "خطا در دریافت داده‌ها" } };
  }
}


