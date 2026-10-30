import Link from "next/link";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { ArrowRight } from "@/components/svgs";
import WorkGroupCard from "./WorkGroupCard";
import MarqueeBoundary from "./MarqueeBoundary";
import { WorkGroupIconSprite } from "./WorkGroupIcons";
import {
  WG_IDS,
  WORK_GROUPS,
  WORK_GROUPS_SECTION_TITLE,
  WORK_GROUP_FALLBACK_TEXTS,
} from "./workGroupsData";

interface Props {
  /** دیکشنری ترجمه‌ی زبان فعال (از API) */
  mainData: Record<string, string> | null;
  /** مثل بقیه‌ی سکشن‌ها: params صفحه (lang از آن خوانده می‌شود) */
  params: { lang: string };
}

/** متن‌هایی که هنوز Unique ID ندارند. زبانِ بدون متن → انگلیسی */
const LOCAL_TEXTS: Record<string, { fa: string; en: string }> = {
  viewAll: { fa: "مشاهده همه", en: "View all" },
  figmaVersions: { fa: "نسخه‌های فیگما", en: "Figma versions" },
};

/** فرمت عدد با locale همان زبان؛ کدِ نامعتبر → بدون خطا */
function makeNumberFormatter(lang: string) {
  try {
    const nf = new Intl.NumberFormat(lang);
    return (n: number) => nf.format(n);
  } catch {
    return (n: number) => String(n);
  }
}

/**
 * سکشن کارت‌های گروه‌های کاری (ایشو #119) — قبل از «آخرین نسخه‌ها».
 * - Server Component، بدون JS کلاینت.
 * - زبان از API می‌آید؛ جهت (rtl/ltr) را خودِ صفحه روی body می‌گذارد و اینجا ارث‌بری می‌شود؛ هیچ شرطِ ثابتِ fa/en در کد نیست.
 * - متن: Unique ID از دیکشنری زبان → در نبود آن، متن جایگزین (زبان → en).
 */
export default function WorkGroupsSection({ mainData, params }: Props) {
  const lang = params.lang;
  const pick = (o?: { fa?: string; en?: string }): string =>
    (o as Record<string, string | undefined> | undefined)?.[lang] ??
    o?.en ??
    "";

  /** متن اختیاری: فقط دیکشنری/متن جایگزین؛ نبودنش = "" (مثلاً توضیح تکمیلی). */
  const tOpt = (id: number): string => {
    const v = findByUniqueId(mainData, id);
    if (v && v !== String(id)) return v;
    return pick(WORK_GROUP_FALLBACK_TEXTS[id]);
  };

  /** متن لازم: اگر هیچ‌جا نبود، خودِ Unique ID نمایش داده می‌شود تا کارت خالی/خراب نشود. */
  const t = (id: number): string => tOpt(id) || String(id);

  const fmt = makeNumberFormatter(lang);
  const counts1 = fmt(1);

  const sectionTitle =
    (WORK_GROUPS_SECTION_TITLE.id && t(WORK_GROUPS_SECTION_TITLE.id)) ||
    pick(WORK_GROUPS_SECTION_TITLE);

  const labels = {
    public: t(WG_IDS.public),
    openSource: t(WG_IDS.openSource),
    publicGroup: t(WG_IDS.publicGroupLabel),
    join: t(WG_IDS.joinGroup),
    repositories: t(WG_IDS.repositories),
    docs: t(WG_IDS.relatedDocs),
    docsShort: t(WG_IDS.docsUnit),
    activeMedia: t(WG_IDS.activeMedia),
    figmaVersions: pick(LOCAL_TEXTS.figmaVersions),
    repoUnit: t(WG_IDS.repositoryUnit),
    mediaUnit: t(WG_IDS.mediaUnit),
    groupUnit: t(WG_IDS.groupUnit),
  };

  return (
    <section
      aria-labelledby="work-groups-title"
      // پرفورمنس: بخش زیر فولد تا نزدیک شدن به ویوپورت رندر/لِی‌اوت نمی‌شود
      className="[content-visibility:auto] [contain-intrinsic-size:auto_1600px]"
    >
      <WorkGroupIconSprite />

      <div className="flex items-center justify-between gap-4">
        <h2
          id="work-groups-title"
          className="font-azarMehr font-bold text-[18px] md:text-[24px] lg:text-[32px] text-matn-1"
        >
          {sectionTitle}
        </h2>

        <Link
          href="https://github.com/iranpsc"
          target="_blank"
          rel="noopener noreferrer"
          className="group/all flex items-center gap-3 text-matn-1 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <span className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px]">
            {pick(LOCAL_TEXTS.viewAll)}
          </span>
          <ArrowRight className="w-[24px] h-full stroke-matn-1  transition-transform duration-200 group-hover/all:ltr:translate-x-1 group-hover/all:rtl:-translate-x-1 rtl:rotate-180" />
        </Link>
      </div>

      <MarqueeBoundary className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {WORK_GROUPS.map((g) => {
          const repoCount = (g.repos?.length ?? 0) + (g.org ? 1 : 0);
          return (
            <WorkGroupCard
              key={g.key}
              image={g.image}
              groupName={t(g.titleId)}
              title={t(g.subtitleEnId)}
              /* توضیح تکمیلی: از دیکشنریِ همان زبان؛ اگر خالی/تکراری بود نمایش داده نمی‌شود */
              description={(() => {
                const d = tOpt(g.subtitleFaId);
                return d && d !== t(g.subtitleEnId) ? d : undefined;
              })()}
              labels={labels}
              counts={{
                repo: fmt(repoCount),
                media: fmt(g.media?.length ?? 0),
                group: counts1,
              }}
              groupUrl={g.groupUrl}
              docsUrl={
                typeof g.docsUrl === "function" ? g.docsUrl(lang) : g.docsUrl
              }
              repos={g.repos?.map((r) => ({ name: t(r.nameId), url: r.url }))}
              org={
                g.org
                  ? {
                      label: t(g.org.labelId),
                      name: tOpt(g.org.nameFaId) || t(g.org.nameEnId),
                      url: g.org.url,
                    }
                  : undefined
              }
              media={g.media?.map((m) => ({
                label: t(m.labelId),
                url: m.url,
                icon: m.icon,
              }))}
              figma={g.figma?.map((f) => ({
                label: t(f.labelId),
                url: f.url,
                icon: f.icon,
              }))}
            />
          );
        })}
      </MarqueeBoundary>
    </section>
  );
}