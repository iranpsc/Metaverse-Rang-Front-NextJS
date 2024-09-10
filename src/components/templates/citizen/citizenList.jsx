"use client";
import Link from "next/link";
import { Text } from "@/components/svgs/SvgEducation";
// import { getAllCitizen } from "@/components/utils/actions";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import UserCard from "@/components/shared/UserCard";


export default function CitizenList({
  levelListArrayContent,
  params,
  citizenListArrayContent,
  allCitizenArray,
}) {
  function localFind1(_name) {
    return citizenListArrayContent.find((item) => item.name == _name)
      ?.translation;
  }
  function localFind2(_name) {
    return levelListArrayContent.find((item) => item.name == _name)
      ?.translation;
  }


  const [localCitizenArray, setLocalCitizenArray] = useState(allCitizenArray);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);
  const [lastPage, setLastPage] = useState(2);
  const [isMounted, setIsMounted] = useState(false);
  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
  }, [isMounted]);

  const handleLoadMore = async () => {
    setCurrentPage(currentPage + 1);
    let oldArray = localCitizenArray;
    console.log("oldArray", oldArray);
    console.log("currentPage", currentPage);

    axios.get(`https://api.rgbdev.irpsc.com/api/users?page=${currentPage}`).then((res) => {
      console.log('RESSSS', res)
      setLastPage(res.data.meta.to);
      res.data.data.map((item) => {oldArray.push(item)})
      setLocalCitizenArray(oldArray);
      if (currentPage >= lastPage) {
        setIsDisabled(true);
      }
  
      console.log(
        "Route",
        `https://api.rgbdev.irpsc.com/api/users?page=${currentPage}`
      );
      console.log("newArray", res.data.data);
      console.log("concat array", localCitizenArray);
    }).catch()

  };
  return (
    <>
      {localCitizenArray.map((item, index) => (
        <UserCard
        minWidth='260px'
        key={index}
        item={item}
        index={index}
        params={params}
        levelText={localFind2("developer")}
        buttonText={localFind1("citizen page")} />
      ))}
      <div className="w-full flex justify-center mt-[40px]">
        <button
          disabled={isDisabled}
          title={isDisabled ? "صفحه آخر" : ""}
          className={`${
            isDisabled ? "cursor-not-allowed" : ""
          } text-black dark:text-dark-yellow rounded-[10px] px-[40px] py-[20px] border-2 border-transparent hover:border-2 hover:border-dark-yellow base-transition-1`}
          onClick={handleLoadMore}
        >
          {params.lang == "fa"? 'مشاهده بیشتر' : 'View More'}
        </button>
      </div>
    </>
  );
}
