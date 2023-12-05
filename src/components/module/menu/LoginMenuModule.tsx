import { useEffect, useState,useContext } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
//Types
import { LoginMenu ,ArrowMenu} from "@/svgs/index";
import { useToken } from "@/context/TokenContext";

export default function LoginMenuModule({
  isCollapsed,
  setShowAuthCard,
  toggleCollapseHandler,
  menuData,
}: any) {
    const { theme } = useTheme();
  const [showFullModal, setShowFullModal] = useState(false);
 const { code, removeToken,token } = useToken();
const router = useRouter();

console.log(token,code);

  const submit = () => {
    if (isCollapsed) {
      toggleCollapseHandler();
      setShowFullModal(!showFullModal);
    } else {
      setShowFullModal(!showFullModal);
    }
  };

  const checkLogin =()=>{

   
    if (code && code.length > 1) {
      submit();
    } else {
      if(token && !code){
        submit();
      } else{

        setShowAuthCard(true);
      }
    }
  }

  useEffect(() => {
    if (isCollapsed) setShowFullModal(false);
  }, [isCollapsed]);

  const logout = ()=>{
    removeToken()
    setShowFullModal(false);
  }

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
              {token && !code &&
              <Link
                  href={`https://gmail.com`}
                  target="_blank"
                >
                  <p className="text-white dark:text-black text-[14px] hover:text-[15px] font-azarMehr font-normal cursor-pointer">
                   فعال سازی حساب کاربری
                  </p>
                  <hr className=" text-white dark:text-[#2D2D2A38] mt-1" />
                </Link>
              }
              {code && code !== router.query.userId && (
                <Link
                  href={`https://rgb.irpsc.com/${router.query.lang}/citizen/${code}`}
                  target="_blank"
                >
                  <p className="text-white dark:text-black text-[14px] hover:text-[15px] font-azarMehr font-normal cursor-pointer">
                    {menuData[4] && menuData[4].translation}
                  </p>
                  <hr className=" text-white dark:text-[#2D2D2A38] mt-1" />
                </Link>
              )}
              <Link href="https://rgb.irpsc.com/">
                <p className="text-white dark:text-black text-[14px] hover:text-[15px] font-azarMehr font-normal cursor-pointer">
                  {menuData[3] && menuData[3].translation}
                </p>
              </Link>
              <hr className=" text-white dark:text-[#2D2D2A38]" />
              <Link href="https://rgb.irpsc.com/metaverse/">
                <p className="text-white dark:text-black text-[14px]  hover:text-[15px] font-azarMehr font-normal  cursor-pointer">
                  {menuData[2] && menuData[2].translation}
                </p>
              </Link>
              <hr className=" text-white dark:text-[#2D2D2A38]" />
              <p
                className="text-white dark:text-black text-[14px]  hover:text-[15px] font-azarMehr font-normal cursor-pointer"
                onClick={logout}
              >
                {menuData[1] && menuData[1].translation}
              </p>
              <hr className=" text-white dark:text-[#2D2D2A38]" />
            </div>
          )}

          <div
            className="bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[15px] w-[80%] h-[40px]  flex flex-row justify-around gap-5 items-center"
            onClick={checkLogin}
          >
            {code && code.length > 1 ? (
              <>
                <p className="text-white dark:text-dark-background font-azarMehr uppercase font-medium text-center ">
                  {isCollapsed ? "HM" : code}
                </p>
                <ArrowMenu
                  className={`stroke-white stroke-2 dark:stroke-dark-background h-full w-[10px] rotate-90 ${
                    isCollapsed ? "hidden" : "visibale"
                  }`}
                />
              </>
            ) : (
              <>
                {token && !code ? (
                  <>
                    {isCollapsed ? (
                      <Image
                        src={
                          theme === "dark"
                            ? "/mail-send-dark.png"
                            : "/mail-send-light.png"
                        }
                        width={1000}
                        height={1000}
                        alt="active-mail"
                        className="w-[35px] h-[35px]"
                      />
                    ) : (
                      <p className="text-white dark:text-dark-background text-[13px] font-azarMehr  font-normal text-start ">
                        حساب  خود را فعال کنید
                      </p>
                    )}
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
