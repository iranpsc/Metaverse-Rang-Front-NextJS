import aboutPage from "./about-page.schema.json";
import article from "./article.schema.json";
import articleNews from "./article-news.schema.json";
import breadcrumb from "./breadcrumb.schema.json";
import collectionPage from "./collection-page.schema.json";
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

const PLACEHOLDER_PATTERN = /^\{\{([a-zA-Z0-9_.-]+)\}\}$/;
const INLINE_PLACEHOLDER_PATTERN = /\{\{([a-zA-Z0-9_.-]+)\}\}/g;

function getPathValue(source: JsonLdValues, path: string): JsonLdValue | undefined {
  return path.split(".").reduce<JsonLdValue | undefined>((value, segment) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
    return (value as Record<string, JsonLdValue | undefined>)[segment];
  }, source);
}

function resolveTemplateValue(value: unknown, values: JsonLdValues): unknown {
  if (typeof value === "string") {
    const exactMatch = value.match(PLACEHOLDER_PATTERN);
    if (exactMatch) return getPathValue(values, exactMatch[1]);

    return value.replace(INLINE_PLACEHOLDER_PATTERN, (_match, path: string) => {
      const replacement = getPathValue(values, path);
      return replacement === undefined || replacement === null ? "" : String(replacement);
    });
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => resolveTemplateValue(item, values))
      .filter((item) => item !== undefined);
  }

  if (value && typeof value === "object") {
    const resolved: Record<string, unknown> = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      const nextValue = resolveTemplateValue(nestedValue, values);
      if (nextValue !== undefined) resolved[key] = nextValue;
    }
    return resolved;
  }

  return value;
}

function getValueAtPath(source: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((value, segment) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
    return (value as Record<string, unknown>)[segment];
  }, source);
}

function matchesFieldType(value: unknown, fieldType: string): boolean {
  switch (fieldType) {
    case "string":
      return typeof value === "string" && value.trim().length > 0;
    case "number":
      return typeof value === "number" && Number.isFinite(value);
    case "url":
      if (typeof value !== "string" || !value.trim()) return false;
      try {
        const parsed = new URL(value);
        return parsed.protocol === "https:" || parsed.protocol === "http:";
      } catch {
        return false;
      }
    case "iso-date":
      return (
        typeof value === "string" &&
        /^\d{4}-\d{2}-\d{2}(T.*)?$/.test(value) &&
        !Number.isNaN(Date.parse(value))
      );
    case "array":
      return Array.isArray(value);
    case "object":
      return typeof value === "object" && value !== null && !Array.isArray(value);
    default:
      return false;
  }
}

export function getJsonLdSchemaDefinition(schemaId: JsonLdSchemaId): JsonLdSchemaDefinition {
  return definitions[schemaId];
}

export function generateJsonLd(
  schemaId: JsonLdSchemaId,
  values: JsonLdValues,
): Record<string, unknown> {
  const definition = getJsonLdSchemaDefinition(schemaId);
  const resolved = resolveTemplateValue(definition.template, values);

  if (!resolved || typeof resolved !== "object" || Array.isArray(resolved)) {
    throw new TypeError('JSON-LD "' + schemaId + '" template must resolve to an object.');
  }

  const generated = resolved as Record<string, unknown>;

  for (const field of definition.requiredFields) {
    const value = getValueAtPath(generated, field);
    if (value === undefined || value === null || value === "") {
      throw new Error('JSON-LD "' + schemaId + '" is missing required field "' + field + '".');
    }
  }

  for (const [field, fieldType] of Object.entries(definition.fieldTypes)) {
    const value = getValueAtPath(generated, field);
    if (value !== undefined && !matchesFieldType(value, fieldType)) {
      throw new TypeError(
        'JSON-LD "' + schemaId + '" field "' + field + '" must be "' + fieldType + '".',
      );
    }
  }

  if (
    generated["@context"] !== "https://schema.org" &&
    generated["@context"] !== "https://schema.org/"
  ) {
    throw new TypeError('JSON-LD "' + schemaId + '" must use the Schema.org context.');
  }

  if (definition.expectedType === "@graph") {
    const graph = generated["@graph"];
    if (!Array.isArray(graph) || graph.some((node) => !node || typeof node !== "object" || typeof (node as Record<string, unknown>)["@type"] !== "string")) {
      throw new TypeError('JSON-LD "' + schemaId + '" graph must contain typed schema objects.');
    }
  } else if (generated["@type"] !== definition.expectedType) {
    throw new TypeError(
      'JSON-LD "' + schemaId + '" expected @type "' + definition.expectedType + '".',
    );
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
