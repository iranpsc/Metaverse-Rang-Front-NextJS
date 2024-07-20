import { useContext, useEffect } from "react";
import { LangContext } from "@/context/LangContext";
import { targetData } from "@/utils/targetDataName";
import ProfileDetailsDetails from "@/module/profileDetails/ProfileDetailsDetails";
import ProfileDetailsInteresting from "@/module/profileDetails/ProfileDetailsInteresting";
import ProfileReadMore from "../module/profileDetails/ProfileReadMore";

export default function ProfileDetails({ setShowModal, setDataModal }: any) {
  const { data, profileData ,languageSelected} = useContext(LangContext);

   const x = profileData?.customs?.prediction;
  
  
  const submitModalCard = (title: any, data: any, type: string) => {
    
    if (data) {
      setDataModal({
        title,
        desc: data,
        type,
      });
      setShowModal(true);
    } else {
      // setDataModal({ title:"", desc:"" });
    }
  };

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
      value:
        languageSelected.code === "fa"
          ? profileData?.kyc?.address
            ? profileData.kyc.address.slice(0, 25) + " ... "
            : "--"
          : profileData?.kyc?.address
          ? " ... " + profileData.kyc.address.slice(0, 25)
          : "--",
      fValue: profileData?.kyc?.address,
    },
    {
      id: 5,
      key: targetData(data.data.selectedProfileData, "job"),
      value:
        profileData?.customs?.occupation &&
        profileData.customs.occupation.length > 23
          ? profileData.customs.occupation.slice(0, 23) + " ... "
          :" ... "+ profileData?.customs?.occupation || "--",
      fValue: profileData?.customs?.occupation,
    },
    {
      id: 6,
      key: targetData(data.data.selectedProfileData, "trainings"),
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
    <div className=" 3xl:h-screen xl:h-screen lg:h-screen md:h-fit sm:h-fit xs:h-fit relative flex flex-col justify-between 3xl:gap-[10px] xl:gap-[6px] lg:gap-[4px] sm:gap-[10px] xs:gap-[10px] items-center dark:bg-black bg-[#e9eef8] ">
      <ProfileDetailsDetails itemsProfileDetails={itemsProfileDetails} />

      <ProfileDetailsInteresting
        itemsInterestedProfileDetails={itemsInterestedProfileDetails}
      />

      <ProfileReadMore
        setShowModal={setShowModal}
        setDataModal={setDataModal}
      />
    </div>
  );
}
