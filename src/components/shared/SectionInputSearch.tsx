"use client";

import { CLoseIcon } from "@/components/svgs";
import { Search } from "@/components/svgs/SvgEducation";
import SyncLoader from "react-spinners/SyncLoader";
import { findByUniqueId } from "../utils/findByUniqueId";

interface SectionInputSearchProps {
  SectionName: string;
  searchLevel: string;
  mainData?: any;
  loadingSearch: boolean;
  defaultTheme: string;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  searchData: any[];
  removeSearch: () => void;
}

export default function SectionInputSearch({
  SectionName,
  searchLevel,
  mainData,
  loadingSearch,
  defaultTheme,
  searchTerm,
  setSearchTerm,
  searchData,
  removeSearch,
}: SectionInputSearchProps) {
  // -------------------------------
  // تعیین placeholder بر اساس نوع سرچ
  // -------------------------------
  const getPlaceholder = () => {
    if (searchLevel === "citizen") {
      return findByUniqueId(mainData, 594) || "جستجو میان شهروندها...";
    }
    if (searchLevel === "education") {
      return findByUniqueId(mainData, 167) || "جستجو میان آموزش‌ها...";
    }
    if (searchLevel === "articles") {
      return findByUniqueId(mainData, 1515) || "جستجو میان مقالات...";
    }
    return "جستجو...";
  };

  return (
    <div
      className={`
        w-full h-[55px] xs:mt-[50px] xs:mb-5 rounded-2xl border-[1px]
        focus-within:border-light-primary focus-within:dark:border-dark-yellow
        transition-all duration-300 bg-white dark:bg-[#1A1A18]
        flex flex-row justify-evenly items-center dark:text-white
      `}
    >
      {/* آیکون سرچ */}
      <Search
        className={`${
          SectionName === "education" ? "ms-8" : "ms-3"
        } fill-blueLink dark:fill-dark-yellow`}
      />

      {/* فیلد ورودی */}
      <input
        type="text"
        placeholder={getPlaceholder()}
        className="w-[80%] outline-none border-none 
          placeholder-[#868B90] dark:text-white text-[16px] ms-2
          dark:bg-[#1A1A18] dark:placeholder-dark-gray"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Loader در حالت در حال جستجو */}
      {loadingSearch && (
        <SyncLoader
          color={defaultTheme === "dark" ? "#FFC700" : "#0066FF"}
          className="me-1"
          size={5}
          speedMultiplier={0.5}
        />
      )}

      {/* دکمه بستن سرچ یا عبارت آموزشی */}
      {searchData && searchData.length >= 1 ? (
        <CLoseIcon
          className="stroke-error cursor-pointer me-3"
          onClick={removeSearch}
        />
      ) : (
        SectionName === "education" && (
          <span className="text-blueLink dark:text-dark-activeButton me-5 font-azarMehr font-medium">
            {findByUniqueId(mainData, 57) || "جستجو"}
          </span>
        )
      )}
    </div>
  );
}
