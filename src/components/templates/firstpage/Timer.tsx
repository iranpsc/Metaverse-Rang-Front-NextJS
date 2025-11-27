"use client";
import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";


interface DynamicTimerProps {
  targetDate: string; // تاریخ شروع (jalali string)
  endDate?: string;   // تاریخ پایان (jalali string)
  daysLabel?: string;
  hoursLabel?: string;
  minutesLabel?: string;
  secondsLabel?: string;
  params?: { lang: "fa" | "en" };

}


function parseJalaliDatetime(jalaliStr: string): Date {
  return moment(jalaliStr, "jYYYY/jMM/jDD HH:mm").toDate();
}

function getTimeRemaining(target: Date) {
  const now = new Date().getTime();
  const diff = target.getTime() - now;

  if (diff <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { total: diff, days, hours, minutes, seconds };
}

const DynamicTimer: React.FC<DynamicTimerProps> = ({
  targetDate,
  endDate,
  daysLabel = "Days",
  hoursLabel = "Hours",
  minutesLabel = "Minutes",
  secondsLabel = "Seconds",
  params,


}) => {
  const [timeToStart, setTimeToStart] = useState(getTimeRemaining(parseJalaliDatetime(targetDate)));
  const [timeToEnd, setTimeToEnd] = useState(endDate ? getTimeRemaining(parseJalaliDatetime(endDate)) : null);
  const [status, setStatus] = useState<"upcoming" | "ongoing" | "ended">("upcoming");

  useEffect(() => {
    const interval = setInterval(() => {
      const start = parseJalaliDatetime(targetDate);
      const now = new Date();

      if (now < start) {
        setStatus("upcoming");
        setTimeToStart(getTimeRemaining(start));
      } else if (endDate && now < parseJalaliDatetime(endDate)) {
        setStatus("ongoing");
        setTimeToEnd(getTimeRemaining(parseJalaliDatetime(endDate)));
      } else {
        setStatus("ended");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, endDate]);

  if (status === "ended") {
    return (
      <div className="text-center text-2xl  text-light-primary dark:text-dark-yellow font-bold">
        {params?.lang === "fa" ? " تاریخ پایان :" : "End date : "}

        {endDate?.split(" ")[0]}
      </div>
    );
  }

  const time = status === "upcoming" ? timeToStart : timeToEnd;

  return (
    <div className="flex gap-3 justify-center items-center">
      <div>
        <div className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-light-primary dark:text-dark-yellow">{time?.seconds.toString().padStart(2, "0")}&nbsp;:</div>
        <div className="text-light-primary dark:text-dark-yellow">{secondsLabel}</div>
      </div>
      <div>
        <div className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-light-primary dark:text-dark-yellow">{time?.minutes.toString().padStart(2, "0")}&nbsp;: </div>
        <div className="text-light-primary dark:text-dark-yellow">{minutesLabel}</div>
      </div>
      <div >
        <div className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-light-primary dark:text-dark-yellow">{time?.hours.toString().padStart(2, "0")}&nbsp;: </div>
        <div className="text-light-primary dark:text-dark-yellow">{hoursLabel}</div>
      </div>
      <div className="text-center flex flex-col justify-center">
        <div className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-light-primary dark:text-dark-yellow">{time?.days.toString().padStart(2, "0")} </div>
        <div className="text-light-primary dark:text-dark-yellow">{daysLabel}</div>
      </div>

    </div>
  );
};

export default DynamicTimer;
