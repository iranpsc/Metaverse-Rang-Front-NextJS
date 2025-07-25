"use client";
import React, { useEffect, useRef, useState } from "react";
import { Vector } from "@/components/svgs";
import Image from "next/image";
import Link from "next/link";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

const SectionTeam = ({ mainData, params }: any) => {
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
    <div ref={sectionRef} className="flex flex-column justify-center flex-wrap px-5 lg:px-0">
      <div className="w-[full] md:w-[50%] lg:w-[35%]">
        <Image
          className="w-full h-full sm:h-[360px] md:h-auto 3xl:aspect-square object-cover rounded-2xl lg:rounded-[32px] origin-center border-none"
          src="/firstpage/img2.webp"
          alt="header"
          width={500}
          height={357}
          loading="lazy"
          quality={75}
        />
      </div>

      <div className="w-full lg:w-[65%] flex flex-col justify-between items-start md:pb-3 md:ps-10 gap-1 ">
      <div className="flex flex-col  w-full">
                <h2 className="w-full text-start font-bold text-[20px] md:text-[26px] lg:text-[32px] text-gray dark:text-white mt-5 font-azarMehr">
         {findByUniqueId(mainData, 256)}
          
        </h2>
        <Vector className="w-[20%] h-10 stroke-light-primary dark:stroke-dark-yellow" />
      </div>

        

        <h4 className="w-full text-gray dark:text-white text-[20px] md:text-[24px] lg:text-[28px] text-start pb-2 font-bold ">
          {/* {localFind("a revolution in virtual platforms")} */}
          {findByUniqueId(mainData, 490)}
        </h4>

        <p className="w-full  pt-5 md:pt-0 text-justify   text-black dark:text-lightGray font-azarMehr font-medium text-[14px] md:text-[16px] lg:text-[22px] 3xl:pe-[250px]">
          {/* {localFind("imagine seeing objects and people in 3d on the internet")} */}
          {findByUniqueId(mainData, 491)}
        </p>

        <div className="w-full flex flex-row justify-start items-center pt-5 md:pt-0">
          <div className="relative flex flex-row justify-start items-start ">
            <Image
              className="xl:size-[60px] lg:size-[50px] md:size-[70px] sm:size-[50px] xs:size-[44px] rounded-full border-2 border-white z-50"
              src="/firstpage/person1.webp"
              alt="hossein ghadiri"
              width={64}
              height={64}
            />
            <Image
              className="xl:size-[60px] lg:size-[50px] md:size-[70px] sm:size-[50px] xs:size-[44px] rounded-full border-2 border-white ms-[-20px] z-40"
              src="/firstpage/person2.webp"
              alt="amir madanifar"
              width={64}
              height={64}
            />
            <Image
              className="xl:size-[60px] lg:size-[50px] md:size-[70px] sm:size-[50px] xs:size-[44px] rounded-full border-2 border-white ms-[-20px] z-30"
              src="/firstpage/person3.webp"
              alt="abbas ajorloo"
              width={64}
              height={64}
            />
            <Image
              className="xl:size-[60px] lg:size-[50px] md:size-[70px] sm:size-[50px] xs:size-[44px] rounded-full border-2 border-white ms-[-20px] z-20"
              src="/firstpage/person4.webp"
              alt="mahdi"
              width={64}
              height={64}
            />
            <Image
              className="xl:size-[60px] lg:size-[50px] md:size-[70px] sm:size-[50px] xs:size-[44px] rounded-full border-2 border-white ms-[-20px] z-10 object-cover"
              src="/firstpage/person05.webp"
              alt="Amin DehghanNejad"
              width={64}
              height={64}
            />
            <Image
              className="xl:size-[60px] lg:size-[50px] md:size-[70px] sm:size-[50px] xs:size-[44px] rounded-full border-2 border-white ms-[-20px] z-1 object-cover"
              src="/firstpage/person6.webp"
              alt="nazanin heshmati"
              width={64}
              height={64}
            />
          </div>

          <p className="ps-2 text-justify text-light-primary dark:text-dark-yellow font-azarMehr font-bold text-[12px] md:text-[18px] lg:text-[24px]">
            + 40 &nbsp;
            {/* {localFind("metarang team")} */}
            {findByUniqueId(mainData, 492)}
          </p>
        </div>
        <Link href={`/${params.lang}/about`}>
          <p className="w-fit rounded-[24px] py-3 px-10 mt-5 text-center text-[14px] md:text-[16px] lg:text-[20px] text-white bg-light-primary dark:bg-dark-yellow dark:text-black  font-azarMehr font-medium ">
           {findByUniqueId(mainData, 1456)}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SectionTeam;
