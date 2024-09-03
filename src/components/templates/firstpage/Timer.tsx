"use client";

import { azarMehr } from "@/components/utils/fonts";
import { useState, useEffect } from "react";

export default function TimerSection() {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const now: any = new Date();
    const targetDate: any = new Date("2024-08-19T01:31:22");
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full flex flex-row justify-between lg:justify-center items-center gap-1 z-50"
      dir="ltr"
    >
      <div className="flex flex-col justify-center items-center w-full">
        <span className="flex items-center text-[28px] lg:text-[38px] xl:text-[42px] 2xl:text-[48px] text-dark-yellow text-azarMehr">
          <span className="font-bold">
            {timeRemaining.days.toString().padStart(2, "0")}
          </span>
          <span className="font-bold ps-[120%] lg:ps-1">{" : "}</span>
        </span>

        <span className="text-[16px] text-dark-yellow text-azarMehr font-bold text-center w-full pe-0 lg:pe-5">
          روز
        </span>
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        <span className="flex items-center text-[28px] lg:text-[38px] xl:text-[42px] 2xl:text-[48px] text-dark-yellow text-azarMehr">
          <span className="font-bold">
            {timeRemaining.hours.toString().padStart(2, "0")}
          </span>
          <span className="font-bold ps-[120%] lg:ps-1">{" : "}</span>
        </span>
        <span className="text-[16px] text-dark-yellow text-azarMehr font-bold text-center w-full pe-0 lg:pe-5">
          ساعت
        </span>
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        <span className="flex items-center text-[28px] lg:text-[38px] xl:text-[42px] 2xl:text-[48px] text-dark-yellow text-azarMehr">
          <span className="font-bold">
            {timeRemaining.minutes.toString().padStart(2, "0")}
          </span>
          <span className="font-bold ps-[120%] lg:ps-1">{" : "}</span>
        </span>
        <span className="text-[16px] text-dark-yellow text-azarMehr font-bold text-center text-center w-full pe-0 lg:pe-5">
          دقیقه
        </span>
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        <span className="flex items-center text-[28px] lg:text-[38px] xl:text-[42px] 2xl:text-[48px] text-dark-yellow text-azarMehr">
          <span className="font-bold">
            {timeRemaining.seconds.toString().padStart(2, "0")}
          </span>
        </span>

        <span className="text-[16px] text-dark-yellow text-azarMehr font-bold text-center w-full pe-0 lg:pe-5">
          ثانیه
        </span>
      </div>
    </div>
  );
}
