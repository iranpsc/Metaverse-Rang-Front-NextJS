"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import SectionInputSearch from "@/components/shared/SectionInputSearch";
import { ItemsSearch } from "@/components/shared/ItemsSearch";
import { getAllCategoryVideos } from "@/components/utils/actions";

interface SearchItem {
  id: string;
  name?: string;
  code?: string;
  level?: string;
  photo?: string;
  title?: string;
  slug?: string;
  category?: { slug: string; name?: string };
  sub_category?: { slug: string; name?: string };
  creator?: { code: string; image: string; title: string };
  likes_count?: number;
  dislikes_count?: number;
  views_count?: number;
}

interface Params {
  lang: string;
}

interface SearchComponentProps {
  searchLevel?: string;
  params: Params;
  mainData: any;
}

export default function SearchComponent({
  searchLevel = "citizen",
  params,
  mainData,
}: SearchComponentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<SearchItem[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";

  useEffect(() => {
    if (searchTerm.length < 4) {
      setSearchData([]);
      setLoadingSearch(false);
      return;
    }

    setLoadingSearch(true);

    if (searchLevel === "citizen") {
      const formData = new FormData();
      formData.append("searchTerm", searchTerm);
      axios
        .post("https://api.rgb.irpsc.com/api/search/users", formData)
        .then((response) => {
          setSearchData(response.data.data);
        })
        .catch(() => {
          setSearchData([]);
        })
        .finally(() => {
          setLoadingSearch(false);
        });
    } else if (searchLevel === "education") {
      getAllCategoryVideos()
        .then((videos) => {
          const filteredVideos = videos.filter((video: SearchItem) =>
            video.title?.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchData(filteredVideos);
        })
        .catch(() => {
          setSearchData([]);
        })
        .finally(() => {
          setLoadingSearch(false);
        });
    }
  }, [searchTerm, searchLevel]);

  const removeSearch = () => {
    setSearchData([]);
    setSearchTerm("");
  };

  return (
    <>
      <div
        className={`${
          searchData.length > 0 ? "visible" : "invisible"
        } absolute inset-0 z-20 h-screen min-h-[1000px] w-full bg-blackTransparent/30 backdrop-blur-sm`}
        onClick={removeSearch}
      />
      <div className="relative z-20 mx-auto mt-[50px] flex w-full flex-col items-center md:w-[70%] lg:w-[50%] dark:dark-scrollbar light-scrollbar">
        <SectionInputSearch
          SectionName="education"
          searchLevel={searchLevel}
          mainData={mainData}
          loadingSearch={loadingSearch}
          defaultTheme={theme}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchData={searchData}
          removeSearch={removeSearch}
        />
        <div className="absolute top-full z-[999] mt-2 flex w-full flex-col items-center gap-1 overflow-y-auto overflow-x-clip rounded-xl bg-white transition-all duration-300 ease-in-out dark:bg-dark-background 2xl:max-h-[500px] xl:max-h-[500px] lg:max-h-[500px] md:max-h-[500px] sm:max-h-[350px] xs:max-h-[350px] light-scrollbar dark:dark-scrollbar">
          {searchData.length > 0 && (
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