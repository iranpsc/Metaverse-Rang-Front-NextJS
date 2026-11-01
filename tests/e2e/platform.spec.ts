import { expect, test } from "@playwright/test";

test.describe("platform entry points", () => {
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
