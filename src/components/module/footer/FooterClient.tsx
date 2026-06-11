"use client";

import Link from "next/link";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import Image from "next/image";
interface FooterProps {
  params: { lang: string };
  mainData: any;
}

interface FooterLink {
  label: string;
  href: string;
  targetBlank?: boolean;
  disabled?: boolean;
}

export default function Footer2({ params, mainData }: FooterProps) {
  const isRTL = params.lang === "fa";
  const footerLinks: { title: string; links: FooterLink[] }[] = [
    {
      title: findByUniqueId(mainData, 1737),
      links: [
        { label: findByUniqueId(mainData, 303), href: `/${params.lang}/` },
        { label: findByUniqueId(mainData, 259), href: `/${params.lang}/about/` },
        {
          label: findByUniqueId(mainData, 1738),
          href: "https://github.com/iranpsc",
          targetBlank: true,
        },
        { label: findByUniqueId(mainData, 1739), href: `/${params.lang}/citizens` },
        {
          label: findByUniqueId(mainData, 1740),
          href: `/${params.lang}/version`
        },
      ],
    },
    {
      title: findByUniqueId(mainData, 1741),
      links: [
        { label: findByUniqueId(mainData, 1742), href: "/build", disabled: true, },
        { label: findByUniqueId(mainData, 1743), href: `/${params.lang}/whitepaper` },
        {
          label: findByUniqueId(mainData, 1744),
          href: "/sdk",
          disabled: true,
        },
        { label: findByUniqueId(mainData, 1490), href: `/${params.lang}/rand-id/hm` },
      ],
    },
    {
      title: findByUniqueId(mainData, 1745),
      links: [
        { label: findByUniqueId(mainData, 1746), href: `/${params.lang}/articles` },
        { label: findByUniqueId(mainData, 1462), href: `/${params.lang}/education` },
        {
          label: findByUniqueId(mainData, 1747),
          href: "http://faqhub.ir/",
          targetBlank: true,
        },
        { label: findByUniqueId(mainData, 1748), href: `/${params.lang}/calendar` },
      ],
    },
    {
      title: findByUniqueId(mainData, 1749),
      links: [
        { label: findByUniqueId(mainData, 279), href: "https://www.instagram.com/metaverse_rang" },
        { label: findByUniqueId(mainData, 280), href: "https://www.linkedin.com/company/metaverse-rang/" },
        { label: findByUniqueId(mainData, 281), href: "https://youtube.com/@metargb?si=gdM0aFPk5SCsC7z4" },
        { label: findByUniqueId(mainData, 1753), href: "https://substack.com/@metarang" },
        { label: findByUniqueId(mainData, 1754), href: "https://medium.com/@metarang.iran" },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-[#1A1A18]  rounded-[40px] rounded-se-[120px] 2xl:rounded-se-[260px] mt-10">
      <div className="overflow-hidden ">
        <div className="p-5 xl:p-5 2xl:p-9 3xl:p-14 3xl:px-[76px] 3xl:px  mt-5">
          <div className="grid gap-10 gap-y-12 md:grid-cols-[80px_repeat(4,1fr)]">

            {/* Logo */}
            <div className="flex items-start ">
              <Image
                src="/logo.png"
                alt="logo"
                width={71}
                height={70}
                className="w-[60px] h-[60px] inline "
              />
            </div>

            {/* Links */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <p className="mb-5 2xl:mb-12 lg:mt-3  text-3xl 3xl:text-4xl font-medium text-[#1B1B1B] dark:text-[#FFFFFF]">
                  {section.title}
                </p>

                <ul className="space-y-2 2xl:space-y-5 list-none">
                  {section.links.map((item) => {
                    const isExternal =
                      item.targetBlank || item.href.startsWith("http");

                    const baseClass =
                      "peer flex items-center dark:text-[#9A9A9A] gap-2 3xl:text-3xl transition";

                    const isDisabled = item.disabled;

                    const linkClass = isDisabled
                      ? "text-[#aaa] pointer-events-none opacity-50"
                      : "text-[#222]";

                    return (
                      <li key={item.href}>
                        {isDisabled ? (
                          <span className={`${baseClass} ${linkClass}`}>
                            {item.label}
                            <span className="text-[#ccc] !text-4xl ms-1">›</span>
                          </span>
                        ) : (
                          <Link
                            href={item.href}
                            className={`${baseClass} ${linkClass}`}
                            {...(isExternal
                              ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                              : {})}
                          >
                            {item.label}

                            {/* arrow فقط برای فعال‌ها */}
                            <span className="text-[#8A2BE2] ms-1 !text-4xl transition-transform peer-hover:translate-x-1  rtl:peer-hover:translate-x-[-4px]">
                              ›
                            </span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* MARQUEE */}
        <div className="relative mt-10 mb-7 h-[450px]  flex items-center overflow-hidden ">
          <div className={`marquee ${isRTL ? "rtl" : "ltr"}`}>
            <div className="track">
              <div className="group">
                <span className="text-neutral-900 dark:text-white">{findByUniqueId(mainData, 148)}</span>
              </div>
              <div className="group">
                <span className="text-neutral-900 dark:text-white">{findByUniqueId(mainData, 148)}</span>
              </div>
              <div className="group">
                <span className="text-neutral-900 dark:text-white">{findByUniqueId(mainData, 148)}</span>
              </div>
              <div className="group">
                <span className="text-neutral-900 dark:text-white">{findByUniqueId(mainData, 148)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
.marquee {
  overflow: hidden;
  width: 100%;
}

/* base track */
.track {
  display: flex;
  width: max-content;
}

/* LTR animation (default) */
.ltr .track {
  animation: scroll-ltr 18s linear infinite;
}

/* RTL animation */
.rtl .track {
  animation: scroll-rtl 10s linear infinite;
}

.group {
  display: flex;
  flex-shrink: 0;
}

.group span {
  font-size: 400px;
  font-weight: 700;
  white-space: nowrap;
  padding-right: 80px;
}

/* LTR → چپ به راست */
@keyframes scroll-ltr {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* RTL → راست به چپ (برعکس) */
@keyframes scroll-rtl {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(50%);
  }
}
`}</style>
    </footer>
  );
}