import type { Translations } from "@/types/translations";

export type { Translations };

function isTranslationDict(data: unknown): data is Record<string, unknown> {
  return Boolean(data) && typeof data === "object" && !Array.isArray(data);
}

/**
 * Resolve a numeric (or string) translation ID against the flat dictionary.
 *
 * `findByUniqueId(translations, 12)` → `translations["12"]`
 *
 * Missing, empty, or non-string values fall back to the original ID
 * so callers never receive `undefined`, `null`, or `""`.
 */
export function findByUniqueId(
  data: object | null | undefined,
  uniqueId: string | number | null | undefined
): string {
  const key = uniqueId == null ? "" : String(uniqueId);

  if (!key) {
    return "";
  }

  if (!isTranslationDict(data)) {
    return key;
  }

  const value = data[key];

  if (typeof value === "string" && value.length > 0) {
    return value;
  }

  return key;
}
