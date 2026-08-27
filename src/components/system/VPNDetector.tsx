"use client";

import { useEffect, useRef, useState } from "react";

const IP_CACHE_KEY = "vpnIpCountry";
const MODAL_SHOWN_KEY = "vpnModalShown";

const VPNDetector = () => {
  const [showModal, setShowModal] = useState(false);
  const hasShown = useRef(false);
  const checking = useRef(false);

  const handleInteraction = async () => {
    if (hasShown.current || checking.current) return;
    if (sessionStorage.getItem(MODAL_SHOWN_KEY) === "true") return;

    removeInteractionListeners();
    checking.current = true;

    try {
      let country = sessionStorage.getItem(IP_CACHE_KEY);

      if (!country) {
        // Idle delay so the check never contends with first interaction paint.
        await new Promise((r) => setTimeout(r, 1500));
        const res = await fetch("https://ipapi.co/json/", {
          // Avoid CORS preflight cost; simple GET.
          cache: "force-cache",
        });
        const data = await res.json();
        country = data?.country || "";
        if (country) {
          sessionStorage.setItem(IP_CACHE_KEY, country);
        }
      }

      if (country && country !== "IR") {
        setTimeout(() => {
          if (!hasShown.current) {
            setShowModal(true);
            hasShown.current = true;
            sessionStorage.setItem(MODAL_SHOWN_KEY, "true");
          }
        }, 5000);
      }
    } catch {
      // Silent — VPN hint is non-critical.
    } finally {
      checking.current = false;
    }
  };

  const addInteractionListeners = () => {
    window.addEventListener("scroll", handleInteraction, { once: true, passive: true });
    window.addEventListener("pointerdown", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
  };

  const removeInteractionListeners = () => {
    window.removeEventListener("scroll", handleInteraction);
    window.removeEventListener("pointerdown", handleInteraction);
    window.removeEventListener("keydown", handleInteraction);
  };

  useEffect(() => {
    if (sessionStorage.getItem(MODAL_SHOWN_KEY) !== "true") {
      addInteractionListeners();
    }

    return () => {
      removeInteractionListeners();
    };
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 max-w-md w-[90%] text-center shadow-xl" dir="rtl">
        <h2 className="text-xl font-bold text-primary  mb-3">
          VPN شما روشن است!
        </h2>
        <p className="text-black dark:text-white leading-7">
          برای تجربه بهتر VPN خود را خاموش کنید
        </p>
        <button
          aria-label="Close VPN Modal"
          onClick={() => setShowModal(false)}
          className="mt-6 px-6 py-2 rounded-xl bg-primary text-white  dark:text-black font-semibold"
        >
          متوجه شدم
        </button>
      </div>
    </div>
  );
};

export default VPNDetector;
