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
        <Link href={`${lang}/education`}>
          <p className="w-fit ps-5 font-normal font-azarMehr text-[15px] xs:text-[12px] text-start text-[#575757] dark:text-singleVideo-dark-text cursor-pointer  hover:text-blueLink hover:dark:text-dark-yellow">
            آموزش
          </p>
        </Link>
        <span className="text-[#575757] font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>
        <Link href={`${lang}/education`}>
          <p
            className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] xs:text-[12px] text-start text-[#575757]  hover:text-blueLink hover:dark:text-dark-yellow xs:whitespace-nowrap"
            onClick={() => router.push(`/${lang}/education/category/all`)}
          >
            دسته بندی ها
          </p>
        </Link>
        <span className="text-[#575757] font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>
        <Link href={`${lang}/education/${DataVideo.category.slug}`}>
          <p
            className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] xs:text-[12px] text-start text-[#575757]  hover:text-blueLink hover:dark:text-dark-yellow xs:whitespace-nowrap"
            onClick={() => router.push(`/${lang}/education/category/all`)}
          >
            {DataVideo.category.name}
          </p>
        </Link>
        <span className="text-[#575757] font-normal font-azarMehr text-[15px] xs:text-[12px]">
          /
        </span>
        <Link href={`${lang}/education/${DataVideo.sub_category.slug}`}>
          <p
            className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] xs:text-[12px] text-start text-[#575757]  hover:text-blueLink hover:dark:text-dark-yellow xs:whitespace-nowrap"
            onClick={() => router.push(`/${lang}/education/category/all`)}
          >
            {DataVideo.sub_category.name}
          </p>
        </Link>
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
