import React, {useState} from 'react';
import eye from "../../../../../public/png/eye.png";
import { LoginError } from "@/types/api"
import axiosHelper from "@/helper/axios";
import { API } from "@/types/api-routes/index"
import Image from 'next/image'
import Link from 'next/link'
import Lottie from 'lottie-react';
import loader from "../../../../../public/json/loader.json"

interface LoginFormProps {
    onClick: (newState: string) => void;
}

export default function LoginForm({ onClick }:LoginFormProps) {
  const [showIcon, setShowIcon] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [error, setError] = useState<LoginError>();
  const [type, setType] = useState<boolean>(true);
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
    onClick('register');
  }
  const forgetClick = () => {
    onClick('forgot');
  }
  const login = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response: any = await axiosHelper(API.Login, 'post', {
        email: e.target.email.value,
        password: e.target.password.value,
      });
      const token = response.data.token;
      const decodedToken = decodeURIComponent(token);
      document.cookie = `user=${decodedToken}`;

      setError(response.response.data.errors);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      setError(errorMessage);
    }
    setLoading(false);
  };
  return (
    <>
      <form onSubmit={login} className='flex flex-col w-[98%] mt-[120px]'>
        <input
            name="email"
            placeholder='name@example.com'
            dir="ltr"
            className={`border border-[1px] border-gray bg-white h-[50px] rounded-md mt-[10px] text-gray pl-[10px] ${error?.email ? 'border border-red' : ''}`}
        />
        <span className='text-red text-sm'>{error?.email}</span>
        <div className="relative mt-[10px]">
         <input
            type={changeType()}
            name="password"
            onChange={(e) => showViewIcon(e.target.value)}
            placeholder='********'
            dir="ltr"
            className={`w-full border border-[1px] border-gray bg-white h-[50px] rounded-md my-[10px] text-gray pl-[10px] ${error?.password ? 'border border-red' : ''}`}
        />
        <span className='text-red text-sm'>{error?.password}</span>
        {showIcon &&
        <Image
         className="absolute right-[10px] top-[22px]"
         src={eye}
         alt="show"
         width={25}
         height={25}
         onClick={() => setType(!type)}
        />}
        </div>
        <button disabled={loading} className='flex items-center justify-center mt-[10px] text-white text-bold text-lg bg-gradient-to-t from-green via-green-light to-white rounded-full h-[50px] border border-l-green border-t-green border-b-green-dark border-r-green-dark border-[4px]'>
            {loading ? <Lottie animationData={loader} className="w-[50px]" />
            : <>ورود</>
            }
        </button>
      </form>
      <div className='flex-col mt-4'>
            <input 
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className='mt-[5px] ml-[5px]'
            />
            <span className='text-gray-light text-[24px] font-IranSans'>
                مرا به خاطر بسپار
            </span>
      </div>
      <div className='flex-col'>
        <button onClick={forgetClick} className='text-blue-link hover:text-blue-linkdark text-[16px] my-3'>
            فراموشی رمز عبور
        </button>
      </div>
      <div className='flex-col'>
        <button onClick={handleClick} className='text-blue-link text-[24px] hover:text-blue-linkdark text-2xl'>
            ثبت نام و عضویت در سامانه
        </button>
      </div>
      <div className='flex-col mt-4'>
        <span className='flex-col text-gray-light text-lg text-[16px]'>
            با کلیک بر روی دکمه ورود به سامانه موافقت میکنید
        </span>
      </div>
      <div className='flex-col'>
        <Link href="https://rgb.irpsc.com/overview" target="_blank" className='flex-col text-blue-link hover:text-blue-linkdark text-[16px] text-lg'>
            شرایط قرارداد خدمات
        </Link>
      </div>
      </>
  );
}