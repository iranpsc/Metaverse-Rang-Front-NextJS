import { ArrowRight } from "@/components/svgs";
import { Dislike, Like, View, Video } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

import Image from "next/image";
import Link from "next/link";

const EducationFirstPage = ({ mainData, params }: any) => {
  // function localFind(_name: any) {
  //   return firstPageArrayContent.find((item: any) => item.name == _name)
  //     .translation;
  // }

  const staticData = [
    {
      title: "ورود به متاورس ایرانی چگونه است؟ |متاورس",
      desc: "در حال حاضر هیچ قانونی وجود ندارد که به طور خاص متاورس یا سایر دنیای مجازی را تنظیم کند. با این حال، همان قوانین کلی که در مورد اینترنت اعمال می شود، در مورد Metaverse نیز اعمال می شود، از جمله قانون کپی رایت، قانون افترا، قانون قرارداد و غیره است.",
      url: "https://video.irpsc.com/watch/SyNzKDuIfWvYfJX",
      categories: "متاورس رنگ",
    },
    {
      title: "خانواده در متاورس چه تعریفی دارد؟",
      desc: "فضای مجازی ممکن است جملات زیادی از زبان مدیران اجرایی مانند مارک زاکربرگ یا ساتیا نادلا در مورد متاورس شنیده باشید متاورس آینده اینترنت است",
      url: "https://video.irpsc.com/watch/QoIGOoEJFpwpYKC",
      categories: "متاورس رنگ",
    },
    {
      title: "VOD تجاری دارای بنا چیست؟ |متاورس",
      desc: "متاورس رنگ اولین متاورس ایران با هدف توسعه تاورس ملی اهداف زیادی از قبیل عدم خروج ارز از کشور و در فازهای بعدی ورود ارز به کشور را دارد که این ها همه بخشی کوچکی از اهداف متاورس ملی می باشد",
      url: "https://video.irpsc.com/watch/F2x6VMfXJK8xhhT",
      categories: "متاورس رنگ",
    },
  ];
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center ">
        <p className="font-azarMehr font-medium  text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {/* {localFind("trainings")} */}
          {findByUniqueId(mainData, 87)}
        </p>

        <a href="https://video.irpsc.com/videos/category/1036?page_id=1">
          <div className="flex justify-center items-center gap-4">
            <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
              {/* {localFind("view all")} */}
              {findByUniqueId(mainData, 171)}
            </p>
            <ArrowRight className="dark:stroke-white stroke-black rotate-180 w-[24px] h-full ltr:rotate-0" />
          </div>
        </a>
      </div>

      <div className="grid  lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-10 mt-6 md:mt-12">
        {staticData.map((item, index) => (
          <div
            key={index}
            className="w-[100%] shadow-md rounded-[20px] overflow-hidden bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center"
          >
            <div className="w-full flex flex-col justify-center items-center max-h-[265px] overflow-hidden">
              <Link
                href={item.url}
                className="group w-full rounded-t-[10px] relative"
              >
                <Image
                  src={`/firstpage/static-education-${index}.webp`}
                  alt="education pic"
                  width={500}
                  height={357}
                  quality={75}
                  property="true"
                  loading={"lazy"}
                  className="w-full h-full rounded-t-[10px] object-cover"
                />
              </Link>
            </div>

            <div className="py-3 px-3 flex flex-col justify-between gap-5">
              <div className=" w-[95%] flex flex-row justify-start items-center gap-1  mt-[-20px] ">
                <p className="text-start text-gray dark:text-dark-gray font-medium font-azarMehr text-[13px]  3xl:text-[16px] cursor-pointer hover:text-blueLink hover:dark:text-dark-yellow">
                  {item.categories}
                </p>
              </div>

              <a className="w-[95%] mt-[-10px]" href={item.url}>
                <h4 className="text-start  w-full font-azarMehr truncate cursor-pointer font-bold text-[18px] xl:text-[20px] 3xl:text-[22px] dark:text-white text-gray ">
                  {item.title}
                </h4>
                <p className="line-clamp-2 text-darkGray dark:text-lightGray"> {item.desc}</p>
              </a>

              <div className="w-[95%] flex flex-row justify-between  items-center">
                <Link href={`/${params.lang}/citizen/Hm-2000003`} target="_blank">
                  <div className="flex flex-row justify-start items-center gap-2">
                    <Image
                      src="/firstpage/alizadeh.webp"
                      alt="citizen image"
                      width={1000}
                      height={1000}
                      loading="lazy"
                      className="w-[45px] h-[45px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
                    // onClick={() => pushRgb(item.creator.code)}
                    />
                    <span
                      className="text-blueLink  cursor-pointer text-[14px] 3xl:text-[18px] whitespace-nowrap font-medium hover:font-bold uppercase "
                    // onClick={() => pushRgb(item.creator.code)}
                    >
                      Hm-2000003
                    </span>
                  </div>
                </Link>
                <div className="flex flex-row justify-end items-center gap-4 md:gap-3 xl:gap-4 3xl:gap-5">
                  {/* 1 */}
                  <span className="flex items-center gap-2">
                    <span className=" whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                      125
                    </span>
                    <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px] " />
                  </span>
                  {/* 2 */}
                  <span className="flex items-center gap-2">
                    <span className="whitespace-nowrap font-azarMehr font-normal  3xl:text-[18px] text-gray dark:text-dark-gray">
                      10
                    </span>
                    <Dislike className="stroke-gray  dark:stroke-dark-gray stroke-2 " />
                  </span>
                  {/* 3 */}
                  <span className="flex items-center gap-2">
                    <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray">
                      610
                    </span>
                    <View className="stroke-gray dark:stroke-dark-gray stroke-2 ms-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EducationFirstPage;
