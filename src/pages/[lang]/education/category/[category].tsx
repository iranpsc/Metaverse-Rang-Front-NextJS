import { useContext } from "react";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { LangContext } from "@/context/LangContext";
import BaseLayoutEducation from "@/components/layout/BaseLayoutEducation";
import CategoryComponent from "@/components/templates/categories/CategoryComponent";
import axios from "axios";
import { HeaderComponent } from "@/components/templates/categories/HeaderComponent";

const Index = ({
  CategoryData,
  translateData,
  footerTabs,
  localSite,
  nameSite,
}: any) => {
  const { languageSelected } = useContext(LangContext);

  return (
    <>
      <DefaultSeo
        title={nameSite + "|" + CategoryData.name}
        description={CategoryData.description}
        openGraph={{
          title: nameSite + "|" + CategoryData.name,
          locale: localSite,
          siteName: nameSite,
          description: CategoryData.description,
          type: "website",
          url: `http://localhost:5173/fa/education/category/${CategoryData.slug}`,
          images: [
            {
              url: CategoryData.image,
              alt: CategoryData.name,
            },
          ],
        }}
      />
      <Head>
        <title>{CategoryData.name}</title>
        <meta
          name="description"
          content={CategoryData.description}
          key="desc"
        />
        <meta
          name="google-site-verification"
          content="lmf8kBJQgLHew_wXcxGQwJQWiOSFy8odEBRTLOoX7Q4"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <section
        dir={languageSelected.dir}
        className={`relative w-full`}
        id="light-scrollbar"
      >
        <BaseLayoutEducation translateData={translateData}>
          <div className="w-full overflow-y-auto overflow-x-clip relative">
            <HeaderComponent
              categoryData={CategoryData}
              translateData={translateData}
            />

            <CategoryComponent
              CategoryData={CategoryData}
              translateData={translateData}
              footerTabs={footerTabs}
            />
          </div>
        </BaseLayoutEducation>
      </section>
    </>
  );
};

export default Index;

export async function getServerSideProps(context: any) {
  let languageSelectedUrl = "";
  let nameSite = "";
  let localSite = "fa_IR";
  try {
    const languageCode = context.query.lang;
    const slug = context.query.category;

    const resCategories = await axios.get(
      "https://api.rgb.irpsc.com/api/tutorials/categories?count=20"
    );

    const categoriesData = resCategories.data.data;

    const resCategory = await axios.get(
      `https://api.rgb.irpsc.com/api/tutorials/categories/${slug}`
    );
    if (languageCode === "en") {
      localSite = "en-US";
      nameSite = "Metaverse Rgb";
      languageSelectedUrl = "https://rgb.irpsc.com/lang/en.json";
    } else {
      nameSite = "متاورس رنگ";
      localSite = "fa_IR";
      languageSelectedUrl = "https://rgb.irpsc.com/lang/fa.json";
    }
    const res = await axios.get(languageSelectedUrl);

    const translateRes = res.data.modals.find(
      (modal: any) => modal.name === "training"
    ).tabs;

    const translateData = translateRes.find(
      (item: any) => item.name === "central-school"
    ).fields;

    const footerData = res.data.modals.find(
      (modal: any) => modal.name === "footer-menu"
    ).tabs;

    const footerTabs = footerData.find(
      (item: any) => item.name === "our-systems"
    ).fields;

    const CategoryData = resCategory.data.data;

    return {
      props: {
        categoriesData,
        CategoryData,
        footerTabs,
        translateData,
        localSite,
        nameSite,
      },
    };
  } catch (error) {}
}
