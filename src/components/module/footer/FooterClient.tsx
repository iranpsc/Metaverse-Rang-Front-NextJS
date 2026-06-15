"use client";

import React from "react";
import Footer from "./Footer"; // کامپوننت اصلی Footer
import { usePathname } from "next/navigation";

interface FooterClientProps {
  mainData: any;
  params: any;
}

const FooterClient: React.FC<FooterClientProps> = ({ mainData, params }) => {
  const pathname = usePathname(); // مسیر فعل

  // مسیرهایی که Footer نباید نمایش داده شود
const hiddenPaths = [
  /^\/[^/]+\/citizens\/hm-[A-Za-z0-9_-]+(?:\/.*)?$/,
  /^\/[^/]+\/levels(?:\/.*)?$/,
];
console.log(pathname);
  const isHidden = hiddenPaths.some((regex) => regex.test(pathname));

  if (isHidden) return null;
  return <Footer mainData={mainData} params={params} />;
};

export default FooterClient;