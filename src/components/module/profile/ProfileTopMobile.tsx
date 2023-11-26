import { useContext,useEffect,useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { LangContext } from "@/context/LangContext";
import { Shahrvand } from "@/svgs/index";
import Persian from "persianjs";

export default function ProfileTopMobile({ profileName, titleData,nameUser }: any) {
  const { profileData, languageSelected } = useContext(LangContext);
  const [numberCurrent_level, setNumberCurrent_level] = useState<number>(1);
  const { theme } = useTheme();
  const [staticImageURL, setStaticImageURL] =
    useState<string>("/profile/lock.png");
  useEffect(() => {
    if (
      profileData &&
      profileData?.current_level &&
      profileData?.current_level?.slug
    ) {
      setNumberCurrent_level(profileData?.current_level?.slug);
    } else {
      setNumberCurrent_level(1);
    }
  }, [profileData]);

  useEffect(() => {
    setStaticImageURL(
      theme === "dark" ? "/profile/lock-dark.png" : "/profile/lock.png"
    );
  }, [theme]);

  const imgs0 =
    profileData &&
    profileData.profilePhotos &&
    profileData.profilePhotos[0] &&
    profileData?.profilePhotos[0]?.url;
  return (
    <>
      <div className="dark:bg-dark-background px-1 transition-all  lg:mt-0 md:mt-1 duration-300 sm:mt-1 xs:mt-1 ease-linear flex flex-col bg-white justify-center  items-center rounded-[10px] ">
        <section className="w-full  flex flex-row justify-around px-4 md:px-1 sm:px-0 xs:px-0 items-center">
          <div className="group relative flex justify-center items-center">
            <Image
              src={imgs0 || "/temp.png"}
              width={100}
              height={100}
              alt={titleData}
              className="  inline-block rounded-full p-1 xl:w-14 xl:h-14 lg:w-14 lg:h-14 md:w-10 md:h-10 sm:w-14 sm:h-14 xs:w-14 xs:h-14 object-cover"
            />
            <p className="sm:bottom-[-25px] xs:bottom-[-25px] sm:start-1 xs:start-1 rounded-sm bg-white dark:bg-dark-background  w-max p-1 sm:scale-100 xs:scale-100  text-xs  text-black dark:text-white group-hover:scale-100 break-all  inline-block xl:mx-1 lg:mx-1 md:mx-0  font-medium font-azarMehr xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[14px] xs:text-[12px] text-start">
              {nameUser}
            </p>
          </div>

          <hr className="flex-grow mx-3 h-[1px] xl:visible lg:visible md:invisible sm:invisible xs:invisible border border-dashed text-[#000] opacity-10 dark:text-[#fff]" />

          <Image
            src={profileData?.kyc?.nationality || staticImageURL}
            width={100}
            height={100}
            alt={titleData}
            className="inline-block rounded-full xl:w-9 xl:h-9 lg:w-9 lg:h-9 md:w-7 md:h-7 sm:w-12 sm:h-12 xs:w-12 xs:h-12 object-cover"
          />
          <hr className="flex-grow mx-3 h-[1px] xl:visible lg:visible md:invisible sm:invisible xs:invisible border border-dashed text-[#000] opacity-10 dark:text-[#fff]" />
          <p className=" dark:text-white sm:text-[15px] xs:text-[15px] md:text-[15px] lg:text-[15px] xl:text-[15px]  inline-block mx-1 font-bold font-azarMehr text-extraGray">
            {profileData?.level?.name}
          </p>
          <p className=" dark:text-white sm:text-[12px] xs:text-[12px] md:text-[15px] lg:text-[15px] xl:text-[15px]  inline-block mx-1 font-bold font-azarMehr text-extraGray">
            {profileData?.current_level?.name}
          </p>
          <div className=" relative text-center flex items-center justify-center">
            <Shahrvand
              width={100}
              height={100}
              alt="shahrvand"
              className="inline-block  xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-7 sm:w-12 sm:h-12 xs:w-12 xs:h-12 "
            />
            <p className="dark:text-[#212121] absolute md:text-xs text-white font-azarMehr font-black xl:text-[19px] sm:text-[14px] xs:text-[14px]">
              {languageSelected.code === "fa"
                ? Persian(numberCurrent_level).englishNumber().toString()
                : profileData?.current_level?.slug}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
