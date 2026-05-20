// components/shared/NewsGallerySimple.tsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface NewsGallerySimpleProps {
  gallery?: string[] | null;
  mainImage?: string;
 params:any;
}

export default function NewsGallerySimple({ gallery, mainImage , params }: NewsGallerySimpleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  // تمام تصاویر (تصویر اصلی + گالری)
  const allImages = mainImage && !gallery.includes(mainImage)
    ? [mainImage, ...gallery]
    : gallery;

  // تعیین تعداد نمایش بر اساس صفحه
  const getDisplayCount = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 4 : 3; // موبایل: 4, دسکتاپ: 3
    }
    return 4; // پیش‌فرض موبایل
  };

  const [displayCount, setDisplayCount] = useState(4);
  const showViewMoreButton = allImages.length > displayCount;

  // فقط تعداد مشخصی تصویر اول برای پیش‌نمایش
  const previewImages = allImages.slice(0, displayCount);

  // بررسی تغییر سایز صفحه
  useEffect(() => {
    const handleResize = () => {
      const newCount = window.innerWidth < 768 ? 4 : 3;
      setDisplayCount(newCount);
    };

    handleResize(); // تنظیم اولیه
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // باز کردن مودال با ایندکس مشخص
  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // بستن مودال - فقط با دکمه بستن
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  // رفتن به اسلاید قبلی
  const goToPrevious = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  // رفتن به اسلاید بعدی
  const goToNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // رفتن به اسلاید خاص با کلیک روی thumbnail
  const goToSlide = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  // تمام صفحه کردن
  const toggleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  // ناوبری با کیبورد
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        goToNext();
      } else if (e.key === "ArrowRight") {
        goToPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // پشتیبانی از سوایپ لمسی برای موبایل
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (touchStart - touchEnd > 75) {
      goToNext();
    }
    if (touchStart - touchEnd < -75) {
      goToPrevious();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <>
      {/* پیش‌نمایش گالری گرید - تعداد متغیر بر اساس دستگاه */}
      <div className="w-full my-8">
        <div className={`grid gap-3 md:gap-4 ${
          displayCount === 4 
            ? 'grid-cols-4' // موبایل: 4 ستون
            : 'grid-cols-3' // دسکتاپ: 3 ستون
        }`}>
          {previewImages.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => openModal(idx)}
            >
              <Image
                src={img}
                alt={`گالری تصویر ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 25vw, 33vw"
                unoptimized={true}
              />
              {/* لایه تیره و متن "+ بیشتر" برای آخرین عکس اگر بیشتر از تعداد نمایش باشد */}
              {idx === displayCount - 1 && showViewMoreButton && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/70">
                  <div className="text-center text-white">
                    <svg 
                      className="w-6 h-6 mx-auto mb-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span className="text-sm font-medium">
                      +{allImages.length - displayCount} <span> {params == "fa" ? "بیشتر" : "more"} </span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* مودال فول اسکرین با اسلایدر و thumbnail */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] backdrop-blur-md bg-white/10 dark:bg-black/20"
         
        >
          {/* هدر مودال با دکمه‌های کنترل */}
          <div className="absolute top-0 left-0 right-0 z-20 flex justify-between p-4 ">
            {/* دکمه بستن - فقط همین دکمه مودال رو میبنده */}
            <button
              onClick={closeModal}
              className="px-3 aspect-square rounded-full bg-black/50 dark:bg-white/50 dark:text-black dark:hover:bg-white/80 text-white hover:bg-black/70  flex items-center justify-center"
              aria-label="بستن"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* شمارنده تصاویر */}
            <div className="px-5  flex items-center justify-center rounded-full bg-black/50 text-white text-sm">
              <span>{currentIndex + 1} / {allImages.length}</span>
            </div>

            {/* دکمه تمام صفحه */}
            <button
              onClick={toggleFullscreen}
              className="px-3 aspect-square rounded-full bg-black/50 dark:bg-white/50 dark:text-black dark:hover:bg-white/80 text-white hover:bg-black/70  flex items-center justify-center"
              aria-label="تمام صفحه"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>

          {/* اسلایدر اصلی */}
          <div 
            className="relative w-full h-full cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* تصویر اصلی */}
              <div className="relative w-full h-full max-w-7xl mx-auto ">
                <Image
                  src={allImages[currentIndex]}
                  alt={`تصویر ${currentIndex + 1}`}
                  fill
                  className=" p-4 md:p-8  object-contain  mx-auto  rounded-3xl !h-max !w-max !max-h-full !max-w-full"
                  sizes="100vw"
                  priority
                  unoptimized={true}
                />
              </div>

              {/* دکمه قبلی */}
              {allImages.length > 1 && (
                <button
                  onClick={goToPrevious}
                  className="absolute right-4 md:right-6 px-3 aspect-square rounded-full bg-black/50 dark:bg-white/50 dark:text-black dark:hover:bg-white/80 text-white hover:bg-black/70  flex items-center justify-center shadow-lg"
                  aria-label="قبلی"
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* دکمه بعدی */}
              {allImages.length > 1 && (
                <button
                  onClick={goToNext}
                  className="absolute left-4 md:left-6 px-3 aspect-square rounded-full bg-black/50 dark:bg-white/50 dark:text-black dark:hover:bg-white/80 text-white hover:bg-black/70  flex items-center justify-center shadow-lg"
                  aria-label="بعدی"
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
            </div>

            {/* ثامبیل‌نیل (تصاویر کوچک در پایین) - به صورت افقی و در مرکز */}
            {allImages.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 z-20 pb-4 md:pb-6 bg-gradient-to-t  from-black/70 to-transparent pt-8">
                <div className="flex justify-center items-center px-4">
                  <div className="flex gap-2 md:gap-3 mb-5 lg:mb-0 py-5 overflow-x-auto w-full scrollbar-hide justify-center">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => goToSlide(idx, e)}
                        className={`relative flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                          currentIndex === idx
                            ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-105"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                          unoptimized={true}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* استایل برای مخفی کردن اسکرول‌بار در مرورگرها */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}