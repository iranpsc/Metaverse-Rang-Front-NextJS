"use client";

import { useState } from "react";
import Link from "next/link";
import UserCard from "@/components/shared/UserCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

const TopCitizenClient = ({ citizens, mainData, params }: any) => {
  const [activeBtnId, setActiveBtnId] = useState(null);
  const [linkLoading, setLinkLoading] = useState(false);
  return (
    <>
      {linkLoading && (
        <div className="fixed top-0 left-0 bottom-0  w-full  h-screen z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm" >
          <div className="container flex w-full h-screen items-center justify-center md:ms-[25vw] lg:ms-[17vw] xl:ms-[15vw] 3xl:ms-[16vw]">
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex flex-row justify-between items-center px-3">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {findByUniqueId(mainData, 493)}
        </p>
      </div>

      <div className="w-full relative flex flex-row sm:no-scrollbar1 lg:show-scrollbar1 dark:dark-scrollbar light-scrollbar overflow-x-auto  pb-10">
        {citizens.map((item: any, index: number) => (
          <UserCard
            key={item.id}
            item={item}
            index={index}
            params={params}
            minWidth="290px"
            mainData={mainData}
            buttonText={findByUniqueId(mainData, 600)}
            activeBtnId={activeBtnId}
            setActiveBtnId={setActiveBtnId}
          />
        ))}
        <Link onClickCapture={() => setLinkLoading(true)} href={`/${params.lang}/citizens`}>
          <div
            className="flex-shrink-0 !min-w-[290px] min-h-[435px] md:min-h-[470px] bg-[#fff] dark:bg-[#1A1A18] rounded-[20px] mx-2 flex flex-col gap-3 items-center justify-center hover:scale-105 base-transition-1 shadow-lg cursor-pointer mt-10"

          >
            <div className="rounded-full bg-[#0066FF30] dark:bg-[#483D13] aspect-square flex items-center justify-center w-14 h-14 ltr:rotate-180">
              <svg
                width="16"
                height="24"
                viewBox="0 0 17 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="dark:stroke-dark-primary"
                  d="M11.2753 21.6532L1.99609 11.6008L11.2753 1.54834"
                  stroke="#0066FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="font-azarMehr text-light-primary dark:text-dark-primary text-xl">
              {findByUniqueId(mainData, 171)} {/* مشاهده همه */}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default TopCitizenClient;
