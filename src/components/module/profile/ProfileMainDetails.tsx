import { useContext, useRef, useState, useEffect } from "react";
import { LangContext } from "@/context/LangContext";
import { targetData } from "@/utils/targetDataName";
import Persian from "persianjs";
import { CopyIcon } from "@/components/svgs/SvgCategories";

const ProfileMainDetails = ({
  nameUser,
  profileData,
  setShowSharedPage,
}: any) => {
  const { data, languageSelected } = useContext(LangContext);
  const [numberScore, setNumberScore] = useState<number>(0);

  useEffect(() => {
    if (profileData?.score_percentage_to_next_level) {
      setNumberScore(
        100 - parseInt(profileData?.score_percentage_to_next_level)
      );
    } else {
      setNumberScore(0);
    }
  }, [profileData?.score_percentage_to_next_level]);

  const yourElementRef = useRef(null);
  const percent = (numberScore / 100) * 100;

  return (
    <div className="flex flex-col justify-start items-center w-[98%] mt-2 3xl:gap-10 tall:gap-10 xl:gap-6  lg:gap-4 md:gap-10 sm:gap-5 xs:gap-5">
      <div className="flex flex-row justify-between w-full items-center 3xl:mt-6 xl:mt-0 md:mt-6 sm:mt-6 xs:mt-2 xl:py-0 lg:py-0 md:py-0">
        <p className="font-azarMehr  font-bold xl:text-xlUser 3xl:text-xl3User lg:text-lgUser  md:text-mdUser sm:text-smUser xs:text-smUser">
          {targetData(data.data.selectedProfileData, "citizenship id")}
        </p>
        <div
          className=" flex flex-row items-center justify-center gap-2 cursor-pointer"
          onClick={setShowSharedPage}
          ref={yourElementRef}
        >
          <div className=" dark:bg-dark-yellow bg-blueLink flex flex-row items-center gap-2  rounded-[10px] 3xl:py-[3px] 3xl:px-4 lg:py-2 lg:px-2 md:py-2 md:px-4 sm:py-2 sm:px-4 xs:py-1 xs:px-2">
            <span className="font-azarMehr dark:text-[#000] text-[#fff] font-medium 3xl:text-xl3Title xl:text-xlTitle  lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle">
              {targetData(data.data.selectedProfileData, "share")}
            </span>
            <CopyIcon className="dark:fill-[#000] fill-[#fff] 3xl:w-[20px] 3xl:h-[20px] md:w-[20px] md:h-[20px] " />
          </div>
          <p className="font-azarMehr font-bold  xl:text-xlUser 3xl:text-xl3User  lg:text-lgUser md:text-mdUser  sm:text-smUser xs:text-smUser uppercase">
            {profileData?.code}
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full items-center">
        <p className="font-azarMehr dark:text-white font-medium 3xl:text-xl3Title  xl:text-xlTitle  lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle break-all text-[#000]">
          {targetData(data.data.selectedProfileData, "citizenship name")}
        </p>
        <hr className="flex-grow mx-[10px] xl:block lg:block md:block sm:hidden xs:hidden h-[1px] border border-dashed  text-[#000] opacity-10 dark:text-[#fff]" />
        <p className="dark:text-dark-gray text-gray  font-azarMehr font-medium 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc md:text-mdDesc  sm:text-smTitle xs:text-smTitle break-all ">
          {nameUser}
        </p>
      </div>

      <div className="flex flex-row justify-between w-full items-center ">
        <p className="font-azarMehr dark:text-white font-medium medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle sm:text-smTitle xs:text-smTitle break-all text-[#000] ">
          {targetData(data.data.selectedProfileData, "entry date")}
        </p>
        <hr className="flex-grow mx-[10px] xl:block lg:block md:block sm:hidden xs:hidden h-[1px] border border-dashed  text-[#000] opacity-10 dark:text-[#fff]" />
        <p className="dark:text-dark-gray font-azarMehr font-medium medium 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdTitle  sm:text-smTitle xs:text-smTitle break-all text-gray ">
          {profileData?.registered_at}
        </p>
      </div>

      <div className="flex flex-row  justify-between w-full items-center">
        <p className=" dark:text-white font-azarMehr  font-medium medium 3xl:text-xl3Title  xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle  break-all text-[#000] ">
          {targetData(data.data.selectedProfileData, "responsibility")}
        </p>
        <hr className="flex-grow mx-[10px] md:w-[30%] xl:block lg:block md:block sm:hidden xs:hidden h-[1px] border border-dashed  text-[#000] opacity-10 dark:text-[#fff]" />
        <p className="dark:text-dark-gray  font-azarMehr font-medium medium 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgTitle  md:text-mdDesc sm:text-smTitle xs:text-smTitle break-all text-gray ">
          {profileData?.position}
        </p>
      </div>

      <div className="flex flex-row  justify-between xl:mt-3 lg:mt-0 w-full items-center">
        <p className="font-azarMehr dark:text-white font-medium medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle break-all text-[#000] ">
          {targetData(data.data.selectedProfileData, "achieved score")}
        </p>
        <hr className="flex-grow mx-[10px] md:w-[30%] xl:block lg:block md:block sm:hidden xs:hidden h-[1px] border border-dashed  text-[#000] opacity-10 dark:text-[#fff]" />
        <div className="w-[40%] relative bg-[#E9EEF8] dark:bg-[#3F3F3F]  xl:h-[27px] lg:h-[25px] md:h-[26px]  rounded-full  flex justify-end">
          <div
            className={`bg-dark-yellow flex items-center  p-3  leading-none rounded-full`}
            style={{ width: `${percent}%` }}
          >
            <span className="  end-[35%] absolute 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle break-all font-medium text-[#0E0E0E] dark:text-white text-center">
              {languageSelected?.code && languageSelected?.code !== "fa"
                ? profileData?.score
                : profileData?.score &&
                  Persian(profileData?.score).englishNumber().toString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMainDetails;
