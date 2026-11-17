import aboutPage from "./about-page.schema.json";
import article from "./article.schema.json";
import articleNews from "./article-news.schema.json";
import breadcrumb from "./breadcrumb.schema.json";
import collectionPage from "./collection-page.schema.json";
import citizenPerson from "./citizen-person.schema.json";
import citizenWorkspacePage from "./citizen-workspace-page.schema.json";
import contactPage from "./contact-page.schema.json";
import event from "./event.schema.json";
import faqPage from "./faq-page.schema.json";
import financialProduct from "./financial-product.schema.json";
import itemList from "./item-list.schema.json";
import organization from "./organization.schema.json";
import professionalService from "./professional-service.schema.json";
import profilePage from "./profile-page.schema.json";
import realEstateListing from "./real-estate-listing.schema.json";
import softwareApplication from "./software-application.schema.json";
import videoObject from "./video-object.schema.json";
import webpage from "./webpage.schema.json";
import website from "./website.schema.json";
import routeManifest from "./index.manifest.json";
import whitepaperPage from "./whitepaper-page.schema.json";

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue | undefined };

export type JsonLdSchemaDefinition = {
  schemaId: string;
  version: string;
  expectedType: string;
  requiredFields: string[];
  fieldTypes: Record<string, string>;
  placeholders: string[];
  template: Record<string, unknown>;
};

const definitions = {
  "about-page": aboutPage,
  article,
  "article-news": articleNews,
  breadcrumb,
  "collection-page": collectionPage,
  "citizen-person": citizenPerson,
  "citizen-workspace-page": citizenWorkspacePage,
  "contact-page": contactPage,
  event,
  "faq-page": faqPage,
  "financial-product": financialProduct,
  "item-list": itemList,
  organization,
  "professional-service": professionalService,
  "profile-page": profilePage,
  "real-estate-listing": realEstateListing,
  "software-application": softwareApplication,
  "video-object": videoObject,
  webpage,
  website,
  "whitepaper-page": whitepaperPage,
} satisfies Record<string, JsonLdSchemaDefinition>;

export type JsonLdSchemaId = keyof typeof definitions;
export type JsonLdValues = Record<string, JsonLdValue | undefined>;

export type JsonLdRouteConfig = {
  pattern: string;
  page: string;
  schemaIds: JsonLdSchemaId[];
  indexable: boolean;
};

const routeEntries = routeManifest.routes as unknown as JsonLdRouteConfig[];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function routePatternToRegExp(pattern: string): RegExp {
  if (pattern === "/") return /^\/?$/;

  const segments = pattern.split("/").filter(Boolean);
  let expression = "";

  for (const segment of segments) {
    if (segment.startsWith("[[...") && segment.endsWith("]]")) {
      expression += "(?:/[^/]+(?:/[^/]+)*)?";
    } else if (segment.startsWith("[...") && segment.endsWith("]")) {
      expression += "/[^/]+(?:/[^/]+)*";
    } else if (segment.startsWith("[") && segment.endsWith("]")) {
      expression += "/[^/]+";
    } else {
      expression += "/" + escapeRegExp(segment);
    }
  }

  return new RegExp("^" + expression + "/?$");
}

/**
 * Resolve a localized pathname (for example, /fa/news/my-article)
 * to its route manifest entry. Locale values remain API-driven.
 */
export function getJsonLdRouteConfig(localizedPathname: string): JsonLdRouteConfig | undefined {
  if (typeof localizedPathname !== "string" || !localizedPathname.trim()) return undefined;

  let pathname: string;
  try {
    pathname = new URL(localizedPathname, "https://jsonld.invalid").pathname;
  } catch {
    return undefined;
  }

  const segments = pathname.split("/").filter(Boolean);
  // A locale is dynamic, but must be locale-like; `/about` must not resolve as `/`.
  if (segments.length === 0 || !/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(segments[0])) {
    return undefined;
  }

  const pathWithoutLocale = "/" + segments.slice(1).join("/");
  const normalizedPath =
    pathWithoutLocale === "/" ? "/" : pathWithoutLocale.replace(/\/+$/, "");

  return routeEntries.find((entry) => routePatternToRegExp(entry.pattern).test(normalizedPath));
}

const PLACEHOLDER_PATTERN = /^\{\{([a-zA-Z0-9_.-]+)\}\}$/;
const INLINE_PLACEHOLDER_PATTERN = /\{\{([a-zA-Z0-9_.-]+)\}\}/g;

