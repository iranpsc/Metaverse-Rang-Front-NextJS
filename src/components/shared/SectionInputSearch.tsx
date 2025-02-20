import { CLoseIcon } from "@/components/svgs";
import { Search } from "@/components/svgs/SvgEducation";
import SyncLoader from "react-spinners/SyncLoader";
import { translateFooter } from "@/components/utils/education";

export default function SectionInputSearch({
  SectionName,
  searchLevel,
  citizenListArrayContent,
  loadingSearch,
  defaultTheme,
  searchTerm,
  setSearchTerm,
  searchData,
  removeSearch,
}: any) {
  // to find in an array with key(_name)
  function localFind(_name: any) {
    return citizenListArrayContent.find((item: any) => item.name == _name)
      .translation;
  }
  return (
    <>
      <div
        className={`w-full h-[50px] xs:mt-[50px] xs:mb-5 focus-within:border-gray rounded-2xl border-[1px] border-mediumGray transition-all duration-300 easy-in-out bg-white dark:bg-[#1A1A18] flex flex-row justify-evenly dark:text-white items-center`}
      >
        <Search
          className={`${
            SectionName === "education" ? "ms-8" : "ms-0 xs:ms-3"
          } fill-blueLink dark:fill-dark-yellow`}
        />
        <input
          placeholder={
            searchLevel == "citizen"
              ? localFind("search for citizenship name")
              : localFind("search for the training you need")
          }
          className="w-[80%] outline-none border-none 
              placeholder-[#868B90] dark:text-white text-[14px] ms-2 font-azarMehr font-medium dark:bg-[#1A1A18] dark:placeholder-dark-gray"
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
              {localFind("search")}
            </span>
          )
        )}
      </div>
    </>
  );
}
