import { useContext, useEffect } from "react";
import { LangContext } from "@/components/context/LangContext";
import { targetData } from "@/components/utils/targetDataName";
import ProfileDetailsDetails  from "@/components/module/profileDetails/ProfileDetailsDetails";
import ProfileDetailsInteresting from "../module/profileDetails/ProfileDetailsInteresting";

export default function ProfileDetails({ setShowModal, setDataModal }: any) {
  const { selectedProfileData, profileData } = useContext(LangContext);

  const submitModalCard =(title:any,data:any)=>{
    if (data === "passions"){
        setDataModal({ title, desc: profileData?.customs?.passions });
    }else{
      setDataModal({ title, desc: data });
    } 
      
    setShowModal(true)
  }

  const itemsProfileDetails = [
    {
      id: 1,
      key: targetData(selectedProfileData, "date of birth"),
      value: profileData?.kyc?.birth_date || "--",
    },
    {
      id: 2,
      key: targetData(selectedProfileData, "phone number"),
      value: profileData?.kyc?.phone || "--",
    },
    {
      id: 3,
      key: targetData(selectedProfileData, "email"),
      value: profileData?.kyc?.email || "--",
    },
    {
      id: 4,
      key: targetData(selectedProfileData, "address"),
      value: profileData?.kyc?.address || "--",
    },
    {
      id: 5,
      key: targetData(selectedProfileData, "job"),
      value: profileData?.customs?.occupation.slice(0, 25) || "--",
      fValue: profileData?.customs?.occupation,
    },
    {
      id: 6,
      key: targetData(selectedProfileData, "education"),
      value: profileData?.customs?.education || "--",
    },
  ];

  const itemsInterestedProfileDetails = [
    {
      id: 1,
      key: targetData(selectedProfileData, "i love this city"),
      value: profileData?.customs?.loved_city || "--",
    },
    {
      id: 2,
      key: targetData(selectedProfileData, "i am interested in this country"),
      value: profileData?.customs?.loved_country || "--",
    },
    {
      id: 3,
      key: targetData(selectedProfileData, "i am interested in this language"),
      value: profileData?.customs?.loved_language || "--",
    },
  ];
  return (
    <div className=" flex relative flex-col mx-1 justify-between xl:gap-[6px] lg:gap-[6px] sm:h-fit xs:h-fit md:gap-[6px] sm:gap-[6px] xs:gap-[6px]  dark:bg-black  bg-[#e9eef8] ">
      <ProfileDetailsDetails itemsProfileDetails={itemsProfileDetails} />

      <ProfileDetailsInteresting
        itemsInterestedProfileDetails={itemsInterestedProfileDetails}
      />

      <section className="dark:bg-dark-background transition-all duration-300 ease-linear bg-white w-full rounded-[10px] ">
        <div className="flex flex-nowrap xl:p-4 lg:p-4 md:py-4 my-[4px]  justify-between w-full items-center sm:py-5 xs:py-5">
          <p className="font-azarMehr font-medium text-gray sm:text-[13px] xl:text-[13px] lg:text-[11px] md:text-[9px] sm:mx-[2px] md:mx-[1px] xs:mx-3">
            {targetData(
              selectedProfileData,
              "if you had the ability to solve a problem, what would it be?"
            )}
          </p>
          <span
            className="dark:text-dark-yellow font-azarMehr max-sm:text-[13px] cursor-pointer text-blueLink font-medium xl:text-[14px] lg:text-[14px] md:text-[13px] sm:mx-3 xs:mx-3 md:mx-[2px]"
            onClick={() =>
              submitModalCard(
                targetData(
                  selectedProfileData,
                  "if you had the ability to solve a problem, what would it be?"
                ),
                ""
              )
            }
          >
            {targetData(selectedProfileData, "view")}
          </span>
        </div>
      </section>

      <section className="dark:bg-dark-background transition-all duration-300 ease-linear bg-white   w-full rounded-[10px] ">
        <div className="flex flex-nowrap justify-between xl:p-4 lg:p-4 my-[4px] w-full items-center md:py-3 sm:py-5  xs:py-5 ">
          <p className="font-azarMehr font-medium max-sm:text-[13px] text-gray xl:text-[14px] lg:text-[14px] md:text-[12px] md:mx-[2px] sm:mx-3 xs:mx-3">
            {targetData(selectedProfileData, "forecast 2022")}
          </p>
          <span
            className="dark:text-dark-yellow font-azarMehr max-sm:text-[13px] cursor-pointer text-blueLink font-medium xl:text-[14px] lg:text-[14px] md:text-[13px] md:mx-[2px] sm:mx-3 xs:mx-3"
            onClick={() =>
              submitModalCard(
                targetData(selectedProfileData, "forecast 2022"),
                profileData?.customs?.prediction
              )
            }
          >
            {targetData(selectedProfileData, "view")}
          </span>
        </div>
      </section>

      <section className="dark:bg-dark-background  transition-all duration-300 ease-linear bg-white  w-full rounded-[10px]">
        <div className="flex flex-nowrap justify-between  xl:p-4 lg:p-4 my-[4px] w-full items-center md:py-3 sm:py-5   xs:py-5 ">
          <p className="font-azarMehr font-medium text-gray max-sm:text-[13px] xl:text-[14px] lg:text-[14px] md:text-[12px] md:mx-[2px] sm:mx-3 xs:mx-3">
            {targetData(selectedProfileData, "pleasant memory")}
          </p>
          <span
            className="dark:text-dark-yellow font-azarMehr max-sm:text-[13px] cursor-pointer text-blueLink font-medium xl:text-[14px] lg:text-[14px] md:text-[13px] md:mx-[2px] sm:mx-3 xs:mx-3"
            onClick={() =>
              submitModalCard(
                targetData(selectedProfileData, "pleasant memory"),
                profileData?.customs?.memory
              )
            }
          >
            {targetData(selectedProfileData, "view")}
          </span>
        </div>
      </section>

      <section className=" dark:bg-dark-background bg-white  transition-all duration-300 ease-linear  w-full rounded-[10px]">
        <div className="flex flex-nowrap justify-between  xl:p-4 lg:p-4 my-[4px] md:px-1 w-full items-center md:py-3 sm:py-5 xs:py-5 ">
          <p className="font-azarMehr font-medium text-gray max-sm:text-[13px] xl:text-[14px] lg:text-[14px] md:text-[12px] md:mx-[2px] sm:mx-3 xs:mx-3">
            {targetData(selectedProfileData, "favorites")}
          </p>
          <span
            className="dark:text-dark-yellow cursor-pointer sm:text-[13px] font-azarMehr text-blueLink font-medium xl:text-[14px] lg:text-[14px] md:text-[13px] md:mx-[2px] sm:mx-3 xs:mx-3"
            onClick={() =>
              submitModalCard(
                targetData(selectedProfileData, "favorites"),
                "passions"
              )
            }
          >
            {targetData(selectedProfileData, "view")}
          </span>
        </div>
      </section>
    </div>
  );
}