function getPathValue(source: JsonLdValues, path: string): JsonLdValue | undefined {
  return path.split(".").reduce<JsonLdValue | undefined>((value, segment) => {
    if (value === null || value === undefined || typeof value !== "object" || Array.isArray(value)) {
      return undefined;
    }
    return (value as Record<string, JsonLdValue | undefined>)[segment];
  }, source);
}

function resolveTemplateValue(value: unknown, values: JsonLdValues): unknown {
  if (typeof value === "string") {
    const exactMatch = value.match(PLACEHOLDER_PATTERN);
    if (exactMatch) {
      const replacement = getPathValue(values, exactMatch[1]);
      return replacement === null ||
        (typeof replacement === "string" && !replacement.trim())
        ? undefined
        : replacement;
    }

    return value.replace(INLINE_PLACEHOLDER_PATTERN, (_match, path: string) => {
      const replacement = getPathValue(values, path);
      if (
        replacement === undefined ||
        replacement === null ||
        (typeof replacement === "string" && !replacement.trim()) ||
        typeof replacement === "object"
      ) {
        throw new Error(`JSON-LD template is missing a valid scalar value for placeholder "${path}".`);
      }
      return String(replacement);
    });
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => resolveTemplateValue(item, values))
      .filter(
        (item) =>
          item !== undefined &&
          item !== null &&
          !(typeof item === "string" && !item.trim()),
      );
  }

  if (value && typeof value === "object") {
    const resolved: Record<string, unknown> = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      const nextValue = resolveTemplateValue(nestedValue, values);
      if (
        nextValue !== undefined &&
        nextValue !== null &&
        !(typeof nextValue === "string" && !nextValue.trim())
      ) {
        resolved[key] = nextValue;
      }
    }
    return resolved;
  }

  return value;
}

function getValueAtPath(source: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((value, segment) => {
    if (value === null || value === undefined || typeof value !== "object" || Array.isArray(value)) {
      return undefined;
    }
    return (value as Record<string, unknown>)[segment];
  }, source);
}

function isValidIsoDate(value: unknown): value is string {
  if (typeof value !== "string") return false;

  const match =
    /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(Z|([+-])(\d{2}):(\d{2}))?)?$/.exec(
      value,
    );
  if (!match) return false;

  const [, yearText, monthText, dayText, hourText, minuteText, secondText, , , , offsetHourText, offsetMinuteText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(`${yearText}-${monthText}-${dayText}T00:00:00.000Z`);

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return false;
  }

  if (hourText !== undefined) {
    const hour = Number(hourText);
    const minute = Number(minuteText);
    const second = secondText === undefined ? 0 : Number(secondText);
    if (hour > 23 || minute > 59 || second > 59) return false;
  }

  if (offsetHourText !== undefined && offsetMinuteText !== undefined) {
    const offsetHour = Number(offsetHourText);
    const offsetMinute = Number(offsetMinuteText);
    if (
      offsetHour > 14 ||
      offsetMinute > 59 ||
      (offsetHour === 14 && offsetMinute !== 0)
    ) {
      return false;
    }
  }

  return !Number.isNaN(Date.parse(value));
}

function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    const parsed = new URL(value);
    return (parsed.protocol === "https:" || parsed.protocol === "http:") && Boolean(parsed.hostname);
  } catch {
    return false;
  }
}

function matchesFieldType(value: unknown, fieldType: string): boolean {
  switch (fieldType) {
    case "string":
      return typeof value === "string" && value.trim().length > 0;
    case "number":
      return typeof value === "number" && Number.isFinite(value);
    case "url":
      return isHttpUrl(value);
    case "url-array":
      return Array.isArray(value) && value.length > 0 && value.every(isHttpUrl);
    case "iso-date":
      return isValidIsoDate(value);
    case "array":
      return Array.isArray(value) && value.length > 0 &&
        value.every((item) => item !== null && item !== undefined);
    case "object":
      return typeof value === "object" && value !== null &&
        !Array.isArray(value) &&
        Object.keys(value as Record<string, unknown>).length > 0;
    default:
      return false;
  }
}

export function getJsonLdSchemaDefinition(schemaId: JsonLdSchemaId): JsonLdSchemaDefinition {
  return definitions[schemaId];
}

