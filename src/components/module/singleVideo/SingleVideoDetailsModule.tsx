import { useContext, useState, useEffect } from "react";
import { SendIcon, View } from "@/components/svgs/SvgEducation";
import { checkData } from "@/components/utils/targetDataName";
import axios from "axios";
import { useCookies } from "react-cookie";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import LoginButtonModule from "./LoginButtonModule";

const SingleVideoDetailsModule = ({
  DataVideo,
  mainData,
  setRefreshComment,
}: any) => {
  const [isComplete, setIsComplete] = useState(false);
  const [comment, SetComment] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [progress, setProgress] = useState(0); // state برای درصد پیشرفت
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
    if (!parsAuthCookieByName("token")) {
      setShowLoginModal(true);
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
            withCredentials: true,
          }
        );

        SetComment("");
        setRefreshComment((prevRefreshComment: boolean) => !prevRefreshComment);
        setShowSuccessModal(true);
        setProgress(0); // ریست کردن پیشرفت
      } catch (error: any) {
        console.error("خطا:", error?.response?.status);
      }
    }
  };

  // مدیریت نوار پیشرفت
  useEffect(() => {
    if (showSuccessModal) {
      const duration = 3000; // 3 ثانیه
      const intervalTime = 50; // به‌روزرسانی هر 50 میلی‌ثانیه
      const increment = (intervalTime / duration) * 100; // افزایش درصد در هر مرحله

      const interval = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + increment;
          if (nextProgress >= 100) {
            clearInterval(interval);
            setShowSuccessModal(false); // بستن مودال پس از پر شدن
            return 100;
          }
          return nextProgress;
        });
      }, intervalTime);

      return () => clearInterval(interval); // پاکسازی هنگام بسته شدن مودال
    }
  }, [showSuccessModal]);

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
          <View className="stroke-gray dark:stroke-white size-[15px] md:size-[20px]" />
        </div>
      </div>

      {!isComplete ? (
        <p
          className="prose max-w-none prose-p:leading-9 space-y-5 text-sm prose-h1:text-sm prose-h2:text-sm prose-h3:text-sm prose-h4:text-sm lg:text-xl md:prose-h1:text-2xl md:prose-h2:text-2xl md:prose-h3:text-2xl md:prose-h-4:text-2xl dark:text-[#868B90] md:prose-p:text-[#484950] dark:prose-p:text-[#868B90] dark:prose-h1:text-white  dark:prose-h2:text-white  dark:prose-h3:text-white prose-a:text-blueLink dark:prose-a:text-dark-yellow dark:prose-strong:text-white mt-5 [&_ul]:list-disc [&_ul]:pl-5
         [&_ol]:list-decimal [&_ol]:pl-5
         [&_li>p]:inline [&_li>p]:m-0"

          dangerouslySetInnerHTML={{
            __html: checkData(DataVideo.description.slice(0, 500)),
          }}
        />
      ) : (
        <p
          className="prose max-w-none prose-p:leading-9 space-y-5 text-sm prose-h1:text-sm prose-h2:text-sm prose-h3:text-sm prose-h4:text-sm lg:text-xl md:prose-h1:text-2xl md:prose-h2:text-2xl md:prose-h3:text-2xl md:prose-h-4:text-2xl dark:text-[#868B90] [&_span]:text-[#868B90] md:prose-p:text-[#484950] dark:prose-p:text-[#868B90] dark:prose-h1:text-white  dark:prose-h2:text-white  dark:prose-h3:text-white prose-a:text-blueLink dark:prose-a:text-dark-yellow dark:prose-strong:text-white  transition-all duration-300 ease-in-out mt-5 [&_ul]:list-disc [&_ul]:pl-5
         [&_ol]:list-decimal [&_ol]:pl-5
         [&_li>p]:inline [&_li>p]:m-0"
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
            className="dark:text-dark-yellow mx-2 text-blueLink font-azarMehr font-medium cursor-pointer text-sm md:text-[18px]"
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
          className="absolute end-[20px] top-1/4 size-[24px] cursor-pointer active:scale-125 duration-300 ltr:rotate-180"
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

      {showSuccessModal && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
          <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full transition-all duration-50 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-green-600 dark:text-green-400 my-5">
              دیدگاه شما با موفقیت ثبت شد!
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleVideoDetailsModule;