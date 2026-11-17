# JSON-LD Registry

This directory is the source of truth for JSON-LD schema definitions and route-to-schema assignments.

## Structure

- `index.manifest.json`: route-pattern registry. Patterns are relative to the locale segment.
- `*.schema.json`: versioned schema definitions with required fields, field types, placeholders, and templates.
- `registry.ts`: locale-aware route resolution, placeholder expansion, schema validation, registry integrity checks, and safe serialization.
- `JsonLdScript.tsx`: server-rendered JSON-LD script component.

## Conventions

1. Use Schema.org vocabulary and valid Schema.org types.
2. Keep locale-specific content in placeholders. The active language set is runtime-driven.
3. Route patterns must match actual App Router page patterns.
4. Test implementation and execution belong to Issue #126, not this issue.
5. Administrative and private routes must be non-indexable and must not emit public structured data.
6. Missing optional values are omitted. Empty strings, null values, unresolved placeholders, malformed URLs, and invalid ISO dates must not be emitted as apparently valid data.
7. Schema.org validity does not imply Google rich-result eligibility.

## Route inventory and migration status

The manifest records 32 locale-scoped App Router page patterns under `src/app/[lang]`. This is a source-file inventory, not a count of concrete URLs.

In the uploaded source snapshot, 6 route pages render the central `JsonLdScript` component, 16 still contain inline JSON-LD, and 10 do not yet emit JSON-LD (including 2 non-indexable admin routes). The manifest is an intended route-to-schema map, not proof that every route has been migrated. Remaining public routes must be migrated before this issue is complete.

## Google Rich Results eligibility

The Rich Results Test validates Google-supported result features. It is not a general Schema.org validator and cannot guarantee display in Search. A local generator check is not a substitute for testing a deployed, publicly crawlable URL.

- `Event`: Google eligibility requires a physical `Place` with a `PostalAddress`. The current calendar API contract (`src/components/utils/mapEvents.ts`) does not expose a venue/address. Do not invent one; the backend contract must be extended before this page can pass the Event rich-result requirements.
- `VideoObject`: requires `name`, a crawlable `thumbnailUrl`, and an ISO 8601 `uploadDate`. `contentUrl` or `embedUrl` is recommended; if supplied, it must point to the actual video file or player, never to the page URL.
- `Article` / `NewsArticle`: use the actual headline, representative crawlable image URLs, ISO 8601 publication date when available, and real author details.
- `FAQPage` remains a Schema.org type, but Google discontinued FAQ rich results in May 2026; do not count it as a Google rich-result candidate.

Google's Article documentation says there are no required Article properties for eligibility, but recommends author, headline, image, and ISO 8601 publication date. After deployment, validate URLs with the Rich Results Test and URL Inspection. Google does not guarantee that valid markup will be displayed in Search.

## Schema metadata

Each schema definition includes `schemaId`, `version`, `expectedType`, `requiredFields`, `fieldTypes`, `placeholders`, and `template`.

The registry integrity helper checks duplicate route patterns, schema references, and placeholder declarations. Automated test coverage and change-resilience checks are implemented under Issue #126.
