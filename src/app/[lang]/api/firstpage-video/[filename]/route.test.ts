import { afterEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";
import { GET } from "./route";

const makeRequest = (range?: string) =>
  new Request("https://example.test/fa/api/firstpage-video/metaverse-rang.mp4", {
    headers: range ? { range } : undefined,
  }) as NextRequest;

const makeContext = (filename: string) => ({
  params: Promise.resolve({ filename }),
});

describe("GET /api/firstpage-video/[filename]", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects filenames outside the allowlist without calling S3", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET(makeRequest(), makeContext("private.mp4"));

    expect(response.status).toBe(404);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("streams a successful video response and forwards cache metadata", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("video-content", {
        status: 200,
        headers: {
          "content-type": "video/mp4",
          "content-length": "13",
          "accept-ranges": "bytes",
          etag: '"video-tag"',
        },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET(makeRequest(), makeContext("metaverse-rang.mp4"));

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("video/mp4");
    expect(response.headers.get("Accept-Ranges")).toBe("bytes");
    expect(response.headers.get("ETag")).toBe('"video-tag"');
    expect(response.headers.get("Cache-Control")).toContain("max-age=2592000");
    expect(await response.text()).toBe("video-content");
  });

  it("forwards byte ranges and preserves a partial 206 response", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("partial-video", {
        status: 206,
        headers: {
          "content-type": "video/mp4",
          "content-range": "bytes 0-12/100",
          "accept-ranges": "bytes",
        },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET(
      makeRequest("bytes=0-12"),
      makeContext("metaverse-rang.mp4"),
    );

    expect(fetchMock).toHaveBeenCalledWith(
      "https://s3.metarang.com/metarang/firstpage/metaverse-rang.mp4",
      expect.objectContaining({
        headers: expect.any(Headers),
        next: expect.objectContaining({ revalidate: 2592000 }),
      }),
    );
    const requestHeaders = fetchMock.mock.calls[0][1].headers as Headers;
    expect(requestHeaders.get("Range")).toBe("bytes=0-12");
    expect(response.status).toBe(206);
    expect(response.headers.get("Content-Range")).toBe("bytes 0-12/100");
    expect(response.headers.get("Vary")).toBe("Range");
  });

  it("returns the upstream HTTP failure status without caching the failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("unavailable", { status: 503 })));

    const response = await GET(makeRequest(), makeContext("metaverse-rang.mp4"));

    expect(response.status).toBe(503);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(await response.text()).toBe("Video unavailable");
  });

  it("returns 502 when the upstream request throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("connection reset")));

    const response = await GET(makeRequest(), makeContext("mob2.mp4"));

    expect(response.status).toBe(502);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });
});
