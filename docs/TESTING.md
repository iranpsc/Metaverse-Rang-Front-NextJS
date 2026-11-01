# Testing guide

This repository uses Vitest, React Testing Library, MSW, and Playwright.

## Prerequisites

- Node.js 22 or newer (the repository declares `engines.node: >=22.0.0`; `.nvmrc` is set to `22`)
- npm dependencies installed with `npm ci`
- Chromium installed for browser tests: `npm run test:e2e:install`

For isolated local setup, copy `.env.example` to `.env.local`. Keep real production credentials out of local test environments.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run test:unit` | Run the complete Vitest suite |
| `npm run test:unit:watch` | Run Vitest in watch mode |
| `npm run test:integration` | Run Vitest tests under `src/app` (including API route tests) |
| `npm run test:e2e` | Run Playwright browser tests |
| `npm run test:seo` | Run tests tagged `@seo` |
| `npm run test:security` | Run tests tagged `@security` |
| `npm run test:e2e:ui` | Open the Playwright UI runner |

## Isolation behavior

By default, Playwright starts two dedicated local processes: a deterministic mock API on `127.0.0.1:9999` and the Next.js development server on `127.0.0.1:5175`. It never reuses an already-running process, because that process could have inherited real API credentials or production endpoints.

The mock API serves the language list, local `fa`/`en`/`ar` dictionaries, the home-page API endpoints, and empty PostgREST responses for the `news` and `articles` tables. In E2E mode, both public API base URLs and the Supabase URL are explicitly redirected to the local mock server; all credentials are dummy values. No Go service, Supabase project, production API, or production credentials are required.

Unknown mock routes return HTTP 404 instead of silently forwarding requests elsewhere. This makes missing fixtures visible during test runs.

To test an already-running instance, set `PLAYWRIGHT_BASE_URL` explicitly. This opt-in mode bypasses the managed local servers and is not an isolated test run; only use it when the target instance is itself a disposable test environment.

## Current scope and limitations

The initial E2E suite verifies the root locale redirect, the public robots file, the web manifest, and that the public manifest does not disclose internal environment-variable names. It is a foundation, not yet a full crawl of all application routes, visual regression suite, accessibility audit, or comprehensive security assessment.

API route tests currently live under `src/app` and use the existing Vitest/MSW setup. Add future integration tests there or introduce a dedicated test project when their runtime requirements differ.
