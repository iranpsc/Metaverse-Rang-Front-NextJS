# Phase 1 — Integration test behavior and scope

## Command

`npm run test:integration` runs:

```bash
vitest run src/app src/components src/test --reporter=./scripts/vitest-checklist-reporter.mjs
```

Vitest selects test files matching `src/**/*.{test,spec}.{ts,tsx}`. The command-line paths restrict this run to tests under `src/app`, `src/components`, and `src/test`. It is a repeatable, non-watch run and prints a checklist grouped by test file, followed by passed/failed/skipped totals.

This command is intentionally broader than only API tests: it also executes any route, component, hook, or utility tests in those source directories that match the Vitest filename pattern. It does not run Playwright browser tests; those have separate commands.

## Test environment and request isolation

- Runtime: Vitest with the `jsdom` environment and React Testing Library setup.
- Global setup: `src/test/setup.ts` starts the MSW Node server before tests, resets runtime handler overrides and clears mocks after each test, and closes the server after the run.
- Network interception: `src/test/mocks/server.ts` creates the server from `src/test/mocks/handlers.ts`.
- Unmatched requests: MSW is configured with `onUnhandledRequest: 'error'`. A request without a matching mock is an error rather than silently reaching a real backend or being ignored.
- Isolation: `server.resetHandlers()` removes per-test overrides after each test, preventing one contract's failure scenario from leaking into the next test.

The integration suite therefore uses deterministic local fixtures and does not require a live Go API, Admin API, user session, or production credentials.

## Go API contract tests

The contract test lives at `src/test/mocks/go-api-contract.test.ts`. Its inventory currently contains 44 endpoint definitions, grouped as follows:

| Group | Contract IDs | Count |
|---|---|---:|
| Authentication | A1–A5 | 5 |
| Calendar | C1–C5 | 5 |
| Tutorials | T1–T14 | 14 |
| Replies | R1–R4 | 4 |
| Levels | L1–L3 | 3 |
| Users and citizen data | U1–U13 | 13 |
| **Total** | **A1–U13** | **44** |

The test first checks that the Markdown API inventory contains exactly 44 unique IDs and that every documented ID, HTTP method, and path matches the executable contract list. Request implementation metadata (for example, the multipart flag for U2) is deliberately excluded from this documentation identity comparison.

Each endpoint is then executed in two independent scenarios:

1. **Success scenario (44 tests):** sends a request to the local test origin using the contract's HTTP method and path. GET and DELETE requests have no body; JSON mutation requests use a deterministic JSON body; multipart requests use `FormData`. It asserts a 2xx status, an `application/json` content type, and a truthy parsed JSON response.
2. **Failure scenario (44 tests):** installs a temporary MSW override for that endpoint and returns a deterministic HTTP 503 response. It asserts the 503 status and verifies the `MOCK_FAILURE` code plus the matching endpoint ID in the response body.

Together, these produce **88 endpoint scenarios** (44 success + 44 failure), in addition to the inventory consistency checks. The success tests verify that each declared contract is handled by a local fixture; they do not compare every response field against the live Go service's production schema.

## Other component coverage

The same integration command also discovers matching tests under `src/app` and `src/components`. For example, `src/components/ui/Accordion/Accordion.test.tsx` exercises a client component with React Testing Library. This is a working example, not a claim that every application component or route currently has an integration test.

## What this suite does not prove

- It does not contact or validate the live Go API, Admin API, Supabase, SMTP, or other production services.
- A passing mock contract means the frontend request is covered by a deterministic fixture; it does not prove the live backend accepts the request or returns an identical schema.
- It does not automatically mean every route, component, user journey, or business rule in the application is tested. Only discovered test files and their explicit assertions run.
- It does not run browser-level navigation, visual/UI smoke, form, SEO, security, or full crawl checks. Those are separate Playwright workflow steps.
- It does not report whole-application code coverage. The separate `npm run test:coverage` job measures only `src/test/mocks/handlers.ts` and enforces the configured 100% statements, branches, functions, and lines thresholds for that file.

## Local execution

Run from the repository root:

```bash
npm run test:integration
```

The process exits with a non-zero code if a test fails. Review the checklist for the failing test name and file. To run the complete isolated CI sequence, use the `Isolated Test Suite` workflow; it runs unit tests, integration tests, scoped MSW coverage, a mock-environment production build, and separate Playwright suites.

## CI verification record

On 2026-11-13, workflow run [43412589142](https://github.com/iranpsc/Metaverse-Rang-Front-NextJS/actions/runs/43412589142) on branch `feat/phase-1-isolated-test-infrastructure`, commit `b1a1806ff8a4d8c24c4ad7a6c2691a954d4e47eb`, completed the **Run integration tests** step successfully. At the time this record was written, later workflow steps (SEO/security and final reporting) were still running; this is evidence for the integration step only, not a claim that the entire workflow had passed.
