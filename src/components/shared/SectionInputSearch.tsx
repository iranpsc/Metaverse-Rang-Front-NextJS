import { CLoseIcon } from "@/components/svgs";
import { Search } from "@/components/svgs/SvgEducation";
import SyncLoader from "react-spinners/SyncLoader";
import { translateFooter } from "@/components/utils/education";
import { findByUniqueId } from "../utils/findByUniqueId";

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
}: any) {
  return (
    <>
      <div
        className={`w-full h-[55px] xs:mt-[50px] xs:mb-5  rounded-2xl border-[1px] focus-within:border-solid focus-within:border-light-primary focus-within:dark:border-dark-yellow transition-all duration-300 easy-in-out bg-white dark:bg-[#1A1A18] flex flex-row justify-evenly dark:text-white items-center `}
      >
        <Search
          className={`${
            SectionName === "education" ? "ms-8" : "ms-0 xs:ms-3"
          } fill-blueLink dark:fill-dark-yellow`}
        />
        <input
          placeholder={
            searchLevel == "citizen"
              ? findByUniqueId(mainData, 594)
              : findByUniqueId(mainData, 167)
          }
          className="w-[80%] outline-none border-none 
              placeholder-[#868B90] dark:text-white text-[14px] ms-2 dark:bg-[#1A1A18] dark:placeholder-dark-gray"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loadingSearch && (
          <SyncLoader
            color={`${defaultTheme == "dark" ? "#FFC700" : "#0066FF"}`}
            className="me-1 "
            size={5}
            speedMultiplier={0.5}
          />
        )}

        {searchData && searchData.length >= 1 ? (
          <CLoseIcon
            className="stroke-error  cursor-pointer me-3"
            onClick={removeSearch}
          />
        ) : (
          SectionName === "education" && (
            <span className="text-blueLink dark:text-dark-activeButton  me-5  font-azarMehr font-medium">
              {findByUniqueId(mainData, 57)}
            </span>
          )
        )}
      </div>
    </>
  );
}
