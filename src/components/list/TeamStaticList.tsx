"use client";

import UserCard from "@/components/card/UserCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { useState } from "react";



interface User {
  id: string | number;
  name: string;
  profile_photo: string;
  code: string;
  score: number | string;
  levels: {
    current: any;
    previous: any[];
  };
}

interface ListProps {
  params: any;
  mainData: any;
  users: User[];
}

export default function List({ params, mainData, users }: ListProps) {
  if (!users || users.length === 0) {
    return (
      <div className="text-center p-5 text-red-500">
        کاربر یافت نشد
      </div>
    );
  }

  // 🔒 کاربران استاتیک (همینجا، بدون فایل جدا)
  const staticUsers: User[] = [
    {
      id: 5,
      name: "نازنین حشمتی",
      profile_photo: "",
      code: "",
      score: "",
      levels: {
        current: { id: 0, name: "توسعه دهنده", image: "https://admin.metarang.com/uploads/levels/aJuYaVPHY34Ci25HGUWGiRpRmJMiNvN9L3gjojhY.png" },
        previous: [],
      },
    },
    {
      id: 6,
      name: "امیر محسنی",
      profile_photo: "",
      code: "HM-2000475",
      score: "",
      levels: {
        current: { id: 0, name: "توسعه دهنده", image: "https://admin.metarang.com/uploads/levels/aJuYaVPHY34Ci25HGUWGiRpRmJMiNvN9L3gjojhY.png" },
        previous: [],
      },
    },
    {
      id: 7,
      name: "امین دهقان نژاد",
      profile_photo: "",
      code: "HM-2000007",
      score: "",
      levels: {
        current: { id: 0, name: "توسعه دهنده", image: "https://admin.metarang.com/uploads/levels/aJuYaVPHY34Ci25HGUWGiRpRmJMiNvN9L3gjojhY.png" },
        previous: [],
      },
    },
    {
      id: 8,
      name: "فاطمه نصیری",
      profile_photo: "",
      code: "",
      score: "",
      levels: {
        current: { id: 0, name: "توسعه دهنده", image: "https://admin.metarang.com/uploads/levels/aJuYaVPHY34Ci25HGUWGiRpRmJMiNvN9L3gjojhY.png" },
        previous: [],
      },
    },
    {
      id: 9,
      name: "بنیامین نوری",
      profile_photo: "",
      code: "HM-2000011",
      score: "",
      levels: {
        current: { id: 0, name: "توسعه دهنده", image: "https://admin.metarang.com/uploads/levels/aJuYaVPHY34Ci25HGUWGiRpRmJMiNvN9L3gjojhY.png" },
        previous: [],
      },
    },
    {
      id: 10,
      name: "مصطفی قدیری",
      profile_photo: "",
      code: "",
      score: "",
      levels: {
        current: { id: 0, name: "توسعه دهنده", image: "https://admin.metarang.com/uploads/levels/aJuYaVPHY34Ci25HGUWGiRpRmJMiNvN9L3gjojhY.png" },
        previous: [],
      },
    },
    {
      id: 11,
      name: "محمدجواد گرئی",
      profile_photo: "",
      code: "",
      score: "",
      levels: {
        current: { id: 0, name: "توسعه دهنده", image: "https://admin.metarang.com/uploads/levels/aJuYaVPHY34Ci25HGUWGiRpRmJMiNvN9L3gjojhY.png" },
        previous: [],
      },
    },
    {
      id: 12,
      name: "امیر حسین امینی",
      profile_photo: "",
      code: "hm-2000010",
      score: "",
      levels: {
        current: { id: 0, name: "توسعه دهنده", image: "https://admin.metarang.com/uploads/levels/aJuYaVPHY34Ci25HGUWGiRpRmJMiNvN9L3gjojhY.png" },
        previous: [],
      },
    },
    {
      id: 13,
      name: "آی تای ملکی",
      profile_photo: "",
      code: "",
      score: "",
      levels: {
        current: { id: 0, name: "توسعه دهنده", image: "https://admin.metarang.com/uploads/levels/aJuYaVPHY34Ci25HGUWGiRpRmJMiNvN9L3gjojhY.png" },
        previous: [],
      },
    },
    {
      id: 14,
      name: "یوسف خدری",
      profile_photo: "",
      code: "",
      score: "",
      levels: {
        current: { id: 0, name: "توسعه دهنده", image: "https://admin.metarang.com/uploads/levels/aJuYaVPHY34Ci25HGUWGiRpRmJMiNvN9L3gjojhY.png" },
        previous: [],
      },
    },
    {
      id: 15,
      name: "پرهام امین لو",
      profile_photo: "",
      code: "",
      score: "",
      levels: {
        current: { id: 0, name: "توسعه دهنده", image: "https://admin.metarang.com/uploads/levels/aJuYaVPHY34Ci25HGUWGiRpRmJMiNvN9L3gjojhY.png" },
        previous: [],
      },
    },
    {
      id: 16,
      name: "محمدرضا اصغری",
      profile_photo: "",
      code: "",
      score: "",
      levels: {
        current: { id: 0, name: "توسعه دهنده", image: "https://admin.metarang.com/uploads/levels/aJuYaVPHY34Ci25HGUWGiRpRmJMiNvN9L3gjojhY.png" },
        previous: [],
      },
    },
  ];

  const staticRouteNames = [
    { id: 1, route_name: "citizen-baguette" },
    { id: 2, route_name: "reporter-baguette" },
    { id: 3, route_name: "participation-baguette" },
    { id: 4, route_name: "developer-baguette", image: "https://admin.metarang.com/uploads/levels/aJuYaVPHY34Ci25HGUWGiRpRmJMiNvN9L3gjojhY.png" },
    { id: 5, route_name: "inspector-baguette" },
  ];

  const getRouteName = (id: number, lang: string, name: string) => {
    if (lang === "fa") return name;
    const found = staticRouteNames.find(r => r.id === id);
    return found?.route_name.split("-")[0] || name;
  };

  // 🧠 مپ کاربران داینامیک
  const mappedUsers = users.map(user => {
    const current = user.levels?.current
      ? {
        ...user.levels.current,
        name: getRouteName(
          user.levels.current.id,
          params.lang,
          user.levels.current.name
        ),
      }
      : null;

    const previous =
      user.levels?.previous?.map(level => ({
        ...level,
        name: getRouteName(level.id, params.lang, level.name),
      })) || [];

    return {
      ...user,
      levels: { current, previous },
    };
  });

  // 🔥 استاتیک + داینامیک پشت‌سرهم
  const allUsers: User[] = [...staticUsers, ...mappedUsers];
const [activeBtnId, setActiveBtnId] = useState<string | number | null>(null);
  return (
    <div className="w-full flex flex-wrap gap-6 justify-center items-start pb-10 lg:px-7">
      {allUsers.map((user, index) => (
        <div
          key={`${user.code || user.id}-${index}`}
          style={{ minWidth: "280px" }}
        >
          <UserCard
            item={user}
            index={index}
            params={params}
            mainData={mainData}
            minWidth="280px"
            levelText={findByUniqueId(mainData, 68)}
            buttonText={findByUniqueId(mainData, 600)}
            activeBtnId={activeBtnId}
            setActiveBtnId={setActiveBtnId}
          />
        </div>
      ))}
    </div>
  );
}
