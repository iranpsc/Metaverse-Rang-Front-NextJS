import { useRouter } from "next/router";
import Link from "next/link";

export default function SingleVideoSlugModule({
  categoryName,
  DataVideo,
}: any) {
  const router = useRouter();
  const { lang } = router.query;
  return (
    <>
      <div className="flex flex-wrap xs:px-3 justify-start items-center gap-2 xs:gap-4 w-full h-fit pt-5 bg-white dark:bg-singleVideo-dark-background">
        <p
          className="w-fit ps-5 font-normal font-azarMehr text-[15px] xs:text-[12px] text-start text-[#575757] dark:text-singleVideo-dark-text cursor-pointer  hover:text-blueLink hover:dark:text-dark-yellow"
          onClick={() => router.push(`/${lang}/education`)}
        >
          آموزش
        </p>

        <span className="text-[#575757] font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>

        <p
          className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] xs:text-[12px] text-start text-[#575757]  hover:text-blueLink hover:dark:text-dark-yellow xs:whitespace-nowrap"
          onClick={() => router.push(`/${lang}/education/category/all`)}
        >
          دسته بندی ها
        </p>

        <span className="text-[#575757] font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>

        <p
          className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] xs:text-[12px] text-start text-[#575757]  hover:text-blueLink hover:dark:text-dark-yellow xs:whitespace-nowrap"
          onClick={() =>
            router.push(
              `/${lang}/education/category/${DataVideo.category.slug}`
            )
          }
        >
          {DataVideo.category.name}
        </p>

        <span className="text-[#575757] font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>

        <p
          className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] xs:text-[12px] text-start text-[#575757]  hover:text-blueLink hover:dark:text-dark-yellow xs:whitespace-nowrap"
          onClick={() =>
            router.push(
              `/${lang}/education/category/${DataVideo.category.slug}/${DataVideo.sub_category.slug}`
            )
          }
        >
          {DataVideo.sub_category.name}
        </p>

        <span className="text-[#575757] font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>
        <p className="w-fit font-normal font-azarMehr text-[15px]  xs:text-[12px] text-start text-blueLink dark:text-dark-yellow xs:whitespace-nowrap">
          {DataVideo.title}
        </p>
      </div>
    </>
  );
}
