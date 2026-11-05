import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { STATIC_ROUTE_NAMES } from "@/components/utils/levelData";

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
  id?: number | string;
  image?: string;
};

type StaticMenuItem = {
  unique_id?: number | string;
  name?: string;
  url?: string;
  order?: string | number;
  toShow?: boolean;
};

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

export function buildLevelTabsMenu(
  translations: object | null | undefined,
  levels: Array<{
    id?: number | string;
    unique_id?: number | string;
    route_name?: string;
    photo?: string | null;
    image?: string | null;
    fallbackPhoto?: string | null;
  }> = []
): TabsMenuItem[] {
  const items = [
    { unique_id: 303, route_name: "home", menuItem: true as const },
    ...levels.flatMap((apiLevel) => {
      const routeMeta = STATIC_ROUTE_NAMES.find(
        (level) => level.id === Number(apiLevel.id)
      );
      const uniqueId = apiLevel.unique_id ?? routeMeta?.unique_id;
      const routeName = apiLevel.route_name || routeMeta?.route_name;

      if (uniqueId == null || !routeName) return [];

      return [{
        unique_id: uniqueId,
        route_name: routeName,
        menuItem: true as const,
        id: apiLevel.id,
        image: apiLevel.photo || apiLevel.image || apiLevel.fallbackPhoto ||
          `/svg/level/${routeName.replace("-baguette", "")}.png`,
      }];
    }),
  ];

  const seen = new Set<string>();
  return items
    .filter((item) => {
      const key = String(item.unique_id);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((item) => ({
      ...item,
      translation: findByUniqueId(translations, item.unique_id),
    }));
}
