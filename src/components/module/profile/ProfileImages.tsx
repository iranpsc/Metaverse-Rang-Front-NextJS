"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Head from "next/head";

export default function ProfileImages({
  profileData,
  profileName,
  titleData,
}: any) {
  const { theme } = useTheme();
  const [staticImageURL, setStaticImageURL] =
    useState<string>("/profile/lock.png");

  const imgs0 =
    profileData.data &&
    profileData.data.profilePhotos &&
    profileData.data.profilePhotos[0] &&
    profileData.data?.profilePhotos[0]?.url;

  //
  const maxImages = 5;

  const images = [];
  const [imgProfiles, setImgProfiles] = useState<any>([]);
  const [mainImageUrl, setMainImageUrl] = useState(
    imgs0 || "/firstpage/temp-1.webp"
  );

  useEffect(() => {
    setImgProfiles(profileData.data?.profilePhotos);
  }, [profileData.data]);

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
      <figure
        key={i}
        className={`relative rounded-full overflow-hidden !aspect-square ${
          imgProfiles[i]?.url == mainImageUrl ? "w-[34px] 3xl:w-[53px] border-2 border-dashed border-light-primary dark:border-dark-yellow" : "w-32 3xl:w-[50px]"
        }`}
      >
        <Image
          src={(imgProfiles[i] && imgProfiles[i]?.url) || staticImageURL}
          fill
          sizes="50px"
          alt={titleData}
          className={`cursor-pointer border-2 border-[#b1b1b1] dark:border-[#fff] inline-block object-cover
        `}
          onClick={() => changeMainImage(imgProfiles[i]?.url || staticImageURL)}
        />
      </figure>
    );
  }

  while (images.length < maxImages) {
    images.push(
      <Image
        src={staticImageURL}
        width={100}
        height={100}
        alt={titleData}
        className="inline-block rounded-full w-32 h-32 3xl:w-[50px] 3xl:h-[50px]"
        key={images.length}
      />
    );
  }

  return (
    <>
      {/* Preload the main image */}
      <Head>
        {mainImageUrl && (
          <link
            rel="preload"
            href={mainImageUrl}
            as="image"
            type="image/avif, image/webp, image/jpeg"
            imageSrcSet={mainImageUrl}
            crossOrigin="anonymous"
          />
        )}
      </Head>
      <section className="dark:bg-dark-background shadow-md  relative bg-white transition-all duration-300 ease-linear rounded-[10px] flex flex-col justify-center items-center lg:flex-row lg:justify-between ">
        <div className="relative w-[100%] md:w-[77%] aspect-square lg:aspect-auto lg:[height:-webkit-fill-available] lg:[height:-moz-available]  tall0:h-[100vh] dark:bg-dark-background bg-white overflow-clip flex justify-center items-center rounded-[10px] ">
          <Image
            src={mainImageUrl || "/firstpage/temp-1.webp"}
            fill
            sizes="(max-width: 400px) 320px,(max-width: 1024px) 640px, 320px"
            alt={titleData}
            priority={true}
            decoding="async"
            className="w-full h-full  rounded-r-[10px] object-cover "
          />
        </div>

        <div className="flex items-center flex-col lg:flex-row w-[100%] lg:w-[23%] justify-center lg:justify-end gap-5 pe-5">
          <hr className="ms-5 h-[1.5px] w-[35vh] lg:w-[1.5px] lg:h-[35vh] 2xl:h-[40vh] mt-2 border-none xl:bg-gradient-to-b lg:bg-gradient-to-b md:bg-gradient-to-r mb-1 sm:bg-gradient-to-l xs:bg-gradient-to-l from-[#DADADA00] via-[#b3b3b3] to-[#DADADA00]" />

        <div className=" flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col max-lg:mb-2  gap-2 justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delayChildren: 0.9,
              staggerChildren: 0.6,
            }}
            className="pt-3 h-full  flex flex-col xl:flex-col lg:flex-col md:flex-row sm:flex-row xs:flex-row w-full 3xl:gap-4 tall:gap-3 xl:gap-2 lg:gap-1 md:gap-3 sm:gap-5 xs:gap-2 justify-center items-center md:pb-3 sm:pb-3 xs:pb-3"
          >
            {images}
          </motion.div>
        </div>
        </div>
      </section>
    </>
  );
}
