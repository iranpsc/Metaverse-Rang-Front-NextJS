"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { useCookies } from "react-cookie";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

import WalletSummaryCard from "./WalletSummaryCard";
import { WalletChartSkeleton, WalletSummaryGridSkeleton } from "./WalletSkeletons";
import { buildWalletQuery } from "./walletHistory.utils";
import {
  ASSET_CONFIG,
  ASSET_ORDER,
  PERIOD_OPTIONS,
  type ChartAssetData,
  type Period,
  type SummaryItem,
} from "./walletHistory.types";

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
    setSelectedAssets((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  /* ---------------------- data fetching ---------------------- */
  const fetchSummary = useCallback(async () => {
    if (selectedAssets.length === 0) {
      setSummaryData([]);
      return;
    }
    try {
      setSummaryLoading(true);
      setSummaryError(false);
      const query = buildWalletQuery(period, selectedAssets);

      const res = await axios.get(
        `https://dev-api.metarang.com/api/citizen/${params.id}/wallet/history/summary?${query}`,
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
  }, [params.id, period, selectedAssets]);

  const fetchChart = useCallback(async () => {
    if (selectedAssets.length === 0) {
      setChartData({});
      return;
    }
    try {
      setChartLoading(true);
      const query = buildWalletQuery(period, selectedAssets);

      const res = await axios.get(
        `https://dev-api.metarang.com/api/citizen/${params.id}/wallet/history/chart?${query}`,
        { headers: { "Content-Type": "application/json" } }
      );
      setChartData(res.data?.data || {});
    } catch (error) {
      console.error("Error fetching wallet history chart:", error);
      setChartData({});
    } finally {
      setChartLoading(false);
    }
  }, [params.id, period, selectedAssets]);

  // re-fetch whenever the period or the asset filters change
  useEffect(() => {
    fetchSummary();
    fetchChart();
  }, [fetchSummary, fetchChart]);

  /* ---------------------- chart rendering ---------------------- */
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const assetsInChart = Object.keys(chartData).filter((key) => ASSET_CONFIG[key]);
    const labels = assetsInChart.length > 0 ? chartData[assetsInChart[0]]?.income?.map((p) => p.label) || [] : [];

    const datasets: any[] = [];
    assetsInChart.forEach((assetKey) => {
      const config = ASSET_CONFIG[assetKey];
      const incomeSeries = chartData[assetKey]?.income?.map((p) => p.amount) || [];
      const spendingSeries = chartData[assetKey]?.spending?.map((p) => p.amount) || [];

      datasets.push({
        label: `${findByUniqueId(mainData, config.uniqueId ) } (${isFa ? "ورودی" : "income"})`,
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
        label: `${findByUniqueId(mainData, config.uniqueId ) } (${isFa ? "خروجی" : "spending"})`,
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
            backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
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
  }, [chartData, theme, isFa]);

  const handleLegendClick = (index: number) => {
    const chart = chartRef.current;
    if (!chart) return;
    chart.setDatasetVisibility(index, !chart.isDatasetVisible(index));
    chart.update();
  };

  /* ---------------------- ordered summary list ---------------------- */
  const orderedSummary = useMemo(
    () => ASSET_ORDER.map((key) => summaryData.find((s) => s.asset === key)).filter(Boolean) as SummaryItem[],
    [summaryData]
  );

  const chartAssetKeys = useMemo(() => Object.keys(chartData).filter((key) => ASSET_CONFIG[key]), [chartData]);

  // How many skeleton placeholders to show while the first request for
  // the current filter set is still in flight.
  const skeletonCount = Math.max(selectedAssets.length, 1);

  return (
    <div className="w-full pt-7 flex flex-col gap-3">
      {/* header */}
      <div className="flex flex-col gap-4 mt-3">
        <h2 className="text-black dark:text-white text-lg font-black lg:text-2xl">
          {findByUniqueId(mainData, 1576  )}
        </h2>
        <p className="text-[#A0A0AB] text-base my-1">
          {findByUniqueId(mainData, 1577 ) }
          
        </p>
      </div>

<div className="flex flex-wrap justify-between gap-5 w-full">
        {/* asset filters */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-2 mt-1">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleAll}
            className="accent-primary dark:accent-primary w-4 h-4"
          />
          {isFa ? "تمام دارایی ها" : "All assets"}
        </label>

        {ASSET_ORDER.map((key) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white">
            <input
              type="checkbox"
              checked={selectedAssets.includes(key)}
              onChange={() => toggleAsset(key)}
              className="accent-primary dark:accent-primary w-4 h-4"
            />
            
            {findByUniqueId(mainData, ASSET_CONFIG[key].uniqueId ) }
          </label>
        ))}
      </div>

      {/* period switch */}
      <div className="flex justify-between gap-3 md:max-w-[60%] lg:max-w-[40%] h-[56px]">
        {PERIOD_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setPeriod(opt.key)}
            className={`moment bg-white dark:bg-gray-1 text-[#84858F] p-2 rounded-xl w-[100px] ${
              period === opt.key
                ? "border-2 border-primary  border-solid  text-primary font-bold"
                : ""
            }`}
          >
            {findByUniqueId(mainData, opt.uniqueId) || opt.fallback}
          </button>
        ))}
      </div>
</div>

      {/* summary cards */}
      {summaryError && (
        <p className="w-full text-center text-red-400 py-4">
          {isFa ? "خطا در دریافت اطلاعات." : "Failed to load data."}
        </p>
      )}

      {!summaryError && selectedAssets.length === 0 && (
        <p className="w-full text-center text-matn-2 py-4">
          {isFa ? "حداقل یک دارایی را انتخاب کنید." : "Select at least one asset."}
        </p>
      )}

      {!summaryError && selectedAssets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-14 w-full py-2">
          {summaryLoading && orderedSummary.length === 0 ? (
            <WalletSummaryGridSkeleton count={skeletonCount} />
          ) : (
            orderedSummary.map((item) => (
              <WalletSummaryCard key={item.asset} item={item} period={period} lang={lang} mainData={mainData}/>
            ))
          )}
        </div>
      )}

      {/* chart legend */}
      {chartAssetKeys.length > 0 && (
        <div className="flex flex-wrap justify-start md:justify-end gap-6 mt-20">
          {chartAssetKeys.map((key, groupIndex) => {
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
                <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full" style={{ backgroundColor: config.color }} />
                <span style={{ color: config.color }}>${findByUniqueId(mainData, config.uniqueId ) }</span>
              </div>
            );
          })}
        </div>
      )}

      {/* chart */}
      <div className="overflow-x-auto light-scrollbar dark:dark-scrollbar mt-2">
        <div className="relative flex justify-center md:justify-end gap-6 text-right lg:w-full min-w-[800px]">
          {chartLoading && chartAssetKeys.length === 0 ? (
            <WalletChartSkeleton />
          ) : (
            <canvas ref={canvasRef} id="walletHistoryChart" height="420" />
          )}
        </div>
      </div>
    </div>
  );
}