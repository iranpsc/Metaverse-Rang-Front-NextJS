# JSON-LD Registry

This directory is the source of truth for JSON-LD schema definitions and route-to-schema assignments.

## Structure

- `index.manifest.json`: route-pattern registry. Patterns are relative to the locale segment (for example, `/articles`).
- `*.schema.json`: versioned schema definitions containing metadata, required fields, field types, and a JSON-LD template.
- `registry.ts`: locale-aware route resolution, placeholder expansion, schema validation, registry integrity checks, and safe serialization.
- `JsonLdScript.tsx`: server-rendered JSON-LD script component.

## Conventions

1. Use Schema.org vocabulary and valid Schema.org types. Do not invent a type to represent a product concept; model domain concepts with supported types and nested properties.
2. Keep locale-specific content in placeholders. The active language set is runtime-driven and must not be hardcoded in this registry.
3. Route patterns must match actual App Router page patterns. Dynamic segments use bracket notation.
4. Do not add test implementations or test execution to this issue. Registry and generator tests belong to Issue #126.
5. Keep route entries explicit. Routes that are administrative or private must be marked `indexable: false` and must not emit public structured data.
6. Missing optional values are omitted. Empty strings, `null`, unresolved placeholders, malformed URLs, and invalid ISO dates must never be serialized as apparently valid data.
7. A Schema.org-valid object is not automatically eligible for a Google rich result. Only use Google-supported types when the page content satisfies Google's type-specific requirements.

## Route inventory and migration status

The manifest records the 32 locale-scoped App Router page patterns currently present under `src/app/[lang]`. This is a source-file inventory, not a count of concrete URLs; dynamic route values and active locales expand the runtime URL set.

All 25 indexable route patterns now use the central `JsonLdScript` component. Structured data emitted by nested list and layout components also uses the same registry. The remaining 7 patterns are intentionally non-indexable: 2 administrative routes and 5 personal citizen workspace routes. Those private routes emit no public JSON-LD.

The manifest is aligned with the schema types a route can actually emit. Optional list markup is omitted when the underlying API returns no valid items. Automated route/language tests, schema parsing tests, and CI execution remain in Issue #126, not this implementation issue.

## Google Rich Results eligibility

Google's Rich Results Test validates Google-supported rich-result features; it is not a general Schema.org validator and cannot guarantee display in Search. A successful local generator check is not a substitute for running the Rich Results Test against a deployed, publicly crawlable URL.

The implementation deliberately avoids manufacturing data to force a rich-result type:
- `Event`: Google's Event experience requires a physical `Place` with a detailed `PostalAddress`. The calendar API contract (`src/components/utils/mapEvents.ts`) does not expose a venue/address, so calendar pages use `WebPage`/`ItemList` markup instead of emitting an ineligible Event. Do not invent a venue address.
- `VideoObject`: Google requires a real title, crawlable thumbnail, and ISO 8601 upload date. `contentUrl` is included only when the API provides the actual video media URL used by the player; a page URL is never substituted. If required data is missing or invalid, the VideoObject is omitted.
- `Article` / `NewsArticle`: use the actual headline, representative crawlable image URLs, ISO 8601 publication date when available, and real author details. Do not manufacture author names or image URLs.
- `ItemList`, `CollectionPage`, `WebPage`, `Organization`, and other Schema.org types improve machine-readable meaning but do not automatically qualify for a Google rich result. Structured-data carousel features have their own supported entity types and geographic availability.

`FAQPage` remains a valid Schema.org vocabulary type, but Google discontinued FAQ rich results starting May 7, 2026. It must not be counted as a Google Rich Result candidate.

Google's Article documentation recommends author, headline, image, and ISO 8601 publication date fields. After deployment, validate representative URLs with the Rich Results Test and then use Search Console URL Inspection. Google does not guarantee that valid markup will be displayed in Search.

## Schema metadata

Each schema definition includes:
- `schemaId` and `version`
- `expectedType`
- `requiredFields`
- `fieldTypes`
- `placeholders`
- `template`

The registry integrity helper checks duplicate route patterns, schema references, and placeholder declarations. Automated test coverage and change-resilience checks are intentionally implemented under Issue #126.
