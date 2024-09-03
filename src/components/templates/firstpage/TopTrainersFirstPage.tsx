import { ArrowRight } from "@/components/svgs";
import Image from "next/image";
import { Like, Text } from "@/components/svgs/SvgEducation";

const TopTrainersFirstPage = async ({ firstPageArrayContent, params }: any) => {
  function localFind(_name: any) {
    return firstPageArrayContent.find((item: any) => item.name == _name)
      .translation;
  }

  const staticData = [
    {
      id: 1,
      name: "مرضیه ثاقب علیزاده",
      img: "/profile/marziyeh-alizadeh.jpg",
      code: "HM-2000003",
      likes: "  1.3k",
    },
    {
      id: 2,
      name: "حسین قدیری",
      img: "/profile/hossein-ghadiri.jpg",
      code: "HM-2000001",
      likes: "820",
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
          <div
            key={index}
            className="min-w-[258px] min-h-[150px] shadow-xl flex flex-col justify-start items-center gap-10 py-5 bg-[#1A1A18] rounded-[24px] hover:scale-105 base-transition-1 py-3 mx-3"
          >
            <Image
              className="size-[170px] rounded-full border-none"
              src={item.img || "/temp-1.png"}
              alt="header"
              width={1000}
              height={1000}
            />
            <div className="flex flex-col justify-start items-center gap-6">
              <p className="font-azarMehr font-medium text-[20px] text-white">
                {item.name}
              </p>
              <p className="font-azarMehr font-medium text-[18px] text-dark-yellow">
                {localFind("leading citizens")}
              </p>
              <div className="flex justify-center items-center">
                <p className="font-azarMehr font-medium text-[20px] text-[#808080]">
                  {item.likes}
                </p>
                <Like className="size-[15px] stroke-[#808080]" />
              </div>
            </div>
            <div className="w-[90%] h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-6 rounded-[10px] flex flex-row justify-between items-center">
              <span className="text-blueLink dark:text-dark-yellow font-azarMehr font-medium text-[14px]">
                {localFind("coach resume")}
              </span>

              <Text className="w-[24px] h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopTrainersFirstPage;
