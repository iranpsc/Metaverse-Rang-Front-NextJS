"use client";
// import { getAllCitizen } from "@/components/utils/actions";
import { useEffect, useState } from "react";
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

    axios.get(`https://api.rgb.irpsc.com/api/users?page=${currentPage}`).then((res) => {
      setLastPage(res.data.meta.to);
      res.data.data.map((item) => {oldArray.push(item)})
      setLocalCitizenArray(oldArray);
      if (currentPage >= lastPage) {
        // setIsDisabled(true);
      }
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
          } bg-transparent text-black dark:text-dark-yellow rounded-[10px] px-[40px] py-[20px] base-transition-1 border-2 border-transparent hover:border-black hover:dark:border-dark-yellow`}
          onClick={handleLoadMore}
        >
          {params.lang == "fa"? 'مشاهده بیشتر' : 'View More'}
        </button>
      </div>
    </>
  );
}
