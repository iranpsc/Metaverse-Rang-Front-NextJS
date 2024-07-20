import { useTheme } from "next-themes";
import SyncLoader from "react-spinners/SyncLoader";
import { translateFooter } from "@/components/utils/education";

import ListDataEducation from "@/components/module/education/ListDataEducation";

export default function ListEducation({
  loadMore,
  videosData,
  loading,
  translateData,
}: any) {
  const { theme } = useTheme();

  return (
    <>
      <div className="w-[95%] xs:w-[90%] h-fit mt-24  flex flex-col justify-center items-center ">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          <ListDataEducation
            data={videosData}
            translateData={translateData}
            loadMore={loadMore}
            loading={loading}
          />
        </div>
        <button
          className=" text-center rounded-full flex items-center justify-center mt-10 w-[170px] h-[60px] shadow-sm hover:shadow-md bg-white dark:bg-[#1A1A18] text-blueLink dark:text-dark-yellow font-azarMehr font-semibold hover:opacity-90"
          onClick={loadMore}
        >
          {!loading ? (
            `${translateFooter(translateData, "view more")}`
          ) : (
            <SyncLoader
              color={`${theme == "dark" ? "#FFC700" : "#0000FF"}`}
              size={10}
            />
          )}
        </button>
      </div>
    </>
  );
}
