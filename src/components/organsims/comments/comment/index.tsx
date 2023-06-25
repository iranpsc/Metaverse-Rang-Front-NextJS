import React, {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import { CommentData, SingleComment } from "@/types/api/index";
import axiosHelper from "@/helper/axios";
import { API } from "@/types/api-routes/index"
import Alert from "@/components/atoms/alert"
import user from "../../../../../public/png/user.png";
import report from "../../../../../public/png/report.png";
import like from "../../../../../public/png/like.png";

export interface CommentProps {
  comments: CommentData | null;
  VideoId: string;
}
export default function Comment({ VideoId, comments }: CommentProps) {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const likeComment = async (videoId:string, commentId:number, type:string) => {
    try {
      const response: any = await axiosHelper(`${API.Tutorials}/${videoId}/comments/${commentId}/${type}`, 'post', {});
      if (response.response.status == '401')
        setShowAlert(true)
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
  return (
    <>
   <Alert 
    show={showAlert}
    text="لطفا ابتدا وارد شوید."
    color="red"
    />
    <div className="col-1 w-full">
      {comments &&
        comments.data.map((singleComment: SingleComment) => (
          <>
            <div
              key={singleComment.id}
              className="flex items-center w-full grid grid-cols-7"
            >
              <div className="col-span-1">
                <Image
                  src={singleComment.commenter_image? singleComment.commenter_image : user}
                  height={40}
                  width={70}
                  alt="user"
                  className="ring ring-1 ring-black rounded-full flex justify-center mt-[15%] w-[60px] h-[60px]"
                />
              </div>
              <div className="col-span-1 -mr-[45%]">
                <h2 className="text-gray text-14 whitespace-nowrap">
                  {singleComment.commenter_name}
                </h2>
              </div>
              <div className="flex justify-center col-span-1">
                `
                <Link
                  className="font-Bruno text-blue whitespace-nowrap font-bold text-[14px]"
                  href={`${baseUrl}/citizen/`}
                >
                  {singleComment.commenter_code}
                </Link>
              </div>
              <div className="col-span-1">
                <span className="text-gray whitespace-nowrap">
                  تاریخ انتشار: {singleComment.created_at}
                </span>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-2">
                  <div className="col-span-1 flex justify-end">
                    <p className="BebasNeue-Regular text-gray flex items-center justify-end -ml-2">
                      {singleComment.likes}
                    </p>
                  </div>
                  <button onClick={() => likeComment(VideoId,singleComment.id,'like')} className="col-span-1 flex items-center justify-center">
                    <Image src={like} alt="like" height={15} width={15} />
                  </button>
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-2">
                  <div className="col-span-1 flex justify-end">
                    <p className="BebasNeue-Regular text-gray flex items-center justify-end -ml-2">
                      {singleComment.dislikes}
                    </p>
                  </div>
                  <button onClick={() => likeComment(VideoId,singleComment.id,'dislike')}  className="col-span-1 flex items-center justify-center">
                    <Image
                      src={like}
                      alt="dislike"
                      height={15}
                      width={15}
                      className="transform rotate-180 mt-[5px]"
                    />
                  </button>
                </div>
              </div>
              <button onClick={() => likeComment(VideoId,singleComment.id,'report')} className="col-span-1 flex justify-center">   
                    <Image src={report} alt="views" height={20} width={20} />
              </button>
            </div>
            <p className="text-gray mr-[8%] ml-[8%]">
              {singleComment.content}
            </p>
            <hr className="w-[90%] border-0 border-b-[1px] border-gray-lighter my-[5px] mr-[7%] mt-[2%]" />
          </>
        ))}
    </div>
    </>
  );
}
