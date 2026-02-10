"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/utils/lib/supabaseClient";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  readingTime: string;
};

export default function BreakingNewsSlider({ lang }: { lang: string }) {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from("news")
        .select("id,title,slug,image,date,readingTime")
        .order("date", { ascending: false })
        .limit(7);

      setNews(data || []);
    };

    fetchNews();
  }, []);

  if (!news.length) return null;

  return (
    <div className="w-full mt-10 relative px-4 sm:px-6 lg:px-8">
      {/* استایل برای تیره شدن تدریجی */}
      <style jsx global>{`
        .swiper-slide {
          transition: all 0.6s ease;
          filter: brightness(0.4) !important;
        }

        .swiper-slide-active {

          filter: brightness(1) !important;

        }

        /* کارت‌های بلافاصله کنار وسط (next و prev) */
        .swiper-slide-next,
        .swiper-slide-prev {

          filter: brightness(0.4) !important;
        }

        /* کارت‌های دورتر (اگر بیشتر از ۵ کارت نمایش داده شود) */
        .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-next):not(.swiper-slide-prev) {
    
          filter: brightness(0.2) !important;
        }
      `}</style>

      <Swiper
        modules={[EffectCoverflow, Navigation, Autoplay]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        initialSlide={1} // وسط شروع بشه
        loop
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        // autoplay={{ delay: 4500, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 260,     // فاصله افقی بین اسلایدها (کمتر از قبل برای حس فشرده‌تر)
          depth: 100,       // عمق بیشتر برای برجسته شدن اسلاید وسط
          modifier: 2.5,
          slideShadows: false,
        }}
        className="w-full rounded-x-xl h-[480px]  static"
      >
        {news.map((item) => (
          <SwiperSlide
            key={item.id}
            className="!w-[82%] sm:!w-[75%] md:!w-[65%] lg:!w-[58%] xl:!w-[60%] relative"
          >
            <div className="relative h-full rounded-xl overflow-hidden shadow-2xl group">
              {/* تصویر پس‌زمینه */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={news.indexOf(item) < 2} // فقط دو تا اول priority
              />

              {/* Overlay گرادیان از پایین به بالا */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50  to-transparent" />

              {/* محتوا پایین */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6 md:p-8 lg:p-10 text-white">
                {/* بج‌ها – دقیقاً مثل نمونه */}
                <div className="flex items-center gap-2.5 mb-4 md:mb-5">
                  <span className="bg-red-600/95 px-4 py-1.5 text-sm md:text-base font-extrabold rounded-md tracking-wide shadow-sm">
                    فوری
                  </span>
                  <span className="bg-white/95 text-black px-4 py-1.5 text-sm md:text-base font-extrabold rounded-md shadow-sm">
                    خبر
                  </span>
                </div>

                {/* عنوان */}
                <Link
                  href={`/${lang}/news/${item.slug}`}
                  className="block text-2xl sm:text-3xl  font-bold leading-tight md:leading-snug tracking-tight hover:underline underline-offset-4 transition-all duration-300 line-clamp-3 md:line-clamp-2"
                >
                  {item.title}
                </Link>

                {/* متا */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-4 md:mt-5 text-sm md:text-base text-gray-200/90 font-medium">
                  <span>{item.readingTime} دقیقه مطالعه</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300/70" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
        ))}
<div className="absolute top-[240px] w-full flex justify-center items-center">
            <div className="flex w-full  justify-between items-center  xl:!w-[62.4%] ">
            <div className="swiper-button-prev !static !text-white after:!text-xl dark:after:!text-black !w-12 !h-12 opacity-80 hover:opacity-100 transition select-none bg-light-primary dark:bg-dark-yellow rounded-full p-1  aspect-square" />
      <div className="swiper-button-next !static !text-white after:!text-xl dark:after:!text-black !w-12 !h-12 opacity-80 hover:opacity-100 transition select-none bg-light-primary dark:bg-dark-yellow rounded-full p-1  aspect-square" />
        </div>
</div>
      </Swiper>

      
    </div>
  );
}