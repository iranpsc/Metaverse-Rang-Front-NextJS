import { useEffect, useState } from "react";
//Types
import { LoginMenu ,ArrowMenu} from "@/svgs/index";
export default function LoginMenuModule({
  isCollapsed,
  setShowAuthCard,
  toggleCollapseHandler,
  menuData,
}: any) {

  const [showFullModal,setShowFullModal] = useState(false);
 

  const submit = ()=>{
    if(isCollapsed){
      toggleCollapseHandler();
      setShowFullModal(!showFullModal);
    }else{
      setShowFullModal(!showFullModal)
    }
  }

  useEffect(()=>{
    
    if(isCollapsed) setShowFullModal(false);

  },[isCollapsed])

  return (
    <>
      <div
        className={`bg-white dark:bg-dark-background h-fit  bottom-4 pb-14  flex justify-center items-center w-full sticky z-[100]`}
      >
        <div
          className={`${
            showFullModal
              ? "h-[210px] w-[90%]   start-[50px] z-[900]"
              : "h-fit w-[80%]"
          } bg-blueLink dark:bg-dark-yellow rounded-2xl flex flex-col justify-evenly items-center transition-all duration-300 ease-linear`}
        >
          {showFullModal && (
            <div className=" flex flex-col gap-2 ">
              <p className="text-white dark:text-black text-[14px] font-medium">
                {menuData[3] && menuData[3].translation}
              </p>
              <hr className=" text-white dark:text-[#2D2D2A38]" />
              <p className="text-white dark:text-black text-[14px] font-medium">
                {menuData[2] && menuData[2].translation}
              </p>
              <hr className=" text-white dark:text-[#2D2D2A38]" />
              <p className="text-white dark:text-black text-[14px] font-medium">
                {menuData[1] && menuData[1].translation}
              </p>
              <hr className=" text-white dark:text-[#2D2D2A38]" />
            </div>
          )}

          <div
            className="bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[10px] w-[80%] h-[44px]  flex flex-row justify-around gap-5 items-center"
            onClick={submit}
          >
            {showFullModal ? (
              <>
                <p className="text-white dark:text-dark-background font-azarMehr font-medium text-center">
                  HM-2000003
                </p>
                <ArrowMenu
                  className={`stroke-white stroke-2 dark:stroke-dark-background h-full w-[10px] rotate-90 ${
                    isCollapsed ? "hidden" : "visibale"
                  }`}
                />
              </>
            ) : (
              <>
                <p className="text-white dark:text-dark-background font-azarMehr font-medium text-center text-[15px]">
                  {menuData[0] && menuData[0].translation}
                </p>
                <LoginMenu
                  className={`stroke-white stroke-2 dark:stroke-dark-background h-full w-5 ${
                    isCollapsed ? "hidden" : "visibale"
                  }`}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
