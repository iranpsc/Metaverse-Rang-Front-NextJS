"use server";

import { cache } from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cookies } from "next/headers";
/* -------------------------------------------------------------------------- */
/*                           API CONFIGURATION                                */
/* -------------------------------------------------------------------------- */

/**
 * فقط دو ENV داریم:
 *
 * Development / Local:
 *
 * NEXT_PUBLIC_API_BASE_URL=https://dev-api.metarang.com
 * NEXT_PUBLIC_ADMIN_API_BASE_URL=https://dev-admin.metarang.com
 *
 * Production:
 *
 * NEXT_PUBLIC_API_BASE_URL=${process.env.NEXT_PUBLIC_API_BASE_URL}
 * NEXT_PUBLIC_ADMIN_API_BASE_URL=https://admin.metarang.com
 *
 * این فایل هیچ تشخیصی بر اساس hostname یا headers انجام نمی‌دهد.
 * محیط توسط ENV مشخص می‌شود.
 */

/**
 * Main API Base URL
 */
export async function getApiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not configured."
    );
  }

  return url.replace(/\/+$/, "");
}

/**
 * Admin API Base URL
 */
/**
 * Retry only transient fetch/network failures.
 * HTTP responses (including 404/5xx) are handled by the caller and are not retried here.
 */
function isRetryableNetworkError(error) {
  const retryableCodes = new Set([
    "ECONNRESET",
    "ETIMEDOUT",
    "UND_ERR_CONNECT_TIMEOUT",
    "UND_ERR_HEADERS_TIMEOUT",
    "UND_ERR_SOCKET",
    "EAI_AGAIN",
    "ECONNREFUSED",
  ]);

  let current = error;

  for (let i = 0; current && i < 5; i++) {
    if (retryableCodes.has(current.code)) return true;
    current = current.cause;
  }

  // Node fetch wraps many transport errors in TypeError("fetch failed").
  return error instanceof TypeError && /fetch failed/i.test(error.message);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Process-wide TTL caches prevent repeated translation requests across pages.
const TRANSLATION_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const TRANSLATION_RETRY_COOLDOWN_MS = 60 * 1000;
const activeLanguagesMemoryCache = { value: null, expiresAt: 0, pending: null };
const dictionaryMemoryCache = new Map();


async function fetchWithRetry(url, options = {}, retries = 2) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fetch(url, options);
    } catch (error) {
      if (attempt >= retries || !isRetryableNetworkError(error)) {
        throw error;
      }

      const delay = 250 * 2 ** attempt;
      console.warn(
        `[fetchWithRetry] Network failure; retry ${attempt + 1}/${retries} in ${delay}ms`,
        { url, error }
      );
      await sleep(delay);
    }
  }
}

export async function getAdminApiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_ADMIN_API_BASE_URL is not configured."
    );
  }

  return url.replace(/\/+$/, "");
}

/**
 * Optional environment information
 */
export async function getCurrentApiEnvironment() {
  const apiBaseUrl = await getApiBaseUrl();
  const adminApiBaseUrl = await getAdminApiBaseUrl();

  return {
    apiBaseUrl,
    adminApiBaseUrl,
    environment:
      apiBaseUrl === `${process.env.NEXT_PUBLIC_API_BASE_URL}`
        ? "production"
        : "development",
  };
}

/* -------------------------------------------------------------------------- */
/*                              URL SANITIZER                                 */
/* -------------------------------------------------------------------------- */

/**
 * Sanitize a single URL path segment.
 */
function sanitizePathSegment(segment) {
  if (typeof segment !== "string") {
    return null;
  }

  const trimmed = segment.trim();

  const isValid = /^[A-Za-z0-9._-]+$/.test(trimmed);

  if (!isValid || trimmed.length === 0) {
    return null;
  }

  return trimmed;
}

/* -------------------------------------------------------------------------- */
/*                              TRANSLATIONS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Return selected language object.
 * React.cache dedupes within a request; revalidate caches across requests.
 */
