"use client";
// import { getAllCitizen } from "@/components/utils/actions";

import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "@/components/shared/UserCard";
import SyncLoader from "react-spinners/SyncLoader";
import { findByUniqueId } from "@/components/utils/findByUniqueId";


export default function CitizenList({
  params,
  allCitizenArray,
  defaultTheme,
  mainData
}) {


  const [localCitizenArray, setLocalCitizenArray] = useState(allCitizenArray);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);
  const [lastPage, setLastPage] = useState(2);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    const fetchButtonText = async () => {
      const text = await findByUniqueId(mainData, 600);
      setButtonText(text);
      setLoading(false);  // Set loading to false when data is fetched
    };
  
    fetchButtonText();
  }, [mainData]);

  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    
  }, [isMounted]);

  const handleLoadMore = async () => {
    setLoading(true)
    try {
      // Increment page AFTER fetching data to avoid incorrect pagination
      const nextPage = currentPage + 1;
  
      const res = await axios.get(`https://api.rgb.irpsc.com/api/users?page=${nextPage}`);
  
      setLastPage(res.data.meta.to);
  
      // Update state correctly without mutating the existing array
      setLocalCitizenArray((prevCitizens) => [...prevCitizens, ...res.data.data]);
  
      setCurrentPage(nextPage);
  
      if (nextPage >= lastPage) {
        // setIsDisabled(true);
      }
    } catch (error) {
      console.error("Error fetching more users:", error);
    } finally {
      setLoading(false); 
    }
  };
  return (
    <>
      {localCitizenArray.map((item, index) => (
        <UserCard
        minWidth='280px'
        key={index}
        item={item}
        index={index}
        params={params}
        buttonText={buttonText} 
        mainData={mainData}
        />
      ))}
      <div className="w-full flex justify-center mt-[40px]">
      {!loading ? (
          <button
            disabled={isDisabled}
            title={isDisabled ? "صفحه آخر" : ""}
            className={`${
              isDisabled ? "cursor-not-allowed" : ""
            }bg-white dark:bg-darkGray text-light-primary md:text-lg dark:text-dark-yellow rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-light-primary hover:text-light-primary hover:dark:border-dark-yellow`}
            onClick={handleLoadMore}
          >
            {params.lang == "fa" ? "مشاهده بیشتر" : "View More"}
          </button>
        ) : (
          <SyncLoader
            color={`${defaultTheme == "dark" ? "#FFC700" : "#0000FF"}`}
            size={10}
          />
        )}
      </div>
    </>
  );
}
