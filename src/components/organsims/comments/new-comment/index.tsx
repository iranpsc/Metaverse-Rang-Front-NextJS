import React, {useState, useEffect} from "react";
import Image from "next/image";
import NewCommentIcon from "../../../../../public/png/send-comment.png";
import user from "../../../../../public/png/user.png"
import axiosHelper from "@/helper/axios";
import { API } from "@/types/api-routes/index"
import { SendCommentError } from "@/types/api"
import Alert from "@/components/atoms/alert"

interface NewCommentProps {
  VideoId: string;
}
export default function NewComment({VideoId}:NewCommentProps) {
  const [error, setError] = useState<SendCommentError>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const sendComment = async (e: any) => {
    e.preventDefault();
    try {
      const response: any = await axiosHelper(`${API.Tutorials}/${VideoId}/comments`, 'post', {
        content: e.target.comment.value,
      });
      if (response.response.status == '401')
        setShowAlert(true)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      setError(errorMessage);
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
    <form onSubmit={sendComment} className="w-full relative">
        <Image style={{ position: 'absolute', zIndex: 10 }} src={user} height={40} width={70} alt="user" className="ring ring-1 ring-black rounded-full flex justify-center my-auto mb-[10px] w-[50px] h-[50px]"/>
        <input
            name="comment"
            type='text'
            dir='rtl'
            placeholder="دیگاه خود را وارد کنید"
            className={`pr-[80px] placeholder-mr-[20px] flex justify-center min-h-[50px] bg-[#ECECEC] text-gray placeholder-gray rounded-[20px] w-full focus:border-gray`}
        />
        <button type="submit">
          <Image style={{ position: 'absolute', zIndex: 10 }} src={NewCommentIcon} height={20} width={35} alt="new-comment" className="flex justify-end top-[10px] left-[5px]"/>
        </button>
        <span>{error?.content}</span>
    </form>
    </>
  );
}
