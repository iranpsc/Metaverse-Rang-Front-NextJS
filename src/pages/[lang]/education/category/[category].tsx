import { useContext, useState } from "react";
import { LangContext } from "@/context/LangContext";
import { useRouter } from "next/router";
import BaseLayoutEducation from "@/components/layout/BaseLayoutEducation";
import ShowAllCategoriesComponent from "@/components/templates/categories/ShowAllCategoriesComponent";
import CategoryComponent from "@/components/templates/categories/CategoryComponent";
import axios from "axios";
import { HeaderComponent } from "@/components/templates/categories/HeaderComponent";

const Index = ({
  videosData,
  translateData,
  categoriesData,
  footerTabs,
}: any) => {
  const { languageSelected } = useContext(LangContext);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const router = useRouter();
  const { category } = router.query;
  return (
    <section
      dir={languageSelected.dir}
      className={`relative w-full`}
      id="light-scrollbar"
    >
      <BaseLayoutEducation
        translateData={translateData}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      >
        <div className="w-full overflow-y-auto overflow-x-clip relative">
          <HeaderComponent translateData={translateData} />
          {category == "all" ? (
            <ShowAllCategoriesComponent categoriesData={categoriesData} />
          ) : (
            <CategoryComponent
              videosData={videosData}
              translateData={translateData}
              setShowFilter={setShowFilter}
              footerTabs={footerTabs}
            />
          )}
        </div>
      </BaseLayoutEducation>
    </section>
  );
};

export default Index;

export async function getServerSideProps(context: any) {
  let languageSelectedUrl = "";
  let nameSite = "";
  let localSite = "fa_IR";
  try {
    const languageCode = context.query.lang;

    const resCategories = await axios.get(
      "https://api.rgb.irpsc.com/api/tutorials/categories?count=20"
    );

    const categoriesData = resCategories.data.data;

    const resVideos = await axios.get(
      `https://api.rgb.irpsc.com/api/tutorials?page=1`
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

    const videosData = resVideos.data.data;
    return {
      props: {
        categoriesData,
        videosData,
        footerTabs,
        translateData,
        localSite,
        nameSite,
      },
    };
  } catch (error) {}
}
