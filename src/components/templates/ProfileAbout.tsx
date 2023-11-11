import { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { LangContext } from "@/context/LangContext";
import { targetData } from "@/utils/targetDataName";
import ModalCard from "@/templates/ModalCard";
import { motion } from "framer-motion";

export default function ProfileAbout({ setShowModal, setDataModal }: any) {
  const { data, profileData } = useContext(LangContext);

  const router = useRouter();
  const { lang, userId } = router.query;

  const submitModalCart = (item: any) => {
    setDataModal({
      title: targetData(data.data.selectedProfileData, "about me"),
      desc: item,
    });
    setShowModal(true);
     
  };

  const submitCart = (dataItem: any) => {
    if (dataItem) {
      submitModalCart(dataItem);
    }
  };

  return (
    <section className="me-1 flex flex-col justify-start  gap-[1.5px]  items-center h-screen xl:mt-0 lg:mt-0 md:mt-0 sm:mt-3 xs:mt-2">
      <div className="dark:bg-dark-background w-full h-[37%] transition-all duration-300 ease-linear bg-white px-1 rounded-[10px] max-sm:mt-[6px]">
        <h1 className="dark:text-white max-sm:mx-3 max-sm:text-[16px]  font-azarMehr font-medium text-[20px] text-gray mx-2 xl:text-md lg:text-sm md:text-sm py-5">
          {targetData(data.data.selectedProfileData, "about me")}
        </h1>
        {profileData?.customs?.about && (
          <p className="font-azarMehr max-sm:mx-3 max-sm:text-[13px] text-justify xl:leading-[30px] truncate[20px] lg:leading-[20px] md:leading-[15px] mx-1 font-medium xl:text-[12px] lg:text-[10px] md:text-[10px]  text-gray">
            {profileData?.customs?.about.slice(0, 210)}

            {profileData?.customs?.about.length > 150 && (
              <>
                <span className="font-azarMehr font-medium xl:text-[12px]text-gray">
                  {" "}
                  ...
                </span>
                <span
                  className="dark:text-dark-yellow mx-2 text-blueLink md:text-[12px] font-azarMehr font-medium cursor-pointer  xl:text-md lg:text-md"
                  onClick={() => submitCart(profileData?.customs?.about)}
                >
                  {targetData(data.data.selectedProfileData, "read more")}
                </span>
              </>
            )}
          </p>
        )}

        <br />
        <br />
      </div>
      <div className="dark:bg-dark-background h-[90%] bg-white transition-all duration-300 ease-linear  items-center flex flex-col justify-center mt-[6px] md:mt-1 w-full rounded-[10px] p-2 md:p-0 ">
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
              alt={profileData?.code}
              className="xl:w-[145px] lg:w-[130px] md:w-[100px] sm:w-[100px] xs:w-[95px]"
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
              alt={profileData?.code}
              className="xl:w-[145px] lg:w-[130px] md:w-[100px] sm:w-[100px] xs:w-[95px]"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
