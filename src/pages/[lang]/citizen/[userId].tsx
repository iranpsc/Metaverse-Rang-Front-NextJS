import Head from "next/head";
import { useContext,useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import Profile from "@/components/templates/Profile";
import ProfileDetails from "@/components/templates/ProfileDatails";
import ProfileAbout from "@/components/templates/ProfileAbout";
import { LangContext } from "@/components/context/LangContext";
import ModalCard from "@/components/templates/ModalCard";


export default function Home() {
  const { languageSelected } = useContext(LangContext);
  const [showModal,setShowModal] = useState<boolean>(false);
 

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
      "addressCountry": "IR"
    }
  }
      }`,
    };
  }

  return (
    <section
      dir={languageSelected.dir}
      className=" overflow-clip h-screen max-lg:h-fit  relative "
    >
      <Head>
        <title>متاورس رنگ ایران</title>
        <meta name="description" content="job" key="desc" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addPageJsonLd()}
          key="job-jsonld"
        />
      </Head>
      <BaseLayout>
        <div className="grid xl:grid-auto lg:grid-cols-12 w-full relative max-lg:flex max-lg:flex-col  ">
          <section className="col-span-5  h-[100vh] max-lg:h-fit max-lg:col-span-6    dark:bg-black bg-[#e9eef8] ms-2">
            {showModal ? <ModalCard setShowModal={setShowModal} /> : null}

            <Profile />
          </section>
          <div className="col-span-4 max-sm:col-span-6 h-screen max-lg:h-fit dark:bg-black  bg-[#e9eef8] p-1">
            <ProfileDetails setShowModal={setShowModal} />
          </div>
          <div className="col-span-3 h-screen dark:bg-black  bg-[#e9eef8]  ">
            <ProfileAbout setShowModal={setShowModal} />
          </div>
        </div>
      </BaseLayout>
    </section>
  );
}
