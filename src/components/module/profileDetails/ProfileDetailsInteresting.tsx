
export default function ProfileDetailsInteresting({ itemsInterestedProfileDetails }:any) {
  return (
    <>
      <section className="dark:bg-dark-background lg:basis-3/12 md:basis-2/12 flex flex-col justify-evenly max-md:gap-4 transition-all duration-300 ease-linear bg-white w-full rounded-md">
        {itemsInterestedProfileDetails.map((item: any): any => (
          <div
            key={item.id}
            className="flex flex-nowrap px-3 py-[6px] xl:mt-3 lg:mt-1 xl:mb-3 lg:mb-0 md:mt-0 md:mb-0 justify-between items-center "
          >
            <p className="font-azarMehr font-medium  xl:text-sm lg:text-[12px] md:text-[12px] max-sm:text-[13px] text-gray">
              {item.key}
            </p>
            <hr className="xl:w-[25%] lg:w-[20%] md:w-[15%] h-[1px] border border-dashed  text-lightGray dark:text-dark-lightWhite" />
            <p className="dark:text-dark-gray font-azarMehr font-semibold max-sm:text-[13px] xl:text-[12px] lg:text-[12px] md:text-[11px] text-black">
              {item.value}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}