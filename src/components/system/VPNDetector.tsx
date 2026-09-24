
"use client";

import { useEffect, useRef, useState } from "react";

const MODAL_SHOWN_KEY = "vpnModalShown";

const VPNDetector = () => {
  const [showModal, setShowModal] = useState(false);

  const hasShown = useRef(false);
  const checking = useRef(false);

  const handleInteraction = async () => {
    // console.log("🟡 VPN CHECK STARTED");

    if (hasShown.current) {
      // console.log("⛔ Already shown");
      return;
    }

    if (checking.current) {
      // console.log("⛔ Already checking");
      return;
    }

    checking.current = true;

    try {
      // console.log("🌐 Calling IP API...");

      const response = await fetch(
        "https://ipapi.co/json/?t=" + Date.now(),
        {
          method: "GET",
          cache: "no-store",
        }
      );

      // console.log("📡 IP API status:", response.status);

      if (!response.ok) {
        throw new Error(`IP API failed: ${response.status}`);
      }

      const data = await response.json();

      // console.log("🌍 FULL IP DATA:", data);

      const country = String(
        data?.country_code || data?.country || ""
      )
        .trim()
        .toUpperCase();

      // console.log("🌍 DETECTED COUNTRY:", country);

      // ایران → اصلاً چیزی نمایش نده
      if (country === "IR") {
        // console.log("🇮🇷 IRAN DETECTED → NO MODAL");
        return;
      }

      // اگر کشور خالی بود
      if (!country) {
        // console.log("⚠️ COUNTRY EMPTY → NO MODAL");
        return;
      }

      // خارج ایران → نمایش مودال
      // console.log("🚨 NON-IRAN IP → MODAL WILL SHOW");

      setTimeout(() => {
        // console.log("🔴 SHOWING VPN MODAL");

        if (!hasShown.current) {
          hasShown.current = true;
          setShowModal(true);

          sessionStorage.setItem(MODAL_SHOWN_KEY, "true");
        }
      }, 2000);
    } catch (error) {
      // console.error("❌ VPN DETECTOR ERROR:", error);
    } finally {
      checking.current = false;
    }
  };

  useEffect(() => {
    // console.log("🚀 VPNDetector mounted");

    window.addEventListener("pointerdown", handleInteraction, {
      once: true,
    });

    window.addEventListener("scroll", handleInteraction, {
      once: true,
      passive: true,
    });

    window.addEventListener("keydown", handleInteraction, {
      once: true,
    });

    return () => {
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div
        className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 max-w-md w-[90%] text-center shadow-xl"
        dir="rtl"
      >
        <h2 className="text-xl font-bold text-primary mb-3">
          VPN شما روشن است!
        </h2>

        <p className="text-black dark:text-white leading-7">
          برای تجربه بهتر VPN خود را خاموش کنید
        </p>

        <button
          aria-label="Close VPN Modal"
          onClick={() => {
            setShowModal(false);
          }}
          className="mt-6 px-6 py-2 rounded-xl bg-primary text-white dark:text-black font-semibold"
        >
          متوجه شدم
        </button>
      </div>
    </div>
  );
};

export default VPNDetector;

