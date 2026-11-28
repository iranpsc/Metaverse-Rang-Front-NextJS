import { NextRequest, NextResponse } from "next/server";
import { recordWebhookObservation } from "../../../../lib/webhook-inspector/observer";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const startedAt = Date.now();
  let payload: unknown;

  try {
    // Validate webhook secret
    const secret = request.headers.get("x-webhook-secret");

    if (
      !process.env.WEBHOOK_SECRET ||
      secret !== process.env.WEBHOOK_SECRET
    ) {
      const responseBody = { success: false, message: "Unauthorized" };
      recordWebhookObservation(request, payload, responseBody, 401, startedAt);

      return NextResponse.json(
        responseBody,
        { status: 401 }
      );
    }

    // Read the payload according to the sender's content type.
    const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";

    if (contentType.includes("application/json")) {
      payload = JSON.parse(await request.text());
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      payload = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => [
          key,
          typeof value === "string"
            ? value
            : {
                name: value.name,
                type: value.type,
                size: value.size,
                lastModified: value.lastModified,
              },
        ])
      );
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      payload = Object.fromEntries(new URLSearchParams(await request.text()));
    } else {
      payload = await request.text();
    }

    console.log("[Webhook] Received:", payload);

    // Return success response
    const responseBody = {
      success: true,
      message: "Webhook received successfully",
      data: payload,
    };
    recordWebhookObservation(request, payload, responseBody, 200, startedAt);

    return NextResponse.json(
      responseBody,
      { status: 200 }
    );
  } catch (error) {
    console.error("[Webhook] Error:", error);

    const responseBody = {
      success: false,
      message: "Invalid webhook request",
    };
    recordWebhookObservation(request, payload, responseBody, 400, startedAt);

    return NextResponse.json(
      responseBody,
      { status: 400 }
    );
  }
}
