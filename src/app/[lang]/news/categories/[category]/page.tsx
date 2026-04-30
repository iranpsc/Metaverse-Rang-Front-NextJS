import Link from "next/link";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CategoryHeader from "../../../articles/categories/[category]/components/CategoryHeader";
import CategoryItemsGrid from "./components/CategoryItemsGrid";
import SearchComponent from "@/components/shared/SearchComponent";
import { getTranslation, getMainFile } from "@/components/utils/actions";
import { supabase } from "@/utils/lib/supabaseClient";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam from "@/components/shared/CleanAutoRetryParam";

interface NewsCategoryPageProps {

   params: Promise<{ lang: string ;  category: string;}>;
}

/* ================= METADATA ================= */
export async function generateMetadata({ params }: NewsCategoryPageProps) {
     const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const categorySlug = decodeURIComponent(resolvedParams.category);
    const siteUrl = "https://metarang.com";

    const { data } = await supabase
      .from("news")
      .select("*")
      .eq("categorySlug", categorySlug)
      .order("date", { ascending: false });

    if (!data || data.length === 0) {
      return {
        title: `دسته ${categorySlug} | اخبار`,
        description: `خبری در این دسته یافت نشد`,
        alternates: {
          canonical: `${siteUrl}/${lang}/news/categories/${categorySlug}`,
        },
      };
    }

    const { category, categoryDec, categoryImage } = data[0];

    return {
      title: `${category} | اخبار`,
      description: categoryDec || `اخبار مرتبط با ${category}`,
      alternates: {
        canonical: `${siteUrl}/${lang}/news/categories/${categorySlug}`,
      },
      openGraph: {
        title: `${category} | اخبار`,
        description: categoryDec,
        url: `${siteUrl}/${lang}/news/categories/${categorySlug}`,
        siteName: "MetaRang",
        type: "website",
        locale: lang === "fa" ? "fa_IR" : "en_US",
        images: [
          {
            url: categoryImage || "/default.png",
            width: 1200,
            height: 630,
            alt: category,
          },
        ],
      },
    };
  } catch {
    return {
      title: "خطا",
      description: "مشکلی رخ داده است",
    };
  }
}

/* ================= PAGE ================= */
export default async function NewsCategoryPage({ params }: NewsCategoryPageProps) {
     const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const categorySlug = decodeURIComponent(resolvedParams.category);

    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    const { data: newsData } = await supabase
      .from("news")
      .select("*")
      .eq("categorySlug", categorySlug)
      .order("date", { ascending: false });

    if (!newsData || newsData.length === 0) {
      return (
        <div className="text-center py-20 text-gray-500">
          <h2 className="text-2xl font-semibold dark:text-white">
            خبری در این دسته پیدا نشد 😕
          </h2>
          <Link
            href={`/${lang}/news`}
            className="text-blue-600 hover:underline"
          >
            بازگشت به اخبار
          </Link>
        </div>
      );
    }

    const {
      category,
      subCategory,
      categoryImage,
      categoryDec,
    } = newsData[0];

    const totalViews = newsData.reduce(
      (sum, n) => sum + (n.stats?.views ?? 0),
      0
    );
    const baseUrl = "https://metarang.com";
const categoryUrl = `${baseUrl}/${lang}/news/categories/${categorySlug}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    /* ================= Breadcrumb ================= */
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "صفحه اصلی",
          "item": `${baseUrl}/${lang}`,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "اخبار",
          "item": `${baseUrl}/${lang}/news`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": category,
          "item": categoryUrl,
        },
      ],
    },

    /* ================= Collection Page ================= */
    {
      "@type": "CollectionPage",
      "@id": `${categoryUrl}#webpage`,
      "url": categoryUrl,
      "name": `${category} | اخبار`,
      "description": categoryDec || `آخرین اخبار مرتبط با ${category}`,
      "isPartOf": {
        "@type": "WebSite",
        "name": "MetaRang",
        "url": baseUrl,
      },
      "inLanguage": lang === "fa" ? "fa-IR" : "en-US",
    },

    /* ================= News List ================= */
    {
      "@type": "ItemList",
      "name": `اخبار دسته ${category}`,
      "itemListOrder": "Descending",
      "numberOfItems": newsData.length,
      "itemListElement": newsData.map((n, index) => {
        const publishedDate = n.date
          ? new Date(n.date).toISOString()
          : new Date().toISOString();

        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "NewsArticle",
            "headline": n.title,
            "description":
              n.description || categoryDec || "خبر جدید از متاورس رنگ",
            "url": `${baseUrl}/${lang}/news/${n.slug}`,
            "datePublished": publishedDate,
            "dateModified": publishedDate,
            "image": n.image || `${baseUrl}/default.png`,
            "author": {
              "@type": "Organization",
              "name": "MetaRang",
            },
            "publisher": {
              "@type": "Organization",
              "name": "MetaRang",
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/_next/image?url=%2Flogo.png&w=120&q=75`,
              },
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${baseUrl}/${lang}/news/${n.slug}`,
            },
            "inLanguage": lang === "fa" ? "fa-IR" : "en-US",
            "isAccessibleForFree": true,
          },
        };
      }),
    },
  ],
};


    return (
      <section className="w-full bg-[#f8f8f8] dark:bg-black">
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
        <CleanAutoRetryParam />

        <div className="px-5 mt-[60px] lg:mt-0">
          <BreadCrumb params={params} articleCat={category} />
        </div>

        {/* 🔹 HEADER (همون کامپوننت مقالات) */}
        <CategoryHeader
          data={{
            category,
            subCategory,
            categoryImage: categoryImage || "/default.png",
            categoryDec: categoryDec || "توضیحی برای این دسته وجود ندارد",
            totalLikes: 0,
            totalDislikes: 0,
            totalViews,
            totalArticles: newsData.length,
          }}
          mainData={mainData}
        />

        <div className="flex flex-col-reverse lg:flex-row gap-5 px-5">
          <SearchComponent
            searchLevel="news"
            params={resolvedParams}
            mainData={mainData}
          />
        </div>

        {/* 🔹 لیست اخبار */}
        <div className="px-5">
          <CategoryItemsGrid
            params={resolvedParams}
            category={category}
            articles={newsData}
            mainData={mainData}
          />
        </div>
      </section>
    );
  } catch (error) {
    console.error("❌ NewsCategoryPage Error:", error);
    return <CustomErrorPage />;
  }
}
