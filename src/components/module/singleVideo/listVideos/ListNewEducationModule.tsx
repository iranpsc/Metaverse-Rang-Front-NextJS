"use client";
import { Like } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { checkData } from "@/components/utils/targetDataName";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SingleEducationItem from "./SingleEducationItem"; // 👈 فایل جدید برای هر آیتم

const ListNewEducationModule = ({ videos, mainData, params }: any) => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) setTheme("dark");
    else if (htmlElement.classList.contains("light")) setTheme("light");
  }, []);

  return (
    <>
      {videos &&
        videos.map((item: any, index: number) => (
          <SingleEducationItem
            key={index}
            item={item}
            mainData={mainData}
            params={params}
            theme={theme}
          />
        ))}
    </>
  );
};

export default ListNewEducationModule;
