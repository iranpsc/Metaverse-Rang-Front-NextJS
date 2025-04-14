"use client";
import React, { useState, useEffect, useRef } from "react";
import { targetData } from "@/utils/targetDataName";
import SecondDetails from "@/components/module/profile/secondDetails";
import DetailsInterest from "@/components/module/profile/detailsInterest";
import ReadMore from "@/components/module/profile/detailsReadMore";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default function ProfileDetails({
  setShowModal,
  setDataModal,
  profileData,
  // userProperty,
  languageSelected,
  mainData,
}: any) {
  // const { data, profileData.data, languageSelected } = useContext(LangContext);
  const [inView, setInView] = useState(true);
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);
  const x = profileData.data?.customs?.prediction;

  // IntersectionObserver to load iframe when it's in view
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const entry = entries[0];
  //       if (entry.isIntersecting) {
  //         setInView(true); // Trigger iframe load when in view
  //       }
  //     },
  //     {
  //       rootMargin: "0px",
  //       threshold: 0.1, // Trigger when 10% of the iframe is in view
  //     }
  //   );

  //   if (iframeContainerRef.current) {
  //     observer.observe(iframeContainerRef.current); // Observe the iframe container
  //   }

  //   return () => {
  //     if (iframeContainerRef.current) {
  //       observer.unobserve(iframeContainerRef.current); // Cleanup observer
  //     }
  //   };
  // }, []);

  // const submitModalCard = (title: any, data: any, type: string) => {
  //   if (data) {
  //     setDataModal({
  //       title,
  //       desc: data,
  //       type,
  //     });
  //     setShowModal(true);
  //   } else {
  //     // setDataModal({ title:"", desc:"" });
  //   }
  // };

  const itemsProfileDetails = [
    {
      id: 1,
      // key: targetData(userProperty, "date of birth"),
      key: findByUniqueId(mainData, 83),
      value: profileData.data?.kyc?.birth_date || "--",
      fValue: profileData.data?.kyc?.birth_date || "--",
    },
    {
      id: 2,
      // key: targetData(userProperty, "phone number"),
      key: findByUniqueId(mainData, 84),
      value: profileData.data?.kyc?.phone?.slice(0, 25) || "--",
      fValue: profileData.data?.kyc?.phone || "--",
    },
    {
      id: 3,
      // key: targetData(userProperty, "email"),
      key: findByUniqueId(mainData, 85),
      value: profileData.data?.kyc?.email?.slice(0, 25) || "--",
      fValue: profileData.data?.kyc?.email,
    },
    {
      id: 4,
      // key: targetData(userProperty, "address"),
      key: findByUniqueId(mainData, 59),
      value: profileData.data?.kyc?.address
        ? profileData.data?.kyc?.address.slice(0, 23) +
          (profileData.data?.kyc?.address.length > 23 ? "..." : "")
        : "--",
      fValue: profileData.data?.kyc?.address,
    },
    {
      id: 5,
      // key: targetData(userProperty, "job"),
      key: findByUniqueId(mainData, 86),
      value: profileData.data?.customs?.occupation
        ? profileData.data.customs?.occupation.slice(0, 23) +
          (profileData.data.customs?.occupation.length > 23 ? "..." : "")
        : "--",
      // languageSelected === "fa"
      //   ? profileData.data?.customs?.occupation
      //     ? `${profileData.data.customs?.occupation.slice(0, 23)}
      //       `
      // : // profileData.data.customs?.occupation.slice(0, 23) + profileData.data.customs?.occupation.length >
      // 23
      // ? " ... "
      // : ""
      // "--"
      // : "", // en
      // profileData.data?.customs?.occupation
      // ? profileData.data.customs?.occupation.length > 23
      //   ? " ... "
      //   : "" + profileData.data.customs?.occupation.slice(0, 23)
      // : "--",

      fValue: profileData.data?.customs?.occupation,
    },
    {
      id: 6,
      // key: targetData(userProperty, "trainings"),
      key: findByUniqueId(mainData, 87),
      value: profileData.data?.customs?.education?.slice(0, 25) || "--",
      fValue: profileData.data?.customs?.education,
    },
  ];

  const itemsInterestedProfileDetails = [
    {
      id: 1,
      // key: targetData(userProperty, "i love this city"),
      key: findByUniqueId(mainData, 88),
      value: profileData.data?.customs?.loved_city || "--",
      // value: "Kohgiluyeh and Boyer-Ahmad Kohgiluyeh" || "--",
    },
    {
      id: 2,
      // key: targetData(userProperty, "i am interested in this country"),
      key: findByUniqueId(mainData, 89),
      value: profileData.data?.customs?.loved_country || "--",
    },
    {
      id: 3,
      // key: targetData(userProperty, "i am interested in this language"),
      key: findByUniqueId(mainData, 90),
      value: profileData.data?.customs?.loved_language || "--",
    },
  ];
  return (
    <div
      ref={iframeContainerRef}
      className=" 3xl:h-screen xl:h-screen lg:h-screen md:h-fit sm:h-fit xs:h-fit flex flex-col justify-between gap-[6px] items-center dark:bg-black bg-[#e9eef8] "
    >
      {inView && (
        <>
          <SecondDetails itemsProfileDetails={itemsProfileDetails} />

          <DetailsInterest
            itemsInterestedProfileDetails={itemsInterestedProfileDetails}
          />

          <ReadMore
            setShowModal={setShowModal}
            setDataModal={setDataModal}
            profileData={profileData}
            // userProperty={userProperty}
            mainData={mainData}
          />
        </>
      )}
    </div>
  );
}
