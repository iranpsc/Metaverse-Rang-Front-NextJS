import { getAllCitizen } from "@/components/utils/actions";
import CitizenList from "@/components/list/citizenList";

interface CitizenListLoaderProps {
  params: any;
  mainData: any;
  defaultTheme: any;
}

/**
 * این فچ (getAllCitizen) عمداً از تابع اصلی صفحه (CitizensPage) جدا شده و
 * اومده تو یه کامپوننت async مستقل. علتش اینه که Suspense فقط وقتی
 * fallback نشون می‌ده که async-await داخل خودِ subtree ای باشه که زیر
 * <Suspense> قرار داره — نه توی تابع پدری که از قبل، قبل از رسیدن به JSX،
 * await شده. وقتی await بالای CitizensPage بود، کل صفحه (نه فقط لیست)
 * منتظر جواب API می‌موند و چون دیتا موقع رسیدن به <Suspense> از قبل آماده
 * بود، هیچ‌وقت چیزی سوسپند نمی‌شد و fallback دیده نمی‌شد.
 */
export default async function CitizenListLoader({
  params,
  mainData,
  defaultTheme,
}: CitizenListLoaderProps) {
  const allCitizenArray = await getAllCitizen("1");

  return (
    <CitizenList
      allCitizenArray={allCitizenArray.data}
      params={params}
      mainData={mainData}
      defaultTheme={defaultTheme}
    />
  );
}
