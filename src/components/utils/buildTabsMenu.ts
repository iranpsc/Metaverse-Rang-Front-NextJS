import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { STATIC_ROUTE_NAMES } from "@/components/utils/levelData";

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
 * Build the level sidebar from the API catalogue. Static route metadata is
 * retained only to map stable public URLs and translation/icon IDs.
 */
export function buildLevelTabsMenu(
  translations: object | null | undefined,
  levels: Array<{ id?: number | string }> = []
): TabsMenuItem[] {
  const availableIds = new Set(
    levels.map((level) => Number(level.id)).filter(Number.isFinite)
  );

  const items = [
    { unique_id: 303, route_name: "home", menuItem: true as const },
    ...STATIC_ROUTE_NAMES
      .filter((level) => availableIds.has(level.id))
      .map((level) => ({
        unique_id: level.unique_id,
        route_name: level.route_name,
        menuItem: true as const,
      })),
  ];

  return items.map((item) => ({
    ...item,
    translation: findByUniqueId(translations, item.unique_id),
  }));
}
