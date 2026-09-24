// components/templates/envent/EventsCalendarClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import EventsCalendar from "./EventsCalendar";
import CalendarSkeleton from "@/components/skeleton/CalendarSkeleton";
import { mapEvents, MappedEventItem } from "@/utils/mapEvents";

interface EventsCalendarClientProps {
  lang: string;
  mainData: any;
  params: any;
}

export default function EventsCalendarClient({
  lang,
  mainData,
  params,
}: EventsCalendarClientProps) {
  const [cookies] = useCookies(["auth"]);
  const [events, setEvents] = useState<MappedEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      try {
        const authParams = new URLSearchParams(cookies.auth || "");
        const token = authParams.get("token");

        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar?type=event`,
          { headers }
        );

        if (!res.ok) {
          throw new Error(`Calendar fetch failed: ${res.status}`);
        }

        const data = await res.json();

        if (!cancelled) {
          setEvents(mapEvents(data.data));
          setLoading(false);
        }
      } catch (e) {
        console.error("خطا در دریافت رویدادها:", e);
        if (!cancelled) {
          setHasError(true);
          setLoading(false);
        }
      }
    }

    fetchEvents();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <CalendarSkeleton />;
  }

  if (hasError) {
    return (
      <p className="w-full text-center text-red-500 py-10">
        خطا در بارگذاری رویدادها
      </p>
    );
  }

  const authParams = new URLSearchParams(cookies.auth || "");
  const token = authParams.get("token");

  return (
    <EventsCalendar
      token={token}
      mainData={mainData}
      params={params}
      events={events}
    />
  );
}