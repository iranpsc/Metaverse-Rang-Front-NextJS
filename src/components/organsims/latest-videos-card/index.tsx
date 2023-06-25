import React from "react";
import ReactPlayer from "react-player";
import { VideoData, Video } from "@/types/api/index";
import Link from "next/link";
import Image from "next/image";
import eye from "../../../../public/png/eye.png";
import like from "../../../../public/png/like.png";
import video from "../../../../public/png/video.png"

type LatestVideosCardProps = {
  videoData: Video;
};
const baseUrl = process.env.NEXT_PUBLIC_URL;
export default function LatestVideosCard({ videoData }: LatestVideosCardProps) {
  return (
    <div className="col-span-1 my-5 mx-4 border-gray-lighter border-[2px]">
      <Link href={`/trainings/${videoData.category_slug}/${videoData.sub_category_slug}/${videoData.id}`} className="relative flex justify-center max-w-[500px]">
        <ReactPlayer className="mx-auto" url={videoData.video}/>
        <button>
          <Image
                src={video}
                height={25}
                width={25}
                alt="video"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 "
            />
        </button>
      </Link>
      <div className="bg-red h-[50px]">
        <Link href={`${baseUrl}/${videoData.category_slug}`} className="flex mr-[10px]">{videoData.category_name}</Link>
        <Link href={`${baseUrl}/${videoData.sub_category_slug}`} className="flex mr-[10px]">{videoData.sub_category_name}</Link>
      </div>
      <div className="mr-[10px]">
      <div className="grid grid-cols-3 mt-2">
        <div className="col-span-1">
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <Image
                src={videoData.creator_image}
                height={25}
                width={25}
                alt={videoData.category_name}
                className="rounded-full"
              />
            </div>
            <div className="col-span-1 -mr-5 md:-mr-4">
              <Link
                className="font-Bruno text-blue whitespace-nowrap font-bold text-[14px]"
                href={`${baseUrl}/citizen/${videoData.creator_code}`}
              >
                {videoData.creator_code}
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2">
            <div className="col-span-1 flex justify-end">
              <p className="BebasNeue-Regular text-gray flex items-center justify-end -ml-2">
                {videoData.views}
              </p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <Image src={eye} alt="views" height={15} width={15} />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2">
            <div className="col-span-1 flex justify-end">
              <p className="BebasNeue-Regular text-gray flex items-center justify-end -ml-2">
                {videoData.likes}
              </p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <Image src={like} alt="like" height={15} width={15} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-bold text-gray">{videoData.title}</h2>
      </div>
      <div
        className="text-gray line-clamp-5 font-Digi"
        dangerouslySetInnerHTML={{ __html: `${videoData.description}` }}
      ></div>
      </div>
    </div>
  );
}
