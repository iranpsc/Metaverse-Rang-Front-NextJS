import { Suspense } from "react";
import {
  getTranslation,
  getMainFile,
} from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import BreadCrumb from "@/components/shared/BreadCrumb";
import Image from "next/image";
import Head from "next/head";
import TeamListLoader from "@/components/templates/about/TeamListLoader";
import { UserCardSkeleton } from "@/components/skeleton/UserCardSkeleton";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";

interface AboutPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: AboutPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    return {
      title: lang.toLowerCase() === "fa" ? "درباره ما" : "About Us",
      description:
        lang.toLowerCase() === "fa"
          ? "متارنگ با تأکید بر نوآوری و کارآفرینی، بستری را فراهم کرده است که افراد می‌توانند از طریق آن به توسعه‌ی کسب و کارها و اقتصاد بین‌المللی بپردازند."
          : "With a focus on innovation and entrepreneurship, MetaRang provides a foundation for individuals to develop businesses and contribute to the international economy.",
      openGraph: {
        type: "website",
        url: `https://metarang.com/${lang}/about`,
        title: lang.toLowerCase() === "fa" ? "درباره ما" : "About Us",
        description:
          lang.toLowerCase() === "fa"
            ? "متارنگ با تأکید بر نوآوری و کارآفرینی، بستری را فراهم کرده است که افراد می‌توانند از طریق آن به توسعه‌ی کسب و کارها و اقتصاد بین‌المللی بپردازند."
            : "With a focus on innovation and entrepreneurship, MetaRang provides a foundation for individuals to develop businesses and contribute to the international economy.",
        locale: lang.toLowerCase() === "fa" ? "fa_IR" : "en_US",
        images: [
          {
            url: "/team.webp",
            width: 1920,
            height: 1440,
            alt: "تیم متاورس رنگ",
          },
        ],
      },
    };
  } catch (error) {
    console.error("❌ Metadata error (AboutPage):", error);
    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const [langData] = await Promise.all([getTranslation(lang)]);
    const mainData = await getMainFile(langData);

    const aboutSchema = {
      "@context": "https://schema.org/",
      "@type": "AboutPage",
      about: {
        "@type": "Thing",
        sameAs: "https://www.instagram.com/rgb.irpsc",
        url: "https://metarang.com/fa/about",
        image: "https://metarang.com/logo.png",
        additionalType: "https://schema.org/WebPage",
        name: 'متاورس رنگ - متارنگ"',
        identifier: "https://metarang.com/about",
        mainEntityOfPage: "https://metarang.com/fa/about",
        disambiguatingDescription: "صفحه‌ای برای معرفی متاورس رنگ و ماموریت آن",
        description: findByUniqueId(mainData, 1557),
        alternateName: "Metaverse Rang - MetaRang About Page",
      },
    };

    return (
      <>
        <Head>
          <link rel="preload" href="/team.webp" as="image" />
        </Head>
        <CleanAutoRetryParam />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(aboutSchema),
          }}
        />
        <section
          className={`min-h-[calc(100vh-60px)] relative mt-[60px] lg:mt-0 mx-auto px-4 lg:px-9 !font-azarMehr`}
        >
          <div>
            <BreadCrumb params={params} />
          </div>
          <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] lg:mt-[40px] mb-[16px]">
            {findByUniqueId(mainData, 259)}
          </h1>
          <div className="flex text-center flex-col gap-10">
            <div>
              <h2 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk mb-4">
                {findByUniqueId(mainData, 1556)}
              </h2>
              <p className="text-matn-2 dark:text-matn-2 font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
                {findByUniqueId(mainData, 1557)}
              </p>
            </div>
            <figure className="relative w-full aspect-video lg:h-[650px]">
              <Image
                src="/team.webp"
                alt="Metarang Team"
                fill
                sizes="(max-width: 1920px)"
                quality={100}
                className="object-cover object-bottom rounded-2xl lg:rounded-3xl"
                priority
              />
            </figure>
            <div className="w-full text-center bg-white dark:bg-dark-background font-medium text-[#6A6A6A] dark:text-white rounded-[30px] p-6 py-10 leading-10 text-sm md:text-lg text-justify">
              <p>{findByUniqueId(mainData, 1558)}</p>
            </div>
            <div>
              <h2 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
                {findByUniqueId(mainData, 1559)}
              </h2>
              <ul className="text-matn-2 font-medium text-justify text-sm md:text-lg mt-5 leading-10">
                <li>
                  <span className="font-bold font-azarMehr text-black dark:text-white">
                    {findByUniqueId(mainData, 1560)}
                  </span>
                  &nbsp;
                  {findByUniqueId(mainData, 1561)}
                </li>
                <li>
                  <span className="font-bold text-black dark:text-white">
                    {findByUniqueId(mainData, 1562)}
                  </span>
                  &nbsp;
                  {findByUniqueId(mainData, 1563)}
                </li>
                <li>
                  <span className="font-bold text-black dark:text-white">
                    {findByUniqueId(mainData, 1564)}
                  </span>
                  &nbsp;
                  {findByUniqueId(mainData, 1565)}
                </li>
              </ul>
            </div>
            <div className="w-full text-center bg-white dark:bg-gray-1 text-[#6A6A6A] dark:text-white rounded-[30px] p-6 py-10 leading-10 text-sm md:text-lg text-justify">
              <h2 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
                {findByUniqueId(mainData, 1566)}
              </h2>
              <ul className="text-[#52545C] dark:text-[#A0A0AB] text-sm md:text-lg mt-5 leading-10">
                <li>
                  <span className="font-bold text-black dark:text-white">
                    {findByUniqueId(mainData, 1567)}
                    &nbsp;
                  </span>
                  {findByUniqueId(mainData, 1568)}
                </li>
                <li>
                  <span className="font-bold text-black dark:text-white">
                    {findByUniqueId(mainData, 1569)}
                    &nbsp;
                  </span>
                  {findByUniqueId(mainData, 1570)}
                </li>
              </ul>
            </div>
            <div>
              <h2 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
                {findByUniqueId(mainData, 1571)}
                &nbsp;
              </h2>
              <p className="text-matn-2 font-medium text-justify text-sm md:text-lg mt-5 leading-10">
                {findByUniqueId(mainData, 1572)}
              </p>
            </div>
            <div className="w-full text-center bg-white dark:bg-gray-1 text-[#6A6A6A] dark:text-white rounded-[30px] p-6 py-10 leading-10 text-sm md:text-lg text-justify">
              <h2 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
                {lang.toLowerCase() === "fa" ? "تیم متاورس" : "Metaverse Team"}
                &nbsp;
              </h2>
              <p className="text-matn-2 dark:text-white font-medium text-justify text-sm md:text-lg mt-5 leading-10">
                {findByUniqueId(mainData, 1573)}
              </p>
            </div>
          </div>

          <div>
            <Suspense
              fallback={
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-8">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <UserCardSkeleton key={index} />
                  ))}
                </div>
              }
            >
              <TeamListLoader
                params={resolvedParams}
                mainData={mainData}
              />
            </Suspense>
          </div>
        </section>
      </>
    );
  } catch (error) {
    const serializedError = {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : null,
      name: error instanceof Error ? error.name : "Error",
    };
    console.error("❌ Error in AboutPage:", serializedError);
    return <CustomErrorPage error={serializedError} />;
  }
}