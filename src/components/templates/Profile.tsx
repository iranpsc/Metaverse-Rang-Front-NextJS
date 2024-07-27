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
import ProfileHeaderMobile from "../module/profile/ProfileHeaderMobile";

export default async function Profile({
  profileData,
  titleData,
  setShowSharedPage,
  nameUser,
  userProperty,
  langData,
  params,
}: {
  profileData: any;
  titleData: any;
  setShowSharedPage: any;
  nameUser: any;
  params: { lang: "en" | "fa" };
  userProperty: any;
  langData: any;
}) {
  // const [profileName, setProfileName] = useState<string>("");

  // const yourElementRef = useRef(null);

  // console.log("params", params);
  // console.log("languageSelected", languageSelected);

  // console.log("langData", langData);

  const numberScore =
    100 - parseInt(profileData?.score_percentage_to_next_level);
  const percent = (numberScore / 100) * 100;

  return (
    <div className="flex flex-col justify-start 3xl:gap-[12px]  xl:gap-[6px] lg:gap-[4px] 3xl:h-screen xl:h-screen  lg:h-screen md:h-[1300px] sm:h-fit xs:h-fit w-full">
      {/* <ProfileHeaderMobile
        menuData={data}
        profileData={profileData}
        profileName={profileName}
      /> */}
      <div className="w-full h-fit ">
        <ProfileTopMobile
          titleData={titleData}
          nameUser={nameUser}
          profileData={profileData}
          params={params}
        />
      </div>
      <div className="w-full h-fit ">
        <ProfileImages
          profileData={profileData}
          // profileName={profileName}
          titleData={titleData}
        />
      </div>
      <div className="w-full h-full shadow-md rounded-[10px] dark:bg-dark-background text-gray dark:text-dark-gray bg-white pb-3 ps-2 flex flex-col justify-between gap-5  transition-all duration-300 ease-linear">
        <ProfileMainDetails
          nameUser={nameUser}
          profileData={profileData}
          userProperty={userProperty}
          langData={langData}
          // setShowSharedPage={setShowSharedPage}
        />
        <ProfileGems profileData={profileData} />
      </div>
    </div>
  );
}
