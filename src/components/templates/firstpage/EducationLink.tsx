"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

export default function EducationLink({
  href,
  children,
}: Props) {
  const [linkLoading, setLinkLoading] = useState(false);

  return (
    <>
      {linkLoading && (
        <div className="fixed top-0 left-0 bottom-0 w-full h-screen z-[40] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="container flex w-full h-screen items-center justify-center md:ms-[25vw] lg:ms-[17vw] xl:ms-[15vw] 3xl:ms-[16vw]">
            <div className="holder">
              <div className="box" />
            </div>

            <div className="holder">
              <div className="box" />
            </div>

            <div className="holder">
              <div className="box" />
            </div>
          </div>
        </div>
      )}

      <Link
        href={href}
        onClickCapture={() => setLinkLoading(true)}
      >
        {children}
      </Link>
    </>
  );
}