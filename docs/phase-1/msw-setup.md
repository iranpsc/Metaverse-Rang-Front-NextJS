# Phase 1 — MSW and scoped API coverage

## Implemented

- MSW Node server is started by the Vitest setup and is not imported by production application runtime code.
- `src/test/mocks/handlers.ts` contains handlers for the agreed frontend Go API inventory.
- `src/test/mocks/go-api-contract.test.ts` defines 44 endpoint contracts (A1–A5, C1–C5, T1–T14, R1–R4, L1–L3, U1–U13). The complete method/path table is maintained in [api-contract-inventory.md](./api-contract-inventory.md).
- Every contract is exercised in two scenarios:
  - successful local mock response;
  - deterministic backend failure response (HTTP 503).
- The contract suite therefore contains 88 endpoint scenarios: 44 success + 44 failure.
- `npm run test:integration` explicitly runs `src/app`, `src/components`, and `src/test`, so it includes route tests, component/utility tests, and the 44-contract MSW suite. The command previously targeted only `src/app`, which omitted the MSW contract tests.
- A real `use client` component RTL test now exists for `src/components/ui/Accordion/Accordion.tsx`. This is a starter example, not evidence that every client component has an individual RTL test.
- MSW Node setup uses `onUnhandledRequest: 'error'`; an unmatched request fails the test instead of being silently accepted as a successful mock.

## Coverage definition for Issue #125

Coverage is scoped to the approved Phase 1 deliverables. It is **not** the percentage of all application source code.

| Scope | Measurement | Latest verified result |
|---|---|---:|
| Frontend Go API inventory | Contract entries mapped to MSW handlers | 44/44 (100%) |
| API success behavior | Successful mock response per endpoint | 44/44 (100%) |
| API failure behavior | Deterministic 503 response per endpoint | 44/44 (100%) |
| API contract scenarios | Success + failure cases | 88/88 passed |
| Static/dynamic crawl manifest | Unique route patterns | 47/47 |
| Crawl attempts | 47 routes × 5 active locales (fa, en, ar, ru, zh) | 235/235 attempted |
| Crawl page checks | Latest CI run (workflow 42645810958, commit `02bb728`) | 211 passed / 24 failed |
| Unit suite | Latest CI run | Passed |
| Integration suite | Latest CI run | Passed |
| UI smoke suite | Latest CI run | 32 passed |
| Contact form suite | Latest CI run | 1 passed |
| Security smoke suite | Latest CI run | Passed |
| Production build | Isolated mock-environment build | Passed |

The latest CI run attempted all 235 route/locale combinations. The final Playwright retry reported 211 successful page checks and 24 failures. The reported failures are SEO metadata assertions (title length, description length, or missing description); they do not indicate that those routes were skipped. Production SEO metadata was intentionally not changed because metadata remediation is outside the agreed Phase 1 scope.

See [workflow 42645810958](https://github.com/iranpsc/Metaverse-Rang-Front-NextJS/actions/runs/42645810958) for the run-level evidence and failure details.

## Scoped V8 code coverage

Vitest V8 coverage is configured to include only `src/test/mocks/handlers.ts`, the MSW handler implementation under test. It does not include all application source files.

This percentage is reported separately from endpoint coverage:
- API contract coverage answers whether each of the 44 agreed endpoints has a working mock and success/failure contract tests.
- Scoped V8 coverage measures executed statements, branches, functions, and lines inside the MSW handler implementation only.
- Playwright route, UI, form, build, and security checks are reported as behavioral test results; they are not added to a misleading whole-project line-coverage denominator.

The last run with individually verified V8 metric totals is workflow 42641825011 (commit `061a3c2`): statements 106/106, branches 23/23, functions 58/58, and lines 104/104. These thresholds are enforced by Vitest. This result applies only to `src/test/mocks/handlers.ts`, not the whole application. The latest workflow also passed its unit and coverage steps, but the metric totals above are retained against the run where the exact totals were inspected.

## Locale discovery in the isolated mock

There are two separate stages; they should not be conflated:

1. **Crawler discovery is API-driven.** `tests/e2e/crawl.spec.ts` requests `/api/translations?active=true`, validates the returned language records, and builds the locale × route crawl from the returned `code` values. It does not hard-code the five locale codes as the crawl source. Therefore, a new valid locale returned by that endpoint is included in the crawl automatically.
2. **The mock API's language catalogue is fixture/configuration-driven, not synchronized with the live Admin API.** `scripts/mock-api-server.mjs` and `src/test/mocks/handlers.ts` build the mock response from `MOCK_ACTIVE_LANGUAGES` (process environment, then `.env.local`, then the default `fa,en,ar,ru,zh`) and merge in valid JSON filenames found in `public/lang`. They generate the `/api/translations?active=true` records from that list. A language activated only in the real Dev Admin API will **not** appear in the isolated mock unless the mock configuration or local dictionary fixtures are updated.

To simulate a newly activated locale in CI or locally, add its code to `MOCK_ACTIVE_LANGUAGES` (for example `de`) or add `public/lang/de.json`. The mock then publishes the locale in its translations API response and serves its dictionary through the generic `/lang/<code>.json` handler. If no local dictionary file exists, the deterministic English fallback dictionary is returned. Direction is derived from the locale's base language code; unknown display names fall back to the code itself.

**Verification boundary:** existing tests cover configured extra codes, generic dictionary handling, fallback dictionaries, and rejection of inactive codes. They do not prove automatic synchronization from a live Admin API response, because that external service is deliberately not contacted by the isolated test environment. No production API or SEO metadata behavior is changed by this setup.

## Crawl manifest limitations

- The crawl manifest explicitly lists 47 route patterns (15 static and 32 representative dynamic routes). Across five active locales this produces 235 full localized URLs, satisfying the issue's greater-than-60 URL threshold.
- The manifest is not a guarantee that every public App Router route in the repository has been discovered.
- The latest SEO suite remains red because of the 24 metadata assertions recorded above. Production metadata was intentionally left unchanged because SEO metadata remediation is outside this test-infrastructure scope.

## Test commands

```bash
npm run test:unit
npm run test:integration
npm run test:coverage
npm run build
npm run test:e2e:core
npm run test:ui
npm run test:forms
npm run test:seo
npm run test:security
```
