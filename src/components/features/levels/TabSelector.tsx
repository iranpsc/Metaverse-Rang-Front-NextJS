"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

const TABS = [
  { id: 387, slug: "general-info" },
  { id: 388, slug: "licenses" },
  { id: 389, slug: "gem" },
  { id: 390, slug: "gift" },
  { id: 391, slug: "prize" },
] as const;

export default function TabSelector({ params, mainData }: any) {
  const { lang, levelName } = params;

  // این کامپوننت داخل layout سگمنت [levelName] است، پس segment فعال همان تب است
  const activeTab = useSelectedLayoutSegment();
  const selectedTabRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    selectedTabRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeTab]);

  return (
    <div className="overflow-x-scroll no-scrollbar bg-gray-2 rounded-[12px] font-[700]">
      <ul className="flex justify-between text-sm font-medium list-none px-5 2xl:px-[40px] 2xl:text-base">
        {TABS.map((tab) => {
          const isActive = tab.slug === activeTab;

          return (
            <li key={tab.slug} className="me-2 w-100 sm:w-auto whitespace-nowrap">
              <Link
                ref={isActive ? selectedTabRef : null}
                href={`/${lang}/levels/citizen/${levelName}/${tab.slug}`}
                prefetch
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex items-center justify-center w-full sm:w-auto p-3 pb-2.5 border-b-2 border-x-0 border-t-0 transition-colors bg-transparent no-underline text-sm font-medium 2xl:text-base ${
                  isActive
                    ? "text-primary border-primary font-bold"
                    : "dark:text-white font-[400] border-transparent hover:text-primary"
                }`}
              >
                {findByUniqueId(mainData, tab.id)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
