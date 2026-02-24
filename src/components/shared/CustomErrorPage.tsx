"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ErrorImg, ErrorImgDark } from "@/svgs/index";

type ClientError = {
  name?: string;
  message?: string;
  stack?: string | null;
  cause?: unknown;
};

type Props = {
  error?: ClientError;
};

const AUTO_RETRY_SECONDS = 20;

export default function CustomErrorPage({ error }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const alreadyAutoRetried = searchParams.get("autoRetry") === "1";

  const [countdown, setCountdown] = useState(AUTO_RETRY_SECONDS);
  const [showError, setShowError] = useState(false);

  /* ============================
     🔴 LOG EVERYTHING (DEV ONLY)
     ============================ */
  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || !error) return;

    console.group("🔥 NEXT.JS FULL ERROR DEBUG");
    console.error("Error Object:", error);
    console.error("String(error):", String(error));
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("Cause:", (error as any)?.cause);
    console.groupEnd();
  }, [error]);

  /* ============================
     ⏱️ AUTO RETRY
     ============================ */
  useEffect(() => {
    if (alreadyAutoRetried) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      router.replace(`${pathname}?autoRetry=1`);
      router.refresh();
    }, AUTO_RETRY_SECONDS * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [alreadyAutoRetried, pathname, router]);

  /* ============================
     🧠 SAFE STRINGIFY
     ============================ */
  const safeStringify = (value: unknown) => {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  };
  console.log("PageSpeedError")
  return (
    <div>
      <section className="w-full pt-7 relative mt-[60px] lg:mt-0 bg-[#f8f8f8] dark:bg-black xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
        <div className="bg-white dark:bg-[#080807] rounded-[20px] flex flex-col lg:flex-row gap-5 p-5 w-full">
          {/* ============================
              LEFT SIDE
              ============================ */}
          <div className="flex flex-col gap-6 justify-center lg:justify-start items-center lg:items-start text-center lg:text-start w-full lg:w-[60%] p-1 lg:ps-7">
            <h1 className="text-[#33353B] dark:text-white text-8xl md:text-[120px] 2xl:text-[176px] font-bold mt-5">
              خطا
            </h1>

            <h2 className="text-[#33353B] dark:text-white text-2xl md:text-3xl">
              {!alreadyAutoRetried
                ? "خطایی رخ داده است، در حال تلاش مجدد..."
                : "لطفاً لحظاتی بعد مجدد تلاش کنید"}
            </h2>

            {/* 🔄 RETRY BUTTON */}
            <button
              onClick={() => router.refresh()}
              className="mt-4 px-6 py-[10px] rounded-lg bg-light-primary dark:bg-dark-yellow dark:text-black text-base font-bold text-white transition"
            >
              {!alreadyAutoRetried && countdown > 0
                ? `تلاش مجدد (${countdown})`
                : "تلاش مجدد"}
            </button>

            {/* 🐞 TOGGLE DEBUG */}
            {process.env.NODE_ENV === "development" && error && (
              <button
                onClick={() => setShowError((prev) => !prev)}
                className="px-4 py-2 rounded-lg border bg-transparent text-red-500 text-sm transition"
              >
                {showError
                  ? "مخفی کردن جزئیات خطا"
                  : "نمایش جزئیات کامل خطا"}
              </button>
            )}

            {/* ============================
                🧨 ERROR DEBUG PANEL
                ============================ */}
            {process.env.NODE_ENV === "development" && error && showError && (
              <div className="mt-6 w-full max-w-4xl text-left bg-black text-red-400 p-4 rounded-lg overflow-auto text-sm space-y-4">
                <div>
                  <p className="font-bold text-red-300">Name</p>
                  <pre>{error.name || "Unknown"}</pre>
                </div>

                <div>
                  <p className="font-bold text-red-300">String(error)</p>
                  <pre className="whitespace-pre-wrap">
                    {String(error)}
                  </pre>
                </div>

                <div>
                  <p className="font-bold text-red-300">Message</p>
                  <pre className="whitespace-pre-wrap">
                    {error.message || "No message"}
                  </pre>
                </div>

                {error.stack && (
                  <div>
                    <p className="font-bold text-red-300">Stack Trace</p>
                    <pre className="whitespace-pre-wrap">
                      {error.stack}
                    </pre>
                  </div>
                )}

                {(error as any)?.cause && (
                  <div>
                    <p className="font-bold text-red-300">Cause</p>
                    <pre className="whitespace-pre-wrap">
                      {safeStringify((error as any).cause)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ============================
              RIGHT SIDE IMAGE
              ============================ */}
          <div className="lg:mt-[270px] w-full lg:w-[40%] p-2">
            <Image
              src={ErrorImg}
              alt="error pic"
              loading="lazy"
              className="w-full dark:hidden"
            />
            <Image
              src={ErrorImgDark}
              alt="error pic"
              loading="lazy"
              className="w-full hidden dark:block"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
