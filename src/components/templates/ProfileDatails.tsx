import { useContext, useEffect } from "react";
import { LangContext } from "@/context/LangContext";
import { targetData } from "@/utils/targetDataName";
import ProfileDetailsDetails  from "@/module/profileDetails/ProfileDetailsDetails";
import ProfileDetailsInteresting from "@/module/profileDetails/ProfileDetailsInteresting";

export default function ProfileDetails({ setShowModal, setDataModal }: any) {
  const { data, profileData } = useContext(LangContext);

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
      key: targetData(data.data.selectedProfileData, "date of birth"),
      value: profileData?.kyc?.birth_date || "--",
      fValue: profileData?.kyc?.birth_date || "--",
    },
    {
      id: 2,
      key: targetData(data.data.selectedProfileData, "phone number"),
      value: profileData?.kyc?.phone?.slice(0, 25) || "--",
      fValue: profileData?.kyc?.phone || "--",
    },
    {
      id: 3,
      key: targetData(data.data.selectedProfileData, "email"),
      value: profileData?.kyc?.email?.slice(0, 25) || "--",
      fValue: profileData?.kyc?.email,
    },
    {
      id: 4,
      key: targetData(data.data.selectedProfileData, "address"),
      value: profileData?.kyc?.address?.slice(0, 25) || "--",
      fValue: profileData?.kyc?.address,
    },
    {
      id: 5,
      key: targetData(data.data.selectedProfileData, "job"),
      value: profileData?.customs?.occupation.slice(0, 25) || "--",
      fValue: profileData?.customs?.occupation,
    },
    {
      id: 6,
      key: targetData(data.data.selectedProfileData, "education"),
      value: profileData?.customs?.education?.slice(0, 25) || "--",
      fValue: profileData?.customs?.education,
    },
  ];


  const itemsInterestedProfileDetails = [
    {
      id: 1,
      key: targetData(data.data.selectedProfileData, "i love this city"),
      value: profileData?.customs?.loved_city || "--",
      // value: "Kohgiluyeh and Boyer-Ahmad Kohgiluyeh" || "--",
    },
    {
      id: 2,
      key: targetData(
        data.data.selectedProfileData,
        "i am interested in this country"
      ),
      value: profileData?.customs?.loved_country || "--",
    },
    {
      id: 3,
      key: targetData(
        data.data.selectedProfileData,
        "i am interested in this language"
      ),
      value: profileData?.customs?.loved_language || "--",
    },
  ];
  return (
    <div className=" h-screen relative flex flex-col justify-between items-center mx-1 pb-[2px] xs:h-fit md:gap-[6px] sm:gap-[6px] xs:gap-[6px] dark:bg-black bg-[#e9eef8] ">
      <ProfileDetailsDetails itemsProfileDetails={itemsProfileDetails} />

      <ProfileDetailsInteresting
        itemsInterestedProfileDetails={itemsInterestedProfileDetails}
      />

      <section className="dark:bg-dark-background transition-all duration-300 ease-linear bg-white w-full rounded-[10px] ">
        <div className="flex flex-nowrap xl:p-4 lg:p-2 md:py-4 my-[4px]  justify-between w-full items-center sm:py-5 xs:py-5">
          <p className="font-azarMehr font-medium text-gray dark:text-white sm:text-[13px] xl:text-[13px] lg:text-[11px] md:text-[9px] sm:mx-[2px] md:mx-[1px] xs:mx-3">
            {targetData(
              data.data.selectedProfileData,
              "if you had the ability to solve a problem, what would it be?"
            )}
          </p>
          <span
            className="dark:text-dark-yellow font-azarMehr max-sm:text-[13px] cursor-pointer text-blueLink font-medium xl:text-[14px] lg:text-[14px] md:text-[13px] sm:mx-3 xs:mx-3 md:mx-[2px]"
            onClick={() =>
              submitModalCard(
                targetData(
                  data.data.selectedProfileData,
                  "if you had the ability to solve a problem, what would it be?"
                ),
                ""
              )
            }
          >
            {targetData(data.data.selectedProfileData, "view")}
          </span>
        </div>
      </section>

      <section className="dark:bg-dark-background transition-all duration-300 ease-linear bg-white   w-full rounded-[10px] ">
        <div className="flex flex-nowrap justify-between xl:p-4 lg:p-2 my-[4px] w-full items-center md:py-3 sm:py-5  xs:py-5 ">
          <p className="font-azarMehr font-medium max-sm:text-[13px] text-gray dark:text-white xl:text-[14px] lg:text-[12px] md:text-[12px] md:mx-[2px] sm:mx-3 xs:mx-3">
            {targetData(data.data.selectedProfileData, "forecast 2022")}
          </p>
          <span
            className="dark:text-dark-yellow font-azarMehr max-sm:text-[13px] cursor-pointer text-blueLink font-medium xl:text-[14px] lg:text-[12px] md:text-[13px] md:mx-[2px] sm:mx-3 xs:mx-3"
            onClick={() =>
              submitModalCard(
                targetData(data.data.selectedProfileData, "forecast 2022"),
                profileData?.customs?.prediction
              )
            }
          >
            {targetData(data.data.selectedProfileData, "view")}
          </span>
        </div>
      </section>

      <section className="dark:bg-dark-background  transition-all duration-300 ease-linear bg-white  w-full rounded-[10px]">
        <div className="flex flex-nowrap justify-between  xl:p-4 lg:p-2 my-[4px] w-full items-center md:py-3 sm:py-5   xs:py-5 ">
          <p className="font-azarMehr font-medium text-gray dark:text-white max-sm:text-[13px] xl:text-[14px] lg:text-[12px] md:text-[12px] md:mx-[2px] sm:mx-3 xs:mx-3">
            {targetData(data.data.selectedProfileData, "pleasant memory")}
          </p>
          <span
            className="dark:text-dark-yellow font-azarMehr max-sm:text-[13px] cursor-pointer text-blueLink font-medium xl:text-[14px] lg:text-[12px] md:text-[13px] md:mx-[2px] sm:mx-3 xs:mx-3"
            onClick={() =>
              submitModalCard(
                targetData(data.data.selectedProfileData, "pleasant memory"),
                profileData?.customs?.memory
              )
            }
          >
            {targetData(data.data.selectedProfileData, "view")}
          </span>
        </div>
      </section>

      <section className=" dark:bg-dark-background bg-white  transition-all duration-300 ease-linear  w-full rounded-[10px]">
        <div className="flex flex-nowrap justify-between  xl:p-4 lg:p-2 my-[4px] md:px-1 w-full items-center md:py-3 sm:py-5 xs:py-5 ">
          <p className="font-azarMehr font-medium text-gray dark:text-white max-sm:text-[13px] xl:text-[14px] lg:text-[12px] md:text-[12px] md:mx-[2px] sm:mx-3 xs:mx-3">
            {targetData(data.data.selectedProfileData, "favorites")}
          </p>
          <span
            className="dark:text-dark-yellow cursor-pointer sm:text-[13px] font-azarMehr text-blueLink font-medium xl:text-[14px] lg:text-[12px] md:text-[13px] md:mx-[2px] sm:mx-3 xs:mx-3"
            onClick={() =>
              submitModalCard(
                targetData(data.data.selectedProfileData, "favorites"),
                "passions"
              )
            }
          >
            {targetData(data.data.selectedProfileData, "view")}
          </span>
        </div>
      </section>
    </div>
  );
}
