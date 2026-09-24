"use client";

import { useState } from "react";
import { useCookies } from "react-cookie";
import VideoCard from "@/components/card/VideoCard";

interface Params {
  lang: "fa" | "en";
}

interface Props {
  videos: any[];
  params: Params;
}

export default function EducationVideosClient({
  videos,
  params,
}: Props) {
  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";

  const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);

  return (
    <>
      {videos.map((item: any) => (
        <VideoCard
          key={item.id}
          item={item}
          params={params}
          theme={theme}
          activeLoadingId={activeLoadingId}
          setActiveLoadingId={setActiveLoadingId}
          imagePriority={false}
        />
      ))}
    </>
  );
}