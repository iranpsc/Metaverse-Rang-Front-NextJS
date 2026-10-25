import Image from "next/image";
import {
  BroadcastIcon,
  CastIcon,
  ChainIcon,
  ChevronIcon,
  DocIcon,
  ExternalIcon,
  GitHubIcon,
  GlobeIcon,
  GridIcon,
  ShieldCheckIcon,
  UsersIcon,
  WorkGroupLinkIcon,
} from "./WorkGroupIcons";
import type { WorkGroupIconKey } from "./workGroupsData";

/**
 * کارت گروه کاری — مطابق طرح فیگما (تصویر مرجع ایشو #119).
 * فقط نمایش؛ متن‌ها ترجمه‌شده از بیرون می‌آیند (فارسی/انگلیسی، RTL/LTR).
 * رنگ‌ها فقط از توکن‌های سیستم دیزاین (tailwind.config.js) هستند.
 */

export interface WorkGroupCardProps {
  dir: "rtl" | "ltr";
  priority?: boolean;
  image: string;
  /** نام گروه (کنار آیکون زنجیر) */
  groupName: string;
  /** عنوان انگلیسی بزرگ */
  title: string;
  /** توضیح فارسی زیر عنوان (در انگلیسی خالی) */
  description?: string;
  labels: {
    public: string;
    openSource: string;
    publicGroup: string;
    join: string;
    repositories: string;
    docs: string;
    docsShort: string;
    activeMedia: string;
    figmaVersions: string;
    repoUnit: string;
    mediaUnit: string;
    groupUnit: string;
  };
  groupUrl: string;
  docsUrl: string;
  repos?: { name: string; url: string }[];
  org?: { label: string; name: string; url: string };
  media?: { label: string; url: string; icon: WorkGroupIconKey }[];
  figma?: { label: string; url: string; icon: WorkGroupIconKey }[];
}

/** ردیف لینک: کادر بنفش، آیکون، متن، فلش خروج. هاور = پر شدن بنفش */
const rowCls =
  "group/row flex min-h-[44px] items-center gap-2.5 rounded-xl border border-primary/60 bg-gray-2 dark:bg-gray-3 px-3 py-2.5 text-[13px] font-medium text-matn-1 transition-colors duration-200 hover:border-primary hover:text-white hover:ltr:bg-linear-to-r hover:rtl:bg-linear-to-l hover:from-primary hover:to-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-tint-2";

function Divider({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3" role="separator">
      <span className="h-px flex-1 bg-line-color" />
      <span className="flex items-center gap-1.5 font-azarMehr text-[12px] font-medium text-matn-1">
        <span className="text-icon-color">{icon}</span>
        {children}
      </span>
      <span className="h-px flex-1 bg-line-color" />
    </div>
  );
}

