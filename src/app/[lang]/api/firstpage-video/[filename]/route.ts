import { NextRequest } from "next/server";

const S3_BASE_URL =
  "https://s3.metarang.com/metarang/firstpage";

const CACHE_TTL = 60 * 60 * 24 * 30;

const ALLOWED_FILES = new Set([
  "mob2.mp4",
  "metaverse-rang.mp4",
]);

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      filename: string;
    }>;
  },
) {
  const { filename } = await context.params;

  if (!ALLOWED_FILES.has(filename)) {
    return new Response("Not Found", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  const range = request.headers.get("range");
  const headers: HeadersInit = {};

  if (range) {
    headers.Range = range;
  }

  let response: Response;

  try {
    response = await fetch(`${S3_BASE_URL}/${filename}`, range
      ? {
          headers,
          // Never store partial byte-range responses in Next's Data Cache.
          cache: "no-store",
        }
      : {
          next: {
            revalidate: CACHE_TTL,
            tags: ["firstpage-videos"],
          },
        });
  } catch (error) {
    console.error("[firstpage-video] Upstream request failed", {
      filename,
      hasRange: Boolean(range),
      error: error instanceof Error ? error.message : String(error),
    });

    return new Response("Video unavailable", {
      status: 502,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  if (!response.ok && response.status !== 206) {
    console.error("[firstpage-video] Upstream returned an error", {
      filename,
      status: response.status,
      hasRange: Boolean(range),
    });

    return new Response("Video unavailable", {
      status: response.status,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  const responseHeaders = new Headers();
  const contentType = response.headers.get("content-type");
  const contentLength = response.headers.get("content-length");
  const contentRange = response.headers.get("content-range");
  const acceptRanges = response.headers.get("accept-ranges");

  if (contentType) responseHeaders.set("Content-Type", contentType);
  if (contentLength) responseHeaders.set("Content-Length", contentLength);
  if (contentRange) responseHeaders.set("Content-Range", contentRange);

  responseHeaders.set("Accept-Ranges", acceptRanges || "bytes");
  responseHeaders.set("Vary", "Range");
  responseHeaders.set(
    "Cache-Control",
    range
      ? `public, max-age=${CACHE_TTL}, must-revalidate`
      : `public, max-age=${CACHE_TTL}, s-maxage=${CACHE_TTL}, stale-while-revalidate=86400`,
  );

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}
