
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
  "admin.metarang.com",
  "api.metarang.com",
]);

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 300;

function isAllowedUrl(value: string) {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      ALLOWED_HOSTS.has(url.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(
  url: string,
  headers?: HeadersInit,
) {
  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        headers,
        next: { revalidate: 3600 },
      });

      if (response.ok || response.status === 206) {
        return response;
      }

      lastError = new Error(
        `Upstream HTTP ${response.status}`,
      );
    } catch (error) {
      lastError = error;
    }

    if (attempt < MAX_RETRIES - 1) {
      await sleep(RETRY_DELAY_MS * (attempt + 1));
    }
  }

  throw (
    lastError ??
    new Error("Upstream request failed")
  );
}

function getContentType(type: string) {
  if (type === "gltf") {
    return "model/gltf+json";
  }

  if (type === "bin") {
    return "application/octet-stream";
  }

  return "application/octet-stream";
}

/* =========================================================
   GET
========================================================= */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type");
    const targetUrl = searchParams.get("url");

    /*
     * برای GLTF:
     *
     * این پارامتر BIN واقعی را مشخص می‌کند.
     */
    const binUrl = searchParams.get("bin");

    const expectedLengthRaw =
      searchParams.get("expectedLength");

    /* -------------------------------------------------------
       Validate type
    ------------------------------------------------------- */

    if (
      type !== "gltf" &&
      type !== "bin" &&
      type !== "image"
    ) {
      return NextResponse.json(
        {
          error: "Invalid model type",
        },
        {
          status: 400,
        },
      );
    }

    /* -------------------------------------------------------
       Validate URL
    ------------------------------------------------------- */

    if (!targetUrl) {
      return NextResponse.json(
        {
          error: "Missing url parameter",
        },
        {
          status: 400,
        },
      );
    }

    if (!isAllowedUrl(targetUrl)) {
      return NextResponse.json(
        {
          error: "URL host is not allowed",
        },
        {
          status: 403,
        },
      );
    }

    /* -------------------------------------------------------
       Validate BIN URL
    ------------------------------------------------------- */

    if (binUrl) {
      if (!isAllowedUrl(binUrl)) {
        return NextResponse.json(
          {
            error: "BIN URL host is not allowed",
          },
          {
            status: 403,
          },
        );
      }
    }

    /* -------------------------------------------------------
       expectedLength
    ------------------------------------------------------- */

    const expectedLength = expectedLengthRaw
      ? Number(expectedLengthRaw)
      : undefined;

    if (
      expectedLength !== undefined &&
      (!Number.isFinite(expectedLength) ||
        expectedLength < 0)
    ) {
      return NextResponse.json(
        {
          error: "Invalid expectedLength",
        },
        {
          status: 400,
        },
      );
    }

    console.log("MODEL PROXY:", {
      type,
      targetUrl,
      binUrl,
      expectedLength,
    });

    /* =======================================================
       GLTF

       GLTF را می‌گیریم، JSON را اصلاح می‌کنیم و برمی‌گردانیم.

       فقط برای GLTF از JSON استفاده می‌کنیم.
       هیچ Base64 یا Blob ساخته نمی‌شود.
    ======================================================= */

    if (type === "gltf") {
      const upstream = await fetchWithRetry(targetUrl);

      if (!upstream.ok) {
        return NextResponse.json(
          {
            error: `Failed to fetch GLTF: ${upstream.status}`,
          },
          {
            status: 502,
          },
        );
      }

      const gltf = await upstream.json();

      /* -----------------------------------------------------
         اگر BIN واقعی از API داریم،
         URI مربوط به buffer اول را با آن جایگزین کن.
      ----------------------------------------------------- */

      if (
        binUrl &&
        Array.isArray(gltf.buffers) &&
        gltf.buffers.length > 0
      ) {
        gltf.buffers = gltf.buffers.map(
          (
            buffer: Record<string, unknown>,
            index: number,
          ) => {
            if (index === 0) {
              return {
                ...buffer,
                uri: binUrl,
              };
            }

            return buffer;
          },
        );

        console.log("GLTF BIN URI REPLACED:", {
          replacement: binUrl,
        });
      }

      /*
       * ----------------------------------------------------
       * اگر تصاویر relative هستند،
       * آنها را absolute می‌کنیم.
       * ----------------------------------------------------
       */

      if (Array.isArray(gltf.images)) {
        gltf.images = gltf.images.map(
          (image: Record<string, unknown>) => {
            const uri = image?.uri;

            if (
              typeof uri !== "string" ||
              uri.startsWith("data:")
            ) {
              return image;
            }

            try {
              return {
                ...image,
                uri: new URL(uri, targetUrl).href,
              };
            } catch {
              return image;
            }
          },
        );
      }

      const body = JSON.stringify(gltf);

      const headers = new Headers();

      headers.set(
        "Content-Type",
        "model/gltf+json",
      );

      headers.set(
        "Content-Length",
        String(
          new TextEncoder().encode(body).byteLength,
        ),
      );

      headers.set(
        "Cache-Control",
        "public, max-age=3600, stale-while-revalidate=86400",
      );

      headers.set(
        "Access-Control-Allow-Origin",
        "*",
      );

      return new Response(body, {
        status: 200,
        headers,
      });
    }

    /* =======================================================
       BIN / IMAGE
       Stream مستقیم است.

       Base64 ❌
       Blob ❌
       تبدیل ArrayBuffer ❌
    ======================================================= */

    const incomingRange = request.headers.get("range");

    const requestHeaders: HeadersInit = {};

    if (incomingRange) {
      requestHeaders.Range = incomingRange;
    }

    const upstream = await fetchWithRetry(
      targetUrl,
      requestHeaders,
    );

    const responseHeaders = new Headers();

    const contentType =
      upstream.headers.get("content-type");

    const contentLength =
      upstream.headers.get("content-length");

    const contentRange =
      upstream.headers.get("content-range");

    const acceptRanges =
      upstream.headers.get("accept-ranges");

    responseHeaders.set(
      "Content-Type",
      contentType || getContentType(type),
    );

    if (contentLength) {
      responseHeaders.set(
        "Content-Length",
        contentLength,
      );
    }

    if (contentRange) {
      responseHeaders.set(
        "Content-Range",
        contentRange,
      );
    }

    responseHeaders.set(
      "Accept-Ranges",
      acceptRanges || "bytes",
    );

    responseHeaders.set(
      "Cache-Control",
      "public, max-age=3600, stale-while-revalidate=86400",
    );

    responseHeaders.set(
      "Access-Control-Allow-Origin",
      "*",
    );

    responseHeaders.set(
      "Access-Control-Expose-Headers",
      "Content-Length, Content-Range, Accept-Ranges",
    );

    /* -------------------------------------------------------
       Validate BIN size
    ------------------------------------------------------- */

    if (
      type === "bin" &&
      expectedLength !== undefined
    ) {
      const actualLength = contentLength
        ? Number(contentLength)
        : undefined;

      if (
        actualLength !== undefined &&
        Number.isFinite(actualLength) &&
        actualLength < expectedLength
      ) {
        console.error("BIN TOO SMALL:", {
          targetUrl,
          expectedLength,
          actualLength,
        });

        return NextResponse.json(
          {
            error:
              "BIN file is smaller than expected",
            expectedLength,
            actualLength,
          },
          {
            status: 502,
          },
        );
      }
    }

    /* -------------------------------------------------------
       Stream مستقیم
    ------------------------------------------------------- */

    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(
      "MODEL PROXY ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Model proxy failed",
      },
      {
        status: 502,
      },
    );
  }
}

/* =========================================================
   OPTIONS
========================================================= */

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods":
        "GET, OPTIONS",
      "Access-Control-Allow-Headers":
        "Range, Content-Type",
      "Access-Control-Expose-Headers":
        "Content-Length, Content-Range, Accept-Ranges",
    },
  });
}

