import React from "react";
import { headerCategories } from "@/src/data/header/headerCats";
import Link from "next/link";

export default function HeaderCategories() {
  return (
    <div className="grid grid-cols-9 flex items-center">
      {headerCategories.map((data, index) => (
        <Link
          key={index}
          href={data.href}
          className="flex justify-center w-[100px] h-[50px] items-center rounded-md hover:bg-purple text-center "
        >
          <h4 className="text-center">
            {data.title} 
          </h4>
        </Link>
      ))}
    </div>
  );
}
