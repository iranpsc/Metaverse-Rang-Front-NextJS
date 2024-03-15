import ListNewEducationModule from "@/components/module/singleVideo/listVideos/ListNewEducationModule";
import { checkData } from "@/components/utils/targetDataName";
import axios from "axios";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

const NewEducationSectionTemp = ({
  newEducationsVideos,
  translateSingleVideo,
}: any) => {
  const [videos, setVideos] = useState([{}]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    setVideos(newEducationsVideos);
  }, []);

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);

    const resVideos = await axios.get(
      `https://api.rgb.irpsc.com/api/tutorials?page=${nextPage}`
    );

    const newVideosData = resVideos.data.data;
    setVideos((prevVideos: any) => [...prevVideos, ...newVideosData]);
    setLoading(false);
  };
  return (
    <div className="flex flex-col justify-center items-center relative">
      <h1 className="w-full text-center xs:text-start mt-5 text-[18px] text-singleVideo-gray dark:text-white font-azarMehr font-bold ">
        {checkData(
          translateSingleVideo.find(
            (item: any) => item.name === "latest tutorials"
          )?.translation
        )}
      </h1>
      <hr className="h-[2px] w-[90%] text-singleVideo-backgroundInput dark:text-dark-background mt-5" />
      {videos.length > 1 && (
        <ListNewEducationModule
          videos={videos}
          translateSingleVideo={translateSingleVideo}
        />
      )}

      <button
        className=" text-center rounded-full mb-10 flex items-center justify-center mt-10 w-[170px] h-[60px] shadow-sm hover:shadow-md  dark:bg-[#1A1A18] text-blueLink dark:text-dark-yellow font-azarMehr font-semibold hover:opacity-90"
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
      </button>
    </div>
  );
};

export default NewEducationSectionTemp;
