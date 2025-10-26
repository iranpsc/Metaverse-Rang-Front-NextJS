"use client";
import { useEffect } from "react";
import axios from "axios";

export default function ReferralHandler() {
  useEffect(() => {
    try {
      const pathname = window.location.pathname;

      // پشتیبانی از /citizens/hm-XXXX و /citizens/hm-XXXX/referral
      const referralMatch = pathname.match(/^\/(fa\/)?citizens\/(hm-\d+)(\/referral)?\/?$/i);
      const referralCode = referralMatch ? referralMatch[2] : null;

      // مسیر قبلی از sessionStorage (در ناوبری داخلی ذخیره می‌شود)
      const prevPath = sessionStorage.getItem("prevPath");
      const hasVisited = sessionStorage.getItem("hasVisited") === "true";
      const handledKey = referralCode ? `referral_handled_${referralCode}` : null;
      const alreadyHandled = handledKey && sessionStorage.getItem(handledKey) === "true";

      // مستقیم یعنی هیچ prevPath از همین دامنه نداشته باشیم و هنوز بازدید اول است
      const isDirect = !prevPath && !hasVisited;

      // console.log("🧭 Debug:", {
      //   pathname,
      //   prevPath,
      //   referralCode,
      //   hasVisited,
      //   alreadyHandled,
      //   isDirect,
      // });

      if (!referralCode) {
        sessionStorage.setItem("prevPath", pathname);
        sessionStorage.setItem("hasVisited", "true");
        return;
      }

      if (alreadyHandled) {
        // console.log("⏭ قبلاً هندل شده برای:", referralCode);
        sessionStorage.setItem("prevPath", pathname);
        sessionStorage.setItem("hasVisited", "true");
        return;
      }

      if (isDirect) {
        // console.log("🎯 ورود مستقیم با رفرال:", referralCode);
        sessionStorage.setItem("hasVisited", "true");
        sessionStorage.setItem("prevPath", pathname);
        if (handledKey) sessionStorage.setItem(handledKey, "true");
        localStorage.setItem("referral", referralCode);
        localStorage.setItem("isDirectReferral", "true");

        axios
          .post("https://api.rgb.irpsc.com/api/auth/register", {
            referral: referralCode,
            back_url: window.location.href,
          })
          .then((res) => console.log("✅ ثبت موفق:", res.data))
          .catch((err) => console.error("❌ خطا در ثبت:", err));
      } else {
        // console.log("🚫 ورود داخلی یا با رفرش — ثبت انجام نشد");
        localStorage.removeItem("isDirectReferral");
      }

      // در پایان مسیر فعلی را به عنوان مسیر قبلی ذخیره می‌کنیم
      sessionStorage.setItem("prevPath", pathname);
      sessionStorage.setItem("hasVisited", "true");
    } catch (err) {
      console.error("❌ ReferralHandler error:", err);
    }
  }, []);

  return null;
}
