
export default function ProfileDetailsInteresting({ itemsInterestedProfileDetails }:any) {
  return (
    <>
      <section className="dark:bg-dark-background flex flex-col 3xl:gap-6 xl:gap-1 lg:gap-1 sm:gap-5 xs:gap-5 justify-evenly transition-all duration-300 ease-linear bg-white w-full rounded-[10px] 3xl:py-5 xl:py-1 lg:py-1 md:py-1 sm:py-1 xs:py-1">
        {itemsInterestedProfileDetails.map((item: any): any => (
          <div
            key={item.id}
            className="flex flex-nowrap px-3 py-[4.5px] xl:mt-3 lg:mt-2 xl:mb-3 lg:mb-3 md:mt-3 md:mb-4 justify-between items-center sm:mb-3 xs:mb-3"
          >
            <p className="font-azarMehr font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle text-black dark:text-white">
              {item.key}
            </p>
            <hr className="flex-grow mx-3 xl:visible lg:visible md:invisible sm:invisible xs:invisible h-[1px] border border-dashed  text-[#ooo] opacity-10 dark:text-[#fff]" />
            <p className="dark:text-dark-gray font-azarMehr  font-semibold 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc md:text-mdDesc sm:text-smDesc xs:text-smDesc text-gray">
              {item.value}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}