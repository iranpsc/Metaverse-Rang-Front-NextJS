import React from "react";
import Image from "next/image";
import Link from "next/link"

export interface CategoriesCapsuleProps {
  name: string;
  image: string;
  slug: string;
}

export default function CategoriesCapsule({
  name,
  image,
  slug
}: CategoriesCapsuleProps) {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  return (
    <>
      <div className="relative px-8 pb-8">
      <Link href={`${baseUrl}/${slug}`}>
        <Image
          src={image}
          width="81"
          height="81"
          alt={name}
          className="-mb-[38px] -mr-[35px] rounded-full h-[56px] w-[56px] shadow-gray shadow-md" 
        />
      </Link>
        <Link href={`${baseUrl}/${slug}`} className="col-span-1 rounded-r-[45px] shadow-lg min-w-[200px] h-[40px] flex justify-center items-center border-[1px] border-gray-lighter">
          <h2 className="text-gray">{name}</h2>
        </Link>
      </div>
    </>
  );
}
