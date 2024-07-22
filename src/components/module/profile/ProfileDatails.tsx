"use client";
import { useContext, useEffect } from "react";
import { targetData } from "@/utils/targetDataName";
import SecondDetails from "@/components/module/profile/secondDetails";
import DetailsInterest from "@/components/module/profile/detailsInterest";
import ReadMore from "@/components/module/profile/detailsReadMore";

export default function ProfileDetails({
  setShowModal,
  setDataModal,
  profileData,
  userProperty,
  languageSelected,
}: any) {
  // const { data, profileData.data, languageSelected } = useContext(LangContext);

  const x = profileData.data?.customs?.prediction;

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
      key: targetData(userProperty, "date of birth"),
      value: profileData.data?.kyc?.birth_date || "--",
      fValue: profileData.data?.kyc?.birth_date || "--",
    },
    {
      id: 2,
      key: targetData(userProperty, "phone number"),
      value: profileData.data?.kyc?.phone?.slice(0, 25) || "--",
      fValue: profileData.data?.kyc?.phone || "--",
    },
    {
      id: 3,
      key: targetData(userProperty, "email"),
      value: profileData.data?.kyc?.email?.slice(0, 25) || "--",
      fValue: profileData.data?.kyc?.email,
    },
    {
      id: 4,
      key: targetData(userProperty, "address"),
      value:
        languageSelected === "fa"
          ? profileData.data?.kyc?.address
            ? profileData.data.kyc.address.slice(0, 25) + " ... "
            : "--"
          : profileData.data?.kyc?.address
          ? " ... " + profileData.data.kyc.address.slice(0, 25)
          : "--",
      fValue: profileData.data?.kyc?.address,
    },
    {
      id: 5,
      key: targetData(userProperty, "job"),
      value:
        profileData.data?.customs?.occupation &&
        profileData.data.customs.occupation.length > 23
          ? profileData.data.customs.occupation.slice(0, 23) + " ... "
          : " ... " + profileData.data?.customs?.occupation || "--",
      fValue: profileData.data?.customs?.occupation,
    },
    {
      id: 6,
      key: targetData(userProperty, "trainings"),
      value: profileData.data?.customs?.education?.slice(0, 25) || "--",
      fValue: profileData.data?.customs?.education,
    },
  ];

  const itemsInterestedProfileDetails = [
    {
      id: 1,
      key: targetData(userProperty, "i love this city"),
      value: profileData.data?.customs?.loved_city || "--",
      // value: "Kohgiluyeh and Boyer-Ahmad Kohgiluyeh" || "--",
    },
    {
      id: 2,
      key: targetData(userProperty, "i am interested in this country"),
      value: profileData.data?.customs?.loved_country || "--",
    },
    {
      id: 3,
      key: targetData(userProperty, "i am interested in this language"),
      value: profileData.data?.customs?.loved_language || "--",
    },
  ];
  return (
    <div className=" 3xl:h-screen xl:h-screen lg:h-screen md:h-fit sm:h-fit xs:h-fit relative flex flex-col justify-between 3xl:gap-[10px] xl:gap-[6px] lg:gap-[4px] sm:gap-[10px] xs:gap-[10px] items-center dark:bg-black bg-[#e9eef8] ">
      <SecondDetails itemsProfileDetails={itemsProfileDetails} />

      <DetailsInterest
        itemsInterestedProfileDetails={itemsInterestedProfileDetails}
      />

      <ReadMore
        setShowModal={setShowModal}
        setDataModal={setDataModal}
        profileData={profileData}
        userProperty={userProperty}
      />
    </div>
  );
}
