import Image from "next/image";
import { ShowAll } from "@/components/svgs/SvgEducation";
import Link from "next/link";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default function EducationCategories({
  categoriesData,
  mainData,
  params,
}: any) {
  return (
    <>
      <div className="w-[95%] h-fit mt-36 flex flex-col justify-center items-center ">
        <h1 className="w-full   text-center xl:text-start text-[30px]  font-bold font-azarMehr text-gray dark:text-dark-gray">
          {findByUniqueId(mainData, 270)}
        </h1>
        <div className="mt-10 grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 sm:place-items-center xs:place-items-center  xs:gap-x-1 w-full gap-3">
          {categoriesData &&
            categoriesData.map((item: any) => (
              <Link
                href={`/${params.lang}/education/category/${item.slug}`}
                key={item.id}
                className="col-span-1 cursor-pointer shadow-sm hover:dark:shadow-dark  transition-all duration-300 2xl:w-full xl:w-full lg:w-full md:w-full  sm:w-[200px] xs:w-[170px] h-[80px] bg-[#fff] dark:bg-[#1A1A18]  rounded-[20px] flex flex-row justify-center items-center gap-5 xs:gap-1 hover:shadow-md"
                // onClick={() => pusher(item.slug)}
              >
                <Image
                  className="w-[32px] h-[32px] xs:w-[28px] xs:h-[28px]"
                  src={item.image}
                  alt={item.slug}
                  width={1000}
                  height={1000}
                />
                <p className="dark:text-white text-black text-[18px] xs:text-[15px] font-medium font-azarMehr xs:max-w-[85px] text-center">
                  {item.name}
                </p>
              </Link>
            ))}

          <Link
            href={`/${params.lang}/education/category/all`}
            className="col-span-1 cursor-pointer 2xl:w-full xl:w-full lg:w-full md:w-full  sm:w-[200px] xs:w-[200px]   h-[80px] bg-white dark:bg-[#1A1A18] rounded-[20px] flex flex-row justify-center items-center gap-5 shadow-sm hover:shadow-md"
            // onClick={() => pusher("all")}
          >
            <ShowAll className="w-[18px] h-[18px] stroke-blueLink   dark:dark:stroke-dark-yellow" />
            <p className="text-[18px]  xs:text-[15px] font-medium text-blueLink dark:text-dark-yellow font-azarMehr xs:max-w-[85px] text-center">
              {findByUniqueId(mainData, 170)}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
