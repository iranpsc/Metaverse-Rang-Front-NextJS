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

  const educationAllCategorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: `https://metarang.com/${lang}/education/category`,
    name: findByUniqueId(mainData, 340),
    description: findByUniqueId(mainData, 340),
    mainEntityOfPage: `https://metarang.com/${lang}/education/category`,
    itemListElement: categoriesData.map((item: any, index: any) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://metarang.com/${lang}/education/category/${item.slug}`,
      name: lang.toLowerCase() === "fa" ? item.name : item.slug,
      description: "",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationAllCategorySchema) }}
      />

      <ShowAllCategoriesEducationList
        params={params}
        categoriesData={categoriesData}
        mainData={mainData}
      />
    </>
  );
}
