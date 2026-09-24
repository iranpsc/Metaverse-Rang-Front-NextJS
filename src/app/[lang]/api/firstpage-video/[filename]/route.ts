import { NextRequest } from "next/server";

const S3_BASE_URL =
  "https://s3.metarang.com/metarang/firstpage";

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
    });
  }

  const range = request.headers.get("range");

  const headers: HeadersInit = {};

  if (range) {
    headers.Range = range;
  }

  const response = await fetch(`${S3_BASE_URL}/${filename}`, {
    headers,
    cache: "no-store",
  });

  if (!response.ok && response.status !== 206) {
    return new Response("Video unavailable", {
      status: response.status,
    });
  }

  const responseHeaders = new Headers();

  const contentType = response.headers.get("content-type");
  const contentLength = response.headers.get("content-length");
  const contentRange = response.headers.get("content-range");
  const acceptRanges = response.headers.get("accept-ranges");

  if (contentType) {
    responseHeaders.set("Content-Type", contentType);
  }

  if (contentLength) {
    responseHeaders.set("Content-Length", contentLength);
  }

  if (contentRange) {
    responseHeaders.set("Content-Range", contentRange);
  }

  if (acceptRanges) {
    responseHeaders.set("Accept-Ranges", acceptRanges);
  } else {
    responseHeaders.set("Accept-Ranges", "bytes");
  }

  responseHeaders.set(
    "Cache-Control",
    "public, max-age=31536000, immutable",
  );

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}