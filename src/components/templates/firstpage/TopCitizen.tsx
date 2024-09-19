import { ArrowRight } from "@/components/svgs";
import { getAllCitizen } from "@/components/utils/actions";
import Link from "next/link";
import UserCard from "@/components/shared/UserCard";

const TopCitizen = async ({
  firstPageArrayContent,
  params,
  citizenListArrayContent,
  levelListArrayContent,
}: any) => {
  function localFind(_name: any) {
    return firstPageArrayContent.find((item: any) => item.name == _name)
      .translation;
  }
  function localFind1(_name: any) {
    return citizenListArrayContent.find((item: any) => item.name == _name)
      ?.translation;
  }
  function localFind2(_name: any) {
    return levelListArrayContent.find((item: any) => item.name == _name)
      ?.translation;
  }

  const allCitizenArray = await getAllCitizen();

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {localFind("leading citizens")}
        </p>
        <Link href={`/${params.lang}/citizen`}>
          <div className="flex justify-center items-center gap-4">
            <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
              {localFind("view all")}
            </p>
            <ArrowRight className="dark:stroke-white stroke-black rotate-180 w-[24px] h-full" />
          </div>
        </Link>
      </div>
      <div className="w-full relative flex flex-row sm:no-scrollbar1 lg:show-scrollbar1 dark:dark-scrollbar light-scrollbar overflow-x-auto mt-4 md:mt-12 py-3">
        {allCitizenArray.data.map((item: any, index: any) => (
          <UserCard
            key={item.id}
            item={item}
            index={index}
            params={params}
            minWidth={`260px`}
            buttonText={localFind1("citizen page")}
          />
        ))}
      </div>
    </>
  );
};

export default TopCitizen;
