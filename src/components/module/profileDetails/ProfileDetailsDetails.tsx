
export default function ProfileDetailsDetails({ itemsProfileDetails }: any) {
  return (
    <>
      <section
        className="dark:bg-dark-background  xl:basis-2/5 lg:basis-2/5 md:basis-2/4 flex flex-col justify-evenly items-center gap-2 transition-all duration-300 ease-linear bg-white w-full rounded-[10px]  xl:pb-3  lg:pb-3 md:pb-3  xl:gap-2 lg:gap-2 md:gap-6 xl:mt-0
      lg:mt-0 md:mt-0 sm:mt-2 xs:mt-2
      "
      >
        {itemsProfileDetails.map((item: any): any => (
          <div
            key={item.id}
            className="flex flex-nowrap px-3 xl:mt-4 lg:mt-4 md:mt-2 sm:mt-1 xs:mt-1 justify-between w-full items-center
            xl:py-[4px] lg:py-[4px] md:py-[4px] sm:py-[5px] xs:py-[5px]
            "
          >
            <p className="font-azarMehr font-medium xl:text-[14px] lg:text-[14px] md:text-[12px] text-gray max-sm:text-[13px]">
              {item.key}
            </p>
            <hr className="xl:w-[40%] lg:w-[30%] max-md:w-[20%] h-[1px]  border border-dashed text-lightGray dark:text-dark-lightWhite" />

            <div className="group relative flex justify-center">
              <p className="dark:text-dark-gray text-end font-azarMehr font-semibold  xl:text-[14px] lg:lg:text-[14px] md:text-[12px] max-sm:text-[13px]  text-black">
                {item.value}
              </p>
              <span className="absolute right-0 bg-[#cecece] rounded-sm text-center w-max p-2 top-6 scale-0 font-azarMehr font-semibold text-xs text-black group-hover:scale-100">
                {item.fValue}
              </span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}