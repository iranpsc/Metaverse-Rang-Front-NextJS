import { ReactNode, useContext, useState } from "react";
import SideBarEducation from "./module/education/SideBarEducation";
import AuthCards from "@/layout/AuthCards";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import MenuItemPage from "./templates/MenuItemPage";
import { SideBarContext } from "./context/SidebarContext";
import LoginMenuModule from "./module/menu/LoginMenuModule";
import Link from "next/link";
import { useRouter } from "next/router";
import { useToken } from "./context/TokenContext";
import { ArrowMenu } from "./svgs";

interface Props {
  children: ReactNode;
  profileData: any;
  error: any;
  titleData: any;
  setShowLogOut: any;
}
export default function BaseLayout({
  children,
  profileData,
  error,
  titleData,
  setShowLogOut,
}: Props) {
  const [showAuthCard, setShowAuthCard] = useState<boolean>(false);
  const { state, toggleCollapseHandler } = useContext(SideBarContext);
  const { code, token } = useToken();
  const router = useRouter();
  const { lang } = router.query;

  return (
    <div className=" flex flex-row max-h-screen max-lg:h-full  max-lg:flex-col xl:overflow-clip lg:overflow-clip md:overflow-auto sm:overflow-auto xs:overflow-auto no-scrollbar">
      <AnimatePresence>
        {showAuthCard && <AuthCards setShowAuthCard={setShowAuthCard} />}
      </AnimatePresence>
      <AnimatePresence>
        {state.showMenuItem !== -10 && (
          <MenuItemPage setShowAuthCard={setShowAuthCard} />
        )}
      </AnimatePresence>
      <section className=" xl:relative flex flex-row">
        <SideBarEducation
          setShowAuthCard={setShowAuthCard}
          pageName="citizen"
          profileData={profileData}
          titleData={titleData}
          setShowLogOut={setShowLogOut}
        />
        <div className="h-full w-[200px] ps-2 start-[75px] absolute  z-50 xs:hidden  flex flex-col justify-between items-start">
          <div
            className="rounded-full 
             xl:w-[35px] xl:h-[35px] 
           lg:w-[30px] lg:h-[30px] 
           md:w-[35px] md:h-[35px] 
           sm:w-[30px] sm:h-[30px] 
           xs:w-[30px] xs:h-[30px] 
            mt-2 bg-[#efefef] dark:bg-mediumGrayFull  flex justify-center items-center cursor-pointer"
            onClick={toggleCollapseHandler}
          >
            <ArrowMenu
              className={`size-[15px] ${
                lang === "en" ? "rotate-0" : "rotate-180"
              } stroke-gray dark:stroke-white `}
            />
          </div>

          {state.showFullModalOutMenu && state.isCollapsed && (
            <div className=" w-[90%] relative">
              <ArrowMenu
                className={` absolute h-[20px] w-[20px] fill-blueLink start-[-10px] stroke-blueLink ${
                  lang === "en" ? "rotate-180" : "rotate-0"
                } ${
                  code && code !== router.query.userId ? "top-10" : "top-3"
                } `}
              />
              <div className=" flex flex-col gap-2 w-full ps-2 py-2 mb-[15px] rounded-md bg-blueLink">
                {token && !code && (
                  <Link href={`https://gmail.com`} target="_blank">
                    <p className="text-white dark:text-black text-[14px] hover:text-[15px] font-azarMehr font-normal cursor-pointer">
                      فعال سازی حساب کاربری
                    </p>
                    <hr className=" text-white dark:text-[#2D2D2A38] mt-1" />
                  </Link>
                )}
                {code && code !== router.query.userId && (
                  <Link
                    href={`https://rgb.irpsc.com/${router.query.lang}/citizen/${code}`}
                    target="_blank"
                  >
                    <p className="text-white dark:text-black text-[14px] hover:text-[15px] font-azarMehr font-normal cursor-pointer xs:text-[12px] whitespace-nowrap">
                      {state.dataLogin[4] && state.dataLogin[4].translation}
                    </p>
                    <hr className=" text-white dark:text-[#2D2D2A38] mt-1" />
                  </Link>
                )}
                <a href="https://rgb.irpsc.com/">
                  <p className="text-white dark:text-black text-[14px] hover:text-[15px] font-azarMehr font-normal cursor-pointer xs:text-[12px] whitespace-nowrap">
                    {state.dataLogin[3] && state.dataLogin[3].translation}
                  </p>
                </a>
                <hr className=" text-white dark:text-[#2D2D2A38]" />
                <a href="https://rgb.irpsc.com/metaverse">
                  <p className="text-white dark:text-black text-[14px]  hover:text-[15px] font-azarMehr font-normal  cursor-pointer xs:text-[12px] whitespace-nowrap">
                    {state.dataLogin[2] && state.dataLogin[2].translation}
                  </p>
                </a>
                <hr className=" text-white dark:text-[#2D2D2A38]" />
                <p
                  className="text-white dark:text-black text-[14px]  hover:text-[15px] font-azarMehr font-normal cursor-pointer xs:text-[12px] whitespace-nowrap"
                  onClick={() => setShowLogOut(true)}
                >
                  {state.dataLogin[1] && state.dataLogin[1].translation}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      {children}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  try {
    // استفاده از پارامتر userId از کوئری URL
    const userId = context.query.userId;

    // درخواست به API برای دریافت اطلاعات کاربر
    const res = await axios.get(
      `https://api.rgb.irpsc.com/api/citizen/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ارسال داده‌های دریافتی به کامپوننت صفحه
    return { props: { profileData: res.data.data } };
  } catch (err) {
    // در صورت وجود خطا، ارسال یک پیام خطا یا داده‌های پیش‌فرض
    return { props: { error: "خطا در دریافت داده‌ها" } };
  }
}
