import { cache } from "react";
import {
  getTranslation,
  getMainFile,
  getSingleLevel,
  getLevelTabs,
} from "@/components/utils/actions";

export const STATIC_ROUTE_NAMES = [
  { id: 1, unique_id: 382, route_name: "citizen-baguette" },
  { id: 2, unique_id: 383, route_name: "reporter-baguette" },
  { id: 3, unique_id: 589, route_name: "participation-baguette" },
  { id: 4, unique_id: 68, route_name: "developer-baguette" },
  { id: 5, unique_id: 69, route_name: "inspector-baguette" },
  { id: 6, unique_id: 590, route_name: "businessman-baguette" },
  { id: 7, unique_id: 71, route_name: "lawyer-baguette" },
  { id: 8, unique_id: 591, route_name: "city-council-baguette" },
  { id: 9, unique_id: 592, route_name: "the-mayor-baguette" },
  { id: 10, unique_id: 74, route_name: "governor-baguette" },
  { id: 11, unique_id: 75, route_name: "minister-baguette" },
  { id: 12, unique_id: 76, route_name: "judge-baguette" },
  { id: 13, unique_id: 77, route_name: "legislator-baguette" },
] as const;

export const TAB_TITLE_MAP: Record<string, number> = {
  "general-info": 387,
  licenses: 388,
  gem: 389,
  gift: 390,
  prize: 391,
};

export const getLevelMeta = (levelName: string) =>
  STATIC_ROUTE_NAMES.find((x) => x.route_name === levelName);

// فقط آرگومان‌های primitive تا cache() درست کار کند
export const getLangData = cache(async (lang: string) => getTranslation(lang));

export const getMainData = cache(async (lang: string) =>
  getMainFile(await getLangData(lang))
);

export const getLevelData = cache(async (levelId: number) =>
  getSingleLevel(levelId)
);

export const getTabData = cache(
  async (lang: string, levelName: string, tabs: string, levelId: number) =>
    getLevelTabs({ lang, levelName, tabs }, levelId)
);
