# Phase 1 — Repository and test-infrastructure audit

> Status: completed for the agreed Phase 1 isolated test scope. This is not a claim of exhaustive inventory of every production network request, runtime environment variable, or public route in the entire application.

## Repository baseline

- Repository: `iranpsc/Metaverse-Rang-Front-NextJS`
- Phase 1 working branch: `feat/phase-1-isolated-test-infrastructure`
- Framework: Next.js 16.4.3 (Webpack build scripts)
- React: 19.2.8
- Required Node.js: 22 or newer (`package.json` engines; CI uses Node 22)
- Package manager: npm with committed lockfile.

## Test infrastructure added

- Vitest 4.1.12 and React Testing Library.
- MSW 2.11.5 Node server and deterministic request handlers.
- Playwright 1.56.1 browser tests.
- Isolated mock API server at `scripts/mock-api-server.mjs`.
- Network guard and deterministic environment setup for E2E.
- GitHub Actions workflow: `.github/workflows/isolated-tests.yml`.
- Test scripts are listed in [environment-and-execution.md](./environment-and-execution.md).

## Go API contract inventory

The agreed Phase 1 frontend Go API inventory contains 44 unique contracts, not 44 total HTTP requests across the repository. It is maintained in `src/test/mocks/go-api-contract.test.ts` and mapped to the MSW handlers in `src/test/mocks/handlers.ts`.

- Authentication: 5 contracts.
- Calendar/events: 5 contracts.
- Tutorials/video comments: 14 contracts.
- Comment replies: 4 contracts.
- Levels: 3 contracts.
- Users/citizen dashboard: 13 contracts.
- Total: 44 contracts.
- Every contract is exercised with one successful fixture and one deterministic HTTP 503 scenario (88 scenarios).

See [api-contract-inventory.md](./api-contract-inventory.md) for the exact method/path list.

## Translation and locale behavior

Production locale discovery remains API-driven through the Admin translations endpoint. The isolated mock environment has its own deterministic locale configuration:

- Default locales: `fa,en,ar,ru,zh`.
- Additional locale codes can be supplied through `MOCK_ACTIVE_LANGUAGES` or discovered from `public/lang/*.json`.
- The mock translation metadata and dictionary routes are generic; they do not require a new handler per locale.
- Missing local dictionaries fall back to the English fixture/file for deterministic isolated rendering.
- RTL is inferred from the locale's base language code for the configured RTL set.
- The mock does not query a live Admin API to discover new languages; the isolated test environment must configure them.

This test setup does not alter production locale discovery or production translation request behavior.

## Environment inventory

The Phase 1 isolated-test variables and their scope are documented in [environment-and-execution.md](./environment-and-execution.md). `.env.example` contains safe example values; CI overrides service endpoints and credentials with loopback/mock values. No production secrets are required.

The documented variable inventory is intentionally scoped to the isolated test environment. It is not an exhaustive inventory of every deployment's environment variables.

## Route crawl scope

- Explicit crawl manifest: 47 route patterns.
- Active locales in the latest verified CI run: `fa`, `en`, `ar`, `ru`, `zh`.
- Attempts: 47 × 5 = 235.
- Latest verified result (workflow 42641825011): 212 passed, 23 failed.
- The 23 failures are existing SEO title/description length assertions. They are recorded in CI and were not changed because production SEO metadata remediation is outside the agreed Phase 1 scope.

The 47-route manifest is not represented as a complete automatic discovery of every App Router route in the repository.

## Scoped coverage

V8 coverage is limited to `src/test/mocks/handlers.ts`. Latest verified workflow 42641825011 reports:

| Metric | Covered | Total | Result |
|---|---:|---:|---:|
| Statements | 106 | 106 | 100% |
| Branches | 23 | 23 | 100% |
| Functions | 58 | 58 | 100% |
| Lines | 104 | 104 | 100% |

Vitest enforces 100% thresholds for all four metrics in this scoped file. This is not whole-application source coverage.

## Explicit exclusions

- Supabase functional testing and production data access.
- Changes to production SEO metadata to make existing assertions pass.
- Backend Go service implementation or contract changes.
- Exhaustive source-code coverage across the entire Next.js application.
- Automatic discovery of every public App Router route.
- Webhook business-flow functional coverage beyond the explicitly implemented test scope.
- Unrelated application bugs or UI redesign.

## Related documentation

- [API contract inventory](./api-contract-inventory.md)
- [MSW setup and coverage results](./msw-setup.md)
- [Isolated environment and test execution](./environment-and-execution.md)
