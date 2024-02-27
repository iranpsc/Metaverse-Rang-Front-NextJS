import { ReactNode, useContext, useState } from "react";
import SideBarEducation from "../module/education/SideBarEducation";
import AuthCards from "./AuthCards";
import { AnimatePresence } from "framer-motion";
import LogoutPage from "../templates/LogoutPage";
import { FilterModule } from "../module/categories/FilterModule";
import { SideBarContext } from "../context/SidebarContext";
import { useToken } from "../context/TokenContext";
import { useRouter } from "next/router";
import { ArrowMenu } from "../svgs";
import Link from "next/link";

interface Props {
  children: ReactNode;
}
export default function BaseLayoutEducation({ children }: any) {
  const [showAuthCard, setShowAuthCard] = useState<boolean>(false);
  const [showLogOut, setShowLogOut] = useState<boolean>(false);
  const [activeItem, SetActiveItem] = useState<number>(0);
  const { state, toggleCollapseHandler } = useContext(SideBarContext);
  const { code, token } = useToken();
  const router = useRouter();
  const { lang } = router.query;
  //SEACRH
  const [showFilterItems, setShowFilterItems] = useState<string>("none");

  return (
    <div className="flex flex-row max-h-screen max-lg:h-full  max-lg:flex-col xl:overflow-clip lg:overflow-clip md:overflow-clip sm:overflow-auto xs:overflow-auto no-scrollbar">
      <AnimatePresence>
        {/* {showFilter && (
          <FilterModule
            translateData={translateData}
            showFilterItems={showFilterItems}
            setShowFilterItems={setShowFilterItems}
            setShowFilter={setShowFilter}
            showFilter={showFilter}
          />
        )} */}
      </AnimatePresence>
      <AnimatePresence>
        {showAuthCard && (
          <AuthCards
            setShowAuthCard={setShowAuthCard}
            SetActiveItem={SetActiveItem}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showLogOut && (
          <LogoutPage showLogOut={showLogOut} setShowLogOut={setShowLogOut} />
        )}
      </AnimatePresence>

      <section className=" xl:relative flex flex-row">
        <SideBarEducation
          setShowLogOut={setShowLogOut}
          setShowAuthCard={setShowAuthCard}
          pageName="education"
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

          {state.showFullModalOutMenu && state.isCollapsed && token && (
            <div className=" w-[90%] relative">
              <ArrowMenu
                className={` absolute h-[20px] w-[20px] fill-blueLink dark:fill-dark-yellow start-[-10px] stroke-blueLink dark:stroke-dark-yellow ${
                  lang === "en" ? "rotate-180" : "rotate-0"
                } ${
                  code && code !== router.query.userId ? "top-10" : "top-3"
                } `}
              />
              <div className=" flex flex-col gap-2 w-full ps-2 py-2 mb-[15px] rounded-md bg-blueLink dark:bg-dark-yellow">
                {token && !code && (
                  <Link href={`https://gmail.com`} target="_blank">
                    <p className="text-white dark:text-black text-[14px] hover:text-[15px] font-azarMehr font-normal cursor-pointer">
                      فعال سازی حساب کاربری
                    </p>
                    <hr className=" text-white dark:text-[#2D2D2A38] mt-1" />
                  </Link>
                )}
                {token && code && code !== router.query.userId && (
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
                {token && (
                  <>
                    {" "}
                    <hr className=" text-white dark:text-[#2D2D2A38]" />
                    <p
                      className="text-white dark:text-black text-[14px]  hover:text-[15px] font-azarMehr font-normal cursor-pointer xs:text-[12px] whitespace-nowrap"
                      onClick={() => setShowLogOut(true)}
                    >
                      {state.dataLogin[1] && state.dataLogin[1].translation}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {children}
    </div>
  );
}
