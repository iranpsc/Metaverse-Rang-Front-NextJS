"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ListData from "@/components/card/EducationCategoriesCard";
import EducationCategoryCardSkeleton from "@/components/skeleton/EducationCategoryCardSkeleton";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

interface EducationSubcategoriesClientProps {
  categorySlug: string;
  params: any;
  mainData: any;
  // اختیاری: اگه سرور از قبل دیتا رو داشت می‌تونی به‌عنوان فال‌بک اولیه
  // بدی تا حتی قبل از فچ کلاینتی هم چیزی نمایش داده بشه؛ اگه ندی، از
  // همون اول لودینگ واقعی شروع می‌شه.
  initialSubcategories?: any[];
}

const INITIAL_COUNT = 9;

/**
 * این کامپوننت کاملاً کلاینته و خودش، مستقل از هر مکانیزم Suspense/کش
 * سرور، دیتای زیردسته‌ها رو فچ می‌کنه. loading state‌ش یه state ساده‌ی
 * React روی مرورگره — یعنی همیشه، هر بار، قابل‌پیش‌بینی نمایش داده
 * می‌شه؛ هیچ وابستگی‌ای به رفتار استاتیک/دینامیک Next.js نداره.
 */
export default function EducationSubcategoriesClient({
  categorySlug,
  params,
  mainData,
  initialSubcategories,
}: EducationSubcategoriesClientProps) {
  const [subcategories, setSubcategories] = useState<any[]>(initialSubcategories || []);
  const [loading, setLoading] = useState(!initialSubcategories);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // فچ اولیه‌ی زیردسته‌ها — مستقیم از همون API عمومی که loadMore هم ازش
  // استفاده می‌کنه (NEXT_PUBLIC_API_BASE_URL، پس کلاینت اجازه‌ی دسترسی داره)
  useEffect(() => {
    if (initialSubcategories) return; // اگه سرور از قبل داده بود، نیازی نیست

    let cancelled = false;
    setLoading(true);

    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tutorials/categories/${encodeURIComponent(categorySlug)}`
        );
        if (cancelled) return;
        setSubcategories(res.data?.data?.subcategories || []);
      } catch (error) {
        console.error("[EducationSubcategoriesClient] fetch error:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCategory();

    return () => {
      cancelled = true;
    };
  }, [categorySlug, initialSubcategories]);

  // ------------------------------
  // Load More
  // ------------------------------
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const isDisabled = visibleCount >= subcategories.length;

const handleLoadMore = async () => {
  if (isDisabled || loadingMore) return;

  // اگر از داده‌های موجود هنوز آیتم داریم، نیازی به API نیست
  const remaining = subcategories.length - visibleCount;

  if (remaining >= 9) {
    setLoadingMore(true);

    // حداقل یک فریم فرصت می‌دهیم Skeleton نمایش داده شود
    await new Promise((resolve) => setTimeout(resolve, 300));

    setVisibleCount((prev) => prev + 9);
    setLoadingMore(false);

    return;
  }

  // اگر داده کافی نداریم، از API دریافت کن
  setLoadingMore(true);

  try {
    const nextPage = page + 1;

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tutorials?page=${nextPage}`
    );

    const more = res.data?.data || [];

    // ابتدا داده‌های جدید را اضافه می‌کنیم
    setSubcategories((prev) => [...prev, ...more]);

    // تعداد نمایش را 9 تا افزایش می‌دهیم
    setVisibleCount((prev) => prev + 9);

    setPage(nextPage);
  } catch (error) {
    console.error(
      "[EducationSubcategoriesClient] loadMore error:",
      error
    );
  } finally {
    setLoadingMore(false);
  }
};

  // ------------------------------
  // حالت لودینگ اولیه (تا اولین دیتا برسه)
  // ------------------------------
  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-5 px-4 3xl:pe-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[64px] w-full h-fit">
          {Array.from({ length: INITIAL_COUNT }).map((_, i) => (
            <EducationCategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center mt-5 px-4 3xl:pe-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[64px] w-full h-fit">
        <ListData
          params={params}
          nameComponent="subCategories"
          activeLoadingId={null}
          setActiveLoadingId={() => {}}
          data={{ subcategories: subcategories.slice(0, visibleCount) }}
        />

        {/* موقع لود بیشتر، کارت‌های اسکلت هم‌شکل با ListData */}
        {loadingMore &&
          Array.from({ length: Math.min(9, subcategories.length - visibleCount) }).map((_, i) => (
            <EducationCategoryCardSkeleton key={`more-${i}`} />
          ))}
      </div>

      {visibleCount < subcategories.length && !loadingMore && (
        <div className="w-full flex justify-center mt-[40px] relative">
          <button
            disabled={isDisabled}
            onClick={handleLoadMore}
            className={`${
              isDisabled ? "cursor-not-allowed opacity-50" : ""
            } bg-white dark:bg-gray-1 text-primary md:text-lg  rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-primary hover:text-primary hover:`}
          >
            {findByUniqueId(mainData, 271)}
          </button>
        </div>
      )}
    </div>
  );
}