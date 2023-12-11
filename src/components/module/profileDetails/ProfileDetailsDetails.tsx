import { motion } from "framer-motion";
export default function ProfileDetailsDetails({ itemsProfileDetails }: any) {
 
  



 
  return (
    <>
      <motion.section
        transition={{
          ease: "linear",
          duration: 2,
          x: { duration: 1 },
        }}
        className=" dark:bg-dark-background flex flex-col justify-evenly items-center 3xl:gap-6 xl:gap-3 lg:gap-3 sm:gap-4 xs:gap-4 3xl:py-5 sm:py-3 xs:py-3  transition-all duration-300 ease-linear bg-white w-full rounded-[10px]"
      >
        {itemsProfileDetails.map((item: any, i: number): any => (
          <div
            key={i}
            className="flex flex-row px-3 xl:mt-3 lg:mt-3 md:mt-2 sm:mt-1 xs:mt-1 justify-between w-full items-center
            xl:py-[4px] lg:py-[4px] md:py-[4px] sm:py-[5px] xs:py-[5px]
            "
          >
            <p className="font-azarMehr 3xl:text-xl3Title lg:text-lgTitle  xl:text-xlTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle font-medium  text-[#000] dark:text-white">
              {item.key}
            </p>
            <hr className="flex-grow mx-3 h-[1px] xl:visible lg:visible md:invisible sm:invisible xs:invisible border border-dashed text-[#000] opacity-10 dark:text-[#fff]" />

            <div className="group relative flex justify-center">
              <p className="dark:text-dark-gray text-end font-azarMehr font-semibold 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc  md:text-mdDesc sm:text-smDesc xs:text-smDesc text-gray">
                {item.value}
              </p>
              <span className="absolute right-0 bg-dark-background rounded-sm text-center w-max p-2 top-6 scale-0 font-azarMehr font-semibold text-xs text-white group-hover:scale-100">
                {item.fValue}
              </span>
            </div>
          </div>
        ))}
      </motion.section>
    </>
  );
}
