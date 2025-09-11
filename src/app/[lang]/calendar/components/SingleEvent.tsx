"use client";
import { useState, useEffect } from "react";
import htmlTruncate from "html-truncate";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { switchDigits } from "@/components/utils/DigitSwitch";
import moment from "moment-jalaali";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import SyncLoader from "react-spinners/SyncLoader";
import LoginButtonModule from "@/components/module/singleVideo/LoginButtonModule";
import { MappedEventItem } from "@/utils/mapEvents";

// تابع برای پارس تاریخ جلالی
function parseJalaliDatetime(jalaliStr: string): Date {
  return moment(jalaliStr, "jYYYY/jMM/jDD HH:mm").toDate();
}

// محاسبه زمان باقی‌مانده
function getTimeRemaining(targetDate: Date) {
  const now = new Date().getTime();
  const diff = targetDate.getTime() - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

interface SingleEventProps {
  event: MappedEventItem;
  mainData: any;
  params: any;
  token: string | null;
}

const SingleEvent: React.FC<SingleEventProps> = ({
  event,
  mainData,
  params,
  token,
}) => {
  const [likes, setLikes] = useState<number>(event.likes ?? 0);
  const [disLikes, setDisLikes] = useState<number>(event.disLikes ?? 0);
  const [userLiked, setUserLiked] = useState<boolean>(event.userLiked ?? false);
  const [userDisLiked, setUserDisLiked] = useState<boolean>(event.userDisLiked ?? false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState<boolean>(false);
  const [countdowns, setCountdowns] = useState<{
    toStart: { days: number; hours: number; minutes: number; seconds: number };
    toEnd: { days: number; hours: number; minutes: number; seconds: number };
  }>({
    toStart: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    toEnd: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  });

  // تنظیم شمارش معکوس
  useEffect(() => {
    const interval = setInterval(() => {
      const startDate = parseJalaliDatetime(event.start);
      const endDate = parseJalaliDatetime(event.end);
      setCountdowns({
        toStart: getTimeRemaining(startDate),
        toEnd: getTimeRemaining(endDate),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [event.start, event.end]);

  // مدیریت لایک
  const sendLike = async () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    if (userLiked) return;

    setLikes(likes + 1);
    setDisLikes(Math.max(disLikes - 1, 0));
    setUserLiked(true);
    setUserDisLiked(false);

    try {
      const response = await fetch(
        `https://api.rgb.irpsc.com/api/calendar/events/${event.id}/interact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ liked: 1 }),
        }
      );

      if (!response.ok) {
        throw new Error("خطا در ارسال لایک");
      }
    } catch (error) {
      console.error("خطا در ارسال لایک:", error);
    }
  };

  // مدیریت دیسلایک
  const disLike = async () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    if (userDisLiked) return;

    setDisLikes(disLikes + 1);
    setLikes(Math.max(likes - 1, 0));
    setUserDisLiked(true);
    setUserLiked(false);

    try {
      const response = await fetch(
        `https://api.rgb.irpsc.com/api/calendar/events/${event.id}/interact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ liked: 0 }),
        }
      );

      if (!response.ok) {
        throw new Error("خطا در ارسال دیسلایک");
      }
    } catch (error) {
      console.error("خطا در ارسال دیسلایک:", error);
    }
  };

  // لودر تم‌دار
  const ThemedLoader = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      const checkTheme = () => {
        const dark = document.documentElement.classList.contains("dark");
        setIsDark(dark);
      };

      checkTheme();
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    }, []);

    return <SyncLoader color={isDark ? "#FFD700" : "#0066ff"} size={8} />;
  };

  const maxLength = 350;
  const shouldTruncate = event.desc.length > maxLength;
  const truncatedHtml = shouldTruncate
    ? htmlTruncate(event.desc, maxLength, { ellipsis: "..." })
    : event.desc;
  const { toStart, toEnd } = countdowns;

  return (
    <>
      <div className="items flex flex-col justify-center gap-3 items-center w-full">
        {/* تصویر ایونت */}
        <div className="mt-4 w-[97%] flex justify-center lg:w-[95%] mx-auto rounded-[20px] overflow-hidden shadow-lg lg:mt-6">
          <img
            className="w-full"
            src={
              event.image === "image" || !event.image
                ? "/firstpage/frame.jpg"
                : event.image
            }
            alt={event.title}
          />
        </div>

        {/* عنوان و لایک/دیسلایک */}
        <div className="flex flex-col w-[97%] lg:w-[95%] gap-3 sm:gap-0 items-center sm:flex-row-reverse sm:justify-between">
          <div className="w-[96%] flex justify-between text-base font-normal font-[Vazir] sm:w-[350px] sm:ml-2 sm:self-center">
            <div className="flex items-center gap-1">
              <Like
                onClick={sendLike}
                width="20"
                height="24"
                className={`
                  cursor-pointer
                  ${userLiked
                    ? "stroke-[#636363] dark:stroke-[#b3afaf]"
                    : "stroke-black dark:stroke-white"
                  }
                `}
              />
              <span className="like-count mt-[2px]">
                {switchDigits(likes, params.lang)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Dislike
                onClick={disLike}
                width="20"
                height="24"
                className={`
                  cursor-pointer
                  ${userDisLiked
                    ? "stroke-slate-500 dark:stroke-slate-300"
                    : "stroke-black dark:stroke-white"
                  }
                `}
              />
              <span className="dislike-count">
                {switchDigits(disLikes, params.lang)}
              </span>
            </div>
            <div className="flex items-center size-7 gap-1 stroke-black dark:stroke-white">
              <View className="size-full" />
              <span>{switchDigits(event.views, params.lang)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between h-8 w-full font-[Rokh] my-2 sm:w-[60%] xl:h-11">
            <div className="flex items-center h-full w-full">
              <div
                style={{ backgroundColor: event.color }}
                className="h-7 xl:h-9 2xl:h-10 rounded-lg aspect-square"
              ></div>
              <span className="mx-2 whitespace-nowrap text-base font-bold text-ellipsis overflow-hidden lg:text-xl xl:text-2xl 2xl:text-3xl">
                {event.title}
              </span>
            </div>
          </div>
        </div>

        {/* توضیحات ایونت */}
        <div className="text-base lg:w-[95%] break-words whitespace-normal text-[#868B90] dark:text-[#C4C4C4] mb-4 text-justify leading-6 w-[97%] font-normal font-[Vazir] 2xl:text-xl 2xl:leading-8">
          <div
            dangerouslySetInnerHTML={{
              __html: event.desc ,
            }}
          />

        </div>

        {/* شمارش معکوس */}
        <div
          className="px-4 mb-2 w-[97%] lg:w-[95%] lg:px-7 font-[AzarMehrFD] 
          bg-gradient-to-r from-[#CFCFCFE5] to-[#D8D8D800]
          dark:bg-gradient-to-r dark:from-[#ffffff09] dark:to-[#00000000] dark:text-dark-yellow text-blueLink rounded-[32px] border-[1px] border-solid dark:border-[#ffffff25] border-[#CFCFCFE5] shadow-lg p-4 flex flex-col sm:flex-row-reverse sm:h-[250px]"
        >
          <div className="flex flex-col justify-start sm:order-1 sm:content-start sm:w-[30%] sm:min-w-[194px]">
            <h2 className="text-[16px] font-bold self-center sm:self-start text-black dark:text-white pb-6 sm:mt-4 sm:pb-6 sm:text-start 2xl:text-xl xl:text-lg lg:text-base">
              {findByUniqueId(mainData, 583)} :
            </h2>
            <div className="flex justify-between items-center" style={{ direction: "ltr" }}>
              <div className="text-center">
                <div
                  id="start-days"
                  className="hale text-2xl font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl"
                >
                  {switchDigits(toStart.days.toString().padStart(2, "0"), params.lang)}
                </div>
                <div className="text-base">{findByUniqueId(mainData, 380)}</div>
              </div>
              <span className="self-start text-[24px] leading-10 font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
                :
              </span>
              <div className="text-center">
                <div
                  id="start-hours"
                  className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                >
                  {switchDigits(toStart.hours.toString().padStart(2, "0"), params.lang)}
                </div>
                <div className="text-base">{findByUniqueId(mainData, 560)}</div>
              </div>
              <span className="self-start text-[24px] leading-10 font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
                :
              </span>
              <div className="text-center">
                <div
                  id="start-minutes"
                  className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                >
                  {switchDigits(toStart.minutes.toString().padStart(2, "0"), params.lang)}
                </div>
                <div className="text-base">{findByUniqueId(mainData, 33)}</div>
              </div>
              <span className="self-start text-[24px] leading-10 font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
                :
              </span>
              <div className="text-center">
                <div
                  id="start-seconds"
                  className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                >
                  {switchDigits(toStart.seconds.toString().padStart(2, "0"), params.lang)}
                </div>
                <div className="text-base">{findByUniqueId(mainData, 778)}</div>
              </div>
            </div>
          </div>
          <div className="text-center mb-4 sm:w-[30%] sm:min-w-[194px]">
            <h2 className="text-[16px] font-bold text-black dark:text-white pb-6 sm:pb-6 sm:mt-4 sm:text-start 2xl:text-xl xl:text-lg lg:text-base pt-6 sm:pt-0">
              {findByUniqueId(mainData, 584)} :
            </h2>
            <div className="flex justify-between items-center" style={{ direction: "ltr" }}>
              <div className="text-center">
                <div
                  id="end-days"
                  className="hale text-2xl font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl"
                >
                  {switchDigits(toEnd.days.toString().padStart(2, "0"), params.lang)}
                </div>
                <div className="text-base">{findByUniqueId(mainData, 380)}</div>
              </div>
              <span className="self-start text-[24px] leading-10 font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
                :
              </span>
              <div className="text-center">
                <div
                  id="end-hours"
                  className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                >
                  {switchDigits(toEnd.hours.toString().padStart(2, "0"), params.lang)}
                </div>
                <div className="text-base">{findByUniqueId(mainData, 560)}</div>
              </div>
              <span className="self-start text-[24px] leading-10 font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
                :
              </span>
              <div className="text-center">
                <div
                  id="end-minutes"
                  className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                >
                  {switchDigits(toEnd.minutes.toString().padStart(2, "0"), params.lang)}
                </div>
                <div className="text-base">{findByUniqueId(mainData, 33)}</div>
              </div>
              <span className="self-start text-[24px] leading-10 font-bold lg:text-3xl xl:text-4xl 2xl:text-5xl">
                :
              </span>
              <div className="text-center">
                <div
                  id="end-seconds"
                  className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl 2xl:text-5xl"
                >
                  {switchDigits(toEnd.seconds.toString().padStart(2, "0"), params.lang)}
                </div>
                <div className="text-base">{findByUniqueId(mainData, 778)}</div>
              </div>
            </div>
          </div>
          <div className="flex text-center sm:justify-center mt-4 sm:w-2/5">
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="dark:bg-dark-yellow bg-blueLink text-white dark:text-black font-bold py-2 px-4 w-full mb-2 h-11 self-end rounded-[28px] sm:text-lg sm:font-semibold sm:w-[60%] text-center justify-center items-center flex"
            >
              <span>{event.btnName}</span>
            </a>
          </div>
        </div>
        <div className="mt-6 w-full lg:w-[95%] h-[2px] bg-gradient-to-r from-transparent via-[#DADADA] to-transparent"></div>
      </div>
      {showLoginModal && (
        <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50 p-5">
          <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg md:text-xl font-azarMehr font-bold text-center dark:text-white mb-4">
              {findByUniqueId(mainData, 1459)}
            </h2>
            <div className="flex gap-2 justify-between items-center w-full mt-5">
              <LoginButtonModule params={mainData} />
              <div className="w-1/2 flex justify-center">
                <button
                  className="w-full bg-dark-gray dark:bg-extraGray text-black dark:text-white font-azarMehr py-2 px-2 md:px-4 font-medium text-[15px] rounded-[10px] hover:bg-gray-400 active:scale-105 duration-300"
                  onClick={() => setShowLoginModal(false)}
                >
                  {findByUniqueId(mainData, 884)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleEvent;