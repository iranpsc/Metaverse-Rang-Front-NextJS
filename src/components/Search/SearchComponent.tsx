"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import SectionInputSearch from "@/components/shared/SectionInputSearch";
import { ItemsSearch } from "@/components/Search/ItemsSearch";
import { useCookies } from "react-cookie";

export default function SearchComponent({
  searchLevel = "citizen",
  params,
  mainData,
  fullWidth = false,
}: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<any>([]);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);

  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";

  // 🔥 دیتای مقالات Supabase
  const [articlesData, setArticlesData] = useState<any[]>([]);

  // === Load Articles from Supabase once ===
useEffect(() => {
  const search = async () => {
    if (searchTerm.trim().length < 3) {
      setSearchData([]);
      setLoadingSearch(false);
      return;
    }

    setLoadingSearch(true);

    try {
      // =========================
      // Articles — مثل قبل
      // =========================
      if (searchLevel === "articles") {
        const filtered = articlesData.filter((a) =>
          a.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchData(filtered);
        setLoadingSearch(false);
        return;
      }

      // =========================
      // Citizen — مثل قبل
      // =========================
      if (searchLevel === "citizen") {
        const formData = new FormData();
        formData.append("searchTerm", searchTerm);

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search/users`;

        const response = await axios.post(url, formData);

        setSearchData(response.data.data || []);
        setLoadingSearch(false);
        return;
      }

      // =========================
      // Education — نسخه‌ای که الان درست شد
      // =========================
      if (searchLevel === "education") {
        const url =
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tutorials/search`;

        const response = await axios.post(
          url,
          {
            searchTerm: searchTerm.trim(),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Education search response:", response.data);

        setSearchData(
          Array.isArray(response.data?.data)
            ? response.data.data
            : []
        );

        setLoadingSearch(false);
        return;
      }

      setSearchData([]);
    } catch (error: any) {
      console.error("Search error:", error);
      console.error("Search response:", error?.response?.data);

      setSearchData([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  const timer = setTimeout(search, 300);

  return () => clearTimeout(timer);
}, [searchTerm, searchLevel, articlesData]);
  useEffect(() => {
    if (searchTerm.length >= 3) {
      setLoadingSearch(true);

      // 🔥 سرچ مقالات از Supabase
      if (searchLevel === "articles") {
        const filtered = articlesData.filter((a) =>
          a.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchData(filtered);
        setLoadingSearch(false);
        return;
      }

      // 🔥 اگر مقالات نبود → سرچ API های دیگر
      const formData = new FormData();
      formData.append("searchTerm", searchTerm);

      let selectedURL = "";
      if (searchLevel === "citizen") {
        selectedURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search/users`;
      } else if (searchLevel === "education") {
        selectedURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tutorials/search`;
      }

      axios
        .post(selectedURL, formData)
        .then((response) => {
          setSearchData(response.data.data || []);
        })
        .catch(() => setSearchData([]))
        .finally(() => setLoadingSearch(false));
    } else {
      setSearchData([]);
      setLoadingSearch(false);
    }
  }, [searchTerm, searchLevel, articlesData]);

  const removeSearch = () => {
    setSearchData([]);
    setSearchTerm("");
  };

  const shouldShowBox = searchTerm.length >= 3;

  return (
    <>
      {/* 🔹 بک‌گراند محو */}
      {shouldShowBox && (
        <div
          className="w-full h-screen backdrop-blur-sm bg-black/30 absolute right-0 top-0 z-20"
          onClick={removeSearch}
        ></div>
      )}

      {/* 🔹 کادر سرچ */}
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

        {/* 🔹 نتایج سرچ */}
        <div className="w-full mt-2 bg-white dark:bg-dark-background transition-all duration-300 rounded-xl max-h-[500px] z-[999] pe-[13px] ps-[32px] overflow-y-auto absolute top-[100%] flex flex-col justify-start items-center gap-1 light-scrollbar dark:dark-scrollbar">
          {searchTerm.length >= 3 && (
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
