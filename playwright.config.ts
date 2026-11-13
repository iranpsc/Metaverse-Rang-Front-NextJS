import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:5175";
const mockApiURL = process.env.PLAYWRIGHT_MOCK_API_URL || "http://127.0.0.1:9999";

// Playwright requires webServer.env to contain strings only. Node's
// process.env typing permits undefined values, so filter them once here.
const inheritedEnv: Record<string, string> = Object.fromEntries(
  Object.entries(process.env).filter(
    (entry): entry is [string, string] => entry[1] !== undefined,
  ),
);

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  // Keep the local Next.js server and mock API within a predictable load.
  workers: 2,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  timeout: 30_000,
  expect: { timeout: 7_500 },
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    ...devices["Desktop Chrome"],
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
      {
        command: "node scripts/mock-api-server.mjs",
        url: `${mockApiURL}/health`,
        // Translation metadata, dictionaries and application APIs are served
        // from deterministic local fixtures; no external service is required.
        reuseExistingServer: Boolean(process.env.CI),
        timeout: 30_000,
        env: {
          ...inheritedEnv,
        },
      },
      ...(process.env.PLAYWRIGHT_BASE_URL ? [] : [{
        command: process.env.CI ? "npm run start" : "npm run build && npm run start",
        url: baseURL,
        // Keep application APIs and translation dictionaries on local fixtures.
        reuseExistingServer: false,
        timeout: 300_000,
        env: {
          ...inheritedEnv,
          NODE_ENV: "production",
          PLAYWRIGHT_E2E: "true",
          // Guard server-side fetch calls: local mocks and translation dictionary
          // URLs are allowed; external application APIs are blocked.
          NODE_OPTIONS: [process.env.NODE_OPTIONS, "--import=./scripts/e2e-network-guard.mjs"].filter(Boolean).join(" "),
          NEXT_PUBLIC_API_BASE_URL: mockApiURL,
          NEXT_PUBLIC_ADMIN_API_BASE_URL: mockApiURL,
          NEXT_PUBLIC_SUPABASE_URL: mockApiURL,
          NEXT_PUBLIC_SUPABASE_ANON_KEY: "playwright-local-mock-anon-key",
          INTERNAL_GO_SERVICE_URL: mockApiURL,
          INTERNAL_SERVICE_KEY: "playwright-local-mock-key",
          CACHE_INVALIDATION_HMAC_SECRET: "playwright-local-mock-hmac-secret",
          WEBHOOK_SECRET: "playwright-local-mock-webhook-secret",
          SMTP_HOST: "127.0.0.1",
          SMTP_PORT: "1025",
          SMTP_USER: "playwright",
          SMTP_PASS: "playwright",
        },
      }]),
    ],
});
