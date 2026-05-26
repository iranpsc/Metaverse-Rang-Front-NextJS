import BreadCrumb from "@/components/shared/BreadCrumb";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam from "@/components/shared/CleanAutoRetryParam";
import {
  getTranslation,
  getMainFile,

} from "@/components/utils/actions";

import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { articles } from "@/components/utils/articles";
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
const baseUrl = "https://metarang.com"; // ← دامنه اصلی سایتت
const imageUrl = "https://metarang.com/_next/image?url=%2Flogo.png&w=128&q=75";
interface WhitePaperPageProps {
  params: Promise<{ lang: string }>;
}

// ✅ متادیتای داینامیک
export async function generateMetadata({ params }: WhitePaperPageProps) {
  try {
    const resolvedParams = await params;
    const { lang } = resolvedParams;
    const url = `${baseUrl}/${lang}/articles`;

    return {
      title: lang === "fa" ? "مقالات متاورس رنگ" : "Metarangs Metaverse Articles",
      description: lang === "fa" ? "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید" : "The Metarangs Metaverse articles page is the main gateway to the written content of Metarang — Iran’s first national metaverse. In this section, you can access the latest content on science, technology, virtual commerce, and development news of this parallel world.",
      openGraph: {
        title: lang === "fa" ? "مقالات متاورس رنگ" : "Metarangs Metaverse Articles",
        description: lang === "fa" ? "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید" : "The Metarangs Metaverse articles page is the main gateway to the written content of Metarang — Iran’s first national metaverse. In this section, you can access the latest content on science, technology, virtual commerce, and development news of this parallel world.",
        url,
        siteName: "Metaverse Rang",
        locale: lang === "fa" ? "fa_IR" : "en_US",
        type: "website",
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: "مقالات متاورس رنگ",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "مقالات متاورس رنگ",
        description:
          "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید",
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


export default async function ArticlesPage({ params }: WhitePaperPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const [langData] = await Promise.all([
      getTranslation(lang),
    ]);

    const mainData = await getMainFile(langData);

    const langPrefix = lang ? `/${lang}` : "";
    const fullPageUrl = `${baseUrl}${langPrefix}/articles`;


    // ✅ اسکیمای داینامیک معتبر
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "صفحه اصلی",
              item: `${baseUrl}${langPrefix}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "مقالات",
              item: fullPageUrl,
            },
          ],
        },
        {
          "@type": "CollectionPage",
          "@id": `${fullPageUrl}#webpage`,
          url: fullPageUrl,
          name: "مقالات متاورس رنگ",
          description:
            "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید",
          isPartOf: {
            "@type": "WebSite",
            name: "Metaverse Rang",
            url: baseUrl,
          },
        },
        {
          "@type": "ItemList",
          name: "لیست مقالات متاورس رنگ",
          itemListOrder: "Descending",
          numberOfItems: articles.length,
          itemListElement: articles.map((a, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${baseUrl}${langPrefix}/articles/categories/${a.category}/${a.slug}`,
            name: a.title,
            image: a.image || undefined,
          })),
        },
      ],
    };

    // ✅ محتوای اصلی (دقیقاً مثل نسخه‌ی خودت)
    return (
      <section
        className="w-full relative lg:pt-0 bg-[#f5f5f5] dark:bg-black px-5"
        dir={langData.direction}
      >
        <CleanAutoRetryParam />
        <div className="px-5  mt-[60px] lg:mt-0">
          <BreadCrumb params={resolvedParams} />
        </div>

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 justify-between w-full">
          {/* سمت چپ */}
          <div className="w-full lg:w-[50%]">
            <EcosystemIntro />
          </div>

          {/* سمت راست */}
          <div className=" w-full lg:max-w-[40%]">
            <PoweredBy />
          </div>
        </div>
        <div className="mt-5 space-y-5">
          <WhyMetarang />
          <EcosystemFeatures />
          <TrustedBySimple />
          <TrustedBy />
          <div className="my-5 hidden lg:block">          
            <Codebase />
            <FoundationGrants />
            </div>
          <AvalancheNetwork />
          <NewsStories />
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
