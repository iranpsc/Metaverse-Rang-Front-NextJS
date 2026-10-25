import Link from "next/link";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import WorkGroupCard from "./WorkGroupCard";
import { ArrowRight } from "@/components/svgs";
import {
  WG_IDS,
  WORK_GROUPS,
  WORK_GROUPS_SECTION_TITLE,
  WORK_GROUP_FALLBACK_TEXTS,
  type Lang,
} from "./workGroupsData";

interface Props {
  mainData: any;
  params: { lang: Lang | string };
}

/** متن‌هایی که هنوز Unique ID ندارند */
const LOCAL_TEXTS = {
  viewAll: { fa: "مشاهده همه", en: "View all" },
  figmaVersions: { fa: "نسخه‌های فیگما", en: "Figma versions" },
} as const;

/**
 * سکشن کارت‌های گروه‌های کاری (ایشو #119) — قبل از بخش «آخرین نسخه‌ها».
 * متن‌ها: اول Unique ID از فایل ترجمه، در نبود آن متن جایگزین (فا/en).
 */
export default function WorkGroupsSection({ mainData, params }: Props) {
  const lang: Lang = params.lang === "en" ? "en" : "fa";
  const dir = lang === "fa" ? "rtl" : "ltr";

  const t = (id: number): string => {
    const v = findByUniqueId(mainData, id);
    if (v && v !== String(id)) return v;
    return WORK_GROUP_FALLBACK_TEXTS[id]?.[lang] ?? "";
  };

  const sectionTitle =
    (WORK_GROUPS_SECTION_TITLE.id && t(WORK_GROUPS_SECTION_TITLE.id)) ||
    WORK_GROUPS_SECTION_TITLE[lang];

  const labels = {
    public: t(WG_IDS.public),
    openSource: t(WG_IDS.openSource),
    publicGroup: t(WG_IDS.publicGroupLabel),
    join: t(WG_IDS.joinGroup),
    repositories: t(WG_IDS.repositories),
    docs: t(WG_IDS.relatedDocs),
    docsShort: t(WG_IDS.docsUnit),
    activeMedia: t(WG_IDS.activeMedia),
    figmaVersions: LOCAL_TEXTS.figmaVersions[lang],
    repoUnit: t(WG_IDS.repositoryUnit),
    mediaUnit: t(WG_IDS.mediaUnit),
    groupUnit: t(WG_IDS.groupUnit),
  };

  return (
    <section
      aria-labelledby="work-groups-title"
      dir={dir}
      className="rounded-[28px] md:rounded-[40px]  "
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="work-groups-title"
          className="font-azarMehr font-bold text-[18px] md:text-[24px] lg:text-[32px] text-white"
        >
          {sectionTitle}
        </h2>

        <Link
          href="https://github.com/iranpsc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-white focus-visible:outline focus-visible:outline-white"
        >
          <span className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px]">
            {LOCAL_TEXTS.viewAll[lang]}
          </span>
          <ArrowRight
            className={`w-6 h-full stroke-white rtl:rotate-180 `}
          />
        </Link>
      </div>

      <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {WORK_GROUPS.map((g, i) => (
          <WorkGroupCard
            key={g.key}
            dir={dir}
            priority={i < 4}
            image={g.image}
            groupName={t(g.titleId)}
            title={t(g.subtitleEnId)}
            description={lang === "fa" ? t(g.subtitleFaId) : undefined}
            labels={labels}
            groupUrl={g.groupUrl}
            docsUrl={
              typeof g.docsUrl === "function" ? g.docsUrl(lang) : g.docsUrl
            }
            repos={g.repos?.map((r) => ({ name: t(r.nameId), url: r.url }))}
            org={
              g.org
                ? {
                    label: t(g.org.labelId),
                    name: t(lang === "fa" ? g.org.nameFaId : g.org.nameEnId),
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
        ))}
      </div>
    </section>
  );
}
