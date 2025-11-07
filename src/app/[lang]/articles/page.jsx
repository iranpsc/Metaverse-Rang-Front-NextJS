import Footer from "@/components/module/footer/Footer";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { articles } from "@/components/utils/articles";
import LatestArticlesSlider from "./components/LatestArticlesSlider";
import PopularArticlesSlider from "./components/PopularArticlesSlider";
import CategoriesGrid from "./components/CategoriesGrid";
import SearchComponent from "@/components/shared/SearchComponent";
import {
  getTranslation,
  getMainFile,
  getFooterData,
  getLangArray,
} from "@/components/utils/actions";

const baseUrl = "https://rgb.irpsc.com"; // ← دامنه اصلی سایتت
  const imageUrl = "/clogo.png";
// ✅ متادیتای داینامیک
export async function generateMetadata({ params }) {
  const lang = params.lang || "fa";
  const url = `${baseUrl}/${lang}/articles`;

  return {
    title: "مقالات متاورس رنگ",
    description:
      "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید",
    alternates: { canonical: url },
    openGraph: {
      title: "مقالات متاورس رنگ",
      description:
      "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید",
      url,
      siteName: "Metaverse Rang",
      locale: lang === "fa" ? "fa_IR" : "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 400,
          height: 400,
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
}


export default async function ArticlesPage({ params }) {
  const [footerTabs, langData] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
  ]);

  const mainData = await getMainFile(langData);

  const langPrefix = params.lang ? `/${params.lang}` : "";
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
    <main
      className="w-full h-screen overflow-y-auto relative lg:pt-0 bg-[#f8f8f8] dark:bg-black light-scrollbar dark:dark-scrollbar"
      dir={langData.direction}
    >
      <div className="px-5 2xl:px-10 mt-[60px] lg:mt-0">
        <BreadCrumb params={params} />
      </div>

      <div className=" 2xl:px-10 mt-5">
        <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
          مقالات متاورس رنگ
        </h1>
        <p className="text-lightGray  dark:text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
          در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید
        </p>
      </div>

      <div className="mb-10 mt-[-50px] lg:mt-5 space-y-7">
        <div className="flex flex-col-reverse  lg:gap-5 lg:flex-row lg:justify-between lg:items-center w-full px-5 lg:pe-4">
          <h2 className="md:w-1/2 lg:ms-5 mt-5 lg:mt-0 lg:mb-[-45px] font-azarMehr text-lg md:text-2xl font-bold text-start dark:text-white text-black ps-[2px]">
            دسته بندی های مقالات
          </h2>
          <SearchComponent
            searchLevel="articles"
            mainData={mainData}
            params={params}
          />
        </div>
        <div className="px-5 lg:pt-6 2xl:px-10">
          <CategoriesGrid params={params} mainData={mainData} />
        </div>
      </div>

      <div className="ps-5 2xl:ps-10 space-y-14 mt-28">
        <PopularArticlesSlider params={params} mainData={mainData} />
        <LatestArticlesSlider params={params} mainData={mainData} />
      </div>

      <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
        <Footer footerTabs={footerTabs} mainData={mainData} params={params} />
      </div>

      {/* ✅ اسکیمای SSR معتبر و داینامیک */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </main>
  );
}
