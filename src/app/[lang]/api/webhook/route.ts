import { NextRequest } from "next/server";
import { handleWebhookRequest } from "../../../../lib/webhook-inspector/handler";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return handleWebhookRequest(request);
}
