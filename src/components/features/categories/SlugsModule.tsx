import Link from "next/link";

export default function SlugsModule({ params, categoryName }: any) {
  return (
    <>
      <div className="flex flex-row justify-start items-center gap-2 w-full  relative z-50">
        <Link
          href={`/${params.lang}/education`}
          className="w-fit ms-5 font-normal font-azarMehr text-[15px] text-start text-[#575757] cursor-pointer  hover:text-blueLink hover:dark:text-dark-yellow"
        >
          آموزش
        </Link>
        <span className="text-[#575757] font-normal font-azarMehr text-[15px]">
          /
        </span>
        <Link
          href={`/${params.lang}/education/category`}
          className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] text-start text-[#575757]  hover:text-blueLink hover:dark:text-dark-yellow"
        >
          دسته بندی ها
        </Link>
        <span className="text-[#575757] font-normal font-azarMehr text-[15px]">
          /
        </span>
        <p className="w-fit font-normal font-azarMehr text-[15px] text-start text-blueLink dark:text-dark-yellow">
          {categoryName}
        </p>
      </div>
    </>
  );
}
