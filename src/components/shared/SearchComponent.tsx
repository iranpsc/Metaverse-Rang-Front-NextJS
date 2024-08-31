"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SectionInputSearch from "@/components/shared/SectionInputSearch";
import { ItemsSearch } from "@/components/shared/ItemsSearch";

export default function SearchComponent({
  citizenListArrayContent,
  // setActiveSearch,
  params,
}: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<any>([]);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm.length >= 4) {
      setLoadingSearch(true);
      const formData = new FormData();
      formData.append("searchTerm", searchTerm);

      axios
        .post("https://api.rgb.irpsc.com/api/search/users", formData)
        .then((response) => {
          setLoadingSearch(false);
          setSearchData(response.data.data);
        })
        .catch((error) => {})
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

  // useEffect(() => {
  // }, [searchData]);

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
        className={`${
          searchData.length >= 1 ? "visible" : "invisible"
        }  w-full min-h-[1000px] backdrop-blur-sm  bg-blackTransparent/30 h-screen absolute top-0 z-20 `}
        onClick={removeSearch}
      ></div>
      <div
        // id={`${
        //   themeDataActive === "dark" ? "dark-scrollbar" : "light-scrollbar"
        // }`}
        className="w-[100%] md:w-[70%] lg:w-[50%] mt-[50px] flex flex-col items-center w-full relative z-20 dark:dark-scrollbar light-scrollbar"
      >
        <SectionInputSearch
          SectionName="education"
          citizenListArrayContent={citizenListArrayContent}
          loadingSearch={loadingSearch}
          // themeDataActive={themeDataActive}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchData={searchData}
          removeSearch={removeSearch}
        />

        <div className="w-full bg-white dark:bg-dark-background transition-all duration-300 easy-in-out rounded-xl 2xl:max-h-[500px] xl:max-h-[500px] lg:max-h-[500px] md:2xl:max-h-[500px] sm:max-h-[350px] xs:max-h-[350px] z-[999] overflow-y-auto overflow-x-clip absolute mt-[53px]  flex flex-col justify-start items-center gap-1 light-scrollbar dark:dark-scrollbar">
          {searchData && searchData.length > 0 && (
            <ItemsSearch searchData={searchData} params={params} />
          )}
        </div>
      </div>
    </>
  );
}
