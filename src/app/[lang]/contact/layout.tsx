// app/[lang]/contact/layout.tsx

import { getTranslation } from "@/components/utils/actions";
import CustomErrorPage from "@/components/shared/CustomErrorPage";

// این دو خط حیاتی هستن – بدون کش، همیشه تازه و بدون باگ
export const dynamic = "force-dynamic";
export const revalidate = 0;
 interface ContactLayoutProps {
  params: Promise<{ lang: string }>;
   children:React.ReactNode;
}
export default async function ContactLayout({
  children,
  params,
}: ContactLayoutProps) {
  try {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  let langData;

  try {
    langData = await getTranslation(lang);
  } catch (error) {
    console.error("خطا در دریافت ترجمه زبان:", lang, error);
    // اگر به هر دلیلی ترجمه نیومد، حداقل فارسی باشه
    langData = { direction: "rtl", lang: "fa" };
  }

  // اگر direction هم نبود (خیلی نادر)، دستی ست کن
  const direction = langData?.direction === "ltr" ? "ltr" : "rtl";

  return (
    <main
      className="flex "
      dir={direction}
      lang={lang}
    >
      <div className="relative w-full xs:px-1 lg:mt-0">
        {children}
      </div>
    </main>
  );
} catch (error) {
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