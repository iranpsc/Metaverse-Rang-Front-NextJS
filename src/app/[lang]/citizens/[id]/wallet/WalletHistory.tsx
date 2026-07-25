"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { useCookies } from "react-cookie";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

/* ------------------------------------------------------------------ */
/*                                TYPES                                */
/* ------------------------------------------------------------------ */
type Period = "daily" | "weekly" | "monthly" | "yearly";

interface SummaryItem {
  asset: string;
  current_balance: number;
  direction: "up" | "down";
  growth_percent: number;
  period_income: number;
  period_spending: number;
  privacy_restricted: boolean;
}

interface ChartPoint {
  amount: number;
  label: string;
}

interface ChartAssetData {
  income: ChartPoint[];
  spending: ChartPoint[];
}

/* ------------------------------------------------------------------ */
/*                          ASSET CONFIGURATION                        */
/* ------------------------------------------------------------------ */
/* Keys/order come from the API's `assets` filter (psc, irr, red, blue,
   yellow, satisfaction, effect). Update label / color here if the
   backend adds or renames an asset. */
const ASSET_CONFIG: Record<
  string,
  { label: string; color: string; icon: "trophy" | "diamond" | "flag" | "coin" | "gauge" }
> = {
  blue: { label: "رنگ آبی", color: "#0066FF", icon: "diamond" },
  red: { label: "رنگ قرمز", color: "#EF4444", icon: "flag" },
  yellow: { label: "رنگ زرد", color: "#FFC700", icon: "diamond" },
  satisfaction: { label: "واحد رضایت", color: "#A78BFA", icon: "trophy" },
  irr: { label: "ارز ریال", color: "#22C55E", icon: "coin" },
  effect: { label: "حد تاثیر", color: "#38BDF8", icon: "gauge" },
  psc: { label: "ارز Pcs", color: "#EAB600", icon: "coin" },
};

const ASSET_ORDER = Object.keys(ASSET_CONFIG);

const PERIOD_OPTIONS: { key: Period; uniqueId: number; fallback: string }[] = [
  { key: "daily", uniqueId: 1429, fallback: "روزانه" },
  { key: "weekly", uniqueId: 1430, fallback: "هفتگی" },
  { key: "monthly", uniqueId: 1431, fallback: "ماهانه" },
  { key: "yearly", uniqueId: 1432, fallback: "سالانه" },
];

const PERIOD_EARNED_LABEL: Record<Period, string> = {
  daily: "امروز کسب شده",
  weekly: "این هفته کسب شده",
  monthly: "این ماه کسب شده",
  yearly: "امسال کسب شده",
};

