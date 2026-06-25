"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { useTabLoading } from "../../../app/[lang]/levels/citizen/[levelName]/[tabs]/TabLoadingProvider";

export default function TabSelector({ params, mainData }: any ) {
  const lang = params.lang;
  const router = useRouter();
  const pathname = usePathname();
  const selectedTabRef = useRef<HTMLButtonElement | null>(null);
  const { setLoading } = useTabLoading();

  const tabs = [
    { id: 387, slug: "general-info" },
    { id: 388, slug: "licenses" },
    { id: 389, slug: "gem" },
    { id: 390, slug: "gift" },
    { id: 391, slug: "prize" },
  ];

  const handleClick = (slug: string) => {
    if (slug === params.tabs) return;

    setLoading(true);
    router.push(
      `/${lang}/levels/citizen/${params.levelName}/${slug}`
    );
  };

  useEffect(() => {
    const el = selectedTabRef.current;
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [params.tabs]);

  return (
    <div className="overflow-x-scroll no-scrollbar bg-bgLightGrey dark:bg-darkGray rounded-[12px] font-[700]">
      <ul className="flex justify-between text-sm font-medium list-none px-5 2xl:px-[40px] 2xl:text-base">
        {tabs.map((tab) => {
          const isActive = tab.slug === params.tabs;

          return (
            <li
              key={tab.slug}
              className="me-2 w-100 sm:w-auto whitespace-nowrap"
            >
              <button
                ref={isActive ? selectedTabRef : null}
                onClick={() => handleClick(tab.slug)}
                className={`inline-flex items-center justify-center w-full sm:w-auto p-3 pb-2.5 border-b-2  border-x-0 border-t-0 transition-colors bg-transparent ext-sm font-medium list-none  2xl:text-base
                  ${
                    isActive
                      ? "text-blueLink dark:text-dark-yellow border-dark-active-btn font-bold border-light-primary dark:border-dark-yellow font-bold"
                      : "dark:text-white font-[400] border-transparent hover:text-blueLink"
                  }`}
              >
                {findByUniqueId(mainData, tab.id)}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
