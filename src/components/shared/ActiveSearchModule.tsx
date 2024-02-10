import { ItemsSearch } from "@/components/shared/ItemsSearch";

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
          <div className="w-[50%] overflow-y-scroll overflow-x-clip max-h-screen mb-[100px] bg-white  dark:bg-[#1A1A18] focus-within:border-gray rounded-mb mt-[1px]">
            <div className="  flex flex-col gap-3 justify-start items-center">
              <ItemsSearch searchData={searchData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
