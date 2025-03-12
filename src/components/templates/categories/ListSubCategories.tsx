import ListData from "@/components/shared/ListData";
import { useTheme } from "next-themes";

export default function ListSubCategories({
  loadMore,
  CategoryData,
  loading,
  translateData,
  params,
}: any) {
  const { theme } = useTheme();

  return (
    <>
      <div className="w-full px-5 h-fit mt-5  flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16 w-full h-fit">
          <ListData
            params={params}
            nameComponent="subCategories"
            data={CategoryData}
            translateData={translateData}
            loadMore={loadMore}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}
