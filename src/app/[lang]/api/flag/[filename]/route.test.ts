import { afterEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";
import { GET } from "./route";

const makeRequest = () =>
  new Request("https://example.test/fa/api/flag/fa.svg") as NextRequest;

const makeContext = (filename: string) => ({
  params: Promise.resolve({ lang: "fa", filename }),
});

describe("GET /api/flag/[filename]", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects filenames outside the allowlist without calling upstream", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET(makeRequest(), makeContext("../secret.svg"));

    expect(response.status).toBe(404);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("normalizes the filename and returns the upstream SVG with cache headers", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("<svg />", {
        status: 200,
        headers: { "content-type": "image/svg+xml" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET(makeRequest(), makeContext("FA.SVG"));

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("image/svg+xml");
    expect(response.headers.get("Cache-Control")).toContain("max-age=172800");
    expect(await response.text()).toBe("<svg />");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://dev-admin.metarang.com/assets/images/flags/fa.svg",
      expect.objectContaining({
        next: { revalidate: 172800, tags: ["admin-flags"] },
      }),
    );
  });

  it("propagates upstream HTTP errors without caching the failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("missing", { status: 404 })));

    const response = await GET(makeRequest(), makeContext("fa.svg"));

    expect(response.status).toBe(404);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(await response.text()).toBe("Flag unavailable");
  });

  it("returns 502 when the upstream request throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    const response = await GET(makeRequest(), makeContext("fa.svg"));

    expect(response.status).toBe(502);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });
});
