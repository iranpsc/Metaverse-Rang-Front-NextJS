"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { useCookies } from "react-cookie";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { Period } from "./buildingsShared";

/* ------------------------------------------------------------------ */
/*                                TYPES                                */
/* ------------------------------------------------------------------ */
/* Actual API shape — flat, a single "completed" series aggregated across
   whichever karbari codes are selected (no per-karbari breakdown, and
   only one metric — unlike the two-line bought/sold chart elsewhere):
   { "data": { "completed": number[], "labels": string[] }, "period": "..." } */
interface BuildingsChartData {
  completed: number[];
  labels: string[];
}

const EMPTY_CHART: BuildingsChartData = { completed: [], labels: [] };
const LINE_COLOR = "#0066FF";

function ChartSkeleton() {
  return (
    <div className="w-full h-[360px] bg-white dark:bg-darkGray rounded-xl animate-pulse flex items-end gap-2 p-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-black/5 dark:bg-white/10"
          style={{ height: `${30 + ((i * 13) % 60)}%` }}
        />
      ))}
    </div>
  );
}

export default function BuildingsChart({
  params,
  period,
  selectedKarbari,
  isAllSelected,
  lang,
  mainData,
}: {
  params: any;
  period: Period;
  selectedKarbari: string[];
  isAllSelected: boolean;
  lang: string;
  mainData: any;
}) {
  const isFa = lang.toLowerCase() === "fa";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";

  const [chartData, setChartData] = useState<BuildingsChartData>(EMPTY_CHART);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
          selectedKarbari.forEach((c) => qs.append("karbari[]", c));
        }
        qs.append("period", period);

        const res = await axios.get(
          `https://dev-api.metarang.com/api/citizen/${params.id}/buildings/chart?${qs.toString()}`,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("[buildings/chart] raw response:", res.data);

        const data = res.data?.data;
        setChartData({
          completed: Array.isArray(data?.completed) ? data.completed : [],
          labels: Array.isArray(data?.labels) ? data.labels : [],
        });
      } catch (err) {
        console.error("Error fetching buildings chart:", err);
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
            label: isFa ? "بناهای تکمیل‌شده" : "Completed",
            data: chartData.completed,
            borderColor: LINE_COLOR,
            backgroundColor: "rgba(0, 102, 255, 0.2)",
            fill: true,
            pointRadius: 6,
            pointBackgroundColor: "rgba(0, 102, 255, 0.5)",
            pointBorderColor: LINE_COLOR,
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

    return () => {
      newChart.destroy();
    };
  }, [JSON.stringify(chartData), theme, isFa]);

  const hasData = chartData.labels.length > 0;

  return (
    <div className="w-full pt-2 flex flex-col gap-3">
      {/* <p className="text-black dark:text-white font-bold text-sm">
        {findByUniqueId(mainData, 1453) ||
          (isFa ? "بناهای تکمیل‌شده" : "Completed buildings")}
      </p> */}

      {error && (
        <p className="w-full text-center text-red-400 py-4">
          {isFa ? "خطا در دریافت نمودار." : "Failed to load chart."}
        </p>
      )}

      {!error && (
        <div className="overflow-x-auto light-scrollbar dark:dark-scrollbar">
          <div className="relative w-full min-w-[700px]">
            {loading && !hasData ? (
              <ChartSkeleton />
            ) : (
              <canvas ref={canvasRef} id="buildingsChart" height="360"></canvas>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
