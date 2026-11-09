# Phase 1 — Go API contract inventory

This inventory is the authoritative list of the **44 frontend Go API endpoint contracts** covered by the Phase 1 MSW suite. It is derived directly from `src/test/mocks/go-api-contract.test.ts`; paths and methods below are the exact contract request targets (sample IDs and query values are fixtures).

> Scope: these are frontend-to-Go API contracts, not every HTTP request made by the application. The Admin translation endpoint and internal Next.js route handlers are separate concerns and are not counted in these 44 contracts.

## Coverage model

- 44 unique endpoint contracts, IDs A1–A5, C1–C5, T1–T14, R1–R4, L1–L3, U1–U13.
- Each contract runs once against its normal MSW fixture and once against a deterministic HTTP 503 override: **88 scenarios total**.
- The success scenario asserts a 2xx response, JSON content type, and a truthy JSON body.
- The failure scenario asserts HTTP 503 and the matching `MOCK_FAILURE` code and endpoint ID.
- Contract tests live in `src/test/mocks/go-api-contract.test.ts`; request handlers live in `src/test/mocks/handlers.ts`.
- This is contract/handler coverage, not proof that every UI flow or every production backend behavior is tested.

## Authentication (A1–A5)

| ID | Method | Contract path |
|---|---|---|
| A1 | POST | `/api/auth/me` |
| A2 | POST | `/api/auth/register` |
| A3 | GET | `/api/auth/redirect?redirect_to=%2Ffa` |
| A4 | POST | `/api/auth/referral` |
| A5 | POST | `/api/auth/logout` |

## Calendar and events (C1–C5)

| ID | Method | Contract path |
|---|---|---|
| C1 | GET | `/api/calendar?type=event&page=1` |
| C2 | GET | `/api/calendar/filter?start_date=2026-01-01&end_date=2026-12-31` |
| C3 | GET | `/api/calendar/1` |
| C4 | GET | `/api/calendar/events/1` |
| C5 | POST | `/api/calendar/events/1/interact` |

## Tutorials and video comments (T1–T14)

| ID | Method | Contract path |
|---|---|---|
| T1 | GET | `/api/tutorials?page=1` |
| T2 | POST | `/api/tutorials/search` |
| T3 | GET | `/api/tutorials/categories` |
| T4 | GET | `/api/tutorials/categories/mock-cat` |
| T5 | GET | `/api/tutorials/categories/mock-cat/mock-sub` |
| T6 | GET | `/api/tutorials/mock-video?page=1` |
| T7 | GET | `/api/tutorials/1/comments?page=1` |
| T8 | POST | `/api/tutorials/1/comments` |
| T9 | POST | `/api/tutorials/1/comments/1` |
| T10 | DELETE | `/api/tutorials/1/comments/1` |
| T11 | POST | `/api/tutorials/1/comments/1/like` |
| T12 | POST | `/api/tutorials/1/comments/1/dislike` |
| T13 | POST | `/api/tutorials/1/comments/1/report` |
| T14 | POST | `/api/tutorials/1/comments/1/interactions?liked=1` |

## Comment replies (R1–R4)

| ID | Method | Contract path |
|---|---|---|
| R1 | GET | `/api/comments/1/replies` |
| R2 | POST | `/api/comments/1/reply` |
| R3 | POST | `/api/comments/1/replies/1/interactions?liked=1` |
| R4 | DELETE | `/api/comments/1/replies/1` |

## Levels (L1–L3)

| ID | Method | Contract path |
|---|---|---|
| L1 | GET | `/api/levels` |
| L2 | GET | `/api/levels/1` |
| L3 | GET | `/api/levels/1/general-info` |

## Users and citizen dashboard (U1–U13)

| ID | Method | Contract path | Notes |
|---|---|---|---|
| U1 | GET | `/api/users?page=1` | Paginated users |
| U2 | POST | `/api/search/users` | Multipart `FormData` request |
| U3 | GET | `/api/citizen/100` | Citizen profile |
| U4 | GET | `/api/citizen/100/referrals?page=1&search=` | Referral list |
| U5 | GET | `/api/citizen/100/referrals/chart?range=year` | Referral chart |
| U6 | GET | `/api/citizen/100/features/summary?period=year&karbari=blue` | Feature summary |
| U7 | GET | `/api/citizen/100/features/chart?period=year&karbari=blue` | Feature chart |
| U8 | GET | `/api/citizen/100/features?karbari=blue&page=1&per_page=10` | Feature list |
| U9 | GET | `/api/citizen/100/buildings?karbari%5B%5D=blue&page=1` | Building list |
| U10 | GET | `/api/citizen/100/buildings/summary` | Building summary |
| U11 | GET | `/api/citizen/100/buildings/chart?period=year&karbari%5B%5D=blue` | Building chart |
| U12 | GET | `/api/citizen/100/wallet/history/summary?period=year&assets=blue` | Wallet summary |
| U13 | GET | `/api/citizen/100/wallet/history/chart?period=year&assets=blue` | Wallet chart |

## Related endpoints outside the 44-contract count

These are intentionally not silently added to the 44 Go contract total:

- Translation discovery: `GET /api/translations?active=true` against the Admin API; dictionary files are fetched from the configured `file_url` (for example, `/lang/<locale>.json`).
- Internal Next.js route handlers (for example webhook, email, flag, first-page video, or model routes) have their own route-level scope and are not part of this Go API contract table.
- Supabase functional behavior is excluded from Phase 1.

## Keeping the inventory in sync

When a frontend Go API request is added or changed:
1. Update the corresponding MSW handler in `src/test/mocks/handlers.ts`.
2. Add/update its contract entry in `src/test/mocks/go-api-contract.test.ts`.
3. Keep the unique contract count assertion aligned with the agreed inventory.
4. Confirm both success and 503 scenarios pass with `npm run test:unit`.
5. Update this table in the same change.

Do not interpret 44/44 as a repository-wide count of all network requests. It is the explicitly agreed Go API contract inventory for this isolated test phase.
