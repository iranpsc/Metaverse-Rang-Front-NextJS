import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "next-themes";

import { ActiveSearchModule } from "@/components/shared/ActiveSearchModule";
import SectionInputSearch from "@/components/shared/SectionInputSearch";

export const HeaderComponent = ({ translateData }: any) => {
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
          setSearchData(response.data.data[0]);
        })
        .catch((error) => {
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
      <div className="w-full h-[75px] shadow-xl bg-white dark:bg-[#1A1A18] flex flex-row justify-center items-center relative">
        <h1 className="absolute font-azarMehr  font-bold 3xl:text-[28px] xl:text-[28px] lg:text-[24px] md:text-[22px] sm:text-[20px] xs:text-[18px] start-4">
          آموزش متاورس
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
