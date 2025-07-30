"use client";
import React, { useEffect, useRef, useState } from "react";
import { isValidJalaaliDate } from "jalaali-js";
import { startOfMonth } from "date-fns";
import jalaali from "jalaali-js";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { switchDigits } from "@/components/utils/DigitSwitch";
interface calendarProps {
  params: any;
  SetStartOfMonthDate: any;
  setEndOfMonthDate: any;
  eventsDay: Array<EventDay>;
}
interface EventDay {
  starts_at: string;
  ends_at: string;
  color?: string | null;
}
const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const englishMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// محاسبه تعداد روزهای یک ماه شمسی
const getJalaaliMonthLength: any = (jy: number, jm: number) => {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return jalaali.isLeapJalaaliYear(jy) ? 30 : 29;
};

const persianWeekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const englishWeekdays = ["S", "M", "T", "W", "T", "F", "S"];

const toJalaali = (date: Date) => {
  const { jy, jm, jd } = jalaali.toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  return { jy, jm, jd };
};

const toGregorian = (jy: number, jm: number, jd: number) => {
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
  return new Date(gy, gm - 1, gd);
};
export default function Calendar({
  params,
  SetStartOfMonthDate,
  setEndOfMonthDate,
  eventsDay,
}: calendarProps) {
  const monthListRef = useRef<HTMLDivElement>(null);
  const yearListRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isShamsi = params.lang === "fa";
  const [showMonthList, setShowMonthList] = useState(false);
  const [showYearList, setShowYearList] = useState(false);
  const [todayDate, setTodayDate] = useState<Date | null>(null);
  const [selectedEventIds, setSelectedEventIds] = useState<number[]>([]);
  const minYear = isShamsi ? 1398 : 2019;
  const maxYear = isShamsi
    ? toJalaali(new Date()).jy + 5
    : new Date().getFullYear() + 5;
  const totalYears = maxYear - minYear + 1;
  const perPage = 12;
  const totalPages = Math.ceil(totalYears / perPage);

  const baseYear = isShamsi
    ? toJalaali(new Date()).jy
    : new Date().getFullYear();
  const initialOffset = Math.floor((baseYear - minYear) / perPage);
  const [yearOffset, setYearOffset] = useState(initialOffset);
  const canGoPrev = yearOffset > 0;
  const canGoNext = yearOffset < totalPages - 1;

  useEffect(() => {
    const today = new Date();

    const firstDayOfMonth = startOfMonth(today);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    const pad = (n: number) => String(n).padStart(2, "0");

    if (isShamsi) {
      const { jy, jm } = toJalaali(today);
      const firstDayShamsi = `${jy}/${pad(jm)}/01`;

      let lastDay = 31;
      while (!isValidJalaaliDate(jy, jm, lastDay)) {
        lastDay--;
      }

      const lastDayShamsi = `${jy}/${pad(jm)}/${pad(lastDay)}`;
      SetStartOfMonthDate(firstDayShamsi);
      setEndOfMonthDate(lastDayShamsi);
    } else {
      const startJalaali = toJalaali(firstDayOfMonth);
      const endJalaali = toJalaali(lastDayOfMonth);

      SetStartOfMonthDate(
        `${startJalaali.jy}/${pad(startJalaali.jm)}/${pad(startJalaali.jd)}`
      );
      setEndOfMonthDate(
        `${endJalaali.jy}/${pad(endJalaali.jm)}/${pad(endJalaali.jd)}`
      );
    }

    setTodayDate(new Date());
  }, [isShamsi]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        monthListRef.current &&
        !monthListRef.current.contains(event.target as Node)
      ) {
        setShowMonthList(false);
      }

      if (
        yearListRef.current &&
        !yearListRef.current.contains(event.target as Node)
      ) {
        setShowYearList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getDynamicYears = () => {
    const allYears = Array.from({ length: totalYears }, (_, i) => minYear + i);

    const start = yearOffset * perPage;
    return allYears.slice(start, start + perPage);
  };

  const shiftYears = (direction: "next" | "prev") => {
    setYearOffset((prev) => {
      if (direction === "next" && prev < totalPages - 1) {
        return prev + 1;
      }
      if (direction === "prev" && prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  const changeMonth = (direction: "next" | "prev") => {
    if (isShamsi) {
      const { jy, jm } = toJalaali(currentDate);
      let newMonth = direction === "next" ? jm + 1 : jm - 1;
      let newYear = jy;

      if (newMonth > 12) {
        newMonth = 1;
        newYear++;
      }
      if (newMonth < 1) {
        newMonth = 12;
        newYear--;
      }

      if (newYear < minYear) {
        return;
      }
      if (newYear > maxYear) {
        return;
      }

      const newDate = toGregorian(newYear, newMonth, 1);
      setCurrentDate(newDate);

      const formattedStart = `${newYear}/${newMonth
        .toString()
        .padStart(2, "0")}/01`;
      SetStartOfMonthDate(formattedStart);

      const lastDay = getJalaaliMonthLength(newYear, newMonth);
      const formattedEnd = `${newYear}/${newMonth
        .toString()
        .padStart(2, "0")}/${lastDay.toString().padStart(2, "0")}`;
      setEndOfMonthDate(formattedEnd);

      setShowMonthList(false);
    } else {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));

      if (newDate.getFullYear() < minYear) {
        return;
      }
      if (newDate.getFullYear() > maxYear) {
        return;
      }

      setCurrentDate(newDate);

      const start = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
      const end = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);

      const pad = (n: number) => n.toString().padStart(2, "0");
      const startShamsi = toJalaali(start);
      const endShamsi = toJalaali(end);

      const formattedStart = `${startShamsi.jy}/${pad(startShamsi.jm)}/${pad(
        startShamsi.jd
      )}`;
      const formattedEnd = `${endShamsi.jy}/${pad(endShamsi.jm)}/${pad(
        endShamsi.jd
      )}`;

      SetStartOfMonthDate(formattedStart);
      setEndOfMonthDate(formattedEnd);
    }
  };

  const handleDateClick = (selectedDay: Date) => {
    setSelectedDate(selectedDay);
  };

  const getCurrentMonthTitle = () => {
    if (isShamsi) {
      const { jy, jm } = toJalaali(currentDate);
      return `${persianMonths[jm - 1]} ${switchDigits(jy, params.lang)}`;
    } else {
      return format(currentDate, "MMMM yyyy", { locale: enUS });
    }
  };

  const getDaysInMonth = (date: Date) => {
    const days = [];
    let firstDayWeekIndex: number;
    const allEventDates = eventsDay.flatMap((event: any) =>
      getJalaaliDatesBetween(event.starts_at, event.ends_at)
    );

    if (isShamsi) {
      const { jy, jm } = toJalaali(date);
      const monthLength = getJalaaliMonthLength(jy, jm);
      const firstGregorianDate = toGregorian(jy, jm, 1);
      firstDayWeekIndex = (firstGregorianDate.getDay() + 1) % 7;

      for (let day = 1; day <= monthLength; day++) {
        const gDate = toGregorian(jy, jm, day);
        const dateStr = `${jy}/${jm.toString().padStart(2, "0")}/${day
          .toString()
          .padStart(2, "0")}`;

        const isEventDay = allEventDates.includes(dateStr);

        days.push({
          currentDay: gDate,
          jalaaliDate: { jy, jm, jd: day },
          hasEvent: isEventDay,
        });
      }
    } else {
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthLength = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1);
      firstDayWeekIndex = firstDayOfMonth.getDay();

      for (let day = 1; day <= monthLength; day++) {
        const currentDay = new Date(year, month, day);
        days.push({ currentDay, jalaaliDate: null });
      }
    }

    const placeholders = Array(firstDayWeekIndex).fill(null);
    return [...placeholders, ...days];
  };

  function jalaliStringToGregorianDate(jalaliDateStr: string): Date {
    const [jy, jm, jd] = jalaliDateStr.split("/").map(Number);
    const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
    return new Date(gy, gm - 1, gd);
  }

  function getJalaaliDatesBetween(
    startDate: string,
    endDate: string
  ): string[] {
    const start = jalaliStringToGregorianDate(startDate);
    const end = jalaliStringToGregorianDate(endDate);

    const dates: string[] = [];
    const current = new Date(start);

    while (current <= end) {
      const { jy, jm, jd } = jalaali.toJalaali(
        current.getFullYear(),
        current.getMonth() + 1,
        current.getDate()
      );

      const formatted = `${jy}/${String(jm).padStart(2, "0")}/${String(
        jd
      ).padStart(2, "0")}`;
      dates.push(formatted);

      current.setDate(current.getDate() + 1);
    }
    return dates;
  }
  const selectMonth = (monthIndex: number) => {
    const { jy } = toJalaali(currentDate);
    const newMonth = monthIndex + 1;

    const newDate = toGregorian(jy, newMonth, 1);
    setCurrentDate(newDate);

    const formattedStart = `${jy}/${newMonth.toString().padStart(2, "0")}/01`;
    SetStartOfMonthDate(formattedStart);

    const lastDay = getJalaaliMonthLength(jy, newMonth);
    const formattedEnd = `${jy}/${newMonth
      .toString()
      .padStart(2, "0")}/${lastDay.toString().padStart(2, "0")}`;
    setEndOfMonthDate(formattedEnd);

    setShowMonthList(false);
  };

  const getCurrentYear = () => {
    const currentMonthTitle = getCurrentMonthTitle();

    const year = currentMonthTitle.split(" ")[1];
    return year;
  };
  const getCurrentMonth = () => {
    const currentMonthTitle = getCurrentMonthTitle();

    const month = currentMonthTitle.split(" ")[0];
    return month;
  };
  const selectYear = (year: number) => {
    const month = isShamsi
      ? toJalaali(currentDate).jm
      : currentDate.getMonth() + 1;

    const day = 1;

    const newDate = isShamsi
      ? toGregorian(year, month, day)
      : new Date(year, month - 1, day);

    setCurrentDate(newDate);

    const pad = (n: number) => String(n).padStart(2, "0");

    if (isShamsi) {
      const formattedStart = `${year}/${pad(month)}/01`;

      const lastDay = getJalaaliMonthLength(year, month);
      const formattedEnd = `${year}/${pad(month)}/${pad(lastDay)}`;

      SetStartOfMonthDate(formattedStart);
      setEndOfMonthDate(formattedEnd);
    } else {
      const firstDay = new Date(year, month - 1, 1);
      const lastDayDate = new Date(year, month, 0);

      const startJalali = toJalaali(firstDay);
      const endJalali = toJalaali(lastDayDate);

      const formattedStart = `${startJalali.jy}/${pad(startJalali.jm)}/${pad(
        startJalali.jd
      )}`;
      const formattedEnd = `${endJalali.jy}/${pad(endJalali.jm)}/${pad(
        endJalali.jd
      )}`;

      SetStartOfMonthDate(formattedStart);
      setEndOfMonthDate(formattedEnd);
    }

    setShowYearList(false);
  };

  return (
    <div
      className="xl:text-xl 2xl:text-2xl relative w-full border-[1px] border-solid 
    dark:border-[#454545] border-[#BABABA]  sm:pt-4 h-auto p-4 sm:p-5 pt-6 
    dark:bg-[#080807] text-[#DEDEE9] rounded-3xl flex flex-col sm:min-w-[310px] sm:max-w-[310px]
    md:min-w-[380px] md:max-w-[380px] lg:min-w-[450px] lg:max-w-[450px] xl:min-w-[520px]  2xl:min-w-[580px]"
    >
      <div className="flex justify-between pt-2 pb-5 sm:pb-4 xl:pb-10 flex-row-reverse ">
        <div className="flex items-center text-xl">
          <svg
            onClick={() => changeMonth("prev")}
            className={`w-4 h-4 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 cursor-pointer invert dark:invert-0 ${
              isShamsi ? "" : "rotate-180"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>

          <button
            id="showMonth"
            className="flex flex-col items-center justify-center w-7 h-auto cursor-pointer bg-transparent text-white "
            onClick={() => {
              setShowMonthList(!showMonthList);
              setShowYearList(false);
            }}
          >
            <div className="w-4 h-[1px] dark:bg-[#EBEBEB] bg-black  mb-1 xl:w-5 xl:h-[2px] 2xl:w-6 "></div>
            <div className="w-4 h-[1px] dark:bg-[#EBEBEB]  bg-black mb-1 xl:w-5 xl:h-[2px] 2xl:w-6 "></div>
            <div className="w-4 h-[1px] dark:bg-[#EBEBEB] bg-black xl:w-5 xl:h-[2px] 2xl:w-6 "></div>
          </button>
          <svg
            onClick={() => changeMonth("next")}
            className={`w-4 h-4 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 cursor-pointer invert dark:invert-0 ${
              isShamsi ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
        <span className="text-base 2xl:text-2xl xl:text-xl   justify-center items-center font-semibold  flex ">
          <span className="text-black dark:text-white ">
            {getCurrentMonthTitle()}
          </span>
          <svg
            onClick={() => {
              setShowYearList(!showYearList);
              setShowMonthList(false);
            }}
            className={`w-4 h-4 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 cursor-pointer invert dark:invert-0 rotate-90`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </span>
      </div>

      {showMonthList && (
        <div
          ref={monthListRef}
          className={`absolute text-base  xl:text-lg 2xl:text-xl top-[80px] border border-solid dark:border-[#454545] border-[#BABABA] w-[70%] bg-white dark:bg-[#080807] dark:sm:bg-black text-black dark:text-[#868B90] rounded-3xl p-4 min-w-[160px] ${
            isShamsi ? "left-0" : "right-0"
          }`}
          style={{ zIndex: 10 }}
        >
          <div className="grid grid-cols-3 gap-2 text-center ">
            <div className="flex justify-start  pb-2 ">{getCurrentYear()}</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center font-['AzarMehr']  ">
            {(isShamsi ? persianMonths : englishMonths).map((month, index) => (
              <span
                key={index}
                className=" dark:hover:bg-yellow-500 hover:bg-blueLink hover:text-white dark:hover:text-black cursor-pointer rounded-lg py-1 hover:transition-all"
                onClick={() => selectMonth(index)}
              >
                {month}
              </span>
            ))}
          </div>
        </div>
      )}

      {showYearList && (
        <div
          ref={yearListRef}
          className={`absolute text-base   xl:text-lg 2xl:text-xl top-[80px] w-[70%] border border-solid dark:border-[#454545] border-[#BABABA] dark:bg-[#080807] bg-white dark:sm:bg-black text-black dark:text-[#868B90] z-50 rounded-3xl p-4 min-w-[160px] transition-all ${
            isShamsi ? "right-0" : "left-0"
          }`}
          style={{ zIndex: 10 }}
        >
          <div className="flex  justify-between items-center mb-2">
            <span>{getCurrentMonth()}</span>

            <div
              style={{ direction: "ltr" }}
              className=" flex justify-center items-center "
            >
              <svg
                onClick={() => canGoPrev && shiftYears("prev")}
                style={{ visibility: canGoPrev ? "visible" : "hidden" }}
                className={
                  "w-[25px] cursor-pointer invert dark:invert-0 rotate-180"
                }
                fill="none"
                stroke="currentColor"
                viewBox="0 0 26 26"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>

              <svg
                onClick={() => canGoNext && shiftYears("next")}
                style={{ visibility: canGoNext ? "visible" : "hidden" }}
                className={"w-[25px] cursor-pointer invert dark:invert-0 pt-1 "}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 26 26"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center font-['AzarMehr'] max-h-[260px] [direction:ltr]">
            {getDynamicYears().map((year, index) => (
              <span
                key={index}
                className="dark:hover:bg-yellow-500 hover:bg-blueLink hover:text-white dark:hover:text-black cursor-pointer rounded-lg py-1 hover:transition-all"
                onClick={() => {
                  selectYear(year);
                  setYearOffset(0);
                }}
              >
                {switchDigits(year, params.lang)}
              </span>
            ))}
          </div>
        </div>
      )}

      <div
        dir={isShamsi ? "rtl" : "ltr"}
        className="grid grid-cols-7 text-center text-lg font-semibold text-[#868B90] mb-2  "
      >
        {(isShamsi ? persianWeekdays : englishWeekdays).map((day, index) => (
          <div key={index} className="py-2">
            {day}
          </div>
        ))}
      </div>

      <div
        dir={isShamsi ? "rtl" : "ltr"}
        className="calendar-body grid grid-cols-7 gap-1 mb-4 "
      >
        {getDaysInMonth(currentDate).map((day, index) => {
          if (day === null) {
            return <div key={index} className="p-4"></div>;
          }

          const { currentDay, jalaaliDate } = day;
          const dayNumber = isShamsi
            ? jalaaliDate?.jd ?? currentDay.getDate()
            : currentDay.getDate();
          const isToday =
            todayDate && currentDay.toDateString() === todayDate.toDateString();
          const { jy, jm, jd } = jalaali.toJalaali(
            currentDay.getFullYear(),
            currentDay.getMonth() + 1,
            currentDay.getDate()
          );
          // استخراج رنگ‌های یکتا
          const colorMap = {
            red: "#ED2E2E",
            blue: "#0066FF",
            yellow: "#FFC700",
            green: "#32DA6B",
            pink: "#ff00ff",
          };
          function getMatchedEventsForDay(events: any[], currentDay: Date) {
            return events.filter((event) => {
              const dates = getJalaaliDatesBetween(
                event.starts_at,
                event.ends_at
              );

              return dates.some((jDate) => {
                const [jy, jm, jd] = jDate.split("/").map(Number);

                if (isShamsi) {
                  const currentDayStr = `${jy}/${String(jm).padStart(
                    2,
                    "0"
                  )}/${String(jd).padStart(2, "0")}`;
                  const {
                    jy: cJy,
                    jm: cJm,
                    jd: cJd,
                  } = jalaali.toJalaali(
                    currentDay.getFullYear(),
                    currentDay.getMonth() + 1,
                    currentDay.getDate()
                  );
                  const currentDayStrToCompare = `${cJy}/${String(cJm).padStart(
                    2,
                    "0"
                  )}/${String(cJd).padStart(2, "0")}`;
                  return jDate === currentDayStrToCompare;
                } else {
                  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
                  const gDate = new Date(gy, gm - 1, gd);
                  return gDate.toDateString() === currentDay.toDateString();
                }
              });
            });
          }

          const currentDayStr = isShamsi
            ? `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(
                2,
                "0"
              )}`
            : (() => {
                return currentDay.toDateString();
              })();

          const currentEvents = getMatchedEventsForDay(eventsDay, currentDay);

          const currentEventIds = currentEvents.map((e) => e.id);

          const eventColors = Array.from(
            new Set(currentEvents.map((e: any) => e.color))
          ).slice(0, 5);

          const eventDots = eventColors.map((color, i) => (
            <div
              key={`dot-${i}`}
              className="rounded-full w-1 h-1 md:h-1 xl:w-2 xl:h-2"
              style={{ backgroundColor: color }}
            />
          ));
          const emptyDots = Array.from({ length: 5 - eventColors.length }).map(
            (_, i) => (
              <div
                key={`empty-${i}`}
                className="rounded-full w-1 h-1 md:h-1 xl:w-2 xl:h-2 invisible"
              />
            )
          );

          const matchedEvents: EventDay[] = eventsDay.filter(
            (event: EventDay) => {
              const dates: string[] = getJalaaliDatesBetween(
                event.starts_at,
                event.ends_at
              );
              return dates.includes(currentDayStr);
            }
          );

          const colors: string[] = matchedEvents
            .map((e) => e.color?.toLowerCase() ?? "")
            .filter((color) => Object.values(colorMap).includes(color));

          const uniqueColorValues: string[] = [];

          colors.forEach((color) => {
            if (color && !uniqueColorValues.includes(color)) {
              uniqueColorValues.push(color);
            }
          });

          return (
            <div
              key={index}
              className={`calendar-day box-border w-full h-full rounded-lg text-black dark:text-white cursor-pointer relative
    flex flex-row-reverse items-center justify-between sm:max-h-[45px] md:max-h-[300px] my-3 md:my-1 lg:my-2 xl:my-[10px]
    hover:bg-[#0066FF4D] dark:hover:bg-[#FFC70033]
    ${
      selectedDate?.getTime() === currentDay.getTime()
        ? "bg-[#0066FF4D] outline outline-[2px] outline-blueLink dark:outline-dark-yellow dark:bg-[#FFC70033] font-bold"
        : "bg-gray-100 hover:bg-gray-200"
    }`}
              onClick={() => {
                handleDateClick(currentDay);
                setSelectedEventIds(currentEventIds);
              }}
            >
              <div className="flex flex-col items-end justify-start gap-1 px-1 w-1/3">
                {eventDots}
                {emptyDots}
              </div>

              <div
                className={`w-1/3 flex justify-center items-center
      ${
        selectedDate?.getTime() === currentDay.getTime()
          ? "text-blueLink dark:text-dark-yellow"
          : isToday
          ? "text-blueLink dark:text-dark-yellow"
          : ""
      }`}
              >
                {switchDigits(dayNumber, params.lang)}
              </div>

              <div className="w-1/3"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
