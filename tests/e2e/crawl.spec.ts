import { expect, test } from "@playwright/test";

const translationAdminApiURL = process.env.PLAYWRIGHT_MOCK_API_URL || "http://127.0.0.1:9999";

/**
 * Static public routes discovered from page.tsx files under src/app/[lang].
 * Dynamic-segment routes are listed separately with fixture-backed parameters.
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

/**
 * Representative valid dynamic URLs. Their IDs/slugs are backed by the local
 * API fixtures in scripts/mock-api-server.mjs; route patterns are discovered
 * from page.tsx files under src/app/[lang].
 */
const dynamicPublicRoutes = [
  "/articles/categories/general",
  "/articles/categories/general/sample-article",
  "/calendar/1",
  "/citizens/hm-123",
  "/citizens/hm-123/buildings",
  "/citizens/hm-123/referral",
  "/citizens/hm-123/summary",
  "/citizens/hm-123/wallet",
  "/education/category/general",
  "/education/category/general/basics",
  "/education/category/general/basics/1",
  "/levels/citizen/citizen-baguette/general-info",
  "/news/categories/general",
  "/news/categories/general/sample-news",
  "/versions",
  "/versions/1.0",
] as const;

const publicRoutes = [
  ...staticPublicRoutes.map((path) => ({ path, type: "static" as const })),
  ...dynamicPublicRoutes.map((path) => ({ path, type: "dynamic" as const })),
];

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
  routeType: "static" | "dynamic";
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
        if (languages.some((existing) => existing.code === code)) {
          failures.push({
            locale: code,
            route: apiUrl,
            stage: "language-metadata",
            reason: `Translations API returned duplicate active language code "${code}".`,
          });
          continue;
        }

        let fileUrl: string | null = null;
        if (typeof language.file_url !== "string" || !language.file_url.trim()) {
          failures.push({ locale: code, route: "file_url", stage: "language-metadata", reason: `Active language "${code}" does not expose file_url` });
        } else {
          try {
            const parsedFileUrl = new URL(language.file_url);
            if (parsedFileUrl.protocol !== "https:" && parsedFileUrl.protocol !== "http:") {
              throw new Error("Translation file URL must use HTTP or HTTPS");
            }
            fileUrl = parsedFileUrl.href;
          } catch (error) {
            failures.push({
              locale: code,
              route: language.file_url,
              stage: "language-metadata",
              reason: `Active language "${code}" has an invalid file_url: ${error instanceof Error ? error.message : String(error)}`,
            });
          }
        }
        // Keep every valid language code even when its dictionary metadata is
        // incomplete, so all of its static routes are still attempted.
        languages.push({ code, direction: language.direction, file_url: fileUrl, name: language.name });
      }
    } catch (error) {
      failures.push({ locale: "backend", route: apiUrl, stage: "language-api", reason: `Could not parse translations API response: ${error instanceof Error ? error.message : String(error)}` });
    }
  }
  // Never substitute fixture languages: the local proxy returns the active
  // language records from the real Dev Admin translations endpoint.
  if (languages.length === 0) {
    failures.push({
      locale: "all",
      route: "language-discovery",
      stage: "language-api",
      reason: "No active languages were returned by the dev translations API; no locale routes can be inferred.",
    });
  }
  return { languages, failures };
}
test.describe("public static route browser crawl @seo", () => {
  test("crawl every static public route in every active language and report all failures", async ({
    page,
    request,
  }) => {
    test.setTimeout(15 * 60_000);

    const { languages, failures } = await getApiLanguages(request);
    const uniqueRouteCount = new Set(publicRoutes.map(({ path }) => path)).size;
    if (uniqueRouteCount !== publicRoutes.length) {
      failures.push({
        locale: "all",
        route: "crawl-route-manifest",
        stage: "language-api",
        reason: "The crawl route manifest contains duplicate URL paths.",
      });
    }

    for (const requiredLocale of ["fa", "en"]) {
      if (!languages.some(({ code }) => code === requiredLocale)) {
        failures.push({
          locale: requiredLocale,
          route: "required-languages",
          stage: "language-api",
          reason: `Issue #125 requires the ${requiredLocale} language to be included in the crawl.`,
        });
      }
    }

    const expectedPageCount = languages.length * uniqueRouteCount;
    if (expectedPageCount <= 60) {
      failures.push({
        locale: "all",
        route: "crawl-coverage",
        stage: "language-api",
        reason: `Issue #125 requires more than 60 distinct URLs; discovered ${expectedPageCount} from ${languages.length} unique active language(s) and ${uniqueRouteCount} unique routes.`,
      });
    }
    const allowedTranslationFiles = new Set(
      languages.flatMap(({ file_url }) => {
        if (!file_url) return [];
        try { return [new URL(file_url).href]; } catch { return []; }
      }),
    );
    const checked: Array<{
      locale: string;
      route: string;
      routeType: "static" | "dynamic";
      title: string;
    }> = [];
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

    // Keep browser API traffic on local fixtures. Translation dictionary files
    // are the only permitted external data requests; other external API calls
    // are blocked and recorded as real isolation failures.
    const blockedExternalApiRequests = new Set<string>();
    await page.route("**/*", (route) => {
      const url = new URL(route.request().url());
      const isLocal =
        url.hostname === "127.0.0.1" ||
        url.hostname === "localhost" ||
        url.protocol === "data:" ||
        url.protocol === "blob:";
      const isTranslationFile = allowedTranslationFiles.has(url.href);
      const isExternalApi =
        /^\\/(?:api|rest\\/v1|graphql|auth|oauth|sanctum|v\\d+\\/api)(?:\\/|$)/i.test(url.pathname) ||
        /(^|[-.])(?:api|admin)([-.]|$)/i.test(url.hostname) ||
        url.hostname.endsWith(".supabase.co");

      if (!isLocal && !isTranslationFile && isExternalApi) {
        blockedExternalApiRequests.add(url.href);
      }

      return isLocal || isTranslationFile ? route.continue() : route.abort();
    });

    // Each locale/route pair is isolated: record its failure and continue to the next.
    for (const language of languages) {
      for (const routeCase of publicRoutes) {
        const routePath = routeCase.path;
        const routeUrl = `/${language.code}${routePath === "/" ? "" : routePath}`;
        const jsErrors: string[] = [];
        const pageResult: CrawlPageResult = {
          locale: language.code,
          route: routeUrl,
          routeType: routeCase.type,
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
          // Check the shared page shell immediately. Issue #125 requires
          // meaningful main content, not a hard-coded h1 selector on every route.
          expect(await main.isVisible(), `${routeUrl} must render its main content`).toBe(true);
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
          expect(title.length, `${routeUrl} title must be at most 70 characters`).toBeLessThanOrEqual(70);
          expect(description?.trim(), `${routeUrl} must have a meta description`).toBeTruthy();
          expect(
            description!.trim().length,
            `${routeUrl} meta description must be at most 160 characters`,
          ).toBeLessThanOrEqual(160);
          await expect(page.locator("html")).toHaveAttribute("lang", language.code);
          if (language.direction === "rtl" || language.direction === "ltr") {
            await expect(main).toHaveAttribute("dir", language.direction);
          }

          if (canonical) {
            expect(canonical, `${routeUrl} canonical URL must be absolute`).toMatch(/^https?:\/\//);
          }

          expect(jsErrors, `${routeUrl} must not throw uncaught JavaScript errors`).toEqual([]);
          checked.push({
            locale: language.code,
            route: routePath,
            routeType: routeCase.type,
            title,
          });
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

    for (const url of blockedExternalApiRequests) {
      failures.push({
        locale: "browser",
        route: url,
        stage: "page-crawl",
        reason: "External API request was blocked; all non-translation APIs must use local mocks.",
      });
    }

    const summary = {
      languageCodes: languages.map(({ code }) => code),
      blockedExternalApiRequests: [...blockedExternalApiRequests],
      staticRouteCount: staticPublicRoutes.length,
      dynamicRouteCount: dynamicPublicRoutes.length,
      routeCountPerLanguage: uniqueRouteCount,
      expectedPageCount: languages.length * publicRoutes.length,
      checkedCount: checked.length,
      checked,
      pageResults,
      dictionaryChecks,
      failures,
      dynamicRoutesIncluded: true,
      translationProxy: translationAdminApiURL,
      translationSource:
        process.env.PLAYWRIGHT_TRANSLATION_API_URL ||
        "https://dev-admin.metarang.com/api/translations?active=true",
      translationFiles: languages.map(({ code, file_url }) => ({ code, file_url })),
    };

    await test.info().attach("static-crawl-summary.json", {
      body: JSON.stringify(summary, null, 2),
      contentType: "application/json",
    });

    // Print every attempted URL at the end of the run, not only successful pages.
    console.log("\n========== STATIC CRAWL RESULTS ==========");
    console.log(`Languages: ${languages.map(({ code }) => code).join(", ")} | Routes per language: ${publicRoutes.length} (static: ${staticPublicRoutes.length}, dynamic: ${dynamicPublicRoutes.length}) | Attempted: ${pageResults.length} | Passed: ${checked.length} | Failed: ${pageResults.length - checked.length}`);
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
