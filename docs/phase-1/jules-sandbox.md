# Phase 1 — Jules / disposable sandbox instructions

## Goal

Run the Phase 1 tests in a disposable environment without production API credentials, production secrets, or access to production data.

## Required setup

1. Clone the repository and install the locked dependencies with `npm ci`.
2. Use Node.js 22 or newer.
3. Copy `.env.example` to `.env.local`.
4. Keep all credentials as mock values. Do not request or paste production API keys, SMTP credentials, Supabase credentials, webhook secrets, or internal service keys.
5. Configure the public API URLs and internal Go service URL to use the local mock API at `http://127.0.0.1:9999` for isolated browser tests.
6. Keep `MOCK_ACTIVE_LANGUAGES` set to the locales under test (default: `fa,en,ar,ru,zh`).

## Start the mock API

Run in a dedicated terminal:

```bash
node scripts/mock-api-server.mjs
```

Wait until it reports that it is listening on `127.0.0.1:9999`. Verify readiness:

```bash
curl --fail http://127.0.0.1:9999/health
```

Expected response: `ok`.

## Run the test stages

Run these stages independently so failures are attributable:

```bash
npm run test:unit
npm run test:integration
npm run test:coverage
npm run build
npx playwright install chromium
npm run test:e2e:core
npm run test:ui
npm run test:forms
npm run test:seo
npm run test:security
```

The commands and their purposes are described in [environment-and-execution.md](./environment-and-execution.md).

## Expected interpretation

- The 44 Go API contract entries each run success and deterministic 503 cases (88 scenarios).
- The 100% coverage threshold applies only to `src/test/mocks/handlers.ts`.
- The crawl manifest has 47 explicit route patterns and uses the configured active locale list.
- SEO metadata length failures are reported as failures. Do not change production metadata or weaken assertions just to make the sandbox green; those fixes are outside the Phase 1 test-infrastructure scope.
- Supabase functional testing is excluded. The sandbox must not connect to production Supabase or use production data.

## Sandbox completion report

Report the exact branch and commit SHA, Node/npm versions, commands run, pass/fail counts, coverage metrics, crawl attempts and failures, and any environment/setup errors. Distinguish application failures from sandbox configuration failures. Do not report the whole application as 100% covered based on the scoped MSW report.
