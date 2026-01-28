import { azarMehr, rokh } from '../../fonts/localFonts';
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import ToastProvider from "../../components/shared/toastProvider";
import { Suspense } from "react";
import Head from "next/head";
import ReferralHandler from './ReferralHandler';
import VPNDetector from './VPNDetector';
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getFooterData
} from "@/components/utils/actions";
import { getStaticMenu } from "@/components/utils/constants";
import ConditionalSidebar from "@/components/module/sidebar/ConditionalSidebar";
import FooterClient from "@/components/module/footer/FooterClient";
import Icon from "./Icon"
import CustomErrorPage from "@/components/shared/CustomErrorPage";

interface Tab {
  id: number;
  unique_id: number;
  url?: string;
  translation: string;
  order?: number;
  toShow?: boolean;
}

export default async function LangLayout({ children, params }: any) {
  try {
    const theme = useServerDarkMode();
    const [langArray, langData, footerTabs] = await Promise.all([
      getLangArray(),
      getTranslation(params.lang),
      getFooterData(params),
    ]);
    const mainData = await getMainFile(langData);
    const centralPageModal = await findByModalName(mainData, "central-page");
    const tabsMenu = await findByTabName(centralPageModal, "before-login");
    const staticMenuToShow = getStaticMenu(params.lang);



    const updatedTabsMenu = tabsMenu.map((tab: Tab) => {
      let findInStatic = staticMenuToShow.find((val) => tab.unique_id === val.unique_id);
      if (findInStatic) {
        return {
          ...tab,
          url: findInStatic.url,
          order: findInStatic.order,
          toShow: true,
        };
      }
      return tab;
    });

    return (
      <html className={theme} lang={params.lang}>
        <Head>
          {/* Preload تصاویر و ویدئو */}
          <link rel="preload" as="image" href="/firstpage/replaced_pic.webp" />
          <link
            rel="preload"
            as="video"
            href="/firstpage/3d_rgb.irpsc.webm"
            type="video/mp4"
          />

        </Head>

        <body className={`${azarMehr.variable} ${rokh.variable}   h-screen light-scrollbar dark:dark-scrollbar`}>
          {params.lang !== "en" && <VPNDetector />}
          <ReferralHandler />
          <ToastProvider />
          <main className="flex w-full h-screen overflow-hidden" dir={langData.direction}>
            <Suspense fallback={<div>Loading Sidebar...</div>}>
              <ConditionalSidebar
                tabsMenu={updatedTabsMenu}
                langData={langData}
                langArray={langArray}
                params={params}
                mainData={mainData}
              />
            </Suspense>

            <div className='flex flex-col w-full h-screen overflow-y-auto light-scrollbar dark:dark-scrollbar'>
              <Suspense fallback={
                <div className="container flex flex-col w-full h-screen items-center justify-center !bg-transparent">
                  <div className="holder">
                    <div className="box"></div>
                  </div>
                  <div className="holder">
                    <div className="box"></div>
                  </div>
                  <div className="holder">
                    <div className="box"></div>
                  </div>
                </div>}>
                {children}

                <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1 bg-[#f8f8f8] dark:bg-black">
                  <FooterClient footerTabs={footerTabs} mainData={mainData} params={params} />
                </div>



              </Suspense>


            </div>
            <a
              href="https://t.me/metargb"
              aria-label="Join us on Discord"
              title="Discord"
              className="fixed rtl:left-10 ltr:right-10 bottom-[20px] z-[1000]"
            >
              {/* SVG Discord */}


              <Icon width={60} height={60} />

            </a>

          </main>
        </body>
      </html>
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

    console.error("❌ Error in EductionPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}
