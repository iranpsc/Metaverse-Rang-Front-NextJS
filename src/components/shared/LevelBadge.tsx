// components/shared/LevelBadge.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

interface LevelBadgeProps {
  currentGem: any;
  lang: string;
  urlForGem?: string;
  setLinkLoading: (loading: boolean) => void;
  uid: string; // برای clipPath منحصر به فرد
}

export default function LevelBadge({
  currentGem,
  lang,
  urlForGem,
  setLinkLoading,
  uid,
}: LevelBadgeProps) {
  const label = currentGem
    ? lang === "fa"
      ? currentGem.name || "تازه وارد"
      : currentGem.slug
        ? currentGem.slug.split("-baguette")[0].charAt(0).toUpperCase() +
          currentGem.slug.split("-baguette")[0].slice(1)
        : "Newcomer"
    : lang === "fa"
      ? "تازه وارد"
      : "Newcomer";

  return (
    <div className="absolute top-4 left-[-7px] group">
      {/* LIGHT – NORMAL */}
      <svg
        width={100}
        height={29}
        viewBox="0 0 100 29"
        fill="none"
        className="relative block dark:hidden group-hover:hidden"
      >
        <g clipPath={`url(#clip-${uid}-ln)`}>
          <path
            d="M0 2.0182V8.12H5.88235V0H0.987497C0.442242 0 0 0.903835 0 2.0182Z"
            fill={`url(#paint0-${uid}-ln)`}
          />
          <path
            d="M0 26.8548C0 28.0384 2.04025 29.0003 4.55074 29.0003H97.1356C98.9938 29.0003 100.329 28.1528 99.7826 27.3125L90.6356 17.3178L99.8963 6.10007C100.389 5.26688 99.062 4.44441 97.2266 4.44441H19.3406L4.619 4.46229C2.10851 4.46587 0.0682611 3.50394 0.0682611 2.32031L0 26.8548Z"
            fill={`url(#paint1-${uid}-ln)`}
          />
        </g>
        <defs>
          <linearGradient
            id={`paint0-${uid}-ln`}
            x1="-0.413825"
            y1="4.06181"
            x2="9.17874"
            y2="4.06181"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A6A6A6" />
            <stop offset={0.99} stopColor="#5B5B5B" />
          </linearGradient>
          <linearGradient
            id={`paint1-${uid}-ln`}
            x1="-14.1176"
            y1="16.2403"
            x2="89.3916"
            y2="15.6456"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#AFAFAF" />
            <stop offset={1} stopColor="#E9E9E9" />
          </linearGradient>
          <clipPath id={`clip-${uid}-ln`}>
            <rect width={29} height={100} fill="white" transform="matrix(0 1 1 0 0 0)" />
          </clipPath>
        </defs>
        <foreignObject x="0" y="0" width="100" height="29">
          <Link
            onClickCapture={() => setLinkLoading(true)}
            href={`/${lang}/levels/citizen/${urlForGem}/general-info`}
           
            className="w-full h-full flex items-center justify-center text-xs font-azarMehr rtl:ms-1 ltr:me-1 mt-[1px] text-black text-center px-1 overflow-hidden break-words"
          >
            {label}
          </Link>
        </foreignObject>
      </svg>

      {/* LIGHT – HOVER */}
      <svg
        width={100}
        height={29}
        viewBox="0 0 100 29"
        fill="none"
        className="relative hidden dark:hidden group-hover:block dark:group-hover:hidden"
      >
        <g clipPath={`url(#clip-${uid}-lh)`}>
          <path
            d="M0 2.0182V8.12H5.88235V0H0.987497C0.442242 0 0 0.903835 0 2.0182Z"
            fill={`url(#paint0-${uid}-lh)`}
          />
          <path
            d="M0 26.8548C0 28.0384 2.04025 29.0003 4.55074 29.0003H97.1356C98.9938 29.0003 100.329 28.1528 99.7826 27.3125L90.6356 17.3178L99.8963 6.10007C100.389 5.26688 99.062 4.44441 97.2266 4.44441H19.3406L4.619 4.46229C2.10851 4.46587 0.0682611 3.50394 0.0682611 2.32031L0 26.8548Z"
            fill={`url(#paint1-${uid}-lh)`}
          />
        </g>
        <defs>
          <linearGradient
            id={`paint0-${uid}-lh`}
            x1="-0.413825"
            y1="4.06181"
            x2="9.17874"
            y2="4.06181"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2C80FF" />
            <stop offset={0.99} stopColor="#001E4A" />
          </linearGradient>
          <linearGradient
            id={`paint1-${uid}-lh`}
            x1="-14.1176"
            y1="16.2403"
            x2="89.3916"
            y2="15.6456"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0053CF" />
            <stop offset={1} stopColor="#65A3FF" />
          </linearGradient>
          <clipPath id={`clip-${uid}-lh`}>
            <rect width={29} height={100} fill="white" transform="matrix(0 1 1 0 0 0)" />
          </clipPath>
        </defs>
        <foreignObject x="0" y="0" width="100" height="29">
          <Link
            onClickCapture={() => setLinkLoading(true)}
            href={`/${lang}/levels/citizen/${urlForGem}/general-info`}
            
            className="w-full h-full flex items-center justify-center text-xs font-azarMehr rtl:ms-1 ltr:me-1 mt-[1px] text-white text-center px-1 overflow-hidden break-words"
          >
            {label}
          </Link>
        </foreignObject>
      </svg>

      {/* DARK – NORMAL */}
      <svg
        width={100}
        height={29}
        viewBox="0 0 100 29"
        fill="none"
        className="relative hidden dark:block group-hover:hidden"
      >
        <g clipPath={`url(#clip-${uid}-dn)`}>
          <path
            d="M0 2.0182V8.12H5.88235V0H0.987497C0.442242 0 0 0.903835 0 2.0182Z"
            fill={`url(#paint0-${uid}-dn)`}
          />
          <path
            d="M0 26.8548C0 28.0384 2.04025 29.0003 4.55074 29.0003H97.1356C98.9938 29.0003 100.329 28.1528 99.7826 27.3125L90.6356 17.3178L99.8963 6.10007C100.389 5.26688 99.062 4.44441 97.2266 4.44441H19.3406L4.619 4.46229C2.10851 4.46587 0.0682611 3.50394 0.0682611 2.32031L0 26.8548Z"
            fill={`url(#paint1-${uid}-dn)`}
          />
        </g>
        <defs>
          <linearGradient
            id={`paint0-${uid}-dn`}
            x1="-0.413825"
            y1="4.06181"
            x2="9.17874"
            y2="4.06181"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1A1A18" />
            <stop offset={1} stopColor="#393939" />
          </linearGradient>
          <linearGradient
            id={`paint1-${uid}-dn`}
            x1="-14.1176"
            y1="16.2403"
            x2="89.3916"
            y2="15.6456"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1A1A18" />
            <stop offset={1} stopColor="#393939" />
          </linearGradient>
          <clipPath id={`clip-${uid}-dn`}>
            <rect width={29} height={100} fill="white" transform="matrix(0 1 1 0 0 0)" />
          </clipPath>
        </defs>
        <foreignObject x="0" y="0" width="100" height="29">
          <Link
            onClickCapture={() => setLinkLoading(true)}
            href={`/${lang}/levels/citizen/${urlForGem}/general-info`}
            
            className="w-full h-full flex items-center justify-center text-xs font-azarMehr text-white rtl:ms-1 ltr:me-1 mt-[1px] text-center px-1 overflow-hidden break-words"
          >
            {label}
          </Link>
        </foreignObject>
      </svg>

      {/* DARK – HOVER */}
      <svg
        width={100}
        height={29}
        viewBox="0 0 100 29"
        fill="none"
        className="relative hidden dark:group-hover:block"
      >
        <g clipPath={`url(#clip-dark-${uid})`}>
          <path
            d="M0 2.0182V8.12H5.88235V0H0.987497C0.442242 0 0 0.903835 0 2.0182Z"
            fill={`url(#paint0-dark-${uid})`}
          />
          <path
            d="M0 26.8548C0 28.0384 2.04025 29.0003 4.55074 29.0003H97.1356C98.9938 29.0003 100.329 28.1528 99.7826 27.3125L90.6356 17.3178L99.8963 6.10007C100.389 5.26688 99.062 4.44441 97.2266 4.44441H19.3406L4.619 4.46229C2.10851 4.46587 0.0682611 3.50394 0.0682611 2.32031L0 26.8548Z"
            fill={`url(#paint1-dark-${uid})`}
          />
        </g>
        <defs>
          <linearGradient
            id={`paint0-dark-${uid}`}
            x1="-0.413825"
            y1="4.06181"
            x2="9.17874"
            y2="4.06181"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFD232" />
            <stop offset={0.99} stopColor="#2D2302" />
          </linearGradient>
          <linearGradient
            id={`paint1-dark-${uid}`}
            x1="-14.1176"
            y1="16.2403"
            x2="89.3916"
            y2="15.6456"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#CDA000" />
            <stop offset={1} stopColor="#FFCE1F" />
          </linearGradient>
          <clipPath id={`clip-dark-${uid}`}>
            <rect width={29} height={100} fill="white" transform="matrix(0 1 1 0 0 0)" />
          </clipPath>
        </defs>
        <foreignObject x="0" y="0" width="100" height="29">
          <Link
            onClickCapture={() => setLinkLoading(true)}
            href={`/${lang}/levels/citizen/${urlForGem}/general-info`}
            
            className="w-full h-full flex items-center justify-center text-xs font-azarMehr text-white dark:text-black text-center rtl:ms-1 ltr:me-1 mt-[1px] overflow-hidden break-words"
          >
            {label}
          </Link>
        </foreignObject>
      </svg>
    </div>
  );
}