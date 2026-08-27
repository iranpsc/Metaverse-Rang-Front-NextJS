// src/app/[lang]/layout.tsx
import '../../styles/colors-auto.css'
import Script from "next/script";
import { azarMehr, rokh } from "../../fonts/localFonts";
import ToastProvider from "../../components/shared/toastProvider";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import ReferralHandler from "../../components/system/ReferralHandler";
import VPNDetector from "../../components/system/VPNDetector";

import {
  getTranslation,
  getMainFile,
  getLangArray,
} from "@/components/utils/actions";

import { getStaticMenu } from "@/components/utils/constants";
import { buildTabsMenu } from "@/components/utils/buildTabsMenu";
import {
  buildFooterBrand,
  buildFooterSections,
  buildSidebarLabels,
} from "@/components/utils/buildShellTranslations";
import ConditionalSidebar from "@/components/shared/sidebar/ConditionalSidebarServer";
import FooterClient from "@/components/shared/footer/FooterClient";
import Icon from "../../components/system/Icon";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";

const SUPPORTED_LANGUAGES = ["fa", "en"] as const;

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  /*
   * ============================================================
   * IMPORTANT:
   * فقط fa و en زبان معتبر هستند.
   *
   * این validation باید قبل از try/catch باشد.
   * چون notFound() نباید توسط catch گرفته شود.
   * ============================================================
   */
  if (!SUPPORTED_LANGUAGES.includes(lang as "fa" | "en")) {
    notFound();
  }

  try {
    /* ----------------------------------------------------------
     * Language data
     * ---------------------------------------------------------- */

    const [langArray, langData] = await Promise.all([
      getLangArray(),
      getTranslation(lang),
    ]);


    /* ----------------------------------------------------------
     * Validate language data
     * ---------------------------------------------------------- */

    if (!langData?.file_url) {
      throw new Error(`No file_url in langData for lang: ${lang}`);
    }

    /* ----------------------------------------------------------
     * Main data
     * ---------------------------------------------------------- */

    const mainData = await getMainFile(langData);

    if (!mainData) {
      console.error("mainData is invalid or missing", mainData);

      throw new Error("Failed to load translation dictionary");
    }

    /* ----------------------------------------------------------
     * Static menu (labels resolved from the flat dictionary)
     * ---------------------------------------------------------- */

    const staticMenuToShow = getStaticMenu(lang);
    const updatedTabsMenu = buildTabsMenu(mainData, staticMenuToShow);
    const sidebarLabels = buildSidebarLabels(mainData);
    const footerSections = buildFooterSections(mainData, lang);
    const footerBrand = buildFooterBrand(mainData);

    /* ----------------------------------------------------------
     * Render
     * ---------------------------------------------------------- */

    return (
      <html
        className="dark"
        lang={lang}
        suppressHydrationWarning
      >
        <head>
          <link
            rel="preload"
            as="image"
            href="/firstpage/Untitled-1.webp"
          />
          <link
            rel="preload"
            as="image"
            href="/firstpage/metaverse-rang-mobile-app.webp"
          />
        </head>

        <body
          className={`${azarMehr.variable} ${rokh.variable} h-screen light-scrollbar dark:dark-scrollbar`}
        >
          <Script
            id="sidebar-state-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              try {
                var v = localStorage.getItem('sidebarClosed');
                document.documentElement.setAttribute(
                  'data-sidebar-state',
                  v === 'false' ? 'open' : 'closed'
                );
              } catch (e) {
                document.documentElement.setAttribute('data-sidebar-state', 'closed');
              }
            `,
            }}
          />

          {lang !== "en" && <VPNDetector />}

          <CleanAutoRetryParam />

          <ReferralHandler />

          <ToastProvider />

          <main
            className="flex w-full h-screen overflow-hidden"
            dir={langData.direction}
          >
            <Suspense
              fallback={
                <div>
                  Loading Sidebar...
                </div>
              }
            >
              <ConditionalSidebar
                tabsMenu={updatedTabsMenu}
                langData={langData}
                langArray={langArray}
                params={resolvedParams}
                sidebarLabels={sidebarLabels}
              />
            </Suspense>

            <div
              id="page-scroll"
              className="flex flex-col w-full h-screen overflow-y-auto light-scrollbar dark:dark-scrollbar"
            >
              <Suspense
                fallback={
                  <div className="fixed top-0 left-0 bottom-0 w-full h-screen !z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="container flex w-full h-screen items-center justify-center md:ms-[25vw] lg:ms-[17vw] xl:ms-[15vw] 3xl:ms-[16vw]">
                      <div className="holder">
                        <div className="box"></div>
                      </div>

                      <div className="holder">
                        <div className="box"></div>
                      </div>

                      <div className="holder">
                        <div className="box"></div>
                      </div>
                    </div>
                  </div>
                }
              >
                {children}

                <div className="w-full mb-2 px-5 bg-bg-primary ">
                  <FooterClient
                    footerSections={footerSections}
                    brandLabel={footerBrand}
                    params={resolvedParams}
                  />
                </div>
              </Suspense>
            </div>

            <a
              href="https://web.bale.ai/chat?uid=4677411537"
              aria-label="Join us on Telegram"
              target="_blank"
              title="همکاری در توسعه متارنگ"
              className="fixed rtl:left-10 ltr:right-10 bottom-[20px] z-[1000]"
            >
              <Icon
                width={60}
                height={60}
              />
            </a>
          </main>
        </body>
      </html>
    );
  } catch (error) {
    const serializedError = {
      message:
        error instanceof Error
          ? error.message
          : "Unknown error",

      stack:
        error instanceof Error
          ? error.stack
          : null,

      name:
        error instanceof Error
          ? error.name
          : "Error",
    };

    console.error(
      "❌ Error in MainPage:",
      serializedError
    );

    return (
      <CustomErrorPage
        error={serializedError}
      />
    );
  }
}
