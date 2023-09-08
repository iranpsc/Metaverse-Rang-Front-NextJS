import { useContext } from "react";
import Image from "next/image";
import { LangContext } from "@/components/context/LangContext";
import { targetData } from "@/components/utils/targetDataName";
import ModalCard from "@/components/templates/ModalCard";


export default function ProfileAbout({ setShowModal ,setDataModal}: any) {
  const { selectedProfileData, profileData } = useContext(LangContext);


 
const submitModalCart =(data:any)=>{
  setDataModal({
    title: targetData(selectedProfileData, "about me"),
    desc: data
  });
  setShowModal(true)

}


  

  return (
    <section className="me-1 items-center h-screen xl:mt-0 lg:mt-0 md:mt-0 sm:mt-3 xs:mt-2">
      <div className="dark:bg-dark-background w-full h-[35%] transition-all duration-300 ease-linear bg-white px-1 rounded-[10px] max-sm:mt-[6px]">
        <h1 className="dark:text-white max-sm:mx-3 max-sm:text-[16px]  font-azarMehr font-medium text-[20px] text-gray mx-2 xl:text-md lg:text-sm md:text-sm py-5">
          {targetData(selectedProfileData, "about me")}
        </h1>
        <p className="font-azarMehr max-sm:mx-3 max-sm:text-[13px] text-justify xl:leading-[30px] truncate- lg:leading-[20px] md:leading-[15px] mx-1 font-medium xl:text-[12px] lg:text-[10px] md:text-[10px]  text-gray">
          {profileData?.customs?.about.slice(0, 210)}
          <span className="font-azarMehr font-medium xl:text-[12px]text-gray">
            {" "}
            ...
          </span>
          <span
            className="dark:text-dark-yellow mx-2 text-blueLink md:text-[12px] font-azarMehr font-medium cursor-pointer  xl:text-md lg:text-md"
            onClick={() => submitModalCart(profileData?.customs?.about)}
          >
            {targetData(selectedProfileData, "read more")}
          </span>
        </p>

        <br />
        <br />
      </div>
      <div className="dark:bg-dark-background h-[65%] bg-white transition-all duration-300 ease-linear  items-center flex flex-col justify-center mt-[6px] md:mt-1 w-full rounded-[10px] p-2 md:p-0 ">
        <Image
          src="/profile/position.png"
          width={1000}
          height={1000}
          alt="profile"
          className="xl:w-[160px] lg:w-[150px] md:w-[110px] sm:w-[75px] xs:w-[150px]"
        />
      </div>
    </section>
  );
}
