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
          href: "http://faqhub.ir/",
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
          label: t(281),
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
  mainData: Translations | null
): SidebarLabels {
  return {
    whitePaper: findByUniqueId(mainData, 1758) || "",
    whitePaperChild: findByUniqueId(mainData, 1759) || "",
    citizens: findByUniqueId(mainData, 1588) || "",
    allCitizens: findByUniqueId(mainData, 1589) || "",
    nationalId: findByUniqueId(mainData, 1490) || "",
  };
}
