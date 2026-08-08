"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import BuildingIcon from "./BuildingIcon";
import BuildingsChart from "./BuildingsChart";
import BuildingsList from "./BuildingsList";
import { Period, PERIOD_OPTIONS, KarbariOption, styleForKarbari } from "./buildingsShared";

/* ------------------------------------------------------------------ */
/*                                TYPES                                */
/* ------------------------------------------------------------------ */
interface BuildingSummaryItem {
  karbari: string;
  label: string;
  count: number;
}

const CARD_HEIGHT = "h-[124px]";

/* ------------------------------------------------------------------ */
/*                             SUMMARY CARD                             */
/* ------------------------------------------------------------------ */
function SummaryCard({
  item,
  isFa,
  mainData,
}: {
  item: BuildingSummaryItem;
  isFa: boolean;
  mainData: any;
}) {
  const { icon, color, labelFa, labelEn, uniqueId } = styleForKarbari(item.karbari);

  // Same resolution order as everywhere else: findByUniqueId first,
  // fall back to the static labelFa/labelEn when mainData has no entry
  // for this uniqueId. item.label (raw API value) is no longer used
  // directly here so this stays consistent with BuildingsList.
  const label = findByUniqueId(mainData, uniqueId) || (isFa ? labelFa : labelEn);

  return (
    <div
      className={`bg-white relative dark:bg-gray-1 rounded-2xl p-4  flex items-center gap-3 w-full ${CARD_HEIGHT}`}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}22` }}
      >
        <BuildingIcon iconKey={icon} color={color} />
      </div>
      <div className="min-w-0">
        <p className="text-black dark:text-white font-bold text-sm truncate">{label}</p>
        <p className="text-matn-2 dark:text-matn-2 text-xs mt-1">
          {isFa
            ? `دارای ${item.count.toLocaleString("fa-IR")} بنای تکمیل شده`
            : `${item.count.toLocaleString("en-US")} completed units`}
        </p>
      </div>
      <div style={{ backgroundColor: `${color}22` }} className="h-[85%] w-[2px] absolute start-[1px]"></div>
    </div>
  );
}

function SummaryCardSkeleton() {
  return (
    <div
      className={`bg-white dark:bg-gray-1 rounded-2xl p-4 flex items-center gap-3 ${CARD_HEIGHT} animate-pulse`}
    >
      <div className="w-11 h-11 rounded-xl bg-black/5 dark:bg-white/10 shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-3 w-1/2 rounded bg-black/5 dark:bg-white/10" />
        <div className="h-2.5 w-3/4 rounded bg-black/5 dark:bg-white/10" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                      MAIN BUILDINGS SUMMARY PAGE                     */
/* ------------------------------------------------------------------ */
export default function BuildingsSummary({
  params,
  mainData,
}: {
  params: any;
  mainData: any;
}) {
  const lang: string = params?.lang || "fa";
  const isFa = lang.toLowerCase() === "fa";

  const [summaryData, setSummaryData] = useState<BuildingSummaryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // shared with BuildingsChart + BuildingsList
  const [period, setPeriod] = useState<Period>("weekly");
  const [knownKarbari, setKnownKarbari] = useState<KarbariOption[]>([]);
  const [selectedKarbari, setSelectedKarbari] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

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

  /* ---------------------- fetch summary (discovers karbari list) ---------------------- */
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await axios.get(
          `https://dev-api.metarang.com/api/citizen/${params.id}/buildings/summary`,
          { headers: { "Content-Type": "application/json" } }
        );

        const data: BuildingSummaryItem[] = res.data?.data || [];
        setSummaryData(data);

        const codes: KarbariOption[] = data.map((d) => ({ code: d.karbari, label: d.label }));
        setKnownKarbari(codes);
        setSelectedKarbari(codes.map((c) => c.code));
      } catch (err) {
        console.error("Error fetching buildings summary:", err);
        setError(true);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div className="w-full pt-7 flex flex-col gap-3">
      {/* header */}

      {/* summary cards */}
      {error && (
        <p className="w-full text-center text-red-400 py-4">
          {isFa ? "خطا در دریافت اطلاعات." : "Failed to load data."}
        </p>
      )}

      {!error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-9 w-full py-2">
          {loading && summaryData.length === 0
            ? Array.from({ length: 8 }).map((_, i) => <SummaryCardSkeleton key={i} />)
            : summaryData.map((item) => (
                <SummaryCard key={item.karbari} item={item} isFa={isFa} mainData={mainData} />
              ))}
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/*  list title/subtitle + shared filters + period, per the reference */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col gap-3 pt-10">
        <h2 className="text-black dark:text-white text-lg font-black lg:text-2xl">
          {findByUniqueId(mainData, 1813) ||
            (isFa ? "لیست املاک دارای بنا" : "Built properties list")}
        </h2>
        <p className="text-[#A0A0AB] text-base my-1">
          {findByUniqueId(mainData, 1814) ||
            (isFa
              ? "در این قسمت مقدار املاک که در بازه زمانی مورد نظر خود ساخته‌اید را مشاهده میکنید."
              : "This section shows the properties you've built in your selected time window.")}
        </p>
      </div>

<div className="flex flex-wrap gap-10 w-full items-center justify-between mt-10">
        <div className="flex justify-between gap-4 md:max-w-[50%] lg:max-w-[30%] h-[64px]">
        {PERIOD_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setPeriod(opt.key)}
            className={`moment bg-white dark:bg-gray-1 text-[#84858F] p-2 rounded-xl  w-[100px] ${
              period === opt.key
                ? "border-2 border-primary  border-solid  text-primary font-bold"
                : ""
            }`}
          >
            {findByUniqueId(mainData, opt.uniqueId) || opt.fallback}
          </button>
        ))}
      </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-2">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleAll}
            className="accent-primary dark:accent-primary w-4 h-4"
          />
          {isFa ? "تمام املاک" : "All properties"}
        </label>

        {knownKarbari.map((k) => {
          const style = styleForKarbari(k.code);
          const label =
            findByUniqueId(mainData, style.uniqueId) || (isFa ? style.labelFa : style.labelEn) || k.label;

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

      {!error && initialized && selectedKarbari.length === 0 && (
        <p className="w-full text-center text-matn-2 py-4">
          {isFa ? "حداقل یک کاربری را انتخاب کنید." : "Select at least one feature type."}
        </p>
      )}

      {initialized && selectedKarbari.length > 0 && (
        <>
          <BuildingsChart
            params={params}
            period={period}
            selectedKarbari={selectedKarbari}
            isAllSelected={isAllSelected}
            lang={lang}
            mainData={mainData}
          />
          <BuildingsList
            params={params}
            selectedKarbari={selectedKarbari}
            isAllSelected={isAllSelected}
            lang={lang}
            mainData={mainData}
          />
        </>
      )}
    </div>
  );
}