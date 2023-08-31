import { useContext } from "react";
import Image from "next/image";
import { LangContext } from "@/components/context/LangContext";
import { targetData } from "@/components/utils/targetDataName";

export default function ProfileAbout({ setShowModal }: any) {
  const { selectedProfileData, profileData } = useContext(LangContext);
  return (
    <section className=" flex flex-col justify-between  items-center h-fit">
      <div className="dark:bg-dark-background w-full h-[250px] transition-all duration-300 ease-linear bg-white px-1 rounded-md pb-3">
        <h1 className="dark:text-white  font-azarMehr font-extrabold text-[20px] text-black mt-7 mx-2 xl:text-md lg:text-sm md:text-sm ">
          {targetData(selectedProfileData, "about me")}
        </h1>
        <p className=" font-azarMehr mt-2  xl:leading-[30px] lg:leading-[20px] md:leading-[15px] line-clamp-4 mx-1 text-justify font-medium xl:text-[12px] lg:text-[10px] md:text-[10px]  text-gray">
          {profileData?.customs?.about}
        </p>
        <span
          className="dark:text-dark-yellow mx-2 text-blueLink font-azarMehr font-medium cursor-pointer  xl:text-md lg:text-md md:text-sm "
          onClick={() => setShowModal(true)}
        >
          Read More
        </span>
        <br />
        <br />
      </div>
      <div className="dark:bg-dark-background min-h-screen bg-white transition-all duration-300 ease-linear  items-center flex flex-col justify-start mt-2 w-full rounded-md  p-2">
        <Image
          src="/profile/position.png"
          width={1000}
          height={1000}
          alt="profile"
          className="w-[135px] mt-10 object-cover"
        />
      </div>
    </section>
  );
}
