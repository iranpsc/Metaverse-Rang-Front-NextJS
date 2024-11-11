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
import LevelCard from "@/components/module/levelComponent/LevelCard";
import SideBar from "@/components/module/sidebar/SideBar";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import BreadCrumb from "@/components/shared/BreadCrumb";
import UserCard from "@/components/shared/UserCard";

export default async function AboutPage({ params }: any) {
  const staticData = [
    {
      url: "/svg/level/citizen.png",
      score: 10,
      id: 1,
      route_name: "citizen-baguette",
    },
    {
      url: "/svg/level/reporter.png",
      score: 990,
      id: 2,
      route_name: "reporter-baguette",
    },
    {
      url: "/svg/level/participation.png",
      score: 3000,
      id: 3,
      route_name: "participation-baguette",
    },
    {
      url: "/svg/level/developer.png",
      score: 8000,
      id: 4,
      route_name: "developer-baguette",
    },
    {
      url: "/svg/level/inspector.png",
      score: 18000,
      id: 5,
      route_name: "inspector-baguette",
    },
    {
      url: "/svg/level/businessman.png",
      score: 36000,
      id: 6,
      route_name: "businessman-baguette",
    },
    {
      url: "/svg/level/lawyer.png",
      score: 76000,
      id: 7,
      route_name: "lawyer-baguette",
    },
    {
      url: "/svg/level/city-council.png",
      score: 166000,
      id: 8,
      route_name: "city-council-baguette",
    },
    {
      url: "/svg/level/the-mayor.png",
      score: 366000,
      id: 9,
      route_name: "the-mayor-baguette",
    },
    {
      url: "/svg/level/governor.png",
      score: 796000,
      id: 10,
      route_name: "governor-baguette",
    },
    {
      url: "/svg/level/minister.png",
      score: 1696000,
      id: 11,
      route_name: "minister-baguette",
    },
    {
      url: "/svg/level/judge.png",
      score: 3696000,
      id: 12,
      route_name: "judge-baguette",
    },
    {
      url: "/svg/level/legislator.png",
      score: 7896000,
      id: 13,
      route_name: "legislator-baguette",
    },
  ];
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

  const staticMenuToShow = [
    { name: "home", url: ``, order: "-1" },
    { name: "citizens", url: "citizens", order: "-1" },
    { name: "list of levels", url: "levels/citizen", order: "-1" },
    { name: "property" },
    { name: "real estate" },
    { name: "structures" },
    { name: "belongings" },
    { name: "permissions" },
    { name: "invitations" },
    { name: "transaction" },
    { name: "reward" },
    { name: "dynasty" },
    { name: "connections" },
    { name: "crimes" },
    { name: "news" },
    { name: "articles" },
    { name: "trainings" },
    { name: "about" },
    { name: "contact" },
    { name: "version" },
    { name: "calendar" },
    { name: "overview" },
  ];

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
      profile_photo: "/profile/",
      code: "HM-2000002",
      score: "",
      levels: { current: { name: "بنیان گذار" } },
    },
    {
      id: 3,
      name: "عباس آجرلو",
      profile_photo: "/profile/",
      code: "HM-2000005",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 4,
      name: "مهدی غلام حسینی",
      profile_photo: "/profile/",
      code: "HM-2000008",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 5,
      name: "نازنین حشمتی",
      profile_photo: "/profile/",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 6,
      name: "امیر محسنی",
      profile_photo: "/profile/",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 7,
      name: "امین دهقان نژاد",
      profile_photo: "/profile/",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 8,
      name: "فاطمه نصیری",
      profile_photo: "/profile/",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 9,
      name: "بنیامین نوری",
      profile_photo: "/profile/",
      code: "HM-2000011",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 10,
      name: "مصطفی قدیری",
      profile_photo: "/profile/",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 11,
      name: "محمدجواد گرئی",
      profile_photo: "/profile/",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 12,
      name: "امیر حسین امینی",
      profile_photo: "/profile/",
      code: "HM-2000010",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 13,
      name: "آی تای ملکی",
      profile_photo: "/profile/",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 14,
      name: "یوسف خدری",
      profile_photo: "/profile/",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 15,
      name: "پرهام امین لو",
      profile_photo: "/profile/",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 16,
      name: "محمدرضا اصغری",
      profile_photo: "/profile/",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 17,
      name: "مرضیه ثاقب علیزاده",
      profile_photo: "/profile/",
      code: "HM-2000003",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 18,
      name: "سعید زاجکانی",
      profile_photo: "/profile/",
      code: "HM-2000009",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 19,
      name: "پارسا بهرامی",
      profile_photo: "/profile/",
      code: "HM-2000491",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
  ];

  // add staticMenuToShow values to siblings tabsMenu values
  tabsMenu.forEach((tab: any) => {
    let findInStatic = staticMenuToShow.find((val) => tab.name == val.name);
    if (findInStatic) {
      tab.url = findInStatic.url;
      tab.order = findInStatic.order;
      tab.toShow = true;
    }
  });

  return (
    <>
      <div className={`flex dark:bg-black `} dir={langData.direction}>
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
          <section className="mx-auto p-4 lg:p-9">
            <div className="flex flex-col gap-10 ">
              <div>
                <h1 className="text-[#414040] dark:text-gray-200 text-lg md:text-2xl font-bold font-rohk">
                  {" "}
                  درباره ما
                </h1>
                <p className="text-[#52545C] dark:text-[#A0A0AB] text-justify text-sm md:text-lg mt-5  leading-10">
                  پروژه متاورس رنگ** یا همان **متارنگ**، به عنوان نخستین پروژه‌ی
                  متاورسی ایران، با هدف خلق یک جهان مجازی و موازی مبتنی بر
                  چشم‌اندازی قوی ایرانی آغاز به کار کرده است. این پروژه با
                  بهره‌گیری از تکنولوژی‌هایی فراتر از باور، دریچه‌ای نو به سوی
                  آینده‌ای دیجیتالی گشوده است که امکان زندگی، تعامل و کسب و کار
                  در دنیایی موازی را برای کاربران فراهم می‌کند.
                </p>
              </div>
              <div className="w-full flex items-center  bg-[#FFFFFF] dark:bg-[#1A1A18] text-[#6A6A6A] dark:text-[#FFFFFF] rounded-[30px] p-6 py-10 leading-10 text-sm md:text-lg text-justify">
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
                <h3 className="dark:text-[#FFFFFF] text-lg md:text-2xl font-bold font-rohk">
                  تیم متاورس{" "}
                </h3>
                <p className="text-[#52545C] dark:text-[#A0A0AB] text-justify text-sm md:text-lg mt-5  leading-10">
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
        </section>
      </div>
    </>
  );
}
