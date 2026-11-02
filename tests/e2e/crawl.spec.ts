import { expect, test } from "@playwright/test";

const mockApiURL = "http://127.0.0.1:9999";

/**
 * Static public routes discovered from page.tsx files under src/app/[lang].
 * Dynamic-segment routes (for example [id], [slug], [category]) are
 * intentionally excluded until their API fixtures and scenarios are ready.
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

async function getApiLanguages(request: {
  get: (url: string) => Promise<{
    ok: () => boolean;
    status: () => number;
    json: () => Promise<unknown>;
  }>;
}): Promise<ApiLanguage[]> {
  const response = await request.get(`${mockApiURL}/api/translations?active=true`);
  expect(response.status(), "Translations API must respond successfully").toBe(200);

  const payload = (await response.json()) as { data?: ApiLanguage[] };
  expect(Array.isArray(payload.data), "Translations API must return data[]").toBe(true);

  const languages = payload.data ?? [];
  expect(languages.length, "At least one active language must be available").toBeGreaterThan(0);

  for (const language of languages) {
    expect(language.code, "Every API language must have a code").toMatch(/^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$/);
    expect(language.file_url, `Language ${language.code} must expose file_url`).toBeTruthy();
  }

  return languages;
}

test.describe("public static route browser crawl @seo", () => {
  test("crawl every static public route in every language returned by the translations API", async ({
    page,
    request,
  }) => {
    test.setTimeout(15 * 60_000);

    const languages = await getApiLanguages(request);
    const failures: Array<{ locale: string; route: string; reason: string }> = [];
    const checked: Array<{ locale: string; route: string; title: string }> = [];

    // Keep the crawl isolated from third-party browser-side requests.
    await page.route("**/*", (route) => {
      const url = new URL(route.request().url());
      const isLocal =
        url.hostname === "127.0.0.1" ||
        url.hostname === "localhost" ||
        url.protocol === "data:" ||
        url.protocol === "blob:";

      return isLocal ? route.continue() : route.abort();
    });

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

          // Wait for the actual browser-rendered application content, not raw response HTML.
          const main = page.locator("main").first();
          const heading = page.locator("h1").first();
          await expect(main, `${routeUrl} must render its main content`).toBeVisible();
          await expect(heading, `${routeUrl} must render a primary heading`).toBeVisible();

          const mainText = (await main.innerText()).trim();
          const title = (await page.title()).trim();
          const description = await page.locator('meta[name="description"]').getAttribute("content");
          const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");

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
            route: routePath,
            reason: error instanceof Error ? error.message : String(error),
          });
          throw error;
        } finally {
          page.off("pageerror", onPageError);
        }
      }
    }

    await test.info().attach("static-crawl-summary.json", {
      body: JSON.stringify(
        {
          languageCodes: languages.map(({ code }) => code),
          staticRouteCount: staticPublicRoutes.length,
          checkedCount: checked.length,
          checked,
          failures,
          excludedDynamicRoutes: true,
        },
        null,
        2,
      ),
      contentType: "application/json",
    });
  });
});
