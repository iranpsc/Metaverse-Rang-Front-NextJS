/* ------------------------------------------------------------------ */
/*   SHARED CONFIG — used by BuildingsSummary, BuildingsChart, BuildingsList */
/* ------------------------------------------------------------------ */

export type Period = "daily" | "weekly" | "monthly" | "yearly";

export const PERIOD_OPTIONS: { key: Period; uniqueId: number; fallback: string }[] = [
  { key: "daily", uniqueId: 1429, fallback: "روزانه" },
  { key: "weekly", uniqueId: 1430, fallback: "هفتگی" },
  { key: "monthly", uniqueId: 1431, fallback: "ماهانه" },
  { key: "yearly", uniqueId: 1432, fallback: "سالانه" },
];

/* The /buildings/summary endpoint gives a reliable `karbari` code
   directly (a, m, t, g, s, b, e, n) — unlike the citizen features
   endpoint, we don't need to fuzzy-match on the label text here. */
export type BuildingKarbariCode = "a" | "m" | "t" | "g" | "s" | "b" | "e" | "n";

export type IconKey =
  | "education"
  | "residential"
  | "commercial"
  | "tourism"
  | "greenSpace"
  | "health"
  | "office"
  | "exhibition"
  | "default";

interface KarbariStyle {
  icon: IconKey;
  color: string;
  labelEn: string;
  /** uniqueId to look up via findByUniqueId(mainData, uniqueId) at render
   *  time — same pattern as PERIOD_OPTIONS. labelFa is only the fallback
   *  shown when that lookup misses.
   *  TODO: replace these placeholder numbers with the real uniqueIds. */
  uniqueId: number;
  labelFa: string;
}

export const BUILDING_KARBARI_STYLE: Record<BuildingKarbariCode, KarbariStyle> = {
  a: { icon: "education", color: "#2E9CE0", labelEn: "Education", uniqueId:1802 /* TODO */, labelFa: "آموزشی" },
  m: { icon: "residential", color: "#D4A017", labelEn: "Residential", uniqueId:1803 /* TODO */, labelFa: "مسکونی" },
  t: { icon: "commercial", color: "#E4574F", labelEn: "Commercial", uniqueId: 1804 /* TODO */, labelFa: "تجاری" },
  g: { icon: "tourism", color: "#1F3B57", labelEn: "Tourism", uniqueId:1805 /* TODO */, labelFa: "گردشگری" },
  s: { icon: "greenSpace", color: "#27AE60", labelEn: "Green space", uniqueId: 1806 /* TODO */, labelFa: "فضای سبز" },
  b: { icon: "health", color: "#8E44AD", labelEn: "Health", uniqueId: 1807 /* TODO */, labelFa: "بهداشتی" },
  e: { icon: "office", color: "#6B7280", labelEn: "Office", uniqueId: 1517 /* از پیام شما */, labelFa: "اداری" },
  n: { icon: "exhibition", color: "#10B981", labelEn: "Exhibition", uniqueId: 0 /* TODO */, labelFa: "نمایشگاه" },
};

export function styleForKarbari(code: string): KarbariStyle {
  return (
    BUILDING_KARBARI_STYLE[code as BuildingKarbariCode] || {
      icon: "default",
      color: "#84858F",
      labelEn: code,
      uniqueId: 0,
      labelFa: code,
    }
  );
}

export interface KarbariOption {
  code: string;
  label: string;
}