// app/[lang]/about/layout.tsx

import { getTranslation } from "@/components/utils/actions";
import CustomErrorPage from "@/components/error/CustomErrorPage";
// حیاتی 👇
export const dynamic = "force-dynamic";
export const revalidate = 0;
 interface AboutLayoutProps {
  params: Promise<{ lang: string }>;
   children:React.ReactNode;
}
export default async function AboutLayout({
  
  children,
  params,
}: AboutLayoutProps) {
    try {
  
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  let langData;

  try {
    langData = await getTranslation(lang);
  } catch (error) {
    console.error("خطا در دریافت ترجمه زبان:", lang, error);
    langData = { direction: "rtl", lang: "fa" };
  }

  const direction = langData?.direction === "ltr" ? "ltr" : "rtl";

  return (
    <main
      className="flex dark:bg-black bg-grayLight"
      dir={direction}
      lang={lang}
    >
      <div className="relative w-full lg:mt-0">
        {children}
      </div>
    </main>
  );
}
catch (error) {
  const serializedError = {
    message:
      error instanceof Error ? error.message : "Unknown error",
    stack:
      error instanceof Error ? error.stack : null,
    name:
      error instanceof Error ? error.name : "Error",
  };

  console.error("❌ Error in EductionPage:", serializedError);

  return <CustomErrorPage error={serializedError} />;
}
}
