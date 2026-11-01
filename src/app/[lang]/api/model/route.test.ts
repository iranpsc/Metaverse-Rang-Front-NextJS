import { afterEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";
import { GET, OPTIONS } from "./route";

const BASE = "https://api.metarang.com";
const makeRequest = (query: string, range?: string) =>
  new Request(`https://example.test/fa/api/model?${query}`, {
    headers: range ? { range } : undefined,
  }) as NextRequest;

describe("GET /api/model", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("returns 400 for an unsupported model type", async () => {
    const response = await GET(makeRequest("type=fbx&url=" + encodeURIComponent(BASE + "/model.fbx")));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ error: "Invalid model type" });
  });

  it("returns 400 when the target URL is missing", async () => {
    const response = await GET(makeRequest("type=bin"));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ error: "Missing url parameter" });
  });

  it("blocks untrusted target hosts", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const response = await GET(makeRequest("type=bin&url=" + encodeURIComponent("https://attacker.example/file.bin")));
    expect(response.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("blocks untrusted BIN URLs even when the GLTF URL is trusted", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const query = new URLSearchParams({ type: "gltf", url: BASE + "/model.gltf", bin: "https://attacker.example/model.bin" }).toString();
    const response = await GET(makeRequest(query));
    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toMatchObject({ error: "BIN URL host is not allowed" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects invalid expectedLength values", async () => {
    const query = new URLSearchParams({ type: "bin", url: BASE + "/model.bin", expectedLength: "-1" }).toString();
    const response = await GET(makeRequest(query));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ error: "Invalid expectedLength" });
  });

  it("rewrites the first GLTF buffer and resolves relative image URIs", async () => {
    const gltf = {
      buffers: [{ uri: "model.bin", byteLength: 10 }, { uri: "other.bin", byteLength: 5 }],
      images: [{ uri: "textures/albedo.png" }, { uri: "data:image/png;base64,AAAA" }, {}],
    };
    const fetchMock = vi.fn().mockResolvedValue(Response.json(gltf));
    vi.stubGlobal("fetch", fetchMock);
    const query = new URLSearchParams({ type: "gltf", url: BASE + "/models/scene.gltf", bin: "https://api.metarang.com/assets/scene.bin" }).toString();

    const response = await GET(makeRequest(query));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("model/gltf+json");
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(body.buffers[0].uri).toBe("https://api.metarang.com/assets/scene.bin");
    expect(body.buffers[1].uri).toBe("other.bin");
    expect(body.images[0].uri).toBe(BASE + "/models/textures/albedo.png");
    expect(body.images[1].uri).toBe("data:image/png;base64,AAAA");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("streams a partial BIN response and forwards the requested byte range", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("partial", {
      status: 206,
      headers: { "content-type": "application/octet-stream", "content-length": "7", "content-range": "bytes 0-6/20", "accept-ranges": "bytes" },
    }));
    vi.stubGlobal("fetch", fetchMock);
    const query = new URLSearchParams({ type: "bin", url: BASE + "/model.bin" }).toString();

    const response = await GET(makeRequest(query, "bytes=0-6"));
    const passedHeaders = new Headers(fetchMock.mock.calls[0][1].headers);

    expect(passedHeaders.get("Range")).toBe("bytes=0-6");
    expect(response.status).toBe(206);
    expect(response.headers.get("Content-Range")).toBe("bytes 0-6/20");
    expect(response.headers.get("Access-Control-Expose-Headers")).toContain("Content-Range");
    expect(await response.text()).toBe("partial");
  });

  it("rejects a BIN response smaller than expected", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("tiny", { headers: { "content-length": "4" } })));
    const query = new URLSearchParams({ type: "bin", url: BASE + "/model.bin", expectedLength: "10" }).toString();

    const response = await GET(makeRequest(query));
    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toMatchObject({ error: "BIN file is smaller than expected", expectedLength: 10, actualLength: 4 });
  });

  it("returns 502 after upstream fetch failures", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("upstream offline")));
    const query = new URLSearchParams({ type: "image", url: BASE + "/texture.png" }).toString();

    const response = await GET(makeRequest(query));
    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toMatchObject({ error: "upstream offline" });
  });
});

describe("OPTIONS /api/model", () => {
  it("returns the CORS preflight headers", async () => {
    const response = await OPTIONS();
    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe("GET, OPTIONS");
    expect(response.headers.get("Access-Control-Allow-Headers")).toBe("Range, Content-Type");
  });
});
