# Phase 1 — Isolated environment and test execution

## Purpose and safety boundary

Use this setup for local isolated tests and Jules-style disposable sandboxes. It uses deterministic local fixtures and mock credentials. Do not copy production secrets into `.env.local`, Jules, CI, screenshots, logs, or test artifacts.

The CI workflow creates `.env.local` from `.env.example` and overrides service endpoints/secrets with loopback/mock values. The example file is a starting template, not a production deployment configuration.

## Environment variable inventory for the isolated test setup

| Variable | Scope | Purpose / safe test value |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Browser-visible | Main API base URL; CI overrides it to `http://127.0.0.1:9999`. |
| `NEXT_PUBLIC_ADMIN_API_BASE_URL` | Browser-visible | Admin API base URL; CI overrides it to the local mock server. |
| `MOCK_ACTIVE_LANGUAGES` | Mock server/test process | Comma-separated active locale codes; default example is `fa,en,ar,ru,zh`. |
| `NEXT_PUBLIC_HERO_VIDEO_BASE` | Browser-visible, optional | Hero-video CDN base; leave empty to use the local Next.js proxy route. |
| `WEBHOOK_SECRET` | Server-only | Webhook authentication fixture; use a unique non-production value. |
| `SMTP_HOST` | Server-only | SMTP host; use local mail catcher/mock service (CI: `127.0.0.1`). |
| `SMTP_PORT` | Server-only | SMTP port (example: `1025`). |
| `SMTP_USER` | Server-only | Mock SMTP username. |
| `SMTP_PASS` | Server-only | Mock SMTP password. |
| `EMAIL_FROM` | Server-only | Example sender address under `.test`. |
| `EMAIL_TO` | Server-only | Example recipient address under `.test`. |
| `INTERNAL_GO_SERVICE_URL` | Server-only | Internal Go service URL; CI points it to the local mock server. |
| `INTERNAL_SERVICE_KEY` | Server-only | Mock internal service key; never prefix it with `NEXT_PUBLIC_`. |
| `CACHE_INVALIDATION_HMAC_SECRET` | Server-only | Mock HMAC-SHA256 signing secret. |
| `ANALYZE` | Build-time optional | Enables bundle analysis when set to `true`. |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser-visible, CI-only override | CI uses loopback; Supabase functional behavior is excluded from Phase 1. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser-visible, CI-only mock override | Non-production placeholder used to keep the isolated build deterministic. |

The first fifteen entries are represented in `.env.example`. The last two are explicit CI environment overrides. This table is the Phase 1 isolated-test variable inventory, not a claim that every runtime variable used by every deployment has been exhaustively audited.

## Locale configuration

- Default mock locale list: `fa,en,ar,ru,zh`.
- Set `MOCK_ACTIVE_LANGUAGES` in the process environment or `.env.local` to activate other valid locale codes.
- `scripts/mock-api-server.mjs` and the MSW handlers accept valid locale codes matching the configured locale-code pattern; they are not hardcoded to fa/en.
- JSON files under `public/lang` are discovered and merged into the active locale list.
- When an active locale has no local dictionary, the isolated mock uses the English dictionary fixture/file fallback.
- RTL direction is assigned for base language codes `ar`, `fa`, `he`, `ps`, and `ur`; other locales default to LTR.
- The mock does not discover active locales from a live Admin API. Configure the locale list or provide a local dictionary file.

## Local setup

Requirements: Node.js 22 or newer (matches `package.json` engines and CI), npm, and the repository lockfile.

```bash
npm ci
cp .env.example .env.local
```

For a fully isolated browser crawl, point the public API base URLs and internal Go service URL at the local mock server (default `http://127.0.0.1:9999`). Keep all credentials as non-production placeholders.

Start the mock API in one terminal:

```bash
node scripts/mock-api-server.mjs
```

It binds to `127.0.0.1:9999` by default and exposes `/health`, translation metadata/dictionaries, and deterministic fixtures used by the E2E route crawl. Override the port with `MOCK_API_PORT` if needed.

In another terminal, run the app/test commands below. Playwright's web server is managed by `playwright.config.ts` for the browser suites.

## Test commands

| Command | Purpose |
|---|---|
| `npm run test:unit` | Vitest unit suite |
| `npm run test:unit:watch` | Vitest watch mode |
| `npm run test:integration` | Vitest integration tests under `src/app` |
| `npm run test:coverage` | Scoped V8 coverage for MSW handlers |
| `npm run build` | Production Next.js build |
| `npm run test:e2e:core` | Untagged Playwright E2E tests |
| `npm run test:ui` | Dedicated UI smoke tests (`@ui`) |
| `npm run test:forms` | Contact form tests (`@forms`) |
| `npm run test:seo` | SEO/crawl assertions (`@seo`) |
| `npm run test:security` | Public-surface security checks (`@security`) |
| `npm run test:crawl` | Direct crawl spec execution |
| `npm run test:e2e` | Entire Playwright suite |
| `npm run test:e2e:install` | Install Playwright Chromium |

For browser tests, install the browser once with `npx playwright install chromium` (CI uses `npx playwright install --with-deps chromium`).

## CI workflow

Workflow: [Isolated Test Suite](../../.github/workflows/isolated-tests.yml).

It runs in this order: dependency installation, isolated environment setup, unit tests, integration tests, scoped MSW coverage, local mock server startup, production build, Playwright browser install, core E2E, UI, contact form, SEO, security, summary generation, and artifact upload.

CI uses Node.js 22 and a 25-minute job timeout. Test reports and the MSW coverage report are uploaded as workflow artifacts.

## Explicit exclusions and interpretation

- Supabase functional behavior is not tested by Phase 1. The CI placeholder variables only prevent the isolated build from depending on production credentials.
- The 44 Go API contracts and their 88 success/failure scenarios are documented in [api-contract-inventory.md](./api-contract-inventory.md).
- The 100% V8 thresholds apply only to `src/test/mocks/handlers.ts`; they do not represent whole-application source coverage.
- The crawl manifest explicitly lists 47 route patterns and is not a proof that every App Router route has been discovered.
- Current SEO failures are existing page metadata length assertions. They remain visible in CI and are not silently skipped; changing production SEO metadata is outside this Phase 1 test-infrastructure scope.
