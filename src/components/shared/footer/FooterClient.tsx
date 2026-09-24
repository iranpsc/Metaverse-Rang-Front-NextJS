"use client";

import React from "react";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import type { FooterSection } from "@/components/utils/buildShellTranslations";

interface FooterClientProps {
  footerSections: FooterSection[];
  brandLabel: string;
  params: any;
}

const FooterClient: React.FC<FooterClientProps> = ({
  footerSections,
  brandLabel,
  params,
}) => {
  const pathname = usePathname();

  const hiddenPaths = [
    /^\/[^/]+\/citizens\/hm-[A-Za-z0-9_-]+(?:\/.*)?$/,
    /^\/[^/]+\/levels(?:\/.*)?$/,
  ];

  const isHidden = hiddenPaths.some((regex) => regex.test(pathname));

  if (isHidden) return null;
  return (
    <Footer
      footerSections={footerSections}
      brandLabel={brandLabel}
      params={params}
    />
  );
};

export default FooterClient;
