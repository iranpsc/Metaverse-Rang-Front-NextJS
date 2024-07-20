import { LangContext } from "@/context/LangContext";
import { targetData } from "@/utils/targetDataName";
import { useContext } from "react";


const ProfileReadMore = ({ setShowModal, setDataModal }: any) => {
  const { data, profileData } = useContext(LangContext);

  const submitModalCard = (title: any, data: any, type: string) => {
    if (data) {
      setDataModal({
        title,
        desc: data,
        type,
      });
      setShowModal(true);
    } else {
    }
  };

  return (
    <>
      <section className="dark:bg-dark-background transition-all duration-300 ease-linear shadow-md bg-white w-full rounded-[10px] 3xl:h-full xl:h-full lg:h-full md:h-[175px] sm:h-[75px] xs:h-[75px] px-3">
        <div className="flex flex-nowrap p-1 justify-between w-full h-full items-center">
          <p className="font-azarMehr font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle text-[#000] dark:text-white ">
            {targetData(
              data.data.selectedProfileData,
              "if you had the ability to solve a problem, what would it be?"
            )}
          </p>
          <span
            className="text-[#524C4C] dark:text-[#B8B2B2] 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdDesc sm:text-smDesc xs:text-smDesc font-azarMehr  cursor-pointer  font-medium "
            onClick={() =>
              submitModalCard(
                targetData(
                  data.data.selectedProfileData,
                  "if you had the ability to solve a problem, what would it be?"
                ),
                "",
                ""
              )
            }
          >
            {targetData(data.data.selectedProfileData, "view")}
          </span>
        </div>
      </section>
      <section className="dark:bg-dark-background transition-all duration-300 ease-linear shadow-md bg-white   w-full rounded-[10px]  3xl:h-full xl:h-full lg:h-full md:h-[175px] sm:h-[75px] xs:h-[75px] px-3">
        <div className="flex flex-row justify-between p-1 w-full h-full items-center ">
          <p className="font-azarMehr font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle text-[#000] dark:text-white">
            {targetData(data.data.selectedProfileData, "forecast 2022")}
          </p>
          <span
            className={` ${
              profileData?.customs?.prediction
                ? "dark:text-dark-yellow text-blueLink"
                : "text-[#bfbdbd] dark:text-[#785e02]"
            } font-azarMehr 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdDesc sm:text-smDesc xs:text-smDesc cursor-pointer font-medium`}
            onClick={() =>
              submitModalCard(
                targetData(data.data.selectedProfileData, "forecast 2022"),
                profileData?.customs?.prediction,
                "forecast 2022"
              )
            }
          >
            {targetData(data.data.selectedProfileData, "view")}
          </span>
        </div>
      </section>

      <section className="dark:bg-dark-background  transition-all duration-300 ease-linear shadow-md bg-white  w-full rounded-[10px] 3xl:h-full xl:h-full lg:h-full md:h-[175px] sm:h-[75px] xs:h-[75px] px-3">
        <div className="flex flex-nowrap justify-between items-center h-full p-1  ">
          <p className="font-azarMehr font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle text-[#000] dark:text-white ">
            {targetData(data.data.selectedProfileData, "pleasant memory")}
          </p>

          <span
            className={`${
              profileData?.customs?.memory
                ? "dark:text-dark-yellow text-blueLink "
                : "dark:text-[#785e02] text-[#bfbdbd] "
            }font-azarMehr 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdDesc sm:text-smDesc xs:text-smDesc cursor-pointer  font-medium`}
            onClick={() =>
              submitModalCard(
                targetData(data.data.selectedProfileData, "pleasant memory"),
                profileData?.customs?.memory,
                "pleasant memory"
              )
            }
          >
            {targetData(data.data.selectedProfileData, "view")}
          </span>
        </div>
      </section>

      <section className=" dark:bg-dark-background bg-white  transition-all  shadow-md duration-300 ease-linear  w-full rounded-[10px]  3xl:h-full xl:h-full lg:h-full md:h-[175px] sm:h-[75px] xs:h-[75px] px-3">
        <div className="flex flex-nowrap justify-between w-full h-full items-center p-1 ">
          <p className="font-azarMehr font-medium   xl:text-xlTitle 3xl:text-xl3Title lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle text-[#000] dark:text-white ">
            {targetData(data.data.selectedProfileData, "favorites")}
          </p>
          <span
            className={` ${
              profileData?.customs?.passions
                ? "dark:text-dark-yellow text-blueLink"
                : "dark:text-[#785e02] text-[#bfbdbd]"
            } cursor-pointer 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdDesc sm:text-smDesc xs:text-smDesc font-azarMehr font-medium`}
            onClick={() =>
              submitModalCard(
                targetData(data.data.selectedProfileData, "favorites"),
                profileData?.customs?.passions,
                "favorites"
              )
            }
          >
            {targetData(data.data.selectedProfileData, "view")}
          </span>
        </div>
      </section>
    </>
  );
};

export default ProfileReadMore;