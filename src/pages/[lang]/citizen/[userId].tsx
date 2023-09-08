import Head from "next/head";
import { useContext,useEffect,useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import Profile from "@/components/templates/Profile";
import ProfileDetails from "@/components/templates/ProfileDatails";
import ProfileAbout from "@/components/templates/ProfileAbout";
import { LangContext } from "@/components/context/LangContext";
import ModalCard from "@/components/templates/ModalCard";


export default function Home() {
  const { languageSelected } = useContext(LangContext);
  const [showModal,setShowModal] = useState<boolean>(false);
  const [dataModal,setDataModal] = useState({title:"",desc:""});

 


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
    <section
      dir={languageSelected.dir}
      className=" overflow-clip h-screen relative "
    >
      <Head>
        <title>متاورس رنگ ایران</title>
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
      <BaseLayout>
        <div className="xl:grid lg:grid md:grid xl:grid-auto   lg:grid-cols-12 xl:grid-cols-12 w-full md:grid-flow-col md:auto-cols-fr  relative sm:flex sm:flex-col
        sm:gap-5 xl:gap-0 lg:gap-0 md:gap-0
        ">
          <section className="col-span-5  xl:h-[100vh] lg:h-[100vh] md:h-[100vh] sm:h-fit dark:bg-black bg-[#e9eef8] ms-1">
            {showModal ? (
              <ModalCard setShowModal={setShowModal} dataModal={dataModal} />
            ) : null}

            <Profile />
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
            />
          </div>
        </div>
      </BaseLayout>
    </section>
  );
}
