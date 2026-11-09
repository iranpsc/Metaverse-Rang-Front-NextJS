import { expect, test } from "@playwright/test";

const locales = ["fa", "en"] as const;
const viewports = [
  { name: "desktop", width: 1365, height: 900 },
  { name: "mobile", width: 390, height: 844 },
] as const;

/** Representative page types backed by the local API fixtures. */
const uiRoutes = [
  "/",
  "/about",
  "/articles",
  "/contact",
  "/citizens",
  "/citizens/hm-2000001/summary",
  "/education",
  "/news",
] as const;

test.describe("public page UI smoke tests @ui", () => {
  for (const locale of locales) {
    for (const route of uiRoutes) {
      for (const viewport of viewports) {
        test(`renders ${locale}${route} with the shared page shell on ${viewport.name}`, async ({ page }) => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });

          const browserErrors: string[] = [];
          page.on("pageerror", (error) => {
            const message = error.message || String(error);
            // React #418 is the known non-blocking hydration warning already
            // excluded by the SEO crawl; all other uncaught errors are failures.
            if (!/Minified React error #418(?:;|$)/.test(message)) {
              browserErrors.push(message);
            }
          });

          const url = `/${locale}${route === "/" ? "" : route}`;
          const response = await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 20_000,
          });

          expect(response, `${url} must return a document response`).not.toBeNull();
          expect(response!.status(), `${url} must return HTTP 200`).toBe(200);
          await expect(page.locator("html")).toHaveAttribute("lang", locale);

          // Verify the actual shared shell and the route content, not only that
          // the browser received an HTTP response.
          const pageScroll = page.locator("#page-scroll");
          await expect(pageScroll, `${url} must render the page scroll container`).toBeVisible();

          const main = page.locator("main").first();
          await expect(main, `${url} must render the primary page structure`).toBeVisible();
          await expect
            .poll(async () => (await pageScroll.innerText()).trim().length, {
              timeout: 10_000,
              message: `${url} must render visible page content`,
            })
            .toBeGreaterThan(0);

          const visibleText = (await pageScroll.innerText()).trim();
          expect(visibleText.length, `${url} must not render an empty page shell`).toBeGreaterThan(10);
          expect(browserErrors, `${url} must not throw uncaught browser errors`).toEqual([]);
        });
      }
    }
  }
});
