import { Like, Text } from "@/components/svgs/SvgEducation";
import { translateFooter } from "@/components/utils/education";
import Image from "next/image";
import Link from "next/link";
import {
  getTransletion,
  getMainFile,
  findByModalName,
} from "@/components/utils/actions";

export default async function CitizensPage({
  params,
}: {
  params: { lang: "en" | "fa" };
}) {
  const langData = await getTransletion(params.lang);
  const mainData = await getMainFile(langData);
  // find specific modal
  const footerMenuModal = await findByModalName(mainData, "footer-menu");
  // find inside modal and return its fields(result is array)
  const footerMenuArrayContent = footerMenuModal.find(
    (item: any) => item.name === "our-systems"
  ).fields;

  const citizensArray = [
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
      {citizensArray.map((item) => (
        <Link
          className="p-5 border-2"
          href={`/${params.lang}/citizen/${item.code}`}
        >
          {item.id}
          <div
            key={item.id}
            className=" min-w-[270px] h-[439px] shadow-sm  hover:dark:shadow-dark mt-10  relative cursor-pointer  bg-[#fff] dark:bg-[#1A1A18] flex flex-col justify-start gap-4 pt-7  items-center rounded-[20px]"
          >
            <Image
              src={item.img}
              alt={item.name}
              width={500}
              height={500}
              loading="lazy"
              className="  xl:w-[170px] xl:h-[170px] md:w-[150px] md:h-[150px] sm:w-[120px] sm:h-[120px] xs:w-[100px] xs:h-[100px] shadow-md hover:top-[-88px] transition-all duration-300 shadow-gray rounded-full"
            />
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
                </span>

                <Text className="w-[24px] h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
              </div>
            </Link>
          </div>
        </Link>
      ))}
    </>
  );
}
