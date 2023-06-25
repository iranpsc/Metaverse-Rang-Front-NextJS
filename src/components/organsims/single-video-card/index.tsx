import React, {useState, useEffect} from "react";
import Alert from "@/components/atoms/alert"
import { Video } from "@/types/api/index";
import axiosHelper from "@/helper/axios";
import { API } from "@/types/api-routes/index"
import eye from "../../../../public/png/eye.png";
import like from "../../../../public/png/like.png";
import Image from "next/image";
import Link from "next/link";
import ReactPlayer from "react-player";

type SingleVideoCardProps = {
  videoData: Video;
  videoId: string;
};
export default function SingleVideoCard({ videoData, videoId }: SingleVideoCardProps) {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const likeVideo = async (type:string) => {
    try {
      const response: any = await axiosHelper(
        `${API.Tutorials}/${type}/${videoId}`,
        'post',
        true
      );

      if (response.response.status == '401')
        {
          setShowAlert(true)
          console.log(response.response.status)
        }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
    }
  };
  useEffect(() => {
    if (showAlert == true)
    setTimeout(() => {
      setShowAlert(false)    
    }, 5000)    
  }, [showAlert])

  useEffect(() => {
    if (showSuccessAlert == true)
    setTimeout(() => {
      setShowSuccessAlert(false)    
    }, 5000)    
  }, [showSuccessAlert])
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  return (
    <>
    <Alert 
      show={showAlert}
      text="لطفا ابتدا وارد شوید."
      color="red"
    />
    <Alert 
      show={showSuccessAlert}
      text="بازخورد شما با موفقیت ثبت شد."
      color="green"
    />
      {videoData && (
        <div>
          <div className="flex justify-center">
            <video style={{height:'50vw'}} src={JSON.parse(JSON.stringify(videoData.video))} controls/>
          </div>
          <div className="bg-red h-[50px]">
            <Link
              href={`${baseUrl}/${videoData.category_slug}`}
              className="flex mr-[10px]"
            >
              {videoData.category_name}
            </Link>
            <Link
              href={`${baseUrl}/${videoData.sub_category_slug}`}
              className="flex mr-[10px]"
            >
              {videoData.title}
            </Link>
          </div>
          <div className="grid grid-cols-7 flex items-center mt-[5px] mr-[10px]">
            <div className="col-span-2">
              <div className="grid grid-cols-4 flex items-center">
                <div className="col-span-1 flex items-center">
                  <Image
                    src={videoData.creator_image}
                    height={50}
                    width={50}
                    alt={videoData.category_name}
                    className="rounded-full"
                  />
                </div>
                <div className="col-span-1">
                  <h2 className="text-gray text-14 whitespace-nowrap">
                    {videoData.creator_name}
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              `
              <Link
                className="font-Bruno text-blue whitespace-nowrap font-bold text-[14px]"
                href={`${baseUrl}/citizen/${videoData.creator_code}`}
              >
                {videoData.creator_code}
              </Link>
            </div>
            <div className="col-span-1">
              <span className="text-gray whitespace-nowrap">
                تاریخ انتشار: {videoData.created_at}
              </span>
            </div>
            <div className="col-span-1">
              <div className="grid grid-cols-2">
                <div className="col-span-1 flex justify-end">
                  <p className="BebasNeue-Regular text-gray flex items-center justify-end -ml-2">
                    {videoData.likes}
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <button onClick={() => likeVideo('like')}>
                    <Image src={like} alt="like" height={15} width={15} />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="grid grid-cols-2">
                <div className="col-span-1 flex justify-end">
                  <p className="BebasNeue-Regular text-gray flex items-center justify-end -ml-2">
                    {videoData.dislikes}
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                <button onClick={() => likeVideo('dislike')}>
                  <Image src={like} alt="dislike" height={15} width={15} className="transform rotate-180 mt-[5px]"/>
                </button>
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
          </div>
          <h1 className="text-gray text-16 py-3 mr-[10px]">
            {videoData.title}
          </h1>
          <div
            className="text-gray font-Digi mr-[10px]"
            dangerouslySetInnerHTML={{ __html: `${videoData.description}` }}
          >
          </div>
        </div>
      )}
    </>
  );
}
