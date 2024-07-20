import { useState,memo } from "react";
import { checkData } from "@/components/utils/targetDataName";
import CommentList from "./CommentList";
import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "next-themes";
import axios from "axios";

const CommentSection = ({
  DataVideo,
  translateSingleVideo,
  dataCommentsVideo,
  setRefreshComment,
}: any) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useTheme();
  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);

    const resVideos = await axios.get(
      `https://api.rgb.irpsc.com/api/tutorials?page=${nextPage}`
    );

    const newVideosData = resVideos.data.data;
    // setVideos((prevVideos: any) => [...prevVideos, ...newVideosData]);
    setLoading(false);
  };
  return (
    <div className="w-full xl:max-h-[730px] lg:max-h-[730px] md:h-full sm:h-full xs:h-full mt-10 pt-5 px-5 bg-white dark:bg-singleVideo-dark-background rounded-[20px] xl:overflow-y-scroll lg:overflow-y-scroll  overflow-x-clip flex flex-col justify-start items-center gap-10">
      <h1 className="w-full text-start  text-singleVideo_title text-singleVideo-gray dark:text-white font-azarMehr font-bold ">
        {checkData(
          translateSingleVideo.find(
            (item: any) => item.name === "your point of view"
          )?.translation
        )}
      </h1>

      {dataCommentsVideo.data && (
        <CommentList
          DataItem={dataCommentsVideo}
          translateSingleVideo={translateSingleVideo}
          setRefreshComment={setRefreshComment}
        />
      )}
      {/* <button
        className=" text-center rounded-full mb-10 flex items-center justify-center mt-10 py-5  px-10 shadow-sm hover:shadow-md  dark:bg-[#1A1A18] text-blueLink dark:text-dark-yellow font-azarMehr font-semibold hover:opacity-90"
        onClick={loadMore}
      >
        {!loading ? (
          checkData(
            translateSingleVideo.find((item: any) => item.name === "view all")
              ?.translation
          )
        ) : (
          <SyncLoader
            color={`${theme == "dark" ? "#FFC700" : "#0000FF"}`}
            size={10}
          />
        )}
      </button> */}
    </div>
  );
};

export default CommentSection;
