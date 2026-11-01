# Phase 1 — MSW baseline

## Implemented

- MSW Node server is started only by the Vitest setup file. It is not imported by application runtime code and does not alter production requests.
- The first fixtures model the translation endpoints observed in `src/components/utils/actions.js`:
  - `GET {ADMIN_API_BASE_URL}/api/translations?active=true`
  - `GET {file_url}` for language dictionary JSON files.
- The language fixture includes `fa`, `en`, and `ar` to verify that tests do not assume the API language list is limited to two values.
- The handler tests verify successful responses and a controlled 400 response.

## Important limitations

- This is an initial MSW integration check, not the complete API mock inventory.
- The current handlers intentionally cover only translation requests. Do not interpret this as complete endpoint coverage.
- MSW Node intercepts requests made in the Vitest process. It does not automatically intercept requests made by a separately spawned Next.js server or build process.
- Playwright E2E requires a separate strategy for server-side Next.js requests (for example, a local mock API service configured through test-only environment variables). Browser-only `page.route()` interception is not sufficient for those requests.
- No application layout, production API helper, cache policy, retry policy, or production environment variable has been changed.
