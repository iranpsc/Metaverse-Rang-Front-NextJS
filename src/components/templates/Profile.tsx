"use client";

import ProfileTopMobile from "@/components/features/profile/ProfileTopMobile";
import ProfileImages from "@/components/features/profile/ProfileImages";
import ProfileMainDetails from "../features/profile/ProfileMainDetails";
import GemImage from "@/components/shared/gemImage";
import { useId, useMemo } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function Profile({
  profileData,
  titleData,
  nameUser,
  mainData,
  langData,
  params,
}: any) {
  const gemTooltipId = "profile-gem-tooltip-" + useId();

  const concatGems = useMemo(() => {
    const achieved = profileData.data?.achieved_levels || [];
    const current = profileData.data?.current_level;
    if (!current) return achieved;

    const currentAlreadyIncluded = achieved.some(
      (gem: any) =>
        (gem.id != null && String(gem.id) === String(current.id)) ||
        (gem.slug && gem.slug === current.slug)
    );

    return currentAlreadyIncluded ? achieved : [...achieved, current];
  }, [profileData.data?.achieved_levels, profileData.data?.current_level]);

  return (
    <>
      <div className="w-full">
        <ProfileTopMobile
          titleData={titleData}
          nameUser={nameUser}
          profileData={profileData}
          params={params}
          mainData={mainData}
        />
      </div>

      <div className="w-full my-[5px]">
        <ProfileImages profileData={profileData} titleData={titleData} />
      </div>

      <div className="w-full h-full shadow-md rounded-[10px] dark:bg-dark-background text-matn-2 bg-white px-3 flex flex-col justify-between gap-5 transition-all duration-300 ease-linear">
        <ProfileMainDetails
          nameUser={nameUser}
          profileData={profileData}
          mainData={mainData}
          langData={langData}
          params={params}
        />

        <div className="flex flex-wrap justify-evenly gap-4 pb-3">
          {concatGems.map((item: any) => (
            <GemImage
              key={item.slug || item.id}
              item={item}
              params={params}
              picSize={70}
              disableHoverScale
              showGlow
              isActive={
                item === profileData.data?.current_level ||
                (item.id != null &&
                  String(item.id) ===
                    String(profileData.data?.current_level?.id))
              }
              mainData={mainData}
              tooltipId={gemTooltipId}
            />
          ))}
          <ReactTooltip
            id={gemTooltipId}
            place="top"
            className="bg-[#E9E9E9]! text-[#908F95]! dark:bg-[#434343]! dark:text-white! !font-azarMehr font-medium! text-[14px]!"
          />
        </div>
      </div>
    </>
  );
}
