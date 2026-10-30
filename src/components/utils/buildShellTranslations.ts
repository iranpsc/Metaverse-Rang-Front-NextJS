import { findByUniqueId } from "@/components/utils/findByUniqueId";
import type { Translations } from "@/types/translations";

export type FooterLink = {
  label: string;
  href: string;
  targetBlank?: boolean;
  disabled?: boolean;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export type SidebarLabels = {
  whitePaper: string;
  whitePaperChild: string;
  citizens: string;
  allCitizens: string;
  nationalId: string;
  // dropdown / sub-menu labels (previously hard-coded in AllSideTab)
  comprehensiveGuide: string;
  trainings: string;
  categoriesEducation: string;
  categoriesArticles: string;
  categoriesNews: string;
  metarangArticles: string;
  articles: string;
  metarangNews: string;
  news: string;
  // citizen-page static tabs
  citizenWallet: string;
  citizenRealEstate: string;
  citizenBuildings: string;
  // account menu (bottom of sidebar)
  citizenProfilePage: string;
  enterMetaverse: string;
  logout: string;
  login: string;
};

/**
 * Unique IDs of the sidebar dropdown labels.
 *
 * - A number  → the label is read from the translation dictionary.
 * - `null`    → no Unique ID has been registered yet: the fallback text
 *               below is used. Put the real ID here as soon as it exists
 *               (no other file needs to change).
 */
export const SIDEBAR_LABEL_IDS = {
  // existing IDs already used elsewhere in the project
  trainings: 165,
  articles: 258,
  news: 255,
  // TODO(unique-id): register these in the translation panel, then fill in
  // دسته‌بندی‌ها: برای آموزش، مقالات و اخبار هر کدام Unique ID جدا دارند.
  // کاندیداهای موجود در کد (هنوز با دیکشنری تأیید نشده‌اند):
  //   آموزش → 340 (عنوان صفحه‌ی education/category)
  //   مقالات → 1516 (عنوان صفحه‌ی articles/categories)
  //   اخبار → 1648 (هدر NewsCategoriesSection) / 1516 (عنوان صفحه‌ی news/categories)
  categoriesEducation: 270,
  categoriesArticles: 1516,
  categoriesNews: 1648,
  comprehensiveGuide: 1455,
  metarangArticles: 1513,
  metarangNews: 1929,
  citizenWallet: 150,
  citizenRealEstate: 58,
  citizenBuildings: 1811,
  citizenProfilePage: 267,
  enterMetaverse: 163,
  logout: 268,
  login: 4,
} as const satisfies Record<string, number | null>;

/** متن جایگزین؛ زبانی که اینجا نیست (مثلاً ar) از en می‌گیرد. */
type FallbackText = { en: string } & Partial<Record<string, string>>;

const SIDEBAR_LABEL_FALLBACKS: Record<
  keyof typeof SIDEBAR_LABEL_IDS,
  FallbackText
> = {
  comprehensiveGuide: { fa: "راهنمای جامع", en: "Comprehensive guide" },
  trainings: { fa: "آموزش‌ها", en: "Trainings" },
  categoriesEducation: { fa: "دسته‌بندی‌ها", en: "Categories" },
  categoriesArticles: { fa: "دسته‌بندی‌ها", en: "Categories" },
  categoriesNews: { fa: "دسته‌بندی‌ها", en: "Categories" },
  metarangArticles: { fa: "مقالات متارنگ", en: "MetaRang Articles" },
  articles: { fa: "مقالات", en: "Articles" },
  metarangNews: { fa: "اخبار متارنگ", en: "MetaRang News" },
  news: { fa: "اخبار", en: "News" },
  citizenWallet: { fa: "دارایی ها", en: "property" },
  citizenRealEstate: { fa: "املاک و مستغلات", en: "Real Estate" },
  citizenBuildings: { fa: "املاک دارای بنا", en: "Built Properties" },
  citizenProfilePage: { fa: "صفحه مشخصات شهروند", en: "Citizen profile page" },
  enterMetaverse: { fa: "ورود به متاورس", en: "Enter the Metaverse" },
  logout: { fa: "خروج", en: "Exit" },
  login: { fa: "ورود", en: "Login" },
};

/** Resolve only the footer strings needed by the client Footer. */
export function buildFooterSections(
  mainData: Translations | null,
  lang: string
): FooterSection[] {
  const t = (id: number) => findByUniqueId(mainData, id) || "";
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  return [
    {
      title: t(1737),
      links: [
        { label: t(303), href: `/${lang}/` },
        { label: t(259), href: `/${lang}/about/` },
        {
          label: t(1738),
          href: "https://github.com/iranpsc",
          targetBlank: true,
        },
        { label: t(1739), href: `/${lang}/citizens` },
        { label: t(1740), href: `/${lang}/version` },
      ],
    },
    {
      title: t(1741),
      links: [
        { label: t(1742), href: "/build", disabled: true },
        { label: t(1743), href: `/${lang}/whitepaper` },
        { label: t(1744), href: "/sdk", disabled: true },
        { label: t(1490), href: `/${lang}/rand-id/hm` },
      ],
    },
    {
      title: t(1745),
      links: [
        { label: t(1746), href: `/${lang}/articles` },
        { label: t(1462), href: `/${lang}/education` },
        {
          label: t(1747),
          href: "https://faqhub.ir/",
          targetBlank: true,
        },
        {
          label: t(1779),
          href: apiBase,
          targetBlank: true,
        },
        { label: t(1748), href: `/${lang}/calendar` },
      ],
    },
    {
      title: t(1749),
      links: [
        {
          label: t(279),
          href: "https://www.instagram.com/metaverse_rang",
        },
        {
          label: t(280),
          href: "https://www.linkedin.com/company/metaverse-rang/",
        },
        {
          label: t(283),
          href: "https://youtube.com/@metargb?si=gdM0aFPk5SCsC7z4",
        },
        {
          label: t(1753),
          href: "https://substack.com/@metarang",
        },
        {
          label: t(1754),
          href: "https://medium.com/@metarang.iran",
        },
      ],
    },
  ];
}

export function buildFooterBrand(mainData: Translations | null): string {
  return findByUniqueId(mainData, 148) || "";
}

/** Resolve only the sidebar strings that are not already on tabsMenu. */
export function buildSidebarLabels(
  mainData: Translations | null,
  lang: string = "fa"
): SidebarLabels {
  const resolve = (key: keyof typeof SIDEBAR_LABEL_IDS): string => {
    const id = SIDEBAR_LABEL_IDS[key];
    if (id != null) {
      const v = findByUniqueId(mainData, id);
      if (v && v !== String(id)) return v;
    }
    const fb = SIDEBAR_LABEL_FALLBACKS[key];
    return fb[lang] ?? fb.en;
  };

  return {
    whitePaper: findByUniqueId(mainData, 1758) || "",
    whitePaperChild: findByUniqueId(mainData, 1759) || "",
    citizens: findByUniqueId(mainData, 1588) || "",
    allCitizens: findByUniqueId(mainData, 1589) || "",
    nationalId: findByUniqueId(mainData, 1490) || "",

    comprehensiveGuide: resolve("comprehensiveGuide"),
    trainings: resolve("trainings"),
    categoriesEducation: resolve("categoriesEducation"),
    categoriesArticles: resolve("categoriesArticles"),
    categoriesNews: resolve("categoriesNews"),
    metarangArticles: resolve("metarangArticles"),
    articles: resolve("articles"),
    metarangNews: resolve("metarangNews"),
    news: resolve("news"),

    citizenWallet: resolve("citizenWallet"),
    citizenRealEstate: resolve("citizenRealEstate"),
    citizenBuildings: resolve("citizenBuildings"),

    citizenProfilePage: resolve("citizenProfilePage"),
    enterMetaverse: resolve("enterMetaverse"),
    logout: resolve("logout"),
    login: resolve("login"),
  };
}