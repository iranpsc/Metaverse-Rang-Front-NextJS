import { NextRequest } from "next/server";

const ADMIN_FLAG_BASE =
  "https://dev-admin.metarang.com/assets/images/flags/";

const CACHE_TTL = 60 * 60 * 24 * 2;

const ALLOWED_FILES = new Set([
  "fa.svg",
  "en.svg",
  "ar.svg",
  "tr.svg",
  "zh.svg",
  "ru.svg",
]);

export async function GET(
  _request: NextRequest,
  context: {
    params: Promise<{
      lang: string;
      filename: string;
    }>;
  },
) {
  const { filename: rawFilename } = await context.params;
  const filename = rawFilename.toLowerCase();

  if (!ALLOWED_FILES.has(filename)) {
    return new Response("Not Found", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  try {
    const response = await fetch(
      `${ADMIN_FLAG_BASE}${encodeURIComponent(filename)}`,
      {
        next: {
          revalidate: CACHE_TTL,
          tags: ["admin-flags"],
        },
      },
    );

    if (!response.ok) {
      console.error("[flags] Upstream request failed", {
        filename,
        status: response.status,
      });

      return new Response("Flag unavailable", {
        status: response.status,
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "image/svg+xml",
        "Cache-Control": `public, max-age=${CACHE_TTL}, s-maxage=${CACHE_TTL}, must-revalidate`,
      },
    });
  } catch (error) {
    console.error("[flags] Upstream request threw an error", {
      filename,
      error: error instanceof Error ? error.message : String(error),
    });

    return new Response("Flag unavailable", {
      status: 502,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}
