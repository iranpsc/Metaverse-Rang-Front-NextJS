import { useRouter } from "next/router";

export default function SlugsModule({ categoryName }: any) {
  const router = useRouter();
  const { lang } = router.query;
  return (
    <>
      <div className="flex flex-row justify-start items-center gap-2 w-full  relative z-50">
        <p
          className="w-fit ms-5 font-normal font-azarMehr text-[15px] text-start text-[#575757] cursor-pointer  hover:text-blueLink hover:dark:text-dark-yellow"
          onClick={() => router.push(`/${lang}/education`)}
        >
          آموزش
        </p>
        <span className="text-[#575757] font-normal font-azarMehr text-[15px]">
          /
        </span>
        <p
          className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] text-start text-[#575757]  hover:text-blueLink hover:dark:text-dark-yellow"
          onClick={() => router.push(`/${lang}/education/category/all`)}
        >
          دسته بندی ها
        </p>
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
