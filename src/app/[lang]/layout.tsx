export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: any; id: any };
}) {
  const lang = params.lang;
  const selectedLangDir = lang === "en" ? "ltr" : "rtl";
  return <main dir={selectedLangDir}>{children}</main>;
}
