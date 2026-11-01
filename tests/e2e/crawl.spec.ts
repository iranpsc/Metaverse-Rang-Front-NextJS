import { expect, test } from "@playwright/test";

/**
 * Route inventory generated from the actual page.tsx tree under src/app/[lang].
 * Dynamic segments use deterministic values; admin routes are excluded from public SEO.
 */
const publicRoutes = [
  "/",
  "/about",
  "/articles",
  "/articles/categories",
  "/articles/categories/general",
  "/articles/categories/general/sample-article",
  "/calendar",
  "/calendar/1",
  "/citizens",
  "/citizens/hm-123",
  "/citizens/hm-123/buildings",
  "/citizens/hm-123/referral",
  "/citizens/hm-123/summary",
  "/citizens/hm-123/wallet",
  "/contact",
  "/education",
  "/education/category",
  "/education/category/general",
  "/education/category/general/basics",
  "/education/category/general/basics/1",
  "/enamad",
  "/levels/citizen",
  "/levels/citizen/starter/general-info",
  "/news",
  "/news/categories",
  "/news/categories/general",
  "/news/categories/general/sample-news",
  "/rand-id/hm",
  "/version",
  "/version/1.0",
  "/whitepaper",
] as const;

const locales = ["fa", "en"] as const;
const crawlCases = locales.flatMap((locale) =>
  publicRoutes.map((route) => ({
    locale,
    route,
    url: "/" + locale + (route === "/" ? "" : route),
  })),
);

test.describe("public platform route crawl @seo", () => {
  test("route inventory contains more than 60 real locale-route cases", () => {
    expect(publicRoutes).toHaveLength(31);
    expect(crawlCases).toHaveLength(62);
  });

  for (const routeCase of crawlCases) {
    test("[" + routeCase.locale + "] " + routeCase.route + " returns a valid SEO page", async ({
      request,
    }) => {
      test.setTimeout(45_000);

      const response = await request.get(routeCase.url, {
        maxRedirects: 5,
        timeout: 20_000,
      });
      const body = await response.text();
      const headers = response.headers();
      const contentType = headers["content-type"] || "";
      const title =
        body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
          ?.replace(/<[^>]+>/g, "")
          .trim() || "";
      const description =
        body.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ||
        body.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] ||
        "";
      const canonical =
        body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ||
        body.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1] ||
        "";

      await test.info().attach("route-result.json", {
        body: JSON.stringify(
          {
            url: routeCase.url,
            status: response.status(),
            contentType,
            title,
            description,
            canonical,
          },
          null,
          2,
        ),
        contentType: "application/json",
      });

      expect(
        response.status(),
        "Expected " + routeCase.url + " to be a valid public page; received HTTP " + response.status() + ".",
      ).toBe(200);
      expect(contentType, "Response must be HTML").toContain("text/html");
      expect(title, "Page must expose a non-empty document title").not.toBe("");
      expect(
        description,
        "Page must expose a non-empty meta description",
      ).not.toBe("");
      expect(body, "Response must contain rendered page markup").toMatch(/<body[\s>]/i);
      expect(
        body,
        "Page rendered the generic application error state",
      ).not.toMatch(/مشکلی در بارگذاری صفحه رخ داده است|An error occurred while loading the page/i);
      if (canonical) {
        expect(canonical).toMatch(/^https?:\/\//);
      }
    });
  }
});
