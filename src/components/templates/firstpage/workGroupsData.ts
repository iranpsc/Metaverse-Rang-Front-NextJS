/**
 * داده‌ی کارت‌های گروه‌های کاری متارنگ (صفحه نخست، ایندکس خارجی)
 * ایشو: #119  |  یونیک‌ها: #120
 *
 * - ساختار کارت ثابت است؛ فقط این داده تغییر می‌کند.
 * - تمام متن‌ها با Unique ID از سیستم ترجمه خوانده می‌شوند.
 *   اگر ID هنوز در فایل ترجمه‌ی بک‌اند نبود، از WORK_GROUP_FALLBACK_TEXTS (فا/en) استفاده می‌شود.
 * - اضافه/حذف کارت = اضافه/حذف یک آبجکت در WORK_GROUPS (بدون کامپوننت جدید).
 */

export type Lang = "fa" | "en";

export type WorkGroupIconKey =
  | "medium"
  | "substack"
  | "youtube"
  | "linkedin"
  | "instagram"
  | "github"
  | "figma";

export interface WorkGroupRepo {
  /** Unique ID عنوان انگلیسی ریپازیتوری */
  nameId: number;
  url: string;
}

export interface WorkGroupLink {
  /** Unique ID عنوان لینک */
  labelId: number;
  url: string;
  icon: WorkGroupIconKey;
}

export interface WorkGroup {
  key: string;
  /** عنوان کارت */
  titleId: number;
  /** عنوان تکمیلی انگلیسی / فارسی */
  subtitleEnId: number;
  subtitleFaId: number;
  image: string;
  /** لینک ورود به گروه عمومی */
  groupUrl: string;
  /** اگر خالی باشد: نشان Open Source نمایش داده نمی‌شود */
  repos?: WorkGroupRepo[];
  /** سازمان گیت‌هاب (دسترسی به زیرساخت‌های سازمان) */
  org?: { labelId: number; nameEnId: number; nameFaId: number; url: string };
  /** رسانه‌های فعال */
  media?: WorkGroupLink[];
  /** نسخه‌های فیگما */
  figma?: WorkGroupLink[];
  /** لینک مستندات مرتبط (می‌تواند به زبان وابسته باشد) */
  docsUrl: string | ((lang: Lang) => string);
}

/* ------------------------------------------------------------------ */
/* IDهای مشترک (ایشو #120)                                            */
/* ------------------------------------------------------------------ */
export const WG_IDS = {
  public: 1859,
  openSource: 1860,
  publicGroupLabel: 1863, // گروه کاری پابلیک
  yes: 1864, // بله
  joinGroup: 1865, // ورود به گروه
  repositories: 1866, // مخازن پروژه
  relatedDocs: 1869, // مستندات مرتبط
  repositoryUnit: 1870, // ریپازیتوری
  groupUnit: 1871, // گروه
  docsUnit: 1872, // مستندات
  activeMedia: 1873, // رسانه های فعال
  mediaUnit: 1874, // رسانه ها
} as const;

