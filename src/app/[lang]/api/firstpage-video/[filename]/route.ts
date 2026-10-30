import { NextRequest } from "next/server";

const S3_BASE_URL = "https://s3.metarang.com/metarang/firstpage";
const CACHE_TTL = 60 * 60 * 24 * 30;
const ALLOWED_FILES = new Set(["mob2.mp4", "metaverse-rang.mp4"]);

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> },
) {
  const { filename } = await context.params;

  if (!ALLOWED_FILES.has(filename)) {
    return new Response("Not Found", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const range = request.headers.get("range");
  const upstreamHeaders = new Headers();

  if (range) upstreamHeaders.set("Range", range);

  let response: Response;

  try {
    // Do not use cache: "no-store" here. Next's Data Cache should cache each
    // distinct request (including its Range header) for the configured TTL.
    // This lets repeated byte-range requests reuse the matching cached 206
    // response without confusing it with a different range or the full file.
    response = await fetch(`${S3_BASE_URL}/${filename}`, {
      headers: upstreamHeaders,
      next: {
        revalidate: CACHE_TTL,
        tags: ["firstpage-videos", `firstpage-video-${filename}`],
      },
      signal: AbortSignal.timeout(20_000),
    });
  } catch (error) {
    const cause = error instanceof Error && "cause" in error
      ? (error as Error & { cause?: { code?: string; message?: string } }).cause
      : undefined;

    console.error("[firstpage-video] Upstream request failed", {
      filename,
      hasRange: Boolean(range),
      error: error instanceof Error ? error.message : String(error),
      causeCode: cause?.code,
      causeMessage: cause?.message,
    });

    return new Response("Video unavailable", {
      status: 502,
      headers: { "Cache-Control": "no-store" },
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
      headers: { "Cache-Control": "no-store" },
    });
  }

  const responseHeaders = new Headers();
  for (const name of [
    "content-type",
    "content-length",
    "content-range",
    "accept-ranges",
    "etag",
    "last-modified",
  ]) {
    const value = response.headers.get(name);
    if (value) {
      const headerName = name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("-");
      responseHeaders.set(headerName, value);
    }
  }

  // Range-specific 206 responses are cacheable for the same browser URL/range.
  // The upstream fetch's Next Data Cache key includes request headers.
  responseHeaders.set("Accept-Ranges", response.headers.get("accept-ranges") || "bytes");
  responseHeaders.set("Vary", "Range");
  responseHeaders.set(
    "Cache-Control",
    `public, max-age=${CACHE_TTL}, s-maxage=${CACHE_TTL}, stale-while-revalidate=86400`,
  );

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}
