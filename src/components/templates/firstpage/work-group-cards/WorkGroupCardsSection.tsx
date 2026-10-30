import Link from "next/link";
import { ArrowRight } from "@/components/svgs";
import { workGroupCards } from "./data";
import { T, VIEW_ALL_ID } from "./translationIds";
import { createTranslator } from "./translate";
import type { WorkGroupCardData } from "./types";
import WorkGroupCard from "./WorkGroupCard";

interface WorkGroupCardsSectionProps {
  /** Route language (`fa` / `en`). */
  lang: string;
  /** Translation dictionary of the app (the same `mainData` the other homepage sections receive). */
  mainData?: object | null;
  /** Defaults to the cards in `./data`. */
  cards?: readonly WorkGroupCardData[];
  /** Show only the first N cards. Default: all. */
  limit?: number;
  /** Destination of the «View all» link; the link is hidden when omitted. */
  viewAllHref?: string;
}

export default function WorkGroupCardsSection({
  lang,
  mainData,
  cards = workGroupCards,
  limit,
  viewAllHref,
}: WorkGroupCardsSectionProps) {
  const t = createTranslator(mainData, lang);
  const visible = typeof limit === "number" ? cards.slice(0, limit) : cards;
  const direction = lang === "fa" ? "rtl" : "ltr";

  return (
    <section aria-labelledby="work-group-cards-heading" className="w-full relative">
      <div className="w-full flex flex-row justify-between items-center">
        <h2
          id="work-group-cards-heading"
          className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white"
        >
          {t(T.heading)}
        </h2>
        {viewAllHref && (
          <Link href={viewAllHref}>
            <div className="flex justify-center items-center gap-4">
              <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
                {t(VIEW_ALL_ID)}
              </p>
              <ArrowRight
                className={`dark:stroke-white stroke-black w-[24px] h-full ${
                  direction === "rtl" ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </Link>
        )}
      </div>

      <ul className="mt-6 md:mt-12 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((card) => (
          <li key={card.id} className="min-w-0">
            <WorkGroupCard card={card} lang={lang} t={t} />
          </li>
        ))}
      </ul>
    </section>
  );
}
