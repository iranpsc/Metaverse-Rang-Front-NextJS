
import {
  getAllLevels,
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getUserData

} from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import BreadCrumb from "@/components/shared/BreadCrumb";
import Image from "next/image";
import Head from "next/head";
import List from "./components/list"

// تعریف نوع پارامترها
interface Params {
  lang: string;
}

interface Tab {
  id: number;
  unique_id: number;
  url?: string;
  translation: string;
  order?: number;
  toShow?: boolean;
  [key: string]: any; // برای پراپ‌های اضافی
}

interface LevelItem {
  slug: string | number; // slug می‌تونه string یا number باشه
  [key: string]: any; // برای پراپ‌های اضافی
}

interface ModalData {
  [key: string]: any; // ساختار دقیق‌تر بستگی به خروجی findByModalName داره
}

// SEO**
export async function generateMetadata({ params }: { params: Params }) {
  return {
    title: params.lang.toLowerCase() === "fa" ? "درباره ما" : "About Us",
    description:
      params.lang.toLowerCase() === "fa"
        ? "متارنگ با تأکید بر نوآوری و کارآفرینی، بستری را فراهم کرده است که افراد می‌توانند از طریق آن به توسعه‌ی کسب و کارها و اقتصاد بین‌المللی بپردازند."
        : "With a focus on innovation and entrepreneurship, MetaRang provides a foundation for individuals to develop businesses and contribute to the international economy.",
    openGraph: {
      type: "website",
      url: `https://rgb.irpsc.com/${params.lang}/about`,
      title: params.lang.toLowerCase() === "fa" ? "درباره ما" : "About Us",
      description:
        params.lang.toLowerCase() === "fa"
          ? "متارنگ با تأکید بر نوآوری و کارآفرینی، بستری را فراهم کرده است که افراد می‌توانند از طریق آن به توسعه‌ی کسب و کارها و اقتصاد بین‌المللی بپردازند."
          : "With a focus on innovation and entrepreneurship, MetaRang provides a foundation for individuals to develop businesses and contribute to the international economy.",
      locale: params.lang.toLowerCase() === "fa" ? "fa_IR" : "en_US",
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
}

export default async function AboutPage({ params }: { params: Params }) {



  const [levelArray, langArray, langData] = await Promise.all([
    getAllLevels() as Promise<LevelItem[]>,
    getLangArray() as Promise<string[]>,
    getTranslation(params.lang) as Promise<any>,
  ]);
  const mainData = await getMainFile(langData);
  function convertPersianToEnglishNumber(slug: string): number {
    return Number(
      slug.replace(/[۰-۹]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 1776))
    );
  }
  levelArray.forEach((item: LevelItem) => {
    if (typeof item.slug === "string") {
      item.slug = convertPersianToEnglishNumber(item.slug);
    }
  });



  const [centralPageModal, Citizenship, levelModals] = await Promise.all([
    findByModalName(mainData, "central-page") as Promise<ModalData>,
    findByModalName(mainData, "Citizenship-profile") as Promise<ModalData>,
    findByModalName(mainData, "levels") as Promise<ModalData>,
  ]);
  const userCodes = [
    "HM-2000001", "HM-2000002", "HM-2000005", "HM-2000003",
    "HM-2000007", "HM-2000008", "HM-2000207", "HM-2000475",
    "HM-2000011", "HM-2000010", "HM-2000491", "HM-2000009",
    "HM-2000006"
  ];

  // لود همه کاربران با Promise.all
  const profiles = await Promise.all(userCodes.map(code => getUserData(code)));

  // ساخت آرایه userها برای List
  const users = profiles
    .filter(profile => profile?.data)
    .map(profile => ({
      id: profile.data.id,
      name: `${profile.data?.kyc?.fname || ""} ${profile.data?.kyc?.lname || ""}`.trim(),
      profile_photo: profile.data?.profilePhotos?.[0]?.url,
      code: profile.data.code,
      score: profile.data.score,
      levels: {
        current: profile.data.current_level,
        previous: profile.data.achieved_levels || [],
      },
      passions: profile.data.customs?.passions || {},
    }));

  const citizenListArrayContent = await findByTabName(
    Citizenship,
    "list-citizen"
  ) as Promise<Tab[]>;
  const levelListArrayContent = await findByTabName(levelModals, "level-list") as Promise<Tab[]>;

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;
  const logoURL = `${baseURL}/logo.png`;
  const aboutSchema = {
    "@context": "https://schema.org/",
    "@type": "AboutPage",
    about: {
      "@type": "Thing",
      sameAs: "https://www.instagram.com/rgb.irpsc",
      url: "https://rgb.irpsc.com/fa/about",
      image: "https://rgb.irpsc.com/logo.png",
      additionalType: "https://schema.org/WebPage",
      name: 'متاورس رنگ - متارنگ"',
      identifier: "https://rgb.irpsc.com/about",
      mainEntityOfPage: "https://rgb.irpsc.com/fa/about",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />
      <section
        className={`min-h-[calc(100vh-60px)]  relative  mt-[60px] lg:mt-0 mx-auto px-4 lg:px-9 !font-azarMehr`}
      >
        <div >
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
            <p className="text-lightGray  dark:text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
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
            <p>
              {findByUniqueId(mainData, 1558)}
            </p>
          </div>
          <div>
            <h2 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
              {findByUniqueId(mainData, 1559)}
            </h2>
            <ul className="text-lightGray font-medium text-justify text-sm md:text-lg mt-5 leading-10">
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
          <div className="w-full text-center bg-white dark:bg-[#1A1A18] text-[#6A6A6A] dark:text-white rounded-[30px] p-6 py-10 leading-10 text-sm md:text-lg text-justify">
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
            <p className="text-lightGray font-medium text-justify text-sm md:text-lg mt-5 leading-10">
              {findByUniqueId(mainData, 1572)}
            </p>
          </div>
          <div className="w-full text-center bg-white dark:bg-[#1A1A18] text-[#6A6A6A] dark:text-white rounded-[30px] p-6 py-10 leading-10 text-sm md:text-lg text-justify">
            <h2 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
              {params.lang.toLowerCase() === "fa"
                ? "تیم متاورس"
                : "Metaverse Team"}
              &nbsp;
            </h2>
            <p className="text-lightGray dark:text-white font-medium text-justify text-sm md:text-lg mt-5 leading-10">
              {findByUniqueId(mainData, 1573)}
            </p>
          </div>
        </div>
        <List
          params={params} mainData={mainData} users={users}
        />
      </section>
    </>
  );
}