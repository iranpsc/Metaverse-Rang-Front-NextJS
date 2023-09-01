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
      value: profileData?.customs?.occupation.slice(0, 30) || "--",
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
    <div className=" flex flex-col mx-1 justify-between xl:gap-0 lg:gap-2 h-full max-md:h-fit max-md:gap-3">
      <ProfileDetailsDetails itemsProfileDetails={itemsProfileDetails} />

      <ProfileDetailsInteresting
        itemsInterestedProfileDetails={itemsInterestedProfileDetails}
      />

      <section className="dark:bg-dark-background transition-all duration-300 ease-linear bg-white w-full rounded-md ">
        <div className="flex flex-nowrap xl:p-4 lg:p-4 md:py-2 max-md:p-4  justify-between w-full items-center ">
          <p className="font-azarMehr font-medium text-gray max-sm:text-[13px] xl:text-[13px] lg:text-[11px] md:text-[10px]">
            {targetData(
              selectedProfileData,
              "if you had the ability to solve a problem, what would it be?"
            )}
          </p>
          <span
            className="dark:text-dark-yellow font-azarMehr max-sm:text-[13px] cursor-pointer text-blueLink font-medium  xl:text-sm lg:text-[12px] md:text-[13px] "
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

      <section className="dark:bg-dark-background transition-all duration-300 ease-linear bg-white   w-full rounded-md">
        <div className="flex flex-nowrap justify-between xl:p-4 lg:p-4 md:py-2 max-md:p-4 w-full items-center ">
          <p className="font-azarMehr font-medium max-sm:text-[13px] text-gray xl:text-sm lg:text-[12px] md:text-[10px]">
            {targetData(selectedProfileData, "forecast 2022")}
          </p>
          <span
            className="dark:text-dark-yellow font-azarMehr max-sm:text-[13px] cursor-pointer text-blueLink font-medium  xl:text-sm lg:text-[12px] md:text-[13px]"
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

      <section className="dark:bg-dark-background  transition-all duration-300 ease-linear bg-white  w-full rounded-md">
        <div className="flex flex-nowrap justify-between  xl:p-4 lg:p-4 md:py-2 max-md:p-4 w-full items-center  ">
          <p className="font-azarMehr font-medium text-gray max-sm:text-[13px] xl:text-sm lg:text-[12px] md:text-[10px] ">
            {targetData(selectedProfileData, "pleasant memory")}
          </p>
          <span
            className="dark:text-dark-yellow font-azarMehr max-sm:text-[13px] cursor-pointer text-blueLink font-medium  xl:text-sm lg:text-[12px] md:text-[13px]"
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

      <section className="dark:bg-dark-background bg-white  transition-all duration-300 ease-linear  w-full rounded-md">
        <div className="flex flex-nowrap justify-between  xl:p-4 lg:p-4 max-md:p-4 md:px-1 w-full items-center ">
          <p className="font-azarMehr font-medium text-gray max-sm:text-[13px] xl:text-sm lg:text-[12px] md:text-[10px]">
            {targetData(selectedProfileData, "favorites")}
          </p>
          <span
            className="dark:text-dark-yellow cursor-pointer max-sm:text-[13px] font-azarMehr text-blueLink font-medium xl:text-sm lg:text-[12px] md:text-[13px]"
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
