import { useContext, useState,useEffect } from "react";
import Image from "next/image";
import { LangContext } from "@/context/LangContext";
import { motion } from "framer-motion";

import { useTheme } from "next-themes";

export default function ProfileImages() {
  const { profileData } = useContext(LangContext);
  const { theme } = useTheme();
  const imgs0 =
    profileData &&
    profileData.profilePhotos &&
    profileData.profilePhotos[0] &&
    profileData?.profilePhotos[0]?.url;

    const staticImageURL =
      theme === "dark" ? "/profile/lock-dark.png" : "/profile/lock.png"; //
    const maxImages = 5;

    const images = [];
    const [imgProfiles, setImgProfiles] = useState<any>([]);

    useEffect(() => {
      setImgProfiles(profileData.profilePhotos);
    }, [profileData]);

    for (let i = 0; i < Math.min(maxImages, (imgProfiles || []).length); i++) {
      images.push(
        <Image
          src={(imgProfiles[i] && imgProfiles[i]?.url) || staticImageURL}
          width={100}
          height={100}
          alt="profile"
          className="inline-block rounded-full xl:w-11 xl:h-11 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-16 sm:h-16 xs:w-14 xs:h-14"
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
          className="inline-block rounded-full xl:w-11 xl:h-11 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-16 sm:h-16 xs:w-14 xs:h-14"
          key={images.length}
        />
      );
    }
       

  return (
    <>
      <section className="dark:bg-dark-background  relative bg-white transition-all duration-300 ease-linear mt-[6px] rounded-[10px] flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col md:gap-5">
        <div
          
          className=" dark:bg-dark-background bg-white  flex justify-center basis-[80%] items-center rounded-[10px] "
        >
          <Image
            src={imgs0 || "/temp.png"}
            width={1000}
            height={1000}
            alt="profile || fa:farsiName && Hm-20001 en:eng name && hm-20001"
            className="w-full xl:h-[320px] lg:h-[250px] md:h-[200px] sm:h-[350px] md:object-cover rounded-[10px]"
          />
        </div>

        <div className=" basis-[20%] flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col max-lg:mb-2  gap-2 justify-center items-center">
          <hr
            className="xl:h-[90%] xl:ms-6 lg:ms-0 lg:h-[90%] xl:w-[1.5px] lg:w-[1.5px] md:w-[95%] sm:w-[95%] xs:w-[95%] sm:mt-5 xs:mt-5 xs:mt-5mx-1 border-none  h-[1px] xl:mt-2 lg:mt-2 max-sm:mt-5 max-sm:w-[80%]
             
              xl:bg-gradient-to-b lg:bg-gradient-to-b md:bg-gradient-to-r mb-1 sm:bg-gradient-to-l xs:bg-gradient-to-l  from-[#DADADA00] via-[#b3b3b3] to-[#DADADA00]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delayChildren: 0.9,
              staggerChildren: 0.6,
            }}
            className="h-full flex flex-col xl:flex-col lg:flex-col md:flex-row sm:flex-row xs:flex-row w-full xl:gap-2 lg:gap-2 md:gap-3 sm:gap-5 xs:gap-5  justify-center items-center md:pb-3 sm:pb-3 xs:pb-3"
          >
            {images}
          </motion.div>
        </div>
      </section>
    </>
  );
}