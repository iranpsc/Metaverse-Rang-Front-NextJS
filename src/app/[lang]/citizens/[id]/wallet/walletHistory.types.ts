/* ------------------------------------------------------------------ */
/*                    WALLET HISTORY — SHARED TYPES                    */
/* ------------------------------------------------------------------ */

import { findByUniqueId } from "@/components/utils/findByUniqueId";

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
  | "yellowSparkle"
  | "banknote";

/* Keys/order come from the API's `assets` filter (psc, irr, red, blue,
   yellow, satisfaction, effect). Update label / color here if the
   backend adds or renames an asset.
   NOTE: blue/yellow used to both point at "diamond" and rendered the
   exact same icon — each now has its own dedicated icon key. Same
   deal for irr, which used to share "coin" with psc — it now has its
   own "banknote" icon key so the two are visually distinct. */
export const ASSET_CONFIG: Record<
  string,
  { label: string; color: string; icon: AssetIconType; uniqueId: number }
> = {
  blue: { label: "رنگ آبی", color: "#9100D9", icon: "blueGem", uniqueId: 49 },
  red: { label: "رنگ قرمز", color: "#EF4444", icon: "flag", uniqueId: 12 },
  yellow: { label: "رنگ زرد", color: "#9100D9", icon: "yellowSparkle", uniqueId: 11 },
  satisfaction: { label: "واحد رضایت", color: "#A78BFA", icon: "trophy", uniqueId: 453 },
  irr: { label: "ارز ریال", color: "#22C55E", icon: "banknote", uniqueId: 1579 },
  effect: { label: "حد تاثیر", color: "#38BDF8", icon: "gauge", uniqueId: 723 },
  psc: { label: "ارز Pcs", color: "#EAB600", icon: "coin", uniqueId: 1578 },
};

export const ASSET_ORDER = Object.keys(ASSET_CONFIG);

/* Same findByUniqueId-first / static-fallback pattern used throughout
   the app (featuresShared.getKarbariLabel, FeaturesSummary period
   buttons, etc). Call this anywhere an asset label is *displayed* —
   the raw `ASSET_CONFIG[key].label` should only be used internally
   (e.g. building descriptions) or as the fallback value itself. */
export function getAssetLabel(mainData: any, assetKey: string): string {
  const config = ASSET_CONFIG[assetKey];
  if (!config) return assetKey;
  const fromMainData = findByUniqueId(mainData, config.uniqueId);
  return fromMainData || config.label;
}

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