/**
 * Static registry audit used by the implementation workflow and Issue #126
 * validation pipeline. It intentionally does not perform network requests.
 */
export function validateJsonLdRegistry(): string[] {
  const issues: string[] = [];
  const seenPatterns = new Set<string>();

  for (const route of routeEntries) {
    if (seenPatterns.has(route.pattern)) {
      issues.push(`Duplicate route pattern: ${route.pattern}`);
    }
    seenPatterns.add(route.pattern);

    for (const schemaId of route.schemaIds) {
      if (!(schemaId in definitions)) {
        issues.push(`Unknown schema "${schemaId}" referenced by route "${route.pattern}".`);
      }
    }
  }

  for (const [schemaId, definition] of Object.entries(definitions)) {
    if (definition.schemaId !== schemaId) {
      issues.push(`Schema registry key "${schemaId}" does not match schemaId "${definition.schemaId}".`);
    }
    if (!definition.version || !definition.expectedType) {
      issues.push(`Schema "${schemaId}" is missing version or expectedType metadata.`);
    }

    const used = new Set<string>();
    const visit = (value: unknown) => {
      if (typeof value === "string") {
        for (const match of value.matchAll(/\{\{([a-zA-Z0-9_.-]+)\}\}/g)) {
          used.add(match[1]);
        }
      } else if (Array.isArray(value)) {
        value.forEach(visit);
      } else if (value && typeof value === "object") {
        Object.values(value).forEach(visit);
      }
    };

    visit(definition.template);

    const declared = new Set(definition.placeholders);
    for (const placeholder of used) {
      if (!declared.has(placeholder)) {
        issues.push(`Schema "${schemaId}" uses undeclared placeholder "${placeholder}".`);
      }
    }
    for (const placeholder of declared) {
      if (!used.has(placeholder)) {
        issues.push(`Schema "${schemaId}" declares unused placeholder "${placeholder}".`);
      }
    }
  }

  return issues;
}

export function generateJsonLd(
  schemaId: JsonLdSchemaId,
  values: JsonLdValues,
): Record<string, unknown> {
  const definition = getJsonLdSchemaDefinition(schemaId);
  const resolved = resolveTemplateValue(definition.template, values);

  if (!resolved || typeof resolved !== "object" || Array.isArray(resolved)) {
    throw new TypeError(`JSON-LD "${schemaId}" template must resolve to an object.`);
  }

  const generated = resolved as Record<string, unknown>;

  for (const field of definition.requiredFields) {
    const value = getValueAtPath(generated, field);
    if (value === undefined || value === null || (typeof value === "string" && !value.trim())) {
      throw new Error(`JSON-LD "${schemaId}" is missing required field "${field}".`);
    }
  }

  for (const [field, fieldType] of Object.entries(definition.fieldTypes)) {
    const value = getValueAtPath(generated, field);
    if (value !== undefined && !matchesFieldType(value, fieldType)) {
      throw new TypeError(
        `JSON-LD "${schemaId}" field "${field}" must be "${fieldType}".`,
      );
    }
  }

  if (
    generated["@context"] !== "https://schema.org" &&
    generated["@context"] !== "https://schema.org/"
  ) {
    throw new TypeError(`JSON-LD "${schemaId}" must use the Schema.org context.`);
  }

  if (definition.expectedType === "@graph") {
    const graph = generated["@graph"];
    if (
      !Array.isArray(graph) ||
      graph.length === 0 ||
      graph.some(
        (node) =>
          !node ||
          typeof node !== "object" ||
          Array.isArray(node) ||
          typeof (node as Record<string, unknown>)["@type"] !== "string",
      )
    ) {
      throw new TypeError(`JSON-LD "${schemaId}" graph must contain typed schema objects.`);
    }
  } else if (generated["@type"] !== definition.expectedType) {
    throw new TypeError(
      `JSON-LD "${schemaId}" expected @type "${definition.expectedType}".`,
    );
  }

  if (schemaId === "event") {
    const location = generated.location as Record<string, unknown> | undefined;
    const address = location?.address as Record<string, unknown> | undefined;
    if (
      location?.["@type"] !== "Place" ||
      address?.["@type"] !== "PostalAddress" ||
      !location.name ||
      !address.streetAddress ||
      !address.addressCountry
    ) {
      throw new TypeError(
        'Google Event rich results require a physical Place with a complete PostalAddress.',
      );
    }
  }

  return generated;
}

export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
