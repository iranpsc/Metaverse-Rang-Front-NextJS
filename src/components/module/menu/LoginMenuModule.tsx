import { useEffect, useState,useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
//Types
import { LoginMenu ,ArrowMenu} from "@/svgs/index";
import { AuthContext } from "@/components/context/AuthContext";
export default function LoginMenuModule({
  isCollapsed,
  setShowAuthCard,
  toggleCollapseHandler,
  menuData,
}: any) {
  const [showFullModal, setShowFullModal] = useState(false);
  const {codeUser} = useContext(AuthContext);
const router = useRouter();



  const submit = () => {
    if (isCollapsed) {
      toggleCollapseHandler();
      setShowFullModal(!showFullModal);
    } else {
      setShowFullModal(!showFullModal);
    }
  };

  const checkLogin =()=>{

    if(codeUser.length>1){
     submit()
    }else{
        setShowAuthCard(true);
    }
  }

  useEffect(() => {
    if (isCollapsed) setShowFullModal(false);
  }, [isCollapsed]);

  return (
    <>
      <div
        className={`bg-white dark:bg-dark-background h-fit  bottom-4 pb-14  flex justify-center   items-center xl:w-full xl:sticky xs:w-[170px] xs:fixed z-[100]`}
      >
        <div
          className={`${
            showFullModal
              ? "h-[200px] w-[80%]   start-[50px] z-[900]"
              : "h-fit w-[80%]"
          } bg-blueLink dark:bg-dark-yellow rounded-[10px] flex flex-col justify-evenly items-center transition-all duration-300 ease-linear`}
        >
          {showFullModal && (
            <div className=" flex flex-col gap-2 w-[80%] pt-2">
              {codeUser !== router.query.userId && (
                  <Link
              href={`https://rgb.irpsc.com/${router.query.lang}/citizen/${codeUser}`}
                
            >
                  
                  <p className="text-white dark:text-black text-[14px] hover:text-[15px] font-azarMehr font-normal cursor-pointer">
                    {menuData[4] && menuData[4].translation}
                  </p>
                  <hr className=" text-white dark:text-[#2D2D2A38] mt-1" />
                </Link>
              )}

              <p className="text-white dark:text-black text-[14px] hover:text-[15px] font-azarMehr font-normal cursor-pointer">
                {menuData[3] && menuData[3].translation}
              </p>
              <hr className=" text-white dark:text-[#2D2D2A38]" />
              <p className="text-white dark:text-black text-[14px]  hover:text-[15px] font-azarMehr font-normal  cursor-pointer">
                {menuData[2] && menuData[2].translation}
              </p>
              <hr className=" text-white dark:text-[#2D2D2A38]" />
              <p className="text-white dark:text-black text-[14px]  hover:text-[15px] font-azarMehr font-normal cursor-pointer">
                {menuData[1] && menuData[1].translation}
              </p>
              <hr className=" text-white dark:text-[#2D2D2A38]" />
            </div>
          )}

          <div
            className="bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[15px] w-[80%] h-[40px]  flex flex-row justify-around gap-5 items-center"
            onClick={checkLogin}
          >
            {codeUser.length > 1 ? (
              <>
                <p className="text-white dark:text-dark-background font-azarMehr uppercase font-medium text-center ">
                  {isCollapsed ? "HM" : codeUser}
                </p>
                <ArrowMenu
                  className={`stroke-white stroke-2 dark:stroke-dark-background h-full w-[10px] rotate-90 ${
                    isCollapsed ? "hidden" : "visibale"
                  }`}
                />
              </>
            ) : (
              <>
                <LoginMenu
                  className={`stroke-white stroke-2 dark:stroke-dark-background h-full w-5 ${
                    isCollapsed ? "hidden" : "visibale"
                  }`}
                />
                <p className="text-white dark:text-dark-background font-azarMehr font-medium text-center text-[15px]">
                  {menuData[0] && menuData[0].translation}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
