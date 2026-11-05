
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Validate webhook secret
    const secret = request.headers.get("x-webhook-secret");

    if (
      !process.env.WEBHOOK_SECRET ||
      secret !== process.env.WEBHOOK_SECRET
    ) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Read the payload according to the sender's content type.
    const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
    let payload: unknown;

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
    return NextResponse.json(
      {
        success: true,
        message: "Webhook received successfully",
        data: payload,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Webhook] Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid webhook request",
      },
      { status: 400 }
    );
  }
}
