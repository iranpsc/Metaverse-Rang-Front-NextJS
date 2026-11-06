"use client";

import { useMemo, useState } from "react";
import UserCard from "@/components/card/UserCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
// import { string } from "yup";
export default function TopWritersClient({ params ,users, mainData }: any) {
  const [activeBtnId, setActiveBtnId] = useState<string | null>(null);
  const cardTranslations = useMemo(
    () => ({
      buttonText: findByUniqueId(mainData, 600),
      levelText: findByUniqueId(mainData, 68),
    }),
    [mainData]
  );

  if (!users || users.length === 0) {
    return <div className="text-center p-5 text-red-500">کاربر یافت نشد</div>;
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 pb-10 lg:px-7 items-center">
      {users.map((user: any) => (
        <div key={user.code} style={{ minWidth: "280px" }}>
          <UserCard
            item={user}
            params={params}
            mainData={mainData}
            activeBtnId={activeBtnId}
            setActiveBtnId={setActiveBtnId}
            buttonText={cardTranslations.buttonText}
            levelText={cardTranslations.levelText}
          />
        </div>
      ))}
    </div>
  );
}
