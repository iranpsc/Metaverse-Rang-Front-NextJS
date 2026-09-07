"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import FeatureCard, { FeatureCardSkeleton, type FeatureSummaryItem } from "./FeatureCard";
import { Period, PERIOD_OPTIONS, KarbariOption, getKarbariLabel, resolveIconKey } from "./featuresShared";

/* FeaturesChart drives a <canvas> via Chart.js and has no SSR value —
   loading it only on the client (and only once this section actually
   mounts) keeps it out of the initial server-rendered payload and out
   of the main JS chunk that has to parse before first paint. Helps
   both LCP (smaller initial bundle) and TBT (chart.js parses later,
   off the critical path). */
const FeaturesChart = dynamic(() => import("./FeaturesChart"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] flex items-center justify-center text-matn-2">
      &nbsp;
    </div>
  ),
});

/* ------------------------------------------------------------------ */
/*                      MAIN FEATURES SUMMARY                          */
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

  // Cancels the previous in-flight request when period/filters change
  // quickly (e.g. someone clicking through period buttons), instead of
  // letting a stale response land after a newer one — saves wasted
  // parsing/render work and avoids a flicker back to old data.
  const abortRef = useRef<AbortController | null>(null);

  const isAllSelected =
    knownKarbari.length > 0 && selectedKarbari.length === knownKarbari.length;

  const toggleAll = useCallback(() => {
    setSelectedKarbari((prev) =>
      knownKarbari.length > 0 && prev.length === knownKarbari.length ? [] : knownKarbari.map((k) => k.code)
    );
  }, [knownKarbari]);

  const toggleKarbari = useCallback((code: string) => {
    setSelectedKarbari((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
  }, []);

  /* ---------------------- data fetching ---------------------- */
  const fetchSummary = useCallback(
    async (codesOverride?: string[] | null) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

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
          `https://dev-api.metarang.com/api/citizen/${params.id}/features/summary?${qs.toString()}`,
          { headers: { "Content-Type": "application/json" }, signal: controller.signal }
        );

        const data: FeatureSummaryItem[] = res.data?.data || [];
        setSummaryData(data);

        if (!initialized) {
          const codesFromResponse = data.map((d) => ({ code: d.karbari, label: d.label }));
          setKnownKarbari(codesFromResponse);
          setSelectedKarbari(codesFromResponse.map((c) => c.code));
          setInitialized(true);
        }
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Error fetching features summary:", err);
        setError(true);
        setSummaryData([]);
      } finally {
        if (abortRef.current === controller) setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [period, JSON.stringify(selectedKarbari), knownKarbari.length, initialized, params.id]
    
  );

  // first load: fetch unfiltered to discover available karbari codes
  useEffect(() => {
    fetchSummary(null);
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // re-fetch ("sort") whenever the period or filters change, after init
  useEffect(() => {
    if (!initialized) return;
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, JSON.stringify(selectedKarbari)]);

  const orderedSummary = useMemo(
    () => knownKarbari.map((k) => summaryData.find((s) => s.karbari === k.code)).filter(Boolean) as FeatureSummaryItem[],
    [knownKarbari, summaryData]
    
  );

  return (
    <div className="w-full pt-7 flex flex-col gap-3 mt-6">
      {/* header */}
      <div className="flex flex-col gap-3">
        <h2 className="text-black dark:text-white text-lg font-black lg:text-2xl font-rokh">
          {findByUniqueId(mainData, 1784)}
        </h2>
        <p className="text-[#A0A0AB] text-base my-1 lg:text-lg">{findByUniqueId(mainData, 1785)}</p>
      </div>

      {/* karbari filters — shared by cards below AND the chart */}
      <div className="flex items-center justify-between gap-10 mt-10">
        {/* period ("sort") switch — same style/markup as the referral page */}
        <div className="flex justify-between gap-4 md:max-w-[50%] lg:max-w-[30%] h-[64px]">
          {PERIOD_OPTIONS.map((opt) => {
            const isActive = period === opt.key;
            const showLoader = isActive && loading;
            return (
              <button
                key={opt.key}
                onClick={() => setPeriod(opt.key)}
                disabled={showLoader}
                className={`moment relative bg-white dark:bg-gray-1 text-[#84858F] p-2 rounded-xl w-full px-7 flex items-center justify-center gap-2 ${
                  isActive
                    ? "border-2 border-primary  border-solid  text-primary font-bold"
                    : ""
                } ${showLoader ? "cursor-wait opacity-90" : ""}`}
              >
                {showLoader && (
                  <span
                    className="inline-block w-4 h-4 border-2 border-solid border-primary border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                  />
                )}
                <span>{findByUniqueId(mainData, opt.uniqueId) || opt.fallback}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleAll}
              className="accent-primary dark:accent-primary w-4 h-4"
            />
            {isFa ? "تمام کاربری‌ها" : "All feature types"}
          </label>

          {knownKarbari.map((k) => {
            const label = getKarbariLabel(mainData, resolveIconKey(k.label)) || k.label;
            return (
              <label
                key={k.code}
                className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white"
              >
                <input
                  type="checkbox"
                  checked={selectedKarbari.includes(k.code)}
                  onChange={() => toggleKarbari(k.code)}
                  className="accent-primary dark:accent-primary w-4 h-4"
                />
                {label}
              </label>
            );
          })}
        </div>
      </div>

      {/* summary cards */}
      {error && (
        <p className="w-full text-center text-red-400 py-4">
          {isFa ? "خطا در دریافت اطلاعات." : "Failed to load data."}
        </p>
      )}

      {!error && initialized && selectedKarbari.length === 0 && (
        <p className="w-full text-center text-matn-2 py-4">
          {isFa ? "حداقل یک کاربری را انتخاب کنید." : "Select at least one feature type."}
        </p>
      )}

      {!error && (!initialized || selectedKarbari.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 gap-y-14 mt-10 w-full py-2">
          {loading && orderedSummary.length === 0
            ? Array.from({ length: 7 }).map((_, i) => <FeatureCardSkeleton key={i} />)
            : orderedSummary.map((item) => (
                <FeatureCard key={item.karbari} item={item} isFa={isFa} mainData={mainData} />
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