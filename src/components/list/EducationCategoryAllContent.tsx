import JsonLdScript from "@/schemas/json-ld/JsonLdScript";
import ShowAllCategoriesEducationList from "@/components/list/ShowAllCategoriesEducationList";
import { getAllCategories } from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

interface EducationCategoryAllContentProps {
  lang: string;
  mainData: any;
  params: any;
}

/**
 * فچ getAllCategories (که قبلاً بالای page.tsx بود و کل صفحه رو بلاک
 * می‌کرد) از تابع اصلی صفحه جدا شده و اومده اینجا، چون این کامپوننت
 * خودش زیرمجموعه‌ی <Suspense> رندر می‌شه. حالا breadcrumb/عنوان/سرچ
 * دیگه منتظرش نمی‌مونن، و روی رفرش هم (نه فقط کلیک "موارد بیشتر")
 * ShowAllCategoriesEducationListSkeleton درست نمایش داده می‌شه.
 */
export default async function EducationCategoryAllContent({
  lang,
  mainData,
  params,
}: EducationCategoryAllContentProps) {
  const categoriesData = await getAllCategories();

  const categoryItems = (Array.isArray(categoriesData) ? categoriesData : [])
    .filter((item: any) => Boolean(item?.slug && item?.name))
    .map((item: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@type": "WebPage", name: lang.toLowerCase() === "fa" ? item.name : item.slug,
        url: `https://metarang.com/${lang}/education/category/${encodeURIComponent(item.slug)}` },
    }));

  return (
    <>
      {categoryItems.length > 0 ? <JsonLdScript schemaId="item-list" values={{
        name: findByUniqueId(mainData, 340), canonicalUrl: `https://metarang.com/${lang}/education/category`,
        numberOfItems: categoryItems.length, items: categoryItems,
      }} /> : null}

      <ShowAllCategoriesEducationList
        params={params}
        categoriesData={categoriesData}
        mainData={mainData}
      />
    </>
  );
}
