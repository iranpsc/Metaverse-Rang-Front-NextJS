import { useState,useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function ProfileImages({ profileData, profileName, titleData }: any) {
  const { theme } = useTheme();
  const [staticImageURL, setStaticImageURL] =
    useState<string>("/profile/lock.png");

  const imgs0 =
    profileData &&
    profileData.profilePhotos &&
    profileData.profilePhotos[0] &&
    profileData?.profilePhotos[0]?.url;

  //
  const maxImages = 5;

  const images = [];
  const [imgProfiles, setImgProfiles] = useState<any>([]);
  const [mainImageUrl, setMainImageUrl] = useState(imgs0 || "/temp.png");

  useEffect(() => {
    setImgProfiles(profileData?.profilePhotos);
  }, [profileData]);

  useEffect(() => {
    setStaticImageURL(
      theme === "dark" ? "/profile/lock-dark.png" : "/profile/lock.png"
    );
  }, [theme]);

  const changeMainImage = (newImageUrl: any) => {
    setMainImageUrl(newImageUrl);
    
  };

  for (let i = 0; i < Math.min(maxImages, (imgProfiles || []).length); i++) {
    images.push(
      <Image
        src={(imgProfiles[i] && imgProfiles[i]?.url) || staticImageURL}
        width={100}
        height={100}
        alt={titleData}
        className={`cursor-pointer border-2  border-[#b1b1b1] dark:border-[#fff] inline-block rounded-full 
        ${imgProfiles[i]?.url == mainImageUrl?"3xl:w-[70px] 3xl:h-[70px] xl:w-14 xl:h-14 lg:w-12 lg:h-12 md:w-20 md:h-20 sm:w-18 sm:h-16 xs:w-[70px] xs:h-[70px]":"3xl:w-[60px] 3xl:h-[60px] xl:w-12 xl:h-12 lg:w-10 lg:h-10 md:w-16 md:h-16 sm:w-16 sm:h-16 xs:w-16 xs:h-16"}
        
        `}
        key={i}
        onClick={() => changeMainImage(imgProfiles[i]?.url || staticImageURL)}
      />
    );
  }

  while (images.length < maxImages) {
    images.push(
      <Image
        src={staticImageURL}
        width={100}
        height={100}
        alt={titleData}
        className="  inline-block rounded-full 3xl:w-12 3xl:h-12 xl:w-11 xl:h-11 lg:w-10 lg:h-10 md:w-14 md:h-14 sm:w-16 sm:h-16 xs:w-16 xs:h-16 "
        key={images.length}
      />
    );
  }

  return (
    <>
      <section className="dark:bg-dark-background shadow-md  3xl:h-[400px] xl:h-[300px] lg:h-full md:h-screen relative bg-white transition-all duration-300 ease-linear  rounded-[10px] flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col md:gap-7">
        <div className=" dark:bg-dark-background bg-white  flex justify-center basis-[80%] items-center rounded-[10px] ">
          <Image
            src={mainImageUrl || "/temp.png"}
            width={600}
            height={600}
            alt={titleData}
            priority={true}
            className="w-full h-full rounded-[10px] object-cover"
          />
        </div>

        <div className=" basis-[20%]  flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col max-lg:mb-2  gap-2 justify-center items-center">
          <hr
            className="xl:h-[90%]    lg:h-[90%] xl:w-[1.5px] lg:w-[1.5px] md:w-[95%] sm:w-[95%] xs:w-[95%] sm:mt-[1px] xs:mt-[1px] mx-1 border-none  h-[1px] xl:mt-2 lg:mt-2 max-sm:mt-5 max-sm:w-[80%]
             
              xl:bg-gradient-to-b lg:bg-gradient-to-b md:bg-gradient-to-r mb-1 sm:bg-gradient-to-l xs:bg-gradient-to-l  from-[#DADADA00] via-[#b3b3b3] to-[#DADADA00]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delayChildren: 0.9,
              staggerChildren: 0.6,
            }}
            className=" pt-3 h-full flex flex-col xl:flex-col lg:flex-col md:flex-row sm:flex-row xs:flex-row w-full 3xl:gap-4 xl:gap-2 lg:gap-2 md:gap-3 sm:gap-5 xs:gap-2  justify-center items-center md:pb-3 sm:pb-3 xs:pb-3"
          >
            {images}
          </motion.div>
        </div>
      </section>
    </>
  );
}
