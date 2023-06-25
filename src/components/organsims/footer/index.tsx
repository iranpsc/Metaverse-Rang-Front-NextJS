import React from "react";
import Link from "next/link";
import Options from "@/components/molecules/footer/options";

export default function Footer() {
  return (
    <>
      <div className="bg-white pb-10">
        <Options />
      </div>
      <footer className="bottom-0 bg-gray px-4 sm:px-6 md:px-20 lg:px-48 py-8">
        <div className="grid lg:grid-cols-6 pb-4">
          <div className="lg:col-span-4">
            <h3 className="text-3xl">متاورس رنگ</h3>
            <p className="lg:whitespace-nowrap pr-4 pt-4">
              متارنگ بنیان دنیای موازی ساخته شده توسط بشر با هدف یکپارچه سازی
              خدمات و زنجیره ای برای رفع نیاز جوامع میباشد
            </p>
          </div>
          <div className="md:col-span-1">
            <Link href="/contact">
              <h2 className="text-md">تماس با ما</h2>
            </Link>
            <div className="flex pb-4 pt-4 pr-4">
              <Link href="mailto:hq@irpsc.com">hq@irpsc.com</Link>
            </div>
            <div className="flex pb-4 pr-4">
              <Link href="tel:02833698111">02833698111</Link>
            </div>
          </div>
          <div className="md:col-span-1">
            <h2 className="text-md">ما را دنبال کنید</h2>
          </div>
        </div>
        <div className="flex justify-center ">
          <p>
            حقوق ساختار این بستر ثبت شده است ، در صورت کپی مطالب میبایست منبع را
            ذکر کنید تحت حمایت قوه قضاییه ، وزارت تعاون
          </p>
        </div>
      </footer>
    </>
  );
}
