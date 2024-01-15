import { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Atropos from "atropos/react";
import { LangContext } from "@/context/LangContext";
import { Arrow, Like, Text } from "@/components/svgs";
import { translateFooter } from "@/components/utils/education";

export default function TopTrainers({translateData}:any) {
        const { languageSelected } = useContext(LangContext);
          const router = useRouter();
          const itemsTrainers = [
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
      <div className="w-[95%] h-fit mt-20 flex flex-col justify-center items-center">
        <h1 className="w-full   text-center xl:text-start text-[30px]  font-bold font-azarMehr text-gray dark:text-dark-gray">
          {translateFooter(translateData, "top trainers")}
        </h1>

        <div className=" relative w-full min-h-[550px] pb-10 flex flex-wrap gap-5 items-center justify-center">
          {itemsTrainers.map((item: any) => (
            <Atropos shadow={false} key={item.id} highlight={false}>
              <div className=" w-[300px] h-[400px] shadow-sm  hover:dark:shadow-dark  mt-24 relative cursor-pointer  bg-white dark:bg-[#1A1A18] flex flex-col justify-evenly pt-[70px]  items-center rounded-[20px]">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={500}
                  height={500}
                  loading="lazy"
                  className="  w-[75px] h-[75px] md:w-[150px] md:h-[150px] sm:w-[120px] sm:h-[120px] xs:w-[100px] xs:h-[100px] absolute  top-[-75px] z-[999]  shadow-md hover:top-[-88px] transition-all duration-300 shadow-gray rounded-full"
                />
                <h3
                  data-atropos-offset="-5"
                  className="font-bold text-[20px]  font-azarMehr "
                >
                  {item.name}
                </h3>

                <Link
                  href={`https://rgb.irpsc.com/${router.query.lang}/citizen/${item.code}`}
                  target="_blank"
                >
                  <span
                    data-atropos-offset="-1"
                    className="text-blueLink font-medium  font-azarMehr hover:font-bold"
                  >
                    {item.code}
                  </span>
                </Link>

                <span>
                  {item.likes}
                  <Like className="inline ms-2" />
                </span>

                <div
                  data-atropos-offset="5"
                  className="w-[90%] h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-6 rounded-[10px] flex flex-row justify-between items-center"
                >
                  <span className="text-blueLink dark:text-dark-yellow font-azarMehr font-medium text-[14px]">
                    {translateFooter(translateData, "cv teacher")}
                  </span>
                  <Text className="w-[24px] h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
                </div>
              </div>
            </Atropos>
          ))}

          <div className="mt-24 w-[300px] h-[400px] shadow-sm pointer-events-none hover:shadow-md bg-white dark:bg-[#1A1A18] flex flex-col justify-center  items-center rounded-[20px]">
            <div className="w-[60px] h-[60px] bg-[#0066FF] dark:bg-[#FFC700] dark:bg-opacity-20 bg-opacity-20 rounded-full flex justify-center items-center">
              <Arrow
                className={` ${
                  languageSelected.dir === "rtl" ? "" : "rotate-180"
                } ms-1 w-[10px] h-[20px] stroke-2 stroke-[#0066FF] dark:stroke-[#FFC700]`}
              />
            </div>

            <h3 className="font-bold text-[16px]   mt-3 text-[#0066FF] dark:text-[#FFC700]">
              {translateFooter(translateData, "view other trainers")}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
