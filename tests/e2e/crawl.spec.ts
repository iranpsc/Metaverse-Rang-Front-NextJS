import { expect, test } from "@playwright/test";

const translationAdminApiURL = "https://dev-admin.metarang.com";

/**
 * Static public routes discovered from page.tsx files under src/app/[lang].
 * Dynamic-segment routes are excluded until their fixtures and scenarios are ready.
 */
const staticPublicRoutes = [
  "/",
  "/about",
  "/articles",
  "/articles/categories",
  "/calendar",
  "/citizens",
  "/contact",
  "/education",
  "/education/category",
  "/enamad",
  "/levels/citizen",
  "/news",
  "/news/categories",
  "/rand-id/hm",
  "/whitepaper",
] as const;

type ApiLanguage = {
  code: string;
  direction?: string;
  file_url?: string | null;
  name?: string;
};

type CrawlFailure = {
  locale: string;
  route: string;
  stage: "language-api" | "language-metadata" | "translation-dictionary" | "page-crawl";
  reason: string;
};

type CrawlPageResult = {
  locale: string;
  route: string;
  status: number | null;
  title: string;
  outcome: "passed" | "failed";
  reason?: string;
};

async function getApiLanguages(request: {
  get: (url: string, options?: { timeout?: number }) => Promise<{ status: () => number; json: () => Promise<unknown> }>;
}): Promise<{ languages: ApiLanguage[]; failures: CrawlFailure[] }> {
  const failures: CrawlFailure[] = [];
  let response: Awaited<ReturnType<typeof request.get>> | undefined;
  let lastError: unknown;
  const apiUrl = `${translationAdminApiURL}/api/translations?active=true`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try { response = await request.get(apiUrl, { timeout: 10_000 }); break; }
    catch (error) { lastError = error; if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 500)); }
  }
  let languages: ApiLanguage[] = [];
  if (!response) {
    failures.push({ locale: "backend", route: apiUrl, stage: "language-api", reason: `Dev translations API unavailable after 3 attempts: ${lastError instanceof Error ? lastError.message : String(lastError)}` });
  } else if (response.status() !== 200) {
    failures.push({ locale: "backend", route: apiUrl, stage: "language-api", reason: `Translations API returned HTTP ${response.status()} (expected 200)` });
  } else {
    try {
      const payload = (await response.json()) as { data?: unknown };
      if (!Array.isArray(payload?.data)) failures.push({ locale: "backend", route: apiUrl, stage: "language-api", reason: "Translations API response must contain a data array" });
      else for (const item of payload.data) {
        const language = item as Partial<ApiLanguage>;
        const code = typeof language?.code === "string" ? language.code : "";
        if (!/^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$/.test(code)) {
          failures.push({ locale: code || "unknown", route: apiUrl, stage: "language-metadata", reason: "Active language has a missing or invalid language code" });
          continue;
        }
        if (!language.file_url || typeof language.file_url !== "string") failures.push({ locale: code, route: "file_url", stage: "language-metadata", reason: `Active language "${code}" does not expose file_url` });
        // Keep incomplete records so their locale routes are still crawled.
        languages.push({ code, direction: language.direction, file_url: language.file_url ?? null, name: language.name });
      }
    } catch (error) {
      failures.push({ locale: "backend", route: apiUrl, stage: "language-api", reason: `Could not parse translations API response: ${error instanceof Error ? error.message : String(error)}` });
    }
  }
  // If real discovery fails, use local fixtures for route coverage but retain the backend failure.
  if (languages.length === 0) {
    try {
      const fixtureResponse = await request.get("http://127.0.0.1:9999/api/translations?active=true", { timeout: 5_000 });
      if (fixtureResponse.status() === 200) {
        const fixturePayload = (await fixtureResponse.json()) as { data?: ApiLanguage[] };
        languages = Array.isArray(fixturePayload.data) ? fixturePayload.data : [];
      }
    } catch (error) {
      failures.push({ locale: "test-fixtures", route: "http://127.0.0.1:9999/api/translations?active=true", stage: "language-api", reason: `Local language fixtures unavailable: ${error instanceof Error ? error.message : String(error)}` });
    }
  }
  if (languages.length === 0) failures.push({ locale: "all", route: "language-discovery", stage: "language-api", reason: "No language records could be discovered from the real API or local fixtures" });
  return { languages, failures };
}
test.describe("public static route browser crawl @seo", () => {
  test("crawl every static public route in every active language and report all failures", async ({
    page,
    request,
  }) => {
    test.setTimeout(15 * 60_000);

    const { languages, failures } = await getApiLanguages(request);
    const allowedTranslationFiles = new Set(
      languages.flatMap(({ file_url }) => {
        if (!file_url) return [];
        try { return [new URL(file_url).href]; } catch { return []; }
      }),
    );
    const checked: Array<{ locale: string; route: string; title: string }> = [];
    const pageResults: CrawlPageResult[] = [];
    const dictionaryChecks: Array<{ locale: string; url: string; ok: boolean; reason?: string }> = [];

    // Validate dictionaries independently. A broken dictionary must be reported,
    // but must never prevent the remaining languages and routes from being crawled.
    for (const language of languages) {
      if (!language.file_url) {
        dictionaryChecks.push({ locale: language.code, url: "", ok: false, reason: "Active language metadata is missing file_url" });
        continue;
      }
      try {
        const dictionaryResponse = await request.get(language.file_url, { timeout: 10_000 });
        expect(
          dictionaryResponse.status(),
          `Translation dictionary for ${language.code} must return HTTP 200`,
        ).toBe(200);
        expect(
          dictionaryResponse.headers()["content-type"] || "",
          `Translation dictionary for ${language.code} must be JSON`,
        ).toContain("application/json");

        const dictionary = await dictionaryResponse.json();
        expect(
          dictionary && typeof dictionary === "object" && !Array.isArray(dictionary),
          `Translation dictionary for ${language.code} must be a JSON object`,
        ).toBe(true);
        dictionaryChecks.push({ locale: language.code, url: language.file_url, ok: true });
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        dictionaryChecks.push({
          locale: language.code,
          url: language.file_url,
          ok: false,
          reason,
        });
        failures.push({
          locale: language.code,
          route: language.file_url,
          stage: "translation-dictionary",
          reason,
        });
      }
    }

    // Keep browser-side requests isolated from third-party services while allowing
    // every dictionary URL supplied by the translations API.
    await page.route("**/*", (route) => {
      const url = new URL(route.request().url());
      const isLocal =
        url.hostname === "127.0.0.1" ||
        url.hostname === "localhost" ||
        url.protocol === "data:" ||
        url.protocol === "blob:";
      const isTranslationFile = allowedTranslationFiles.has(url.href);
      return isLocal || isTranslationFile ? route.continue() : route.abort();
    });

    // Each locale/route pair is isolated: record its failure and continue to the next.
    for (const language of languages) {
      for (const routePath of staticPublicRoutes) {
        const routeUrl = `/${language.code}${routePath === "/" ? "" : routePath}`;
        const jsErrors: string[] = [];
        const pageResult: CrawlPageResult = {
          locale: language.code,
          route: routeUrl,
          status: null,
          title: "",
          outcome: "failed",
        };
        pageResults.push(pageResult);

        const onPageError = (error: Error) => jsErrors.push(error.message);
        page.on("pageerror", onPageError);

        try {
          const response = await page.goto(routeUrl, {
            waitUntil: "domcontentloaded",
            timeout: 20_000,
          });

          expect(response, `${routeUrl} must return a document response`).not.toBeNull();
          pageResult.status = response!.status();
          expect(response!.status(), `${routeUrl} must return HTTP 200`).toBe(200);
          expect(response!.headers()["content-type"] || "").toContain("text/html");

          const main = page.locator("main").first();
          const heading = page.locator("h1").first();
          // Check immediately: a missing server-rendered layout should not
          // consume the full assertion timeout for every remaining route.
          expect(await main.isVisible(), `${routeUrl} must render its main content`).toBe(true);
          expect(await heading.isVisible(), `${routeUrl} must render a visible primary heading`).toBe(true);
          expect(await heading.innerText(), `${routeUrl} primary heading must contain text`).toBeTruthy();

          const mainText = (await main.innerText()).trim();
          const title = (await page.title()).trim();
          pageResult.title = title;
          const descriptionLocator = page.locator('meta[name="description"]');
          const description = (await descriptionLocator.count()) > 0
            ? await descriptionLocator.first().getAttribute("content")
            : null;
          const canonicalLocator = page.locator('link[rel="canonical"]');
          const canonical = (await canonicalLocator.count()) > 0
            ? await canonicalLocator.first().getAttribute("href")
            : null;

          expect(mainText, `${routeUrl} must render non-empty main content`).not.toBe("");
          expect(title, `${routeUrl} must have a document title`).not.toBe("");
          expect(description?.trim(), `${routeUrl} must have a meta description`).toBeTruthy();
          await expect(page.locator("html")).toHaveAttribute("lang", language.code);

          if (canonical) {
            expect(canonical, `${routeUrl} canonical URL must be absolute`).toMatch(/^https?:\/\//);
          }

          expect(jsErrors, `${routeUrl} must not throw uncaught JavaScript errors`).toEqual([]);
          checked.push({ locale: language.code, route: routePath, title });
          pageResult.outcome = "passed";
        } catch (error) {
          const reason = error instanceof Error ? error.message : String(error);
          pageResult.outcome = "failed";
          pageResult.reason = reason;
          failures.push({
            locale: language.code,
            route: routeUrl,
            stage: "page-crawl",
            reason,
          });
        } finally {
          page.off("pageerror", onPageError);
        }
      }
    }

    const summary = {
      languageCodes: languages.map(({ code }) => code),
      staticRouteCount: staticPublicRoutes.length,
      expectedPageCount: languages.length * staticPublicRoutes.length,
      checkedCount: checked.length,
      checked,
      pageResults,
      dictionaryChecks,
      failures,
      excludedDynamicRoutes: true,
      translationSource: translationAdminApiURL,
      translationFiles: languages.map(({ code, file_url }) => ({ code, file_url })),
    };

    await test.info().attach("static-crawl-summary.json", {
      body: JSON.stringify(summary, null, 2),
      contentType: "application/json",
    });

    // Print every attempted URL at the end of the run, not only successful pages.
    console.log("\n========== STATIC CRAWL RESULTS ==========");
    console.log(`Languages: ${languages.map(({ code }) => code).join(", ")} | Routes per language: ${staticPublicRoutes.length} | Attempted: ${pageResults.length} | Passed: ${checked.length} | Failed: ${pageResults.length - checked.length}`);
    for (const result of pageResults) {
      const status = result.status === null ? "NO RESPONSE" : String(result.status);
      const suffix = result.outcome === "passed"
        ? `PASS | ${status} | ${result.title}`
        : `FAIL | ${status} | ${(result.reason || "Unknown failure").split("\n")[0]}`;
      console.log(`[${result.locale}] ${result.route} — ${suffix}`);
    }
    console.log("========== END STATIC CRAWL RESULTS ==========");

    // Fail only after every language and route has been attempted and the full
    // diagnostic report has been attached to the Playwright test result.
    expect(
      failures,
      `Crawl completed with ${failures.length} failure(s). See static-crawl-summary.json for every affected locale and URL.`,
    ).toEqual([]);
  });
});
