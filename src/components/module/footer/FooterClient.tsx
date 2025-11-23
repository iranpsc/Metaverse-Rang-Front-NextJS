"use client";

import React from "react";
import Footer from "./Footer"; // کامپوننت اصلی Footer
import { usePathname } from "next/navigation";

interface FooterClientProps {
  footerTabs: any;
  mainData: any;
  params: any;
}

const FooterClient: React.FC<FooterClientProps> = ({ footerTabs, mainData, params }) => {
  const pathname = usePathname(); // مسیر فعلی

  // مسیرهایی که Footer نباید نمایش داده شود
  const hiddenPaths = [
    /^\/[^\/]+\/citizens\/hm-[A-Za-z0-9_-]+(\/.*)?$/,   // /fa/citizens/hm-xxxx
    /^\/[^\/]+\/levels\/.*/              // /fa/levels/citizen
  ];

  const isHidden = hiddenPaths.some((regex) => regex.test(pathname));

  if (isHidden) return null;

  return <Footer footerTabs={footerTabs} mainData={mainData} params={params} />;
};

export default FooterClient;
