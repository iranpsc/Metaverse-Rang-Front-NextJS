import React from "react";
import { footerOptions } from "@/src/data/footer/footerOptions";
import Link from "next/link";
import Image from "next/image";

export default function Options() {
  return (
    <div className="grid flex items-center" style={{ gridTemplateColumns: 'repeat(18, 1fr)' }}>
      {footerOptions.map((data, index) => (
        <Link
          key={index}
          href={data.href}
          className="col-span-1 flex justify-center items-center px-1"
          target="_blank"
        >
          <Image src={data.photo} width={70} height={70} alt={data.alt} className="text-center"/>
        </Link>
      ))}
    </div>
  );
}
