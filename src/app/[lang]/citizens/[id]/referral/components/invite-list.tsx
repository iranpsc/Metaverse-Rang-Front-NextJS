"use client";
import { useEffect, useState } from "react";
import { getAllReferral } from "@/components/utils/actions";
import InviteChart from "./invite-chart";
import InviteListCard from "./invite-list-card";
import axios from "axios";

export default function InviteList({
  initInviteList,
  params,
  referralPageArrayContent,
}: {
  initInviteList: any;
  params: any;
  referralPageArrayContent: any;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [referralList, setReferralList] = useState(initInviteList.data);
  const [searchTerm, setSearchTerm] = useState(""); // Track the search term

  function localFind(_name: any) {
    return referralPageArrayContent.find((item: any) => item.name == _name)
      .translation;
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {}, [isMounted]);

  const searchFetch = async () => {
    try {
      // Call the API with the search term
      const filteredReferralList = await axios.get(
        `https://api.rgb.irpsc.com/api/citizen/${params.id}/referrals?search=${searchTerm}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update the referral list with the filtered results from the API
      setReferralList(filteredReferralList.data.data);
    } catch (error) {
      console.error("Error fetching referral list:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col py-8 leading-[24px] gap-4 w-full lg:self-start mt-[64px] mb-[32px]">
        <p className="text-black dark:text-white font-black lg:text-2xl">
          {localFind("invitation list")}
        </p>
        <p className="text-lightGray dark:text-lightGray lg:text-lg">
          {localFind("the list of friends who have been")}
        </p>

        <div className="transition-[right,width] lg:w-[49%] duration-300 ease-in-out flex items-center flex-row justify-between bg-white dark:bg-darkGray w-full h-[50px] rounded-[12px] ">
          <div className="searchIcon flex justify-center ps-7 text-black dark:text-white">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.67065 8.61694C1.67065 4.68636 4.85702 1.5 8.78759 1.5C12.7182 1.5 15.9045 4.68636 15.9045 8.61694C15.9045 12.5475 12.7182 15.7339 8.78759 15.7339C4.85702 15.7339 1.67065 12.5475 1.67065 8.61694ZM8.78759 0C4.02859 0 0.170654 3.85793 0.170654 8.61694C0.170654 13.3759 4.02859 17.2339 8.78759 17.2339C10.7923 17.2339 12.6371 16.5493 14.101 15.4012L16.8142 18.1073C17.1074 18.3998 17.5823 18.3992 17.8748 18.1059C18.1673 17.8126 18.1667 17.3378 17.8734 17.0453L15.1973 14.3761C16.5696 12.8499 17.4045 10.8309 17.4045 8.61694C17.4045 3.85793 13.5466 0 8.78759 0Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-2 ps-5 text-black dark:text-white bg-transparent flex-1 w-[90%] h-[90%] border-none outline-none text-sm text-aliceblue font-azarMehr text-[16px]"
            placeholder={localFind("search for your invitee")}
            style={{ fontSize: "18px" }}
          />
          <button
            onClick={searchFetch}
            className="searchButton font-normal text-[95%] pe-5 border-none bg-transparent text-blueLink dark:text-dark-primary cursor-pointer"
          >
            {params.lang.toLowerCase() == "fa" ? "جستجو" : "Search"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 w-full">
        {/* CARD */}
        {referralList &&
          referralList.map((item: any, index: any) => (
            <InviteListCard key={index} item={item} params={params} />
          ))}
      </div>
      {referralList.length == 0 && (
        <p className="w-full text-center text-white">موردی یافت نشد.</p>
      )}
      {false && (
        <p className="w-[150px] text-blueLink dark:text-dark-primary pt-7 cursor-pointer m-auto text-center">
          {params.lang.toLowerCase() == "fa" ? "مشاهده بیشتر" : "View more"}
        </p>
      )}
    </>
  );
}
