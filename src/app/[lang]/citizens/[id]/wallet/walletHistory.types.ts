/* ------------------------------------------------------------------ */
/*                    WALLET HISTORY — SHARED TYPES                    */
/* ------------------------------------------------------------------ */

export type Period = "daily" | "weekly" | "monthly" | "yearly";

export interface SummaryItem {
  asset: string;
  current_balance: number;
  direction: "up" | "down";
  growth_percent: number;
  period_income: number;
  period_spending: number;
  privacy_restricted: boolean;
}

export interface ChartPoint {
  amount: number;
  label: string;
}

export interface ChartAssetData {
  income: ChartPoint[];
  spending: ChartPoint[];
}

export type AssetIconType =
  | "trophy"
  | "diamond"
  | "flag"
  | "coin"
  | "gauge"
  | "blueGem"
  | "yellowSparkle";

/* Keys/order come from the API's `assets` filter (psc, irr, red, blue,
   yellow, satisfaction, effect). Update label / color here if the
   backend adds or renames an asset.
   NOTE: blue/yellow used to both point at "diamond" and rendered the
   exact same icon — each now has its own dedicated icon key. */
export const ASSET_CONFIG: Record<
  string,
  { label: string; color: string; icon: AssetIconType }
> = {
  blue: { label: "رنگ آبی", color: "#0066FF", icon: "blueGem" },
  red: { label: "رنگ قرمز", color: "#EF4444", icon: "flag" },
  yellow: { label: "رنگ زرد", color: "#FFC700", icon: "yellowSparkle" },
  satisfaction: { label: "واحد رضایت", color: "#A78BFA", icon: "trophy" },
  irr: { label: "ارز ریال", color: "#22C55E", icon: "coin" },
  effect: { label: "حد تاثیر", color: "#38BDF8", icon: "gauge" },
  psc: { label: "ارز Pcs", color: "#EAB600", icon: "coin" },
};

export const ASSET_ORDER = Object.keys(ASSET_CONFIG);

export const PERIOD_OPTIONS: { key: Period; uniqueId: number; fallback: string }[] = [
  { key: "daily", uniqueId: 1429, fallback: "روزانه" },
  { key: "weekly", uniqueId: 1430, fallback: "هفتگی" },
  { key: "monthly", uniqueId: 1431, fallback: "ماهانه" },
  { key: "yearly", uniqueId: 1432, fallback: "سالانه" },
];

export const PERIOD_EARNED_LABEL: Record<Period, string> = {
  daily: "امروز کسب شده",
  weekly: "این هفته کسب شده",
  monthly: "این ماه کسب شده",
  yearly: "امسال کسب شده",
};

/* Shared height so the real card and its skeleton always match pixel
   for pixel — prevents layout shift while data is loading. */
export const CARD_HEIGHT = "h-[220px] lg:h-[240px]";