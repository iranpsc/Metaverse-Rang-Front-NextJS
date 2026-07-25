"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import FeaturesChart from "./FeaturesChart";
import {
  Period,
  PERIOD_OPTIONS,
  PERIOD_LABEL_FA,
  KarbariOption,
  IconKey,
  resolveIconKey,
  ICON_COLORS,
} from "./featuresShared";

/* ------------------------------------------------------------------ */
/*                                TYPES                                */
/* ------------------------------------------------------------------ */
interface FeatureSummaryItem {
  karbari: string;
  label: string;
  current_count: number;
  bought_count: number;
  sold_count: number;
}

/* ------------------------------------------------------------------ */
/*                                 ICON                                 */
/* ------------------------------------------------------------------ */
function FeatureIcon({ iconKey, color }: { iconKey: IconKey; color: string }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none" };
  switch (iconKey) {
    case "tourism":
      return (
        <svg {...common}>
          <path d="M4 21h16M5 21V9l7-5 7 5v12M9 21v-6h6v6" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "commercial":
      return (
        <svg {...common}>
          <path d="M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16M9 21v-5h6v5" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "residential":
      return (
        <svg {...common}>
          <path d="M4 11l8-7 8 7M6 10v10h12V10" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M10 20v-6h4v6" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "education":
      return (
        <svg {...common}>
          <path d="M12 5L2 9l10 4 10-4-10-4Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" stroke={color} strokeWidth="1.6" />
        </svg>
      );
    case "exhibition":
      return (
        <svg {...common}>
          <path d="M4 21V10l8-6 8 6v11M4 21h16M9 21v-5h6v5" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8 13h.01M16 13h.01" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "park":
      return (
        <svg {...common}>
          <path d="M12 3l4 6h-2l3.5 5H16l3 5H5l3-5H6.5L10 9H8l4-6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 19v2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "health":
      return (
        <svg {...common}>
          <path d="M12 21s-7-4.4-9.5-9C.7 8.2 3 4.5 6.7 4.5c2 0 3.6 1.1 4.3 2.7.7-1.6 2.3-2.7 4.3-2.7 3.7 0 6 3.7 4.2 7.5C19 16.6 12 21 12 21Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M4 21V6l8-3 8 3v15M4 21h16M9 21v-4h6v4" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*                             FEATURE CARD                             */
/* ------------------------------------------------------------------ */
function FeatureCard({
  item,
  period,
  isFa,
}: {
  item: FeatureSummaryItem;
  period: Period;
  isFa: boolean;
}) {
  const iconKey = resolveIconKey(item.label);
  const color = ICON_COLORS[iconKey];

  return (
    <div className="bg-white dark:bg-darkGray rounded-2xl p-5 flex flex-col gap-3 w-full">
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}22` }}
        >
          <FeatureIcon iconKey={iconKey} color={color} />
        </div>
        <div>
          <p className="text-black dark:text-white font-bold text-sm">
            {item.label}
          </p>
          <p className="text-lightGray dark:text-lightGray text-xs mt-1">
            {isFa
              ? `دارای ${item.current_count.toLocaleString("fa-IR")} بنای تکمیل شده`
              : `${item.current_count.toLocaleString("en-US")} completed units`}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs mt-1 pt-2 border-t border-black/5 dark:border-white/10">
        <span className="flex items-center gap-1 font-bold text-green-500">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 0L10 8H0L5 0Z" fill="currentColor" />
          </svg>
          {item.bought_count.toLocaleString(isFa ? "fa-IR" : "en-US")}
          <span className="text-lightGray font-normal">
            {isFa ? " خریداری شده" : " bought"}
          </span>
        </span>
        <span className="flex items-center gap-1 font-bold text-red-500">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            style={{ transform: "rotate(180deg)" }}
          >
            <path d="M5 0L10 8H0L5 0Z" fill="currentColor" />
          </svg>
          {item.sold_count.toLocaleString(isFa ? "fa-IR" : "en-US")}
          <span className="text-lightGray font-normal">
            {isFa ? " فروخته شده" : " sold"}
          </span>
        </span>
      </div>
      <p className="text-lightGray text-[11px] text-left rtl:text-right -mt-1">
        {isFa ? PERIOD_LABEL_FA[period] : period}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                         MAIN FEATURES SUMMARY                        */
/* ------------------------------------------------------------------ */
export default function FeaturesSummary({
  params,
  mainData,
}: {
  params: any;
  mainData: any;
}) {
  const lang: string = params?.lang || "fa";
  const isFa = lang.toLowerCase() === "fa";

  const [period, setPeriod] = useState<Period>("weekly");

  // Discovered from the first (unfiltered) API response, since the full
  // list of karbari codes isn't documented ahead of time. Shared with
  // FeaturesChart so both stay in sync off the same filters.
  const [knownKarbari, setKnownKarbari] = useState<KarbariOption[]>([]);
  const [selectedKarbari, setSelectedKarbari] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  const [summaryData, setSummaryData] = useState<FeatureSummaryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isAllSelected =
    knownKarbari.length > 0 && selectedKarbari.length === knownKarbari.length;

  const toggleAll = () => {
    setSelectedKarbari(isAllSelected ? [] : knownKarbari.map((k) => k.code));
  };

  const toggleKarbari = (code: string) => {
    setSelectedKarbari((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  /* ---------------------- data fetching ---------------------- */
  const fetchSummary = async (codesOverride?: string[] | null) => {
    try {
      setLoading(true);
      setError(false);

      const qs = new URLSearchParams();
      const codes = codesOverride !== undefined ? codesOverride : selectedKarbari;
      const sendFilter =
        codes !== null && knownKarbari.length > 0 && codes.length < knownKarbari.length;

      if (sendFilter) {
        (codes as string[]).forEach((c) => qs.append("karbari", c));
      }
      qs.append("period", period);

      const res = await axios.get(
        `https://api.metarang.com/api/citizen/${params.id}/features/summary?${qs.toString()}`,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("[features/summary] raw response:", res.data);

      const data: FeatureSummaryItem[] = res.data?.data || [];
      setSummaryData(data);

      if (!initialized) {
        const codesFromResponse = data.map((d) => ({
          code: d.karbari,
          label: d.label,
        }));
        setKnownKarbari(codesFromResponse);
        setSelectedKarbari(codesFromResponse.map((c) => c.code));
        setInitialized(true);
      }
    } catch (err) {
      console.error("Error fetching features summary:", err);
      setError(true);
      setSummaryData([]);
    } finally {
      setLoading(false);
    }
  };

  // first load: fetch unfiltered to discover available karbari codes
  useEffect(() => {
    fetchSummary(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // re-fetch ("sort") whenever the period or filters change, after init
  useEffect(() => {
    if (!initialized) return;
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, JSON.stringify(selectedKarbari)]);

  const orderedSummary = knownKarbari
    .map((k) => summaryData.find((s) => s.karbari === k.code))
    .filter(Boolean) as FeatureSummaryItem[];

  return (
    <div className="w-full pt-7 flex flex-col gap-3">
      {/* header */}
      <div className="flex flex-col gap-3">
        <h2 className="text-black dark:text-white text-lg font-black lg:text-2xl">
          {findByUniqueId(mainData, 1438) ||
            (isFa ? "خلاصه کاربری املاک" : "Property feature summary")}
        </h2>
        <p className="text-[#A0A0AB] text-base my-1">
          {findByUniqueId(mainData, 1439) ||
            (isFa
              ? "در این قسمت مقدار املاک به تفکیک نوع کاربری را مشاهده میکنید."
              : "This section shows your property counts broken down by feature type.")}
        </p>
      </div>

      {/* karbari filters — shared by cards below AND the chart */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-2">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleAll}
            className="accent-light-primary dark:accent-dark-yellow w-4 h-4"
          />
          {isFa ? "تمام کاربری‌ها" : "All feature types"}
        </label>

        {knownKarbari.map((k) => (
          <label
            key={k.code}
            className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white"
          >
            <input
              type="checkbox"
              checked={selectedKarbari.includes(k.code)}
              onChange={() => toggleKarbari(k.code)}
              className="accent-light-primary dark:accent-dark-yellow w-4 h-4"
            />
            {k.label}
          </label>
        ))}
      </div>

      {/* period ("sort") switch — same pattern as the other pages */}
      <div className="flex justify-between gap-3 md:max-w-[60%] lg:max-w-[40%] h-[56px]">
        {PERIOD_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setPeriod(opt.key)}
            className={`moment bg-white dark:bg-darkGray text-[#84858F] p-2 rounded-xl w-full ${
              period === opt.key
                ? "border-2 border-light-primary dark:border-dark-yellow border-solid dark:text-dark-yellow text-light-primary font-bold"
                : ""
            }`}
          >
            {findByUniqueId(mainData, opt.uniqueId) || opt.fallback}
          </button>
        ))}
      </div>

      {/* summary cards */}
      {error && (
        <p className="w-full text-center text-red-400 py-4">
          {isFa ? "خطا در دریافت اطلاعات." : "Failed to load data."}
        </p>
      )}

      {!error && initialized && selectedKarbari.length === 0 && (
        <p className="w-full text-center text-lightGray py-4">
          {isFa ? "حداقل یک کاربری را انتخاب کنید." : "Select at least one feature type."}
        </p>
      )}

      {!error && (!initialized || selectedKarbari.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full py-2">
          {loading && orderedSummary.length === 0
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-darkGray rounded-2xl p-5 h-[140px] animate-pulse"
                />
              ))
            : orderedSummary.map((item) => (
                <FeatureCard
                  key={item.karbari}
                  item={item}
                  period={period}
                  isFa={isFa}
                />
              ))}
        </div>
      )}

      {/* chart — separate component, driven by the same period/filters */}
      {initialized && (
        <FeaturesChart
          params={params}
          period={period}
          selectedKarbari={selectedKarbari}
          knownKarbari={knownKarbari}
          isAllSelected={isAllSelected}
          lang={lang}
        />
      )}
    </div>
  );
}