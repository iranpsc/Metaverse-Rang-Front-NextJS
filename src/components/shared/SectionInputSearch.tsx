import { CLoseIcon } from "@/components/svgs";
import { Search } from "@/components/svgs/SvgEducation";
import SyncLoader from "react-spinners/SyncLoader";
import { translateFooter } from "@/components/utils/education";

export default function SectionInputSearch({
  SectionName,
  translateData,
  loadingSearch,
  themeDataActive,
  searchTerm,
  setSearchTerm,
  searchData,
  removeSearch,
}: any) {
  return (
    <>
      <div
        className={`
         ${
           SectionName === "education"
             ? "w-[724px] xs:w-[300px] h-[50px] py-4 rounded-[67px] shadow-md hover:shadow-2xl"
             : "w-[25%] h-[50px] me-2 xs:mt-[50px] xs:mb-5 active:w-[30%] focus-within:w-[30%] focus-within:border-gray rounded-2xl  border-[1px] border-mediumGray"
         }         
         transition-all duration-300 easy-in-out 
         bg-white dark:bg-[#1A1A18] flex flex-row justify-evenly  items-center`}
      >
        <Search
          className={`${
            SectionName === "education" ? "ms-8" : "ms-0 xs:ms-3"
          } fill-blueLink dark:fill-dark-yellow`}
        />
        <input
          placeholder={translateFooter(
            translateData,
            "search for the training you need"
          )}
          className="w-[80%]  outline-none border-none 
              placeholder-[#868B90]   text-[14px] xs:text-[10px] ms-2  font-azarMehr font-medium  dark:bg-[#1A1A18]  dark:placeholder-dark-gray "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loadingSearch && (
          <SyncLoader
            color={`${themeDataActive == "dark" ? "#FFC700" : "#0000FF"}`}
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
              {translateFooter(translateData, "search")}
            </span>
          )
        )}
      </div>
    </>
  );
}
