import EducationCategories from "@/components/list/EducationPagePreviewCategories";
import { getAllCategories } from "@/components/utils/actions";

interface EducationCategoriesContentProps {
  mainData: any;
  params: any;
}

/**
 * فچ getAllCategories از صفحه اصلی جدا شده تا زیر Suspense خودش مستقل
 * استریم بشه — دیگه منتظر لیست ویدیوها یا تاپ‌ترینرها نمی‌مونه، و اون‌ها
 * هم منتظر این نمی‌مونن (هر سه با هم، موازی، شروع به فچ می‌کنن).
 */
export default async function EducationCategoriesContent({
  mainData,
  params,
}: EducationCategoriesContentProps) {
  const categoriesData = await getAllCategories();

  return (
    <EducationCategories
      categoriesData={categoriesData}
      mainData={mainData}
      params={params}
    />
  );
}
