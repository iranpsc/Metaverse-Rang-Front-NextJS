/**
 * E2E-only outbound API guard.
 *
 * Application API calls must use the local mock server. The only permitted
 * external fetches are exact translation dictionary URLs returned by the
 * local /api/translations mock proxy.
 */
const originalFetch = globalThis.fetch;
const localHosts = new Set(["127.0.0.1", "localhost", "::1"]);
const allowedTranslationFiles = new Set();

function isLocalUrl(url) {
  return localHosts.has(url.hostname);
}

function isApiUrl(url) {
  return (
    /^\/(?:api|rest\/v1|graphql|auth|oauth|sanctum|v\d+\/api)(?:\/|$)/i.test(url.pathname) ||
    /(^|\.)(?:api|admin)\.[a-z0-9.-]+$/i.test(url.hostname) ||
    url.hostname.endsWith(".supabase.co")
  );
}

globalThis.fetch = async function guardedFetch(input, init) {
  const requestUrl =
    input instanceof URL
      ? input
      : new URL(typeof input === "string" ? input : input.url);

  if (isLocalUrl(requestUrl)) {
    const response = await originalFetch.call(this, input, init);

    if (
      requestUrl.pathname === "/api/translations" &&
      requestUrl.searchParams.get("active") === "true" &&
      response.ok
    ) {
      try {
        const payload = await response.clone().json();
        for (const language of payload?.data || []) {
          if (typeof language?.file_url === "string") {
            try {
              allowedTranslationFiles.add(new URL(language.file_url).href);
            } catch {
              // Invalid dictionary URLs are reported by the translation crawl.
            }
          }
        }
      } catch {
        // The normal translation consumer reports malformed metadata.
      }
    }

    return response;
  }

  if (allowedTranslationFiles.has(requestUrl.href)) {
    return originalFetch.call(this, input, init);
  }

  if (isApiUrl(requestUrl)) {
    throw new Error(
      `Blocked outbound API request in E2E. Only the local mock API and translation dictionaries are allowed: ${requestUrl.href}`
    );
  }

  return originalFetch.call(this, input, init);
};
