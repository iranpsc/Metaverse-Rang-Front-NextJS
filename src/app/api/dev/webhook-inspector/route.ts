import { NextRequest, NextResponse } from "next/server";
import { isWebhookInspectorAdmin } from "../../../../lib/webhook-inspector/auth";
import { clearWebhookLogs, getWebhookLogs } from "../../../../lib/webhook-inspector/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function authorize(request: NextRequest) {
  if (process.env.WEBHOOK_INSPECTOR_ENABLED !== "true") {
    return NextResponse.json({ message: "Webhook Inspector is disabled" }, { status: 404 });
  }
  if (!(await isWebhookInspectorAdmin(request))) {
    return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
  }
  return null;
}

export async function GET(request: NextRequest) {
  const denied = await authorize(request);
  if (denied) return denied;

  return NextResponse.json(
    { entries: getWebhookLogs(), limit: 150 },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

export async function DELETE(request: NextRequest) {
  const denied = await authorize(request);
  if (denied) return denied;

  clearWebhookLogs();
  return NextResponse.json({ success: true });
}
