# Testing guide

This repository uses Vitest, React Testing Library, MSW, and Playwright.

## Prerequisites

- Node.js compatible with the Next.js version declared in `package.json`
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

By default, Playwright starts the Next.js development server on `127.0.0.1:5175`. Its test-server environment points public API URLs to local non-production addresses and supplies mock-only internal credentials. The initial browser checks intentionally target static/public entry points so they do not require a running Go service or production API credentials.

To test an already-running instance, set `PLAYWRIGHT_BASE_URL` to its base URL. In that mode Playwright does not start another web server.

## Current scope and limitations

The initial E2E suite verifies the root locale redirect, the public robots file, the web manifest, and that the public manifest does not disclose internal environment-variable names. It is a foundation, not yet a full crawl of all application routes, visual regression suite, accessibility audit, or comprehensive security assessment.

API route tests currently live under `src/app` and use the existing Vitest/MSW setup. Add future integration tests there or introduce a dedicated test project when their runtime requirements differ.
