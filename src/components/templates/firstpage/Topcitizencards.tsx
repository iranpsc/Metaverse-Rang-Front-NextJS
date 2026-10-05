"use client";

import { useState } from "react";
import UserCard from "@/components/card/UserCard";

type Props = {
  citizens: any[];
  params: { lang: string };
  mainData: any;
  buttonText: string;
};

export default function TopCitizenCards({
  citizens,
  params,
  mainData,
  buttonText,
}: Props) {
  const [activeBtnId, setActiveBtnId] = useState<string | null>(null);

  return (
    <>
      {citizens.map((item, index) => (
        <UserCard
          key={item.id}
          item={item}
          index={index}
          params={params}
          minWidth="290px"
          mainData={mainData}
          buttonText={buttonText}
          activeBtnId={activeBtnId}
          setActiveBtnId={setActiveBtnId}
        />
      ))}
    </>
  );
}