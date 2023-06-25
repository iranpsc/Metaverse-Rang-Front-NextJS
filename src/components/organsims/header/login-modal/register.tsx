import React, { useState } from "react";
import eye from "../../../../../public/png/eye.png";
import { RegisterError } from "@/types/api";
import axiosHelper from "@/helper/axios";
import { API } from "@/types/api-routes/index"
import Lottie from 'lottie-react';
import loader from "../../../../../public/json/loader.json"
import Image from "next/image";
import Link from "next/link";

interface RegisterFormProps {
    onClick: (newState: string) => void;
}
export default function RegisterForm({ onClick }:RegisterFormProps) {
  const [showIcon, setShowIcon] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [type, setType] = useState<boolean>(true);
  const [error, setError] = useState<RegisterError>();
  const [loading, setLoading] = useState<boolean>(false);
  function showViewIcon(input: string) {
    if (input != "") setShowIcon(true);
    else setShowIcon(false);
  }
  const handleClick = () => {
    onClick('login');
  }
  function changeType() {
    if (type == true)
        return('password')
    else
        return('text')
  }
  const register = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response: any = await axiosHelper(API.Register, 'post', {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      });
      setError(response.response.data.errors)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      setError(errorMessage);
    }
    setLoading(false);
  };
  return (
    <>
      <form onSubmit={register} className="flex flex-col w-[98%] mt-[120px]">
        <input
          name="name"
          placeholder="نام کاربری میتواند نام برند یا شرکت باشد."
          dir="ltr"
          className={`border border-[1px] border-gray bg-white h-[50px] rounded-md mt-[10px] text-gray pl-[10px] ${
            error?.name ? "border border-red" : ""
          }`}
        />
          <span className='text-red text-sm'>{error?.name}</span>
        <input
          name="email"
          placeholder="name@example.com"
          dir="ltr"
          className={`border border-[1px] border-gray bg-white h-[50px] rounded-md mt-[10px] text-gray pl-[10px] ${
            error?.email ? "border border-red" : ""
          }`}
        />
          <span className='text-red text-sm'>{error?.email}</span>
        <div className="relative mt-[10px]">
          <input
            type={changeType()}
            name="password"
            onChange={(e) => showViewIcon(e.target.value)}
            placeholder="********"
            dir="ltr"
            className={`w-full border border-[1px] border-gray bg-white h-[50px] rounded-md my-[10px] text-gray pl-[10px] ${
              error?.password ? "border border-red" : ""
            }`}
          />
            <span className='text-red text-sm'>{error?.password}</span>
          {showIcon && (
            <Image
              className="absolute right-[10px] top-[22px]"
              src={eye}
              alt="show"
              width={25}
              height={25}
              onClick={()=>setType(!type)}
            />
          )}
        </div>
        <button disabled={loading} className='flex items-center justify-center mt-[10px] text-white text-[24px] text-bold text-lg bg-gradient-to-t from-green via-green-light to-white rounded-full h-[50px] border border-l-green border-t-green border-b-green-dark border-r-green-dark border-[4px]'>
            {loading ? <Lottie animationData={loader} className="w-[50px]" />
            : <>ثبت نام</>
            }
        </button>
      </form>
      <div className="flex-col">
        <button onClick={handleClick}  className="text-blue-link hover:text-blue-linkdark text-2xl my-[10px]">
            'ثبت نام کرده ام' وارد شوید
        </button>
      </div>
      <div className="flex-col">
        <span className="flex-col text-gray-light text-lg">
          با کلیک بر روی دکمه ورود به سامانه موافقت میکنید
        </span>
      </div>
      <div className="flex-col">
        <Link href="https://rgb.irpsc.com/overview" target="_blank" className="flex-col text-blue-link hover:text-blue-linkdark text-lg">
          شرایط قرارداد خدمات
        </Link>
      </div>
      <div className="flex-col mt-[10px]">
        <span className="flex-col text-gray-light text-lg">
            سوالی دارید یا میخواهید بیشتر بدانید؟
        </span>
      </div>
      <div className="flex-col">
        <Link href="https://rgb.irpsc.com/" className="flex-col text-blue-link hover:text-blue-linkdark text-lg">
          از وبسایت ما دیدن کنید.
        </Link>
      </div>
    </>
  );
}
