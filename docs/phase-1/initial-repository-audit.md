# Phase 1 — Initial Repository Audit

> Status: initial inspection only. This document is not the final API, environment-variable, or route inventory. Complete the repository-wide scan before treating coverage as 100%.

## Repository baseline

- Repository: `iranpsc/Metaverse-Rang-Front-NextJS`
- Target branch: `dev`
- Working branch: `feat/phase-1-isolated-test-infrastructure`
- Framework: Next.js 16 (Webpack scripts)
- React: 19
- Package manager lockfile and dependency installation state must be verified in the working checkout before changing dependencies.

## Existing scripts

The current `package.json` exposes:

- `dev`: `next dev --webpack -p 5175`
- `build`: `next build --webpack`
- `start`: `next start -p 5175`
- `lint`: `next lint`
- `release`: `standard-version`
- `json`: `json-server --watch db.json --port 3001`
- `analyze`: `ANALYZE=true next build --webpack`

Vitest, React Testing Library, MSW, and Playwright are not currently configured in the inspected package manifest.

## Environment variables identified so far

The existing `env.example` and inspected source files indicate at least the following variables. This list is provisional and must be completed by scanning the entire repository, Docker configuration, CI workflows, and runtime code.

### Public/client configuration
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_ADMIN_API_BASE_URL`
- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Server/runtime configuration
- `WEBHOOK_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM`
- `EMAIL_TO`
- `SITEMAPS_HOST_PATH`

Security note: do not copy existing values from `env.example` into new documentation or fixtures. The Supabase URL and anon key currently appear in that file; their presence and intended public exposure should be reviewed, while Supabase functional testing remains out of scope. No real production secrets should be added to the replacement example file.

## Translation flow confirmed

The inspected implementation in `src/components/utils/actions.js` uses:

- `getLangArray()` → `GET {ADMIN_API_BASE_URL}/api/translations?active=true`
- `getTranslation(lang)` → selects a language from the API-provided language array and falls back to Persian when needed
- `getMainFile(langData)` → fetches the language dictionary from `langData.file_url`

The language layout in `src/app/[lang]/layout.tsx` validates language codes against the API-provided array when available. If the API returns no languages, it currently falls back to `fa` and `en`. Mock handlers and tests must reflect the agreed data-driven language requirement without changing production language behavior as part of test setup.

## API endpoints found in the inspected actions.js file

These are the endpoints found in this file only; direct requests elsewhere in the application are not yet included.

| Method | Endpoint |
|---|---|
| GET | `/api/translations?active=true` (Admin API) |
| GET | `/api/users?page={page}` |
| GET | `/api/levels` |
| GET | `/api/levels/{levelId}/{tabs}` |
| GET | `/api/calendar?type=version` |
| GET | `/api/levels/{levelId}` |
| GET | `/api/citizen/{id}` |
| GET | `/api/citizen/{userId}/referrals?search={search}` |
| GET | `/api/citizen/{userId}/referrals/chart?range={range}` |
| GET | `/api/tutorials/categories` |
| GET | `/api/tutorials?page={page}` |
| GET | `/api/tutorials/categories/{category}` |
| GET | `/api/tutorials/categories/{category}/{subcategory}` |
| GET | `/api/tutorials/{videoSlug}` |
| GET | `/api/tutorials/{videoId}/comments?page=1` |

Other inspected files show additional direct API usage, including authentication redirect, education, comments, citizen dashboard, events/calendar, first-page data, and media/model routes. These must be enumerated and deduplicated before finalizing the API inventory.

## Existing internal API route handlers observed

- `/api/webhook` — POST
- `/[lang]/api/webhook` — POST (same handler implementation observed)
- `/[lang]/api/sendEmail` — POST
- Additional handlers such as flag, first-page-video, and model routes were found by repository search and require inspection.

## Immediate implementation constraints

1. Do not add MSW handlers based only on the partial list above.
2. Complete the repository-wide endpoint inventory, recording HTTP method, host/base URL, path, source file, and whether it is server-side or browser-side.
3. Derive the Playwright route matrix from actual App Router files and API-provided language data; do not hardcode only `fa` and `en`.
4. Keep Supabase outside functional test scope; only a minimal build-safe stub/bypass may be added if the actual build proves it necessary.
5. Ensure server-side requests during Next.js build/render are intercepted without relying on browser-only MSW setup.
6. Do not change production request behavior, cache policy, retries, or UI behavior merely to make tests pass.
