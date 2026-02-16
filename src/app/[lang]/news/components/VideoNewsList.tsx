"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/utils/lib/supabaseClient";
import { Calender, Timer } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface VideoItem {
  id: string | number;
  title: string;
  slug: string;
  image?: string;
  video: string;
  date?: string;
  readingTime?: number;
}

interface Props {
  params: { lang: string };
  mainData: any;
  limit?: number;
  title?: string;
  date?: string;

}

export default function VideoNewsInlinePlayer({
  params,
  mainData,
  limit = 6,

}: Props) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [active, setActive] = useState<VideoItem | null>(null);

  // 👇 کلید اصلی
  const [hasPlayed, setHasPlayed] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await supabase
        .from("news")
        .select("id, title, slug, image, video, date, readingTime")
        .neq("video", "")
        .not("video", "is", null)
        .order("date", { ascending: false })
        .limit(limit);

      if (data?.length) {
        setVideos(data);
        setActive(data[0]);
        setHasPlayed(false);
      }
    };

    fetchVideos();
  }, [limit]);

  // autoplay فقط بعد از play
  useEffect(() => {
    if (hasPlayed && videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, [hasPlayed, active]);

  if (!active) return null;

  return (
    <section className="w-full bg-white dark:bg-[#0b0b0b]  py-10 lg:py-20">
      <div className="w-full max-w-7xl p-3 xl:p-0 mx-auto">
        <h3 className="text-2xl 2xl:text-[32px] font-rokh font-bold dark:text-white mb-10  w-max  border border-x-0 border-b-4 pe-7 border-t-0 pb-3 border-light-primary dark:border-dark-yellow border-solid">
          {findByUniqueId(mainData, 1618) || "اکنون تماشا کنید"}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-5">
          <div>
            {active && (
              <div className="bg-light-primary/60 dark:bg-dark-yellow/70  flex">
                <Link href={`/${params.lang}/news/${active.slug}`}>
                  <h2 className="text-white text-lg font-bold dark:text-[#1A1A18] p-4">
                    {active.title}
                  </h2>

                </Link>
                <div className="dark:bg-dark-yellow bg-light-primary">
                  <button onClick={() => setHasPlayed(true)} aria-label="paly btn" className="bg-transparent  !py-3 p-6 w-max h-max text-center flex items-center justify-center aspect-square  hover:scale-110 transition">
                    <svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="86.7799" height="86.7799" rx="43.39" fill="#1A1A18" fill-opacity="0.2" />
                      <path d="M62 37.3038C66 39.6132 66 45.3868 62 47.6962L37.25 61.9856C33.25 64.295 28.25 61.4082 28.25 56.7894L28.25 28.2106C28.25 23.5918 33.25 20.705 37.25 23.0144L62 37.3038Z" fill="white" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            {/* SIDE LIST */}
            <div className="space-y-3 max-h-[385px] light-scrollbar dark:dark-scrollbar overflow-y-auto pe-1">

              {videos.map((item) => {
                const isActive = item.id === active.id;

                return (
                  <div onClick={() => {
                    setActive(item);
                    setHasPlayed(false); // 👈 خیلی مهم
                  }}
                    key={item.id}
                    className={`flex gap-3 p-2  transition
                ${isActive ? "bg-light-primary/10 dark:bg-yellow-400/10" : "hover:bg-white/5"}`}
                  >

                    {item.image && (
                      <div className="w-1/3"><Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="bg-cover !static rounded-lg"
                      /></div>

                    )}
                    {/* TITLE */}
                    <div className="flex flex-col justify-between w-2/3 text-right py-1 ps-1">
                      {isActive && hasPlayed ? (
                        <Link href={`/${params.lang}/news/${item.slug}`}>
                          <p className="text-sm line-clamp-2 text-light-primary dark:text-dark-yellow hover:underline">
                            {item.title}
                          </p>
                        </Link>
                      ) : (
                        <p className="text-sm line-clamp-2 text-black dark:text-white">
                          {item.title}
                        </p>
                      )}
                      <div className="text-sm dark:text-[#969696] flex flex-wrap items-center gap-3 justify-center lg:justify-start ">
                        {item.date && (
                          <div className="flex items-center  gap-2">
                            <time>
                              {new Date(item.date).toLocaleDateString("fa-IR", {
                                month: "short",
                                day: "numeric",
                              })}
                            </time>
                            <Calender className="stroke-dark-gray !stroke-[0px] size-5" />
                          </div>
                        )}

                        {item.readingTime && (
                          <div className="flex items-center gap-2">
                            <span>{item.readingTime} دقیقه</span>
                            <Timer className="stroke-dark-gray size-5" />
                          </div>
                        )}


                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* MAIN VIDEO */}
          <div className="relative aspect-video bg-black  overflow-hidden">
            {/* THUMBNAIL (قبل از play) */}
            {!hasPlayed && active.image && (
              <Image
                src={active.image}
                alt={active.title}
                fill
                className="object-cover"
                priority
              />
            )}

            {/* VIDEO (فقط بعد از play) */}
            {hasPlayed && (
              <video
                ref={videoRef}
                src={active.video}
                className="absolute inset-0 w-full h-full object-cover"
                controls
                playsInline
                preload="none"
                onEnded={() => setHasPlayed(false)}
              />
            )}

            {/* PLAY BUTTON */}
            {!hasPlayed && (
              <button
                type="button"
                onClick={() => setHasPlayed(true)}
                className="absolute inset-0 z-10 flex items-center justify-center bg-transparent"
                aria-label="play video"
              >
                <div className=" rounded-full  text-center flex items-center justify-center aspect-square  hover:scale-110 transition">
                  <svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="86.7799" height="86.7799" rx="43.39" fill="#1A1A18" fill-opacity="0.2" />
                    <path d="M62 37.3038C66 39.6132 66 45.3868 62 47.6962L37.25 61.9856C33.25 64.295 28.25 61.4082 28.25 56.7894L28.25 28.2106C28.25 23.5918 33.25 20.705 37.25 23.0144L62 37.3038Z" fill="white" />
                  </svg>
                </div>
              </button>
            )}

            {/* TITLE OVER VIDEO (فقط وقتی پلی شده) */}

          </div>

        </div>
      </div>
    </section>
  );
}
