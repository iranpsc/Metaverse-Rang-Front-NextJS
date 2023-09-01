import { useContext, useState,useEffect } from "react";
import Image from "next/image";
import { LangContext } from "@/components/context/LangContext";

import { useTheme } from "next-themes";

export default function ProfileImages() {
  const { profileData } = useContext(LangContext);
  const { theme } = useTheme();
  const imgs1 =
    profileData &&
    profileData.profilePhotos &&
    profileData.profilePhotos[1] &&
    profileData?.profilePhotos[1]?.url;

    const staticImageURL =
      theme === "dark" ? "/profile/lock-dark.png" : "/profile/lock.png"; //
    const maxImages = 5;

    const images = [];
    const [imgProfiles, setImgProfiles] = useState([]);

    useEffect(() => {
      setImgProfiles(profileData.profilePhotos);
    }, [profileData]);

    for (let i = 0; i < Math.min(maxImages, (imgProfiles || []).length); i++) {
      images.push(
        <Image
          src={imgProfiles[i]?.url || staticImageURL}
          width={100}
          height={100}
          alt="profile"
          className="inline-block rounded-full xl:w-11 xl:h-11 lg:w-10 lg:h-10 max-lg:w-12 max-lg:h-12"
          key={i}
        />
      );
    }

    while (images.length < maxImages) {
      images.push(
        <Image
          src={staticImageURL}
          width={100}
          height={100}
          alt="profile"
          className="inline-block rounded-full xl:w-11 xl:h-11 lg:w-10 lg:h-10 max-lg:w-12 max-lg:h-12"
          key={images.length}
        />
      );
    }
       

  return (
    <>
      <section className="dark:bg-dark-background  relative bg-white transition-all duration-300 ease-linear mt-2 rounded-md flex flex-row max-lg:flex-col ">
        <div className=" dark:bg-dark-background bg-white  flex justify-center basis-3/4 items-center">
          <Image
            src={imgs1 || "/temp.png"}
            width={1000}
            height={1000}
            alt="profile"
            className="  rounded-md w-full h-[280px]"
          />
        </div>

        <div className=" basis-1/4  flex flex-row max-lg:flex-col max-lg:mb-2  gap-2 justify-center items-center">
          <hr
            className="h-[90%] mx-3 w-[1.5px] border-none sd max-lg:w-[99%] max-lg:h-[1px] max-lg:mt-2 
             
              bg-gradient-to-b from-[#DADADA00] via-[#DADADA] to-[#DADADA00]"
          />

          <div className="h-full flex flex-col gap-2 max-lg:flex-row max-lg:w-full max-lg:gap-6 justify-center items-center">
            {images}
          </div>
        </div>
      </section>
    </>
  );
}
