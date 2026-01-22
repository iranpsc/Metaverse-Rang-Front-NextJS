"use client";

import { useState } from "react";
import LevelCard from "@/components/module/levelComponent/LevelCard";

export default function LevelsClient({
  levels,
  concatArrayContent,
  params,
  mainData,
}: any) {
  const [activeLoadingId, setActiveLoadingId] = useState<number | null>(null);

  return (
    <div className="flex justify-center flex-wrap mt-[20px]">
      {levels.map((item: any) => (
        <LevelCard
          key={item.id}
          item={item}
          allLevelArrayContent={concatArrayContent}
          params={params}
          mainData={mainData}
          activeLoadingId={activeLoadingId}
          setActiveLoadingId={setActiveLoadingId}
        />
      ))}
    </div>
  );
}
