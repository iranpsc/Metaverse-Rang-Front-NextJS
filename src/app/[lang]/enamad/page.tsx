
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface EnamadPageProps {
  params: Promise<{
    lang: string;
  }>;
}



export async function generateMetadata({
  params,
}: EnamadPageProps): Promise<Metadata> {
  const { lang } = await params;

  const isFa = lang === "fa";

  return {
    title: isFa
      ? "نماد اعتماد الکترونیکی | متارنگ"
      : "Electronic Trust Symbol | Metarang",

    description: isFa
      ? "مشاهده و بررسی نماد اعتماد الکترونیکی متاورس رنگ و اطلاعات اعتبار آن."
      : "View and verify the Electronic Trust Symbol of Metaverse Rang.",

    alternates: {
      canonical: `https://metarang.com/${lang}/enamad`,
      languages: {
        fa: "https://metarang.com/fa/enamad",
        en: "https://metarang.com/en/enamad",
      },
    },

    openGraph: {
      title: isFa
        ? "نماد اعتماد الکترونیکی | متاورس رنگ"
        : "Electronic Trust Symbol | Metaverse Rang",

      description: isFa
        ? "مشاهده و بررسی نماد اعتماد الکترونیکی متاورس رنگ."
        : "View and verify the Electronic Trust Symbol of Metaverse Rang.",

      url: `https://metarang.com/${lang}/enamad`,
      type: "website",
    },
  };
}

export default async function EnamadPage({
  params,
}: EnamadPageProps) {
  const { lang } = await params;

  const isFa = lang === "fa";

  return (
    <main
      dir={isFa ? "rtl" : "ltr"}
      className="min-h-screen px-5 py-10 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-matn-1 lg:text-4xl">
            {isFa
              ? "نماد اعتماد الکترونیکی"
              : "Electronic Trust Symbol"}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-matn-2 lg:text-base">
            {isFa
              ? "برای مشاهده و بررسی اطلاعات و اعتبار نماد اعتماد الکترونیکی متاورس رنگ، روی نماد زیر کلیک کنید."
              : "Click the symbol below to view and verify the Electronic Trust Symbol of Metaverse Rang."}
          </p>
        </div>

        {/* Main Card */}
        <section className="mx-auto max-w-2xl rounded-3xl  bg-gray-2 p-6 shadow-sm  lg:p-10">

          <div className="flex flex-col items-center">

            {/* Enamad Logo */}
            <div className="flex items-center justify-center ">
              <div
                dangerouslySetInnerHTML={{
                  __html: `<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=721065&Code=fLkLFNhooBCR33C1ntVXIBxJFAj9gf3q'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=721065&Code=fLkLFNhooBCR33C1ntVXIBxJFAj9gf3q' alt='' style='cursor:pointer' code='fLkLFNhooBCR33C1ntVXIBxJFAj9gf3q'></a>`,
                }}
              />
            </div>


            {/* Description */}
            <div className="mt-6 text-center">
              <h2 className="text-lg font-bold text-matn-1">
                {isFa
                  ? "اعتبار نماد را بررسی کنید"
                  : "Verify the certificate"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-matn-2">
                {isFa
                  ? "با کلیک روی تصویر نماد، صفحه رسمی اعتبارسنجی اینماد در دامنه trustseal.enamad.ir برای شما باز می‌شود."
                  : "Click the symbol to open the official eNamad verification page on trustseal.enamad.ir."}
              </p>
            </div>


          </div>
        </section>

        {/* Back */}
        <div className="mt-8 text-center">
          <Link
            href={`/${lang}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {isFa ? "بازگشت به صفحه اصلی" : "Back to homepage"}
          </Link>
        </div>
      </div>
    </main>
  );
}

