"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type LogEntry = {
  id: string;
  timestamp: string;
  method: string;
  path: string;
  contentType: string;
  headers: Record<string, string>;
  request: unknown;
  response: unknown;
  status: number;
  durationMs: number;
};

const pretty = (value: unknown) => JSON.stringify(value, null, 2) ?? "null";

export default function WebhookInspectorPage() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/dev/webhook-inspector", { cache: "no-store" });
      if (!response.ok) {
        if (response.status === 404) throw new Error("این قابلیت روی محیط فعلی فعال نشده است.");
        if (response.status === 403) throw new Error("دسترسی شما به این بخش مجاز نیست.");
        throw new Error("دریافت لاگ‌ها ناموفق بود.");
      }
      const data = await response.json();
      setEntries(data.entries ?? []);
      setError("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "خطای نامشخص");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => void refresh(), 1_500);
    return () => window.clearInterval(timer);
  }, [refresh]);

  const visibleEntries = useMemo(() => entries.filter((entry) => {
    const matchesStatus = filter === "all" || (filter === "success" ? entry.status === 200 : entry.status !== 200);
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [entry.path, entry.method, String(entry.status), pretty(entry.request), pretty(entry.response)]
      .join(" ").toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  }), [entries, filter, search]);

  const selected = visibleEntries.find((entry) => entry.id === selectedId) ?? visibleEntries[0] ?? null;
  const successCount = entries.filter((entry) => entry.status === 200).length;
  const errorCount = entries.length - successCount;

  const clearLogs = async () => {
    const response = await fetch("/api/dev/webhook-inspector", { method: "DELETE" });
    if (response.ok) {
      setEntries([]);
      setSelectedId(null);
    } else {
      setError("پاک‌کردن لاگ‌ها انجام نشد.");
    }
  };

  const copy = async (value: unknown) => {
    await navigator.clipboard.writeText(pretty(value));
  };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-cyan-400">DEVELOPER TOOLS / WEBHOOK</p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">مانیتورینگ زنده Webhook</h1>
            <p className="mt-2 text-sm text-slate-400">مشاهده درخواست JSON بک‌اند و پاسخ واقعی فرانت‌اند</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            به‌روزرسانی خودکار هر ۱.۵ ثانیه
          </div>
        </header>

        {error && <div role="alert" className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200">{error}</div>}

        <section className="grid gap-3 sm:grid-cols-3">
          <Stat label="کل درخواست‌های ثبت‌شده" value={entries.length} />
          <Stat label="پاسخ‌های موفق (200)" value={successCount} tone="success" />
          <Stat label="پاسخ‌های غیر 200" value={errorCount} tone="danger" />
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 p-4">
            <div>
              <h2 className="font-semibold">جریان درخواست‌ها</h2>
              <p className="mt-1 text-xs text-slate-400">جدیدترین درخواست‌ها در ابتدای فهرست نمایش داده می‌شوند.</p>
            </div>
            <button onClick={clearLogs} className="rounded-lg border border-rose-500/30 px-3 py-2 text-sm text-rose-300 hover:bg-rose-500/10">پاک‌کردن لاگ‌ها</button>
          </div>
          <div className="grid gap-3 border-b border-slate-800 p-4 md:grid-cols-[1fr_220px]">
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="جست‌وجو در مسیر، وضعیت یا JSON..." className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
            <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
              <option value="all">همه درخواست‌ها</option>
              <option value="success">موفق (200)</option>
              <option value="error">خطا (غیر 200)</option>
            </select>
          </div>
          <div className="grid min-h-[440px] lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.5fr)]">
            <div className="max-h-[650px] overflow-y-auto border-b border-slate-800 lg:border-b-0 lg:border-l">
              {loading && entries.length === 0 ? <p className="p-6 text-sm text-slate-400">در حال دریافت لاگ‌ها...</p> : visibleEntries.length === 0 ? <p className="p-6 text-sm text-slate-400">هنوز درخواستی ثبت نشده است. با ارسال Webhook از سمت بک‌اند، رویدادها اینجا ظاهر می‌شوند.</p> : visibleEntries.map((entry) => (
                <button key={entry.id} onClick={() => setSelectedId(entry.id)} className={`block w-full border-b border-slate-800 p-4 text-right transition hover:bg-slate-800/70 ${selected?.id === entry.id ? "bg-slate-800" : ""}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-mono text-sm text-slate-200">{entry.path}</span>
                    <span className={`shrink-0 rounded-md px-2 py-1 text-xs ${entry.status === 200 ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>{entry.status}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slate-400">
                    <span>{entry.method} · {entry.durationMs} ms</span>
                    <time dir="ltr">{new Date(entry.timestamp).toLocaleTimeString("fa-IR")}</time>
                  </div>
                </button>
              ))}
            </div>

            <div className="min-w-0 space-y-4 p-4">
              {!selected ? <p className="text-sm text-slate-400">برای مشاهده جزئیات، یک درخواست را انتخاب کنید.</p> : <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">جزئیات تبادل</h3>
                    <p className="mt-1 break-all font-mono text-xs text-slate-400">{selected.method} {selected.path}</p>
                  </div>
                  <div className="text-left text-xs text-slate-400"><div>{new Date(selected.timestamp).toLocaleString("fa-IR")}</div><div className="mt-1">{selected.durationMs} ms</div></div>
                </div>
                <JsonPanel title="Request · ورودی بک‌اند" value={selected.request} onCopy={copy} />
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <div className="mb-2 flex items-center justify-between"><h4 className="text-sm font-semibold">Headers (محدود و امن‌شده)</h4><span className="text-xs text-slate-500">{selected.contentType || "بدون Content-Type"}</span></div>
                  <pre dir="ltr" className="overflow-x-auto whitespace-pre-wrap break-all text-xs text-slate-300">{pretty(selected.headers)}</pre>
                </div>
                <JsonPanel title={`Response · پاسخ فرانت‌اند · HTTP ${selected.status}`} value={selected.response} onCopy={copy} />
              </>}
            </div>
          </div>
        </section>
        <p className="text-xs leading-6 text-slate-500">لاگ‌ها در حافظه همان پروسه سرور نگهداری می‌شوند، حداکثر ۱۵۰ مورد هستند و با ری‌استارت سرور پاک می‌شوند. مقادیر فیلدهای حساس و هدرهای احراز هویت ذخیره یا نمایش داده نمی‌شوند.</p>
      </div>
    </main>
  );
}

function Stat({ label, value, tone = "normal" }: { label: string; value: number; tone?: "normal" | "success" | "danger" }) {
  const color = tone === "success" ? "text-emerald-300" : tone === "danger" ? "text-rose-300" : "text-white";
  return <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><p className="text-sm text-slate-400">{label}</p><p className={`mt-2 text-3xl font-bold tabular-nums ${color}`}>{value}</p></div>;
}

function JsonPanel({ title, value, onCopy }: { title: string; value: unknown; onCopy: (value: unknown) => void }) {
  return <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
    <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2"><h4 className="text-sm font-semibold">{title}</h4><button onClick={() => onCopy(value)} className="rounded-md px-2 py-1 text-xs text-cyan-300 hover:bg-slate-800">کپی JSON</button></div>
    <pre dir="ltr" className="max-h-72 overflow-auto p-3 text-xs leading-6 text-slate-300">{pretty(value)}</pre>
  </section>;
}
