import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getAllCitizen, getApiBaseUrl } from "@/components/utils/actions";
import { supabase } from "@/components/utils/lib/supabaseClient";
import { articles as localArticles } from "@/components/utils/articles";
import type { News } from "@/components/templates/firstpage/LastNews";

export type HomeVersionItem = {
  id: number;
  version_title: string;
  description: string;
  starts_at: string;
  title: string;
};

/**
 * فقط فیلدهایی که کارت مقاله‌ی صفحه‌ی اصلی واقعاً استفاده می‌کند.
 * (ستون content که سنگین‌ترین ستون است عمداً نیست.)
 */
export type HomeArticle = {
  id: number | string;
  title: string;
  slug: string;
  date?: string;
  image?: string;
  excerpt?: string;
  description?: string;
  category?: string;
  categorySlug?: string;
  subCategory?: string;
  author?: any;
  stats?: any;
};

function parseVersion(version: string): number[] {
  return version
    .replace(/v/gi, "")
    .trim()
    .split(".")
    .map(Number);
}

/* -------------------------------------------------------------------------- */
/*                         Supabase helpers (server only)                     */
/* -------------------------------------------------------------------------- */

/**
 * آخرین ردیف‌های یک جدول را با ستون‌های مشخص می‌گیرد.
 *
 * اگر یکی از نام ستون‌ها در دیتابیس وجود نداشته باشد Supabase خطا می‌دهد؛
 * در این حالت برای اینکه UI هرگز خالی نشود یک بار با "*" تلاش می‌کنیم.
 * (وقتی مطمئن شدی همه‌ی ستون‌ها درست‌اند می‌شود این fallback را حذف کرد.)
 */
async function selectLatest(
  table: string,
  columns: string,
  limit: number
): Promise<any[]> {
  const lean = await supabase
    .from(table)
    .select(columns)
    .order("date", { ascending: false })
    .limit(limit);

  if (!lean.error) return (lean.data ?? []) as unknown as any[];

  console.warn(
    `[homeData] select("${columns}") on "${table}" failed: ${lean.error.message} → retrying with *`
  );

  const full = await supabase
    .from(table)
    .select("*")
    .order("date", { ascending: false })
    .limit(limit);

  if (full.error) throw full.error;
  return (full.data ?? []) as unknown as any[];
}

const byDateDesc = (a: { date?: string }, b: { date?: string }) =>
  (new Date(b.date || 0).getTime() || 0) -
  (new Date(a.date || 0).getTime() || 0);

/* -------------------------------------------------------------------------- */
/*                                  Citizens                                  */
/* -------------------------------------------------------------------------- */

export const getHomeCitizens = cache(async function getHomeCitizens() {
  const response = await getAllCitizen(1);
  return response?.data?.slice(0, 5) ?? [];
});

/* -------------------------------------------------------------------------- */
/*                                  Tutorials                                 */
/* -------------------------------------------------------------------------- */

export const getHomeTutorials = cache(async function getHomeTutorials() {
  try {
    const apiBaseUrl = await getApiBaseUrl();
    const res = await fetch(`${apiBaseUrl}/api/tutorials?page=1`, {
      next: { revalidate: 300, tags: ["home-tutorials"] },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const apiVideos = Array.isArray(json?.data) ? json.data : [];
    return [...apiVideos]
      .sort((a: any, b: any) =>
        String(b.created_at || "").localeCompare(String(a.created_at || ""))
      )
      .slice(0, 3);
  } catch (error) {
    console.error("[getHomeTutorials]", error);
    return [];
  }
});

/* -------------------------------------------------------------------------- */
/*                                  Versions                                  */
/* -------------------------------------------------------------------------- */

export const getHomeVersions = cache(async function getHomeVersions() {
  try {
    const apiBaseUrl = await getApiBaseUrl();
    const res = await fetch(`${apiBaseUrl}/api/calendar?type=version`, {
      next: { revalidate: 300, tags: ["home-versions"] },
    });
    if (!res.ok) return [] as HomeVersionItem[];
    const json = await res.json();
    const versions: HomeVersionItem[] = json?.data || [];
    return [...versions]
      .sort((a, b) => {
        const va = parseVersion(a.version_title);
        const vb = parseVersion(b.version_title);
        for (let i = 0; i < Math.max(va.length, vb.length); i++) {
          const na = va[i] || 0;
          const nb = vb[i] || 0;
          if (na !== nb) return nb - na;
        }
        return 0;
      })
      .slice(0, 4);
  } catch (error) {
    console.error("[getHomeVersions]", error);
    return [] as HomeVersionItem[];
  }
});

/* -------------------------------------------------------------------------- */
/*                                    News                                    */
/* -------------------------------------------------------------------------- */

const NEWS_COLUMNS =
  "id,title,slug,date,readingTime,image,description,excerpt,category,categorySlug,views,stats,author,tags";

const toNews = (item: any): News => ({
  id: item.id,
  title: item.title,
  slug: item.slug,
  date: item.date,
  readingTime: item.readingTime,
  image: item.image,
  excerpt: item.description || item.excerpt,
  category: item.category,
  categorySlug: item.categorySlug,
  stats: {
    views: item.views ?? item.stats?.views ?? 0,
  },
  author: item.author,
  tags: item.tags,
});

async function fetchNews(limit: number): Promise<News[]> {
  const rows = await selectLatest("news", NEWS_COLUMNS, limit);
  return rows.slice(0, limit).map(toNews);
}

// کش بین درخواست‌ها (۵ دقیقه). اگر fetchNews خطا بدهد چیزی کش نمی‌شود.
const getCachedNews = unstable_cache(fetchNews, ["home-news"], {
  revalidate: 300,
  tags: ["home-news"],
});

export const getHomeNews = cache(async function getHomeNews(limit = 10) {
  try {
    return await getCachedNews(limit);
  } catch (error) {
    console.error("[getHomeNews]", error);
    return [] as News[];
  }
});

/* -------------------------------------------------------------------------- */
/*                                  Articles                                  */
/* -------------------------------------------------------------------------- */

const ARTICLE_COLUMNS =
  "id,title,slug,date,image,excerpt,description,category,categorySlug,subCategory,author,stats";

const toHomeArticle = (d: any): HomeArticle => ({
  id: d.id,
  title: d.title,
  slug: d.slug,
  date: d.date,
  image: d.image,
  excerpt: d.excerpt,
  description: d.description,
  category: d.category,
  categorySlug: d.categorySlug,
  subCategory: d.subCategory,
  author: d.author,
  stats: d.stats || { views: 0, likes: 0, dislikes: 0, comments: 0 },
});

async function fetchArticles(count: number): Promise<HomeArticle[]> {
  const rows = await selectLatest("articles", ARTICLE_COLUMNS, count);
  return rows.map(toHomeArticle);
}

const getCachedArticles = unstable_cache(fetchArticles, ["home-articles"], {
  revalidate: 300,
  tags: ["home-articles"],
});

/**
 * آخرین مقاله‌های صفحه‌ی اصلی (پیش‌فرض ۳ تا).
 * اگر Supabase خالی یا خطا بود، همان fallback محلی قبلی استفاده می‌شود.
 */
export const getHomeArticles = cache(async function getHomeArticles(
  count = 3
): Promise<HomeArticle[]> {
  try {
    const rows = await getCachedArticles(count);
    if (rows.length > 0) return [...rows].sort(byDateDesc).slice(0, count);
  } catch (error) {
    console.error("[getHomeArticles]", error);
  }

  return [...(localArticles as unknown as HomeArticle[])]
    .sort(byDateDesc)
    .slice(0, count);
});
