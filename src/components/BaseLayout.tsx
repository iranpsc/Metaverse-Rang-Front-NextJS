import { ReactNode, useContext, useState } from "react";
import SideBarEducation from "./module/education/SideBarEducation";
import AuthCards from "@/layout/AuthCards";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import MenuItemPage from "./templates/MenuItemPage";
import { SideBarContext } from "./context/SidebarContext";

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
  const { state } = useContext(SideBarContext);

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
      <section>
        <SideBarEducation
          setShowAuthCard={setShowAuthCard}
          pageName="citizen"
          profileData={profileData}
          titleData={titleData}
          setShowLogOut={setShowLogOut}
        />
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
