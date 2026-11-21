import { NextRequest } from "next/server";

const ALLOWED_ADMIN_IDS = new Set(["hm-2000003", "hm-2000007", "hm-2000001"]);

export async function isWebhookInspectorAdmin(request: NextRequest): Promise<boolean> {
  if (process.env.WEBHOOK_INSPECTOR_ENABLED !== "true") return false;

  const authCookie = request.cookies.get("auth")?.value;
  if (!authCookie) return false;

  const token = new URLSearchParams(authCookie).get("token");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");
  if (!token || !apiBaseUrl) return false;

  try {
    const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) return false;

    const result = await response.json();
    const code = String(result?.data?.code ?? "").trim().toLowerCase();
    return ALLOWED_ADMIN_IDS.has(code);
  } catch {
    return false;
  }
}
