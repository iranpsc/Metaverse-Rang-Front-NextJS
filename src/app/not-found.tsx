import React from "react";

import NotFoundPage from "@/components/error/NotFoundPage";

import {
  getTranslation,
  getMainFile,
  getLangArray,
} from "@/components/utils/actions";

export default async function NotFound() {
  const lang = "fa";

  try {
    // ---------------------------------------------------------
    // Language data
    // ---------------------------------------------------------
    const [langData, langArray] = await Promise.all([
      getTranslation(lang),
      getLangArray(),
    ]);

    // ---------------------------------------------------------
    // Main data
    // ---------------------------------------------------------
    const mainData = await getMainFile(langData);

    // ---------------------------------------------------------
    // Params برای NotFoundPage
    // ---------------------------------------------------------
    const params = {
      lang,
    };

    return (
      <NotFoundPage
        lang={lang}
        params={params}
        langData={langData}
        langArray={langArray}
        mainData={mainData}
      />
    );
  } catch (error) {
    console.error("❌ Error rendering root NotFoundPage:", error);

    // fallback خیلی ساده
    return (
      <main
        dir="rtl"
        className="min-h-screen flex items-center justify-center bg-bg-primary "
      >
        <div className="text-center">
          <h1 className="text-8xl font-bold text-title-2 dark:text-white">
            404
          </h1>

          <p className="mt-5 text-xl text-[#868B90]">
            صفحه مورد نظر پیدا نشد.
          </p>
        </div>
      </main>
    );
  }
}