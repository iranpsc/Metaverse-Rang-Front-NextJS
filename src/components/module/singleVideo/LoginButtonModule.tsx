"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default function LoginButtonModule({ params }: { params: any }) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // اطمینان از مونت شدن کامپوننت در سمت کلاینت
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async () => {
    try {
      let temp = pathname.split("/");
      let last = temp[temp.length - 1];
      let referral;
      if (last.startsWith("hm-") || last.startsWith("HM-")) {
        referral = last;
      }

      const urlToUse = `${window.location.origin}${pathname.toString()}`;
      const res = await axios.get(
        `https://api.rgb.irpsc.com/api/auth/redirect?redirect_to=${urlToUse}&referral=${referral}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res && res.data.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error("Failed to fetch redirectUrl, client!");
      }
    } catch (error) {
      console.error("خطا در هدایت به صفحه ورود:", error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <button
      className="w-1/2 bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[10px] flex justify-center items-center text-white dark:text-dark-background font-azarMehr font-medium text-center text-[15px] py-2 px-2 md:px-4"
      onClick={handleLogin}
    >
      {findByUniqueId(params, 4)} {/* استفاده از params به جای mainData */}
    </button>
  );
}