import { existsSync, readFileSync, appendFileSync } from "node:fs";

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (!summaryPath) throw new Error("GITHUB_STEP_SUMMARY is not available.");

const suites = [
  ["Unit tests", process.env.UNIT_STATUS],
  ["Integration tests", process.env.INTEGRATION_STATUS],
  ["MSW coverage", process.env.COVERAGE_STATUS],
  ["Production build", process.env.BUILD_STATUS],
  ["E2E core", process.env.E2E_STATUS],
  ["UI tests", process.env.UI_STATUS],
  ["Contact form tests", process.env.FORMS_STATUS],
  ["SEO / Crawl", process.env.SEO_STATUS],
  ["Security tests", process.env.SECURITY_STATUS],
];
const normalize = (value) => value || "skipped";
const statusLabel = (value) => ({
  success: "✅ موفق",
  failure: "❌ ناموفق",
  cancelled: "⏹ لغو شد",
  skipped: "⚪ اجرا نشد",
}[normalize(value)] || normalize(value));
const failures = suites.filter(([, status]) => normalize(status) === "failure").length;
const skipped = suites.filter(([, status]) => normalize(status) === "skipped").length;
const overall = failures > 0 ? "❌ ناموفق" : skipped > 0 ? "⚠️ ناقص (برخی مراحل اجرا نشد)" : "✅ موفق";

let coverage = null;
if (existsSync("coverage/coverage-summary.json")) {
  coverage = JSON.parse(readFileSync("coverage/coverage-summary.json", "utf8")).total;
}
const pct = (key) => coverage?.[key]?.pct === undefined
  ? "—"
  : `${coverage[key].pct}% (${coverage[key].covered}/${coverage[key].total})`;

const lines = [
  "# Phase 1 — Isolated Test Suite",
  "",
  "## وضعیت کلی و Coverage",
  "",
  `**وضعیت کلی اجرا: ${overall}**  `,
  `**Statements: ${pct("statements")}** · **Functions: ${pct("functions")}**  `,
  `Lines: ${pct("lines")} · Branches: ${pct("branches")}`,
  "",
  "## وضعیت تست‌ها",
  "",
  "| گروه | نتیجه |",
  "|---|---|",
  ...suites.map(([name, status]) => `| ${name} | ${statusLabel(status)} |`),
  "",
];

const crawlPath = "phase-1-results/static-crawl-summary.json";
if (existsSync(crawlPath)) {
  const crawl = JSON.parse(readFileSync(crawlPath, "utf8"));
  const results = crawl.pageResults || [];
  const passed = results.filter((item) => item.outcome === "passed").length;
  const failed = results.filter((item) => item.outcome === "failed").length;
  const safe = (value) => String(value ?? "").replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ");
  lines.push(
    "## گزارش Crawl صفحات",
    "",
    `زبان‌ها: **${(crawl.languageCodes || []).join(", ")}** · مسیر در هر زبان: **${crawl.routeCountPerLanguage ?? 0}** · مجموع: **${results.length}** · موفق: **${passed}** · ناموفق: **${failed}**`,
    "",
    "| زبان | URL | نوع مسیر | HTTP | نتیجه | توضیح خطا |",
    "|---|---|---|---:|---|---|",
    ...results.map((item) => {
      const outcome = item.outcome === "passed" ? "✅ PASS" : "❌ FAIL";
      return `| ${safe(item.locale)} | ${safe(item.route)} | ${safe(item.routeType)} | ${item.status ?? "—"} | ${outcome} | ${safe(item.reason || "")} |`;
    }),
    "",
  );
} else {
  lines.push("## گزارش Crawl صفحات", "", "فایل گزارش Crawl تولید نشد؛ اجرای Crawl به مرحله تولید گزارش نرسید.", "");
}

if (coverage && (coverage.statements.pct < 100 || coverage.functions.pct < 100)) {
  lines.push(
    "> ⚠️ حداقل پوشش مورد انتظار برای Statements و Functions برابر ۱۰۰٪ است؛ این اجرا به حدنصاب نرسیده است.",
    "",
  );
}

lines.push(
  "## گزارش‌های قابل دریافت",
  "",
  "- گزارش Coverage: artifact با نام `phase-1-msw-handler-coverage-report`",
  "- گزارش کامل Playwright و ضمیمه JSON مربوط به Crawl: artifact با نام `playwright-report`",
  "",
);
appendFileSync(summaryPath, `${lines.join("\n")}\n`, "utf8");
