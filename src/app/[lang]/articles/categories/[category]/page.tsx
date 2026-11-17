// src/app/[lang]/articles/categories/[category]/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CategoryHeader from "../../../../../components/ui/header/ArticleCategoryHeader";
import CategorySortedContent from "@/components/features/CategorySortedContent";
import CategorySortedSkeleton from "@/components/skeleton/CategorySortedSkeleton";
import SearchComponent from "@/components/Search/SearchComponent";
import { getTranslation, getMainFile } from "@/components/utils/actions";
import { supabase } from "@/utils/lib/supabaseClient";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import JsonLdScript from "@/schemas/json-ld/JsonLdScript";

interface CategoryPageProps {
  params: Promise<{
    lang: string, category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params  }: CategoryPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);
  try {
    const categorySlug = decodeURIComponent(resolvedParams.category);
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://metarang.com";

    const { data: articlesData } = await supabase
      .from("articles")
      .select("*")
      .eq("categorySlug", categorySlug)
      .order("date", { ascending: false });

    const categoryArticles = articlesData || [];

    if (categoryArticles.length === 0) {
      return {
        title: `دسته ${categorySlug}  مقالات   |  ${findByUniqueId(mainData, 148)}`,
        description: `هیچ مقاله‌ای در دسته ${categorySlug} یافت نشد.`,
        alternates: {
          canonical: `${siteUrl}/${lang}/articles/categories/${categorySlug}`,
        },
      };
    }

    const { category: catName, categoryDec, categoryImage } = categoryArticles[0];
    const title = `${catName} | ${findByUniqueId(mainData, 148)}`;
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

    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    // ✅ این فچ عمداً همون‌جوری بلاک‌کننده و سینک باقی موند — چون
    // CategoryHeader (تصویرش LCP هست) بهش نیاز داره. فقط برای ساخت
    // schema/notFound/header استفاده می‌شه؛ دیگه به CategorySorted پاس
    // داده نمی‌شه (اون خودش فچ مستقل خودش رو داره، پایین‌تر).
    const { data: articlesData } = await supabase
      .from("articles")
      .select("*")
      .eq("categorySlug", categorySlug)
      .order("date", { ascending: false });

    const categoryArticles = articlesData || [];

    if (categoryArticles.length === 0) {
      return (
        <div className="text-center py-20 text-matn-2-500">
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
    const categoryUrl = `https://metarang.com/${lang}/articles/categories/${encodeURIComponent(categorySlug)}`;
    const articleListItems = categoryArticles
      .filter((article: any) => Boolean(article?.title && article?.slug))
      .map((article: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebPage",
          name: article.title,
          url: `${categoryUrl}/${encodeURIComponent(article.slug)}`,
        },
      }));

    return (
      <section className="w-full relative bg-bg-primary ">
        <JsonLdScript schemaId="breadcrumb" values={{ items: [
          { "@type": "ListItem", position: 1, name: lang === "fa" ? "صفحه اصلی" : "Home", item: `https://metarang.com/${lang}` },
          { "@type": "ListItem", position: 2, name: lang === "fa" ? "مقالات" : "Articles", item: `https://metarang.com/${lang}/articles` },
          { "@type": "ListItem", position: 3, name: catName, item: categoryUrl },
        ] }} />
        <JsonLdScript schemaId="collection-page" values={{
          name: catName,
          canonicalUrl: categoryUrl,
          description: categoryDec,
          lang: lang === "fa" ? "fa-IR" : "en-US",
        }} />
        {articleListItems.length > 0 ? <JsonLdScript schemaId="item-list" values={{
          name: lang === "fa" ? `مقالات دسته ${catName}` : `${catName} articles`,
          canonicalUrl: categoryUrl,
          numberOfItems: articleListItems.length,
          items: articleListItems,
        }} /> : null}
        <CleanAutoRetryParam />
        <div className="px-5 2xl:px-10 mt-[60px] lg:mt-0">
          <BreadCrumb params={params} articleCat={catName} />
        </div>

        {/* ✅ سینک و بلاک‌کننده مونده — تصویرش LCP element این صفحه‌ست */}
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
  articlesTitleId={1828}
  likesTitleId={1523}
  dislikesTitleId={1524}
  viewsTitleId={1525}
/>

        <div className="flex flex-col-reverse justify-center gap-7 lg:gap-5 lg:flex-row lg:justify-between items-start lg:items-center w-full px-5  mt-[-100px] lg:mt-0">
          <SearchComponent searchLevel="articles" params={resolvedParams} mainData={mainData} />
        </div>

        {/* ✅ گرید مقالات — الان زیر Suspense خودش با فچ مستقل */}
        <div className="mt-10 lg:px-5">
          <Suspense fallback={<CategorySortedSkeleton />}>
            <CategorySortedContent
              categorySlug={categorySlug}
              category={catName}
              params={resolvedParams}
              mainData={mainData}
            />
          </Suspense>
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
