
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

/* ------------------------------------------------------------------ */
/*                         ASSET CONFIG                                */
/* ------------------------------------------------------------------ */

export const ASSET_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
    icon: AssetIconType;
    uniqueId: number;
  }
> = {
  blue: {
    label: "رنگ آبی",
    color: "#9100D9",
    icon: "blueGem",
    uniqueId: 49,
  },

  red: {
    label: "رنگ قرمز",
    color: "#EF4444",
    icon: "flag",
    uniqueId: 12,
  },

  yellow: {
    label: "رنگ زرد",
    color: "#9100D9",
    icon: "yellowSparkle",
    uniqueId: 11,
  },

  satisfaction: {
    label: "واحد رضایت",
    color: "#A78BFA",
    icon: "trophy",
    uniqueId: 453,
  },

  irr: {
    label: "ارز ریال",
    color: "#22C55E",
    icon: "banknote",
    uniqueId: 1579,
  },

  effect: {
    label: "حد تاثیر",
    color: "#38BDF8",
    icon: "gauge",
    uniqueId: 723,
  },

  psc: {
    label: "ارز Pcs",
    color: "#EAB600",
    icon: "coin",
    uniqueId: 1578,
  },
};

export const ASSET_ORDER = Object.keys(ASSET_CONFIG);

/* ------------------------------------------------------------------ */
/*                         ASSET LABEL                                 */
/* ------------------------------------------------------------------ */

export function getAssetLabel(
  mainData: any,
  assetKey: string,
): string {
  const config = ASSET_CONFIG[assetKey];

  if (!config) {
    return assetKey;
  }

  const fromMainData = findByUniqueId(
    mainData,
    config.uniqueId,
  );

  return fromMainData || config.label;
}

/* ------------------------------------------------------------------ */
/*                         PERIOD OPTIONS                              */
/* ------------------------------------------------------------------ */

/**
 * Period switch options.
 *
 * این آرایه ثابت است و نباید به mainData وابسته باشد.
 * ترجمه واقعی هنگام render با findByUniqueId گرفته می‌شود.
 */
export const PERIOD_OPTIONS: {
  key: Period;
  uniqueId: number;
  fallback: string;
}[] = [
  {
    key: "daily",
    uniqueId: 1429,
    fallback: "روزانه",
  },
  {
    key: "weekly",
    uniqueId: 1430,
    fallback: "هفتگی",
  },
  {
    key: "monthly",
    uniqueId: 1431,
    fallback: "ماهانه",
  },
  {
    key: "yearly",
    uniqueId: 1432,
    fallback: "سالانه",
  },
];

/* ------------------------------------------------------------------ */
/*                    PERIOD EARNED LABELS                            */
/* ------------------------------------------------------------------ */

export const PERIOD_EARNED_UNIQUE_IDS: Record<Period, number> = {
  daily: 1817,
  weekly: 1818,
  monthly: 1819,
  yearly: 1820,
};

export const PERIOD_EARNED_FALLBACKS: Record<Period, string> = {
  daily: "درآمد روزانه",
  weekly: "درآمد هفتگی",
  monthly: "درآمد هفتگی",
  yearly: "درآمد سالانه",
};

/**
 * دریافت عنوان درآمد دوره از mainData
 */
export function getPeriodEarnedLabel(
  mainData: any,
  period: Period,
): string {
  const uniqueId = PERIOD_EARNED_UNIQUE_IDS[period];

  const fromMainData = findByUniqueId(
    mainData,
    uniqueId,
  );

  return (
    fromMainData ||
    PERIOD_EARNED_FALLBACKS[period]
  );
}

/**
 * دریافت تمام عنوان‌های درآمد دوره
 */
export function getPeriodEarnedLabels(
  mainData: any,
): Record<Period, string> {
  return {
    daily: getPeriodEarnedLabel(mainData, "daily"),
    weekly: getPeriodEarnedLabel(mainData, "weekly"),
    monthly: getPeriodEarnedLabel(mainData, "monthly"),
    yearly: getPeriodEarnedLabel(mainData, "yearly"),
  };
}

/* ------------------------------------------------------------------ */
/*                              CARD                                   */
/* ------------------------------------------------------------------ */

/* Same height so the real card and skeleton match pixel-for-pixel. */
export const CARD_HEIGHT = "h-[220px] lg:h-[240px]";

