import { useContext, useState, useEffect, useRef } from "react";
import Image from "next/image"
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Persian from "persianjs";
import { LangContext } from "@/context/LangContext";
import {  targetData } from "@/utils/targetDataName";
import ProfileHeaderMobile from "@/module/profile/ProfileHeaderMobile";
import ProfileTopMobile from "@/module/profile/ProfileTopMobile";
import ProfileImages from "@/module/profile/ProfileImages";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { CopyIcon } from "../svgs";
import ProfileMainDetails from "../module/profile/ProfileMainDetails";
import ProfileGems from "../module/profile/ProfileGems";


export default function Profile({ profileData, titleData, setShowSharedPage, nameUser }: any) {
  const { data, languageSelected } = useContext(LangContext);
  const [profileName, setProfileName] = useState<string>("");

     const yourElementRef = useRef(null);
 

  const numberScore =
    100 - parseInt(profileData?.score_percentage_to_next_level);
  const percent = (numberScore / 100) * 100;

  return (
    <div className="flex flex-col justify-start 3xl:gap-[12px]  xl:gap-[6px] lg:gap-[4px] 3xl:h-screen xl:h-screen  lg:h-screen md:h-[1300px] sm:h-fit xs:h-fit w-full">
      <ProfileHeaderMobile
        menuData={data}
        profileData={profileData}
        profileName={profileName}
      />

      <div className="w-full h-fit ">
        <ProfileTopMobile
          profileName={profileName}
          titleData={titleData}
          nameUser={nameUser}
        />
      </div>
      <div className="w-full h-fit ">
        <ProfileImages
          profileData={profileData}
          profileName={profileName}
          titleData={titleData}
        />
      </div>
      <div className="w-full h-full rounded-[10px] dark:bg-dark-background bg-white pb-3 ps-2 flex flex-col justify-between gap-5">
        <ProfileMainDetails
          nameUser={nameUser}
          profileData={profileData}
          setShowSharedPage={setShowSharedPage}
        />
        <ProfileGems profileData={profileData} />
      </div>
    </div>
  );
}