export const getTranslation = cache(async function getTranslation(lang) {
  const languages = await getLangArray();

  // Never silently serve another language for an unknown or unavailable code.
  return languages.find((item) => item.code === lang) || null;
});

/**
 * Read the checked-in language dictionary as an offline fallback.
 * Only the two bundled default languages are allowed when the language API
 * is unavailable; new language codes must still be confirmed by the API.
 */
const OFFLINE_LANGUAGE_CODES = ["fa", "en"];

async function readLocalLanguageFile(lang) {
  if (!OFFLINE_LANGUAGE_CODES.includes(lang)) {
    return null;
  }

  const filePath = join(
    process.cwd(),
    "public",
    "lang",
    `${lang}.json`
  );
  const raw = await readFile(filePath, "utf8");
  const data = JSON.parse(raw);

  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data) ||
    Object.keys(data).length === 0
  ) {
    throw new Error(`Invalid local language dictionary for "${lang}".`);
  }

  return data;
}

async function getOfflineLanguages() {
  const languageMetadata = {
    fa: {
      id: 1,
      name: "Persian",
      native_name: "فارسی",
      direction: "rtl",
    },
    en: {
      id: 2,
      name: "English",
      native_name: "English",
      direction: "ltr",
    },
  };

  const languages = await Promise.all(
    OFFLINE_LANGUAGE_CODES.map(async (code) => {
      try {
        // Validate that the bundled dictionary exists before exposing its route.
        await readLocalLanguageFile(code);

        return {
          ...languageMetadata[code],
          code,
          icon: `/${code}/api/flag/${code}.svg`,
          offlineFallback: true,
        };
      } catch (error) {
        console.error(`[getOfflineLanguages] Failed to load ${code}:`, error);
        return null;
      }
    })
  );

  return languages.filter(Boolean);
}

/**
 * Return whole active language array.
 * Successful API data remains authoritative. Local fa/en files are used only
 * when the API is unavailable or returns no usable language records.
 */
/**
 * Always resolves to an array. API failures are handled by the last-known-good
 * cache or the bundled fa/en fallback, so callers never need a nullable check.
 *
 * @returns {Promise<Array<{ code: string, [key: string]: any }>>}
 */
export const getLangArray = cache(async function getLangArray() {
  const cached = activeLanguagesMemoryCache;
  if (cached.value && cached.expiresAt > Date.now()) return cached.value;
  if (cached.pending) return cached.pending;

  const pending = (async () => {
    try {
      const adminApiBaseUrl = await getAdminApiBaseUrl();
      const res = await fetch(`${adminApiBaseUrl}/api/translations?active=true`, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(4000),
        next: { revalidate: 86400, tags: ["translations"] },
      });

      if (!res.ok) throw new Error(`Languages request failed: ${res.status} ${res.statusText}`);

      const data = await res.json();
      if (!Array.isArray(data?.data)) {
        throw new Error("Invalid languages response: expected data to be an array.");
      }

      const languages = data.data.filter(
        (item) => item && typeof item.code === "string" && item.code.trim().length > 0
      );
      cached.value = languages;
      cached.expiresAt = Date.now() + TRANSLATION_CACHE_TTL_MS;
      return languages;
    } catch (error) {
      console.warn("[getLangArray] Language API unavailable; using cached data or bundled fa/en dictionaries.", error);

      // Retain the last known-good API response during 429/network failures.
      if (cached.value) {
        cached.expiresAt = Date.now() + TRANSLATION_RETRY_COOLDOWN_MS;
        return cached.value;
      }

      const fallback = await getOfflineLanguages();
      cached.value = fallback;
      cached.expiresAt = Date.now() + TRANSLATION_RETRY_COOLDOWN_MS;
      return fallback;
    } finally {
      cached.pending = null;
    }
  })();

  cached.pending = pending;
  return pending;
});

/* -------------------------------------------------------------------------- */
/*                               MAIN FILE                                    */
/* -------------------------------------------------------------------------- */

/**
 * Return main language JSON file
 */
