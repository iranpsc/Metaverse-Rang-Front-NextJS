import { ArrowRight } from "@/components/svgs";
import Image from "next/image";
import { Like, Text } from "@/components/svgs/SvgEducation";
import UserCard from "@/components/shared/UserCard";

const TopTrainersFirstPage = async ({
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

  const staticData = [
    {
      id: 1,
      name: "مرضیه ثاقب علیزاده",
      profile_photo: "/profile/marziyeh-alizadeh.jpg",
      code: "HM-2000003",
      score: "",
    },
    {
      id: 2,
      name: "حسین قدیری",
      profile_photo: "/profile/hossein-ghadiri.jpg",
      code: "HM-2000001",
      score: "",
    },
  ];
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-azarMehr font-medium  text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {localFind("top trainers")}
        </p>
        <div className="flex justify-center items-center gap-4">
          <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
            {localFind("view all")}
          </p>
          <ArrowRight className="dark:stroke-white stroke-black rotate-180 w-[24px] h-full " />
        </div>
      </div>
      <div className="w-full relative flex flex-row dark:dark-scrollbar light-scrollbar overflow-x-auto mt-4 md:mt-12 py-3">
        {staticData.map((item: any, index: any) => (
          <UserCard
            key={index}
            item={item}
            index={index}
            params={params}
            minWidth={`260px`}
            levelText={localFind2("developer")}
            buttonText={localFind1("citizen page")}
          />
        ))}
      </div>
    </>
  );
};

export default TopTrainersFirstPage;
