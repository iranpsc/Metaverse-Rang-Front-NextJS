/* ------------------------------------------------------------------ */
/*         SHARED CONFIG — used by FeaturesSummary + FeaturesChart      */
/* ------------------------------------------------------------------ */

export type Period = "daily" | "weekly" | "monthly" | "yearly";

export const PERIOD_OPTIONS: { key: Period; uniqueId: number; fallback: string }[] = [
  { key: "daily", uniqueId: 1429, fallback: "روزانه" },
  { key: "weekly", uniqueId: 1430, fallback: "هفتگی" },
  { key: "monthly", uniqueId: 1431, fallback: "ماهانه" },
  { key: "yearly", uniqueId: 1432, fallback: "سالانه" },
];

export const PERIOD_LABEL_FA: Record<Period, string> = {
  daily: "امروز",
  weekly: "این هفته",
  monthly: "این ماه",
  yearly: "امسال",
};

/* The API only guarantees `karbari` (a short code) + `label` (Persian
   name). Codes beyond "t" / "m" aren't documented, so icon/color are
   resolved by matching on the Persian label text — this keeps the UI
   correct even if the backend adds new karbari codes later. */
export type IconKey =
  | "tourism"
  | "commercial"
  | "residential"
  | "education"
  | "exhibition"
  | "park"
  | "health"
  | "default";

export function resolveIconKey(label: string): IconKey {
  if (label.includes("گردشگری")) return "tourism";
  if (label.includes("تجاری")) return "commercial";
  if (label.includes("مسکونی")) return "residential";
  if (label.includes("آموزش")) return "education";
  if (label.includes("نمایشگاه")) return "exhibition";
  if (label.includes("پارک")) return "park";
  if (label.includes("بهداشت")) return "health";
  return "default";
}

export const ICON_COLORS: Record<IconKey, string> = {
  tourism: "#C026D3",
  commercial: "#EF4444",
  residential: "#B58C1F",
  education: "#0EA5E9",
  exhibition: "#10B981",
  park: "#22C55E",
  health: "#8B5CF6",
  default: "#84858F",
};

export function colorForLabel(label: string): string {
  return ICON_COLORS[resolveIconKey(label)];
}

export interface KarbariOption {
  code: string;
  label: string;
}
