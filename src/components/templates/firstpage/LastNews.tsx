import { ArrowRight } from "@/components/svgs";
import { Dislike, Like, View, Video } from "@/components/svgs/SvgEducation";

import Image from "next/image";
import Link from "next/link";

const LastNews = ({ firstPageArrayContent }: any) => {
  function localFind(_name: any) {
    return firstPageArrayContent.find((item: any) => item.name == _name)
      .translation;
  }
  const staticData = [
    {
      title:
        "کسب درآمد از اولین متاورس ایران متاورس رنگ، فرصتی نوین برای کارآفرینان دیجیتال",
      desc: "در حال حاضر هیچ قانونی وجود ندارد که به طور خاص متاورس یا سایر دنیای مجازی را تنظیم کند. با این حال، همان قوانین کلی که در مورد اینترنت اعمال می شود، در مورد Metaverse نیز اعمال می شود، از جمله قانون کپی رایت، قانون افترا، قانون قرارداد و غیره است.",
      url: "https://meta.irpsc.com/2024/07/12/earning-income-from-the-first-metaverse-iran-metaverse-rang/",
    },
    {
      title:
        "بازپس گیری جزیره آریانا در اولین متاورس ایران متاورس رنگ با اهدای 963 قطعه زمین(VOD) رایگان به ارزش 50371200000 ریال",
      desc: "فضای مجازی ممکن است جملات زیادی از زبان مدیران اجرایی مانند مارک زاکربرگ یا ساتیا نادلا در مورد متاورس شنیده باشید متاورس آینده اینترنت است",
      url: "https://meta.irpsc.com/2024/07/17/%d8%a8%d8%a7%d8%b2%d9%be%d8%b3-%da%af%db%8c%d8%b1%db%8c-%d8%ac%d8%b2%db%8c%d8%b1%d9%87-%d8%a2%d8%b1%db%8c%d8%a7%d9%86%d8%a7-%d8%af%d8%b1-%d8%a7%d9%88%d9%84%db%8c%d9%86-%d9%85%d8%aa%d8%a7%d9%88%d8%b1/",
    },
    {
      title: "VOD تجاری دارای بنا چیست؟ |متاورس",
      desc: "متاورس رنگ اولین متاورس ایران با هدف توسعه تاورس ملی اهداف زیادی از قبیل عدم خروج ارز از کشور و در فازهای بعدی ورود ارز به کشور را دارد که این ها همه بخشی کوچکی از اهداف متاورس ملی می باشد",
      url: "https://video.irpsc.com/watch/F2x6VMfXJK8xhhT",
    },
  ];
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center ">
        <p className="font-azarMehr font-medium text-[32px]">
          {localFind("latest news")}
        </p>

        <div className="flex justify-center items-center gap-4">
          <p className="font-azarMehr font-medium text-[20px]">
            {localFind("view all")}
          </p>
          <ArrowRight className="stroke-white rotate-180 w-[24px] h-full" />
        </div>
      </div>

      <div className="grid  lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-10 mt-12">
        {staticData.map((item, index) => (
          <div
            key={index}
            className="w-[100%] min-h-[240px]  shadow-md hover:shadow-xl hover:dark:shadow-dark  rounded-[10px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center"
          >
            <div className=" group w-full h-[266px]   rounded-t-[10px] relative">
              <Image
                src={`/firstpage/static-news-${index}.jpg`}
                alt="/firstpage/img2.jpg"
                width={600}
                height={600}
                priority={true}
                className=" w-full h-full hover:blur-none transition-all duration-150 ease-in-out rounded-t-[10px]  object-cover"
              />
              <div className="w-full h-full backdrop-blur-[3px] bg-black/20 hover:backdrop-blur-none xs:backdrop-blur-none absolute z-0 top-0 flex justify-center items-center">
                <Video className="w-[78px] h-[78px] p-3 fill-blueLink dark:fill-dark-yellow  rounded-full bg-white/80" />
              </div>
            </div>

            <div className=" w-[95%] flex flex-row justify-start items-center gap-1  mt-[-10px] pe-16">
              <p
                className="text-start text-gray dark:text-dark-gray font-medium font-azarMehr text-[13px]  3xl:text-[16px] cursor-pointer hover:text-blueLink hover:dark:text-dark-yellow"
                //   onClick={() => pusher(item.category.slug)}
              >
                27 اسفند 1402
              </p>
            </div>

            <a className="w-[95%]" href={item.url}>
              <h1 className="text-start  w-full font-azarMehr truncate cursor-pointer font-bold mt-[8px] text-[18px] 3xl:text-[22px] ">
                {item.title}
              </h1>
            </a>

            <div className="w-[95%] pb-2 flex flex-row justify-between  items-center">
              <Link href="#" target="_blank">
                <div className="flex flex-row justify-start items-center gap-2">
                  <Image
                    src="/firstpage/img2.jpg"
                    alt="/firstpage/img2.jpg"
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
              <div className="flex flex-row justify-start items-center gap-5">
                <span className=" whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray me-[-13px]">
                  125
                </span>
                <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px] " />
                <span className="whitespace-nowrap font-azarMehr font-normal  3xl:text-[18px] text-gray dark:text-dark-gray me-[-10px]">
                  10
                </span>
                <Dislike className="stroke-gray  dark:stroke-dark-gray stroke-2 " />

                <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray me-[-13px]">
                  610
                </span>
                <View className="stroke-gray dark:stroke-dark-gray stroke-2 " />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LastNews;
