
export default function ProfileDetailsInteresting({ itemsInterestedProfileDetails }:any) {
  return (
    <>
      <section className="dark:bg-dark-background xl:basis-3/12 lg:basis-3/12 md:basis-2/12 flex flex-col justify-evenly transition-all duration-300 ease-linear bg-white w-full rounded-[10px] lg:py-0 xl:py-0 md:py-0 sm:py-5 xs:py-5">
        {itemsInterestedProfileDetails.map((item: any): any => (
          <div
            key={item.id}
            className="flex flex-nowrap px-3 py-[4.5px] xl:mt-3 lg:mt-2 xl:mb-3 lg:mb-3 md:mt-3 md:mb-4 justify-between items-center sm:mb-3 xs:mb-3"
          >
            <p className="font-azarMehr font-medium  xl:text-[14px] lg:text-[13px] md:text-[12px] max-sm:text-[13px] text-gray dark:text-white">
              {item.key}
            </p>
            <hr className="xl:w-[25%] lg:w-[25%] xl:visible lg:visible md:invisible h-[1px] border border-dashed  text-[#bdbbbb] dark:text-[#6e6d6d]" />
            <p className="dark:text-dark-gray font-azarMehr  font-semibold max-sm:text-[13px] xl:text-[14px] lg:text-[12px] md:text-[12px] text-black">
              {item.value}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}