/* ------------------------------------------------------------------ */
/*                               ICONS                                 */
/* ------------------------------------------------------------------ */
function AssetIcon({ type, color }: { type: string; color: string }) {
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none" };
  switch (type) {
    case "trophy":
      return (
        <svg {...common}>
          <path d="M6 3h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V3Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M6 4H3v2a4 4 0 0 0 4 4M18 4h3v2a4 4 0 0 1-4 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 12v3M9 20h6M10 17h4l.6 3H9.4l.6-3Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common}>
          <path d="M5 3v18" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M5 4h11l-2.5 4L16 12H5V4Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "coin":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.6" />
          <path d="M9.5 14.5c.4.7 1.3 1.2 2.5 1.2 1.6 0 2.6-.8 2.6-1.9 0-2.6-5-1.2-5-3.8 0-1.1 1-1.9 2.5-1.9 1.1 0 2 .4 2.4 1.1M12 7v1.2M12 15.7V17" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "gauge":
      return (
        <svg {...common}>
          <path d="M4 15a8 8 0 1 1 16 0" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 15l3.5-4.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="15" r="1.2" fill={color} />
        </svg>
      );
    case "diamond":
    default:
      return (
        <svg {...common}>
          <path d="M4 9l3.5-5h9L20 9l-8 11-8-11Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M4 9h16M9.5 4l-2 5 4.5 11 4.5-11-2-5" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*                             SUMMARY CARD                            */
/* ------------------------------------------------------------------ */
function SummaryCard({
  item,
  period,
  lang,
}: {
  item: SummaryItem;
  period: Period;
  lang: string;
}) {
  const config = ASSET_CONFIG[item.asset] || {
    label: item.asset,
    color: "#84858F",
    icon: "diamond" as const,
  };

  const isUp = item.direction === "up";
  const isFa = lang.toLowerCase() === "fa";

  return (
    <div className="bg-white dark:bg-darkGray rounded-2xl p-5 flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${config.color}22` }}
        >
          <AssetIcon type={config.icon} color={config.color} />
        </div>
      </div>

      <div>
        <p className="text-black dark:text-white font-bold text-sm">
          {config.label}
          {" : "}
          {item.privacy_restricted
            ? isFa
              ? "خصوصی"
              : "Private"
            : item.current_balance.toLocaleString(isFa ? "fa-IR" : "en-US")}
        </p>
        <p className="text-lightGray dark:text-lightGray text-xs mt-1">
          {isFa
            ? "پیشرفت شما متناسب با دارایی مسکونی"
            : "Your progress relative to this asset"}
        </p>
      </div>

      {item.asset === "satisfaction" ? (
        <a
          href="#"
          className="text-blueLink dark:text-dark-primary text-sm font-bold mt-1"
        >
          {isFa ? "مشاهده نظرات و توضیحات" : "View reviews & details"}
        </a>
      ) : (
        <div className="flex items-center justify-between text-xs mt-1">
          <span
            className={`flex items-center gap-1 font-bold ${
              isUp ? "text-green-500" : "text-red-500"
            }`}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              style={{ transform: isUp ? "none" : "rotate(180deg)" }}
            >
              <path d="M5 0L10 8H0L5 0Z" fill="currentColor" />
            </svg>
            {item.growth_percent}
            {isFa ? " درصد" : "%"}
          </span>
          <span className="text-lightGray dark:text-lightGray">
            {PERIOD_EARNED_LABEL[period]}
          </span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                          MAIN WALLET HISTORY                        */
/* ------------------------------------------------------------------ */
export default function WalletHistory({
  params,
  mainData,
}: {
  params: any;
  mainData: any;
}) {
  const lang: string = params?.lang || "fa";
  const isFa = lang.toLowerCase() === "fa";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";

  const [period, setPeriod] = useState<Period>("weekly");
  const [selectedAssets, setSelectedAssets] = useState<string[]>(ASSET_ORDER);

  const [summaryData, setSummaryData] = useState<SummaryItem[]>([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(false);

  const [chartData, setChartData] = useState<Record<string, ChartAssetData>>({});
  const [chartLoading, setChartLoading] = useState(false);

  const isAllSelected = selectedAssets.length === ASSET_ORDER.length;

  /* ---------------------- filter toggles ---------------------- */
  const toggleAll = () => {
    setSelectedAssets(isAllSelected ? [] : ASSET_ORDER);
  };

  const toggleAsset = (key: string) => {
    setSelectedAssets((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  /* ---------------------- data fetching ---------------------- */
  const buildAssetsQuery = (qs: URLSearchParams) => {
    // "all selected" == no filter, matches the API's default (all assets)
    if (!isAllSelected) {
      selectedAssets.forEach((a) => qs.append("assets", a));
    }
  };

  const fetchSummary = async () => {
    if (selectedAssets.length === 0) {
      setSummaryData([]);
      return;
    }
    try {
      setSummaryLoading(true);
      setSummaryError(false);
      const qs = new URLSearchParams();
      buildAssetsQuery(qs);
      qs.append("period", period);

      const res = await axios.get(
        `https://api.metarang.com/api/citizen/${params.id}/wallet/history/summary?${qs.toString()}`,
        { headers: { "Content-Type": "application/json" } }
      );
      setSummaryData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching wallet history summary:", error);
      setSummaryError(true);
      setSummaryData([]);
    } finally {
      setSummaryLoading(false);
    }
  };

  const fetchChart = async () => {
    if (selectedAssets.length === 0) {
      setChartData({});
      return;
    }
    try {
      setChartLoading(true);
      const qs = new URLSearchParams();
      buildAssetsQuery(qs);
      qs.append("period", period);

      const res = await axios.get(
        `https://api.metarang.com/api/citizen/${params.id}/wallet/history/chart?${qs.toString()}`,
        { headers: { "Content-Type": "application/json" } }
      );
      setChartData(res.data?.data || {});
    } catch (error) {
      console.error("Error fetching wallet history chart:", error);
      setChartData({});
    } finally {
      setChartLoading(false);
    }
  };

  // re-fetch whenever the period ("sort") or the asset filters change
  useEffect(() => {
    fetchSummary();
    fetchChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, JSON.stringify(selectedAssets)]);

  /* ---------------------- chart rendering ---------------------- */
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const assetsInChart = Object.keys(chartData).filter(
      (key) => ASSET_CONFIG[key]
    );
    const labels =
      assetsInChart.length > 0
        ? chartData[assetsInChart[0]]?.income?.map((p) => p.label) || []
        : [];

    const datasets: any[] = [];
    assetsInChart.forEach((assetKey) => {
      const config = ASSET_CONFIG[assetKey];
      const incomeSeries = chartData[assetKey]?.income?.map((p) => p.amount) || [];
      const spendingSeries = chartData[assetKey]?.spending?.map((p) => p.amount) || [];

      datasets.push({
        label: `${config.label} (${isFa ? "ورودی" : "income"})`,
        data: incomeSeries,
        borderColor: config.color,
        backgroundColor: `${config.color}33`,
        fill: true,
        pointRadius: 6,
        pointBackgroundColor: `${config.color}80`,
        pointBorderColor: config.color,
        pointBorderWidth: 2,
      });

      datasets.push({
        label: `${config.label} (${isFa ? "خروجی" : "spending"})`,
        data: spendingSeries,
        borderColor: config.color,
        backgroundColor: "transparent",
        borderDash: [6, 4],
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: config.color,
        pointBorderColor: config.color,
        pointBorderWidth: 1,
      });
    });

    const newChart = new Chart(ctx, {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor:
              theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
            titleFont: { size: 16, family: "AzarMehrFD" },
            bodyFont: { size: 14, family: "AzarMehrFD" },
            padding: 12,
            cornerRadius: 8,
            caretSize: 8,
            caretPadding: 10,
            titleColor: theme === "dark" ? "#FFFFFF" : "#000000",
            bodyColor: theme === "dark" ? "#FFFFFF" : "#000000",
          },
        },
        scales: {
          x: {
            ticks: {
              color: theme === "dark" ? "white" : "black",
              font: { size: 14, family: "AzarMehrFD" },
              maxRotation: 45,
              minRotation: 45,
              autoSkip: true,
              autoSkipPadding: 10,
              padding: 12,
            },
            grid: { color: "#484850", drawOnChartArea: true, drawTicks: false },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: theme === "dark" ? "white" : "black",
              font: { size: 14, family: "AzarMehrFD" },
              padding: 12,
            },
            grid: { color: "#484850", drawOnChartArea: true, drawTicks: false },
          },
        },
        layout: { padding: { left: -12, right: -12, top: 20, bottom: 20 } },
      },
    });

    chartRef.current = newChart;

    return () => {
      newChart.destroy();
    };
  }, [JSON.stringify(chartData), theme, isFa]);

  const handleLegendClick = (index: number) => {
    const chart = chartRef.current;
    if (!chart) return;
    chart.setDatasetVisibility(index, !chart.isDatasetVisible(index));
    chart.update();
  };

  /* ---------------------- ordered summary list ---------------------- */
  const orderedSummary = ASSET_ORDER.map((key) =>
    summaryData.find((s) => s.asset === key)
  ).filter(Boolean) as SummaryItem[];

  return (
    <div className="w-full pt-7 flex flex-col gap-3">
      {/* header */}
      <div className="flex flex-col gap-3">
        <h2 className="text-black dark:text-white text-lg font-black lg:text-2xl">
          {findByUniqueId(mainData, 1436) ||
            (isFa ? "جدول تاریخچه دارایی‌ها" : "Asset history table")}
        </h2>
        <p className="text-[#A0A0AB] text-base my-1">
          {findByUniqueId(mainData, 1437) ||
            (isFa
              ? "در این جدول مقدار پاداش و تعداد دعوتی های خود را مشاهده میکنید."
              : "This table shows your reward amounts and asset activity.")}
        </p>
      </div>

      {/* asset filters */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-2">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleAll}
            className="accent-light-primary dark:accent-dark-yellow w-4 h-4"
          />
          {isFa ? "تمام دارایی ها" : "All assets"}
        </label>

        {ASSET_ORDER.map((key) => (
          <label
            key={key}
            className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white"
          >
            <input
              type="checkbox"
              checked={selectedAssets.includes(key)}
              onChange={() => toggleAsset(key)}
              className="accent-light-primary dark:accent-dark-yellow w-4 h-4"
            />
            {ASSET_CONFIG[key].label}
          </label>
        ))}
      </div>

      {/* period ("sort") switch — same pattern as the referral chart's timeframe buttons */}
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
      {summaryError && (
        <p className="w-full text-center text-red-400 py-4">
          {isFa ? "خطا در دریافت اطلاعات." : "Failed to load data."}
        </p>
      )}

      {!summaryError && selectedAssets.length === 0 && (
        <p className="w-full text-center text-lightGray py-4">
          {isFa ? "حداقل یک دارایی را انتخاب کنید." : "Select at least one asset."}
        </p>
      )}

      {!summaryError && selectedAssets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full py-2">
          {summaryLoading && orderedSummary.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-darkGray rounded-2xl p-5 h-[150px] animate-pulse"
                />
              ))
            : orderedSummary.map((item) => (
                <SummaryCard
                  key={item.asset}
                  item={item}
                  period={period}
                  lang={lang}
                />
              ))}
        </div>
      )}

      {/* chart legend */}
      {Object.keys(chartData).length > 0 && (
        <div className="flex flex-wrap justify-start md:justify-end gap-6 mt-4">
          {Object.keys(chartData)
            .filter((key) => ASSET_CONFIG[key])
            .map((key, groupIndex) => {
              const config = ASSET_CONFIG[key];
              return (
                <div
                  key={key}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    handleLegendClick(groupIndex * 2);
                    handleLegendClick(groupIndex * 2 + 1);
                  }}
                >
                  <div
                    className="w-2 h-2 lg:w-3 lg:h-3 rounded-full"
                    style={{ backgroundColor: config.color }}
                  ></div>
                  <span style={{ color: config.color }}>{config.label}</span>
                </div>
              );
            })}
        </div>
      )}

      {/* chart */}
      <div className="overflow-x-auto light-scrollbar dark:dark-scrollbar mt-2">
        <div className="relative flex justify-center md:justify-end gap-6 text-right lg:w-full min-w-[800px]">
          {chartLoading && Object.keys(chartData).length === 0 ? (
            <div className="w-full h-[420px] flex items-center justify-center text-lightGray">
              {isFa ? "در حال بارگذاری نمودار..." : "Loading chart..."}
            </div>
          ) : (
            <canvas ref={canvasRef} id="walletHistoryChart" height="420"></canvas>
          )}
        </div>
      </div>
    </div>
  );
}