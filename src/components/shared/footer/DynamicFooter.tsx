"use client";

import Footer from "./Footer";
import {
  buildFooterBrand,
  buildFooterSections,
} from "@/components/utils/buildShellTranslations";

/**
 * Adapter for pages that still have the full translation dictionary.
 * Resolves footer strings on the client before rendering Footer, so callers
 * keep passing `mainData` without shipping a second full dictionary copy
 * through Footer itself... actually we still receive mainData here.
 * Prefer FooterClient + buildFooterSections in layouts when possible.
 */
export default function DynamicFooter({
  mainData,
  params,
}: {
  mainData: any;
  params: { lang: string };
}) {
  return (
    <Footer
      params={params}
      footerSections={buildFooterSections(mainData, params.lang)}
      brandLabel={buildFooterBrand(mainData)}
    />
  );
}