export const getMainFile = cache(async function getMainFile(langData) {
  const langCode = langData?.code || "unknown";
  const cacheKey = `${langCode}:${langData?.file_url || "local"}`;
  const cached = dictionaryMemoryCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) return cached.value;
  if (cached?.pending) return cached.pending;

  const entry = cached || { value: null, expiresAt: 0, pending: null };
  dictionaryMemoryCache.set(cacheKey, entry);

  entry.pending = (async () => {
    try {
      let data;
      if (langData?.offlineFallback) {
        data = await readLocalLanguageFile(langCode);
      } else {
        if (!langData?.file_url) throw new Error("No file_url provided");
        const res = await fetch(langData.file_url, {
          signal: AbortSignal.timeout(8000),
          next: { revalidate: 86400, tags: [`main-file-${langCode}`] },
        });
        if (!res.ok) throw new Error(`Fetch main file failed: ${res.status} - ${langData.file_url}`);
        data = await res.json();
        if (!data || typeof data !== "object" || Array.isArray(data)) {
          throw new Error("Invalid translation file: expected a flat dictionary");
        }
      }

      entry.value = data;
      entry.expiresAt = Date.now() + TRANSLATION_CACHE_TTL_MS;
      return data;
    } catch (error) {
      // Use the last known-good dictionary during temporary upstream failures.
      if (entry.value) {
        entry.expiresAt = Date.now() + TRANSLATION_RETRY_COOLDOWN_MS;
        console.warn(`[getMainFile] Serving cached ${langCode} dictionary after fetch failure.`, error);
        return entry.value;
      }

      if (OFFLINE_LANGUAGE_CODES.includes(langCode)) {
        try {
          const localData = await readLocalLanguageFile(langCode);
          entry.value = localData;
          entry.expiresAt = Date.now() + TRANSLATION_RETRY_COOLDOWN_MS;
          console.warn(`[getMainFile] Using bundled ${langCode} dictionary after remote fetch failed.`);
          return localData;
        } catch (fallbackError) {
          console.error(`[getMainFile] Local fallback failed for ${langCode}:`, fallbackError);
        }
      }

      // Negative-cache unavailable non-default dictionaries briefly so a broken
      // language file (for example zh) is not requested again for every page.
      entry.expiresAt = Date.now() + TRANSLATION_RETRY_COOLDOWN_MS;
      console.error("[getMainFile] Error fetching translation dictionary:", error, { langData });
      return null;
    } finally {
      entry.pending = null;
    }
  })();

  return entry.pending;
});


/**
 * Resolve the dictionary needed by page metadata without adding avoidable
 * network latency for the bundled default languages. Additional active
 * languages continue to use the authoritative Admin API metadata and file.
 */
export async function getMetadataDictionary(lang) {
  if (OFFLINE_LANGUAGE_CODES.includes(lang)) {
    return readLocalLanguageFile(lang);
  }

  const langData = await getTranslation(lang);
  return getMainFile(langData);
}

/* -------------------------------------------------------------------------- */
/*                              CITIZENS                                      */
/* -------------------------------------------------------------------------- */

/**
 * Get all citizens
 */
