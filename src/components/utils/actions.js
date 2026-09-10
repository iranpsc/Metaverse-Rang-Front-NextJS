
"use server";

import { cache } from "react";
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
  try {
    const adminApiBaseUrl =
      await getAdminApiBaseUrl();

    const res = await fetch(
      `${adminApiBaseUrl}/api/translations`,
      {
        next: {
          revalidate: 3600,
          tags: ["translations"],
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `Translation request failed: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();

    let temp = data?.data?.find(
      (item) => item.code === lang
    );

    if (!temp) {
      console.warn(
        `[getTranslation] Lang "${lang}" not found → fallback to "fa"`
      );

      temp =
        data?.data?.find(
          (item) => item.code === "fa"
        ) ||
        data?.data?.[0];
    }

    return temp;
  } catch (err) {
    console.error(
      "[getTranslation] Error:",
      err
    );

    return {
      code: "fa",
      file_url: "https://rgb.irpsc.com/lang/fa.json",
      direction: "rtl",
    };
  }
});

/**
 * Return whole language array
 */
export const getLangArray = cache(async function getLangArray() {
  try {
    const adminApiBaseUrl =
      await getAdminApiBaseUrl();

    const res = await fetch(
      `${adminApiBaseUrl}/api/translations`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 3600,
          tags: ["translations"],
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `Languages request failed: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();

    return data?.data || [];
  } catch (error) {
    console.error(
      "[getLangArray] Error:",
      error
    );

    return [];
  }
});

/* -------------------------------------------------------------------------- */
/*                               MAIN FILE                                    */
/* -------------------------------------------------------------------------- */

/**
 * Return main language JSON file
 */
export const getMainFile = cache(async function getMainFile(langData) {
  try {
    if (!langData?.file_url) {
      throw new Error("No file_url provided");
    }

    const res = await fetch(langData.file_url, {
      next: {
        revalidate: 3600,
        tags: [
          `main-file-${langData.code || "unknown"}`
        ],
      },
    });

    if (!res.ok) {
      throw new Error(
        `Fetch main file failed: ${res.status} - ${langData.file_url}`
      );
    }

    const data = await res.json();

    if (
      !data ||
      typeof data !== "object" ||
      Array.isArray(data)
    ) {
      throw new Error(
        "Invalid translation file: expected a flat dictionary"
      );
    }

    return data;
  } catch (error) {
    console.error(
      "Error fetching mainData:",
      error,
      { langData }
    );

    return null;
  }
});

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

    if (!langObj?.file_url) {
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
      // ❌ قبلاً اینجا "Cache-Control" توی headers بود که فقط یه هدر
      // HTTP معمولیه و رفتار کش Next.js رو کنترل نمی‌کنه. این‌جا آپشن
      // واقعی Next.js برای کش هست — دقیقاً معادل همون max-age=3600 که
      // می‌خواستید، ولی این‌بار واقعاً روی fetch cache خود Next اثر می‌ذاره:
      next: {
        revalidate: 3600, // هر ۱ ساعت یک‌بار داده رو دوباره می‌گیره
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
export async function getLevelTabs(
  params,
  levelId
) {
  if (!levelId || !params?.tabs) {
    return null;
  }

  const safeLevelId =
    encodeURIComponent(
      String(levelId).trim()
    );

  const safeTabs =
    encodeURIComponent(
      String(params.tabs).trim()
    );

  try {
    const apiBaseUrl =
      await getApiBaseUrl();

    const res = await fetch(
      `${apiBaseUrl}/api/levels/${safeLevelId}/${safeTabs}`,
      {
        headers: {
          "Content-Type":
            "application/json",
          "Cache-Control":
            "public, max-age=3600",
        },
      }
    );

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(
        `getLevelTabs failed: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error(
      "[getLevelTabs] Error:",
      error
    );

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

export async function getSingleLevel(
  levelId
) {
  if (!levelId) {
    return null;
  }

  const safeLevelId =
    encodeURIComponent(
      String(levelId).trim()
    );

  try {
    const apiBaseUrl =
      await getApiBaseUrl();

    const res = await fetch(
      `${apiBaseUrl}/api/levels/${safeLevelId}`,
      {
        headers: {
          "Content-Type":
            "application/json",
          "Cache-Control":
            "no-store",
        },
      }
    );

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(
        `getSingleLevel failed: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error(
      "[getSingleLevel] Error:",
      error
    );

    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                              USER DATA                                     */
/* -------------------------------------------------------------------------- */

export async function getUserData(
  _userId
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

    const res = await fetch(
      `${apiBaseUrl}/api/citizen/${encodeURIComponent(id)}`,
      {
        headers: {
          "Content-Type":
            "application/json",
        },
        next: {
          revalidate: 60,
          tags: [`citizen-${id}`],
        },
      }
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
}

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

