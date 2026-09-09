"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { useCookies } from "react-cookie";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { Period, styleForKarbari } from "./buildingsShared";

/* ------------------------------------------------------------------ */
/*                                TYPES                                */
/* ------------------------------------------------------------------ */
/* Real API shape (confirmed via console log):
   { "data": { amount: number, karbari: string, label: string }[] }
   res.data.data is DIRECTLY the flat array of entries — it is NOT an
   object with a "completed" key, and there is no top-level "labels"
   array; each entry carries its own "label". The array contains one
   entry per period PER karbari code, so entries are grouped by karbari
   (one line per karbari, colored via styleForKarbari) instead of being
   summed into a single total line. */
interface KarbariSeries {
  code: string;
  labelFa: string;
  labelEn: string;
  color: string;
  data: number[];
}

interface BuildingsChartData {
  labels: string[];
  series: KarbariSeries[];
}

const EMPTY_CHART: BuildingsChartData = { labels: [], series: [] };

function ChartSkeleton() {
  return (
    <div className="w-full h-[360px] bg-white dark:bg-gray-1 rounded-xl animate-pulse flex items-end gap-2 p-6">
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

/* Convert a hex color like "#D4A017" into an rgba() string for fills. */
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function BuildingsChart({
  params,
  period,
  selectedKarbari,
  isAllSelected,
  lang,
  mainData,
  onLoadingChange,
}: {
  params: any;
  period: Period;
  selectedKarbari: string[];
  isAllSelected: boolean;
  lang: string;
  mainData: any;
  // Reports this chart's own fetch-loading state up to the parent
  // (BuildingsSummary), which uses it — combined with BuildingsList's
  // signal — to light up the spinner on the active period button.
  // This is the component whose fetch actually depends on `period`,
  // so it's the main driver of that spinner.
  onLoadingChange?: (loading: boolean) => void;
}) {
  const isFa = lang.toLowerCase() === "fa";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";

  const [chartData, setChartData] = useState<BuildingsChartData>(EMPTY_CHART);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // Per-karbari-code visibility, toggled by clicking the legend.
  const [hiddenCodes, setHiddenCodes] = useState<Set<string>>(new Set());

  /* ---------------------- data fetching ---------------------- */
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
          selectedKarbari.forEach((c) => qs.append("karbari[]", c));
        }
        qs.append("period", period);

        const res = await axios.get(
          `https://dev-api.metarang.com/api/citizen/${params.id}/buildings/chart?${qs.toString()}`,
          { headers: { "Content-Type": "application/json" }, signal: controller.signal }
        );

        const rawEntries: any[] = Array.isArray(res.data?.data) ? res.data.data : [];

        // x-axis labels, in the order the API returned them, deduped.
        const labels: string[] = [];
        const seenLabels = new Set<string>();
        for (const entry of rawEntries) {
          const label = entry?.label;
          if (label != null && !seenLabels.has(label)) {
            seenLabels.add(label);
            labels.push(label);
          }
        }

        // Group entries by karbari code, in first-seen order, so each
        // karbari becomes its own line on the chart.
        const codeOrder: string[] = [];
        const byCode = new Map<string, Map<string, number>>();
        for (const entry of rawEntries) {
          const code = entry?.karbari;
          if (code == null || entry?.label == null) continue;
          if (!byCode.has(code)) {
            byCode.set(code, new Map());
            codeOrder.push(code);
          }
          const perLabel = byCode.get(code)!;
          const prev = perLabel.get(entry.label) ?? 0;
          perLabel.set(entry.label, prev + (Number(entry.amount) || 0));
        }

        const series: KarbariSeries[] = codeOrder.map((code) => {
          const style = styleForKarbari(code);
          const perLabel = byCode.get(code)!;
          return {
            code,
            labelFa: style.labelFa,
            labelEn: style.labelEn,
            color: style.color,
            data: labels.map((label) => perLabel.get(label) ?? 0),
          };
        });

        setChartData({ labels, series });
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Error fetching buildings chart:", err);
        setError(true);
        setChartData(EMPTY_CHART);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchChart();
    return () => controller.abort();
  }, [period, JSON.stringify(selectedKarbari), isAllSelected, params.id]);

  // report loading state up to the parent
  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading, onLoadingChange]);

  // Reset legend toggle state whenever the underlying set of karbari
  // series changes (e.g. filters change), so a hidden code from a
  // previous selection doesn't silently hide a line in the new one.
  useEffect(() => {
    setHiddenCodes(new Set());
  }, [chartData.series.map((s) => s.code).join(",")]);

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
        datasets: chartData.series.map((s) => ({
          label: isFa ? s.labelFa : s.labelEn,
          data: s.data,
          borderColor: s.color,
          backgroundColor: hexToRgba(s.color, 0.15),
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: hexToRgba(s.color, 0.6),
          pointBorderColor: s.color,
          pointBorderWidth: 2,
          hidden: hiddenCodes.has(s.code),
        })),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(chartData), theme, isFa, hiddenCodes]);

  const handleLegendClick = (code: string) => {
    setHiddenCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const hasData = chartData.labels.length > 0 && chartData.series.length > 0;

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

      {!error && hasData && (
        <div className="flex flex-wrap justify-start md:justify-end gap-4">
          {chartData.series.map((s) => (
            <div
              key={s.code}
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => handleLegendClick(s.code)}
            >
              <div
                className="w-2 h-2 lg:w-3 lg:h-3 rounded-full"
                style={{ backgroundColor: s.color }}
              ></div>
              <span
                className={hiddenCodes.has(s.code) ? "line-through text-matn-2" : ""}
                style={{ color: hiddenCodes.has(s.code) ? undefined : s.color }}
              >
                {isFa ? s.labelFa : s.labelEn}
              </span>
            </div>
          ))}
        </div>
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