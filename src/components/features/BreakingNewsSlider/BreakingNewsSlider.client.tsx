"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import BreakingNewsSkeleton from "./Skeleton";
import { Calender, Timer, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/formatNumber";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

export default function BreakingNewsSliderClient({
  news,
  lang,
  mainData,
}: any) {
  const [mounted, setMounted] = useState(false);
  const isRTL = lang === "fa";

  const getCategorySlug = (item: any) =>
    item.categorySlug ||
    item.category?.toLowerCase().replace(/\s+/g, "-") ||
    "general";

  useEffect(() => {
    // جلوگیری از init زودهنگام Swiper
    setMounted(true);
  }, []);

  if (!mounted) {
    return <BreakingNewsSkeleton />;
  }

  // با slidesPerView="auto" سوایپر فکر می‌کنه فقط ~۳ اسلاید دیده می‌شن، ولی توی coverflow
  // (به‌خاطر stretch) ۵ کارت دیده می‌شن: ۲ چپ، ۱ وسط، ۲ راست. اگه تعداد اسلایدها کم باشه
  // کلون‌های لوپ کم می‌شن و ترتیب به‌هم می‌ریزه (مثلاً ۴ کارت چپ و ۱ کارت راست).
  // پس تعداد اسلایدها رو حداقل MIN_SLIDES می‌کنیم (با تکرار خبرها).
  const MIN_SLIDES = 10;

  // فقط ۵ کارت دیده بشه (۲ چپ، ۱ وسط، ۲ راست): اسلایدهایی که بیشتر از ۲ جا از مرکز فاصله دارن
  // نامرئی و غیرکلیک‌پذیر می‌شن. progress هر اسلاید نسبت به مرکز حساب می‌شه (۰ = وسط، ±۱ = کناری).
  const VISIBLE_EACH_SIDE = 2;
  const limitVisibleSlides = (swiper: any) => {
    if (!swiper?.slides) return;
    swiper.slides.forEach((slideEl: any) => {
      const hidden = Math.abs(slideEl.progress ?? 0) > VISIBLE_EACH_SIDE + 0.5;
      slideEl.style.opacity = hidden ? "0" : "1";
      slideEl.style.pointerEvents = hidden ? "none" : "";
    });
  };
  const baseNews: any[] = news ?? [];
  const copies =
    baseNews.length > 0 ? Math.ceil(MIN_SLIDES / baseNews.length) : 1;
  const loopItems =
    copies > 1
      ? Array.from({ length: copies }, (_, c) =>
          baseNews.map((item: any) => ({ item, key: `${item.id}-${c}` }))
        ).flat()
      : baseNews.map((item: any) => ({ item, key: String(item.id) }));

  return (
    <div className="relative w-full h-full">
      <Swiper
        modules={[EffectCoverflow, Navigation]}
        effect="coverflow"
        centeredSlides
        slidesPerView="auto"
        loop
        loopAdditionalSlides={3}
        watchSlidesProgress
        onSwiper={limitVisibleSlides}
        onSetTranslate={limitVisibleSlides}
        onUpdate={limitVisibleSlides}
        onTransitionEnd={limitVisibleSlides}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 260,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        className="w-full h-full"
      >
        {loopItems.map(({ item, key }: any, index: number) => {
          const href = `/${lang}/news/categories/${getCategorySlug(item)}/${item.slug}`;

          return (
            <SwiperSlide
              key={key}
              className="!w-[75%] md:!w-[65%] lg:!w-[58%] relative"
            >
              {/* فقط یک لینک (قبلاً Link تو در تو بود) */}
              <Link href={href} className="block h-full">
                {/* TEXT */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6 md:p-8 lg:p-10 text-white flex flex-col items-center justify-center gap-5">
                  <div className="flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="334"
                      height="58"
                      viewBox="0 0 334 58"
                      fill="none"
                      className="!w-[200px] lg:!w-auto"
                    >
                      <path
                        d="M37.4028 1.17969H333.473L310.473 57.1797H11.9727L37.4028 1.17969Z"
                        fill="#F10011"
                      />
                      <path
                        d="M178.377 1H333.736L310.986 57H178.377L155.66 32.1512C154.281 30.6432 154.261 28.3385 155.613 26.8062L178.377 1Z"
                        fill="white"
                        className="dark:fill-black"
                      />
                      <text className="fill-black dark:fill-white">
                        <tspan
                          x={isRTL ? 270 : 210}
                          y="36.3237"
                          className="text-xl lg:text-3xl !font-rokh !font-extrabold"
                        >
                          {findByUniqueId(mainData, 1616) || "خبر"}
                        </tspan>
                      </text>
                      <text className="fill-black dark:fill-white">
                        <tspan
                          x={isRTL ? 140 : 40}
                          y="36.3237"
                          className="text-xl lg:text-3xl !font-rokh !font-extrabold"
                        >
                          {findByUniqueId(mainData, 1617) || "فوری"}
                        </tspan>
                      </text>
                    </svg>
                  </div>

                  <div className="block lg:text-2xl text-xl 3xl:text-3xl font-rokh text-center font-bold line-clamp-1">
                    {item.title}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <span>{formatNumber(item.stats?.views ?? 0)}</span>
                      <View className="size-5" />
                    </div>
                    |
                    <div className="flex items-center gap-2">
                      <span>{item.date?.split("T")[0]}</span>
                      <Calender className="size-5" />
                    </div>
                    |
                    <div className="flex items-center gap-2">
                      <span>{item.readingTime} دقیقه مطالعه</span>
                      <Timer className="size-5" />
                    </div>
                  </div>
                </div>

                {/* IMAGE */}
                <div className="relative h-full bg-neutral-300 dark:bg-neutral-800 rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 70vw, 50vw"
                    priority={index === 0}
                    quality={60}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* NAV
          بیرون از Swiper گذاشته شد تا کلیک روی دکمه‌ها وارد هندلر touch/click خود Swiper نشه
          (Swiper بعد از کلیک روی چیزی داخل کانتینرش می‌تونه کلیک‌های بعدی رو بلاک کنه).
          کانتینر pointer-events-none داره و فقط خود دکمه‌ها کلیک‌پذیرن. */}
      <div className="absolute top-[240px] left-0 w-full flex justify-center z-20 pointer-events-none">
        <div className="flex justify-between items-center !w-[85%] md:!w-[65%] lg:!w-[61%]">
          <div className="swiper-button-prev pointer-events-auto p-3 !static !text-white dark:!text-black after:!text-xl dark:after:!text-black !text-xl !w-12 !h-12 rounded-full bg-primary z-20 rtl:rotate-180" />
          <div className="swiper-button-next pointer-events-auto p-3 !static !text-white dark:!text-black after:!text-xl dark:after:!text-black !text-xl !w-12 !h-12 rounded-full bg-primary z-20 rtl:rotate-180" />
        </div>
      </div>
    </div>
  );
}