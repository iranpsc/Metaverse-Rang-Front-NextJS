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
              className="  inline-block rounded-full p-1 3xl:w-14 3xl:h-14 xl:w-14 xl:h-14 lg:w-12 lg:h-12 md:w-16 md:h-16 sm:w-12 sm:h-12 xs:w-12 xs:h-12 object-cover"
            />
            <p className="sm:bottom-[-25px] xs:bottom-[-25px] sm:start-1 xs:start-1 rounded-sm  w-max p-1 sm:scale-100 xs:scale-100  text-xs  text-black dark:text-white group-hover:scale-100 break-all  inline-block xl:mx-1 lg:mx-1 md:mx-0  font-medium font-azarMehr 3xl:text-xl3Title  xl:text-xlTitle lg:text-lgTitle md:text-mdTitle sm:text-smDesc xs:text-smDesc text-start">
              {nameUser}
            </p>
          </div>

          <hr className="flex-grow mx-3 h-[1px] xl:visible lg:visible md:invisible sm:invisible xs:invisible border border-dashed text-[#000] opacity-10 dark:text-[#fff]" />

          <Image
            src={profileData?.kyc?.nationality || staticImageURL}
            width={100}
            height={100}
            alt={titleData}
            className="inline-block rounded-full xl:w-9 xl:h-9 3xl:w-10 3xl:h-10  lg:w-10 lg:h-10 md:w-14 md:h-14 sm:w-10 sm:h-10 xs:w-10 xs:h-10 object-cover"
          />
          <hr className="flex-grow mx-3 h-[1px] xl:visible lg:visible md:invisible sm:invisible xs:invisible border border-dashed text-[#000] opacity-10 dark:text-[#fff]" />
          <p className=" dark:text-white 3xl:text-[18px] xl:text-xlTitle lg:text-lgTitle md:text-mdDesc  sm:text-smDesc xs:text-smDesc inline-block mx-1 font-medium font-azarMehr text-extraGray">
            {profileData?.level?.name}
          </p>
          <p className=" dark:text-white 3xl:text-[18px] sm:text-smDesc xs:text-smDesc  lg:text-lgTitle xl:text-xlTitle md:text-mdTitle  inline-block mx-1 font-medium font-azarMehr text-extraGray">
            {profileData?.current_level?.name}
          </p>
          <div className=" relative text-center flex items-center justify-center">
            <Shahrvand
              width={100}
              height={100}
              alt="shahrvand"
              className="inline-block  xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-14 md:h-14 sm:w-10 sm:h-10 xs:w-10 xs:h-10 "
            />
            <p className="dark:text-[#212121] absolute md:text-xs text-white font-azarMehr font-black xl:text-[19px] sm:text-smDesc xs:text-smDesc md:text-mdDesc">
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