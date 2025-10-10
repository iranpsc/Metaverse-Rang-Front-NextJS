"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SectionInputSearch from "@/components/shared/SectionInputSearch";
import { ItemsSearch } from "@/components/shared/ItemsSearch";
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

  useEffect(() => {
    if (searchTerm.length >= 3) {
      setLoadingSearch(true);
      const formData = new FormData();
      formData.append("searchTerm", searchTerm);
      // switch url
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
        .catch((error) => { })
        .finally(() => {
          setLoadingSearch(false);
          // setActiveSearch(false);
        });
    } else {
      setSearchData([]);
      setLoadingSearch(false);

      // setActiveSearch(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchData.length >= 1) {
      // setActiveSearch(true);
    } else {
      // setActiveSearch(false);
    }
  }, [searchData]);

  const removeSearch = () => {
    setSearchData([]);
    setSearchTerm("");
    // setActiveSearch(false);
  };

  return (
    <>
      <div
        className={`${searchData.length >= 1 ? "visible" : "invisible"
          }  w-full min-h-[1000px] h-full backdrop-blur-sm  bg-blackTransparent/30 h-screen absolute right-0 top-0 z-20 `}
        onClick={removeSearch}
      ></div>
      <div
        className={`${fullWidth ? "w-full" : "w-[100%] md:w-[70%] lg:w-[45%]"
          } mt-[50px] flex flex-col items-center m-auto relative z-20 dark:dark-scrollbar light-scrollbar `}
      >
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

        <div className="w-full mt-2 bg-white dark:bg-dark-background transition-all duration-300 easy-in-out rounded-xl 2xl:max-h-[500px] xl:max-h-[500px] lg:max-h-[500px] md:2xl:max-h-[500px] sm:max-h-[350px] xs:max-h-[350px] z-[999] pe-[13px] ps-[32px] overflow-y-auto overflow-x-clip absolute top-[100%] flex flex-col justify-start items-center gap-1 light-scrollbar dark:dark-scrollbar ">
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