import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "next-themes";

import { ActiveSearchModule } from "@/components/shared/ActiveSearchModule";
import SectionInputSearch from "@/components/shared/SectionInputSearch";

export const HeaderComponent = ({
  TitleHeader,
  translateData,
  setActiveSearch,
}: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any>([]);

  const [themeDataActive, setThemeDataActive] = useState<any>("light");
  const { theme } = useTheme();
  useEffect(() => {
    setThemeDataActive(theme);
  }, [theme]);

  useEffect(() => {
    if (searchTerm.length >= 4) {
      setLoadingSearch(true);
      const formData = new FormData();
      formData.append("searchTerm", searchTerm);

      axios
        .post("https://api.rgb.irpsc.com/api/tutorials/search", formData)
        .then((response) => {
          setLoadingSearch(false);
          setSearchData(response.data.data);
        })
        .catch((error) => {
          setLoadingSearch(false);
          setActiveSearch(false);
        });
    } else {
      setSearchData([]);
      setLoadingSearch(false);
      setActiveSearch(false);
    }
    setActiveSearch(false);
  }, [searchTerm]);

  useEffect(() => {
    if (searchData.length >= 1) {
      setActiveSearch(true);
    } else {
      setActiveSearch(false);
    }
  }, [searchData]);

  const removeSearch = () => {
    setSearchData([]);
    setSearchTerm("");
    setActiveSearch(false);
  };

  return (
    <>
      <div className="w-full min-h-[75px] shadow-xl bg-white dark:bg-[#1A1A18] flex flex-row justify-center gap-1  items-center relative">
        <h1 className=" absolute start-2 xs:top-2 font-azarMehr whitespace-nowrap  font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[14px] ms-2">
          {TitleHeader}
        </h1>

        <SectionInputSearch
          SectionName="subCategories"
          translateData={translateData}
          loadingSearch={loadingSearch}
          themeDataActive={themeDataActive}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchData={searchData}
          removeSearch={removeSearch}
        />
      </div>
      <ActiveSearchModule
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchData={searchData}
      />
    </>
  );
};
