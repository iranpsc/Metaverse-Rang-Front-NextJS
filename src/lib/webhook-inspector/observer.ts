import { NextRequest } from "next/server";
import {
  addWebhookLog,
  safeWebhookHeaders,
  sanitizeWebhookPayload,
} from "./store";

/**
 * Records an observation without ever affecting the webhook's response path.
 * The webhook handler remains responsible for all validation and response logic.
 */
export function recordWebhookObservation(
  request: NextRequest,
  requestPayload: unknown,
  responsePayload: unknown,
  status: number,
  startedAt: number,
): void {
  if (process.env.WEBHOOK_INSPECTOR_ENABLED !== "true") return;

  try {
    addWebhookLog({
      method: request.method,
      path: new URL(request.url).pathname,
      contentType: request.headers.get("content-type")?.toLowerCase() ?? "",
      headers: safeWebhookHeaders(request.headers),
      request: sanitizeWebhookPayload(requestPayload),
      response: sanitizeWebhookPayload(responsePayload),
      status,
      durationMs: Date.now() - startedAt,
    });
  } catch {
    // Monitoring must never interrupt or alter webhook processing.
  }
}
