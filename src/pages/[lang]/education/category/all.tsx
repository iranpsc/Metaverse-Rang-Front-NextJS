import ShowAllCategoriesComponent from "@/components/templates/categories/ShowAllCategoriesComponent";
import axios from "axios";

export default function xxx({ categoriesData }: any) {
  return (
    <div>
      <ShowAllCategoriesComponent categoriesData={categoriesData} />
    </div>
  );
}

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

    if (languageCode === "en") {
      localSite = "en-US";
      nameSite = "Metaverse Rgb";
      languageSelectedUrl = "https://rgb.irpsc.com/lang/en.json";
    } else {
      nameSite = "متاورس رنگ";
      localSite = "fa_IR";
      languageSelectedUrl = "https://rgb.irpsc.com/lang/fa.json";
    }

    return {
      props: {
        categoriesData,

        localSite,
        nameSite,
      },
    };
  } catch (error) {}
}
