const STATIC_ROUTE_NAMES = [
  { id: 1, route_name: "citizen-baguette" },
  { id: 2, route_name: "reporter-baguette" },
  { id: 3, route_name: "participation-baguette" },
  { id: 4, route_name: "developer-baguette" },
  { id: 5, route_name: "inspector-baguette" },
  { id: 6, route_name: "businessman-baguette" },
  { id: 7, route_name: "lawyer-baguette" },
  { id: 8, route_name: "city-council-baguette" },
  { id: 9, route_name: "the-mayor-baguette" },
  { id: 10, route_name: "governor-baguette" },
  { id: 11, route_name: "minister-baguette" },
  { id: 12, route_name: "judge-baguette" },
  { id: 13, route_name: "legislator-baguette" },
] as const;

const LEVEL_UNIQUE_IDS: Record<number, number> = {
  1: 382, 2: 383, 3: 589, 4: 68, 5: 69, 6: 590, 7: 71,
  8: 591, 9: 592, 10: 74, 11: 75, 12: 76, 13: 77,
};

const LEVEL_PRIMARY_COLORS = [
  "#b9af18", "#eea034", "#0d0d9e", "#9C9C9C", "#b63d8d",
  "#8233dd", "#a319ff", "#99A9DC", "#AD618E", "#008a50",
  "#2e7037", "#B10000", "#B0B0B0",
] as const;

const LEVEL_GLOW_COLORS = [
  "#F7FF92", "#FF9D2F", "#87CEEB", "#E7E7E7", "#FFB381",
  "#8e00df", "#9942c2", "#70dfff", "#f958ff", "#00ab04",
  "#155a17", "#ff0000", "#d9e8eb",
] as const;

export function getLevelNumber(item: any): number | undefined {
  const id = Number(item?.id);
  if (Number.isInteger(id) && id >= 1 && id <= 13) return id;

  const slug = item?.slug || item?.route_name;
  return STATIC_ROUTE_NAMES.find((route) => route.route_name === slug)?.id;
}

export function getGemGlowColor(item: any): string | undefined {
  const level = getLevelNumber(item);
  return level ? LEVEL_GLOW_COLORS[level - 1] : undefined;
}

export function getGemPrimaryColor(item: any): string | undefined {
  const level = getLevelNumber(item);
  return level ? LEVEL_PRIMARY_COLORS[level - 1] : undefined;
}

export function getGemRouteName(levelNumber: number | undefined): string | undefined {
  return STATIC_ROUTE_NAMES.find((route) => route.id === levelNumber)?.route_name;
}

export function getGemUniqueId(levelNumber: number | undefined): number | undefined {
  return levelNumber ? LEVEL_UNIQUE_IDS[levelNumber] : undefined;
}
