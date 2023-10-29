import { useState } from "react";
//Types
import { LoginMenu } from "@/svgs/index";
export default function LoginMenuModule({
  isCollapsed,
  setShowAuthCard,
  toggleCollapseHandler,
  menuData,
}: any) {

  const [showFullModal,setShowFullModal] = useState(false);
  console.log(showFullModal);

  // const submit = ()=>{
  //   setShowAuthCard(true)
  //   toggleCollapseHandler();
  // }

  return (
    <>
      <div
        className={`bg-white dark:bg-dark-background h-fit bottom-0  flex justify-center items-center w-full sticky`}
      >
        <div
          className={`${
            showFullModal ? "h-[210px] w-[90%]   start-[50px] z-[900]" : "h-fit w-[80%]"
          }  dark:bg-dark-yellow rounded-2xl flex flex-col justify-evenly items-center transition-all duration-300 ease-linear`}
        >
          {showFullModal && (
            <div className=" flex flex-col gap-2">
              <p className="text-black text-[16px] font-bold">
                صفحه مشخصات شهروند
              </p>
              <hr className=" text-[#2D2D2A38]" />
              <p className="text-black text-[16px] font-bold">صفحه نخست</p>
              <hr className=" text-[#2D2D2A38]" />
              <p className="text-black text-[16px] font-bold">خروج</p>
              <hr className=" text-[#2D2D2A38]" />
            </div>
          )}

          <div
            className="bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[10px] w-[80%] h-[44px]  flex flex-row justify-around gap-5 items-center"
            onClick={() => setShowFullModal(!showFullModal)}
          >
            <LoginMenu
              className={`stroke-white stroke-2 dark:stroke-dark-background h-full w-5 ${
                isCollapsed ? "hidden" : "visibale"
              }`}
            />
            <p className="text-white dark:text-dark-background font-azarMehr font-medium text-center">
         
              {menuData[0] && menuData[0].translation}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
