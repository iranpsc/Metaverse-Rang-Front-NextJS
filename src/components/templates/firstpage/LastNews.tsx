import Link from "next/link";
import { ArrowRight } from "@/components/svgs";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { Skeleton } from "@/components/ui/skeleton";
import { getHomeNews } from "./homeData";
import LatestNewsClient from "./LatestNewsClient";

type Tag = {
  label: string;
  slug: string;
};

type Author = {
  name?: string;
};

export type News = {
  id: number | string;
  title: string;
  slug: string;
  date?: string;
  readingTime?: string;
  image?: string;
  excerpt?: string;
  category?: string;
  categorySlug?: string;
  author?: Author;
  tags?: Tag[] | string[];
  stats: {
    views?: any;
  };
};

interface LatestNewsProps {
  params: {
    lang: string;
  };
  mainData?: any;
  limit?: number;
}

/* =========================
   Skeletons
========================= */

export function FeaturedNewsSkeleton() {
  return (
    <div className="p-1 w-full lg:w-1/2 rounded-md overflow-hidden">
      <div className="relative aspect-square rounded-md overflow-hidden">
        <Skeleton
          tone="standalone"
          variant="rect"
          className="!w-full !h-full !rounded-md"
        />

        <div className="absolute bottom-0 left-0 right-0 p-5 xl:p-[32px] w-full flex flex-col gap-4 items-center">
          <Skeleton className="h-8 w-32 rounded-full" />
          <Skeleton className="h-7 w-4/5 rounded-md" />
          <Skeleton className="h-7 w-3/5 rounded-md" />
          <Skeleton className="h-5 w-3/4 rounded-md" />

          <div className="flex items-center justify-center gap-4 2xl:gap-10 w-full pb-2">
            <Skeleton className="h-4 w-14 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SideNewsItemSkeleton() {
  return (
    <div className="relative bg-white dark:bg-gray-1 lg:!bg-bg-primary rounded-lg h-auto p-4 lg:p-1">
      <div className="flex lg:flex-row flex-col w-full">
        <div className="relative w-full lg:w-[40%] h-[250px] lg:h-[176px] overflow-hidden">
          <Skeleton
            tone="standalone"
            variant="rect"
            className="!w-full !h-full !rounded-lg"
          />
        </div>

        <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-[60%] p-3 lg:ps-5">
          <Skeleton tone="standalone" className="h-8 w-28 rounded-full" />
          <Skeleton tone="standalone" className="h-6 w-full rounded-md" />
          <Skeleton tone="standalone" className="h-6 w-4/5 rounded-md" />

          <div className="flex items-center gap-3">
            <Skeleton tone="standalone" className="h-4 w-20 rounded-md" />
            <Skeleton tone="standalone" className="h-4 w-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LatestNewsSkeleton() {
  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <Skeleton
          tone="standalone"
          className="h-7 md:h-9 w-40 md:w-52 rounded-md"
        />

        <div className="flex items-center gap-3">
          <Skeleton
            tone="standalone"
            className="h-4 md:h-5 w-14 md:w-20 rounded-md"
          />

          <Skeleton
            tone="standalone"
            variant="circle"
            className="!w-5 !h-5 md:!w-6 md:!h-6"
          />
        </div>
      </div>

      <Skeleton
        tone="standalone"
        className="h-5 w-72 rounded-md mb-7"
      />

      <div className="flex flex-col lg:flex-row w-full items-center gap-10">
        <FeaturedNewsSkeleton />

        <div className="flex flex-col gap-[28px] w-full lg:w-1/2">
          <SideNewsItemSkeleton />
          <SideNewsItemSkeleton />
          <SideNewsItemSkeleton />
        </div>
      </div>
    </section>
  );
}

/* =========================
   Server Component
========================= */

const LatestNews = async ({
  params,
  mainData,
  limit = 10,
}: LatestNewsProps) => {
  // کش‌شده (۵ دقیقه) و با ستون‌های لازم؛ در خطا [] برمی‌گرداند.
  const newsData: News[] = await getHomeNews(limit);

  const sortedArticles = [...newsData]
    .sort(
      (a, b) =>
        new Date(b.date || "1300-01-01").getTime() -
        new Date(a.date || "1300-01-01").getTime()
    )
    .slice(0, limit);

  if (sortedArticles.length === 0) {
    return (
      <div className="py-10 text-center dark:text-white">
        خبری برای نمایش وجود ندارد.
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold w-max dark:text-white border border-x-0 border-b-4 pe-7 border-t-0 pb-3 border-primary border-solid">
            {findByUniqueId(mainData, 494) || "آخرین اخبار"}
          </h2>
        </div>

        <Link
          href={`/${params.lang}/news`}
          className="flex justify-center items-center gap-4"
        >
          <p className="font-azarMehr text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
            {findByUniqueId(mainData, 171)}
          </p>

          <ArrowRight
            className={`dark:stroke-white stroke-black rotate-180 w-[24px] h-full ${
              params.lang === "en" ? "ltr:rotate-0" : ""
            }`}
          />
        </Link>
      </div>

      <p className="text-[#A0A0AB] lg:text-lg mb-7">
        {findByUniqueId(mainData, 1639)}
      </p>

      <LatestNewsClient
        articles={sortedArticles}
        params={params}
      />
    </section>
  );
};

export default LatestNews;