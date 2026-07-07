import BreadCrumb from "@/components/shared/BreadCrumb";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
import ClipSection from "@/components/shared/ClipContainer";
import ClipButton from "@/components/shared/ClipButton";
import {
  getTranslation,
  getMainFile,

} from "@/components/utils/actions";

import { findByUniqueId } from "@/components/utils/findByUniqueId";
import PoweredBy from "./components/PoweredBy";
import EcosystemIntro from "./components/EcosystemIntro";
import WhyMetarang from "./components/WhyMetarang"
import EcosystemFeatures from "./components/EcosystemFeatures"
import TrustedBy from "./components/TrustedBy"
import TrustedBySimple from "./components/TrustedBySimple"
import Codebase from "./components/Codebase"
import FoundationGrants from "./components/FoundationGrants"
import AvalancheNetwork from "./components/AvalancheNetwork"
import NewsStories from "./components/NewsStories"
import AvalancheSolutions from "./components/AvalancheSolutions"
import AvalancheStories from "./components/AvalancheStories"
import AvalancheEventsCard from "./components/AvalancheEventsCard";
import MetaFeatures from "./components/MetaFeatures";
import AvalancheCTA from "./components/AvalancheCTA";
import ContactSection from "./components/ContactSection";
import AvalancheBanner from "./components/AvalancheBanner"
import SectionTeam from "@/components/templates/firstpage/TeamSection";
import PressureLayout from "./components/PressureLayout";
import Logo from "./components/logo";
const baseUrl = "https://metarang.com"; // ← دامنه اصلی سایتت
const imageUrl = "https://metarang.com/_next/image?url=%2Flogo.png&w=128&q=75";
// interface WhitePaperPageProps {
//   params: Promise<{
//     lang: string;
//   }>;
// }

// ✅ متادیتای داینامیک
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  try {
    const resolvedParams = await params;
    const { lang } = resolvedParams;
    const url = `${baseUrl}/${lang}/whitepaper`;
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);
    return {
      title: findByUniqueId(mainData, 1756),
      description: findByUniqueId(mainData, 1757),
      openGraph: {
        title: findByUniqueId(mainData, 1756),
        description: findByUniqueId(mainData, 1757),
        url,
        siteName: "Metaverse Rang",
        locale: lang === "fa" ? "fa_IR" : "en_US",
        type: "website",
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: " PSC token ",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "PSC token",
        description: findByUniqueId(mainData, 1757),
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("❌ Metadata error (LevelsPage):", error);

    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}


export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const [langData] = await Promise.all([
      getTranslation(lang),
    ]);

    const mainData = await getMainFile(langData);

    const langPrefix = lang ? `/${lang}` : "";
    const fullPageUrl = `${baseUrl}${langPrefix}/whitepaper`;


    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${baseUrl}#organization`,
          name: "MetaRang",
          url: baseUrl,
          logo: imageUrl
        },

        {
          "@type": "WebSite",
          "@id": `${baseUrl}#website`,
          url: baseUrl,
          name: "MetaRang",
          publisher: {
            "@id": `${baseUrl}#organization`
          }
        },

        {
          "@type": "WebPage",
          "@id": `${fullPageUrl}#webpage`,
          url: fullPageUrl,
          name: "PSC Token by MetaRang",
          description: findByUniqueId(mainData, 1757),
          isPartOf: {
            "@id": `${baseUrl}#website`
          },
          about: {
            "@id": `${fullPageUrl}#psc-token`
          }
        },

        {
          "@type": "Cryptocurrency",
          "@id": `${fullPageUrl}#psc-token`,
          name: "PSC Token",
          alternateName: "PSC",
          description: findByUniqueId(mainData, 1757),
          issuer: {
            "@id": `${baseUrl}#organization`
          }
        },

        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: baseUrl
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "PSC Token",
              item: fullPageUrl
            }
          ]
        }
      ]
    };
    

    // ✅ محتوای اصلی (دقیقاً مثل نسخه‌ی خودت)
    return (
      <section
        className="w-full  lg:pt-0 bg-[#f5f5f5] dark:bg-black px-5"
        dir={langData.direction}
      >
        <CleanAutoRetryParam />
        <div className="px-5  mt-[60px] lg:mt-0">
          <BreadCrumb params={resolvedParams} />
        </div>


<PressureLayout
  center={
    <Logo />
  }
  left={
    <EcosystemIntro
      params={resolvedParams}
      mainData={mainData}
    />
  }
  right={
    <PoweredBy
      params={resolvedParams}
      mainData={mainData}
    />
  }
/>
        <div className="mt-5 space-y-[2px] ">
          <WhyMetarang params={resolvedParams} mainData={mainData} />
          <div className="!mt-[135px] lg:!mt-[2px] xl:!mt-[84px] 2xl:!mt-[2px]">
            <EcosystemFeatures params={resolvedParams} mainData={mainData} />
          </div>
          <TrustedBySimple params={resolvedParams} mainData={mainData} />
          <TrustedBy params={resolvedParams} mainData={mainData} />
          <div className="my-5 hidden lg:block">
            <AvalancheBanner params={resolvedParams} mainData={mainData} />
            <Codebase params={resolvedParams} mainData={mainData} />
            <FoundationGrants params={resolvedParams} mainData={mainData} />
          </div>
          <AvalancheNetwork params={resolvedParams} mainData={mainData} />
          <NewsStories params={resolvedParams} mainData={mainData} />
          <SectionTeam mainData={mainData} params={resolvedParams} />
          <AvalancheSolutions params={resolvedParams} mainData={mainData} />
          <AvalancheStories params={resolvedParams} mainData={mainData} />
          <AvalancheEventsCard params={resolvedParams} mainData={mainData} />
          <MetaFeatures params={resolvedParams} mainData={mainData} />
          <AvalancheCTA params={resolvedParams} mainData={mainData} />
          <ContactSection params={resolvedParams} mainData={mainData} />

        </div>

        {/* ✅ اسکیمای SSR معتبر و داینامیک */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </section>
    );
  }
  catch (error) {
    const serializedError = {
      message:
        error instanceof Error ? error.message : "Unknown error",
      stack:
        error instanceof Error ? error.stack : null,
      name:
        error instanceof Error ? error.name : "Error",
    };

    console.error("❌ Error in whitePaperPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}
