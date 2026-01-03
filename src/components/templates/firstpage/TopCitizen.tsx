// TopCitizen.tsx (SERVER)
import TopCitizenClient from "./TopCitizenClient";
import { getAllCitizen } from "@/components/utils/actions";

const TopCitizen = async ({ mainData, params }: any) => {
  const allCitizenArray = await getAllCitizen();
  const topFourCitizens = allCitizenArray.data.slice(0, 5);

  return (
    <TopCitizenClient
      citizens={topFourCitizens}
      mainData={mainData}
      params={params}
    />
  );
};

export default TopCitizen;
