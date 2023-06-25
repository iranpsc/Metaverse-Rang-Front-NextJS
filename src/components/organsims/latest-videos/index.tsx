import React, {useState} from "react";
import { VideoData, Video } from "@/types/api/index";
import Divider from "@/components/molecules/common/divider";
import LatestVideosCard from "@/components/organsims/latest-videos-card";
import axiosHelper from "@/helper/axios";
import { API } from "@/types/api-routes/index"
import Lottie from 'lottie-react';
import loader from "../../../../public/json/loader.json"

export interface LatestVideosProps {
  data: VideoData | null;
  error?: string;
}

export default function LatestVideos({ data } : LatestVideosProps) {
  const [page, setPage] = useState<number>(1);
  const [moreData, setMoreData] = useState<VideoData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(true);

  const FetchMore = async (page: number) => {
    setLoading(true)
    setShowButton(false)
    try {
      const response:VideoData = await axiosHelper<VideoData>(`${API.Tutorials}?page=${page}`, 'get', {});
      setMoreData(response);
      setLoading(false)
      if (response.data.length != 0)
        setShowButton(true)
    } catch (error) {
      console.error(error);
    }
  };

  const LoadMore = () => {
    setPage(page + 1);
    FetchMore(page);
  };
  return (
    <>
      <Divider title="آخرین ویدیوها" />
      <div style={{width:'90%'}} className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mr-[15px] flex justify-center">
          {data &&
            data.data.map((video: Video) => (
                <LatestVideosCard key={video.id} videoData={video} />
            ))}
            {moreData &&
              moreData.data.map((videoData: Video) => (
                <LatestVideosCard key={videoData.id} videoData={videoData} />    
              ))}
            
      </div>
      {loading && <Lottie animationData={loader} className="w-[50px]" />}
      {showButton && <button className="text-gray text-[22px] hover:text-gray-lighter" onClick={LoadMore}>
        مشاهده بیشتر
      </button>}
    </>
  );
}
