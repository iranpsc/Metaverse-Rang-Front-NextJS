"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import SectionInputSearch from "@/components/shared/SectionInputSearch";
import { ItemsSearch } from "@/components/shared/ItemsSearch";
import { useCookies } from "react-cookie";
import { articles } from "@/components/utils/articles"; // ← اضافه شده برای سرچ لوکال مقالات

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

  // --------------------------------------
  // Handle search logic
  // --------------------------------------
  useEffect(() => {
    if (searchTerm.length >= 3) {
      setLoadingSearch(true);

      // اگر نوع سرچ، "articles" باشد از دیتای لوکال استفاده کن
      if (searchLevel === "articles") {
        const filtered = articles.filter((a) =>
          a.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchData(filtered);
        setLoadingSearch(false);
        return;
      }

      // در غیر اینصورت API را صدا بزن
      const formData = new FormData();
      formData.append("searchTerm", searchTerm);

      let selectedURL = "";
      if (searchLevel == "citizen") {
        selectedURL = "https://api.rgb.irpsc.com/api/search/users";
      } else if (searchLevel == "education") {
        selectedURL = "https://api.rgb.irpsc.com/api/tutorials/search";
      }

      axios
        .post(selectedURL, formData)
        .then((response) => {
          setLoadingSearch(false);
          setSearchData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoadingSearch(false);
        });
    } else {
      setSearchData([]);
      setLoadingSearch(false);
    }
  }, [searchTerm]);

  const removeSearch = () => {
    setSearchData([]);
    setSearchTerm("");
  };

  return (
    <>
      {/* پس‌زمینه نیمه‌شفاف وقتی نتایج بازند */}
      <div
        className={`${
          searchData.length >= 1 ? "visible" : "invisible"
        }  w-full h-screen backdrop-blur-sm bg-black/30 absolute right-0 top-0 z-20`}
        onClick={removeSearch}
      ></div>

      {/* کادر ورودی سرچ */}
      <div
        className={`${
          fullWidth ? "w-full" : "w-[100%] md:w-[70%] lg:w-[45%]"
        } mt-[50px] flex flex-col items-center m-auto relative z-30 dark:dark-scrollbar light-scrollbar`}
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
        />

        {/* نتایج سرچ */}
        <div className="w-full mt-2 bg-white dark:bg-dark-background transition-all duration-300 rounded-xl max-h-[500px] z-[999] pe-[13px] ps-[32px] overflow-y-auto absolute top-[100%] flex flex-col justify-start items-center gap-1 light-scrollbar dark:dark-scrollbar">
          {searchData && searchData.length > 0 && (
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
