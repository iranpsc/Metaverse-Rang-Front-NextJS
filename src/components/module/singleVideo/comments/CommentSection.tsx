import { useState, useEffect, memo } from "react";
import { checkData } from "@/components/utils/targetDataName";
import CommentList from "./CommentList";
import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "next-themes";
import axios from "axios";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

interface CommentSectionProps {
  mainData: any;
  dataCommentsVideo: { data: any[] };
  setRefreshComment: React.Dispatch<React.SetStateAction<boolean>>;
  refreshComment: boolean;
  params: { lang: string; videoId: string };
  DataVideo: any;
}

const CommentSection = ({
  mainData,
  dataCommentsVideo = { data: [] },
  setRefreshComment,
  refreshComment,
  params,
  DataVideo,
}: CommentSectionProps) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>(dataCommentsVideo.data);
  const { theme } = useTheme();

  useEffect(() => {
    setComments(dataCommentsVideo.data);
  }, [dataCommentsVideo]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      setPage(nextPage);

      const response = await axios.get(
        `https://api.rgb.irpsc.com/api/tutorials/${params.videoId}/comments?page=${nextPage}`
      );
      console.log("Load more response:", response.data); // لاگ کردن پاسخ
      setComments((prev) => [...prev, ...response.data.data]);
      setRefreshComment((prev) => !prev);
    } catch (error) {
      console.error("Error loading more comments:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("dataCommentsVideo:", dataCommentsVideo);
  console.log("comments:", comments);
  console.log("params.videoId:", params.videoId);

  return (
    <div className="w-full mt-10 pt-5 bg-white dark:bg-[#080807] rounded-[20px]">
      <p className="w-full text-start px-6 text-singleVideo_title text-singleVideo-gray dark:text-white font-azarMehr font-bold">
        {checkData(findByUniqueId(mainData, 457))}
      </p>
      <div className="light-scrollbar dark:dark-scrollbar w-full px-5 xl:max-h-[730px] lg:max-h-[730px] md:h-full sm:h-full xs:h-full xl:overflow-y-scroll lg:overflow-y-scroll overflow-x-clip flex flex-col justify-start items-center gap-10">
        {comments && comments.length > 0 ? (
          <CommentList
            DataItem={{ data: comments }}
            mainData={mainData}
            setRefreshComment={setRefreshComment}
            params={params}
          />
        ) : (
          <div className="text-black dark:text-white">
            {params.lang.toLowerCase() === "fa" ? "دیدگاهی وجود ندارد." : "No review"}
          </div>
        )}
        {comments.length > 5 && (
          <button
            className="text-center rounded-full mb-10 flex items-center justify-center mt-10 py-5 px-10 shadow-sm hover:shadow-md dark:bg-[#1A1A18] text-blueLink dark:text-dark-yellow font-azarMehr font-semibold hover:opacity-90"
            onClick={loadMore}
          >
            {!loading ? (
              findByUniqueId(mainData, 171)
            ) : (
              <SyncLoader
                color={`${theme === "dark" ? "#FFC700" : "#0000FF"}`}
                size={10}
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(CommentSection);