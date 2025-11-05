import Footer from "@/components/module/footer/Footer";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CategoriesList from "./CategoriesList";
import { articles } from "@/components/utils/articles";
import { getTranslation, getMainFile, getFooterData } from "@/components/utils/actions";
import SearchComponent from "@/components/shared/SearchComponent";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const siteUrl = "https://rgb.irpsc.com";
  const title = "دسته‌بندی مقالات متاورس رنگ ";
  const description =
    "در بخش دسته‌بندی مقالات متاورس رنگ، با موضوعات مختلفی از فناوری متاورس، هوش مصنوعی، بلاک‌چین و دنیای دیجیتال آشنا شوید.";
  const url = `${siteUrl}/${params.lang}/articles/categories`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Metaverse Rang",
      images: "/clogo.png",
      locale: params.lang === "fa" ? "fa_IR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: "/clogo.png",
    },
  };
}

export default async function CategoriesPage({ params }: { params: { lang: string } }) {
  const [footerTabs, langData] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
  ]);

  const mainData = await getMainFile(langData);


  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))];
  const categoryImages: Record<string, string> = {};
  articles.forEach((a) => {
    if (a.category && a.categoryImage && !categoryImages[a.category]) {
      categoryImages[a.category] = a.categoryImage;
    }
  });

  const subcategoryCounts: Record<string, number> = {};
  articles.forEach((a) => {
    if (a.category && a.subCategory) {
      subcategoryCounts[a.category] = (subcategoryCounts[a.category] || 0) + 1;
    }
  });

const baseUrl = "https://rgb.irpsc.com";
  const langPrefix = params.lang ? `/${params.lang}` : "";
  const fullPageUrl = `${baseUrl}${langPrefix}/articles/categories`;

  // ✅ تولید اسکیمای داینامیک کاملاً معتبر
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "صفحه اصلی",
            "item": `${baseUrl}${langPrefix}`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "مقالات",
            "item": `${baseUrl}${langPrefix}/articles`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "دسته‌بندی مقالات",
            "item": fullPageUrl,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${fullPageUrl}#webpage`,
        "url": fullPageUrl,
        "name": "دسته‌بندی مقالات متاورس رنگ",
        "description":
          "مجموعه‌ای از مقالات آموزشی و تحلیلی در زمینه فناوری متاورس، هوش مصنوعی و دارایی‌های دیجیتال، بر اساس دسته‌بندی‌های مختلف.",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Metaverse Rang",
          "url": baseUrl,
        },
      },
      {
        "@type": "ItemList",
        "name": "دسته‌بندی‌های مقالات متاورس رنگ",
        "itemListOrder": "Ascending",
        "numberOfItems": categories.length,
        "itemListElement": categories.map((cat, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${baseUrl}${langPrefix}/articles/categories/${encodeURIComponent(cat)}`,
          "name": cat,
          "image": categoryImages[cat] || undefined,
        })),
      },
    ],
  };

  return (
    <section
      className="w-full h-screen overflow-y-auto bg-[#f8f8f8] dark:bg-black px-5 3xl:px-10 light-scrollbar dark:dark-scrollbar "
      dir={langData.direction}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div>
        <div className="mb-6 mt-[60px] lg:mt-0">
          <BreadCrumb params={params} />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="mt-5 text-center whitespace-nowrap dark:text-white text-black font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[18px]">
            دسته‌بندی‌ مقالات
          </h1>
          <p className="text-lightGray dark:text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
            در سامانه مقالات متاورس رنگ، مجموعه‌ای از مطالب تخصصی و به‌روز در زمینه فناوری‌های نوین، دنیای متاورس، هوش مصنوعی، دارایی‌های دیجیتال و اقتصاد مجازی گردآوری شده است. هدف این بخش، ارتقای دانش شهروندان متاورسی و فراهم‌سازی بستری برای آشنایی عمیق‌تر با تحولات دنیای دیجیتال است.
          </p>
        </div>

        <div className="w-full mt-6">
          <SearchComponent searchLevel="articles" mainData={mainData} params={params} />
        </div>

        <CategoriesList
          categories={categories}
          categoryImages={categoryImages}
          subcategoryCounts={subcategoryCounts}
          params={params}
        />

        <div className="mt-20">
          <Footer footerTabs={footerTabs} mainData={mainData} params={params} />
        </div>
      </div>
    </section>
  );
}
