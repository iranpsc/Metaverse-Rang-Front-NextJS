"use client";
import ModalCard from "@/components/templates/ModalCard";
import Image from "next/image";
import { targetData } from "@/utils/targetDataName";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

// Function to strip HTML tags from a string
const stripHtml = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export default function ProfileAbout({
  titleData,
  mainData,
  profileData,
  params,
}: any) {
  const userId = params.id;
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [dataModal, setDataModal] = useState({});

  const [inView, setInView] = useState(true);
  const iframeContainerRef2 = useRef<HTMLDivElement | null>(null);

  const submitModalCart = (item: any) => {
    setDataModal({
      title: findByUniqueId(mainData, 95),
      data: stripHtml(item), // Sanitize the content before passing to ModalCard
    });
    setShowModal(true);
  };

  const submitCart = (dataItem: any) => {
    if (dataItem) {
      submitModalCart(dataItem);
    }
  };

  return (
    <section
      ref={iframeContainerRef2}
      className="flex flex-col justify-start gap-[10px] items-center h-screen"
    >
      {inView && (
        <>
          <div className="dark:bg-dark-background w-full h-[37vh] shadow-md transition-all duration-300 ease-linear bg-white px-1 rounded-[10px]">
            <h1 className="dark:text-white font-azarMehr font-medium text-[#000] mx-2 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle sm:text-smDesc xs:text-smDesc py-5">
              {findByUniqueId(mainData, 95)}
            </h1>
            {profileData.data?.customs?.about && (
              <p className="font-azarMehr text-justify 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle xl:leading-[30px] sm:text-smDesc xs:text-smDesc truncate[20px] lg:leading-[20px] md:leading-[35px] xs:leading-[30px] sm:leading-[30px] mx-1 font-medium text-[5px] text-gray dark:text-dark-gray">
                {stripHtml(profileData.data?.customs?.about).slice(0, 275)}
                {profileData.data?.customs?.about.length > 150 && (
                  <>
                    <span className="font-azarMehr font-medium xl:text-[12px] text-gray">
                      {" "}
                      ...
                    </span>
                    <span
                      className="dark:text-dark-yellow mx-2 text-blueLink font-azarMehr font-medium cursor-pointer 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgTitle md:text-mdTitle sm:text-smTitle xs:text-smTitle"
                      onClick={() =>
                        submitCart(profileData.data?.customs?.about)
                      }
                    >
                      {findByUniqueId(mainData, 195)}
                    </span>
                  </>
                )}
              </p>
            )}
            <br />
            <br />
          </div>

          <div className="dark:bg-dark-background h-[60vh] overflow-hidden shadow-md bg-white transition-all duration-300 ease-linear items-center flex flex-col justify-center w-full rounded-[10px] p-2 md:p-0">
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
                  width={400}
                  height={500}
                  alt={titleData}
                  className="3xl:w-[180px] xl:w-[145px] lg:w-[120px] md:w-[170px] sm:w-[140px] xs:w-[130px] "
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
                mainData={mainData}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
}