import React from "react";
import logo from "../../../../../public/favicon.ico"
import Image from 'next/image';

export interface AboutProps {
  birth_date?: string;
  phone?: string;  
  email?: string;
  address?: string;
  about?: string;
}

export default function About({ birth_date = "--", phone = "--", email = "--", address = "--", about = "--" }: AboutProps) {
  return (
  <div style={{ filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,0.3 ))'}} className="grid grid-cols-1 p-[10px] md:grid-cols-2 md:h-[30vh] mt-[10px] md:mt-[0] bg-white mx-auto rounded-[8px] w-[90%] md:w-[98%] md:mt-[10px] lg:mt-[0px]"> 
    <Image style={{position: 'absolute'}} src={logo} height="40" width="40" alt="logo" className="hidden md:flex left-[0px] rounded-sm bg-[#F0F1F4] border-r-[1px] border-r-gray-lighter border-b-[1px] border-b-gray-lighter p-[5px]"/>
    <div className="col-span-1 pl-[20px]">
    <div className="flex justify-between my-[25px]">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">تاریخ تولد</h1>
      <h1 className="text-gray text-left mx-[5px] font-JannaLTRegular">{birth_date}</h1>    
    </div>
    <div className="flex justify-between my-[25px]">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">شماره تماس</h1>
      <h1 className="text-gray text-left mx-[5px] font-JannaLTRegular">{phone}</h1>    
    </div>
    <div className="flex justify-between my-[25px]">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">ایمیل</h1>
      <h1 className="text-gray text-left mx-[5px] font-JannaLTRegular">{email}</h1>    
    </div>
    <div className="flex justify-between my-[25px]">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">آدرس</h1>
      <h1 className="text-gray text-left mx-[5px] font-JannaLTRegular">{address}</h1>    
    </div>
    </div>
    <div className="col-span-1 my-[20px] mx-[5px]">
      <h2 className="text-gray font-JannaLTRegular">
        درباره
      </h2>
      <p style={{lineHeight:'26px'}} className="text-gray line-clamp-6 font-Digi" title={about}>
        {about}
      </p>
    </div>
  </div>
  );
}
