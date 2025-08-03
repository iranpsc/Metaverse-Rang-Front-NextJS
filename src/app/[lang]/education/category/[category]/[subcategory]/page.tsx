import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically Import Components
const DynamicFooter = dynamic(
  () => import("@/components/module/footer/DynamicFooter"),
  { suspense: true }
);
const SideBar = dynamic(() => import("@/components/module/sidebar/SideBar"), {
  suspense: true,
});
const BreadCrumb = dynamic(() => import("@/components/shared/BreadCrumb"), {
  suspense: true,
});
const SearchComponent = dynamic(
  () => import("@/components/shared/SearchComponent"),
  { suspense: true }
);
const SubcategoryComponent = dynamic(
  () => import("@/components/templates/categories/SubcategoryComponent"),
  { suspense: true }
);

import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getFooterData,
  getLangArray,
  getSubcategoryData,
} from "@/components/utils/actions";

import { getStaticMenu } from "@/components/utils/constants";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default async function EducationSubcategory({
  params,
}: {
  params: any;
}) {
  const [footerTabs, langData, langArray, subCategoryData] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
    getSubcategoryData(params.category, params.subcategory),
  ]);

  const mainData = await getMainFile(langData);

  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = getStaticMenu(params.id);
  // add staticMenuToShow values to siblings tabsMenu values
  const updatedTabsMenu = tabsMenu.map((tab: any) => {
    let findInStatic = staticMenuToShow.find(
      (val) => tab.unique_id === val.unique_id
    );

    if (findInStatic) {
      // Return a new tab object with updated properties
      return {
        ...tab, // Spread the original tab properties
        url: findInStatic.url,
        order: findInStatic.order,
        toShow: true,
      };
    }

    // If no match found, return the original tab
    return tab;
  });

  //to make description less than 200 character
  async function makeLessCharacter(_desc: any) {
    let temp;
    if (_desc) {
      temp = _desc;
      temp = temp.slice(0, 200);
    } else temp = "";
    return temp;
  }

  const subCategorySchema = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: ` ${subCategoryData.name}`,
    url: `https://rgb.irpsc.com/${params.lang
      }/education/category/${decodeURIComponent(params.category)}/${params.subcategory
      }`,
    description: await makeLessCharacter(subCategoryData.description),
    mainEntity: subCategoryData.videos.map((video: any) => ({
      "@type": "VideoObject",
      name: video.title,
      thumbnailUrl: video.image_url,
      contentUrl: `https://rgb.irpsc.com/${params.lang
        }/education/category/${decodeURIComponent(params.category)}/${params.subcategory
        }/video/${video.slug}`,
      uploadDate: video.upload_date || "",
      publisher: {
        "@type": "Organization",
        name: video.creator.name || video.creator.code,
      },
      interactionStatistic: [
        {
          "@type": "InteractionCounter",
          interactionType: "http://schema.org/LikeAction",
          userInteractionCount: video.likes_count,
        },
        {
          "@type": "InteractionCounter",
          interactionType: "http://schema.org/DislikeAction",
          userInteractionCount: video.dislikes_count,
        },
        {
          "@type": "InteractionCounter",
          interactionType: "http://schema.org/WatchAction",
          userInteractionCount: video.views_count,
        },
      ],
    })),
  };

  return (
    <>
      {/* SCHEMA** */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(subCategorySchema),
        }}
      />
      <div className="flex h-screen overflow-hidden" dir={langData.direction}>
        <Suspense
          fallback={<div className="text-center text-[20px]">loading...</div>}
        >
          <SideBar
            tabsMenu={updatedTabsMenu}
            langData={langData}
            langArray={langArray}
            params={params}
            pageSide="citizen"
          />
        </Suspense>
        <section
          className={`w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20 xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1`}
        >
          {/* Breadcrumb */}
          <div className="">
            <Suspense
              fallback={
                <div className="text-center text-[20px]">loading...</div>
              }
            >
              <BreadCrumb params={params} />
            </Suspense>
          </div>

          <p className="text-center mt-10 font-azarMehr dark:text-white text-black font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[14px]">
            {findByUniqueId(mainData, 455)} {subCategoryData.name}
          </p>
          <Suspense
            fallback={<div className="text-center text-[20px]">loading...</div>}
          >
            <SearchComponent
              searchLevel="education"
              mainData={mainData}
              params={params}
            />
          </Suspense>

          <Suspense
            fallback={<div className="text-center text-[20px]">loading...</div>}
          >
            <SubcategoryComponent
              subCategoryData={subCategoryData}
              params={params}
              mainData={mainData}
            />
          </Suspense>

          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <Suspense
              fallback={
                <div className="text-center text-[20px]">loading...</div>
              }
            >
              <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}

// SEO**
export async function generateMetadata({ params }: { params: any }) {
  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);

  const subCategoryData = await getSubcategoryData(
    params.category,
    params.subcategory
  );

  //to make description less than 200 character
  async function makeLessCharacter(_input: string | undefined | null): Promise<string> {
    return _input && typeof _input === 'string' ? _input.slice(0, 200) : '';
  }

  return {
    title: findByUniqueId(mainData, 455) + " " + subCategoryData.name,
    description: await makeLessCharacter(subCategoryData.description),
    openGraph: {
      type: "website",
      // url: `https://yourwebsite.com/posts/${params.id}`,
      title: findByUniqueId(mainData, 455) + " " + subCategoryData.name,
      description: await makeLessCharacter(subCategoryData.description),
      locale: params.lang == "fa" ? "fa_IR" : "en_US",
      // site_name: متاورس رنگ,
      url: `https://rgb.irpsc.com/${params.lang}/education/category/${params.category}`,
      images: [
        {
          url: subCategoryData.image,
          width: 800,
          height: 400,
          // alt: post.title,
        },
      ],
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: post.title,
    //   description: post.description,
    //   images: [post.imageUrl],
    // },
  };
}
