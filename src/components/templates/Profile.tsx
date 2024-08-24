// import { useContext, useState, useEffect, useRef } from "react";
import Image from "next/image";

import Persian from "persianjs";
import { targetData } from "@/utils/targetDataName";
// import ProfileHeaderMobile from "@/module/profile/ProfileHeaderMobile";
import ProfileTopMobile from "@/module/profile/ProfileTopMobile";
import ProfileImages from "@/module/profile/ProfileImages";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { CopyIcon } from "../svgs/SvgCategories";
import ProfileMainDetails from "../module/profile/ProfileMainDetails";
import ProfileGems from "../module/profile/ProfileGems";

export default async function Profile({
  profileData,
  titleData,
  nameUser,
  userProperty,
  langData,
  params,
}: any) {
  // const [profileName, setProfileName] = useState<string>("");

  // const yourElementRef = useRef(null);

  const concatGems = profileData.data?.achieved_levels.concat(
    profileData.data.current_level
  );

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
      <div className="w-full h-full shadow-md rounded-[10px] dark:bg-dark-background text-gray dark:text-dark-gray bg-white px-3 flex flex-col justify-between gap-5  transition-all duration-300 ease-linear">
        <ProfileMainDetails
          nameUser={nameUser}
          profileData={profileData}
          userProperty={userProperty}
          langData={langData}
          // setShowSharedPage={setShowSharedPage}
        />
        <ProfileGems profileData={concatGems} />
      </div>
    </>
  );
}
