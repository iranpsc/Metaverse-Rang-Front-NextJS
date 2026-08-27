import { findByUniqueId } from "@/components/utils/findByUniqueId";

/**
 * Sidebar dropdowns (education / articles / news / citizens) are keyed
 * off these IDs in AllSideTab. They used to come from nested translation
 * fields; they are now injected so those blocks still mount.
 */
export const SIDEBAR_DROPDOWN_UNIQUE_IDS = [1462, 258, 255, 263] as const;

export type TabsMenuItem = {
  unique_id: number | string;
  name?: string;
  url?: string;
  order?: string | number;
  toShow?: boolean;
  translation: string;
  menuItem?: boolean;
  route_name?: string;
};

type StaticMenuItem = {
  unique_id?: number | string;
  name?: string;
  url?: string;
  order?: string | number;
  toShow?: boolean;
};

/**
 * Build the sidebar menu from the static route list + flat translations.
 * Labels are looked up with `translations[String(unique_id)]`.
 */
export function buildTabsMenu(
  translations: object | null | undefined,
  staticMenu: StaticMenuItem[] = [],
  extraUniqueIds: readonly (number | string)[] = SIDEBAR_DROPDOWN_UNIQUE_IDS
): TabsMenuItem[] {
  const items: TabsMenuItem[] = [];
  const seen = new Set<string>();

  for (const item of staticMenu) {
    if (item.unique_id == null) continue;

    const key = String(item.unique_id);
    if (seen.has(key)) continue;
    seen.add(key);

    items.push({
      ...item,
      unique_id: item.unique_id,
      translation: findByUniqueId(translations, item.unique_id),
      toShow: true,
    });
  }

  for (const id of extraUniqueIds) {
    const key = String(id);
    if (seen.has(key)) continue;
    seen.add(key);

    items.push({
      unique_id: id,
      translation: findByUniqueId(translations, id),
      toShow: false,
    });
  }

  return items;
}

/**
 * Level sidebar entries. unique_id matches translation keys AND SvgIcon.
 * Kept in sync with LevelSideTab's staticRouteNames (excluding language).
 */
export const LEVEL_MENU_ITEMS: Array<{
  unique_id: number;
  route_name: string;
  menuItem: true;
}> = [
  { unique_id: 303, route_name: "home", menuItem: true },
  { unique_id: 382, route_name: "citizen-baguette", menuItem: true },
  { unique_id: 383, route_name: "reporter-baguette", menuItem: true },
  { unique_id: 331, route_name: "participation-baguette", menuItem: true },
  { unique_id: 68, route_name: "developer-baguette", menuItem: true },
  { unique_id: 69, route_name: "inspector-baguette", menuItem: true },
  { unique_id: 70, route_name: "businessman-baguette", menuItem: true },
  { unique_id: 71, route_name: "lawyer-baguette", menuItem: true },
  { unique_id: 72, route_name: "city-council-baguette", menuItem: true },
  { unique_id: 73, route_name: "the-mayor-baguette", menuItem: true },
  { unique_id: 74, route_name: "governor-baguette", menuItem: true },
  { unique_id: 75, route_name: "minister-baguette", menuItem: true },
  { unique_id: 76, route_name: "judge-baguette", menuItem: true },
  { unique_id: 77, route_name: "legislator-baguette", menuItem: true },
];

export function buildLevelTabsMenu(
  translations: object | null | undefined
): TabsMenuItem[] {
  return LEVEL_MENU_ITEMS.map((item) => ({
    ...item,
    translation: findByUniqueId(translations, item.unique_id),
  }));
}