const S3 = "https://s3.metarang.com/metarang/asset/logo_cart";
const GH = "https://github.com/iranpsc";
const googleDocs = (q: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(q)}`;

export const WORK_GROUPS: WorkGroup[] = [
  {
    key: "front",
    titleId: 1858,
    subtitleEnId: 1861,
    subtitleFaId: 1862,
    image: `${S3}/Metaverse_Rang_Front_512.jpg`,
    groupUrl: "https://ble.ir/metaverse_rang_front",
    repos: [
      { nameId: 1867, url: `${GH}/Metaverse-Rang-Front-NextJS` },
      { nameId: 1868, url: `${GH}/Metaverse-Rang-Front-ReactJS` },
    ],
    docsUrl: googleDocs("اسناد مرتبط به توسعه فرانت متارنگ"),
  },
  {
    key: "media",
    titleId: 1875,
    subtitleEnId: 1877,
    subtitleFaId: 1876,
    image: `${S3}/Metaverse_Rang_Media_512.jpg`,
    groupUrl: "https://ble.ir/metaverse_rang_media",
    media: [
      { labelId: 1754, url: "https://medium.com/@metarang.iran", icon: "medium" },
      { labelId: 280, url: "https://www.linkedin.com/company/metaverse-rang", icon: "linkedin" },
      { labelId: 283, url: "https://www.youtube.com/@metargb", icon: "youtube" },
      { labelId: 1753, url: "https://substack.com/@metarang", icon: "substack" },
      { labelId: 279, url: "https://www.instagram.com/metaverse_rang", icon: "instagram" },
    ],
    docsUrl: googleDocs("اسناد مرتبط به رسانه های متارنگ"),
  },
  {
    key: "backend",
    titleId: 1878,
    subtitleEnId: 1879,
    subtitleFaId: 1880,
    image: `${S3}/Metaverse_Rang_Backend_512.jpg`,
    groupUrl: "https://ble.ir/metaverse_rang_bakend",
    repos: [
      { nameId: 1881, url: `${GH}/Metaverse-Rang-Microservice` },
      { nameId: 1882, url: `${GH}/Metaverse-Rang-Microservice-Admin-Panel` },
    ],
    docsUrl: googleDocs("اسناد مرتبط به توسعه بکند متارنگ"),
  },
  {
    key: "world3d",
    titleId: 1883,
    subtitleEnId: 1884,
    subtitleFaId: 1885,
    image: `${S3}/Metaverse_Rang_world_3d_512.jpg`,
    groupUrl: "https://ble.ir/metaverse_rang_world3d",
    repos: [
      { nameId: 1886, url: `${GH}/Metaverse-Rang-World-3D-Multiverse` },
      { nameId: 1887, url: `${GH}/Metaverse-Rang-World-3D-Multiverse-Server` },
    ],
    docsUrl: googleDocs("اسناد مرتبط به توسعه جهان سه بعدی متارنگ"),
  },
  {
    key: "github",
    titleId: 1888,
    subtitleEnId: 1890,
    subtitleFaId: 1889,
    image: `${S3}/Paradise_Supply_Chain_Holding_512.jpg`,
    groupUrl: "https://ble.ir/metaverse_rang_github",
    org: { labelId: 1891, nameEnId: 1892, nameFaId: 1894, url: GH },
    docsUrl: googleDocs("اسناد مربوط به گیت هاب iran psc متارنگ"),
  },
  {
    key: "ui",
    titleId: 1893,
    subtitleEnId: 1895,
    subtitleFaId: 1896,
    image: `${S3}/Metaverse_Rang_UI_UX_512.jpg`,
    groupUrl: "https://ble.ir/metaverse_rang_ui_ux",
    figma: [
      {
        labelId: 1897,
        url: "https://www.figma.com/design/lHgvuzgJhUFACNpMBJK0jI/ui?node-id=34-1989&t=I1MeiKvWGrsTNl1f-1",
        icon: "figma",
      },
      {
        labelId: 1898,
        url: "https://www.figma.com/design/qyvJ4Sjw4h5gRIrE9KotBY/ui-next?node-id=2474-218&t=Eq9vwV0mXGNDZvZr-1",
        icon: "figma",
      },
      // 1899 (فیگما محیط‌های سه بعدی): لینک هنوز در فایل اطلاعاتی خالی است.
      // به‌محض دریافت لینک، یک آیتم با labelId: 1899 اضافه شود.
    ],
    docsUrl: googleDocs("اسناد مربوط به توسعه رابط کاربری متارنگ"),
  },
  {
    key: "city",
    titleId: 1900,
    subtitleEnId: 1901,
    subtitleFaId: 1902,
    image: `${S3}/Metaverse_Rang_Urban_Development_512.jpg`,
    groupUrl: "https://ble.ir/metaverse_rang_urban_development",
    docsUrl: googleDocs("اسناد مرتبط به توسعه شهری متارنگ"),
  },
  {
    key: "vod",
    titleId: 1903,
    subtitleEnId: 1904,
    subtitleFaId: 1905,
    image: `${S3}/Metaverse_Rang_Sovereign_Assets_NFT_VOD_512.jpg`,
    groupUrl: "https://ble.ir/metaverse_rang_assets_nft_vod",
    repos: [{ nameId: 1906, url: `${GH}/Metaverse-Rang-Sovereign-Assets-NFT-VOD` }],
    docsUrl: googleDocs("اسناد مرتبط به اسناد مالکیت مجازی VOD متارنگ"),
  },
  {
    key: "model3d",
    titleId: 1907,
    subtitleEnId: 1908,
    subtitleFaId: 1909,
    image: `${S3}/Metaverse_Rang_3dmodel_512.jpg`,
    groupUrl: "https://ble.ir/metaverse_rang_3dmodel",
    docsUrl: googleDocs("اسناد مرتبط به مدل سازی سه بعدی متارنگ"),
  },
  {
    key: "ai",
    titleId: 1910,
    subtitleEnId: 1911,
    subtitleFaId: 1912,
    image: `${S3}/Metaverse_Rang_Semi_Intelligent_NPC_512.jpg`,
    groupUrl: "https://ble.ir/semi_intelligent_npc",
    repos: [{ nameId: 1913, url: `${GH}/Metaverse-Rang-Semi-intelligent-NPC` }],
    docsUrl: googleDocs("اسناد مرتبط به توسعه هوش مصنوعی NPC متارنگ"),
  },
  {
    key: "timetunnel",
    titleId: 1914,
    subtitleEnId: 1915,
    subtitleFaId: 1916,
    image: `${S3}/SSO_Paradise_Supply_Chain_512.jpg`,
    groupUrl: "https://ble.ir/sso_paradise_supply_chain",
    repos: [
      { nameId: 1917, url: `${GH}/SSO-Paradise-Supply-Chain-Go` },
      { nameId: 1918, url: `${GH}/SSO-Paradise-Supply-Chain-Go-Front` },
    ],
    docsUrl: googleDocs("اسناد مرتبط به سامانه تونل زمان دروازه ورود به متارنگ"),
  },
  {
    key: "geo",
    titleId: 1919,
    subtitleEnId: 1920,
    subtitleFaId: 1921,
    image: `${S3}/Metaverse_Rang_Geographical_Maps_512.jpg`,
    groupUrl: "https://ble.ir/metaverse_rang_geographical_maps",
    repos: [{ nameId: 1922, url: `${GH}/Metaverse-Rang-Geographical-Maps` }],
    docsUrl: googleDocs("اسناد مرتبط به نقشه جغرافیایی متاورس رنگ"),
  },
  {
    key: "blockchain",
    titleId: 1923,
    subtitleEnId: 1924,
    subtitleFaId: 1925,
    image: `${S3}/Metaverse_Rang_PSC_Governance_Coin_512.jpg`,
    groupUrl: "https://ble.ir/metaverse_rang_psc_coin",
    repos: [
      { nameId: 1926, url: `${GH}/Metaverse-Rang-PSC-Governance-Coin` },
      { nameId: 1927, url: `${GH}/Metaverse-Rang-PSD-Governance-Token` },
    ],
    docsUrl: (lang) => `https://metarang.com/${lang}/whitepaper`,
  },
];

