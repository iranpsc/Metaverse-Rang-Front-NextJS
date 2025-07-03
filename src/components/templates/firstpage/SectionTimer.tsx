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
      <div className="bg-gra"> </div>
      <div className="w-full h-[50px] flex lg:hidden justify-center items-center gap-10">
        <div className="bg-light-primary dark:bg-dark-yellow rounded-full size-[50px] flex justify-center items-center">
          <ArrowRight className="stroke-white dark:stroke-[#1b1b1b] size-[24px]" />
        </div>
        <div className="bg-light-primary dark:bg-dark-yellow rounded-full size-[50px] flex justify-center items-center">
          <ArrowRight className="stroke-white dark:stroke-[#1b1b1b] size-[24px] rotate-180" />
        </div>
      </div>

      <div className="bg-light-primary dark:bg-dark-yellow rounded-full p-[10px] hidden lg:flex justify-center items-center me-5">
        <ArrowRight className="stroke-white dark:stroke-[#1b1b1b] size-[32px] ltr:rotate-180" />
      </div>
      <div className="flex gap-5 px-4">
              <div
        className="h-[90%] lg:me-5 relative rounded-[50px] p-[1px] "
        style={{ background: "linear-gradient(-135deg, transparent, #9898a0 , transparent)" }}
      >
        <div
          className="h-full bg-[#DEDEE9] dark:bg-darkGray  rounded-[48px] p-7 flex flex-col lg:flex-row md:gap-0 sm:gap-5 gap-5 justify-center items-center"
        >
          <div className="absolute bg-white/10 z-0 size-[200px] top-[30px] end-[25%] blur-3xl filter"></div>
          <div className="absolute bg-white/20 z-0 size-[150px] top-[10px] end-[85%] blur-3xl filter"></div>
          <div className="absolute bg-white/15 z-0 size-[150px] top-[160px] end-[0%] blur-3xl filter"></div>
          <div className="w-full h-full flex justify-center lg:max-w-[360px] max-h-[100%] rounded-[32px] border-none overflow-hidden">
            <Image
              className="w-fill h-full object-cover"
              src="/firstpage/free.webp"
              alt="header"
              width={500}
              height={357}
              quality={75}
            />
          </div>
          <div className="w-full mt-4 lg:mt-0 text-justify flex flex-col justify-between h-full">
            <h4 className="text-start text-[23px] lg:text-xl 3xl:text-[32px] text-black dark:text-white font-azarMehr font-medium ms-5">
              اهدای 963 قطعه زمین(VOD) رایگان
            </h4>
            <p className="w-fit text-start  text-lg  3xl:text-2xl text-lightGray font-azarMehr font-medium mt-5 lg:mt-10 ms-5">
              اهدای 963 قطعه زمین(VOD) رایگان به ارزش 50,371,200,000 ریال برای
              آزادسازی جزیره آریایی در اولین متاورس ایران متاورس رنگ
            </p>
          </div>
        </div>
      </div>
      {/* FIRST BOX */}


      {/* SECOND BOX */}
      <div className="h-[90%] w-full lg:w-[45%] rounded-[50px] p-[1px] relative dark:bg-gradient-to-tl dark:to-transparent dark:via-[#454545] dark:from-transparent"
      >
        <div
          className=" p-[20px] h-full  rounded-[50px]
        flex flex-col justify-around items-center relative bg-gradient-to-tl to-[#dfdfdf]  from-white  dark:to-[#343434] dark:via-darkGray dark:from-darkGray"
        >
          <div className="absolute bg-white/10 z-0 size-[150px] top-[-10px] end-[-20px] rounded-xl blur-3xl filter"></div>
          <DynamicTimer />
          <div className="w-full">
            <p className="w-full rounded-[28px] py-3 z-50 text-center text-lg lg:text-[20px] text-white dark:text-black bg-light-primary dark:bg-dark-yellow font-azarMehr font-medium mt-5">
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
      </div>
      </div>

      <div className="bg-light-primary dark:bg-dark-yellow rounded-full p-[10px] flex justify-center items-center hidden lg:flex xs:hidden ms-5">
        <ArrowRight className="stroke-white dark:stroke-[#1b1b1b] size-[32px] rotate-180 ltr:rotate-0" />
      </div>
    </div>
  );
};

export default SectionTimer;
