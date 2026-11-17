import JsonLdScript from "@/schemas/json-ld/JsonLdScript";
import SearchComponent from "@/components/Search/SearchComponent";
import CategoriesList from "../../components/features/ArticleCategoriesList";
import { supabase } from "@/utils/lib/supabaseClient";

interface ArticleCategoriesContentProps {
  lang: string;
  mainData: any;
  params: any;
}

/**
 * فچ Supabase (کندترین بخش صفحه) از تابع اصلی page.tsx جدا شده و اومده
 * اینجا، چون این کامپوننت خودش زیر <Suspense> رندر می‌شه. SearchComponent
 * هم اینجاست (نه بیرون) چون به همین articles وابسته‌ست — نه فقط
 * CategoriesList.
 */
export default async function ArticleCategoriesContent({
  lang,
  mainData,
  params,
}: ArticleCategoriesContentProps) {
  const { data: articlesData, error } = await supabase
    .from("articles")
    .select("*")
    .order("date", { ascending: false });

  if (error) console.error("Supabase fetch error:", error);

  const articles = articlesData || [];

  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))];
  const categoryImages: Record<string, string> = {};
  const categorySlugs: Record<string, string> = {};
  articles.forEach((a) => {
    if (a.category) {
      if (a.categoryImage && !categoryImages[a.category]) {
        categoryImages[a.category] = a.categoryImage;
      }
      categorySlugs[a.category] = a.categorySlug ? a.categorySlug : encodeURIComponent(a.category);
    }
  });

  const subcategoryCounts: Record<string, number> = {};
  articles.forEach((a) => {
    if (a.category && a.subCategory) {
      subcategoryCounts[a.category] = (subcategoryCounts[a.category] || 0) + 1;
    }
  });

  const baseUrl = "https://metarang.com";
  const langPrefix = lang ? `/${lang}` : "";
  const fullPageUrl = `${baseUrl}${langPrefix}/articles/categories`;

  const categoryItems = categories
    .filter((category) => Boolean(category && categorySlugs[category]))
    .map((category, index) => ({
      "@type": "ListItem", position: index + 1,
      item: { "@type": "CollectionPage", name: category,
        url: `${baseUrl}${langPrefix}/articles/categories/${categorySlugs[category]}` },
    }));

  return (
    <>
      <JsonLdScript schemaId="breadcrumb" values={{ items: [
        { "@type": "ListItem", position: 1, name: lang === "fa" ? "صفحه اصلی" : "Home", item: `${baseUrl}${langPrefix}` },
        { "@type": "ListItem", position: 2, name: lang === "fa" ? "مقالات" : "Articles", item: `${baseUrl}${langPrefix}/articles` },
        { "@type": "ListItem", position: 3, name: lang === "fa" ? "دسته‌بندی مقالات" : "Article categories", item: fullPageUrl },
      ] }} />
      {categoryItems.length > 0 ? <JsonLdScript schemaId="item-list" values={{
        name: lang === "fa" ? "دسته‌بندی‌های مقالات" : "Article categories", canonicalUrl: fullPageUrl,
        numberOfItems: categoryItems.length, items: categoryItems,
      }} /> : null}

      <div className="my-8">
        <SearchComponent searchLevel="articles" articles={articles} params={params} mainData={mainData} />
      </div>

      <CategoriesList
        categories={categories}
        categoryImages={categoryImages}
        categorySlugs={categorySlugs}
        subcategoryCounts={subcategoryCounts}
        params={params}
        mainData={mainData}
      />
    </>
  );
}
