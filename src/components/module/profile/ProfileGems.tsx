import Image from "next/image"
import { Tooltip as ReactTooltip } from "react-tooltip";
import { motion } from "framer-motion";
const ProfileGems=({profileData}:any)=>{

    return (
      <div className=" w-full  flex flex-col justify-start items-center 3xl:gap-10 xl:gap-0 md:gap-5 sm:gap-5 xs:gap-5">
        <hr className="h-[2px] w-[95%]  bg-gradient-to-r from-[#DADADA00] via-[#b3b3b3] to-[#DADADA00] text-lightGray " />
        {profileData && profileData.current_level && (
          <motion.div
            initial={{ rotate: 180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className=" w-full flex flex-nowrap  lg:mt-2 md:mt-2 items-center justify-evenly pb-3 "
          >
            {profileData?.achieved_levels?.map((item: any, index: any) => (
              <div  key={index}>
                <Image
                  data-tooltip-id={item.name}
                 
                  src={item.image}
                  width={100}
                  height={100}
                  alt={profileData?.code}
                  className="inline-block  cursor-pointer transition-transform duration-500 ease-in-out hover:-translate-y-1
                3xl:w-24 3xl:h-24
                  xl:w-14 xl:h-14
                lg:w-14 
                md:w-14 
                sm:w-14
                xs:w-14
                "
                />
                <ReactTooltip id={item.name} place="top" content={item.name} />
              </div>
            ))}
            {profileData && profileData.current_level && (
              <>
                <Image
                  data-tooltip-id={profileData.current_level.name}
                  src={profileData.current_level.image}
                  width={200}
                  height={200}
                  alt={profileData?.code}
                  className=" inline-block cursor-pointer  transition-transform duration-500 ease-in-out hover:-translate-y-1
                  3xl:w-24 3xl:h-24
                  xl:w-14 xl:h-14
                lg:w-14 
                md:w-14 
                sm:w-14
                xs:w-14
                "
                />
                <ReactTooltip
                  id={profileData.current_level.name}
                  place="top"
                  content={profileData.current_level.name}
                />
              </>
            )}
          </motion.div>
        )}
      </div>
    );
}


export default ProfileGems;