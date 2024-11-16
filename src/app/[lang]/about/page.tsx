import {
  getAllLevels,
  getFooterData,
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
} from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import SideBar from "@/components/module/sidebar/SideBar";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import BreadCrumb from "@/components/shared/BreadCrumb";
import UserCard from "@/components/shared/UserCard";
import { staticMenuToShow as MenuStaticData } from "@/components/utils/constants";

export default async function AboutPage({ params }: any) {
  function convertPersianToEnglishNumber(slug: any) {
    // Replace Persian/Arabic digits with English digits using regex
    return Number(
      slug.replace(/[۰-۹]/g, (char: any) => char.charCodeAt(0) - 1776)
    );
  }

  const defaultTheme = useServerDarkMode();

  const levelArray = await getAllLevels();

  // convert persian digit to eng digit in DATA
  levelArray.forEach((item: any) => {
    item.slug = convertPersianToEnglishNumber(item.slug);
  });

  const footerTabs = await getFooterData(params);

  const langArray = await getLangArray();

  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);

  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const Citizenship = await findByModalName(mainData, "Citizenship-profile");
  const citizenListArrayContent = await findByTabName(
    Citizenship,
    "list-citizen"
  );

  const levelModals = await findByModalName(mainData, "levels");
  const levelListArrayContent = await findByTabName(levelModals, "level-list");

  function localFind1(_name: any) {
    return citizenListArrayContent.find((item: any) => item.name == _name)
      ?.translation;
  }
  function localFind2(_name: any) {
    return levelListArrayContent.find((item: any) => item.name == _name)
      ?.translation;
  }

  const staticMenuToShow = MenuStaticData;

  const staticUsers = [
    {
      id: 1,
      name: "حسین قدیری",
      profile_photo: "/profile/hossein-ghadiri.jpg",
      code: "HM-2000001",
      score: "",
      levels: { current: { name: "بنیان گذار" } },
    },
    {
      id: 2,
      name: "امیر مدنی فر",
      profile_photo: "",
      code: "HM-2000002",
      score: "",
      levels: { current: { name: "بنیان گذار" } },
    },
    {
      id: 3,
      name: "عباس آجرلو",
      profile_photo: "",
      code: "HM-2000005",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 4,
      name: "مهدی غلام حسینی",
      profile_photo: "",
      code: "HM-2000008",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 5,
      name: "نازنین حشمتی",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 6,
      name: "امیر محسنی",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 7,
      name: "امین دهقان نژاد",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 8,
      name: "فاطمه نصیری",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 9,
      name: "بنیامین نوری",
      profile_photo: "",
      code: "HM-2000011",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 10,
      name: "مصطفی قدیری",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 11,
      name: "محمدجواد گرئی",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 12,
      name: "امیر حسین امینی",
      profile_photo: "",
      code: "HM-2000010",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 13,
      name: "آی تای ملکی",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 14,
      name: "یوسف خدری",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 15,
      name: "پرهام امین لو",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 16,
      name: "محمدرضا اصغری",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 17,
      name: "مرضیه ثاقب علیزاده",
      profile_photo: "",
      code: "HM-2000003",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 18,
      name: "سعید زاجکانی",
      profile_photo: "",
      code: "HM-2000009",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 19,
      name: "پارسا بهرامی",
      profile_photo: "",
      code: "HM-2000491",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
  ];

  // add staticMenuToShow values to siblings tabsMenu values
  tabsMenu.forEach((tab: any) => {
    let findInStatic = staticMenuToShow.find(
      (val: any) => tab.name == val.name
    );
    if (findInStatic) {
      tab.url = findInStatic.url;
      tab.order = findInStatic.order;
      tab.toShow = true;
    }
  });

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: await localFind1("metaverse rang"),
    url: `https://rgb.irpsc.com/${params.lang}/about`,
    logo: `https://rgb.irpsc.com/logo.png`,
    description: "???",
    brand: "متارنگ",
    foundingDate: "2021-11-06",
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "میرداماد، 824H+JG2",
        addressLocality: "قزوین",
        addressRegion: "استان قزوین",
        addressCountry: "ایران",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "36.2811",
        longitude: "50.0000",
      },
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+989120820120",
        contactType: "customer service",
        availableLanguage: ["Persian", "English"],
      },
      {
        "@type": "ContactPoint",
        telephone: "02833647125",
        contactType: "office",
      },
    ],
    sameAs: ["https://www.instagram.com/rgb.irpsc"],
    founders: [
      {
        "@type": "Organization",
        name: "شرکت تعاونی زنجیره تامین بهشت",
      },
      {
        "@type": "Person",
        name: "امیر مدنی فر",
      },
    ],
    mission: "توسعه زیرساخت های دنیای مجازی و موازی بر پایه ارائه خدمات منسجم",
    address: {
      "@type": "PostalAddress",
      streetAddress: "میرداماد، 824H+JG2",
      addressLocality: "قزوین",
      addressRegion: "استان قزوین",
      addressCountry: "ایران",
    },
    telephone: "+989127855049",
    email: "hq@irpsc.com",
  };

  return (
    <>
      {/* SCHEMA** */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />
      <div className={`flex`} dir={langData.direction}>
        <SideBar
          langArray={langArray}
          langData={langData}
          tabsMenu={tabsMenu}
          defaultTheme={defaultTheme}
          params={params}
          pageSide="citizen"
        />
        <section
          // id={`${
          //   themeDataActive == "dark" ? "dark-scrollbar" : "light-scrollbar"
          // }`}

          className={`h-[calc(100vh-60px)] lg:h-screen overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0`}
        >
          {/* Breadcrumb */}
          <div className="px-12">
            <BreadCrumb params={params} />
          </div>
          <section className="mx-auto px-4 lg:px-9">
            <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
              درباره ما
            </h1>
            <div className="flex flex-col gap-10 ">
              <div>
                <h3 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
                  پروژه متاورس رنگ (متارنگ)
                </h3>
                <p className="text-lightGray font-medium text-justify text-sm md:text-lg mt-5 leading-10">
                  ** متارنگ، نخستین پروژه متاورسی ایران، با هدف ایجاد جهانی
                  مجازی و موازی با تأکید بر فرهنگ و اصالت ایرانی آغاز به کار
                  کرده است. این پلتفرم با بهره‌گیری از فناوری‌های پیشرفته،
                  دریچه‌ای به سوی آینده‌ای دیجیتالی می‌گشاید که امکان زندگی،
                  تعامل و کسب‌وکار در دنیایی موازی را برای کاربران فراهم می‌کند.
                </p>
              </div>
              <div className="w-full text-center bg-white dark:bg-dark-background font-medium text-[#6A6A6A] dark:text-white rounded-[30px] p-6 py-10 leading-10 text-sm md:text-lg text-justify">
                <p>
                  **متارنگ** با تأکید بر نوآوری و کارآفرینی، بستری را فراهم کرده
                  است که افراد می‌توانند از طریق آن به توسعه‌ی کسب و کارها و
                  اقتصاد بین‌المللی بپردازند. این پلتفرم با ایجاد درگاه‌های
                  بین‌المللی، امکان تعاملات هدفمند و سازنده را با دیگر کشورها و
                  فرهنگ‌ها فراهم می‌کند، و به این ترتیب، کاربران قادر خواهند بود
                  تا فرصت‌های جدیدی برای رشد و گسترش فعالیت‌های خود در دنیای
                  مجازی بیابند. زندگی در متارنگ، نه تنها یک تجربه مجازی است،
                  بلکه به عنوان یک زندگی موازی با جهان واقعی تعریف می‌شود. در
                  این جهان مجازی، شما می‌توانید زندگی جدیدی را آغاز کنید، از
                  ایده‌های خلاقانه بهره ببرید و در توسعه‌ی اقتصاد دیجیتال و
                  بین‌المللی سهم داشته باشید.
                </p>
              </div>

              <div>
                <h3 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
                  ویژگی‌های برجسته متارنگ:
                </h3>
                <ul className="text-lightGray font-medium text-justify text-sm md:text-lg mt-5 leading-10 ">
                  <li>
                    <span className="font-bold text-black dark:text-white">
                      نوآوری و کارآفرینی:
                    </span>{" "}
                    متارنگ بستری را فراهم کرده است که افراد می‌توانند
                    کسب‌وکارهای خود را توسعه داده و در اقتصاد دیجیتال مشارکت
                    کنند. این پلتفرم با ایجاد درگاه‌های بین‌المللی، امکان
                    تعاملات هدفمند و سازنده با دیگر کشورها و فرهنگ‌ها را فراهم
                    می‌کند.
                  </li>
                  <li>
                    <span className="font-bold text-black dark:text-white">
                      زندگی موازی:
                    </span>{" "}
                    در متارنگ، کاربران می‌توانند زندگی جدیدی را آغاز کرده، از
                    ایده‌های خلاقانه بهره‌برداری کنند و در توسعه اقتصاد دیجیتال
                    و بین‌المللی سهم داشته باشند.
                  </li>
                  <li>
                    <span className="font-bold text-black dark:text-white">
                      تأکید بر اصالت ایرانی:
                    </span>{" "}
                    این پروژه با تکیه بر فرهنگ و اصالت ایرانی، فضایی مجازی و
                    منحصر به فرد ایجاد کرده است که افراد را قادر می‌سازد به
                    گونه‌ای متفاوت و نوآورانه در این جهان جدید مشارکت کنند.
                  </li>
                </ul>
              </div>

              <div className="w-full text-center bg-white dark:bg-[#1A1A18] text-[#6A6A6A] dark:text-white rounded-[30px] p-6 py-10 leading-10 text-sm md:text-lg text-justify">
                <h3 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
                  اهداف متارنگ:
                </h3>
                <ul className="text-[#52545C] dark:text-[#A0A0AB] text-sm md:text-lg mt-5 leading-10">
                  <li className="">
                    <span className="font-bold text-black dark:text-white">
                      ارتقای تعاملات بین‌المللی:&nbsp;
                    </span>
                    متارنگ با ایجاد درگاه‌های بین‌المللی، فرصت‌های جدیدی برای
                    رشد و گسترش فعالیت‌های کاربران در دنیای مجازی فراهم می‌کند.
                  </li>
                  <li className="">
                    <span className="font-bold text-black dark:text-white">
                      ایجاد فرصت‌های کارآفرینی:&nbsp;
                    </span>
                    این پلتفرم با تمرکز بر نوآوری، بستری مناسب برای توسعه
                    کسب‌وکارها و اقتصاد بین‌المللی فراهم کرده است.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
                  چشم‌انداز متارنگ:&nbsp;
                </h3>
                <p className="text-lightGray font-medium text-justify text-sm md:text-lg mt-5 leading-10">
                  متارنگ با تکیه بر اصالت ایرانی و فناوری پیشرفته، به دنبال
                  ایجاد فضایی مجازی و منحصر به فرد است که افراد را قادر می‌سازد
                  به گونه‌ای متفاوت و نوآورانه در این جهان جدید مشارکت کنند. با
                  تمرکز بر ارتقای تعاملات بین‌المللی و ایجاد فرصت‌های کارآفرینی،
                  متارنگ به سوی خلق آینده‌ای روشن و باشکوه برای همگان گام
                  برمی‌دارد.
                </p>
              </div>
              <div className="w-full text-center bg-white dark:bg-[#1A1A18] text-[#6A6A6A] dark:text-white rounded-[30px] p-6 py-10 leading-10 text-sm md:text-lg text-justify">
                <h3 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
                  تیم متاورس&nbsp;
                </h3>
                <p className="text-lightGray dark:text-white font-medium text-justify text-sm md:text-lg mt-5 leading-10">
                  **پروژه متاورس رنگ** با تکیه بر اصالت ایرانی و تکنولوژی
                  پیشرفته، به دنبال ایجاد یک فضای مجازی منحصر به فرد است که
                  افراد را قادر می‌سازد تا به گونه‌ای متفاوت و نوآورانه در این
                  جهان جدید مشارکت کنند. با تمرکز بر ارتقای تعاملات بین‌المللی و
                  ایجاد فرصت‌های کارآفرینی، متارنگ به سوی خلق آینده‌ای روشن و
                  باشکوه برای همگان گام برمی‌دارد.
                </p>
              </div>
            </div>

            <div className="flex flex-row flex-wrap justify-center md:justify-center w-full no-scrollbar overflow-y-auto py-[20px]">
              {staticUsers.map((item: any, index: any) => (
                <UserCard
                  key={index}
                  item={item}
                  index={index}
                  params={params}
                  minWidth={`260px`}
                  levelText={localFind2("developer")}
                  buttonText={localFind1("citizen page")}
                />
              ))}
            </div>
          </section>
          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <DynamicFooter footerTabs={footerTabs} />
          </div>
        </section>
      </div>
    </>
  );
}
