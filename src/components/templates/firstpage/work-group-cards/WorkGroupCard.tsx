import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCodeBranch,
  faFileLines,
  faGlobe,
  faPenRuler,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import type { ResourceGroup, WorkGroupCardData } from "./types";
import CardImage from "./CardImage";
import ResourceLinkItem from "./ResourceLinkItem";
import { GROUP_ICONS } from "./icons";
import { T } from "./translationIds";
import type { Translate } from "./translate";

interface WorkGroupCardProps {
  card: WorkGroupCardData;
  /** Route language (`fa` / `en`). */
  lang: string;
  t: Translate;
}

function SectionDivider({ icon, text }: { icon: ResourceGroup["icon"] | "document"; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-matn-2" role="presentation">
      <span className="h-px flex-1 bg-primary-tint-2/40 dark:bg-line-color" />
      <FontAwesomeIcon
        icon={icon === "document" ? faFileLines : GROUP_ICONS[icon]}
        aria-hidden="true"
        className="size-3 text-icon-color"
      />
      <span>{text}</span>
      <span className="h-px flex-1 bg-primary-tint-2/40 dark:bg-line-color" />
    </div>
  );
}

function Badge({ tone, icon, text }: { tone: "public" | "openSource"; icon: typeof faGlobe; text: string }) {
  return (
    <li
      style={{ listStyle: "none" }}
      className={
        tone === "public"
          ? "inline-flex h-6 items-center gap-1 rounded-full bg-accent-2/60 px-2.5 text-[11px] font-medium text-title-1 dark:bg-accent-2/20 dark:text-accent-2"
          : "inline-flex h-6 items-center gap-1 rounded-full bg-primary px-2.5 text-[11px] font-medium text-white dark:bg-primary/30 dark:text-primary-tint-1"
      }
    >
      <FontAwesomeIcon icon={icon} aria-hidden="true" className="size-3" />
      {text}
    </li>
  );
}

export default function WorkGroupCard({ card, lang, t }: WorkGroupCardProps) {
  const number = (n: number) => n.toLocaleString(lang === "fa" ? "fa-IR" : "en-US");

  const links = card.groups.flatMap((g) => g.links);
  const repositoryCount = links.filter((l) => l.kind === "repository").length;
  const mediaCount = links.filter((l) => l.kind === "social").length;
  const designCount = links.filter((l) => l.kind === "design").length;
  const showOpenSource = card.isOpenSource && repositoryCount > 0;

  const lastGroupIndex = card.groups.length - 1;
  const titleId = `card-title-${card.id}`;

  const summary = [
    { key: "repos", count: repositoryCount, word: T.countRepos, icon: faCodeBranch },
    { key: "media", count: mediaCount, word: T.countMedia, icon: faShareNodes },
    { key: "design", count: designCount, word: T.countVersions, icon: faPenRuler },
    { key: "docs", count: card.documents.length, word: T.countDocs, icon: faFileLines },
  ].filter((item) => item.count > 0);

  return (
    <article
    
      dir={lang === "fa" ? "rtl" : "ltr"}
      aria-labelledby={titleId}
      className="[&_li]:list-none [&_li::marker]:content-[''] group/card relative flex h-full flex-col gap-3 rounded-2xl border-[1.5px] border-primary-tint-2/70 bg-gray-1 p-3 shadow-[0_0_22px_0_rgb(var(--color-primary)/0.22)] transition-[transform,border-color,box-shadow] duration-300 ease-out will-change-transform hover:z-10 hover:-translate-y-1.5 hover:scale-[1.035] hover:border-primary hover:shadow-[0_0_28px_2px_rgb(var(--color-primary)/0.4)] focus-within:border-primary motion-reduce:transform-none motion-reduce:transition-none dark:border-primary-shade-2 dark:hover:border-primary"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(120%_55%_at_50%_0%,rgb(var(--color-primary)/0.12),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
      />
      <CardImage src={card.imageUrl} alt={`${t(T.imageAlt)}: ${t(card.titleId)}`} />

      {(card.isPublic || showOpenSource) && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="flex flex-wrap items-center gap-2">
          {card.isPublic && <Badge tone="public" icon={faGlobe} text={t(T.public)} />}
          {showOpenSource && <Badge tone="openSource" icon={faCodeBranch} text={t(T.openSource)} />}
        </ul>
      )}

      <header className="flex flex-col gap-1">
        {card.eyebrowId && <p className="text-[11px] text-matn-3">{t(card.eyebrowId)}</p>}
        <h3
          id={titleId}
          className="cursor-default select-none text-base font-bold leading-6 text-matn-1 transition-colors duration-300 group-hover/card:text-primary dark:group-hover/card:text-primary-tint-1"
        >
          {t(card.titleId)}
        </h3>
        {card.descriptionId && <p className="text-xs leading-5 text-matn-2">{t(card.descriptionId)}</p>}
      </header>

      <div className="flex items-center justify-between gap-2 rounded-xl border border-primary-tint-2/50 bg-primary/10 p-2 dark:border-line-color dark:bg-primary/15">
        <div className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-primary-tint-2/40"
          >
            <Image src="/svg/bale.svg" alt="" width={36} height={36} unoptimized className="size-full" />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[13px] font-bold leading-5 text-matn-1">{t(card.workGroup.nameId)}</span>
            <span className="truncate text-[11px] leading-4 text-matn-3">{t(card.workGroup.platformLabelId)}</span>
          </div>
        </div>
        <a
          href={card.workGroup.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-tint-2"
        >
          {t(T.joinGroup)}
          <span className="sr-only">
            {" — "}
            {t(card.titleId)}. {t(T.newTab)}
          </span>
          <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className="size-3 rtl:-scale-x-100" />
        </a>
      </div>

      {card.groups.map((group, index) => (
        <section key={group.id} className="flex flex-col gap-2.5" aria-label={t(group.headingId)}>
          <SectionDivider icon={group.icon} text={t(group.headingId)} />
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0 }}
            className={group.layout === "grid" ? "grid grid-cols-2 gap-2" : "flex flex-col gap-2"}
          >
            {[
              ...group.links,
              ...(index === lastGroupIndex ? card.documents : []),
            ].map((link) => (
              <li key={link.id} style={{ listStyle: "none" }} className="min-w-0">
                <ResourceLinkItem link={link} layout={group.layout} t={t} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      {card.groups.length === 0 && card.documents.length > 0 && (
        <section className="flex flex-col gap-2.5" aria-label={t(T.docs)}>
          <SectionDivider icon="document" text={t(T.docs)} />
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="flex flex-col gap-2">
            {card.documents.map((link) => (
              <li key={link.id} style={{ listStyle: "none" }} className="list-none min-w-0">
                <ResourceLinkItem link={link} layout="list" t={t} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {summary.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className=" mt-auto flex cursor-default select-none items-center justify-center gap-5 pt-1 text-[11px] text-matn-3">
          {summary.map((item) => (
            <li key={item.key} style={{ listStyle: "none" }} className="inline-flex items-center gap-1.5">
              <FontAwesomeIcon icon={item.icon} aria-hidden="true" className="size-3" />
              {number(item.count)} {t(item.word)}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
