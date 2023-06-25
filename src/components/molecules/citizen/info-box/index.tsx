import React from "react";
import ProgressBar from "@/components/atoms/progress-bar"
import { LevelsImages } from "@/types/api"
import Image from "next/image";

export interface InfoBoxProps {
  code?: string;
  name?: string;  
  position?: string;
  registered_at?: string;
  score: number;
  level_images?: LevelsImages;
}

export default function InfoBox({ code = "--", name = "--", position = "--", registered_at = "--", score, level_images }: InfoBoxProps) {
  return (
  <div style={{ height: "45vh", marginTop:"2vh", filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,0.3 ))'}} className="px-[10px] mr-[5%] md:mr-[0] w-[90%] md:w-[98%] bg-white rounded-[8px] flex flex-col justify-between py-[10px]"> 
    <div className="flex justify-between flex-row">
      <h1 className="text-gray text-right mx-[5px] mt-[18px] whitespace-nowrap font-bold text-[20px]">شناسه شهروندی</h1>
      <h1 className="text-gray text-left mx-[5px] mt-[18px] whitespace-nowrap font-Bruno text-[20px]">{code}</h1>    
    </div>
    <div className="flex justify-between flex-row">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">نام مجازی</h1>
      <h1 className="text-gray text-left mx-[5px]">{name}</h1>    
    </div>
    <div className="flex justify-between flex-row">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">تاریخ ورود</h1>
      <h1 className="text-gray text-left mx-[5px]">{registered_at}</h1>    
    </div>
    <div className="flex justify-between flex-row">
      <h1 className="text-gray text-right mx-[5px] font-JannaLTRegular">مسئولیت</h1>
      <h1 className="text-gray text-left mx-[5px]">{position}</h1>    
    </div>
    <div className="flex justify-between flex-row">
      <h1 className="text-gray text-right mx-[5px] whitespace-nowrap font-JannaLTRegular">امتیاز کسب شده</h1>
      <ProgressBar score={score} className="mx-[5px]"/>   
    </div>
    <div className="flex justify-center items-center -mt-[5px]">
    {level_images && level_images.images.map((image:string, index:any) => (
        <Image
          key={index}
          src={image}
          width={45}
          height={45}
          alt={`Image ${index + 1}`}
          className="col-1"
        />
      ))}
    </div>
  </div>
  );
}
