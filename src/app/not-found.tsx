import React from "react";

import NotFoundPage from "@/components/error/NotFoundPage";

import {
  getMainFile,
  getLangArray,
} from "@/components/utils/actions";

export default async function NotFound() {
  try {
    // Prefer Persian for the root 404 page, otherwise use the first active
    // language supplied by the API.
    const langArray = await getLangArray();
    const langData =
      langArray.find((language) => language.code === "fa") || langArray[0];

    if (!langData?.file_url) {
      throw new Error("No active language is available for the 404 page.");
    }

    const lang = langData.code;

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