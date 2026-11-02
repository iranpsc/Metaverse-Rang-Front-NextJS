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
  file_url: string;
  name?: string;
};

type CrawlFailure = {
  locale: string;
  route: string;
  stage: "translation-dictionary" | "page-crawl";
  reason: string;
};

async function getApiLanguages(request: {
  get: (url: string) => Promise<{
    status: () => number;
    json: () => Promise<unknown>;
  }>;
}): Promise<ApiLanguage[]> {
  const response = await request.get(`${translationAdminApiURL}/api/translations?active=true`);
  expect(response.status(), "Dev translations API must respond successfully").toBe(200);

  const payload = (await response.json()) as { data?: ApiLanguage[] };
  expect(Array.isArray(payload.data), "Translations API must return data[]").toBe(true);

  const languages = payload.data ?? [];
  expect(languages.length, "At least one active language must be available").toBeGreaterThan(0);

  for (const language of languages) {
    expect(language.code, "Every API language must have a valid code").toMatch(
      /^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$/,
    );
    expect(language.file_url, `Language ${language.code} must expose file_url`).toBeTruthy();
  }

  return languages;
}

test.describe("public static route browser crawl @seo", () => {
  test("crawl every static public route in every active language and report all failures", async ({
    page,
    request,
  }) => {
    test.setTimeout(15 * 60_000);

    const languages = await getApiLanguages(request);
    const allowedTranslationFiles = new Set(
      languages.flatMap(({ file_url }) => {
        try {
          return [new URL(file_url).href];
        } catch {
          return [];
        }
      }),
    );
    const failures: CrawlFailure[] = [];
    const checked: Array<{ locale: string; route: string; title: string }> = [];
    const dictionaryChecks: Array<{ locale: string; url: string; ok: boolean; reason?: string }> = [];

    // Validate dictionaries independently. A broken dictionary must be reported,
    // but must never prevent the remaining languages and routes from being crawled.
    for (const language of languages) {
      try {
        const dictionaryResponse = await request.get(language.file_url, { timeout: 20_000 });
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
        const onPageError = (error: Error) => jsErrors.push(error.message);
        page.on("pageerror", onPageError);

        try {
          const response = await page.goto(routeUrl, {
            waitUntil: "domcontentloaded",
            timeout: 45_000,
          });

          expect(response, `${routeUrl} must return a document response`).not.toBeNull();
          expect(response!.status(), `${routeUrl} must return HTTP 200`).toBe(200);
          expect(response!.headers()["content-type"] || "").toContain("text/html");

          const main = page.locator("main").first();
          const heading = page.locator("h1").first();
          await expect(main, `${routeUrl} must render its main content`).toBeVisible();
          await expect(heading, `${routeUrl} must render a visible primary heading`).toBeVisible();
          await expect(heading, `${routeUrl} primary heading must contain text`).not.toBeEmpty();

          const mainText = (await main.innerText()).trim();
          const title = (await page.title()).trim();
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
        } catch (error) {
          failures.push({
            locale: language.code,
            route: routeUrl,
            stage: "page-crawl",
            reason: error instanceof Error ? error.message : String(error),
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

    // Fail only after every language and route has been attempted and the full
    // diagnostic report has been attached to the Playwright test result.
    expect(
      failures,
      `Crawl completed with ${failures.length} failure(s). See static-crawl-summary.json for every affected locale and URL.`,
    ).toEqual([]);
  });
});
