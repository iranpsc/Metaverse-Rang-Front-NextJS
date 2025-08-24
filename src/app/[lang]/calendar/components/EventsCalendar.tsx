"use client";
import Calendar from "./Calendar";
import EventList from "./EventList";
import { useEffect, useState } from "react";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { switchDigits } from "@/components/utils/DigitSwitch";
import { Search } from "@/components/svgs/SvgEducation";
import { mapEvents, MappedEventItem, CalendarProps } from "@/utils/mapEvents";

export default function EventsCalendar({
  events,
  mainData,
  params,
  token,
}: CalendarProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MappedEventItem[] | null>(
    null
  );
  const [startOfMonthDate, SetStartOfMonthDate] = useState<string>("");
  const [endOfMonthDate, setEndOfMonthDate] = useState<string>("");
  const [eventsDay, setEventsDay] = useState<any[]>([]);
  const [MonthEventsDay, setMonthEventsDay] = useState<any[]>([]);
  //console.log("test is",MonthEventsDay)

  const [selectedEventDate, setSelectedEventDate] = useState<string | null>(
    null
  );
  const [dateResults, setDateResults] = useState<MappedEventItem[] | null>(
    null
  );

  const total = MonthEventsDay.length;

  const grouped = MonthEventsDay.reduce((acc, event) => {
    acc[event.color] = (acc[event.color] || 0) + 1;
    return acc;
  }, {});

  const bluePercent = grouped["#0000ff"]
    ? Math.round((grouped["#0000ff"] / total) * 100)
    : 0;
  const redPercent = grouped["#ff0000"]
    ? Math.round((grouped["#ff0000"] / total) * 100)
    : 0;
  const yellowPercent = grouped["#ffff00"]
    ? Math.round((grouped["#ffff00"] / total) * 100)
    : 0;
  const greenPercent = grouped["#32DA6B"]
    ? Math.round((grouped["#80ff00"] / total) * 100)
    : 0;
  const pinkPercent = grouped["#ff00ff"]
    ? Math.round((grouped["#ff00ff"] / total) * 100)
    : 0;

  useEffect(() => {
    if (searchValue.trim() === "") {
      setSearchResults(null);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!startOfMonthDate || !endOfMonthDate) return;
    const fetchCalendarEvents = async () => {
      try {
        const url = `https://api.rgb.irpsc.com/api/calendar/filter?start_date=${startOfMonthDate}&end_date=${endOfMonthDate}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("ERR");
        const json = await res.json();
        const newEvents = json.data;
        setEventsDay((prev) => [...prev, ...newEvents]);
        setMonthEventsDay(newEvents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCalendarEvents();
  }, [startOfMonthDate, endOfMonthDate]);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      try {
        if (!selectedEventDate) {
          setDateResults(events);
          return;
        }

        const url = `https://api.rgb.irpsc.com/api/calendar?date=${selectedEventDate}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("ERR");

        const json = await res.json();
        setDateResults(mapEvents(json.data));
      } catch (error) {
        console.error(error);
        setDateResults([]);
      }
    };

    fetchCalendarEvents();
  }, [selectedEventDate, events]);

  function handleSearchClick() {
    if (!searchValue.trim()) return;

    const query = encodeURIComponent(searchValue);
    const url = `https://api.rgb.irpsc.com/api/calendar?search=${query}&type=event`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    fetch(url, { headers })
      .then((res) => res.json())
      .then((data) => setSearchResults(mapEvents(data.data)))
      .catch((err) => {
        console.error(err);
        setSearchResults([]);
      });
  }

  return (
    <div className="centerItem w-[95%] lg:w-full  pt-6 text-black dark:text-white bg-white  dark:bg-[#080807] flex flex-col items-center rounded-[20px] gap-2 font-['Montserrat']  ">
      <div className="w-[97%]  flex flex-col items-start sm:flex-row-reverse lg:w-[95%] lg:gap-4 ">
        <Calendar
          params={params}
          SetStartOfMonthDate={SetStartOfMonthDate}
          setEndOfMonthDate={setEndOfMonthDate}
          eventsDay={eventsDay}
          setSelectedEventDate={setSelectedEventDate}
          selectedEventDate={selectedEventDate}
        />
        <div className="EventFilters w-full sm:w-[90%]  mt-4 sm:mt-0 sm:ml-4  ">
          <div
            className="searchBoxContainer  my-5 transition-[right,width] duration-300 
                    ease-in-out flex items-center flex-row justify-between border-[1px] border-solid 
                    border-[#00000024] dark:bg-[#1A1A18] w-full h-[50px] rounded-[12px] sm:m-0"
          >
            <span className="px-4 flex ">
              <Search className={`fill-[#1A1A18] dark:fill-white`} />
            </span>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}
              type="text"
              className="searchWrite pr-2 pl-5 font-['AzarMehr'] bg-transparent flex-1 w-[90%] h-[90%] border-none outline-none text-sm dark:text-white"
              placeholder={findByUniqueId(mainData, 575)}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              onClick={handleSearchClick}
              className="searchButton font-normal text-[95%] px-5 font-['AzarMehr'] border-none bg-transparent text-blueLink  dark:text-dark-yellow cursor-pointer"
            >
              {findByUniqueId(mainData, 57)}
            </button>
          </div>

          <div className="flex flex-col text-[14px] items-center content-center   gap-1 xl:gap-2  w-full max-w-full h-auto py-4 2xl:gap-3 font-[Vazir]    ">
            <h2 className="text-base font-bold   lg:text-lg xl:text-xl 2xl:text-2xl xl:mt-2 self-start mr-4 sm:mb-1">
              {findByUniqueId(mainData, 576)}
            </h2>

            <div
              className="flex items-center justify-between h-11 2xl:h-12 px-2 w-[96%]
                  rounded-md  item sm:h-[34px] 
                 sm:text-sm lg:text-base xl:text-lg 2xl:text-xl xl:h-11 lg:mt-2  
            "
            >
              <div className="flex items-center  h-7  xl:h-9 2xl:h-10">
                <div className="whitespace-nowrap inline-block bg-transparent relative rounded-lg aspect-square h-full overflow-hidden  ">
                  <div className="bg-[#ff0000] absolute top-[72%] left-0 w-full h-[30%] rounded-t-md z-50"></div>
                  <div className="bg-[#0000ff] absolute top-[58%] left-0 w-full h-[40%] rounded-t-md z-40"></div>
                  <div className="bg-[#ffff00] absolute top-[38%] left-0 w-full h-[60%] rounded-t-md z-30"></div>
                  <div className="bg-[#80ff00] absolute top-[18%] left-0 w-full h-[80%] rounded-t-md z-20"></div>
                  <div className="bg-[#ff00ff] absolute top-0 left-0 w-full h-full rounded-t-md z-10"></div>
                </div>
                <span className="mx-2 whitespace-nowrap  ">
                  {findByUniqueId(mainData, 582)}
                </span>
              </div>
            </div>

            {bluePercent !== 0 && (
              <div className="flex items-center justify-between h-11 2xl:h-12 px-2 w-[96%]  rounded-md item sm:h-[34px] sm:text-sm lg:text-base xl:text-lg 2xl:text-xl xl:h-11">
                <div className="flex items-center h-full">
                  <div className="bg-[#0000ff] rounded-lg aspect-square h-7 xl:h-9 2xl:h-10"></div>
                  <span className="mx-2 whitespace-nowrap">
                    {findByUniqueId(mainData, 578)}
                  </span>
                </div>
                <div className="text-[#0000ff]">
                  {switchDigits(bluePercent, params.lang)} %
                </div>
              </div>
            )}

            {redPercent !== 0 && (
              <div className="flex items-center justify-between h-11 2xl:h-12 w-[96%] px-2 rounded-md item sm:h-[34px] sm:text-sm lg:text-base xl:text-lg 2xl:text-xl xl:h-11">
                <div className="flex items-center h-full">
                  <div className="bg-[#ff0000] rounded-lg aspect-square h-7 xl:h-9 2xl:h-10"></div>
                  <span className="mx-2 whitespace-nowrap">
                    {findByUniqueId(mainData, 577)}
                  </span>
                </div>
                <div className="text-[#ff0000]">
                  {switchDigits(redPercent, params.lang)} %
                </div>
              </div>
            )}

            {yellowPercent !== 0 && (
              <div className="flex items-center justify-between h-11 2xl:h-12 w-[96%] px-2 rounded-md item sm:h-[34px] sm:text-sm lg:text-base xl:text-lg 2xl:text-xl xl:h-11">
                <div className="flex items-center h-full">
                  <div className="bg-[#ffff00] rounded-lg aspect-square h-7 xl:h-9 2xl:h-10"></div>
                  <span className="mx-2 whitespace-nowrap">
                    {findByUniqueId(mainData, 579)}
                  </span>
                </div>
                <div className="text-[#ffff00]">
                  {switchDigits(yellowPercent, params.lang)} %
                </div>
              </div>
            )}

          {greenPercent !== 0 && (
  <div className="flex items-center justify-between h-11 2xl:h-12 w-[96%] px-2 rounded-md item sm:h-[34px] sm:text-sm lg:text-base xl:text-lg 2xl:text-xl xl:h-11">
    <div className="flex items-center h-full">
      <div className="bg-[#80ff00] rounded-lg aspect-square h-7 xl:h-9 2xl:h-10"></div>
      <span className="mx-2 whitespace-nowrap">
        {findByUniqueId(mainData, 580)}
      </span>
    </div>
    <div className="text-[#80ff00]">
      {switchDigits(greenPercent, params.lang)} %
    </div>
  </div>
)}

           {pinkPercent !== 0 && (
  <div className="flex items-center justify-between h-11 2xl:h-12 w-[96%] px-2 rounded-md item sm:h-[34px] lg:text-base xl:text-lg 2xl:text-xl xl:h-11">
    <div className="flex items-center h-full">
      <div className="bg-[#ff00ff] rounded-lg aspect-square h-7 xl:h-9 2xl:h-10"></div>
      <span className="mx-2 whitespace-nowrap">
        {findByUniqueId(mainData, 581)}
      </span>
    </div>
    <div className="text-[#ff00ff]">
      {switchDigits(pinkPercent, params.lang)} %
    </div>
  </div>
)}

          </div>
        </div>{" "}
      </div>

      <div className="line mt-6 w-full lg:w-[95%] h-[2px] bg-gradient-to-r from-transparent via-[#DADADA] to-transparent"></div>
      <EventList
        token={token}
        events={
          searchResults && searchResults.length > 0
            ? searchResults
            : selectedEventDate && dateResults && dateResults.length > 0
            ? dateResults
            : events
        }
        mainData={mainData}
        params={params}
      />
    </div>
  );
}
