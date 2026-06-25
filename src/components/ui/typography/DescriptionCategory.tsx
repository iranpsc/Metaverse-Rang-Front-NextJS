"use client";

import { useState } from "react";

interface DescriptionProps {
  text: string;
}

export default function Description({ text }: DescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const shortText = text.length > 500 ? text.slice(0, 500) + "..." : text;

  return (
    <p className="w-full font-azarMehr font-normal text-[16px] text-justify dark:text-[#84858F] leading-8">
      {!expanded ? (
        <>
          {shortText}
          {text.length > 500 && (
            <button
              onClick={() => setExpanded(true)}
              className="ms-1 text-light-primary bg-transparent dark:text-dark-yellow hover:underline text-sm"
            >
              مشاهده بیشتر
            </button>
          )}
        </>
      ) : (
        <>
          {text}
          <button
            onClick={() => setExpanded(false)}
            className="ms-2 bg-transparent text-light-primary dark:text-dark-yellow hover:underline text-sm"
          >
            مشاهده کمتر
          </button>
        </>
      )}
    </p>
  );
}
