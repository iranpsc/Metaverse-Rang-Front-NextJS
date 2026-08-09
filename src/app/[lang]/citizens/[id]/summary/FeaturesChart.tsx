"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { useCookies } from "react-cookie";
import { Period, KarbariOption } from "./featuresShared";

/* ------------------------------------------------------------------ */
/*                                TYPES                                */
/* ------------------------------------------------------------------ */
interface FeaturesChartData {
  bought: number[];
  sold: number[];
  labels: string[];
}

const EMPTY_CHART: FeaturesChartData = { bought: [], sold: [], labels: [] };

export default function FeaturesChart({
  params,
  period,
  selectedKarbari,
  knownKarbari,
  isAllSelected,
  lang,
}: {
  params: any;
  period: Period;
  selectedKarbari: string[];
  knownKarbari: KarbariOption[];
  isAllSelected: boolean;
  lang: string;
}) {
  const isFa = lang.toLowerCase() === "fa";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";

  const [chartData, setChartData] = useState<FeaturesChartData>(EMPTY_CHART);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [boughtVisible, setBoughtVisible] = useState(true);
  const [soldVisible, setSoldVisible] = useState(true);

  useEffect(() => {
    if (selectedKarbari.length === 0) {
      setChartData(EMPTY_CHART);
      return;
    }

    const controller = new AbortController();

    const fetchChart = async () => {
      try {
        setLoading(true);
        setError(false);

        const qs = new URLSearchParams();
        if (!isAllSelected) {
          selectedKarbari.forEach((c) => qs.append("karbari", c));
        }
        qs.append("period", period);

        const url = `https://dev-api.metarang.com/api/citizen/${params.id}/features/chart?${qs.toString()}`;

        const res = await axios.get(url, {
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });

        const data = res.data?.data;

        // Real API shape: data.bought / data.sold are each an array of
        // { amount, karbari, label } — one entry per period (and, when
        // more than one karbari is selected, one entry per period PER
        // karbari). There is no separate top-level "labels" array; the
        // label lives on each entry instead.
        const rawBought: any[] = Array.isArray(data?.bought) ? data.bought : [];
        const rawSold: any[] = Array.isArray(data?.sold) ? data.sold : [];

        // Build the x-axis labels from whichever series has entries,
        // preserving the order the API returned them in, deduped.
        const labels: string[] = [];
        const seen = new Set<string>();
        for (const entry of [...rawBought, ...rawSold]) {
          const label = entry?.label;
          if (label != null && !seen.has(label)) {
            seen.add(label);
            labels.push(label);
          }
        }

        // Sum amounts per label (handles the case where multiple karbari
        // codes are selected and each contributes its own entry for the
        // same period label).
        const sumByLabel = (entries: any[]) => {
          const totals = new Map<string, number>();
          for (const entry of entries) {
            if (entry?.label == null) continue;
            const prev = totals.get(entry.label) ?? 0;
            totals.set(entry.label, prev + (Number(entry.amount) || 0));
          }
          return labels.map((label) => totals.get(label) ?? 0);
        };

        setChartData({
          bought: sumByLabel(rawBought),
          sold: sumByLabel(rawSold),
          labels,
        });
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("[FeaturesChart] Error fetching features chart:", err);
        setError(true);
        setChartData(EMPTY_CHART);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchChart();
    return () => controller.abort();
  }, [period, JSON.stringify(selectedKarbari), isAllSelected, params.id]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: isFa ? "خریداری‌شده" : "Bought",
            data: chartData.bought,
            borderColor: "#9100D9",
            backgroundColor: "rgba(0, 102, 255, 0.2)",
            fill: true,
            pointRadius: 6,
            pointBackgroundColor: "rgba(0, 102, 255, 0.5)",
            pointBorderColor: "#9100D9",
            pointBorderWidth: 2,
          },
          {
            label: isFa ? "فروخته‌شده" : "Sold",
            data: chartData.sold,
            borderColor: "#FFC700",
            backgroundColor: "rgba(255, 199, 0, 0.2)",
            fill: true,
            pointRadius: 6,
            pointBackgroundColor: "rgba(255, 199, 0, 0.5)",
            pointBorderColor: "#FFC700",
            pointBorderWidth: 2,
          },
        ],
      },
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
    chartRef.current.setDatasetVisibility(0, boughtVisible);
    chartRef.current.setDatasetVisibility(1, soldVisible);
    chartRef.current.update();

    return () => {
      newChart.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(chartData), theme, isFa]);

  const handleLegendClick = (datasetIndex: number) => {
    const chart = chartRef.current;
    if (!chart) return;
    const nextVisible = !chart.isDatasetVisible(datasetIndex);
    chart.setDatasetVisibility(datasetIndex, nextVisible);
    chart.update();
    if (datasetIndex === 0) setBoughtVisible(nextVisible);
    else setSoldVisible(nextVisible);
  };

  const hasData = chartData.labels.length > 0;

  return (
    <div className="w-full pt-4 flex flex-col gap-3">
      {error && (
        <p className="w-full text-center text-red-400 py-4">
          {isFa ? "خطا در دریافت نمودار." : "Failed to load chart."}
        </p>
      )}

      {!error && selectedKarbari.length === 0 && (
        <p className="w-full text-center text-matn-2 py-4">
          {isFa ? "حداقل یک کاربری را انتخاب کنید." : "Select at least one feature type."}
        </p>
      )}

      {!error && selectedKarbari.length > 0 && hasData && (
        <div className="flex flex-wrap justify-start md:justify-end gap-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLegendClick(0)}>
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-primary"></div>
            <span className={`text-primary ${boughtVisible ? "" : "line-through"}`}>
              {isFa ? "خریداری‌شده" : "Bought"}
            </span>
          </div>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLegendClick(1)}>
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-primary"></div>
            <span className={`text-primary ${soldVisible ? "" : "line-through"}`}>
              {isFa ? "فروخته‌شده" : "Sold"}
            </span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto light-scrollbar dark:dark-scrollbar mt-2">
        <div className="relative flex justify-center md:justify-end gap-6 text-right lg:w-full min-w-[800px]">
          {loading && !hasData ? (
            <div className="w-full h-[420px] flex items-center justify-center text-matn-2">
              {isFa ? "در حال بارگذاری نمودار..." : "Loading chart..."}
            </div>
          ) : (
            <canvas ref={canvasRef} id="featuresChart" height="420"></canvas>
          )}
        </div>
      </div>
    </div>
  );
}