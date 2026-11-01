import { expect, test } from "@playwright/test";

/**
 * Public route inventory for the initial platform crawl.
 * Dynamic segments use deterministic fixture identifiers; no forms are submitted.
 */
const publicRoutes = [
  "/", "/about", "/articles", "/articles/categories",
  "/articles/categories/general", "/articles/categories/general/sample-article",
  "/calendar", "/calendar/1", "/citizens", "/citizens/hm-123",
  "/citizens/hm-123/buildings", "/citizens/hm-123/referral",
  "/citizens/hm-123/summary", "/citizens/hm-123/wallet", "/contact",
  "/education", "/education/category", "/education/category/general",
  "/education/category/general/basics", "/education/category/general/basics/1",
  "/enamad", "/levels/citizen", "/levels/citizen/starter",
  "/levels/citizen/starter/overview", "/news", "/news/categories",
  "/news/categories/general", "/news/categories/general/sample-news",
  "/rand-id/hm", "/version", "/version/1.0", "/whitepaper",
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
  test("crawls more than 60 locale-route combinations", async ({ request }) => {
    expect(crawlCases.length).toBeGreaterThan(60);

    const results: Array<{
      url: string;
      status: number;
      title: string | null;
      description: string | null;
      canonical: string | null;
    }> = [];

    // Small batches avoid overwhelming the local Next.js server and mock API.
    for (let offset = 0; offset < crawlCases.length; offset += 4) {
      const batch = crawlCases.slice(offset, offset + 4);
      const batchResults = await Promise.all(
        batch.map(async ({ url }) => {
          const response = await request.get(url, {
            maxRedirects: 5,
            timeout: 30_000,
          });
          const body = await response.text();
          const title =
            body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
              ?.replace(/<[^>]+>/g, "")
              .trim() || null;
          const description =
            body.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ||
            body.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] ||
            null;
          const canonical =
            body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ||
            body.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1] ||
            null;

          return { url, status: response.status(), title, description, canonical };
        }),
      );
      results.push(...batchResults);
    }

    const serverErrors = results.filter(({ status }) => status >= 500);
    const missingTitles = results.filter(({ status, title }) => status < 500 && !title);

    await test.info().attach("public-route-crawl.json", {
      body: JSON.stringify(
        {
          total: results.length,
          successful: results.filter(({ status }) => status >= 200 && status < 400).length,
          serverErrors,
          missingTitles,
          results,
        },
        null,
        2,
      ),
      contentType: "application/json",
    });

    expect(
      serverErrors,
      "Server errors during public route crawl:\n" + JSON.stringify(serverErrors, null, 2),
    ).toHaveLength(0);
    expect(
      missingTitles,
      "Pages without a title during public route crawl:\n" + JSON.stringify(missingTitles, null, 2),
    ).toHaveLength(0);
  });
});
