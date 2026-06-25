// src/app/[lang]/articles/categories/[category]/page.tsx
import Link from "next/link";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CategorySorted from "../../../../../components/features/ArticleCategorySorted";
import CategoryHeader from "../../../../../components/ui/header/ArticleCategoryHeader";
import SearchComponent from "@/components/Search/SearchComponent";
import { getTranslation, getMainFile } from "@/components/utils/actions";
import { supabase } from "@/utils/lib/supabaseClient";
// import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
interface CategoryPageProps {
  params: Promise<{
    lang: string, category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const categorySlug = decodeURIComponent(resolvedParams.category);
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://metarang.com";

    // ✅ گرفتن داده از Supabase
    const { data: articlesData } = await supabase
      .from("articles")
      .select("*")
      .eq("categorySlug", categorySlug)
      .order("date", { ascending: false });

    const categoryArticles = articlesData || [];

    if (categoryArticles.length === 0) {
      return {
        title: `دسته ${categorySlug} | مقالات`,
        description: `هیچ مقاله‌ای در دسته ${categorySlug} یافت نشد.`,
        alternates: {
          canonical: `${siteUrl}/${lang}/articles/categories/${categorySlug}`,
        },
      };
    }

    const { category: catName, categoryDec, categoryImage } = categoryArticles[0];
    const title = `${catName} | مقالات`;
    const description = categoryDec || `مطالب و مقالات مرتبط با ${catName}`;
    const image = categoryImage?.startsWith("http")
      ? categoryImage
      : `${siteUrl}${categoryImage?.startsWith("/") ? "" : "/"}${categoryImage || "default.jpg"}`;

    return {
      title,
      description,
      alternates: { canonical: `${siteUrl}/${lang}/articles/categories/${categorySlug}` },
      openGraph: {
        title,
        description,
        url: `${siteUrl}/${lang}/articles/categories/${categorySlug}`,
        type: "website",
        siteName: "متاورس رنگ",
        locale: lang === "fa" ? "fa_IR" : "en_US",
        images: [{ url: image, width: 1200, height: 630, alt: catName }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const categorySlug = decodeURIComponent(resolvedParams.category);

    const [langData] = await Promise.all([
      getTranslation(lang),
    ]);
    const mainData = await getMainFile(langData);

    // ✅ گرفتن مقالات از Supabase
    const { data: articlesData } = await supabase
      .from("articles")
      .select("*")
      .eq("categorySlug", categorySlug)
      .order("date", { ascending: false });

    const categoryArticles = articlesData || [];

    if (categoryArticles.length === 0) {
      return (
        <div className="text-center py-20 text-gray-500">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            دسته‌ای با نام «{categorySlug}» پیدا نشد 😕
          </h2>
          <Link
            href={`/${lang}/articles`}
            className="text-blue-600 hover:underline"
          >
            بازگشت به لیست مقالات
          </Link>
        </div>
      );
    }

    const { category: catName, subCategory, categoryImage, categoryDec } =
      categoryArticles[0];

    const totalLikes = categoryArticles.reduce((sum, a) => sum + (a.stats?.likes ?? 0), 0);
    const totalDislikes = categoryArticles.reduce((sum, a) => sum + (a.stats?.dislikes ?? 0), 0);
    const totalViews = categoryArticles.reduce((sum, a) => sum + (a.stats?.views ?? 0), 0);
    const totalArticles = categoryArticles.length;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": catName,
      "description": categoryDec || `مقالات مرتبط با ${catName}`,
      "url": `https://metarang.com/${lang}/articles/categories/${categorySlug}`,
      "image": categoryImage || "/default.png",
      "mainEntity": {
        "@type": "ItemList",
        "name": `مقالات دسته ${catName}`,
        "itemListOrder": "Descending",
        "numberOfItems": categoryArticles.length,
        "itemListElement": categoryArticles.map((a, index) => {
          const published = a.date ? new Date(a.date).toISOString() : new Date().toISOString();
          return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "BlogPosting",
              "headline": a.title,
              "description": a.description || categoryDec || "این یک مقاله آموزشی است",
              "url": `https://metarang.com/${lang}/articles/categories/${categorySlug}/${a.slug}`,
              "datePublished": published,
              "dateModified": published,
              "image": a.image || "/default.png",
              "author": {
                "@type": "Person",
                "name": a.author?.name || "مدیر سایت",
                "url": a.author?.citizenId
                  ? `https://metarang.com/${lang}/citizens/${a.author.citizenId}`
                  : undefined,
                "identifier": a.author?.citizenId || "CIT-0000",
              },
              "publisher": {
                "@type": "Organization",
                "name": "متاورس رنگ",
                "logo": { "@type": "ImageObject", "url": "https://metarang.com/_next/image?url=%2Flogo.png&w=120&q=75" },
              },
              "inLanguage": lang || "fa",
              "isAccessibleForFree": true,
              "genre": a.category || "مقاله آموزشی",
              "keywords": a.tags?.join(", ") || `${catName}, آموزش, مقاله`,
              "commentCount": a.stats?.comments ?? 0,
              "interactionStatistic": [
                { "@type": "InteractionCounter", "interactionType": "https://schema.org/LikeAction", "userInteractionCount": a.stats?.likes ?? 0 },
                { "@type": "InteractionCounter", "interactionType": "https://schema.org/DislikeAction", "userInteractionCount": a.stats?.dislikes ?? 0 },
                { "@type": "InteractionCounter", "interactionType": "https://schema.org/ViewAction", "userInteractionCount": a.stats?.views ?? 0 },
              ],
            },
          };
        }),
      },
    };

    return (
      <section className="w-full relative bg-[#f8f8f8] dark:bg-black">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <CleanAutoRetryParam />
        <div className="px-5 2xl:px-10 mt-[60px] lg:mt-0">
          <BreadCrumb params={params} articleCat={catName} />
        </div>

        <CategoryHeader
          data={{
            category: catName,
            subCategory,
            categoryImage: categoryImage || "/default.png",
            categoryDec: categoryDec || "توضیحی برای این دسته موجود نیست.",
            totalLikes,
            totalDislikes,
            totalViews,
            totalArticles,
          }}
          mainData={mainData}
        />

        <div className="flex flex-col-reverse justify-center gap-7 lg:gap-5 lg:flex-row lg:justify-between items-start lg:items-center w-full px-5  mt-[-100px] lg:mt-0">


          <SearchComponent searchLevel="articles" params={resolvedParams} mainData={mainData} />
        </div>

        <div className="mt-10 lg:px-5">
          <CategorySorted params={resolvedParams} category={catName} articles={categoryArticles} mainData={mainData} />
        </div>

      </section>
    );
  } catch (error) {
    const serializedError = {
      message:
        error instanceof Error ? error.message : "Unknown error",
      stack:
        error instanceof Error ? error.stack : null,
      name:
        error instanceof Error ? error.name : "Error",
    };

    console.error("❌ Error in ArticleCategoryPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}
