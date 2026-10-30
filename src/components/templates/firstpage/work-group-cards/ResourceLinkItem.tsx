import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import type { GroupLayout, ResourceLink } from "./types";
import { PLATFORM_TEXT_CLASS, iconForLink } from "./icons";
import { T } from "./translationIds";
import type { Translate } from "./translate";

interface ResourceLinkItemProps {
  link: ResourceLink;
  layout: GroupLayout;
  t: Translate;
}

/** One independent external link (repository, social profile, document, Figma file, ...). */
export default function ResourceLinkItem({ link, layout, t }: ResourceLinkItemProps) {
  const label = typeof link.label === "number" ? t(link.label) : link.label;
  const description = link.descriptionId ? t(link.descriptionId) : null;
  const brandClass = link.kind === "document" ? undefined : PLATFORM_TEXT_CLASS[link.platform];

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      title={description ?? undefined}
      className={clsx(
        "group/link flex min-w-0 items-center gap-2 rounded-xl border border-primary-tint-2/60 bg-gray-1 px-3 font-medium text-matn-1",
        "transition-colors duration-200 dark:border-line-color",
        "hover:border-primary hover:bg-primary hover:text-white dark:hover:border-primary",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-tint-2",
        layout === "grid" ? "h-10 text-[11px]" : "h-11 text-xs",
      )}
    >
      <FontAwesomeIcon
        icon={iconForLink(link.kind, link.platform)}
        fixedWidth
        aria-hidden="true"
        className={clsx("size-3.5 shrink-0 transition-colors group-hover/link:text-white", brandClass)}
      />
      <span className="min-w-0 flex-1 truncate text-start">{label}</span>
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        aria-hidden="true"
        className="size-3 shrink-0 text-icon-color transition-colors group-hover/link:text-white rtl:-scale-x-100"
      />
      <span className="sr-only">
        {description ? `${description}. ` : ""}
        {t(T.newTab)}
      </span>
    </a>
  );
}
