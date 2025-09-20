"use client";
import ListNewEducationModule from "@/components/module/singleVideo/listVideos/ListNewEducationModule";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import axios from "axios";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

const NewEducationSectionTemp = ({
  newEducationsVideos,
  mainData,
  params,
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
    <div className="flex flex-col gap-5 px-3 lg:px-5 justify-center items-center relative">
      <h1 className="w-full text-center xs:text-start mt-5 text-[18px] text-singleVideo-gray dark:text-white font-azarMehr font-bold ">
        {/* {checkData(
          translateSingleVideo.find(
            (item: any) => item.name === "latest tutorials"
          )?.translation

        )} */}
        {findByUniqueId(mainData, 190)}
      </h1>
      <hr className="h-[2px] w-[90%] text-singleVideo-backgroundInput dark:text-dark-background mt-5" />
      {videos.length > 1 && (
        <ListNewEducationModule
          videos={videos}
          // translateSingleVideo={translateSingleVideo}
          mainData={mainData}
          params={params}
        />
      )}

<button
  className="text-center rounded-full mb-10 flex items-center justify-center mt-10 w-[170px] h-[60px] shadow-sm hover:shadow-md dark:bg-[#1A1A18] text-blueLink dark:text-dark-yellow font-azarMehr font-semibold hover:opacity-90"
  onClick={loadMore}
>
  <div className="flex items-center justify-center w-full h-full">
    {!loading ? (
      <span className="whitespace-nowrap">{findByUniqueId(mainData, 171)}</span>
    ) : (
      <SyncLoader
        color={theme === "dark" ? "#FFC700" : "#0000FF"}
        size={10}
      />
    )}
  </div>
</button>


    </div>
  );
};

export default NewEducationSectionTemp;
