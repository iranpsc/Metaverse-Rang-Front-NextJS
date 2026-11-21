import { NextRequest, NextResponse } from "next/server";
import {
  addWebhookLog,
  safeWebhookHeaders,
  sanitizeWebhookPayload,
} from "./store";

export async function handleWebhookRequest(request: NextRequest): Promise<NextResponse> {
  const startedAt = Date.now();
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  let payload: unknown = null;

  const respond = (body: Record<string, unknown>, status: number) => {
    addWebhookLog({
      method: request.method,
      path: new URL(request.url).pathname,
      contentType,
      headers: safeWebhookHeaders(request.headers),
      request: sanitizeWebhookPayload(payload),
      response: sanitizeWebhookPayload(body),
      status,
      durationMs: Date.now() - startedAt,
    });
    return NextResponse.json(body, { status });
  };

  try {
    const secret = request.headers.get("x-webhook-secret");
    if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET) {
      return respond({ success: false, message: "Unauthorized" }, 401);
    }

    if (contentType.includes("application/json")) {
      payload = JSON.parse(await request.text());
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      payload = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => [
          key,
          typeof value === "string"
            ? value
            : { name: value.name, type: value.type, size: value.size, lastModified: value.lastModified },
        ]),
      );
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      payload = Object.fromEntries(new URLSearchParams(await request.text()));
    } else {
      payload = await request.text();
    }

    return respond(
      { success: true, message: "Webhook received successfully", data: payload },
      200,
    );
  } catch {
    return respond({ success: false, message: "Invalid webhook request" }, 400);
  }
}
