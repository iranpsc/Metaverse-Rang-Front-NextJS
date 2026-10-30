
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

    // Read backend payload
    const payload = await request.json();

    console.log("[Webhook] Received:", payload);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Webhook received successfully",
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
