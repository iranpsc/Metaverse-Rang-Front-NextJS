import { useContext, useState } from "react";
import { SendIcon, View } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import axios from "axios";
import { useCookies } from "react-cookie";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import LoginButtonModule from "./LoginButtonModule"; // فرض می‌کنم این کامپوننت دارید

const SingleVideoDetailsModule = ({
  DataVideo,
  mainData,
  setRefreshComment,
}: any) => {
  const [isComplete, setIsComplete] = useState(false);
  const [comment, SetComment] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false); // state برای مودال
  const [cookies] = useCookies(["auth"]);

  // تابع پارسر کوکی
  function parsAuthCookieByName(
    _propName: string,
    _paramsString: string = cookies.auth
  ) {
    const authCookie = new URLSearchParams(_paramsString);
    return authCookie.get(_propName);
  }

  const handlerCreateComment = async (videoId: any) => {
    // بررسی لاگین بودن کاربر
    if (!parsAuthCookieByName("token")) {
      setShowLoginModal(true); // نمایش مودال اگر کاربر لاگین نکرده باشد
      return;
    }

    if (comment.length > 5) {
      try {
        const requestData = {
          content: comment,
        };
        const response = await axios.post(
          `https://api.rgb.irpsc.com/api/tutorials/${videoId}/comments`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${parsAuthCookieByName("token")}`,
            },
          }
        );

        SetComment("");
        setRefreshComment((prevRefreshComment: boolean) => !prevRefreshComment);
      } catch (error: any) {
        console.error("خطا:", error?.response?.status);
      }
    }
  };

  return (
    <div className="w-full pt-6 bg-white dark:bg-dark-background rounded-b-[20px] pb-10 px-5">
      <h1 className="w-full text-start text-singleVideo_title xs:text-[16px] text-gray dark:text-white font-azarMehr font-bold">
        {checkData(DataVideo?.title)}
      </h1>
      <div className="w-full xl:hidden flex flex-row justify-start gap-5 mt-4 items-center bg-white dark:bg-dark-background relative">
        <div className="flex flex-row justify-center items-center gap-2">
          <p className="font-azarMehr font-normal text-singleVideo_medium text-black dark:text-white xs:text-[12px]">
            {findByUniqueId(mainData, 191)}
          </p>
          <p className="font-azarMehr font-normal text-black dark:text-white text-singleVideo_medium xs:text-[12px]">
            {checkData(DataVideo.created_at)}
          </p>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <p className="font-azarMehr font-normal text-black dark:text-white text-singleVideo_medium xs:text-[12px]">
            {checkData(DataVideo.views_count)}
          </p>
          <View className="stroke-gray dark:stroke-white xs:size-[24px]" />
        </div>
      </div>

      {!isComplete ? (
        <p
          className="w-full text-start h-fit transition-all duration-300 ease-in-out text-[22px] xs:text-[16px] text-singleVideo-gray dark:text-white font-azarMehr font-normal mt-5"
          dangerouslySetInnerHTML={{
            __html: checkData(DataVideo.description.slice(0, 500)),
          }}
        />
      ) : (
        <p
          className="w-full text-start h-fit transition-all duration-300 ease-in-out text-[22px] xs:text-[16px] text-singleVideo-gray dark:text-white font-azarMehr font-normal mt-5"
          dangerouslySetInnerHTML={{
            __html: checkData(DataVideo.description),
          }}
        />
      )}

      {!isComplete && DataVideo?.description.length > 500 && (
        <>
          <span className="font-azarMehr font-medium xl:text-[12px] text-singleVideo-gray dark:text-white">
            ...
          </span>
          <span
            className="dark:text-dark-yellow mx-2 text-blueLink font-azarMehr font-medium cursor-pointer text-[18px]"
            onClick={() => setIsComplete(!isComplete)}
          >
            {findByUniqueId(mainData, 171)}
          </span>
        </>
      )}

      <div className="relative mt-10 px-3 w-full xs:w-[95%] h-[48px]">
        <input
          type="text"
          className="w-full h-full ps-2 pe-[50px] text-black dark:text-white bg-grayLight dark:bg-black border-none rounded-[12px] placeholder-textInput focus:outline-none focus:shadow-md"
          placeholder={findByUniqueId(mainData, 457)}
          value={comment}
          onChange={(e) => SetComment(e.target.value)}
        />
        <SendIcon
          className="absolute end-[20px] top-1/4 size-[24px] cursor-pointer"
          onClick={() => handlerCreateComment(DataVideo.id)}
        />
      </div>

      {/* مودال ورود */}
      {showLoginModal && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
          <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-center dark:text-white mb-4">
              برای ثبت کامنت باید وارد شوید
            </h2>
            <div className="flex gap-2 justify-between items-center w-full mt-5">
              <LoginButtonModule params={mainData} />
              <div className="w-1/2 flex justify-center">
                <button
                  className="w-full bg-dark-gray dark:bg-extraGray text-black dark:text-white font-azarMehr py-2 px-2 md:px-4 font-medium text-center text-[15px] rounded-[10px] hover:bg-gray-400 active:scale-105 duration-300"
                  onClick={() => setShowLoginModal(false)}
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleVideoDetailsModule;