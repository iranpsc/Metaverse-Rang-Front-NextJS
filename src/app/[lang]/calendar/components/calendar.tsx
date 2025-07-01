"use client";
import React, { useEffect, useRef, useState } from "react";

import jalaali from "jalaali-js";
import { format } from "date-fns";
import { faIR, enUS } from "date-fns/locale"; // اضافه کردن enUS برای زبان انگلیسی
import { monthsInYear } from "date-fns/constants";
interface calendarProps{
 mainData:any,
 params:any 
}
// ماه‌های شمسی
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

// ماه‌های میلادی (برای زمانی که زبان انگلیسی انتخاب شده)
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

// تبدیل تاریخ میلادی به شمسی
const toJalaali = (date: Date) => {
  const { jy, jm, jd } = jalaali.toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  return { jy, jm, jd };
};

// تبدیل تاریخ شمسی به میلادی
const toGregorian = (jy: number, jm: number, jd: number) => {
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
  return new Date(gy, gm - 1, gd);
};

// تبدیل اعداد به فارسی
const toPersianNumbers = (input: number | string) => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input
    .toString()
    .split("")
    .map((char) => persianNumbers[+char] || char)
    .join("");
};

// محاسبه تعداد روزهای یک ماه شمسی
const getJalaaliMonthLength = (jy: number, jm: number) => {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  // اسفند: بررسی کبیسه بودن سال
  return jalaali.isLeapJalaaliYear(jy) ? 30 : 29;
};

// روزهای هفته به فارسی
const persianWeekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]; // شروع از شنبه
const englishWeekdays = ["S", "M", "T", "W", "T", "F", "S"];

export default function Calendar({params}:calendarProps) {
  const monthListRef = useRef<HTMLDivElement>(null);
  const yearListRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isShamsi = params.lang === "fa";
  const [showMonthList, setShowMonthList] = useState(false); // نمایش یا مخفی کردن لیست ماه‌ها
  const [showYearList, setShowYearList] = useState(false);
  const [currentYearPage, setCurrentYearPage] = useState(0);
  const [yearOffset, setYearOffset] = useState(0); // تغییر سال‌ها با فلش‌ها
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
    const baseYear = isShamsi
      ? toJalaali(currentDate).jy
      : currentDate.getFullYear();
    const startYear = baseYear + yearOffset * 12;
    const years = [];
    for (let i = 0; i < 12; i++) {
      years.push(startYear + i);
    }
    return years;
  };
  const shiftYears = (direction: "next" | "prev") => {
    setYearOffset((prev) => prev + (direction === "next" ? 1 : -1));
  };

  // تغییر ماه
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
      const newDate = toGregorian(newYear, newMonth, 1);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
      setCurrentDate(newDate);
    }
  };

  // گرفتن روزهای ماه
  const getDaysInMonth = (date: Date) => {
    const days = [];
    let firstDayWeekIndex: number;

    if (isShamsi) {
      const { jy, jm } = toJalaali(date);
      const monthLength = getJalaaliMonthLength(jy, jm);
      const firstGregorianDate = toGregorian(jy, jm, 1);
      firstDayWeekIndex = (firstGregorianDate.getDay() + 1) % 7; // تبدیل به شنبه‌محور برای شمسی

      for (let day = 1; day <= monthLength; day++) {
        const gDate = toGregorian(jy, jm, day);
        days.push({ currentDay: gDate, jalaaliDate: { jy, jm, jd: day } });
      }
    } else {
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthLength = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1);
      firstDayWeekIndex = firstDayOfMonth.getDay(); // همونطور که هست: یکشنبه‌محور (0 = Sunday)

      for (let day = 1; day <= monthLength; day++) {
        const currentDay = new Date(year, month, day);
        days.push({ currentDay, jalaaliDate: null });
      }
    }

    const placeholders = Array(firstDayWeekIndex).fill(null);
    return [...placeholders, ...days];
  };

  // عنوان ماه جاری
  const getCurrentMonthTitle = () => {
    if (isShamsi) {
      const { jy, jm } = toJalaali(currentDate);
      return `${persianMonths[jm - 1]} ${toPersianNumbers(jy)}`;
    } else {
      return format(currentDate, "MMMM yyyy", { locale: enUS }); // استفاده از enUS برای ماه‌های انگلیسی
    }
  };

  // تابع برای چاپ تاریخ انتخابی به کنسول
  const handleDateClick = (selectedDay: Date) => {
    setSelectedDate(selectedDay);

    // چاپ تاریخ میلادی
    console.log("میلادی:", format(selectedDay, "yyyy-MM-dd"));

    // چاپ تاریخ شمسی
    if (isShamsi) {
      const { jy, jm, jd } = toJalaali(selectedDay);
      console.log(
        "شمسی:",
        `${toPersianNumbers(jd)} ${persianMonths[jm - 1]} ${toPersianNumbers(
          jy
        )}`
      );
    }
  };

  // تغییر ماه به ماه انتخاب شده
  const selectMonth = (monthIndex: number) => {
    const { jy } = toJalaali(currentDate);
    const newDate = toGregorian(jy, monthIndex + 1, 1); // ماه‌ها 0-indexed هستند، پس +1 می‌کنیم
    setCurrentDate(newDate);
    setShowMonthList(false); // بستن لیست بعد از انتخاب ماه
  };
  const getCurrentYear = () => {
    const currentMonthTitle = getCurrentMonthTitle(); // خروجی تابع getCurrentMonthTitle

    // گرفتن فقط سه حرف اول از خروجی
    const year = currentMonthTitle.split(" ")[1]; // جدا کردن بخش سال از تاریخ
    return year; // برگرداندن سال
  };
  const getCurrentMonth = () => {
    const currentMonthTitle = getCurrentMonthTitle(); // خروجی تابع getCurrentMonthTitle

    // گرفتن فقط سه حرف اول از خروجی
    const month = currentMonthTitle.split(" ")[0]; // جدا کردن بخش سال از تاریخ
    return month; // برگرداندن سال
  };
  const getAvailableYears = () => {
    const currentYear = isShamsi
      ? toJalaali(currentDate).jy
      : currentDate.getFullYear();
    const range = 10;
    const years = [];
    for (let i = currentYear - range; i <= currentYear + range; i++) {
      years.push(i);
    }
    return years;
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
    setShowYearList(false);
  };

  return (
    <div className="xl:text-xl 2xl:text-2xl relative w-full border-[1px] border-solid dark:border-[#454545] border-[#BABABA]  sm:pt-4 h-auto p-4 sm:p-5 pt-6 dark:bg-[#080807] text-[#DEDEE9] rounded-3xl flex flex-col sm:min-w-[310px] md:min-w-[380px] md:max-w-[380px] lg:min-w-[450px] lg:max-w-[450px] xl:min-w-[520px] x 2xl:min-w-[580px]">
      <div className="flex justify-between pt-2 pb-5 sm:pb-4 xl:pb-10 flex-row-reverse ">
        <div className="flex items-center text-xl">
          <img
            src="/svg/arrow.svg"
            className={`w-6 h-6 xl:w-7 xl:h-7 2xl:w-9 2xl:h-9 cursor-pointer invert dark:invert-0 ${
              isShamsi ? "rotate-[270deg]" : "rotate-90"
            }`}                onClick={() => changeMonth("prev")}
          />

          <button
            id="showMonth"
            className="flex flex-col items-center justify-center w-7 h-auto cursor-pointer bg-transparent text-white "
            onClick={() => {
              setShowMonthList(!showMonthList);
              setShowYearList(false);
            }} // نمایش یا مخفی کردن لیست ماه‌ها
          >
            <div className="w-4 h-[1px] dark:bg-[#EBEBEB] bg-black  mb-1 xl:w-5 xl:h-[2px] 2xl:w-6 "></div>
            <div className="w-4 h-[1px] dark:bg-[#EBEBEB]  bg-black mb-1 xl:w-5 xl:h-[2px] 2xl:w-6 "></div>
            <div className="w-4 h-[1px] dark:bg-[#EBEBEB] bg-black xl:w-5 xl:h-[2px] 2xl:w-6 "></div>
          </button>
          <img
            src="/svg/arrow.svg"
            className={`w-6 h-6 xl:w-7 xl:h-7 2xl:w-9 2xl:h-9 cursor-pointer invert dark:invert-0 ${
              isShamsi ? "rotate-[90deg]" : "rotate-[270deg]"
            }`}            onClick={() => changeMonth("next")}
          />
        </div>
        <span className="text-base 2xl:text-2xl xl:text-xl   justify-center items-center font-semibold  flex ">
          <span className="text-black dark:text-white ">
            {getCurrentMonthTitle()}
          </span>
          <img
            src="/svg/arrow.svg"
            className="w-6 h-6 xl:w-7 xl:h-7  2xl:w-9 2xl:h-9  cursor-pointer invert dark:invert-0"
            onClick={() => {
              setShowYearList(!showYearList);
              setShowMonthList(false); // اگر سال‌ها رو نشون بدیم، ماه‌ها بسته بشن
            }}
          />
        </span>
      </div>

      {/* نمایش لیست ماه‌ها به صورت absolute وقتی که showMonthList true باشه */}
      {showMonthList && (
        <div
        ref={monthListRef}

        className={`absolute text-base xl:text-lg 2xl:text-xl top-[80px] border border-solid dark:border-[#454545] border-[#BABABA] w-[70%] bg-white dark:bg-[#080807] dark:sm:bg-black text-black dark:text-[#868B90] rounded-3xl p-4 min-w-[160px] ${isShamsi ? "left-0" : "right-0"}`}
        style={{ zIndex: 10 }}
        >
          <div className="grid grid-cols-3 gap-2 text-center ">
            <div className="flex justify-start  pb-2 ">{getCurrentYear()}</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center font-['AzarMehr']  ">
            {(isShamsi ? persianMonths : englishMonths).map((month, index) => (
              <span
                key={index}
                className=" hover:bg-yellow-500 hover:text-black cursor-pointer rounded-lg py-1 hover:transition-all"
                onClick={() => selectMonth(index)}
              >
                {month}
              </span>
            ))}
          </div>
        </div>
      )}

      {/*   روز های سال*/}
      {showYearList && (
        <div
        ref={yearListRef}

        className={`absolute text-base xl:text-lg 2xl:text-xl top-[80px] w-[70%] border border-solid dark:border-[#454545] border-[#BABABA] dark:bg-[#080807] bg-white dark:sm:bg-black text-black dark:text-[#868B90] z-50 rounded-3xl p-4 min-w-[160px] transition-all ${isShamsi ? "right-0" : "left-0"}`}
        style={{ zIndex: 10 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span>{getCurrentMonth()}</span>

            <span>
              <img
                className={`w-[25px] cursor-pointer invert dark:invert-0 ${isShamsi ? "rotate-0" : "rotate-180"}`}
                src="/svg/arrowMini.svg"
                onClick={() => shiftYears("prev")}
              />

              <img
                src="/svg/arrowMini.svg"
                onClick={() => shiftYears("next")}
                className={`w-[25px] cursor-pointer invert dark:invert-0 ${isShamsi ? "rotate-[180deg]" : "rotate-0"}`}
                />
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center font-['AzarMehr'] max-h-[260px]">
            {getDynamicYears().map((year, index) => (
              <span
                key={index}
                className="hover:bg-yellow-500 hover:text-black cursor-pointer rounded-lg py-1 hover:transition-all"
                onClick={() => {
                  selectYear(year);
                  setYearOffset(0); // ریست برای دفعات بعدی
                }}
              >
                {isShamsi ? toPersianNumbers(year) : year}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* هدر روزهای هفته */}
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
        className="calendar-body grid grid-cols-7 gap-2 mb-4 "
      >
        {getDaysInMonth(currentDate).map((day, index) => {
          if (day === null) {
            return <div key={index} className="p-4"></div>; // جای‌خالی
          }

          const { currentDay, jalaaliDate } = day;
          const dayNumber = isShamsi
            ? jalaaliDate?.jd ?? currentDay.getDate()
            : currentDay.getDate();
          const displayDay = isShamsi ? toPersianNumbers(dayNumber) : dayNumber;

          return (
            <div
              key={index}
              className={`calendar-day flex flex-row-reverse justify-between my-3  md:my-1 lg:my-2 xl:my-[10px] 2xl:my-3 items-center w-full h-full rounded-lg text-black dark:text-white hover:bg-[#0066FF4D] dark:hover:bg-[#FFC70033] cursor-pointer relative ${
                selectedDate && selectedDate.getTime() === currentDay.getTime()
                  ? "bg-[#0066FF4D] dark:bg-[#FFC70033] text-blueLink dark:text-[#ffc800ea] font-bold"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handleDateClick(currentDay)}
            >
              <span className="flex flex-col gap-1 px-1">
                <div className="rounded-full w-1 h-1 md:h-1 xl:w-2 xl:h-2 bg-red-500"></div>
                <div className="rounded-full w-1 h-1 md:h-1 xl:w-2 xl:h-2 bg-red-500"></div>
                <div className="rounded-full w-1 h-1 md:h-1 xl:w-2 xl:h-2 bg-red-500"></div>
                <div className="rounded-full w-1 h-1 md:h-1 xl:w-2 xl:h-2 bg-red-500"></div>
                <div className="rounded-full w-1 h-1 md:h-1 xl:w-2 xl:h-2 bg-red-500"></div>

              </span>
              <div className=" absolute inset-0 flex justify-center items-center">{displayDay}</div>
              <div></div>
            </div>
          );
        })}
      </div>

    
    </div>
  );
}