function Badge({
  children,
  tone,
  icon,
}: {
  children: React.ReactNode;
  tone: "public" | "open";
  icon: React.ReactNode;
}) {
  const cls =
    tone === "public"
      ? "border-state-green/60 bg-state-green/10 text-state-green dark:border-accent-2/60 dark:bg-accent-2/10 dark:text-accent-2"
      : "border-primary/60 bg-primary/15 text-primary dark:text-primary-tint-1";
  return (
    <span
      dir="ltr"
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-sans text-[11px] font-medium ${cls}`}
    >
      {icon}
      {children}
    </span>
  );
}

function FooterStat({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-1.5 text-[11px] text-matn-2">
      <span className="text-icon-color">{icon}</span>
      {children}
    </span>
  );
}

export default function WorkGroupCard(props: WorkGroupCardProps) {
  const {
    dir,
    priority,
    image,
    groupName,
    title,
    description,
    labels,
    groupUrl,
    docsUrl,
    repos,
    org,
    media,
    figma,
  } = props;

  const rtl = dir === "rtl";
  const num = (n: number) => (rtl ? n.toLocaleString("fa-IR") : String(n));

  const repoCount = (repos?.length ?? 0) + (org ? 1 : 0);
  const hasOpenSource = repoCount > 0;
  const mediaCount = media?.length ?? 0;

  const docsRow = (
    <a
      href={docsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={rowCls}
    >
      <DocIcon className="size-5 shrink-0" />
      <span className="min-w-0 flex-1 truncate font-azarMehr">{labels.docs}</span>
      <ExternalIcon className="size-4 shrink-0 text-icon-color group-hover/row:text-white rtl:-scale-x-100" />
    </a>
  );

  return (
    <article
      dir={dir}
      className="group relative flex h-full flex-col gap-3.5 rounded-[24px] border border-primary/50 bg-gray-1 dark:bg-gray-3 p-2.5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-[0_14px_36px_-14px_rgb(var(--color-primary)/0.7)] focus-within:border-primary"
    >
      {/* تصویر */}
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[16px] bg-gray-2">
        <Image
          src={image}
          alt={groupName}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:768px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3.5 px-1.5 pb-1">
        {/* نشان‌ها */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="public" icon={<GlobeIcon className="size-3.5" />}>
            {labels.public}
          </Badge>
          {hasOpenSource && (
            <Badge tone="open" icon={<BroadcastIcon className="size-3.5" />}>
              {labels.openSource}
            </Badge>
          )}
        </div>

        {/* عنوان */}
        <header className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-1.5 font-azarMehr text-[12px] text-matn-2">
              <ChainIcon className="size-3.5 shrink-0 text-primary dark:text-primary-tint-2" />
              <span className="truncate">{groupName}</span>
            </span>
            <ChevronIcon
              className="size-4 shrink-0 text-primary dark:text-primary-tint-2 rtl:-scale-x-100"
            />
          </div>
          <h3
            dir="ltr"
            className="font-sans text-[16px] font-bold leading-snug text-title-2 dark:text-matn-1 rtl:text-end ltr:text-start"
          >
            {title}
          </h3>
          {description && (
            <p className="font-azarMehr text-[13px] text-matn-2">{description}</p>
          )}
        </header>

        {/* گروه کاری پابلیک + ورود */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary/60 bg-gray-2 dark:bg-gray-3 p-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gray-3 dark:bg-gray-1 text-state-green">
              <ShieldCheckIcon className="size-6" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-azarMehr text-[13px] font-medium text-matn-1">
                {labels.publicGroup}
              </span>
              <span className="text-[11px] text-matn-3">Bale</span>
            </span>
          </div>
          <a
            href={groupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl ltr:bg-linear-to-r rtl:bg-linear-to-l from-primary to-primary-tint-2 px-3.5 py-2.5 font-azarMehr text-[13px] font-medium text-white transition-all duration-200 hover:from-primary-shade-2 hover:to-secondary hover:shadow-[0_6px_18px_-6px_rgb(var(--color-primary)/0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-tint-2"
          >
            <UsersIcon className="size-4" />
            {labels.join}
            <ChevronIcon className="size-4 rtl:-scale-x-100" />
          </a>
        </div>

        {/* مخازن پروژه */}
        {repos && repos.length > 0 && (
          <>
            <Divider icon={<GitHubIcon className="size-4" />}>
              {labels.repositories}
            </Divider>
            <ul className="flex flex-col gap-2.5">
              {repos.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className={rowCls}
                  >
                    <GitHubIcon className="size-5 shrink-0" />
                    <span className="min-w-0 flex-1 truncate font-sans">{r.name}</span>
                    <ExternalIcon className="size-4 shrink-0 text-icon-color group-hover/row:text-white" />
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* سازمان گیت‌هاب */}
        {org && (
          <>
            <Divider icon={<GitHubIcon className="size-4" />}>{org.label}</Divider>
            <a
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className={rowCls}
            >
              <GitHubIcon className="size-5 shrink-0" />
              <span className="min-w-0 flex-1 truncate font-sans" dir="ltr">
                {org.name}
              </span>
              <ExternalIcon className="size-4 shrink-0 text-icon-color group-hover/row:text-white rtl:-scale-x-100" />
            </a>
          </>
        )}

        {/* نسخه‌های فیگما */}
        {figma && figma.length > 0 && (
          <>
            <Divider icon={<WorkGroupLinkIcon name="figma" className="size-4" />}>
              {labels.figmaVersions}
            </Divider>
            <ul className="flex flex-col gap-2.5">
              {figma.map((f) => (
                <li key={f.url}>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={rowCls}
                  >
                    <WorkGroupLinkIcon name={f.icon} className="size-5 shrink-0" />
                    <span className="min-w-0 flex-1 truncate font-azarMehr">{f.label}</span>
                    <ExternalIcon className="size-4 shrink-0 text-icon-color group-hover/row:text-white rtl:-scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* رسانه‌های فعال: گرید دو ستونه، آخرین خانه = مستندات */}
        {media && media.length > 0 && (
          <>
            <Divider icon={<CastIcon className="size-4" />}>{labels.activeMedia}</Divider>
            <ul className="grid grid-cols-2 gap-2.5">
              {media.map((m) => (
                <li key={m.url}>
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    aria-label={m.label}
                    className={rowCls}
                  >
                    <WorkGroupLinkIcon name={m.icon} className="size-5 shrink-0" />
                    <span className="min-w-0 flex-1 truncate font-sans">
                      {m.icon === "youtube"
                        ? "Youtube"
                        : m.icon === "linkedin"
                          ? "Linkedin"
                          : m.icon.charAt(0).toUpperCase() + m.icon.slice(1)}
                    </span>
                    <ExternalIcon className="size-4 shrink-0 text-icon-color group-hover/row:text-white" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowCls}
                >
                  <DocIcon className="size-5 shrink-0" />
                  <span className="min-w-0 flex-1 truncate font-azarMehr">
                    {labels.docsShort}
                  </span>
                  <ExternalIcon className="size-4 shrink-0 text-icon-color group-hover/row:text-white rtl:-scale-x-100" />
                </a>
              </li>
            </ul>
          </>
        )}

        {/* مستندات مرتبط (کارت‌های غیررسانه‌ای) */}
        {!(media && media.length > 0) && (
          <div className={repos?.length || org || figma?.length ? "" : "mt-0.5"}>
            {docsRow}
          </div>
        )}

        {/* فوتر آمار */}
        <footer className="mt-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-line-color pt-3">
          {repoCount > 0 && (
            <>
              <FooterStat icon={<GitHubIcon className="size-4" />}>
                {num(repoCount)} {labels.repoUnit}
              </FooterStat>
              <span className="size-1 rounded-full bg-line-color" />
            </>
          )}
          {mediaCount > 0 ? (
            <FooterStat icon={<GridIcon className="size-4" />}>
              {num(mediaCount)} {labels.mediaUnit}
            </FooterStat>
          ) : (
            <FooterStat icon={<UsersIcon className="size-4" />}>
              {num(1)} {labels.groupUnit}
            </FooterStat>
          )}
          <span className="size-1 rounded-full bg-line-color" />
          <FooterStat icon={<DocIcon className="size-4" />}>{labels.docsShort}</FooterStat>
        </footer>
      </div>
    </article>
  );
}