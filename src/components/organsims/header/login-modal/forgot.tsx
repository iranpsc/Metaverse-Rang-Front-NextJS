import React, {useState} from 'react';
import { ForgotError } from "@/types/api"
import axiosHelper from "@/helper/axios";
import { API } from "@/types/api-routes/index"
import Lottie from 'lottie-react';
import loader from "../../../../../public/json/loader.json"

interface LoginFormProps {
    onClick: (newState: string) => void;
}

export default function ForgotForm({ onClick }:LoginFormProps) {
  const [showIcon, setShowIcon] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [error, setError] = useState<ForgotError>();
  const [type, setType] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  function showViewIcon(input:string) {
    if (input != "")
        setShowIcon(true)
    else
        setShowIcon(false)
  }
  function changeType() {
    if (type == true)
        return('password')
    else
        return('text')
  }
  const handleClick = () => {
    onClick('login');
  }
  const login = async (e: any) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response: any = await axiosHelper(API.Forgot, 'post', {
        email: e.target.email.value,
      });
      setError(response.response.data.errors)
      console.log(error)
      setLoading(false)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      console.log(errorMessage);
      setError(errorMessage);
    }
  };
  return (
    <>
      <form onSubmit={login} className='flex flex-col w-[98%]'>
        <h3 style={{position:'absolute'}} className='text-black mt-[20px] mx-[10px] top-[110px] text-[18px] font-IranSans font-bold'>
            رمز عبور خود را فراموش کرده اید؟ برای بازیابی آن، لطفا آدرس ایمیل خود را در زیر وارد کنید.
        </h3>
        <input
            name="email"
            placeholder='name@example.com'
            dir="ltr"
            className={`border border-[1px] border-gray bg-white h-[50px] rounded-md mt-[150px] text-gray pl-[10px] ${error?.email ? 'border border-red' : ''}`}
        />
        <span className='text-red text-sm'>{error?.email}</span>
        <button disabled={loading} className='flex items-center justify-center mt-[10px] text-white text-bold text-lg bg-gradient-to-t from-green via-green-light to-white rounded-full h-[50px] border border-l-green border-t-green border-b-green-dark border-r-green-dark border-[4px]'>
            {loading ? <Lottie animationData={loader} className="w-[50px]" />
            : <>ارسال</>
            }
        </button>
      </form>
      <div className='flex-col'>
        <button onClick={handleClick} className='text-blue-link hover:text-blue-linkdark text-2xl mt-[50px]'>
            بازگشت به صفحه ورود
        </button>
      </div>
      </>
  );
}