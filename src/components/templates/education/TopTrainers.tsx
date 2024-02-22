import "atropos/css";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Atropos from "atropos/react";
import { Like, Text } from "@/components/svgs/SvgEducation";
import { translateFooter } from "@/components/utils/education";
import { ArrowMenu } from "@/components/svgs";

export default function TopTrainers({ translateData }: any) {
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

  const [data, setData] = useState(itemsTrainers);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    setData(itemsTrainers);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const router = useRouter();

  return (
    <>
      <div className="w-[95%] h-fit mt-20 flex flex-col  items-center ">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-start text-[30px] xs:text-[24px]  font-bold font-azarMehr text-gray dark:text-dark-gray">
            {translateFooter(translateData, "top trainers")}
          </h1>
          <p className="font-bold font-azarMehr text-gray dark:text-dark-gray cursor-pointer">
            {translateFooter(translateData, "view all")}
          </p>
        </div>

        <div className=" relative w-full min-h-[550px] pb-10 flex flex-row gap-5 items-center  xl:justify-center no-scrollbar overflow-x-scroll px-10 ">
          {isMobile ? (
            <>
              {data.map((item: any) => (
                <div
                  key={item.id}
                  className=" min-w-[270px] h-[439px] shadow-sm hover:dark:shadow-dark hover:shadow-md mt-10 pt-7 cursor-pointer  bg-white dark:bg-[#1A1A18] flex flex-col justify-start items-center gap-4 rounded-[20px]"
                >
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={500}
                    height={500}
                    loading="lazy"
                    className=" w-[170px] h-[170px] shadow-md transition-all duration-300 shadow-gray rounded-full"
                  />
                  <p
                    data-atropos-offset="-5"
                    className="font-bold text-[20px]  font-azarMehr mt-7"
                  >
                    {item.name}
                  </p>

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
                    <Like className="inline ms-2  stroke-gray dark:stroke-white mb-1" />
                  </span>

                  <Link
                    href={`https://rgb.irpsc.com/${router.query.lang}/citizen/${item.code}`}
                    target="_blank"
                    className="w-[90%] h-[55px]"
                  >
                    <div
                      data-atropos-offset="5"
                      className="w-full h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-6 rounded-[10px] flex flex-row justify-between items-center"
                    >
                      <span className="text-blueLink dark:text-dark-yellow font-azarMehr font-medium text-[14px]">
                        {translateFooter(translateData, "cv teacher")}
                      </span>

                      <Text className="w-[24px] h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
                    </div>
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <>
              {itemsTrainers.map((item: any) => (
                <Atropos
                  shadow={false}
                  key={item.id}
                  highlight={false}
                  aria-disabled
                >
                  <div className=" min-w-[270px] h-[439px] shadow-sm  hover:dark:shadow-dark mt-10  relative cursor-pointer  bg-[#fff] dark:bg-[#1A1A18] flex flex-col justify-start gap-4 pt-7  items-center rounded-[20px]">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={500}
                      height={500}
                      loading="lazy"
                      className="  xl:w-[170px] xl:h-[170px] md:w-[150px] md:h-[150px] sm:w-[120px] sm:h-[120px] xs:w-[100px] xs:h-[100px] shadow-md hover:top-[-88px] transition-all duration-300 shadow-gray rounded-full"
                    />
                    <p
                      data-atropos-offset="-5"
                      className="font-bold text-[20px]  font-azarMehr mt-7"
                    >
                      {item.name}
                    </p>

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
                      <Like className="inline ms-2  stroke-gray dark:stroke-white mb-1" />
                    </span>

                    <Link
                      href={`https://rgb.irpsc.com/${router.query.lang}/citizen/${item.code}`}
                      target="_blank"
                      className="w-[90%] h-[55px]"
                    >
                      <div
                        data-atropos-offset="5"
                        className="w-full h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-6 rounded-[10px] flex flex-row justify-between items-center"
                      >
                        <span className="text-blueLink dark:text-dark-yellow font-azarMehr font-medium text-[14px]">
                          {translateFooter(translateData, "cv teacher")}
                        </span>

                        <Text className="w-[24px] h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
                      </div>
                    </Link>
                  </div>
                </Atropos>
              ))}
            </>
          )}
          <div className=" min-w-[270px] h-[439px] shadow-sm hover:dark:shadow-dark hover:shadow-md mt-10 pt-7  bg-white dark:bg-[#1A1A18] flex flex-col gap-4 justify-center items-center rounded-[20px]">
            <div className="flex justify-center items-center w-[60px] h-[60px] bg-[#CFE2FF] dark:bg-[#483D13] rounded-full">
              <ArrowMenu className="w-[20px] h-[20px] stroke-2 rounded-full stroke-blueLink dark:stroke-dark-yellow rotate-180" />
            </div>
            <p className="font-bold font-azarMehr text-blueLink dark:text-dark-yellow dark:text-dark-gray cursor-pointer">
              {translateFooter(translateData, "view other trainers")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
