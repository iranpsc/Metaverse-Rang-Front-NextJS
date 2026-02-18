"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import htmlTruncate from "html-truncate";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { switchDigits } from "@/components/utils/DigitSwitch";
import moment from "moment-jalaali";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import SyncLoader from "react-spinners/SyncLoader";
import LoginButtonModule from "@/components/module/singleVideo/LoginButtonModule";
import Image from "next/image";
import {
  MappedEventItem,
  CalendarFilterProps,
  EventItem,
} from "@/utils/mapEvents";
import Link from "next/link";

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

const EventList: React.FC<CalendarFilterProps> = ({
  events: initialEvents,
  mainData,
  params,
  token,
}: CalendarFilterProps) => {
  const router = useRouter();
  const [likesMap, setLikesMap] = useState<Record<number, number>>({});
  const [disLikesMap, setDisLikesMap] = useState<Record<number, number>>({});
  const [userLikedMap, setUserLikedMap] = useState<Record<number, boolean>>({});
  const [userDisLikedMap, setUserDisLikedMap] = useState<
    Record<number, boolean>
  >({});
  const [hasMore, setHasMore] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [events, setEvents] = useState<MappedEventItem[]>(initialEvents);
  const [visibleCount, setVisibleCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [countdowns, setCountdowns] = useState<
    Record<number, { toStart: any; toEnd: any }>
  >({});
  const [showFullMap, setShowFullMap] = useState<Record<number, boolean>>({});
  const eventRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [targetEventId, setTargetEventId] = useState<number | null>(null);
  const [linkLoading, setLinkLoading] = useState(false);
  const titleRefs = useRef<Record<number, HTMLAnchorElement | null>>({});
  const [truncatedTitles, setTruncatedTitles] = useState<Record<number, boolean>>({});
  const visibleEvents = events.slice(0, visibleCount);
  const checkTitleTruncation = (eventId: number) => {
    const el = titleRefs.current[eventId];
    if (el) {
      const isTruncated = el.scrollWidth > el.clientWidth;
      setTruncatedTitles((prev) => ({
        ...prev,
        [eventId]: isTruncated,
      }));
    }
  };
  useEffect(() => {
    // چک اولیه بعد از رندر
    visibleEvents.forEach((event) => {
      checkTitleTruncation(event.id);
    });

    // برای resize و تغییر اندازه فونت/صفحه
    const observer = new ResizeObserver(() => {
      visibleEvents.forEach((event) => {
        checkTitleTruncation(event.id);
      });
    });

    // observe کردن همه عنوان‌ها
    Object.values(titleRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleEvents]); // هر وقت visibleEvents تغییر کرد دوباره چک کن
  // به‌روزرسانی ایونت‌ها
  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  // تنظیم شمارش معکوس
  useEffect(() => {
    const interval = setInterval(() => {
      const updated: Record<number, { toStart: any; toEnd: any }> = {};
      events.slice(0, visibleCount).forEach((event) => {
        const startDate = parseJalaliDatetime(event.start);
        const endDate = parseJalaliDatetime(event.end);
        updated[event.id] = {
          toStart: getTimeRemaining(startDate),
          toEnd: getTimeRemaining(endDate),
        };
      });
      setCountdowns(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [events, visibleCount]);

  // بررسی هش اولیه برای ایونت هدف
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const id = parseInt(hash, 10);
      if (!isNaN(id)) {
        setTargetEventId(id);
      }
    }
  }, []);

  // مدیریت اسکرول به ایونت هدف و پاک کردن هش
  useEffect(() => {
    if (targetEventId !== null) {
      const ref = eventRefs.current[targetEventId];
      const event = events.find((e) => e.id === targetEventId);

      if (ref && event) {
        ref.scrollIntoView({ behavior: "smooth" });
        updateMetaTags(event);
        window.history.replaceState(
          null,
          "",
          `/${params.lang}/calendar`
        );
        setTargetEventId(null);
      } else if (hasMore && !loading) {
        showMore();
      }
    }
  }, [targetEventId, events, visibleCount, hasMore, loading, params.lang]);

  // تابع برای به‌روزرسانی متا تگ‌ها
  const updateMetaTags = (event: MappedEventItem) => {
    // به‌روزرسانی عنوان
    document.title = event.title;

    // به‌روزرسانی توضیحات
    const description = htmlTruncate(event.desc, 160);
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // به‌روزرسانی متا تگ‌های Open Graph
    const ogTags = [
      { property: "og:title", content: event.title },
      { property: "og:description", content: description },
      { property: "og:url", content: `https://rgb.irpsc.com/${params.lang}/calendar/${event.id}` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: event.image || "https://rgb.irpsc.com/default-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: event.title },
      { property: "og:site_name", content: "متاورس رنگ" },
    ];

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    // به‌روزرسانی متا تگ‌های Twitter
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: event.title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: event.image || "https://rgb.irpsc.com/default-image.jpg" },
    ];

    twitterTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });
  };

  // IntersectionObserver برای تشخیص اسکرول
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eventId = Number(entry.target.getAttribute("data-event-id"));
            const event = events.find((e) => e.id === eventId);
            if (event) {
              // به‌روزرسانی URL با pushState و هش
              window.history.pushState(
                { eventId: event.id },
                event.title,
                `/${params.lang}/calendar#${event.id}`
              );

              // به‌روزرسانی متا دیتا
              updateMetaTags(event);
            }
          }
        });
      },
      {
        threshold: 0.5, // وقتی 50٪ از ایونت در viewport باشد
      }
    );

    // اضافه کردن رفرنس‌های ایونت‌ها به observer
    Object.values(eventRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [events, visibleCount, params.lang]);

  // مدیریت بارگذاری بیشتر
  const showMore = async () => {
    setLoading(true);
    const newVisibleCount = visibleCount + 3;

    if (events.length < 14) {
      setVisibleCount(Math.min(newVisibleCount, events.length));
      setHasMore(false);
      setLoading(false);
      return;
    }

    if (newVisibleCount > events.length) {
      try {
        const nextPage = currentPage + 1;
        const res = await fetch(
          `https://api.rgb.irpsc.com/api/calendar?page=${nextPage}`
        );
        const data = await res.json();

        if (data.data && data.data.length > 0) {
          const mappedEvents: MappedEventItem[] = data.data.map(
            (item: EventItem) => ({
              id: item.id,
              title: item.title,
              image: item.image,
              desc: item.description,
              start: item.starts_at,
              end: item.ends_at,
              color: item.color,
              btnName: item.btn_name,
              views: item.views,
              likes: item.likes,
              disLikes: item.dislikes,
              userLiked: item.user_interaction?.has_liked ?? false,
              userDisLiked: item.user_interaction?.has_disliked ?? false,
            })
          );

          setEvents((prev) => {
            const newEvents = [...prev, ...mappedEvents];
            setVisibleCount(Math.min(newVisibleCount, newEvents.length));
            if (mappedEvents.length < 3) {
              setHasMore(false);
            }
            return newEvents;
          });

          setCurrentPage(nextPage);
        } else {
          setHasMore(false);
          setVisibleCount(Math.min(newVisibleCount, events.length));
        }
      } catch (error) {
        console.error("خطا در بارگذاری رویدادهای بیشتر:", error);
        setVisibleCount(Math.min(newVisibleCount, events.length));
      }
    } else {
      setVisibleCount(Math.min(newVisibleCount, events.length));
    }

    setLoading(false);
  };

  // تنظیم تعداد ایونت‌های قابل مشاهده
  useEffect(() => {
    setVisibleCount(5);
    setHasMore(events.length > 5);
  }, [events]);

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
  // useEffect(() => {
  //   console.log("📅 ایونت‌های اولیه:", initialEvents);
  // }, []);

  // تنظیم مقادیر اولیه لایک‌ها و دیسلایک‌ها
  useEffect(() => {
    const initialLikes: Record<number, number> = {};
    const initialDisLikes: Record<number, number> = {};
    const initialUserLiked: Record<number, boolean> = {};
    const initialUserDisLiked: Record<number, boolean> = {};

    events.forEach((event) => {
      initialLikes[event.id] = event.likes ?? 0;
      initialDisLikes[event.id] = event.disLikes ?? 0;
      initialUserLiked[event.id] = event.userLiked ?? false;
      initialUserDisLiked[event.id] = event.userDisLiked ?? false;
    });

    setLikesMap(initialLikes);
    setDisLikesMap(initialDisLikes);
    setUserLikedMap(initialUserLiked);
    setUserDisLikedMap(initialUserDisLiked);
  }, [events]);

  // مدیریت لایک
  const sendLike = async (eventId: number) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    if (userLikedMap[eventId]) return;

    setLikesMap((prev) => ({
      ...prev,
      [eventId]: (prev[eventId] ?? 0) + 1,
    }));
    setDisLikesMap((prev) => ({
      ...prev,
      [eventId]: Math.max((prev[eventId] ?? 0) - 1, 0),
    }));
    setUserLikedMap((prev) => ({ ...prev, [eventId]: true }));
    setUserDisLikedMap((prev) => ({ ...prev, [eventId]: false }));

    try {
      const response = await fetch(
        `https://api.rgb.irpsc.com/api/calendar/events/${eventId}/interact`,
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
  const disLike = async (eventId: number) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    if (userDisLikedMap[eventId]) return;

    setDisLikesMap((prev) => ({
      ...prev,
      [eventId]: (prev[eventId] ?? 0) + 1,
    }));
    setLikesMap((prev) => ({
      ...prev,
      [eventId]: Math.max((prev[eventId] ?? 0) - 1, 0),
    }));
    setUserDisLikedMap((prev) => ({ ...prev, [eventId]: true }));
    setUserLikedMap((prev) => ({ ...prev, [eventId]: false }));

    try {
      const response = await fetch(
        `https://api.rgb.irpsc.com/api/calendar/events/${eventId}/interact`,
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

  // تابعی که HTML را تا maxLength کاراکتر (متن خالص) برش می‌زند و ساختار HTML را حفظ می‌کند
  function safeTruncateHTML(
    html: string,
    maxLength: number,
    ellipsis = "…"
  ): string {
    if (!html) return "";

    // ===== SSR / Server fallback =====
    if (typeof document === "undefined") {
      const plain = html
        // CodeQL-safe: بدون regex چندکاراکتری
        .replace(/<|>/g, "")
        .replace(/\s+/g, " ")
        .trim();

      if (plain.length <= maxLength) {
        return plain;
      }

      const slice = plain.slice(0, maxLength - ellipsis.length);
      const safeCut = slice.lastIndexOf(" ");

      return (safeCut > 0 ? slice.slice(0, safeCut) : slice) + ellipsis;
    }

    // ===== Client / Browser =====
    const container = document.createElement("div");
    container.innerHTML = html;

    let chars = 0;
    const output = document.createElement("div");

    function walk(node: ChildNode, outParent: HTMLElement): boolean {
      if (chars >= maxLength) return true;

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        const remaining = maxLength - chars;

        if (text.length <= remaining) {
          outParent.appendChild(document.createTextNode(text));
          chars += text.length;
        } else {
          const slice = text.slice(0, remaining - ellipsis.length);
          outParent.appendChild(document.createTextNode(slice + ellipsis));
          chars = maxLength;
          return true;
        }
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const clone = document.createElement(el.tagName.toLowerCase());

        // کپی فقط attributeهای امن
        for (let i = 0; i < el.attributes.length; i++) {
          const { name, value } = el.attributes[i];

          if (name.startsWith("on")) continue;
          if (
            (name === "href" || name === "src") &&
            value.trim().toLowerCase().startsWith("javascript:")
          ) {
            continue;
          }

          clone.setAttribute(name, value);
        }

        outParent.appendChild(clone);

        for (let i = 0; i < el.childNodes.length; i++) {
          if (walk(el.childNodes[i], clone)) return true;
        }
      }

      return chars >= maxLength;
    }

    for (let i = 0; i < container.childNodes.length; i++) {
      if (walk(container.childNodes[i], output)) break;
    }

    return output.innerHTML;
  }


  // رندر ایونت‌ها


  return (
    <>
      {visibleEvents.map((event) => {
        const { toStart, toEnd } = countdowns[event.id] || {
          toStart: { days: 0, hours: 0, minutes: 0, seconds: 0 },
          toEnd: { days: 0, hours: 0, minutes: 0, seconds: 0 },
        };
        const maxLength = 350;

        // استخراج متن خالص با استفاده از DOM (قابل اطمینان‌تر از regex)
        let plainText = "";
        const html = event.desc || "";

        if (typeof document !== "undefined") {
          // Client / Browser
          const tmp = document.createElement("div");
          tmp.innerHTML = html;
          plainText = tmp.textContent || tmp.innerText || "";
        } else {
          // Server / SSR fallback (CodeQL-safe)
          plainText = html.replace(/<|>/g, "");
        }

        plainText = plainText.trim();


        const shouldTruncate = plainText.length > maxLength;

        // استفاده از تابع امنی که تگ‌ها را حفظ می‌کند
        const truncatedHtml = shouldTruncate
          ? safeTruncateHTML(event.desc, maxLength, "...")
          : event.desc;


        const isEnded = toEnd.days === 0 && toEnd.hours === 0 && toEnd.minutes === 0 && toEnd.seconds === 0;

        return (
          <div
            key={event.id}
            id={`${event.id}`}
            data-event-id={event.id}
            ref={(el) => (eventRefs.current[event.id] = el)}
            className="items flex flex-col justify-center gap-3 items-center w-full"
          >
            {linkLoading && (
              <div className="fixed top-0 left-0 bottom-0  w-full  h-screen z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm" >
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
            {/* تصویر ایونت */}
            <div className="mt-4 w-[97%] flex justify-center lg:w-[95%] mx-auto rounded-[20px] overflow-hidden shadow-lg lg:mt-6">
              <Link onClickCapture={() => setLinkLoading(true)} href={`/${params.lang}/calendar/${event.id}`}>
                <img
                  className="w-full"
                  src={
                    event.image && event.image !== "image"
                      ? event.image
                      : "/rafiki-dark.png"
                  }
                  alt={event.title || "event image"}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/rafiki-dark.png";
                  }}
                />
              </Link>
            </div>

            {/* عنوان و لایک/دیسلایک */}
            <div className="flex flex-col w-[97%] lg:w-[95%] gap-3 sm:gap-0 items-center sm:flex-row-reverse sm:justify-between">
              <div className="w-[96%] flex justify-between text-base font-normal font-[Vazir] sm:w-[350px] sm:ml-2 sm:self-center">
                <div className="flex items-center gap-1 ">
                  <Like
                    onClick={() => sendLike(event.id)}
                    width="20"
                    height="24"
                    className={`
                      cursor-pointer size-[15px] md:size-[18px]
                      ${userLikedMap[event.id]
                        ? "stroke-[#636363] dark:stroke-[#b3afaf]"
                        : "stroke-black dark:stroke-white"
                      }
                    `}
                  />
                  <span className="like-count mt-[2px]">
                    {switchDigits(
                      likesMap[event.id] ?? event.likes ?? 0,
                      params.lang
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-1 ">
                  <Dislike
                    onClick={() => disLike(event.id)}
                    width="20"
                    height="24"
                    className={`
                      cursor-pointer size-[15px] md:size-[18px]
                      ${userDisLikedMap[event.id]
                        ? "stroke-slate-500 dark:stroke-slate-300"
                        : "stroke-black dark:stroke-white"
                      }
                    `}
                  />
                  <span className="dislike-count">
                    {switchDigits(
                      disLikesMap[event.id] ?? event.disLikes ?? 0,
                      params.lang
                    )}
                  </span>
                </div>
                <div className="flex items-center size-7 gap-1 stroke-black dark:stroke-white">
                  <View className=" size-[15px] md:size-[18px]" />
                  <span>{switchDigits(event.views, params.lang)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between h-8 w-full font-[Rokh] my-2 sm:w-[60%] xl:h-11">
                <div className="flex items-center h-7 xl:h-9 2xl:h-10 overflow-hidden 3xl:rounded-s-[10px]">
                  <div
                    style={{ backgroundColor: event.color }}
                    className="h-7 xl:h-9 2xl:h-10 rounded-lg aspect-square z-10"
                  ></div>
                  <Link
                    onClickCapture={() => setLinkLoading(true)}
                    href={`/${params.lang}/calendar/${event.id}`}
                    ref={(el) => (titleRefs.current[event.id] = el)}
                    className={`
                    mx-2 
                    font-bold 
                    text-ellipsis overflow-hidden 
                    whitespace-nowrap
                    text-base lg:text-xl xl:text-2xl 2xl:text-3xl
                    max-w-[calc(100%-60px)]   /* ← مهم: محدود کردن عرض */
                    ${truncatedTitles[event.id]
                        ? "hover:overflow-visible hover:animate-rtlMarquee "
                        : ""
                      }
                  `}
                  >
                    {event.title}
                  </Link>
                </div>
              </div>
            </div>

            {/* توضیحات ایونت */}
            <div className="w-[97%] lg:w-[95%]">
              <div className="text-base w-full break-words whitespace-normal text-[#868B90] dark:text-[#C4C4C4] mb-4 text-justify font-normal font-[Vazir] 2xl:text-xl 2xl:leading-10
         [&_ul]:list-disc [&_ul]:pl-5
         [&_ol]:list-decimal [&_ol]:pl-5
         [&_li>p]:inline [&_li>p]:m-0 leading-8"
                dangerouslySetInnerHTML={{
                  __html: showFullMap[event.id] ? event.desc : truncatedHtml,
                }}
              />


              {shouldTruncate && (
                <button
                  onClick={() =>
                    setShowFullMap((prev) => ({
                      ...prev,
                      [event.id]: !prev[event.id],
                    }))
                  }
                  className="dark:text-dark-yellow text-blueLink bg-transparent hover:underline cursor-pointer text-base  text-sm md:text-[18px]"
                >
                  {showFullMap[event.id] ? "" : findByUniqueId(mainData, 271)}
                </button>
              )}
            </div>

            {/* شمارش معکوس */}
            <div
              className="px-4 mb-2 w-[97%] lg:w-[95%] lg:px-7 font-[AzarMehrFD] 
              bg-gradient-to-r from-[#CFCFCFE5] to-[#D8D8D800]
              dark:bg-gradient-to-r dark:from-[#ffffff09] dark:to-[#00000000] dark:text-dark-yellow text-blueLink rounded-[32px] border-[1px] border-solid dark:border-[#ffffff25] border-[#CFCFCFE5] shadow-lg p-4 flex flex-col sm:flex-row-reverse sm:h-[250px]"
            >
              <div className="flex flex-col justify-start sm:order-1 sm:content-start sm:w-[30%] sm:min-w-[194px]">
                <h2 className="text-[16px] font-bold lg:px-5 self-center sm:self-start text-black dark:text-white pb-6 sm:mt-4 sm:pb-6 sm:text-start 2xl:text-xl xl:text-lg lg:text-base">
                  {findByUniqueId(mainData, 583)} :
                </h2>
                <div className="flex justify-center  lg:px-5 items-center" style={{ direction: "ltr" }}>
                  <div className="text-center">
                    <div
                      className="hale text-2xl font-bold lg:text-3xl xl:text-4xl 3xl:text-5xl"
                    >
                      {switchDigits(event.start.split(' ')[0], params.lang)}
                    </div>
                    {/* <div className="text-base">{findByUniqueId(mainData, 380)}</div> */}
                  </div>
                  {/* <div className="flex gap-5">
                    <div className="text-center">
                      <div
                        className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl"
                      >
                        {switchDigits(event.start.split(' ')[1].split(':')[0], params.lang)}
                      </div>
                      <div className="text-base">{findByUniqueId(mainData, 560)}</div>
                    </div>
                    <span className="self-start text-[24px] leading-10 font-bold lg:text-3xl xl:text-4xl ">
                      :
                    </span>
                    <div className="text-center">
                      <div
                        className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl "
                      >
                        {switchDigits(event.start.split(' ')[1].split(':')[1], params.lang)}
                      </div>
                      <div className="text-base">{findByUniqueId(mainData, 33)}</div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="text-center mb-4 sm:w-[30%] sm:min-w-[194px]">
                <h2 className="text-[16px] lg:px-5 font-bold text-black dark:text-white pb-6 sm:pb-6 sm:mt-4 sm:text-start 2xl:text-xl xl:text-lg lg:text-base pt-6 sm:pt-0">
                  {findByUniqueId(mainData, 584)}
                </h2>
                {isEnded ? (
                  <div className="flex justify-center lg:px-5 items-center" style={{ direction: "ltr" }}>
                    <div className="text-center">
                      <div
                        className="hale text-2xl font-bold lg:text-3xl xl:text-4xl 3xl:text-5 3xl:text-5xl"
                      >
                        {switchDigits(event.end.split(' ')[0], params.lang)}
                      </div>
                      {/* <div className="text-base">{findByUniqueId(mainData, 380)}</div> */}
                    </div>

                    {/* <div className="flex gap-5 ">
                      <div className="text-center">
                        <div
                          className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl "
                        >
                          {switchDigits(event.end.split(' ')[1].split(':')[0], params.lang)}
                        </div>
                        <div className="text-base">{findByUniqueId(mainData, 560)}</div>
                      </div>
                      <span className="self-start text-[24px] leading-10 font-bold lg:text-3xl xl:text-4xl ">
                        :
                      </span>
                      <div className="text-center">
                        <div
                          className="hale text-2xl font-bold w-11 lg:text-3xl xl:text-4xl "
                        >
                          {switchDigits(event.end.split(' ')[1].split(':')[1], params.lang)}
                        </div>
                        <div className="text-base">{findByUniqueId(mainData, 33)}</div>
                      </div>
                    </div> */}
                  </div>
                ) : (
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
                )}
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
        );
      })}

      {/* دکمه بارگذاری بیشتر */}
      <div className="w-full text-center my-5 justify-center flex">
        {hasMore && events.length > 0 && (
          <button
            onClick={showMore}
            disabled={loading}
            className={`flex justify-center items-center gap-2
              ${loading ? "cursor-not-allowed opacity-60" : "hover:border-blueLink hover:dark:border-dark-yellow"}
             bg-white dark:bg-darkGray text-light-primary md:text-lg dark:text-dark-yellow rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-light-primary hover:text-light-primary hover:dark:border-dark-yellow`}
          >
            {loading ? <ThemedLoader /> : <>{findByUniqueId(mainData, 271)}</>}
          </button>
        )}
      </div>

      {/* مودال ورود */}
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

export default EventList;