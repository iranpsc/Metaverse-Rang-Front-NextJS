// TopCitizen.tsx (SERVER)
import TopCitizenClient from "./TopCitizenClient";
import { getAllCitizen } from "@/components/utils/actions";

const TopCitizen = async ({ mainData, params }: any) => {
  try {
  const allCitizenArray = await getAllCitizen();
  const topFourCitizens = allCitizenArray.data.slice(0, 5);

  return (
    <TopCitizenClient
      citizens={topFourCitizens}
      mainData={mainData}
      params={params}
    />
  );
}
catch (error) {
  const serializedError = {
    message:
      error instanceof Error ? error.message : "Unknown error",
    stack:
      error instanceof Error ? error.stack : null,
    name:
      error instanceof Error ? error.name : "Error",
  };

  console.error("❌ Error in EductionPage:", serializedError);

  return <div> <p>خطا در بارگذاری داده ها رخ داده است</p></div>;
}
}

export default TopCitizen;
