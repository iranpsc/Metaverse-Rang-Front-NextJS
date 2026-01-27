"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type ClientError = {
  name?: string;
  message?: string;
  stack?: string | null;
};

type Props = {
  error?: ClientError;
};

const AUTO_RETRY_SECONDS = 11;

export default function CustomErrorPage({ error }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // ✅ فقط از URL می‌فهمیم قبلاً auto retry شده یا نه
  const alreadyAutoRetried = searchParams.get("autoRetry") === "1";

  const [countdown, setCountdown] = useState(AUTO_RETRY_SECONDS);

  useEffect(() => {
    if (alreadyAutoRetried) return;

    // ⏱️ شمارش معکوس
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 🔄 auto refresh بعد ۵ ثانیه
    const timeout = setTimeout(() => {
      router.replace(`${pathname}?autoRetry=1`);
      router.refresh();
    }, AUTO_RETRY_SECONDS * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [alreadyAutoRetried, pathname, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50 dark:bg-black">
      <h1 className="text-2xl font-bold text-red-600">
        خطایی رخ داده است
      </h1>

      <p className="mt-4 text-gray-600 dark:text-white">
        {!alreadyAutoRetried
          ? "در حال تلاش مجدد خودکار..."
          : "رفرش خودکار انجام نشد"}
      </p>

      {/* دکمه با تایمر */}
      <button
        onClick={() => router.refresh()}
        className="mt-6 px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
      >
        {!alreadyAutoRetried && countdown > 0
          ? `تلاش مجدد (${countdown})`
          : "تلاش مجدد"}
      </button>

      {/* جزئیات خطا (فقط dev) */}
      {process.env.NODE_ENV === "development" && error && (
        <div className="mt-8 w-full max-w-3xl text-left bg-black text-red-400 p-4 rounded-lg overflow-auto text-sm">
          <p className="font-bold mb-2">
            {error.name || "Error"}
          </p>

          <p className="font-bold mt-2">Message:</p>
          <pre className="whitespace-pre-wrap">
            {error.message || "No message"}
          </pre>

          {error.stack && (
            <>
              <p className="font-bold mt-4">Stack Trace:</p>
              <pre className="whitespace-pre-wrap">
                {error.stack}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}
