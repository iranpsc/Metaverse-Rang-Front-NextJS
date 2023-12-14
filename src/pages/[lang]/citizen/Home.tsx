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
import StaticMobileMenu from "@/components/module/StaticMobileMenu";
import ShredPage from "@/components/templates/ShredPage";


export default function Home({ profileData, titleData, error, setShowLogOut }: any) {
  const { languageSelected } = useContext(LangContext);
  const router = useRouter();
  const { lang, userId } = router.query;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSharedPage, setShowSharedPage] = useState<boolean>(false);
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
        description={titleData + profileData?.name + profileData?.code}
        openGraph={{
          type: "website",
          url: `https://rgb.irpsc.com/en/citizen/${profileData?.code}`,
          title: `${titleData}`,
          description: `${titleData + profileData?.name + profileData?.code}`,
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
            content={titleData + profileData?.name + profileData?.code}
          />
          <meta
            property="og:url"
            content={`https://rgb.irpsc.com/${lang}/citizen/${userId}`}
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
          setShowLogOut={setShowLogOut}
        >
          <div className=" xl:hidden lg:hidden md:hidden sm:visible xs:visible w-full h-fit  fixed bottom-0 z-40">
            <div className="w-full h-fit dark:bg-black bg-[#fff] fixed bottom-0">
              <StaticMobileMenu />
            </div>
          </div>
          <div
            className="xl:grid lg:grid md:grid xl:grid-auto   lg:grid-cols-12 xl:grid-cols-12 w-full md:grid-flow-col md:auto-cols-fr  relative sm:flex sm:flex-col
        sm:gap-5 xl:gap-0 lg:gap-0 md:gap-0
        "
          >
            <section className="col-span-5 xl:h-[100vh] lg:h-[100vh] md:h-[100vh] sm:h-fit dark:bg-black bg-[#e9eef8] ms-1">
              {showModal && (
                <ModalCard
                  showModal={showModal}
                  setShowModal={setShowModal}
                  dataModal={dataModal}
                  titleData={titleData}
                />
              )}
              {/* const [showSharedPage, setShowSharedPage] = useState<boolean>(false); */}

              {showSharedPage && <ShredPage />}

              <Profile profileData={profileData} titleData={titleData} />
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
