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
  const footerMenuModal = await findByModalName(mainData, "footer-menu");

  // find inside modal and return its fields(result is array)
  const footerMenuArrayContent = footerMenuModal.find(
    (item: any) => item.name === "our-systems"
  ).fields;
  console.log("footerMenuArrayContent__!", footerMenuArrayContent);

  const allCitizenArray = await getAllCitizen();
  // console.log("allCitizenArray___2", allCitizenArray);
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
        <div
          key={item.id}
          className=" min-w-[200px] w-full sm:w-full md:w-[48%] lg:w-[24%] xl:w-[19%] h-[439px] shadow-sm  hover:dark:shadow-dark mt-10  relative cursor-pointer  bg-[#fff] dark:bg-[#1A1A18] flex flex-col justify-start gap-4 pt-7  items-center rounded-[20px]"
        >
          <Link href={`/${params.lang}/citizen/${item.code}`}>
            <img
              src={item.profile_photo}
              alt={"citizen image"}
              width={500}
              height={500}
              loading="lazy"
              className="  xl:w-[170px] xl:h-[170px] md:w-[150px] md:h-[150px] sm:w-[120px] sm:h-[120px] xs:w-[100px] xs:h-[100px] shadow-md hover:top-[-88px] transition-all duration-300 shadow-gray rounded-full"
            />
          </Link>
          <p
            // data-atropos-offset="-5"
            className="font-bold text-[20px]  font-azarMehr mt-7"
          >
            {item.name}
          </p>

          <Link
            href={`https://rgb.irpsc.com/${params.lang}/citizen/${item.code}`}
            target="_blank"
          >
            <span
              // data-atropos-offset="-1"
              className="text-blueLink font-medium  font-azarMehr hover:font-bold"
            >
              {item.code}
            </span>
          </Link>

          <span>
            {item.likes}
            <Like className="inline ms-2  stroke-gray dark:stroke-white mb-1" />
          </span>

          <Link
            href={`https://rgb.irpsc.com/${params.lang}/citizen/${item.code}`}
            target="_blank"
            className="w-[90%] h-[55px]"
          >
            <div
              // data-atropos-offset="5"
              className="w-full h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-6 rounded-[10px] flex flex-row justify-between items-center"
            >
              <span className="text-blueLink dark:text-dark-yellow font-azarMehr font-medium text-[14px]">
                {translateFooter(footerMenuArrayContent, "cv teacher")}
                test
              </span>

              <Text className="w-[24px] h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
            </div>
          </Link>
        </div>
      ))}
      <div className="flex flex-col justify-center items-center">
        <DynamicFooter footerTabs={footerTabs} />
      </div>
    </>
  );
}
