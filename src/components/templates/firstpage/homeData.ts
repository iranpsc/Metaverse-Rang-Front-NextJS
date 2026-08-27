import { cache } from "react";
import { getAllCitizen, getApiBaseUrl } from "@/components/utils/actions";
import { supabase } from "@/components/utils/lib/supabaseClient";
import type { News } from "@/components/templates/firstpage/LastNews";

export type HomeVersionItem = {
  id: number;
  version_title: string;
  description: string;
  starts_at: string;
  title: string;
};

function parseVersion(version: string): number[] {
  return version
    .replace(/v/gi, "")
    .trim()
    .split(".")
    .map(Number);
}

export const getHomeCitizens = cache(async function getHomeCitizens() {
  const response = await getAllCitizen(1);
  return response?.data?.slice(0, 5) ?? [];
});

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

export const getHomeNews = cache(async function getHomeNews(limit = 10) {
  try {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false })
      .limit(limit);

    if (error || !data?.length) return [] as News[];

    return data.slice(0, limit).map((item: any) => ({
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
    })) as News[];
  } catch (error) {
    console.error("[getHomeNews]", error);
    return [] as News[];
  }
});
