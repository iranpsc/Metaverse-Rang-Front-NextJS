import { ItemsSearch } from "@/components/Search/ItemsSearch";

export const ActiveSearchModule = ({
  searchTerm,
  setSearchTerm,
  searchData,
}: any) => {
  return (
    <>
      {searchTerm && searchData.length >= 1 && (
        <div
          className={`backdrop-blur-sm  bg-black/30 h-screen absolute ${
            searchData.length >= 1 ? "visible" : "invisible"
          }top-[75px] z-50 w-full flex flex-col justify-start items-center`}
          onClick={() => setSearchTerm("")}
        >
          <div className="w-[50%] xs:w-[80%] overflow-y-scroll overflow-x-clip max-h-screen mb-[100px] bg-white  dark:bg-gray-1  focus-within:border-matn-2 rounded-mb mt-[1px]">
            <div className="  flex flex-col gap-3 justify-start items-center">
              <ItemsSearch searchData={searchData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
