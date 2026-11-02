import { expect, test } from "@playwright/test";

const mockApiURL = "http://127.0.0.1:9999";

test.describe("isolated mock services", () => {
  test("mock API health endpoint is available", async ({ request }) => {
    const response = await request.get(`${mockApiURL}/health`);

    expect(response.status()).toBe(200);
    expect(await response.text()).toBe("ok");
  });

  test("translation API and dictionaries are served locally", async ({ request }) => {
    const languagesResponse = await request.get(`${mockApiURL}/api/translations?active=true`);

    expect(languagesResponse.status()).toBe(200);
    const languages = await languagesResponse.json();
    expect(Array.isArray(languages.data)).toBe(true);
    expect(languages.data.length).toBeGreaterThan(0);

    // The API is the source of truth: validate every active language it returns.
    for (const language of languages.data as Array<{ code: string; file_url: string }>) {
      expect(language.code).toMatch(/^[a-z]{2,3}(?:-[A-Z]{2})?$/);
      expect(language.file_url).toBeTruthy();

      const dictionaryResponse = await request.get(language.file_url);
      expect(
        dictionaryResponse.status(),
        `Dictionary for API language "${language.code}" must be available`,
      ).toBe(200);

      const dictionary = await dictionaryResponse.json();
      expect(dictionary).toBeTruthy();
      expect(typeof dictionary).toBe("object");
      expect(Array.isArray(dictionary)).toBe(false);
    }
  });

  test("Supabase tables return local deterministic fixtures", async ({ request }) => {
    for (const table of ["news", "articles"]) {
      const response = await request.get(`${mockApiURL}/rest/v1/${table}?select=*&limit=1`);

      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual([]);
    }
  });
});

test.describe("platform entry points", () => {
  test("default locale renders using only local test services", async ({ page }) => {
    // Browser-side requests to production/CDN/third-party hosts are blocked.
    // Only the local Next.js server and the local mock API are allowed.
    await page.route("**/*", (route) => {
      const url = new URL(route.request().url());
      const isLocal =
        url.hostname === "127.0.0.1" ||
        url.hostname === "localhost" ||
        url.protocol === "data:" ||
        url.protocol === "blob:";

      return isLocal ? route.continue() : route.abort();
    });

    const response = await page.goto("/fa", { waitUntil: "domcontentloaded" });

    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  });

  test("root URL permanently or temporarily redirects to the default locale", async ({ request }) => {
    const response = await request.get("/", { maxRedirects: 0 });

    expect([301, 302, 307, 308]).toContain(response.status());
    expect(response.headers().location).toMatch(/^\/fa\/?$/);
  });

  test("robots.txt is publicly accessible and contains crawler rules", async ({ request }) => {
    const response = await request.get("/robots.txt");

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/plain");
    expect(await response.text()).toContain("User-agent:");
  });
});

test.describe("SEO metadata @seo", () => {
  test("web app manifest is valid and declares the default locale entry point", async ({ request }) => {
    const response = await request.get("/manifest.json");

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/application\/json|text\/json/);

    const manifest = await response.json();
    expect(manifest.name).toBeTruthy();
    expect(manifest.start_url).toBe("/fa");
    expect(manifest.display).toBe("standalone");
    expect(Array.isArray(manifest.icons)).toBe(true);
    expect(manifest.icons.length).toBeGreaterThan(0);
  });
});

test.describe("public surface security @security", () => {
  test("public manifest does not expose internal service configuration", async ({ request }) => {
    const response = await request.get("/manifest.json");
    expect(response.status()).toBe(200);

    const body = await response.text();
    for (const secretName of [
      "INTERNAL_SERVICE_KEY",
      "INTERNAL_GO_SERVICE_URL",
      "CACHE_INVALIDATION_HMAC_SECRET",
      "WEBHOOK_SECRET",
      "SMTP_PASS",
    ]) {
      expect(body).not.toContain(secretName);
    }
  });
});
