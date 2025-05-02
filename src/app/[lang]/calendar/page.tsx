import DynamicFooter from "@/components/module/footer/DynamicFooter";
import Footer from "@/components/module/footer/Footer";
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getAllCitizen,
  getFooterData,
  getLangArray,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import SideBar from "@/components/module/sidebar/SideBar";
import { getStaticMenu } from "@/components/utils/constants";
import EventCalendar from "./components/calendar";
import { Search } from "@/components/svgs/SvgEducation";
export default async function calendarPage({ params }: { params: any }) {
  const [footerTabs, langData, langArray] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);

  const mainData = await getMainFile(langData);

  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = getStaticMenu(params.id);
  // add staticMenuToShow values to siblings tabsMenu values
  const updatedTabsMenu = tabsMenu.map((tab: any) => {
    let findInStatic = staticMenuToShow.find(
      (val) => tab.unique_id === val.unique_id
    );

    if (findInStatic) {
      // Return a new tab object with updated properties
      return {
        ...tab, // Spread the original tab properties
        url: findInStatic.url,
        order: findInStatic.order,
        toShow: true,
      };
    }

    // If no match found, return the original tab
    return tab;
  });

  return (
    <>
      <div className="flex h-screen overflow-hidden" dir={langData.direction}>
        <SideBar
          tabsMenu={updatedTabsMenu}
          langData={langData}
          langArray={langArray}
          params={params}
          pageSide="citizen"
        />
        <section
          className={`w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20`}
        >
          {/* Breadcrumb */}
          <div className="px-12">
            <BreadCrumb params={params} />
          </div>

          {/* PLZ code here without container */}
          {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa*/}

          <div className=" mainContainer w-full  h-auto    flex flex-col items-center  lg:gap-0   font-['AzarMehr'] lg:flex-row   lg:items-start  ">
            <div className="flex flex-col w-full items-center lg:px-10">
              <div className="centerItem w-[95%] lg:w-full  pt-6 text-black dark:text-white bg-white  dark:bg-[#080807] flex flex-col items-center rounded-[20px] gap-2 font-['Montserrat']  ">
                <div className="w-[97%]  flex flex-col items-start sm:flex-row-reverse lg:w-[95%] lg:gap-4 ">
                  <EventCalendar />
                  <div className="w-full sm:w-[90%]  mt-4 sm:mt-0 sm:ml-4   ">
                    <div
                      className="searchBoxContainer  my-5 transition-[right,width] duration-300 
                    ease-in-out flex items-center flex-row justify-between border-[1px] border-solid 
                    border-[#00000024] dark:bg-[#1A1A18] w-full h-[50px] rounded-[12px] sm:m-0"
                    >
                      <span className="pr-4 flex ">
                        <Search className={`fill-[#1A1A18] dark:fill-white`} />
                      </span>
                      <input
                        type="text"
                        id="searchBox"
                        className="searchWrite pr-2 pl-5 font-['AzarMehr'] bg-transparent flex-1 w-[90%] h-[90%] border-none outline-none text-sm text-aliceblue"
                        placeholder=" واقعه مورد نظر خود را جستجو کنید.."
                      />
                      <button className="searchButton font-normal text-[95%] pl-5 font-['AzarMehr'] border-none bg-transparent text-[#FFBC00] cursor-pointer">
                        جستجو
                      </button>
                    </div>

                    <div className="flex flex-col text-[14px] items-center content-center   gap-1 xl:gap-2  w-full max-w-full h-auto py-4 2xl:gap-3 font-[Vazir]    ">
                      <h2 className="text-base font-bold   lg:text-lg xl:text-xl 2xl:text-2xl xl:mt-2 self-start mr-4 sm:mb-1">
                        راهنمای وقایع :
                      </h2>

                      <div className="flex items-center justify-between h-11 2xl:h-12 px-2 w-[96%] hover:bg-[#F8F8F8] dark:hover:bg-black rounded-md cursor-pointer item sm:h-[34px] sm:text-sm lg:text-base xl:text-lg 2xl:text-xl xl:h-11 lg:mt-2 ">
                        <div className="flex items-center  h-8 xl:h-9 2xl:h-10 w-full sm:h-7">
                          <div className="whitespace-nowrap inline-block bg-transparent relative rounded-lg aspect-square h-full overflow-hidden  ">
                            <div className="bg-[#ED2E2E] absolute top-[72%] left-0 w-full h-[30%] rounded-t-md z-50"></div>
                            <div className="bg-[#0066FF] absolute top-[58%] left-0 w-full h-[40%] rounded-t-md z-40"></div>
                            <div className="bg-[#FFC700] absolute top-[38%] left-0 w-full h-[60%] rounded-t-md z-30"></div>
                            <div className="bg-[#32DA6B] absolute top-[18%] left-0 w-full h-[80%] rounded-t-md z-20"></div>
                            <div className="bg-[#8D33FF] absolute top-0 left-0 w-full h-full rounded-t-md z-10"></div>
                          </div>
                          <span className="mr-2 whitespace-nowrap  ">
                            همه‌ی وقایع
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between h-11 2xl:h-12 px-2 w-[96%] hover:bg-[#F8F8F8] dark:hover:bg-black rounded-md cursor-pointer item sm:h-[34px] sm:text-sm lg:text-base xl:text-lg 2xl:text-xl  xl:h-11">
                        <div className="flex items-center h-full  ">
                          <div className="bg-[#0066FF] rounded-lg aspect-square h-8  xl:h-9 2xl:h-10 sm:h-7"></div>
                          <span className="mr-2 whitespace-nowrap">
                            اموزشی فرهنگی
                          </span>
                        </div>
                        <div className="text-[#0066FF] ">% 37</div>
                      </div>

                      <div className="flex items-center justify-between h-11 2xl:h-12 w-[96%] px-2 hover:bg-[#F8F8F8] dark:hover:bg-black rounded-md cursor-pointer item sm:h-[34px] sm:text-sm lg:text-base xl:text-lg 2xl:text-xl xl:h-11">
                        <div className="flex items-center h-full">
                          <div className="bg-[#ED2E2E] rounded-lg aspect-square h-8 xl:h-9  2xl:h-10 sm:h-7"></div>
                          <span className="mr-2 whitespace-nowrap">
                            {" "}
                            تجاری و سرمایه گذاری
                          </span>
                        </div>
                        <div className="text-[#ED2E2E]">% 37</div>
                      </div>

                      <div className="flex items-center justify-between h-11 2xl:h-12 w-[96%] px-2 hover:bg-[#F8F8F8] dark:hover:bg-black rounded-md cursor-pointer item sm:h-[34px] sm:text-sm lg:text-base xl:text-lg 2xl:text-xl xl:h-11">
                        <div className="flex items-center h-full ">
                          <div className="bg-[#FFC700] rounded-lg aspect-square h-8  xl:h-9 2xl:h-10 sm:h-7"></div>
                          <span className="mr-2 whitespace-nowrap ">
                            {" "}
                            مسکونی و آینده نگری{" "}
                          </span>
                        </div>
                        <div className="text-[#FFC700] ">% 37</div>
                      </div>

                      <div className="flex items-center justify-between h-11 2xl:h-12 w-[96%] px-2 hover:bg-[#F8F8F8] dark:hover:bg-black rounded-md cursor-pointer item sm:h-[34px] sm:text-sm lg:text-base xl:text-lg 2xl:text-xl xl:h-11">
                        <div className="flex items-center h-full ">
                          <div className="bg-[#32DA6B] rounded-lg aspect-square h-8 xl:h-9  2xl:h-10 sm:h-7"></div>
                          <span className="mr-2 whitespace-nowrap">
                            {" "}
                            سبز و بهبود زندگی
                          </span>
                        </div>
                        <div className="text-[#32DA6B]">% 37</div>
                      </div>

                      <div className="flex items-center justify-between h-11 2xl:h-12 w-[96%] px-2 hover:bg-[#F8F8F8] dark:hover:bg-black rounded-md cursor-pointer item sm:h-[34px] lg:text-base xl:text-lg 2xl:text-xl xl:h-11">
                        <div className="flex items-center h-full ">
                          <div className="bg-[#8D33FF] rounded-lg aspect-square h-8 xl:h-9  2xl:h-10 sm:h-7"></div>
                          <span className="mr-2 whitespace-nowrap">
                            {" "}
                            ترکیبی متفرقه
                          </span>
                        </div>
                        <div className="text-[#8D33FF]">% 37</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mt-6 w-full lg:w-[95%] h-[2px] bg-gradient-to-r from-transparent via-[#DADADA] to-transparent"></div>

                <div className=" mt-4 w-[97%] lg:w-[95%] mx-auto  rounded-[20px] overflow-hidden shadow-lg lg:mt-6">
                  <img
                    src="img/Screenshot.png"
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover blur-sm"
                    id="thumbnail"
                  />
                </div>

                <div className="flex flex-col w-[97%] lg:w-[95%] gap-3 sm:gap-0 items-center sm:flex-row-reverse sm:justify-between">
                  <div
                    className="w-[96%] flex justify-between text-base font-normal font-[Vazir] sm:w-[350px] sm:ml-2 sm:self-center"
                    dir="ltr"
                  >
                    <div className="flex items-center space-x-1">
                      <img className="cursor-pointer" src="/svg/like.svg" />
                    
                      <span className="like-count mt-[2px]">89975</span>
                    </div>
                    <div className="flex items-center space-x-1">
                    <img className="cursor-pointer rotate-180" src="/svg/like.svg" />

                      <span className="dislike-count">2176</span>
                    </div>
                    <div className="flex items-center space-x-1">
                    <img className="cursor-pointer" src="/svg/veiw.svg" />

                      <span>987654</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between h-8  w-full font-[Rokh] my-2  sm:w-[60%] sm:max-w-[-60%] sm:self-start xl:h-11">
                    <div className="flex items-center  h-full w-full">
                      <div className="bg-[#ED2E2E] sm:h-7 xl:h-9 2xl:h-10 rounded-lg aspect-square h-full"></div>
                      <span className="mr-2 whitespace-nowrap text-base font-bold  text-ellipsis overflow-hidden lg:text-xl xl:text-2xl 2xl:text-3xl  ">
                        آموزش طراحی نسخه آزمایشی بلندر
                      </span>
                    </div>
                  </div>
                </div>

                <p
                  id="text-content"
                  className="text-base lg:w-[95%] text-[#868B90] dark:text-[#C4C4C4] dark:sm:text-[#DEDEE9] mb-4  text-justify leading-6 w-[97%] font-normal font-[Vazir] 2xl:text-xl 2xl:leading-8"
                >
                  سخت و متون و فرهنگ پیشرو فراوان و با موجود شامل جامعه که، در
                  صنعت طراحان خلاقی داشت استفاده و کاربردهای از شرایط و متخصصان
                  جامعه ابزارهای کاربردی لازم در با هدف طراحان طراحان خلاقی در و
                  سطر و مجله برای طراحی با، شامل و دشواری در بلکه شناخبردهای
                  موجود و مجله می باشد و زمان بهبود در این صورت تایپ سخت جوابگوی
                  و آینده نرم افزارها زیادی می باشد چاپگرها مورد نیاز طراحی
                  استفاده از موجود امید در جوابگوی شرایط و زمان قرار گیرد موجود
                  علی الخصوص لازم لازم مورد نیاز حروفچینی ساختگی در با، صنعت
                  فراوان لازم استفاده ارائه طراحان در فعلی طراحان خلاقی تکنولوژی
                  جوابگوی استفاده که، و برای اساسا مورد نیاز در طراحان کرد در
                  متخصصان شرایط موجود شرایط تمام و آینده که، با هدف متنوع
                  تکنولوژی سخت تکنولوژی ایپسوم و زمان ایپسوم ابزارهای کاربردی
                  روزنامه. روزنامه. برای تایپ
                  <span> </span>
                  <span className="dark:text-dark-yellow text-blueLink bg-transparent  hover:underline text-nowrap cursor-pointer">
                    مشاهده بیشتر
                  </span>
                </p>

                <div
                  className="px-4   mb-2 w-[97%] lg:w-[95%] lg:px-7 font-[AzarMehrFD] h-[360px]
                   bg-gradient-to-r from-[#CFCFCFE5] to-[#D8D8D800]
                   dark:bg-gradient-to-r dark:from-[#ffffff09] dark:to-[#00000000] dark:text-dark-yellow text-blueLink rounded-[32px] border-[1px] border-solid dark:border-[#ffffff25] border-[#CFCFCFE5]  shadow-lg p-4  flex flex-col justify-between sm:flex-row sm:h-[250px]"
                  dir="ltr"
                >
                  <div className="text-center  flex flex-col justify-start  sm:order-1 sm:content-start sm:w-[30%] sm:min-w-[194px]">
                    <h2 className="text-[16px] font-bold  text-black dark:text-white pb-6 sm:mt-4 sm:pb-6 sm:text-right 2xl:text-xl xl:text-lg lg:text-base ">
                      : شروع واقعه
                    </h2>
                    <div className="flex justify-between  items-center">
                      <div className="text-center">
                        <div
                          id="start-days"
                          className="hale text-2xl font-bold w-12 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                        >
                          00
                        </div>
                        <div className="text-base">روز</div>
                      </div>
                      <span className="self-start text-[24px]  leading-10 font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
                        :
                      </span>
                      <div className="text-center">
                        <div
                          id="start-hours"
                          className="hale text-2xl font-bold  w-11 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                        >
                          00
                        </div>
                        <div className="text-base">ساعت</div>
                      </div>
                      <span className="self-start text-[24px]  leading-10 font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
                        :
                      </span>
                      <div className="text-center">
                        <div
                          id="start-minutes"
                          className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                        >
                          00
                        </div>
                        <div className="text-base">دقیقه</div>
                      </div>
                      <span className="self-start text-[24px]  leading-10 font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
                        :
                      </span>
                      <div className="text-center">
                        <div
                          id="start-seconds"
                          className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                        >
                          00
                        </div>
                        <div className="text-base ">ثانیه</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mb-4 sm:w-[30%] sm:min-w-[194px]">
                    <h2 className="text-[16px] font-bold  text-black dark:text-white pb-6 sm:pb-6  sm:mt-4 sm:text-right 2xl:text-xl xl:text-lg lg:text-base pt-6 sm:pt-0">
                      : پایان واقعه
                    </h2>
                    <div className="flex justify-between items-center ">
                      <div className="text-center ">
                        <div
                          id="end-days"
                          className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                        >
                          00
                        </div>
                        <div className="text-base ">روز</div>
                      </div>
                      <span className="self-start text-[24px]  leading-10 font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
                        :
                      </span>
                      <div className="text-center">
                        <div
                          id="end-hours"
                          className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                        >
                          00
                        </div>
                        <div className="text-base ">ساعت</div>
                      </div>
                      <span className="self-start text-[24px]  leading-10 font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
                        :
                      </span>
                      <div className="text-center">
                        <div
                          id="end-minutes"
                          className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                        >
                          00
                        </div>
                        <div className="text-base ">دقیقه</div>
                      </div>
                      <span className="self-start text-[24px]  leading-10 font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
                        :
                      </span>
                      <div className="text-center">
                        <div
                          id="end-seconds"
                          className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                        >
                          00
                        </div>
                        <div className="text-base ">ثانیه</div>
                      </div>
                    </div>
                  </div>
                  <div className=" flex text-center sm:justify-center mt-4 sm:w-2/5">
                    <button className="dark:bg-dark-yellow bg-blueLink text-white dark:text-black font-bold py-2 px-4  w-full mb-2 h-11 self-end rounded-[28px] sm:text-lg sm:font-semibold sm:w-4/6 ">
                      پیش خرید
                    </button>
                  </div>
                </div>

                <div className="mt-6 w-full lg:w-[95%] h-[2px] bg-gradient-to-r from-transparent via-[#DADADA] to-transparent"></div>
              </div>
            </div>
          </div>

          {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa*/}

          <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            {/* <DynamicFooter footerTabs={footerTabs} mainData={mainData} /> */}
            <Footer footerTabs={footerTabs} mainData={mainData} />
          </div>
        </section>
      </div>
    </>
  );
}
