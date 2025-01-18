"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
const UserCard = dynamic(() => import("@/components/shared/UserCard"));

export default function AboutList({
  params,
  citizenListArrayContent,
  levelListArrayContent,
}: any) {
  const [inView, setInView] = useState(false);
  // *HINT* useRef WON'T trigger re-render unlike useState.
  const aboutUsRef = useRef<HTMLDivElement | null>(null);

  const staticUsers = [
    {
      id: 1,
      name: "حسین قدیری",
      profile_photo: "/profile/hossein-ghadiri.jpg",
      code: "HM-2000001",
      score: "",
      levels: { current: { name: "بنیان گذار" } },
    },
    {
      id: 2,
      name: "امیر مدنی فر",
      profile_photo: "",
      code: "HM-2000002",
      score: "",
      levels: { current: { name: "بنیان گذار" } },
    },
    {
      id: 3,
      name: "عباس آجرلو",
      profile_photo: "",
      code: "HM-2000005",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 4,
      name: "مهدی غلام حسینی",
      profile_photo: "",
      code: "HM-2000008",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 5,
      name: "نازنین حشمتی",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 6,
      name: "امیر محسنی",
      profile_photo: "",
      code: "HM-2000475",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 7,
      name: "امین دهقان نژاد",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 8,
      name: "فاطمه نصیری",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 9,
      name: "بنیامین نوری",
      profile_photo: "",
      code: "HM-2000011",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 10,
      name: "مصطفی قدیری",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 11,
      name: "محمدجواد گرئی",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 12,
      name: "امیر حسین امینی",
      profile_photo: "",
      code: "HM-2000010",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 13,
      name: "آی تای ملکی",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 14,
      name: "یوسف خدری",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 15,
      name: "پرهام امین لو",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 16,
      name: "محمدرضا اصغری",
      profile_photo: "",
      code: "",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 17,
      name: "مرضیه ثاقب علیزاده",
      profile_photo: "",
      code: "HM-2000003",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 18,
      name: "سعید زاجکانی",
      profile_photo: "",
      code: "HM-2000009",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
    {
      id: 19,
      name: "پارسا بهرامی",
      profile_photo: "",
      code: "HM-2000491",
      score: "",
      levels: { current: { name: "توسعه دهنده" } },
    },
  ];
  function localFind1(_name: any) {
    return citizenListArrayContent.find((item: any) => item.name == _name)
      ?.translation;
  }
  function localFind2(_name: any) {
    return levelListArrayContent.find((item: any) => item.name == _name)
      ?.translation;
  }

  // IntersectionObserver to load iframe when it's in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true); // Trigger iframe load when in view
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the iframe is in view
      }
    );

    if (aboutUsRef.current) {
      observer.observe(aboutUsRef.current); // Observe the iframe container
    }

    return () => {
      if (aboutUsRef.current) {
        observer.unobserve(aboutUsRef.current); // Cleanup observer
      }
    };
  }, []);
  return (
    <div
      ref={aboutUsRef}
      className="flex flex-row flex-wrap justify-center md:justify-center w-full no-scrollbar overflow-y-auto py-[20px]"
    >
      {staticUsers.map((item: any, index: any) => (
        <UserCard
          key={index}
          item={item}
          index={index}
          params={params}
          minWidth={`260px`}
          levelText={localFind2("developer")}
          buttonText={localFind1("citizen page")}
        />
      ))}
    </div>
  );
}
