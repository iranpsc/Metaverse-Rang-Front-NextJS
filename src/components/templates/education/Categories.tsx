import {
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import Image from "next/image";
import axios from "axios";
import { Xxx, ShowAll } from "@/components/svgs";

export default function Categories() {
  const [data ,setData] = useState<any>([]);
 
 useEffect(()=>{
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://api.rgb.irpsc.com/api/tutorials/categories"
      );
     
      setData(res.data.data);

      
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
  },[])
 
 
 
 
  return (
    <>
      <div className="w-[95%] h-[500px] mt-36 flex flex-col justify-start items-start ">
        <h1 className="w-[95%] text-[24px] flex flex-col text-start  font-bold text-[#414040] ms-5">
          دسته بندی ها
        </h1>
        <div className="mt-10 grid grid-cols-5  gap-y-8 gap-x-6 ">
          {data &&
            data.map((item: any) => (
              <div
                key={item.id}
                className="col-span-1 cursor-pointer w-[253px] h-[80px] bg-white dark:bg-[#1A1A18]  rounded-[20px] flex flex-row justify-center items-center gap-5 hover:shadow-md"
              >
                <Image
                  className="w-[32px] h-[32px]"
                  src={item.image}
                  alt={item.slug}
                  width={1000}
                  height={1000}
                />
                <p className="text-[18px] font-bold">{item.name}</p>
              </div>
            ))}

          <div className="col-span-1 cursor-pointer w-[253px] h-[80px] bg-white dark:bg-[#1A1A18] rounded-[20px] flex flex-row justify-center items-center gap-5 hover:shadow-md">
            <ShowAll className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold text-[#0066FF]">مشاهده همه</p>
          </div>
        </div>
      </div>
    </>
  );
}
