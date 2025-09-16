import dynamic from "next/dynamic";
import {
  getAllLevels,
  getFooterData,
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
} from "@/components/utils/actions";
const DynamicFooter = dynamic(
  () => import("@/components/module/footer/DynamicFooter")
);
const AboutList = dynamic(() => import("./components/list"));

import Image from "next/image";
import Head from "next/head";

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
  function convertPersianToEnglishNumber(slug: string): number {
    return Number(
      slug.replace(/[۰-۹]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 1776))
    );
  }

  const [levelArray, footerTabs, langArray, langData] = await Promise.all([
    getAllLevels() as Promise<LevelItem[]>,
    getFooterData(params) as Promise<Tab[]>,
    getLangArray() as Promise<string[]>,
    getTranslation(params.lang) as Promise<any>,
  ]);

  levelArray.forEach((item: LevelItem) => {
    if (typeof item.slug === "string") {
      item.slug = convertPersianToEnglishNumber(item.slug);
    }
  });

  const mainData = await getMainFile(langData) as Promise<any>;

  const [centralPageModal, Citizenship, levelModals] = await Promise.all([
    findByModalName(mainData, "central-page") as Promise<ModalData>,
    findByModalName(mainData, "Citizenship-profile") as Promise<ModalData>,
    findByModalName(mainData, "levels") as Promise<ModalData>,
  ]);

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
      description:
        params.lang.toLowerCase() === "fa"
          ? "متارنگ با تأکید بر نوآوری و کارآفرینی، بستری را فراهم کرده است که افراد می‌توانند از طریق آن به توسعه‌ی کسب و کارها و اقتصاد بین‌المللی بپردازند."
          : "With a focus on innovation and entrepreneurship, MetaRang provides a foundation for individuals to develop businesses and contribute to the international economy.",
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
        className={`min-h-[calc(100vh-60px)] lg:min-h-screen overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 mx-auto px-4 lg:px-9 font-azarMehr`}
      >
        <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
          {params.lang.toLowerCase() === "fa" ? "درباره ما" : "About Us"}
        </h1>
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
              {params.lang.toLowerCase() === "fa"
                ? "پروژه متاورس رنگ (متارنگ)"
                : "Metaverse Rang Project (MetaRang)"}
            </h2>
            <p className="text-lightGray font-medium text-justify text-sm md:text-lg mt-5 leading-10">
              {params.lang.toLowerCase() === "fa"
                ? "متارنگ، نخستین پروژه متاورسی ایران، با هدف ایجاد جهانی مجازی و موازی با تأکید بر فرهنگ و اصالت ایرانی آغاز به کار کرده است. این پلتفرم با بهره‌گیری از فناوری‌های پیشرفته، دریچه‌ای به سوی آینده‌ای دیجیتالی می‌گشاید که امکان زندگی، تعامل و کسب‌وکار در دنیایی موازی را برای کاربران فراهم می‌کند."
                : "MetaRang, the first metaverse project in Iran, has been initiated with the goal of creating a parallel virtual world that emphasizes Iranian culture and heritage. This platform, leveraging advanced technologies, opens a gateway to a digital future where users can live, interact, and conduct business in a parallel universe."}
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
              {params.lang.toLowerCase() === "fa"
                ? "متارنگ با تأکید بر نوآوری و کارآفرینی، بستری را فراهم کرده است که افراد می‌توانند از طریق آن به توسعه‌ی کسب و کارها و اقتصاد بین‌المللی بپردازند. این پلتفرم با ایجاد درگاه‌های بین‌المللی، امکان تعاملات هدفمند و سازنده را با دیگر کشورها و فرهنگ‌ها فراهم می‌کند، و به این ترتیب، کاربران قادر خواهند بود تا فرصت‌های جدیدی برای رشد و گسترش فعالیت‌های خود در دنیای مجازی بیابند. زندگی در متارنگ، نه تنها یک تجربه مجازی است، بلکه به عنوان یک زندگی موازی با جهان واقعی تعریف می‌شود. در این جهان مجازی، شما می‌توانید زندگی جدیدی را آغاز کنید، از ایده‌های خلاقانه بهره ببرید و در توسعه‌ی اقتصاد دیجیتال و بین‌المللی سهم داشته باشید."
                : "With a focus on innovation and entrepreneurship, MetaRang provides a foundation for individuals to develop businesses and contribute to the international economy. By establishing global gateways, this platform facilitates purposeful and constructive interactions with other countries and cultures. As a result, users can discover new opportunities to expand and grow their activities in the virtual world. Life in MetaRang is not merely a virtual experience; it is defined as a parallel existence to the real world. In this virtual realm, you can start a new life, harness creative ideas, and play a role in the development of the digital and global economy."}
            </p>
          </div>
          <div>
            <h2 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
              {params.lang.toLowerCase() === "fa"
                ? "ویژگی‌های برجسته متارنگ:"
                : "Key Features of MetaRang:"}
            </h2>
            <ul className="text-lightGray font-medium text-justify text-sm md:text-lg mt-5 leading-10">
              <li>
                <span className="font-bold text-black dark:text-white">
                  {params.lang.toLowerCase() === "fa"
                    ? "نوآوری و کارآفرینی:"
                    : "Innovation and Entrepreneurship"}
                </span>
                &nbsp;
                {params.lang.toLowerCase() === "fa"
                  ? "متارنگ بستری را فراهم کرده است که افراد می‌توانند کسب‌وکارهای خود را توسعه داده و در اقتصاد دیجیتال مشارکت کنند. این پلتفرم با ایجاد درگاه‌های بین‌المللی، امکان تعاملات هدفمند و سازنده با دیگر کشورها و فرهنگ‌ها را فراهم می‌کند."
                  : "MetaRang provides a platform where individuals can develop their businesses and participate in the digital economy. Through international gateways, it facilitates meaningful interactions with other countries and cultures."}
              </li>
              <li>
                <span className="font-bold text-black dark:text-white">
                  {params.lang.toLowerCase() === "fa"
                    ? "زندگی موازی:"
                    : "Parallel Life: "}
                </span>
                &nbsp;
                {params.lang.toLowerCase() === "fa"
                  ? "در متارنگ، کاربران می‌توانند زندگی جدیدی را آغاز کرده، از ایده‌های خلاقانه بهره‌برداری کنند و در توسعه اقتصاد دیجیتال و بین‌المللی سهم داشته باشند."
                  : "In MetaRang, users can begin a new life, capitalize on creative ideas, and contribute to the growth of the digital and international economy."}
              </li>
              <li>
                <span className="font-bold text-black dark:text-white">
                  {params.lang.toLowerCase() === "fa"
                    ? "تأکید بر اصالت ایرانی:"
                    : "Emphasis on Iranian Heritage: "}
                </span>
                &nbsp;
                {params.lang.toLowerCase() === "fa"
                  ? "این پروژه با تکیه بر فرهنگ و اصالت ایرانی، فضایی مجازی و منحصر به فرد ایجاد کرده است که افراد را قادر می‌سازد به گونه‌ای متفاوت و نوآورانه در این جهان جدید مشارکت کنند."
                  : "This project creates a unique virtual space rooted in Iranian culture and heritage, enabling individuals to engage in this new world innovatively and distinctively."}
              </li>
            </ul>
          </div>
          <div className="w-full text-center bg-white dark:bg-[#1A1A18] text-[#6A6A6A] dark:text-white rounded-[30px] p-6 py-10 leading-10 text-sm md:text-lg text-justify">
            <h2 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
              {params.lang.toLowerCase() === "fa"
                ? "اهداف متارنگ:"
                : "Goals of MetaRang:"}
            </h2>
            <ul className="text-[#52545C] dark:text-[#A0A0AB] text-sm md:text-lg mt-5 leading-10">
              <li>
                <span className="font-bold text-black dark:text-white">
                  {params.lang.toLowerCase() === "fa"
                    ? "ارتقای تعاملات بین‌المللی:"
                    : "Enhancing International Interactions: "}
                  &nbsp;
                </span>
                {params.lang.toLowerCase() === "fa"
                  ? "متارنگ با ایجاد درگاه‌های بین‌المللی، فرصت‌های جدیدی برای رشد و گسترش فعالیت‌های کاربران در دنیای مجازی فراهم می‌کند."
                  : "MetaRang establishes international gateways to create new opportunities for users to grow and expand their activities in the virtual world."}
              </li>
              <li>
                <span className="font-bold text-black dark:text-white">
                  {params.lang.toLowerCase() === "fa"
                    ? "ایجاد فرصت‌های کارآفرینی:"
                    : "Creating Entrepreneurial Opportunities: "}
                  &nbsp;
                </span>
                {params.lang.toLowerCase() === "fa"
                  ? "این پلتفرم با تمرکز بر نوآوری، بستری مناسب برای توسعه کسب‌وکارها و اقتصاد بین‌المللی فراهم کرده است."
                  : "By focusing on innovation, this platform offers a suitable environment for the development of businesses and the global economy."}
              </li>
            </ul>
          </div>
          <div>
            <h2 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
              {params.lang.toLowerCase() === "fa"
                ? "چشم‌انداز متارنگ:"
                : "Vision of MetaRang:"}
              &nbsp;
            </h2>
            <p className="text-lightGray font-medium text-justify text-sm md:text-lg mt-5 leading-10">
              {params.lang.toLowerCase() === "fa"
                ? "متارنگ با تکیه بر اصالت ایرانی و فناوری پیشرفته، به دنبال ایجاد فضایی مجازی و منحصر به فرد است که افراد را قادر می‌سازد به گونه‌ای متفاوت و نوآورانه در این جهان جدید مشارکت کنند. با تمرکز بر ارتقای تعاملات بین‌المللی و ایجاد فرصت‌های کارآفرینی، متارنگ به سوی خلق آینده‌ای روشن و باشکوه برای همگان گام برمی‌دارد"
                : "With its foundation in Iranian heritage and advanced technology, MetaRang aims to create a unique virtual space where individuals can participate in this new world innovatively and distinctively. By focusing on enhancing international interactions and fostering entrepreneurial opportunities, MetaRang takes bold steps toward crafting a bright and promising future for everyone."}
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
              {params.lang.toLowerCase() === "fa"
                ? "پروژه متاورس رنگ با تکیه بر اصالت ایرانی و تکنولوژی پیشرفته، به دنبال ایجاد یک فضای مجازی منحصر به فرد است که افراد را قادر می‌سازد تا به گونه‌ای متفاوت و نوآورانه در این جهان جدید مشارکت کنند. با تمرکز بر ارتقای تعاملات بین‌المللی و ایجاد فرصت‌های کارآفرینی، متارنگ به سوی خلق آینده‌ای روشن و باشکوه برای همگان گام برمی‌دارد."
                : "The Metaverse Rang Project, rooted in Iranian heritage and powered by advanced technology, seeks to create a distinctive virtual environment that empowers individuals to engage innovatively and differently in this new world. With an emphasis on enhancing international interactions and generating entrepreneurial opportunities, MetaRang paves the way for a brilliant and prosperous future for all."}
            </p>
          </div>
        </div>
        <AboutList
          params={params}
          citizenListArrayContent={citizenListArrayContent}
          levelListArrayContent={levelListArrayContent}
        />
        <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
          <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
        </div>
      </section>
    </>
  );
}