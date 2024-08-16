import { Like, Text } from "@/components/svgs/SvgEducation";
import { translateFooter } from "@/components/utils/education";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import Image from "next/image";
import Link from "next/link";
import {
  getTransletion,
  getMainFile,
  findByModalName,
  getAllCitizen,
  getFooterData,
} from "@/components/utils/actions";

export default async function CitizensPage({
  params,
}: {
  params: { lang: "en" | "fa" };
}) {
  // to find in an array with key(_name)
  // function localFind(_name: any) {
  //   return footerMenuArrayContent.find((item: any) => item.name == _name)
  //     .translation;
  // }

  const footerTabs = await getFooterData(params);
  const langData = await getTransletion(params.lang);
  const mainData = await getMainFile(langData);
  // find specific modal
  const Citizenship = await findByModalName(mainData, "Citizenship-profile");

  // find inside modal and return its fields(result is array)
  const citizenTranslate = Citizenship.find(
    (item: any) => item.name === "list-citizen"
  )?.fields;

  const allCitizenArray = await getAllCitizen();
  // const allCitizenArray = [
  //   {
  //     id: 1,
  //     name: "مرضیه ثاقب علیزاده",
  //     img: "/profile/marziyeh-alizadeh.jpg",
  //     code: "HM-2000003",
  //     likes: "  1.3k",
  //   },
  //   {
  //     id: 2,
  //     name: "حسین قدیری",
  //     img: "/profile/hossein-ghadiri.jpg",
  //     code: "HM-2000001",
  //     likes: "820",
  //   },
  // ];

  return (
    <>
      {allCitizenArray.map((item: any) => (
        <div className="w-1/2 md:w-1/3 lg:w-1/4 2xl:w-1/5 3xl:w-1/6 px-2 sm:px-3  lg:px-5">
          <div
            key={item.id}
            className=" h-[250px] sm:h-[350px] md:h-[400px] xl:h-[411px] cursor-pointer shadow-lg hover:border  hover:border-[#0066FF]  hover:dark:border-dark-primary mt-10  relative   bg-[#fff] dark:bg-[#1A1A18] flex flex-col justify-between gap-1 sm:gap-3 py-3 sm:py-4 md:py-5  items-center rounded-[20px]"
          >
            <Link href={`/${params.lang}/citizen/${item.code}`}>
              <img
                src={item.profile_photo || "/temp.png"}
                alt={"citizen image"}
                width={120}
                height={120}
                loading="lazy"
                className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] shadow-md hover:top-[-88px] transition-all duration-300 shadow-gray rounded-full"
              />
            </Link>
            <p
              // data-atropos-offset="-5"
              className="font-bold text-[14px] sm:text-16 md:text-[18px] 2xl:text-[20px] dark:text-white font-azarMehr sm:mt-2"
            >
              {item.name}
            </p>

            <Link
              href={`https://rgb.irpsc.com/${params.lang}/citizen/${item.code}`}
              target="_blank"
            >
              <span
                // data-atropos-offset="-1"
                className="text-blueLink font-medium  font-azarMehr hover:font-bold text-[12px] sm:text-[16px]"
              >
                {item.code}
              </span>
            </Link>

            <span className="dark:text-[#969696] text-[12px] sm:text-[14px] md:text-[16px] 2xl:text-[18px]">
              سطح توسعه دهنده
            </span>

            <div className="flex h-[27px]">
              {item.levels?.previous?.map((el: any) => (
                <Image
                  data-tooltip-id={el.name}
                  src={el.image}
                  width={27}
                  height={27}
                  alt={el.name}
                  className="w-[20px] h-[20px] sm:w-[27px] sm:h-[27px]"
                />
              ))}
            </div>
            <Link
              href={`https://rgb.irpsc.com/${params.lang}/citizen/${item.code}`}
              target="_blank"
              className="w-[80%]"
            >
              <div
                // data-atropos-offset="5"
                className="w-full h-[40px] sm:h-[50px] md:h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-3 sm:px-6 rounded-[10px] flex flex-row justify-between items-center"
              >
                <span className="text-blueLink dark:text-dark-yellow font-azarMehr font-medium text-[10px] sm:text-[14px]">
                  {translateFooter(citizenTranslate, "citizen page")}
                </span>

                <Text className="w-[14px] h-[14px] sm:w-[24px] sm:h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
              </div>
            </Link>
          </div>
        </div>
      ))}
      <div className="flex flex-col justify-center items-center">
        <DynamicFooter footerTabs={footerTabs} />
      </div>
    </>
  );
}
