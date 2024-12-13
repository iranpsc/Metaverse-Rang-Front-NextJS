"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/svgs";
import Image from "next/image";
import DynamicTimer from "./DynamicTimer";

const SectionTimer = () => {
  const [isInView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.01, // Trigger
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // If not in view, render a placeholder (or null to defer rendering entirely)
  if (!isInView) {
    return <div ref={sectionRef} style={{ minHeight: "500px" }} />;
  }

  return (
    <div
      ref={sectionRef}
      className="w-full h-full flex flex-wrap lg:flex-nowrap justify-evenly xl:gap-1 lg:gap-1 md:gap-5 sm:gap-5 xs:gap-5 items-center"
    >
      <div className="w-full h-[50px] flex lg:hidden justify-center items-center gap-10">
        <div className="bg-dark-yellow rounded-full size-[50px] flex justify-center items-center">
          <ArrowRight className="stroke-[#1b1b1b] size-[24px]" />
        </div>
        <div className="bg-dark-yellow rounded-full size-[50px] flex justify-center items-center">
          <ArrowRight className="stroke-[#1b1b1b] size-[24px] rotate-180" />
        </div>
      </div>

      <div className="bg-dark-yellow rounded-full p-[10px] hidden lg:flex justify-center items-center">
        <ArrowRight className="stroke-[#1b1b1b] size-[24px]" />
      </div>

      {/* FIRST BOX */}
      <div
        className="h-[90%] lg:me-5 relative border-2 border-[#343434] rounded-[50px] p-[20px]
        flex flex-col lg:flex-row md:gap-0 sm:gap-5 gap-5 justify-center items-center"
        style={{ borderColor: "linear-gradient(to right, #000, #fff)" }}
      >
        <div className="absolute bg-white/10 z-0 size-[150px] top-[10px] end-[20%] blur-3xl filter"></div>
        <div className="w-full lg:max-w-[360px] max-h-[100%] rounded-[32px] border-none overflow-hidden">
          <Image
            className="w-fill h-full object-cover"
            src="/firstpage/ariai.rgb.irpsc.jpg"
            alt="header"
            width={212}
            height={212}
          />
        </div>
        <div className="w-full mt-4 lg:mt-0">
          <h4 className="text-start text-[23px] lg:text-[28px] text-black dark:text-white font-azarMehr font-medium ms-5">
            اهدای 963 قطعه زمین(VOD) رایگان
          </h4>
          <p className="w-fit text-start text-lg xl:text-[20px] text-lightGray font-azarMehr font-medium mt-5 lg:mt-10 ms-5">
            اهدای 963 قطعه زمین(VOD) رایگان به ارزش 50,371,200,000 ریال برای
            آزادسازی جزیره آریایی در اولین متاورس ایران متاورس رنگ
          </p>
        </div>
      </div>

      {/* SECOND BOX */}
      <div
        className="h-[90%] w-full xl:w-[35%] rounded-[50px] border-2 border-[#343434] p-[20px]
      flex flex-col justify-around items-center relative"
      >
        <div className="absolute bg-white/10 z-0 size-[150px] top-[-10px] end-[-20px] rounded-xl blur-3xl filter"></div>
        <DynamicTimer />
        <div className="w-full">
          <p className="w-full rounded-[28px] py-3 z-50 text-center text-lg lg:text-[20px] text-black bg-dark-yellow font-azarMehr font-medium mt-5">
            پیش خرید
          </p>
          <p className="w-full rounded-[28px] py-3 mt-5 text-center text-lg lg:text-[20px] text-white bg-[#343434] font-azarMehr font-medium">
            <a
              href="https://meta.irpsc.com/2024/07/19/ariana/"
              className="w-full h-full inline-block"
            >
              مشاهده آبجکت
            </a>
          </p>
        </div>
      </div>

      <div className="bg-dark-yellow rounded-full p-[10px] flex justify-center items-center hidden lg:flex xs:hidden">
        <ArrowRight className="stroke-[#1b1b1b] size-[24px] rotate-180" />
      </div>
    </div>
  );
};

export default SectionTimer;
