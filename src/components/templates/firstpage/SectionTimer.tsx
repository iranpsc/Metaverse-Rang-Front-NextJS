"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/svgs";
import Image from "next/image";
import DynamicTimer from "./DynamicTimer";
import { mapEvents, MappedEventItem } from "@/utils/mapEvents";
import jalaali from "jalaali-js";
interface Params {
  lang: "fa" | "en";
}
const jalaliToTimestamp = (dateStr: string) => {
  // "1404/08/16 09:00"
  const [d, t] = dateStr.split(" ");
  const [jy, jm, jd] = d.split("/").map(Number);
  const [h, m] = t.split(":").map(Number);

  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
  return new Date(gy, gm - 1, gd, h, m).getTime();
};
const SectionTimer = ({ params }: { params: Params }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setInView] = useState(false);
  const [events, setEvents] = useState<MappedEventItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [linkLoading, setLinkLoading] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://api.rgb.irpsc.com/api/calendar?type=event");
        const json = await res.json();
        const allEvents: MappedEventItem[] = mapEvents(json.data);
        const now = Date.now();

        // ---------------------------
        // 1) تایمر دارهای فعال
        // ---------------------------
        const activeTimedEvents = allEvents
          .filter(ev => ev.end && jalaliToTimestamp(ev.end) > now)
          .sort((a, b) =>
            jalaliToTimestamp(a.end!) - jalaliToTimestamp(b.end!)
          );

        // اگر ۴ تا یا بیشتر داریم
        if (activeTimedEvents.length >= 4) {
          setEvents(activeTimedEvents.slice(0, 4));
          return;
        }

        // ---------------------------
        // 2) پر کردن با پایان‌یافته‌ها
        // ---------------------------
        const endedTimedEvents = allEvents
          .filter(ev => ev.end && jalaliToTimestamp(ev.end) <= now)
          .sort((a, b) =>
            jalaliToTimestamp(b.end!) - jalaliToTimestamp(a.end!)
          );

        const remainingCount = 4 - activeTimedEvents.length;

        const finalEvents = [
          ...activeTimedEvents,
          ...endedTimedEvents.slice(0, remainingCount),
        ];

        setEvents(finalEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  // فعال کردن وقتی اسکرول بهش رسید
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setInView(true);
      },
      { rootMargin: "0px", threshold: 0.01 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  if (!isInView) return <div ref={sectionRef} style={{ minHeight: "500px" }} />;

  if (events.length === 0) return <div className="text-center p-10">در حال بارگذاری رویدادها...</div>;

  const eventData = events[currentIndex];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % events.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);

  return (
    <div
      ref={sectionRef}
      className="w-full h-full flex flex-wrap lg:flex-nowrap justify-evenly gap-5 my-12 md:my-0 items-center relative px-6"
    >
      {linkLoading && (
        <div className="fixed top-0 left-0 bottom-0  w-full  h-screen z-[40] flex items-center justify-center bg-black/60 backdrop-blur-sm" >
          <div className="container flex w-full h-screen items-center justify-center md:ms-[25vw] lg:ms-[17vw] xl:ms-[15vw] 3xl:ms-[16vw]">
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
            <div className="holder">
              <div className="box"></div>
            </div>
          </div>
        </div>
      )}
      <div className="md:hidden flex items-center justify-between w-full absolute z-10 top-[91px] px-1 ">
        <div
          onClick={handlePrev}
          className="bg-light-primary dark:bg-dark-yellow rounded-full p-[8px] cursor-pointer flex justify-center items-center "
        >
          <ArrowRight className="stroke-white dark:stroke-[#1b1b1b] size-[24px] rotate-0 ltr:rotate-180" />
        </div>
        <div
          onClick={handleNext}
          className="bg-light-primary dark:bg-dark-yellow rounded-full p-[8px] cursor-pointer  flex justify-center items-center ms-5"
        >
          <ArrowRight className="stroke-white dark:stroke-[#1b1b1b] size-[24px] rotate-180 ltr:rotate-0" />
        </div>
      </div>
      {/* دکمه چپ */}
      <div
        onClick={handlePrev}
        className="bg-light-primary dark:bg-dark-yellow rounded-full p-[10px] cursor-pointer hidden lg:flex justify-center items-center"
      >
        <ArrowRight className="stroke-white dark:stroke-[#1b1b1b] size-[32px] rotate-0 ltr:rotate-180" />
      </div>

      {/* باکس ایونت */}
      <div style={{ background: "linear-gradient(-135deg, transparent, #9898a0 , transparent)" }} className="p-[1px] rounded-[48px] lg:rounded-[50px]">
        <div className="flex flex-col lg:flex-row pb-5 px-5 lg:p-5 w-full transition-all duration-500 bg-[#DEDEE9] dark:bg-[#313131] rounded-[48px] lg:rounded-[50px] " >
          {/* عکس و توضیحات */}
          <div
            className="lg:h-[250px] 2xl:h-[280px] 3xl:h-[320px] overflow-y-hidden lg:me-5 relative p-[1px] w-full lg:w-1/2 xl:w-2/3 3xl:w-[70%]"

          >
            <div className="h-full w-full  py-5 md:py-0 lg:rounded-[48px]  flex flex-col lg:flex-row gap-5 justify-center items-center">
              <div className="w-full h-full flex justify-center max-w-[380px] max-h-[100%]  lg:rounded-[32px] overflow-hidden relative">
                <Image
                  className="w-fill h-full  rounded-[38px] relative"
                  src={eventData.image || "/firstpage/free.webp"}
                  alt={eventData.title}
                  width={380}
                  height={350}
                  quality={75}
                />
                <div className="w-full h-full bg-gradient-to-b to-[#DEDEE9] via-[#dedee942]  from-[#dedee905] md:bg-gradient-to-l md:to-[#DEDEE9] md:via-[#dedee942]  md:from-[#dedee905]  dark:bg-gradient-to-b dark:to-[#313131] dark:via-[#3131315b]  dark:from-[#31313100]  md:dark:bg-gradient-to-l md:dark:to-[#313131] md:dark:via-[#3131315b]  md:dark:from-[#31313100] absolute right-0 ">

                </div>
              </div>
              <div className="w-full lg:mt-0 text-justify flex flex-col justify-between h-full  md:py-4 ">
                <p className="text-start text-lg lg:text-xl 3xl:text-3xl text-black dark:text-white font-azarMehr font-medium ms-1 md:ms-5 2xl:!leading-[46px]">
                  {eventData.title}
                </p>
                <p className="w-fit text-start text-sm lg:text-base xl:text-xl 3xl:text-2xl text-lightGray font-azarMehr font-medium ms-1 md:ms-5 line-clamp-4 mt-3 lg:mt-0" dangerouslySetInnerHTML={{ __html: eventData.desc }} />

              </div>
            </div>
          </div>

          {/* تایمر + دکمه‌ها */}
          <div className="lg:h-[250px] 2xl:h-[280px]  3xl:h-[320px] w-full lg:w-1/2 xl:w-1/3 3xl:w-[30%]  rounded-[50px] p-[5px] relative " >
            <div className="p-[20px] h-full rounded-3xl md:rounded-[50px] flex flex-col justify-around items-center relative bg-gradient-to-tl to-[#dfdfdf] from-white dark:to-[#FFFFFF17]  dark:from-[#22222291]">
              <DynamicTimer
                daysLabel={params.lang === "fa" ? "روز" : "Days"}
                hoursLabel={params.lang === "fa" ? "ساعت" : "Hours"}
                minutesLabel={params.lang === "fa" ? "دقیقه" : "Minutes"}
                secondsLabel={params.lang === "fa" ? "ثانیه" : "Seconds"}
                targetDate={eventData.start} // تاریخ شروع جلالی
                endDate={eventData.end}
                params={params}     // تاریخ پایان جلالی
              />
              <div className="w-full flex flex-col">
                {eventData.btnName && (
                  <a target="_blank" aria-label="meta btn" href={eventData.link} className=" !w-full rounded-[28px] py-3 text-center  lg:text-lg 3xl:text-[19px] text-white dark:text-black bg-light-primary dark:bg-dark-yellow font-azarMehr font-medium mt-5">
                    {eventData.btnName}
                  </a>
                )}
                {eventData.link && (
                  <p className="w-full rounded-[28px] py-3 mt-5 text-center text-lg 3xl:text-[19px] text-white bg-[#343434] font-azarMehr font-medium">
                    <a onClickCapture={() => setLinkLoading(true)} href={`/${params.lang}/calendar/${eventData.id}`} className="w-full h-full inline-block" >
                      {params.lang === "fa" ? "مشاهده جزئیات" : "View Details"}
                    </a>

                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* دکمه راست */}
      <div
        onClick={handleNext}
        className="bg-light-primary dark:bg-dark-yellow rounded-full p-[10px] cursor-pointer hidden lg:flex justify-center items-center ms-5"
      >
        <ArrowRight className="stroke-white dark:stroke-[#1b1b1b] size-[32px] rotate-180 ltr:rotate-0" />
      </div>
    </div>
  );
};

export default SectionTimer;
