"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/svgs";
import Image from "next/image";
import DynamicTimer from "./DynamicTimer";
import { mapEvents, MappedEventItem } from "@/utils/mapEvents";

interface Params {
  lang: "fa" | "en";
}

const SectionTimer = ({ params }: { params: Params }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setInView] = useState(false);
  const [events, setEvents] = useState<MappedEventItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // گرفتن دیتا از API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://api.rgb.irpsc.com/api/calendar?type=event");
        const json = await res.json();
        let allEvents: MappedEventItem[] = mapEvents(json.data);

        // مرتب‌سازی بر اساس تاریخ شروع: جدیدترین‌ها اول
        allEvents.sort((a, b) => {
          const dateA = new Date(a.start).getTime();
          const dateB = new Date(b.start).getTime();
          return dateB - dateA;
        });

        // گرفتن 4 ایونت اول
        const lastFour = allEvents.slice(0, 4);
        setEvents(lastFour);
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
            className="lg:h-[320px] overflow-y-hidden lg:me-5 relative p-[1px] w-full lg:w-1/2 xl:w-2/3 3xl:w-[70%]"

          >
            <div className="h-full w-full   lg:rounded-[48px] py-5 lg:py-7 flex flex-col lg:flex-row gap-5 justify-center items-center">
              <div className="w-full h-full flex justify-center max-w-[360px] max-h-[100%]  lg:rounded-[32px] overflow-hidden">
                <Image
                  className="w-fill h-full  rounded-[38px]"
                  src={eventData.image || "/firstpage/free.webp"}
                  alt={eventData.title}
                  width={360}
                  height={300}
                  quality={75}
                />
              </div>
              <div className="w-full lg:mt-0 text-justify flex flex-col justify-between h-full ">
                <p className="text-start text-lg lg:text-xl 3xl:text-3xl text-black dark:text-white font-azarMehr font-medium ms-1 md:ms-5 2xl:!leading-[46px]">
                  {eventData.title}
                </p>
                <p className="w-fit text-start text-sm 3xl:text-2xl text-lightGray font-azarMehr font-medium ms-1 md:ms-5 line-clamp-4 mt-3 lg:mt-0" dangerouslySetInnerHTML={{ __html: eventData.desc }} />

              </div>
            </div>
          </div>

          {/* تایمر + دکمه‌ها */}
          <div className="h-[320px] w-full lg:w-1/2 xl:w-1/3 3xl:w-[30%]  rounded-[50px] p-[5px] relative " >
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
              <div className="w-full">
                {eventData.btnName && (
                  <p className="w-full rounded-[28px] py-3 text-center  lg:text-lg 3xl:text-[19px] text-white dark:text-black bg-light-primary dark:bg-dark-yellow font-azarMehr font-medium mt-5">
                    {eventData.btnName}
                  </p>
                )}
                {eventData.link && (
                  <p className="w-full rounded-[28px] py-3 mt-5 text-center text-lg 3xl:text-[19px] text-white bg-[#343434] font-azarMehr font-medium">
                    <a href={eventData.link} className="w-full h-full inline-block" target="_blank">
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
