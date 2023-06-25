import React, {useState, useEffect} from "react";
import Search from "../../../../../public/png/Search.png";
import { API } from "@/types/api-routes/index"
import { SearchApiResponse } from "@/types/api"
import Lottie from 'lottie-react';
import loader from "../../../../../public/json/loader.json"
import like from "../../../../../public/png/like.png";
import axiosHelper from "@/helper/axios";
import Link from 'next/link'
import Image from 'next/image'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [showPod, setShowPod] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const Searching = async (searchTerm: string) => {
    setLoading(true)
    try {
      const response:SearchApiResponse[] = await axiosHelper<SearchApiResponse[]>(API.Search, 'post', { searchTerm: searchTerm });
      setSearchResult(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchTerm && searchTerm.length % 5 === 0) {
      Searching(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    setShowPod(Boolean(searchTerm));
  }, [searchTerm]);

  return (
    <div className="relative w-full flex justify-center lg:mt-[50px]">
      <input
        type="text"
        placeholder="آموزش مورد نیاز خود را جستجو کنید"
        dir="rtl"
        className="w-full md:w-2/3 max-w-[1024px] z-20 relative h-[40px] border border-gray-light rounded-md p-2 bg-white text-gray"
        style={{ 
          backgroundImage: `url(${Search.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
          backgroundSize: "35px 35px"
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {showPod && (
        <div className="absolute z-10 top-[40px] p-[5px] grid grid-cols-1 bg-white w-full md:w-2/3 max-w-[1024px] flex justify-center border-t-0 border border-gray-lighter rounded-b-md">
          {!loading ? (
            searchResult.length > 0 ? (
              <div className="max-h-[320px] overflow-y-auto">
              {searchResult.map((result: SearchApiResponse, index) => (
                <>
                <div className="grid grid-cols-2 w-full hover:bg-blue-light">
                  <div className="col-span-1">
                    <Link href={`${baseUrl}/trainings/${result.id}`} key={index} className="h-[70px] flex items-center rounded-sm">
                      <h1 className="text-gray border-orange mr-[5px] text-[14px]">{result.title}</h1>
                    </Link>
                  </div>
                  <div className="col-span-1 mt-[10px]">
                      <div className="grid grid-cols-4">
                        <div className="col-span-3">
                        <Link
                          className="font-Bruno text-blue whitespace-nowrap font-bold text-sm flex justify-end"
                          href={`${baseUrl}/citizen/${result.creator_code}`}
                        >
                          {result.creator_code}
                        </Link>
                        <div className="flex justify-end">
                          <p className="BebasNeue-Regular text-gray flex items-center justify-end ml-[5px] mt-[5px]">
                              {result.likes}
                          </p>
                          <Image src={like} alt="like" height={7} width={14} className="w-[15px] h-[15px] mt-[8px]"/>
                        </div>
                        </div>
                        <div className="col-span-1 flex items-center justify-start mr-[10px]">
                          <Image
                            src={result.creator_image}
                            height={50}
                            width={50}
                            alt={result.category_name}
                            className="rounded-full"
                          />
                        </div>
                      </div>
                  </div>
                </div>
                  <hr className="border-0 border-b-[1px] border-gray-lighter my-[5px] flex justify-center mx-[30px]" />
                </>
              ))}
              </div>
            ) : (
              <h1 className="text-gray">نتیجه‌ای یافت نشد.</h1>
            )
          ) : (
            <div className="flex justify-center">
            <Lottie animationData={loader} className="w-[50px]" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}