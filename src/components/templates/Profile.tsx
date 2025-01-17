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
  userProperty,
  langData,
  params,
}: any) {
  const [inView, setInView] = useState(true);
  const iframeContainerRef3 = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver to load iframe when it's in view
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const entry = entries[0];
  //       if (entry.isIntersecting) {
  //         setInView(true); // Trigger iframe load when in view
  //       }
  //     },
  //     {
  //       rootMargin: "0px",
  //       threshold: 0.1, // Trigger when 10% of the iframe is in view
  //     }
  //   );

  //   if (iframeContainerRef3.current) {
  //     observer.observe(iframeContainerRef3.current); // Observe the iframe container
  //   }

  //   return () => {
  //     if (iframeContainerRef3.current) {
  //       observer.unobserve(iframeContainerRef3.current); // Cleanup observer
  //     }
  //   };
  // }, []);

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
      <div className="w-full">
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
          userProperty={userProperty}
          langData={langData}
          params={params}
          // setShowSharedPage={setShowSharedPage}
        />
        {/* <ProfileGems profileData={concatGems} /> */}
        <div ref={iframeContainerRef3} className="flex justify-evenly">
          {inView &&
            concatGems &&
            concatGems.map((item: any, index: any) => (
              <GemImage key={index} item={item} params={params} picSize={128} />
            ))}
        </div>
      </div>
    </>
  );
}
