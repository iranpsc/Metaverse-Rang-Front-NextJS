import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

import DynamicListEducation from "@/components/templates/education/DynamicListEducation";
import SubTitlesModule from "@/components/module/education/SubTitlesModule";
import DynamicFooter from "@/components/templates/education/DynamicFooter";
const CategoryComponent = ({ videosData, translateData,  footerTabs, }: any) => {


  const [brightness, setBrightness] = useState(100);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState(videosData);

 

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



  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScrollY = document.body.scrollHeight - window.innerHeight;
      const brightness = 100 - (currentScrollY / maxScrollY) * 50;
      setBrightness(brightness);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="w-full h-fit flex flex-col justify-start items-center "
   
    >
      <section className=" mt-[70px] w-full h-fit flex  flex-col justify-center items-center  bg-[#f8f8f8] dark:bg-[#000] bg-opacity20">
        <Image
          src="/header.jpg"
          alt="img"
          width={500}
          height={500}
          loading="lazy"
          className=" w-[90%] h-[300px] mx-3 rounded-xl object-cover blur-[3px] "
          style={{ filter: `brightness(${brightness}%)` }}
        />

       

        <div className="w-full h-fit bg-white">
          <div className="bg-white flex flex-col items-center justify-center">
            <DynamicListEducation
              loadMore={loadMore}
              videosData={videos}
              loading={loading}
              translateData={translateData}
            />

            {/* <DynamicFooter footerTabs={footerTabs} /> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryComponent;


/// بیسترین لایک دیس لایک دیده شدن
/// بیشترین سرچ
/// مربیان