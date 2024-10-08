"use client";
import ModalCard from "@/components/templates/ModalCard";
import { targetData } from "@/utils/targetDataName";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const ProfileReadMore = ({
  // setShowModal,
  // setDataModal,
  profileData,
  userProperty,
}: any) => {
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [dataModal, setDataModal] = useState({});
  const submitModalCard = (title: any, data: any, type: string) => {
    if (data) {
      setShowModal(true);
      setDataModal({
        data: data,
        type: type,
        title: title,
      });
    } else {
    }
  };

  return (
    <>
      <section className="dark:bg-dark-background transition-all duration-300 ease-linear shadow-md bg-white w-full rounded-[10px] py-2 px-3">
        <div className="flex flex-nowrap p-1 xl:py-3 3xl:py-5 justify-between w-full h-full items-center">
          <p className="font-azarMehr font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle text-[#000] dark:text-white ">
            {targetData(
              userProperty,
              "if you had the ability to solve a problem, what would it be?"
            )}
          </p>
          <span
            className="text-[#bfbdbd] dark:text-[#785e02] 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdDesc sm:text-smDesc xs:text-smDesc font-azarMehr  cursor-pointer  font-medium "
            onClick={() =>
              submitModalCard(
                targetData(
                  userProperty,
                  "if you had the ability to solve a problem, what would it be?"
                ),
                "",
                ""
              )
            }
          >
            {targetData(userProperty, "view")}
          </span>
        </div>
      </section>
      <section className="dark:bg-dark-background transition-all duration-300 ease-linear shadow-md bg-white w-full rounded-[10px] py-2 px-3">
        <div className="flex flex-row justify-between p-1 xl:py-3 3xl:py-5 w-full h-full items-center ">
          <p className="font-azarMehr font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle text-[#000] dark:text-white">
            {targetData(userProperty, "forecast 2022")}
          </p>
          <span
            className={` ${
              profileData.data?.customs?.prediction
                ? "dark:text-dark-yellow text-blueLink"
                : "text-[#bfbdbd] dark:text-[#785e02]"
            } font-azarMehr 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdDesc sm:text-smDesc xs:text-smDesc cursor-pointer font-medium`}
            onClick={() =>
              submitModalCard(
                targetData(userProperty, "forecast 2022"),
                profileData.data?.customs?.prediction,
                "forecast 2022"
              )
            }
          >
            {targetData(userProperty, "view")}
          </span>
        </div>
      </section>

      <section className="dark:bg-dark-background transition-all duration-300 ease-linear shadow-md bg-white w-full rounded-[10px] py-2 px-3">
        <div className="flex flex-nowrap justify-between items-center h-full p-1 xl:py-3 3xl:py-5  ">
          <p className="font-azarMehr font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle text-[#000] dark:text-white ">
            {targetData(userProperty, "pleasant memory")}
          </p>

          <span
            className={`${
              profileData.data?.customs?.memory
                ? "dark:text-dark-yellow text-blueLink "
                : "dark:text-[#785e02] text-[#bfbdbd] "
            }font-azarMehr 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdDesc sm:text-smDesc xs:text-smDesc cursor-pointer  font-medium`}
            onClick={() =>
              submitModalCard(
                targetData(userProperty, "pleasant memory"),
                profileData.data?.customs?.memory,
                "pleasant memory"
              )
            }
          >
            {targetData(userProperty, "view")}
          </span>
        </div>
      </section>

      <section className="dark:bg-dark-background bg-white transition-all shadow-md duration-300 ease-linear w-full rounded-[10px] py-2 px-3">
        <div className="flex flex-nowrap justify-between w-full h-full items-center p-1 xl:py-3 3xl:py-5 ">
          <p className="font-azarMehr font-medium   xl:text-xlTitle 3xl:text-xl3Title lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle text-[#000] dark:text-white ">
            {targetData(userProperty, "favorites")}
          </p>
          <span
            className={` ${
              profileData.data?.customs?.passions
                ? "dark:text-dark-yellow text-blueLink"
                : "dark:text-[#785e02] text-[#bfbdbd]"
            } cursor-pointer 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdDesc sm:text-smDesc xs:text-smDesc font-azarMehr font-medium`}
            onClick={() =>
              submitModalCard(
                targetData(userProperty, "favorites"),
                profileData.data?.customs?.passions,
                "favorites"
              )
            }
          >
            {targetData(userProperty, "view")}
          </span>
        </div>
      </section>
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
    </>
  );
};

export default ProfileReadMore;
