"use client";

import Link from "next/link";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import Image from "next/image";
import ClipSection from "../ClipContainer";
import { useEffect, useState } from "react";
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
      const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 1023px)");

        const update = () => setIsMobile(media.matches);

        update();

        media.addEventListener("change", update);

        return () => media.removeEventListener("change", update);
    }, []);
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

    <ClipSection
      radius={isMobile ? 12 : 32}
      cornerRadius={16}
      corner={params.lang == "fa" ? "tl" : "tr"}
      cornerSize={isMobile ? 80 : 120}
      
      className="text-white dark:text-[#1A1A18]">
      <footer className="  rounded-xl lg:rounded-[32px]  mt-10">
        <div className="overflow-hidden ">
          <div className="p-5 xl:p-5 2xl:p-9 3xl:p-14 3xl:px-[76px] 3xl:px  mt-5">
            <div className="grid gap-10 gap-y-12 md:grid-cols-[80px_repeat(4,1fr)] 2xl:grid-cols-[350px_repeat(4,1fr)]">

              {/* Logo */}
              <div className="flex items-start justify-start  lg:px-0 lg:flex-col gap-5 ">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] inline "
                />
                <div className="flex items-center justify-center ">
                  <div className="w-[50px] h-[50px]"
                    dangerouslySetInnerHTML={{
                      __html: `<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=721065&Code=fLkLFNhooBCR33C1ntVXIBxJFAj9gf3q'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=721065&Code=fLkLFNhooBCR33C1ntVXIBxJFAj9gf3q' alt='' style='cursor:pointer' code='fLkLFNhooBCR33C1ntVXIBxJFAj9gf3q'></a>`,
                    }}
                  />
                </div>
              </div>

              {/* Links */}
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <p className="mb-5  lg:mt-3  text-xl 3xl:text-2xl font-medium text-[#1B1B1B] dark:text-[#FFFFFF]">
                    {section.title}
                  </p>

                  <ul className=" list-none space-y-[9px]">
                    {section.links.map((item) => {
                      const isExternal =
                        item.targetBlank || item.href.startsWith("http");

                      const baseClass =
                        "peer flex items-center  dark:text-[#9A9A9A] hover:text-[#8A2BE2] gap-2 font-bold xl:text-base transition";

                      const isDisabled = item.disabled;

                      const linkClass = isDisabled
                        ? "text-[#aaa] pointer-events-none opacity-50"
                        : "text-[#222] ";

                      return (
                        <li key={item.href}>
                          {isDisabled ? (
                            <span className={`${baseClass} ${linkClass}`}>
                              {item.label}
                              <span className="text-[#ccc]  !text-3xl ms-1 rtl:rotate-180"> <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M5 12H19"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M13 6L19 12L13 18"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg></span>
                            </span>
                          ) : (
                            <Link
                              href={item.href}
                              aria-label="fotter links"
                              className={`${baseClass} ${linkClass} hover:!text-[#8A2BE2]`}
                              {...(isExternal
                                ? {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                }
                                : {})}
                            >
                              {item.label}

                              {/* arrow فقط برای فعال‌ها */}
                              <span className="text-[#8A2BE2] flex items-center rtl:rotate-180 ms-1 !text-3xl transition-transform peer-hover:translate-x-1  rtl:peer-hover:translate-x-[-4px]">
                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M5 12H19"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M13 6L19 12L13 18"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
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
    </ClipSection>
  );
}