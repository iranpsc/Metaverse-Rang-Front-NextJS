import { randomUUID } from "node:crypto";

export type WebhookLogEntry = {
  id: string;
  timestamp: string;
  method: string;
  path: string;
  contentType: string;
  headers: Record<string, string>;
  request: unknown;
  response: unknown;
  status: number;
  durationMs: number;
};

const MAX_ENTRIES = 150;
const MAX_BODY_LENGTH = 16_000;
const SECRET_KEY = /(authorization|cookie|secret|token|password|api[-_]?key|credential|private.?key)/i;

type InspectorGlobal = typeof globalThis & {
  __metarangWebhookLogs?: WebhookLogEntry[];
};

const runtime = globalThis as InspectorGlobal;
const getEntries = () => (runtime.__metarangWebhookLogs ??= []);

function sanitize(value: unknown, depth = 0): unknown {
  if (depth > 6) return "[Max depth reached]";
  if (typeof value === "string") {
    return value.length > 3_000 ? `${value.slice(0, 3_000)}…[truncated]` : value;
  }
  if (typeof value === "number" || typeof value === "boolean" || value === null) return value;
  if (Array.isArray(value)) return value.slice(0, 50).map((item) => sanitize(item, depth + 1));
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).slice(0, 60).map(([key, item]) => [
        key,
        SECRET_KEY.test(key) ? "[REDACTED]" : sanitize(item, depth + 1),
      ]),
    );
  }
  return String(value);
}

export function sanitizeWebhookPayload(value: unknown): unknown {
  const safe = sanitize(value);
  try {
    const serialized = JSON.stringify(safe);
    if (serialized && serialized.length > MAX_BODY_LENGTH) {
      return { _truncated: true, preview: serialized.slice(0, MAX_BODY_LENGTH) };
    }
  } catch {
    return "[Unserializable payload]";
  }
  return safe;
}

export function safeWebhookHeaders(headers: Headers): Record<string, string> {
  const allowed = ["content-type", "user-agent", "x-request-id", "x-correlation-id"];
  return Object.fromEntries(
    allowed.flatMap((name) => {
      const value = headers.get(name);
      return value ? [[name, value.slice(0, 300)]] : [];
    }),
  );
}

export function addWebhookLog(entry: Omit<WebhookLogEntry, "id" | "timestamp">): void {
  const entries = getEntries();
  entries.unshift({ ...entry, id: randomUUID(), timestamp: new Date().toISOString() });
  if (entries.length > MAX_ENTRIES) entries.length = MAX_ENTRIES;
}

export function getWebhookLogs(): WebhookLogEntry[] {
  return [...getEntries()];
}

export function clearWebhookLogs(): void {
  getEntries().length = 0;
}
