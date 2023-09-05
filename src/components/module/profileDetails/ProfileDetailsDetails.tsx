
export default function ProfileDetailsDetails({ itemsProfileDetails }: any) {
  return (
    <>
      <section className="dark:bg-dark-background  lg:basis-2/5 md:basis-2/4 flex flex-col justify-evenly items-center max-md:gap-4 transition-all duration-300 ease-linear bg-white w-full rounded-md pb-5 lg:pb-3">
        {itemsProfileDetails.map((item: any): any => (
          <div
            key={item.id}
            className="flex flex-nowrap px-3 py-[3px] xl:mt-3 lg:mt-3  justify-between w-full items-center "
          >
            <p className="font-azarMehr font-medium xl:text-sm lg:text-[12px] md:text-[11px]  text-gray max-sm:text-[13px]">
              {item.key}
            </p>
            <hr className="xl:w-[40%] lg:w-[30%] md:w-[20%] h-[1px]  border border-dashed text-lightGray dark:text-dark-lightWhite" />

            <div className="group relative flex justify-center">
              <p className="dark:text-dark-gray text-end font-azarMehr font-semibold  xl:text-[12px] lg:lg:text-[12px] md:text-[11px] max-sm:text-[13px]  text-black">
                {item.value}
              </p>
              <span className="absolute right-0 bg-black rounded-sm text-center w-max p-1 top-6 scale-0  text-xs text-white group-hover:scale-100">
                {item.fValue}
              </span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}