export async function getAllCitizen(_page) {
  try {
    const apiBaseUrl =
      await getApiBaseUrl();

    const safePage = encodeURIComponent(
      String(_page ?? 1).trim()
    );

    const res = await fetch(
      `${apiBaseUrl}/api/users?page=${safePage}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 60,
          tags: ["citizens"],
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `getAllCitizen failed: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error(
      "[getAllCitizen] Error:",
      error
    );

    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                                FOOTER                                      */
/* -------------------------------------------------------------------------- */

export async function getFooterData(params) {
  try {
    const langObj =
      await getTranslation(params?.lang);

    if (
      !langObj ||
      (!langObj.file_url && !OFFLINE_LANGUAGE_CODES.includes(langObj.code))
    ) {
      return {};
    }

    // Reuse cached main translation file instead of a bare uncached fetch.
    const resJson = await getMainFile(langObj);

    if (
      !resJson ||
      typeof resJson !== "object" ||
      Array.isArray(resJson)
    ) {
      return {};
    }

    return resJson;
  } catch (error) {
    console.error(
      "[getFooterData] Error:",
      error
    );

    return {};
  }
}

/* -------------------------------------------------------------------------- */
/*                                LEVELS                                      */
/* -------------------------------------------------------------------------- */

/**
 * Get all levels
 */
export async function getAllLevels() {
  try {
    const apiBaseUrl = await getApiBaseUrl();

    const res = await fetch(`${apiBaseUrl}/api/levels`, {
      headers: {
        "Content-Type": "application/json",
      },
      // Cache the public levels catalogue for one week.
      next: {
        revalidate: 604800,
        tags: ["levels"],
      },
    });

    if (!res.ok) {
      throw new Error(`getAllLevels failed: ${res.status} ${res.statusText}`);
    }

    const temp = await res.json();

    return temp?.data || [];
  } catch (error) {
    console.error("[getAllLevels] Error:", error);

    return [];
  }
}

/**
 * Get level tabs
 */
export async function getLevelTabs(params, levelId) {
  if (!levelId || !params?.tabs) {
    return null;
  }

  const safeLevelId = encodeURIComponent(String(levelId).trim());
  const safeTabs = encodeURIComponent(String(params.tabs).trim());

  try {
    const apiBaseUrl = await getApiBaseUrl();

    const res = await fetchWithRetry(
      `${apiBaseUrl}/api/levels/${safeLevelId}/${safeTabs}`,
      {
        headers: { Accept: "application/json" },
        next: {
          revalidate: 300,
          tags: [
            `level-${safeLevelId}`,
            `level-${safeLevelId}-${safeTabs}`,
          ],
        },
      }
    );

    if (res.status === 404) return null;

    if (!res.ok) {
      throw new Error(
        `getLevelTabs failed: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("[getLevelTabs] Error:", error);
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                              CALENDAR                                      */
/* -------------------------------------------------------------------------- */

/**
 * Get all calendar versions
 */
export async function getAllVersions() {
  try {
    const apiBaseUrl =
      await getApiBaseUrl();

    const res = await fetch(
      `${apiBaseUrl}/api/calendar?type=version`,
      {
        headers: {
          "Content-Type":
            "application/json",
          "Cache-Control":
            "public, max-age=3600",
        },
      }
    );

    if (!res.ok) {
      console.error(
        "[getAllVersions] Error:",
        res.statusText
      );

      return [];
    }

    const temp =
      await res.json();

    return temp?.data || [];
  } catch (error) {
    console.error(
      "[getAllVersions] Error:",
      error
    );

    return [];
  }
}

/* -------------------------------------------------------------------------- */
/*                           SINGLE LEVEL                                     */
/* -------------------------------------------------------------------------- */

export async function getSingleLevel(levelId) {
  if (!levelId) {
    return null;
  }

  const safeLevelId = encodeURIComponent(String(levelId).trim());

  try {
    const apiBaseUrl = await getApiBaseUrl();

    const res = await fetchWithRetry(
      `${apiBaseUrl}/api/levels/${safeLevelId}`,
      {
        headers: { Accept: "application/json" },
        next: {
          revalidate: 300,
          tags: [`level-${safeLevelId}`],
        },
      }
    );

    if (res.status === 404) return null;

    if (!res.ok) {
      throw new Error(
        `getSingleLevel failed: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("[getSingleLevel] Error:", error);
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                              USER DATA                                     */
/* -------------------------------------------------------------------------- */

export const getUserData = cache(async function getUserData(
  _userId,
  timeoutMs = 0
) {
  const sanitizedId =
    sanitizePathSegment(_userId);

  if (!sanitizedId) {
    return {
      props: {
        error:
          "خطا در دریافت داده‌ها",
      },
    };
  }

  const id =
    sanitizedId.toLowerCase();

  try {
    const apiBaseUrl =
      await getApiBaseUrl();

    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: [`citizen-${id}`],
      },
      ...(Number.isFinite(timeoutMs) && timeoutMs > 0
        ? { signal: AbortSignal.timeout(timeoutMs) }
        : {}),
    };

    const res = await fetch(
      `${apiBaseUrl}/api/citizen/${encodeURIComponent(id)}`,
      requestOptions
    );

    if (!res.ok) {
      throw new Error(
        `getUserData failed: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (err) {
    console.error(
      "[getUserData] Error:",
      err
    );

    return {
      props: {
        error:
          "خطا در دریافت داده‌ها",
      },
    };
  }
});

/* -------------------------------------------------------------------------- */
/*                              REFERRALS                                     */
/* -------------------------------------------------------------------------- */

export async function getAllReferral(
  _userId,
  _searchParam = ""
) {
  const safeUserId =
    sanitizePathSegment(_userId);

  if (!safeUserId) {
    return {
      props: {
        error:
          "خطا در دریافت داده‌ها",
      },
    };
  }

  const safeSearch =
    encodeURIComponent(
      _searchParam ?? ""
    );

  try {
    const apiBaseUrl =
      await getApiBaseUrl();

    const res = await fetch(
      `${apiBaseUrl}/api/citizen/${encodeURIComponent(
        safeUserId
      )}/referrals?search=${safeSearch}`,
      {
        headers: {
          "Content-Type":
            "application/json",
          "Cache-Control":
            "public, max-age=0",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `getAllReferral failed: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error(
      "[getAllReferral] Error:",
      error
    );

    return {
      props: {
        error:
          "خطا در دریافت داده‌ها",
      },
    };
  }
}

export async function getChartReferral(
  _userId,
  _searchParam = ""
) {
  const safeUserId =
    sanitizePathSegment(_userId);

  if (!safeUserId) {
    return {
      props: {
        error:
          "خطا در دریافت داده‌ها",
      },
    };
  }

  const safeRange =
    encodeURIComponent(
      _searchParam ?? ""
    );

  try {
    const apiBaseUrl =
      await getApiBaseUrl();

    const res = await fetch(
      `${apiBaseUrl}/api/citizen/${encodeURIComponent(
        safeUserId
      )}/referrals/chart?range=${safeRange}`,
      {
        headers: {
          "Content-Type":
            "application/json",
          "Cache-Control":
            "public, max-age=0",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `getChartReferral failed: ${res.status} ${res.statusText}`
      );
    }

    const temp =
      await res.json();

    return temp?.data;
  } catch (error) {
    console.error(
      "[getChartReferral] Error:",
      error
    );

    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                              TUTORIALS                                     */
/* -------------------------------------------------------------------------- */

/**
 * Get all tutorial categories
 */
export async function getAllCategories() {
  try {
    const apiBaseUrl =
      await getApiBaseUrl();

    const res = await fetch(
      `${apiBaseUrl}/api/tutorials/categories`,
      {
        headers: {
          "Content-Type":
            "application/json",
          "Cache-Control":
            "public, max-age=0",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `getAllCategories failed: ${res.status} ${res.statusText}`
      );
    }

    const temp =
      await res.json();

    return temp?.data || [];
  } catch (error) {
    console.error(
      "[getAllCategories] Error:",
      error
    );

    return [];
  }
}

/**
 * Get all category videos
 */
export async function getAllCategoryVideos(
  _page
) {
  try {
    const apiBaseUrl =
      await getApiBaseUrl();

    const safePage =
      encodeURIComponent(
        String(_page ?? 1).trim()
      );

    const res = await fetch(
      `${apiBaseUrl}/api/tutorials?page=${safePage}`,
      {
        headers: {
          "Content-Type":
            "application/json",
          "Cache-Control":
            "public, max-age=0",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `getAllCategoryVideos failed: ${res.status} ${res.statusText}`
      );
    }

    const temp =
      await res.json();

    return temp?.data || [];
  } catch (err) {
    console.error(
      "[getAllCategoryVideos] Error:",
      err
    );

    return [];
  }
}

/**
 * Get single education category
 */
export async function getEducationSingleCategory(
  _category
) {
  const sanitizedCategory =
    sanitizePathSegment(_category);

  if (!sanitizedCategory) {
    return null;
  }

  try {
    const apiBaseUrl =
      await getApiBaseUrl();

    const res = await fetch(
      `${apiBaseUrl}/api/tutorials/categories/${encodeURIComponent(
        sanitizedCategory
      )}`,
      {
        headers: {
          "Content-Type":
            "application/json",
          "Cache-Control":
            "public, max-age=0",
        },
      }
    );

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(
        `${res.status} - ${res.statusText}`
      );
    }

    const temp =
      await res.json();

    return temp?.data;
  } catch (error) {
    console.error(
      "[getEducationSingleCategory] Error:",
      error
    );

    return null;
  }
}

/**
 * Get subcategory data
 */
export async function getSubcategoryData(
  _category,
  _subcategory
) {
  const safeCategory =
    sanitizePathSegment(_category);

  const safeSubcategory =
    sanitizePathSegment(
      _subcategory
    );

  if (
    !safeCategory ||
    !safeSubcategory
  ) {
    throw new Error(
      "Invalid category or subcategory"
    );
  }

  try {
    const apiBaseUrl =
      await getApiBaseUrl();

    const res = await fetch(
      `${apiBaseUrl}/api/tutorials/categories/${encodeURIComponent(
        safeCategory
      )}/${encodeURIComponent(
        safeSubcategory
      )}`,
      {
        headers: {
          "Content-Type":
            "application/json",
          "Cache-Control":
            "public, max-age=0",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `getSubcategoryData failed: ${res.status} ${res.statusText}`
      );
    }

    const temp =
      await res.json();

    return temp?.data;
  } catch (error) {
    console.error(
      "[getSubcategoryData] Error:",
      error
    );

    return null;
  }
}

/**
 * Get single video data
 */
export async function getSingleVideoData(_videoSlug) {
  try {
    const safeVideoSlug = sanitizePathSegment(_videoSlug);

    if (!safeVideoSlug) {
      throw new Error("Invalid video slug");
    }

    const apiBaseUrl = await getApiBaseUrl();

    // ---------------------------------------------
    // خواندن توکن کاربر از کوکی سمت سرور
    // ---------------------------------------------
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("auth")?.value;
// console.log("🍪 [SERVER] authCookie raw:", authCookie);
    let token = null;
    if (authCookie) {
      try {
        const params = new URLSearchParams(authCookie);
        token = params.get("token");
      } catch {
        if (authCookie.startsWith("token=")) {
          token = authCookie.split("&")[0].replace(/^token=/, "");
        }
      }
    }
// console.log("🔑 [SERVER] extracted token:", token ? "FOUND" : "NOT FOUND");
    const res = await fetch(
      `${apiBaseUrl}/api/tutorials/${encodeURIComponent(safeVideoSlug)}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store", // <-- مهم‌ترین تغییر: دیگه کش نمی‌شه
      }
    );

    if (!res.ok) {
      throw new Error(
        `getSingleVideoData failed: ${res.status} ${res.statusText}`
      );
    }

    const temp = await res.json();
// console.log("📦 [SERVER] likes_count:", temp?.data?.likes_count);
// console.log("📦 [SERVER] user_interaction:", temp?.data?.user_interaction);
    return temp?.data;
  } catch (err) {
    console.error("[getSingleVideoData] Error:", err);

    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                            VIDEO COMMENTS                                  */
/* -------------------------------------------------------------------------- */

export async function getVideoComments(
  _videoId
) {
  try {
    const safeVideoId =
      sanitizePathSegment(
        _videoId
      );

    if (!safeVideoId) {
      throw new Error(
        "Invalid video id"
      );
    }

    const apiBaseUrl =
      await getApiBaseUrl();

    const res = await fetch(
      `${apiBaseUrl}/api/tutorials/${encodeURIComponent(
        safeVideoId
      )}/comments?page=1`,
      {
        next: {
          revalidate: 30,
          tags: [`video-comments-${safeVideoId}`],
        },
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `getVideoComments failed: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (err) {
    console.error(
      "[getVideoComments] Error:",
      err
    );

    return null;
  }
}