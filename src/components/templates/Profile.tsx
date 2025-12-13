"use client";
import ProfileTopMobile from "@/module/profile/ProfileTopMobile";
import ProfileImages from "@/module/profile/ProfileImages";
import ProfileMainDetails from "../module/profile/ProfileMainDetails";
import GemImage from "@/components/templates/citizen/gemImage";
import React, { useState, useEffect, useRef } from "react";

export default function Profile({
  profileData,
  titleData,
  nameUser,
  // userProperty,
  mainData,
  langData,
  params,
}: any) {
  const [inView, setInView] = useState(true);
  const iframeContainerRef3 = useRef<HTMLDivElement | null>(null);

  let concatGems = [];
  if (profileData.data?.current_level && profileData.data?.achieved_levels) {
    concatGems = profileData.data?.achieved_levels.concat(
      profileData.data.current_level
    );
  } else {
    concatGems = profileData.data?.achieved_levels;
  }

  const numberScore =
    100 - parseInt(profileData?.score_percentage_to_next_level);
  const percent = (numberScore / 100) * 100;
  // console.log(profileData);
  return (
    <>
      {/* TOP */}
      <div className="w-full">
        <ProfileTopMobile
          titleData={titleData}
          nameUser={nameUser}
          profileData={profileData}
          params={params}
        />
      </div>
      {/* MID */}
      <div className="w-full my-[5px]">
        <ProfileImages
          profileData={profileData}
          // profileName={profileName}
          titleData={titleData}
        />
      </div>
      {/* BOT */}
      <div className="w-full h-full border border-red-500 shadow-md rounded-[10px] dark:bg-dark-background text-gray dark:text-dark-gray bg-white px-3 flex flex-col justify-between gap-5  transition-all duration-300 ease-linear">
        <ProfileMainDetails
          nameUser={nameUser}
          profileData={profileData}
          // userProperty={userProperty}
          mainData={mainData}
          langData={langData}
          params={params}
        />
        {/* <ProfileGems profileData={concatGems} /> */}
        <div ref={iframeContainerRef3} className="flex justify-evenly">
          {inView &&
            concatGems &&
            concatGems.map((item: any, index: any) => (
              <GemImage key={index} item={item} params={params} picSize={128} disableHoverScale />
            ))}
        </div>
      </div>
    </>
  );
}
