"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { useCookies } from "react-cookie";
import { Period, KarbariOption } from "./featuresShared";

/* ------------------------------------------------------------------ */
/*                                TYPES                                */
/* ------------------------------------------------------------------ */
/* Actual API shape — flat, aggregated across whichever karbari codes
   are selected (NOT grouped per-karbari):
   { "data": { "bought": number[], "sold": number[], "labels": string[] } } */
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

  /* ---------------------- data fetching ---------------------- */
  useEffect(() => {
    if (selectedKarbari.length === 0) {
      setChartData(EMPTY_CHART);
      return;
    }

    const fetchChart = async () => {
      try {
        setLoading(true);
        setError(false);

        const qs = new URLSearchParams();
        if (!isAllSelected) {
          selectedKarbari.forEach((c) => qs.append("karbari", c));
        }
        qs.append("period", period);

        const res = await axios.get(
          `https://api.metarang.com/api/citizen/${params.id}/features/chart?${qs.toString()}`,
          { headers: { "Content-Type": "application/json" } }
        );

        const data = res.data?.data;
        setChartData({
          bought: Array.isArray(data?.bought) ? data.bought : [],
          sold: Array.isArray(data?.sold) ? data.sold : [],
          labels: Array.isArray(data?.labels) ? data.labels : [],
        });
      } catch (err) {
        console.error("Error fetching features chart:", err);
        setError(true);
        setChartData(EMPTY_CHART);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, [period, JSON.stringify(selectedKarbari), isAllSelected, params.id]);

  /* ---------------------- chart rendering ---------------------- */
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
            borderColor: "#0066FF",
            backgroundColor: "rgba(0, 102, 255, 0.2)",
            fill: true,
            pointRadius: 6,
            pointBackgroundColor: "rgba(0, 102, 255, 0.5)",
            pointBorderColor: "#0066FF",
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
    // re-apply legend toggle state after rebuild
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
        <p className="w-full text-center text-lightGray py-4">
          {isFa ? "حداقل یک کاربری را انتخاب کنید." : "Select at least one feature type."}
        </p>
      )}

      {!error && selectedKarbari.length > 0 && hasData && (
        <div className="flex flex-wrap justify-start md:justify-end gap-6">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleLegendClick(0)}
          >
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#0066FF]"></div>
            <span className={`text-[#0066FF] ${boughtVisible ? "" : "line-through"}`}>
              {isFa ? "خریداری‌شده" : "Bought"}
            </span>
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleLegendClick(1)}
          >
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#FFC700]"></div>
            <span className={`text-[#FFC700] ${soldVisible ? "" : "line-through"}`}>
              {isFa ? "فروخته‌شده" : "Sold"}
            </span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto light-scrollbar dark:dark-scrollbar mt-2">
        <div className="relative flex justify-center md:justify-end gap-6 text-right lg:w-full min-w-[800px]">
          {loading && !hasData ? (
            <div className="w-full h-[420px] flex items-center justify-center text-lightGray">
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