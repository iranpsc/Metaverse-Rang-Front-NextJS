/**
 * Client-safe news fallback loader.
 * Reads from /public/data/news-fallback.json so the ~74KB JSON is NOT
 * bundled into client JS chunks (unlike a static `import … from news.json`).
 */
let cached: any[] | null = null;
let inflight: Promise<any[]> | null = null;

export async function loadNewsFallback(): Promise<any[]> {
  if (cached) return cached;
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const res = await fetch("/data/news-fallback.json", {
        // Browser HTTP cache is fine; this file is immutable content.
        cache: "force-cache",
      });
      if (!res.ok) {
        cached = [];
        return cached;
      }
      const data = await res.json();
      cached = Array.isArray(data) ? data : [];
      return cached;
    } catch {
      cached = [];
      return cached;
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}
