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
     console.log(nameUser);


   

  const numberScore =
    100 - parseInt(profileData?.score_percentage_to_next_level);
  const percent = (numberScore / 100) * 100;

  return (
    <div className="flex flex-col justify-between 3xl:h-screen xl:h-screen lg:h-screen md:h-[1300px] sm:h-fit xs:h-fit  w-full ">
      <ProfileHeaderMobile
        menuData={data}
        profileData={profileData}
        profileName={profileName}
      />
      <ProfileTopMobile
        profileName={profileName}
        titleData={titleData}
        nameUser={nameUser}
      />
      <ProfileImages
        profileData={profileData}
        profileName={profileName}
        titleData={titleData}
      />
      <section className="relative shadow-md dark:bg-dark-background 3xl:pb-1  xl:pb-0 lg:pb-0 mt-[6px] h-full  px-1 md:px-2 bg-white rounded-[10px] flex flex-col 3xl:gap-3 xl:gap-3 lg:gap-1 md:gap-3 sm:gap-4 xs:gap-4 justify-between items-center ">
        <ProfileMainDetails
          nameUser={nameUser}
          profileData={profileData}
          setShowSharedPage={setShowSharedPage}
        />

        <ProfileGems profileData={profileData} />
      </section>
    </div>
  );
}