"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import SectionInputSearch from "@/components/shared/SectionInputSearch";
import { ItemsSearch } from "@/components/Search/ItemsSearch";
import { useCookies } from "react-cookie";

// سطوحی که داده‌شان از Supabase می‌آید: { searchLevel: نام جدول }
const SUPABASE_TABLES: Record<string, string> = {
  articles: "articles",
  news: "news",
};

export default function SearchComponent({
  searchLevel = "citizen",
  params,
  mainData,
  fullWidth = false,
}: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<any[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";

  // دیتای Supabase (مقالات یا اخبار، بسته به searchLevel)
  const [supabaseData, setSupabaseData] = useState<any[]>([]);

  // دریافت داده از Supabase فقط برای سطح‌های articles و news
  useEffect(() => {
    let cancelled = false;

    const table = SUPABASE_TABLES[searchLevel];

    // با عوض شدن سطح، داده‌ی قبلی پاک شود
    setSupabaseData([]);

    if (!table) return;

    const fetchFromSupabase = async () => {
      try {
        // کلاینت Supabase فقط در صورت نیاز بارگذاری می‌شود.
        const { supabase } = await import("@/utils/lib/supabaseClient");

        const { data, error } = await supabase
          .from(table)
          .select("*")
          .order("date", { ascending: false });

        if (cancelled) return;

        if (error) {
          console.error(`Error fetching ${table}:`, error);
          setSupabaseData([]);
          return;
        }

        setSupabaseData(Array.isArray(data) ? data : []);
      } catch (error) {
        if (!cancelled) {
          console.error(`Error loading ${table} from Supabase:`, error);
          setSupabaseData([]);
        }
      }
    };

    fetchFromSupabase();

    return () => {
      cancelled = true;
    };
  }, [searchLevel]);

  // جستجوی مقالات، اخبار، شهروندان و آموزش‌ها
  useEffect(() => {
    const term = searchTerm.trim();

    if (term.length < 3) {
      setSearchData((previous) => (previous.length > 0 ? [] : previous));
      setLoadingSearch(false);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoadingSearch(true);

      try {
        // =====================================
        // Articles & News: جستجو در داده‌های Supabase
        // =====================================
        if (searchLevel === "articles" || searchLevel === "news") {
          const normalizedTerm = term.toLocaleLowerCase();

          const filtered = supabaseData.filter((item) =>
            String(item?.title ?? "")
              .toLocaleLowerCase()
              .includes(normalizedTerm)
          );

          if (!cancelled) {
            setSearchData(filtered);
          }

          return;
        }

        // =====================================
        // Citizen: جستجوی شهروندان
        // =====================================
        if (searchLevel === "citizen") {
          const formData = new FormData();
          formData.append("searchTerm", term);

          const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search/users`;

          const response = await axios.post(url, formData, {
            timeout: 15000,
          });

          if (!cancelled) {
            setSearchData(
              Array.isArray(response.data?.data) ? response.data.data : []
            );
          }

          return;
        }

        // =====================================
        // Education: جستجوی آموزش‌ها با JSON
        // =====================================
        if (searchLevel === "education") {
          const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tutorials/search`;

          const response = await axios.post(
            url,
            { searchTerm: term },
            {
              headers: { "Content-Type": "application/json" },
              timeout: 15000,
            }
          );

          if (!cancelled) {
            setSearchData(
              Array.isArray(response.data?.data) ? response.data.data : []
            );
          }

          return;
        }

        if (!cancelled) {
          setSearchData([]);
        }
      } catch (error: any) {
        if (!cancelled) {
          console.error("Search error:", error);
          console.error("Search response:", error?.response?.data);
          setSearchData([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingSearch(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searchTerm, searchLevel, supabaseData]);

  const removeSearch = () => {
    setSearchData([]);
    setSearchTerm("");
    setLoadingSearch(false);
  };

  const shouldShowBox = searchTerm.trim().length >= 3;

  return (
    <>
      {/* بک‌گراند محو */}
      {shouldShowBox && (
        <div
          className="w-full h-screen backdrop-blur-sm bg-black/30 absolute right-0 top-0 z-20"
          onClick={removeSearch}
        />
      )}

      {/* کادر جستجو */}
      <div
        className={`${
          fullWidth ? "w-full" : "w-[100%] md:w-[70%] lg:w-[45%]"
        } mt-[50px] flex flex-col items-center m-auto relative z-30`}
      >
        <SectionInputSearch
          SectionName="search"
          searchLevel={searchLevel}
          mainData={mainData}
          loadingSearch={loadingSearch}
          defaultTheme={theme}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchData={searchData}
          removeSearch={removeSearch}
          params={params}
        />

        {/* نتایج جستجو */}
        <div className="w-full mt-2 bg-white dark:bg-dark-background transition-all duration-300 rounded-xl max-h-[500px] z-[999] pe-[13px] ps-[32px] overflow-y-auto absolute top-[100%] flex flex-col justify-start items-center gap-1 light-scrollbar dark:dark-scrollbar">
          {shouldShowBox && (
            <ItemsSearch
              searchLevel={searchLevel}
              searchData={searchData}
              params={params}
            />
          )}
        </div>
      </div>
    </>
  );
}