// app/[lang]/levels/citizen/page.tsx

import {
  getAllLevels,
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
} from "@/components/utils/actions";

import Footer from "@/components/shared/footer/Footer";
import LevelsClient from "@/components/features/levels/LevelsClient";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";

/* -------------------------------------------------------------------------- */
/*                                   Metadata                                 */
/* -------------------------------------------------------------------------- */

interface PageParams {
  lang: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}) {
  try {
    const { lang } = await params;

    const levelArray = await getAllLevels();
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    const description =
      findByUniqueId(mainData, 1417)?.slice(0, 200) || "";

    return {
      title: findByUniqueId(mainData, 587),
      description,
      openGraph: {
        type: "website",
        title: findByUniqueId(mainData, 587),
        description,
        locale: lang === "fa" ? "fa_IR" : "en_US",
        url: `https://metarang.com/${lang}/levels/citizen`,
        images: [
          {
            url: levelArray?.[0]?.image || "/logo.png",
            width: 800,
            height: 600,
            alt: findByUniqueId(mainData, 587),
          },
        ],
      },
    };
  } catch (error) {
    console.error("❌ Metadata error (LevelsPage):", error);
    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

interface LevelsPageProps {
  params: Promise<PageParams>;
}

export default async function LevelsPage({ params }: LevelsPageProps) {
  try {
    const resolvedParams = await params;
    const { lang } = resolvedParams;

    /* ----------------------------- Static Data ----------------------------- */

    const staticData = [
      {
        url: "/svg/level/citizen.png",
        score: 10,
        id: 1,
        route_name: "citizen-baguette",
        unique_id: 382,
      },
      {
        url: "/svg/level/reporter.png",
        score: 990,
        id: 2,
        route_name: "reporter-baguette",
        unique_id: 383,
      },
      {
        url: "/svg/level/participation.png",
        score: 3000,
        id: 3,
        route_name: "participation-baguette",
        unique_id: 589,
      },
      {
        url: "/svg/level/developer.png",
        score: 8000,
        id: 4,
        route_name: "developer-baguette",
        unique_id: 68,
      },
      {
        url: "/svg/level/inspector.png",
        score: 18000,
        id: 5,
        route_name: "inspector-baguette",
        unique_id: 69,
      },
      {
        url: "/svg/level/businessman.png",
        score: 36000,
        id: 6,
        route_name: "businessman-baguette",
        unique_id: 590,
      },
      {
        url: "/svg/level/lawyer.png",
        score: 76000,
        id: 7,
        route_name: "lawyer-baguette",
        unique_id: 71,
      },
      {
        url: "/svg/level/city-council.png",
        score: 166000,
        id: 8,
        route_name: "city-council-baguette",
        unique_id: 591,
      },
      {
        url: "/svg/level/the-mayor.png",
        score: 366000,
        id: 9,
        route_name: "the-mayor-baguette",
        unique_id: 592,
      },
      {
        url: "/svg/level/governor.png",
        score: 796000,
        id: 10,
        route_name: "governor-baguette",
        unique_id: 74,
      },
      {
        url: "/svg/level/minister.png",
        score: 1696000,
        id: 11,
        route_name: "minister-baguette",
        unique_id: 75,
      },
      {
        url: "/svg/level/judge.png",
        score: 3696000,
        id: 12,
        route_name: "judge-baguette",
        unique_id: 76,
      },
      {
        url: "/svg/level/legislator.png",
        score: 7896000,
        id: 13,
        route_name: "legislator-baguette",
        unique_id: 77,
      },
    ];

    /* ----------------------------- Fetch Data ------------------------------ */

    const [
      levelArray,
      langData,
    ] = await Promise.all([
      getAllLevels(),
      getTranslation(lang),
    ]);

    const mainData = await getMainFile(langData);

    /* -------------------------- Normalize Levels --------------------------- */

    staticData.forEach((el2: any) => {
      levelArray.forEach((el1: any) => {
        if (el1.id == el2.id) {
          el1.photo = el2.url;
          el1.rank = 1;
          el1.score = el2.score;
          el1.route_name = el2.route_name;
          el1.unique_id = el2.unique_id;
        }
      });
    });

    /* ------------------------------ Content -------------------------------- */

    const levelsModal = await findByModalName(mainData, "levels");
    const levelPageArrayContent = await findByTabName(levelsModal, "levels-page");
    const levelListArrayContent = await findByTabName(levelsModal, "level-list");

    const concatArrayContent = [
      ...levelPageArrayContent,
      ...levelListArrayContent,
    ];

    /* ------------------------------ Schema --------------------------------- */

    const levelsSchema = {
      "@context": "https://schema.org/",
      "@type": "ItemList",
      itemListElement: levelArray.map((item: any) => ({
        "@type": "ListItem",
        position: item.id,
        name: item.name,
        url: item.image,
      })),
    };

    /* -------------------------------- Render ------------------------------- */

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(levelsSchema) }}
        />

        <CleanAutoRetryParam />

        <section
          className="h-[calc(100vh-60px)] lg:h-screen overflow-y-auto mt-[60px] lg:mt-0 bg-bgGray dark:bg-black light-scrollbar dark:dark-scrollbar"
          dir={langData.direction}
        >
          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <BreadCrumb params={resolvedParams} />
          </div>

          <div className="mt-[40px] xl:px-32 lg:px-32 px-5 text-center">
            <h2 className="font-rokh font-bold text-[32px] dark:text-white mb-4">
              {findByUniqueId(mainData, 587)}
            </h2>
            <p className="text-lightGrey dark:text-lightGray text-[20px]">
              {findByUniqueId(mainData, 1417)}
            </p>
          </div>

          <div className="flex justify-center flex-wrap mt-8">
            <LevelsClient
              levels={levelArray}
              concatArrayContent={concatArrayContent}
              params={resolvedParams}
              mainData={mainData}
            />
          </div>


          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1 mt-10">
            <Footer
              mainData={mainData}
              params={resolvedParams}
            />
          </div>
        </section>
      </>
    );
  } catch (error) {
    const serializedError = {
      message:
        error instanceof Error ? error.message : "Unknown error",
      stack:
        error instanceof Error ? error.stack : null,
      name:
        error instanceof Error ? error.name : "Error",
    };

    console.error("❌ Error in LevelPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}
