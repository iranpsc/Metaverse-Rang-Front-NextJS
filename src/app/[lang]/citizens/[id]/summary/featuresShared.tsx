/* ------------------------------------------------------------------ */
/*         SHARED CONFIG — used by FeaturesSummary + FeaturesChart      */
/* ------------------------------------------------------------------ */

import { findByUniqueId } from "@/components/utils/findByUniqueId";

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
   correct even if the backend adds new karbari codes later.

   NEW: added "office" (اداری) — previously any "اداری" label from the
   API fell through to "default" (no icon, no dedicated unique_id, no
   color), which is why it silently "didn't come" in the UI. */
export type IconKey =
  | "tourism"
  | "commercial"
  | "residential"
  | "education"
  | "exhibition"
  | "park"
  | "health"
  | "office"
  | "default";

export function resolveIconKey(label: string): IconKey {
  if (label.includes("گردشگری")) return "tourism";
  if (label.includes("تجاری")) return "commercial";
  if (label.includes("مسکونی")) return "residential";
  if (label.includes("آموزش")) return "education";
  if (label.includes("نمایشگاه")) return "exhibition";
  if (label.includes("پارک") || label.includes("فضای سبز")) return "park";
  if (label.includes("بهداشت")) return "health";
  if (label.includes("اداری")) return "office";

  return "default";
}

export const ICON_COLORS: Record<IconKey, string> = {
  tourism: "#1F3B57",
  commercial: "#E4574F",
  residential: "#D4A017",
  education: "#2E9CE0",
  exhibition: "#10B981",
  park: "#27AE60",
  health: "#8E44AD",
  office: "#5B6C8F",
  default: "#84858F",
};

/* ---- card title / label -------------------------------------------
   Same findByUniqueId-first pattern used everywhere else (PERIOD_OPTIONS,
   BuildingsList/Summary): resolve the visible label from mainData when a
   unique_id is known for it, otherwise fall back to the static Persian
   text. `item.label` from the API is still used to pick the icon (via
   resolveIconKey) but is no longer shown directly on screen — call
   getKarbariLabel(mainData, iconKey) for the rendered text instead.

   *** IMPORTANT — CONFIRMED STATUS OF THESE IDs ***
   None of the ids below are confirmed real CMS unique_ids yet. They are
   ALL placeholders (including "park", which looked plausible but is not
   verified — that's why park labels weren't resolving). Do not treat any
   of these as trustworthy until checked against the CMS; swap each one
   in as it's confirmed, remove it from this comment once done. */
const KARBARI_LABEL_IDS: Partial<Record<IconKey, number>> = {
  residential: 1803, // TODO: unverified placeholder
  tourism: 1805, // TODO: unverified placeholder
  commercial: 1804, // TODO: unverified placeholder
  education: 1802, // TODO: unverified placeholder
  exhibition: 1801, // TODO: unverified placeholder
  park: 1806, // TODO: unverified placeholder — confirmed NOT resolving in mainData
  health: 1807, // TODO: unverified placeholder
  office: 1517,  // TODO: get real id from CMS — new category
  // default: <unique_id>,
};

const KARBARI_LABEL_FALLBACK: Record<IconKey, string> = {
  tourism: "گردشگری",
  commercial: "تجاری",
  residential: "مسکونی",
  education: "آموزشی",
  exhibition: "نمایشگاهی",
  park: "پارک",
  health: "بهداشتی",
  office: "اداری",
  default: "سایر",
};

/* Call this from a component that has `mainData` in scope, e.g.:
   const label = getKarbariLabel(mainData, iconKey); */
export function getKarbariLabel(mainData: any, iconKey: IconKey): string {
  const uniqueId = KARBARI_LABEL_IDS[iconKey];
  const fromMainData = uniqueId != null ? findByUniqueId(mainData, uniqueId) : null;
  return fromMainData || KARBARI_LABEL_FALLBACK[iconKey];
}

/* Short back-of-card description shown on hover-flip in the summary cards.
   `mainData` isn't available at module scope (it's a per-request prop
   passed down from the server component), so this has to be a function
   that the caller passes mainData into — it can't be a plain object built
   at import time.

   *** Same caveat as above: none of these ids are confirmed real yet. *** */
const KARBARI_DESCRIPTION_IDS: Partial<Record<IconKey, number>> = {
  residential: 1793, // TODO: unverified placeholder
  // tourism: <unique_id>,
  commercial: 1794, // TODO: unverified placeholder
  education: 1795, // TODO: unverified placeholder
  exhibition: 1796, // TODO: unverified placeholder
  park: 1797, // TODO: unverified placeholder — confirmed NOT resolving in mainData
  health: 1798, // TODO: unverified placeholder
  // office: <unique_id>,  // TODO: get real id from CMS — new category
  // default: <unique_id>,
};

const KARBARI_DESCRIPTIONS_FALLBACK: Record<IconKey, string> = {
  tourism:
    "با سرمایه‌گذاری در املاک گردشگری، از رشد این حوزه در پرتفوی خود بهره‌مند می‌شوید.",
  commercial:
    "پیشرفت شما متناسب با دارایی تجاری است. برای مشاهده جزئیات بیشتر از لینک زیر استفاده کنید.",
  residential:
    "پیشرفت شما متناسب با دارایی مسکونی است. برای مشاهده جزئیات بیشتر از لینک زیر استفاده کنید.",
  education:
    "املاک آموزشی نقش مهمی در تنوع پرتفوی شما دارند و روند رشد پایداری داشته‌اند.",
  exhibition:
    "پیشرفت شما متناسب با دارایی نمایشگاهی است. برای مشاهده جزئیات بیشتر از لینک زیر استفاده کنید.",
  park:
    "املاک پارکی ارزش بلندمدت پرتفوی شما را افزایش می‌دهند.",
  health:
    "پیشرفت شما متناسب با دارایی بهداشتی است. برای مشاهده جزئیات بیشتر از لینک زیر استفاده کنید.",
  office:
    "پیشرفت شما متناسب با دارایی اداری است. برای مشاهده جزئیات بیشتر از لینک زیر استفاده کنید.",
  default:
    "پیشرفت شما متناسب با این نوع دارایی است. برای مشاهده جزئیات بیشتر از لینک زیر استفاده کنید.",
};

/* Call this from a component that has `mainData` in scope, e.g.:
   const description = getKarbariDescription(mainData, iconKey); */
export function getKarbariDescription(mainData: any, iconKey: IconKey): string {
  const uniqueId = KARBARI_DESCRIPTION_IDS[iconKey];
  const fromMainData = uniqueId != null ? findByUniqueId(mainData, uniqueId) : null;
  return fromMainData || KARBARI_DESCRIPTIONS_FALLBACK[iconKey];
}

export function colorForLabel(label: string): string {
  return ICON_COLORS[resolveIconKey(label)];
}

export interface KarbariOption {
  code: string;
  label: string;
}

/* Builds the dynamic per-property link, e.g.:
   https://dev-reactjs.metarang.com/feature/6327/info?map=25.219250,54.211946,18.00,0.0,40.0
   map = latitude,longitude,zoom,bearing,pitch */
export function buildFeatureLink(
  id: number | string,
  latitude: number,
  longitude: number,
  zoom: number = 18,
  bearing: number = 0,
  pitch: number = 40
): string {
  const lat = latitude.toFixed(6);
  const lng = longitude.toFixed(6);
  return `https://dev-reactjs.metarang.com/feature/${id}/info?map=${lat},${lng},${zoom.toFixed(2)},${bearing.toFixed(1)},${pitch.toFixed(1)}`;
}