/* ------------------------------------------------------------------ */
/* متن‌های جایگزین (وقتی ID هنوز در فایل ترجمه‌ی بک‌اند نیست)          */
/* ------------------------------------------------------------------ */
type T = { fa: string; en: string };

export const WORK_GROUP_FALLBACK_TEXTS: Record<number, T> = {
  // وضعیت‌ها و برچسب‌های مشترک
  1859: { fa: "پابلیک", en: "Public" },
  1860: { fa: "اوپن سورس", en: "Open Source" },
  1863: { fa: "گروه کاری پابلیک", en: "Public work group" },
  1864: { fa: "بله", en: "Yes" },
  1865: { fa: "ورود به گروه", en: "Join the group" },
  1866: { fa: "مخازن پروژه", en: "Project repositories" },
  1869: { fa: "مستندات مرتبط", en: "Related documents" },
  1870: { fa: "ریپازیتوری", en: "Repository" },
  1871: { fa: "گروه", en: "Group" },
  1872: { fa: "مستندات", en: "Documentation" },
  1873: { fa: "رسانه‌های فعال", en: "Active media" },
  1874: { fa: "رسانه", en: "Social media" },
  // رسانه‌ها
  279: { fa: "اینستاگرام", en: "Instagram" },
  280: { fa: "لینکدین", en: "LinkedIn" },
  283: { fa: "یوتیوب", en: "YouTube" },
  1753: { fa: "سابستک", en: "Substack" },
  1754: { fa: "مدیوم", en: "Medium" },

  // عنوان‌ها
  1858: { fa: "توسعه فرانت", en: "Frontend Development" },
  1875: { fa: "رسانه متارنگ", en: "MetaRang Media" },
  1878: { fa: "توسعه بکند", en: "Backend Development" },
  1883: { fa: "توسعه جهان سه بعدی", en: "3D World Development" },
  1888: { fa: "مدیریت مخازن گیت هاب", en: "GitHub Repository Management" },
  1893: { fa: "توسعه رابط کاربری", en: "UI Development" },
  1900: { fa: "توسعه شهری هوشمند", en: "Smart City Development" },
  1903: { fa: "توسعه اسناد", en: "Ownership Documents Development" },
  1907: { fa: "توسعه مدل سازی", en: "3D Modeling Development" },
  1910: { fa: "توسعه هوش مصنوعی", en: "Artificial Intelligence Development" },
  1914: { fa: "توسعه تونل زمان", en: "Time Tunnel Development" },
  1919: { fa: "توسعه جغرافیای", en: "Geographical Development" },
  1923: { fa: "توسعه بلاکچین", en: "Blockchain Development" },

  // عنوان‌های تکمیلی (انگلیسی)
  1861: { fa: "MetaRang Frontend Development Project", en: "MetaRang Frontend Development Project" },
  1877: { fa: "MetaRang Media Development Project", en: "MetaRang Media Development Project" },
  1879: { fa: "MetaRang Backend Development Project", en: "MetaRang Backend Development Project" },
  1884: { fa: "MetaRang 3D Worlds Development Project", en: "MetaRang 3D Worlds Development Project" },
  1890: { fa: "GitHub Repository Development Project", en: "GitHub Repository Development Project" },
  1895: { fa: "MetaRang User Interface Development Project", en: "MetaRang User Interface Development Project" },
  1901: { fa: "MetaRang Smart City Development Project", en: "MetaRang Smart City Development Project" },
  1904: { fa: "MetaRang Ownership Documentation Development Project", en: "MetaRang Ownership Documentation Development Project" },
  1908: { fa: "MetaRang 3D Model Development Project", en: "MetaRang 3D Model Development Project" },
  1911: { fa: "MetaRang Artificial Intelligence Development Project", en: "MetaRang Artificial Intelligence Development Project" },
  1915: { fa: "MetaRang Time Tunnel Development Project", en: "MetaRang Time Tunnel Development Project" },
  1920: { fa: "MetaRang Geographical Expansion Project", en: "MetaRang Geographical Expansion Project" },
  1924: { fa: "MetaRang Blockchain Development Project", en: "MetaRang Blockchain Development Project" },

  // عنوان‌های تکمیلی (فارسی)
  1862: { fa: "پروژه توسعه فرانت متاورس رنگ", en: "" },
  1876: { fa: "پروژه توسعه رسانه های متاورس رنگ", en: "" },
  1880: { fa: "پروژه توسعه بکند متاورس رنگ", en: "" },
  1885: { fa: "پروژه توسعه جهان های سه بعدی متاورس رنگ", en: "" },
  1889: { fa: "پروژه توسعه مخازن گیت هاب متاورس رنگ", en: "" },
  1896: { fa: "پروژه توسعه رابط کاربری متاورس رنگ", en: "" },
  1902: { fa: "پروژه توسعه شهر های هوشمند متاورس رنگ", en: "" },
  1905: { fa: "پروژه توسعه اسناد مالکیتی متاورس رنگ", en: "" },
  1909: { fa: "پروژه توسعه مدل های سه بعدی متاورس رنگ", en: "" },
  1912: { fa: "پروژه توسعه هوش مصنوعی متاورس رنگ", en: "" },
  1916: { fa: "پروژه توسعه تونل زمان متاورس رنگ", en: "" },
  1921: { fa: "پروژه توسعه جغرافیای مجازی و موازی متاورس رنگ", en: "" },
  1925: { fa: "پروژه توسعه بلاکچین متاورس رنگ", en: "" },

  // سازمان گیت‌هاب
  1891: { fa: "دسترسی به سازمان", en: "Organization access" },
  1892: { fa: "Paradise Supply Chain Holding", en: "Paradise Supply Chain Holding" },
  1894: { fa: "هلدینگ زنجیره تامین بهشت", en: "Paradise Supply Chain Holding" },

  // فیگما
  1897: { fa: "دسترسی به فیگما صفحات داخلی", en: "Figma – internal pages" },
  1898: { fa: "دسترسی به فیگما صفحات خارجی", en: "Figma – external pages" },
  1899: { fa: "دسترسی به فیگما محیط های سه بعدی", en: "Figma – 3D environments" },

  // نام ریپازیتوری‌ها (انگلیسی در هر دو زبان)
  1867: { fa: "Metaverse Rang Front NextJS", en: "Metaverse Rang Front NextJS" },
  1868: { fa: "Metaverse Rang Front React", en: "Metaverse Rang Front React" },
  1881: { fa: "Metaverse Rang Microservice", en: "Metaverse Rang Microservice" },
  1882: { fa: "Metaverse Rang Microservice Admin Panel", en: "Metaverse Rang Microservice Admin Panel" },
  1886: { fa: "Metaverse Rang World 3D Multiverse", en: "Metaverse Rang World 3D Multiverse" },
  1887: { fa: "Metaverse Rang World 3D Multiverse Server", en: "Metaverse Rang World 3D Multiverse Server" },
  1906: { fa: "Metaverse Rang Sovereign Assets NFT VOD", en: "Metaverse Rang Sovereign Assets NFT VOD" },
  1913: { fa: "Metaverse Rang Semi intelligent NPC", en: "Metaverse Rang Semi intelligent NPC" },
  1917: { fa: "SSO Paradise Supply Chain GO", en: "SSO Paradise Supply Chain GO" },
  1918: { fa: "SSO Paradise Supply Chain GO Front", en: "SSO Paradise Supply Chain GO Front" },
  1922: { fa: "Metaverse Rang Geographical Maps", en: "Metaverse Rang Geographical Maps" },
  1926: { fa: "Metaverse Rang PSC Governance Coin", en: "Metaverse Rang PSC Governance Coin" },
  1927: { fa: "Metaverse Rang PSD Governance Token", en: "Metaverse Rang PSD Governance Token" },
};

/**
 * تیتر بخش: Unique ID هنوز برایش تعریف نشده.
 * بعد از ثبت ID، مقدار `id` را پر کنید تا از سیستم ترجمه خوانده شود.
 */
export const WORK_GROUPS_SECTION_TITLE: { id?: number } & T = {
  fa: "گروه‌های کاری متاورس رنگ",
  en: "MetaRang Work Groups",
};