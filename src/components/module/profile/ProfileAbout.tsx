"use client";
import ModalCard from "@/components/templates/ModalCard";
import Image from "next/image";

import { targetData } from "@/utils/targetDataName";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
export default function ProfileAbout({
  titleData,
  userProperty,
  profileData,
  params,
}: any) {
  const userId = params.id;
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [dataModal, setDataModal] = useState({});

  const submitModalCart = (item: any) => {
    setDataModal({
      title: targetData(userProperty, "about me"),
      data: item,
    });
    setShowModal(true);
  };

  const submitCart = (dataItem: any) => {
    if (dataItem) {
      submitModalCart(dataItem);
    }
  };

  return (
    <section className="flex flex-col justify-start  gap-[1.5px]  items-center h-screen xl:mt-0 lg:mt-0 md:mt-0 sm:mt-[6px] xs:mt-[6px]">
      <div className="dark:bg-dark-background w-full h-[37%] shadow-md transition-all duration-300 ease-linear bg-white px-1 rounded-[10px]">
        <h1 className="dark:text-white font-azarMehr font-medium  text-[#000] mx-2 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle sm:text-smDesc xs:text-smDesc py-5">
          {targetData(userProperty, "about me")}
        </h1>
        {profileData.data?.customs?.about && (
          <p className="font-azarMehr  text-justify 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle xl:leading-[30px] sm:text-smDesc xs:text-smDesc truncate[20px] lg:leading-[20px] md:leading-[35px] xs:leading-[30px] sm:leading-[30px] mx-1 font-medium text-[5px]  text-gray  dark:text-dark-gray">
            {profileData.data?.customs?.about.slice(0, 210)}

            {profileData.data?.customs?.about.length > 150 && (
              <>
                <span className="font-azarMehr font-medium xl:text-[12px]text-gray">
                  {" "}
                  ...
                </span>
                <span
                  className="dark:text-dark-yellow mx-2 text-blueLink font-azarMehr font-medium cursor-pointer 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle"
                  onClick={() => submitCart(profileData.data?.customs?.about)}
                >
                  {targetData(userProperty, "read more")}
                </span>
              </>
            )}
          </p>
        )}

        <br />
        <br />
      </div>
      <div className="dark:bg-dark-background h-[90%] shadow-md bg-white transition-all duration-300 ease-linear  items-center flex flex-col justify-center xl:mt-[6px] ms:mt-[6px] xs:mt-[6px]  md:mt-1 w-full rounded-[10px] p-2 md:p-0 ">
        {userId && userId === "hm-2000003" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: "backInOut",
            }}
          >
            <Image
              src="/profile/alizadeh.png"
              width={1000}
              height={1000}
              alt={titleData}
              className="3xl:w-[180px] xl:w-[145px] lg:w-[120px] md:w-[170px] sm:w-[140px] xs:w-[130px]"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: "backInOut",
            }}
          >
            <Image
              src="/profile/position.png"
              width={1000}
              height={1000}
              alt={titleData}
              className="3xl:w-[175px] xl:w-[145px] lg:w-[120px] md:w-[170px] sm:w-[140px] xs:w-[130px]"
            />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {showModal && (
          <ModalCard
            dataModal={dataModal}
            setShowModal={setShowModal}
            profileData={profileData}
            userProperty={userProperty}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
