import React from 'react'
import GLBModel from '../3D-model'
import Image from "next/image";

interface Passions {
  [key: string]: string;
}

export interface AboutProps {
  occupation?: string;
  education?: string;
  loved_city?: string;
  loved_country?: string;
  loved_language?: string;
  prediction?: string;
  memory?: string;
  avatar?: string;
  passions: Passions;
}

  export default function Details({ 
    occupation = "--",
    education = "--",
    loved_city = "--",
    loved_country = "--",
    loved_language = "--",
    prediction = "--",
    memory = "--",
    avatar = "--",
    passions
  }: AboutProps) {

  return (
  <div style={{ filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,0.3 ))'}}  className="px-[10px] h-[100vh] md:h-[61vh] w-[90%] md:w-[98%] md:grid grid-cols-7 bg-white mx-auto rounded-[8px] mt-[10px]"> 
    <div className="md:col-span-4 flex flex-col justify-between py-[10px]">
    <div className="flex justify-between flex-row">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">شغل</h1>
      <h1 className="text-gray text-left mx-[5px] font-JannaLTRegular">{occupation}</h1>    
    </div>
    <div className="flex justify-between flex-row">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">تحصیلات</h1>
      <h1 className="text-gray text-left mx-[5px] font-JannaLTRegular">{education}</h1>    
    </div>
    <div className="flex justify-between flex-row">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">این شهر را دوست دارم</h1>
      <h1 className="text-gray text-left mx-[5px] font-JannaLTRegular">{loved_city}</h1>    
    </div>
    <div className="flex justify-between flex-row">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">به این کشور علاقه دارم</h1>
      <h1 className="text-gray text-left mx-[5px] font-JannaLTRegular">{loved_country}</h1>    
    </div>
    <div className="flex justify-between flex-row">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">به این زبان علاقه دارم</h1>
      <h1 className="text-gray text-left mx-[5px] font-JannaLTRegular">{loved_language}</h1>    
    </div>
    <div className="flex justify-between flex-row">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">پیش‌بینی ۱۴۰۱</h1>
      <h1 className="text-gray text-left mx-[5px] font-Digi" title={prediction}>{prediction}</h1>    
    </div>
    <div className="flex justify-between flex-row">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">خاطره خوش</h1>
      <h1 className="text-gray text-left mx-[5px] font-Digi">{memory}</h1>    
    </div>
    <div className="flex justify-between flex-row">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">علایق</h1>
      <div className='flex justify-start'>
      {passions && Object.entries(passions).map(([key, value]) => (
        <Image key={key} src={value} alt={key} width="30" height="20"/>
      ))}
      </div>
    </div>
    </div>
    <div className="col-span-1 md:col-span-3 my-[8px] mx-[5px] md:border-r md:border-r-gray-lighter mr-[20px]">
      <div style={{ width: '100%', height: '60vh' }} className='mr-[5px]'>
        {avatar && <GLBModel url={avatar} />}
      </div>
    </div>
  </div>
  );
}
