/**
 * E2E-only outbound API guard.
 *
 * Application APIs must use the local mock server. The active-language metadata
 * endpoint on the configured Admin API and the dictionary URLs it returns are
 * the only permitted external API/data requests. Non-translation APIs stay blocked.
 */
const originalFetch = globalThis.fetch;
const localHosts = new Set(["127.0.0.1", "localhost", "::1"]);
const allowedTranslationFiles = new Set();
const translationAdminOrigin = new URL(
  process.env.TRANSLATION_ADMIN_API_BASE_URL ||
    process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
    "https://admin.metarang.com"
).origin;

function isTranslationMetadataUrl(url) {
  return (
    url.origin === translationAdminOrigin &&
    url.pathname === "/api/translations" &&
    url.searchParams.get("active") === "true"
  );
}

async function rememberTranslationFiles(response) {
  if (!response.ok) return;
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

    if (isTranslationMetadataUrl(requestUrl)) {
      await rememberTranslationFiles(response);
    }

    return response;
  }

  // Permit only the active-language endpoint from the configured Admin API.
  if (isTranslationMetadataUrl(requestUrl)) {
    const response = await originalFetch.call(this, input, init);
    await rememberTranslationFiles(response);
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
