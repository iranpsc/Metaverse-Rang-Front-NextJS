# JSON-LD Registry

This directory is the source of truth for JSON-LD schema definitions and route-to-schema assignments.

## Structure

- `index.manifest.json`: route-pattern registry. Patterns are relative to the locale segment (for example, `/articles`).
- `*.schema.json`: versioned schema definitions containing metadata, required fields, field types, and a JSON-LD template.
- `template`: supports explicit `{{placeholder}}` tokens. Placeholder resolution and rendering are implemented by the server-side generator in the application layer.

## Conventions

1. Use Schema.org vocabulary and valid Schema.org types. Do not invent a type to represent a product concept; model domain concepts with supported types and nested properties.
2. Keep locale-specific content in placeholders. The active language set is runtime-driven and must not be hardcoded in this registry.
3. Route patterns must match actual App Router page patterns. Dynamic segments use bracket notation.
4. Do not add test implementations or test execution to this issue. Registry and generator tests belong to Issue #126.
5. Keep route entries explicit. Routes that are administrative or private must be marked `indexable: false` and must not emit public structured data.

## Current inventory

The initial manifest records the 32 locale-scoped App Router page patterns currently present under `src/app/[lang]`. This is a source-file inventory, not a claim that the project has only 32 concrete URLs; dynamic route values and active locales expand the runtime URL set.

## Schema metadata

Each schema definition includes:
- `schemaId` and `version`
- `expectedType`
- `requiredFields`
- `fieldTypes`
- `placeholders`
- `template`

The test validator and change-resilience coverage are intentionally implemented under Issue #126.
