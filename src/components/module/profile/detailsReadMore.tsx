"use client";
import ModalCard from "@/components/templates/ModalCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { targetData } from "@/utils/targetDataName";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const ProfileReadMore = ({
  // setShowModal,
  // setDataModal,
  profileData,
  // userProperty,
  mainData,
}: any) => {
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [dataModal, setDataModal] = useState({});
  const submitModalCard = (title: any, data: any, type: string, id: number) => {
    if (data) {
      setShowModal(true);
      setDataModal({
        data: data,
        type: type,
        title: title,
        id: id,
      });
    } else {
    }
  };

  return (
    <>
      <section className="dark:bg-dark-background transition-all duration-300 ease-linear shadow-md bg-white w-full rounded-[10px] py-2 px-3">
        <div className="flex flex-nowrap p-1 xl:py-3 3xl:py-5 justify-between w-full h-full items-center">
          <p className="font-azarMehr font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle text-[#000] dark:text-white ">
            {/* {targetData(
              userProperty,
              "if you had the ability to solve a problem, what would it be?"
            )} */}
            {findByUniqueId(mainData, 91)}
          </p>
          <span
            className="text-[#bfbdbd] dark:text-[#785e02] 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdDesc sm:text-smDesc xs:text-smDesc font-azarMehr  cursor-pointer  font-medium "
            onClick={() =>
              submitModalCard(
                // targetData(
                //   userProperty,
                //   "if you had the ability to solve a problem, what would it be?"
                // )
                findByUniqueId(mainData, 91),
                "",
                "",
                91
              )
            }
          >
            {/* {targetData(userProperty, "view")} */}
            {findByUniqueId(mainData, 147)}
          </span>
        </div>
      </section>
      <section className="dark:bg-dark-background transition-all duration-300 ease-linear shadow-md bg-white w-full rounded-[10px] py-2 px-3">
        <div className="flex flex-row justify-between p-1 xl:py-3 3xl:py-5 w-full h-full items-center ">
          <p className="font-azarMehr font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle text-[#000] dark:text-white">
            {/* {targetData(userProperty, "forecast 2022")} */}
            {findByUniqueId(mainData, 92)}
          </p>
          <span
            className={` ${
              profileData.data?.customs?.prediction
                ? "dark:text-dark-yellow text-blueLink"
                : "text-[#bfbdbd] dark:text-[#785e02]"
            } font-azarMehr 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdDesc sm:text-smDesc xs:text-smDesc cursor-pointer font-medium`}
            onClick={() =>
              submitModalCard(
                // targetData(userProperty, "forecast 2022"),
                findByUniqueId(mainData, 92),
                profileData.data?.customs?.prediction,
                "forecast 2022",
                92
              )
            }
          >
            {/* {targetData(userProperty, "view")} */}
            {findByUniqueId(mainData, 147)}
          </span>
        </div>
      </section>

      <section className="dark:bg-dark-background transition-all duration-300 ease-linear shadow-md bg-white w-full rounded-[10px] py-2 px-3">
        <div className="flex flex-nowrap justify-between items-center h-full p-1 xl:py-3 3xl:py-5  ">
          <p className="font-azarMehr font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle text-[#000] dark:text-white ">
            {/* {targetData(userProperty, "pleasant memory")} */}
            {findByUniqueId(mainData, 93)}
          </p>

          <span
            className={`${
              profileData.data?.customs?.memory
                ? "dark:text-dark-yellow text-blueLink "
                : "dark:text-[#785e02] text-[#bfbdbd] "
            }font-azarMehr 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdDesc sm:text-smDesc xs:text-smDesc cursor-pointer  font-medium`}
            onClick={() =>
              submitModalCard(
                // targetData(userProperty, "pleasant memory"),
                findByUniqueId(mainData, 93),
                profileData.data?.customs?.memory,
                "pleasant memory",
                93
              )
            }
          >
            {/* {targetData(userProperty, "view")} */}
            {findByUniqueId(mainData, 147)}
          </span>
        </div>
      </section>

      <section className="dark:bg-dark-background bg-white transition-all shadow-md duration-300 ease-linear w-full rounded-[10px] py-2 px-3">
        <div className="flex flex-nowrap justify-between w-full h-full items-center p-1 xl:py-3 3xl:py-5 ">
          <p className="font-azarMehr font-medium   xl:text-xlTitle 3xl:text-xl3Title lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle text-[#000] dark:text-white ">
            {/* {targetData(userProperty, "favorites")} */}
            {findByUniqueId(mainData, 94)}
          </p>
          <span
            className={` ${
              profileData.data?.customs?.passions
                ? "dark:text-dark-yellow text-blueLink"
                : "dark:text-[#785e02] text-[#bfbdbd]"
            } cursor-pointer 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdDesc sm:text-smDesc xs:text-smDesc font-azarMehr font-medium`}
            onClick={() =>
              submitModalCard(
                // targetData(userProperty, "favorites"),
                findByUniqueId(mainData, 94),
                profileData.data?.customs?.passions,
                "favorites",
                94
              )
            }
          >
            {/* {targetData(userProperty, "view")} */}
            {findByUniqueId(mainData, 147)}
          </span>
        </div>
      </section>
      <AnimatePresence>
        {showModal && (
          <ModalCard
            dataModal={dataModal}
            setShowModal={setShowModal}
            profileData={profileData}
            // userProperty={userProperty}
            mainData={mainData}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileReadMore;
