import { NextRequest } from "next/server";

const ADMIN_FLAG_BASE =
  `https://dev-admin.metarang.com/assets/images/flags/`;

const ALLOWED_FILES = new Set([
  "FA.svg",
  "EN.svg",
]);

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      lang: string;
      filename: string;
    }>;
  },
) {
  const { filename } = await context.params;

  if (!ALLOWED_FILES.has(filename)) {
    return new Response("Not Found", {
      status: 404,
    });
  }

  const response = await fetch(
    `${ADMIN_FLAG_BASE}${encodeURIComponent(filename)}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return new Response("Flag unavailable", {
      status: response.status,
    });
  }

  return new Response(response.body, {
    status: 200,
    headers: {
      "Content-Type":
        response.headers.get("content-type") || "image/svg+xml",

      "Cache-Control":
        "public, max-age=31536000, immutable",
    },
  });
}