# Phase 1 — MSW and scoped API coverage

## Implemented

- MSW Node server is started by the Vitest setup and is not imported by production application runtime code.
- `src/test/mocks/handlers.ts` contains handlers for the agreed frontend Go API inventory.
- `src/test/mocks/go-api-contract.test.ts` defines 44 endpoint contracts (A1–A5, C1–C5, T1–T14, R1–R4, L1–L3, U1–U13). The complete method/path table is maintained in [api-contract-inventory.md](./api-contract-inventory.md).
- Every contract is exercised in two scenarios:
  - successful local mock response;
  - deterministic backend failure response (HTTP 503).
- The contract suite therefore contains 88 endpoint scenarios: 44 success + 44 failure.
- The latest recorded CI run passed the 44 success and 44 failure contract cases as part of the unit suite.

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
| Crawl page checks | Latest verified run (workflow 42641825011) | 212 passed / 23 failed |
| Unit suite | Passed tests in latest verified run | Passed (see workflow summary) |
| Integration suite | Latest verified run | Passed (see workflow summary) |
| UI smoke suite | Latest verified run | Passed |
| Contact form suite | Latest verified run | 1 passed |
| Security smoke suite | Latest verified run | 1 passed |
| Production build | Isolated mock-environment build | Passed |

The latest five-locale crawl attempted all 235 route/locale combinations: 212 passed and 23 failed. All 23 failures are existing title/description length assertions across the fa, en, ar, ru, and zh pages. These are reported rather than waived; changing production SEO metadata is outside the agreed Phase 1 scope.

## Scoped V8 code coverage

Vitest V8 coverage is configured to include only `src/test/mocks/handlers.ts`, the MSW handler implementation under test. It no longer includes all `src/**/*.{ts,tsx}` application source files.

This percentage is reported separately from endpoint coverage:
- API contract coverage answers whether each of the 44 agreed endpoints has a working mock and success/failure contract tests.
- Scoped V8 coverage measures executed statements, branches, functions, and lines inside the MSW handler implementation only.
- Playwright route, UI, form, build, and security checks are reported as behavioral test results; they are not added to a misleading whole-project line-coverage denominator.

Latest verified workflow 42641825011 (commit `061a3c2`) reports 100% for all four metrics: statements 106/106, branches 23/23, functions 58/58, and lines 104/104. These thresholds are enforced by Vitest. This result applies only to `src/test/mocks/handlers.ts`, not the whole application.

## Known remaining scope gaps

- The isolated mock API discovers JSON dictionaries in `public/lang` and merges them with configurable `MOCK_ACTIVE_LANGUAGES`. Metadata and dictionary URLs are generated from those codes; no per-locale route or handler is needed.
- Any valid active locale code is served by the generic dictionary route. If no local dictionary exists, the mock returns the deterministic English dictionary fixture so isolated page rendering and crawling do not require external services.
- MSW uses the same configurable locale list and a generic dictionary route. Tests cover `fa`, `en`, `ar`, `ru`, and `zh`, including direction metadata and rejection of inactive locales.
- To simulate a newly activated language, add its code to `MOCK_ACTIVE_LANGUAGES`; adding `public/lang/<code>.json` also makes that dictionary discoverable automatically.
- The 47-route crawl manifest is explicit. It currently attempts all 47 listed patterns; it does not prove that every public App Router route in the repository has been discovered.
- The 47-route crawl manifest is explicit and is not a guarantee that every public App Router route has been discovered.
- The current SEO suite is red because of 23 existing metadata length assertions. Production metadata was intentionally left unchanged because SEO metadata remediation is outside this test-infrastructure scope.

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
