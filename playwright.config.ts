import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:5175";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
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
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "npm run dev",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
        env: {
          ...process.env,
          NODE_ENV: "development",
          NEXT_PUBLIC_API_BASE_URL: "http://127.0.0.1:9999",
          NEXT_PUBLIC_ADMIN_API_BASE_URL: "http://127.0.0.1:9999",
          INTERNAL_GO_SERVICE_URL: "http://127.0.0.1:9998",
          INTERNAL_SERVICE_KEY: "playwright-local-mock-key",
          CACHE_INVALIDATION_HMAC_SECRET: "playwright-local-mock-hmac-secret",
          WEBHOOK_SECRET: "playwright-local-mock-webhook-secret",
          SMTP_HOST: "127.0.0.1",
          SMTP_PORT: "1025",
          SMTP_USER: "playwright",
          SMTP_PASS: "playwright",
        },
      },
});
