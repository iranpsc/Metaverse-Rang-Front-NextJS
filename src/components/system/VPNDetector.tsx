"use client";

import { useEffect, useRef, useState } from "react";

const VPNDetector = () => {
  const [showModal, setShowModal] = useState(false);
  const hasShown = useRef(false);
  const ipNonIran = useRef(false);

  // بررسی IP بعد از تعامل کاربر
  const handleInteraction = async () => {
    if (hasShown.current) return;

    // فقط یک بار تعامل را در نظر بگیریم
    removeInteractionListeners();

    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();

      console.log("IP Data:", data); // بررسی پاسخ API

      if (data && data.country !== "IR") {
        ipNonIran.current = true;

        // مودال را بعد از تاخیر 5 ثانیه نمایش بده
        setTimeout(() => {
          if (!hasShown.current) {
            setShowModal(true);
            hasShown.current = true;
            sessionStorage.setItem("vpnModalShown", "true");
          }
        }, 5000);
      }
    } catch (err) {
      console.error("IP check failed:", err);
    }
  };

  // اضافه کردن لیسنر تعامل کاربر
  const addInteractionListeners = () => {
    window.addEventListener("scroll", handleInteraction, { once: true });
    window.addEventListener("mousemove", handleInteraction, { once: true });
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
  };

  const removeInteractionListeners = () => {
    window.removeEventListener("scroll", handleInteraction);
    window.removeEventListener("mousemove", handleInteraction);
    window.removeEventListener("click", handleInteraction);
    window.removeEventListener("keydown", handleInteraction);
  };

  useEffect(() => {
    // اگر مودال قبلاً نمایش داده شده بود، نیازی به لیسنر نیست
    if (sessionStorage.getItem("vpnModalShown") !== "true") {
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
        <h2 className="text-xl font-bold text-light-primary dark:text-dark-yellow mb-3">
          VPN شما روشن است!
        </h2>
        <p className="text-black dark:text-white leading-7">
          برای تجربه بهتر VPN خود را خاموش کنید
        </p>
        <button
          aria-label="Close VPN Modal"
          onClick={() => setShowModal(false)}
          className="mt-6 px-6 py-2 rounded-xl bg-light-primary text-white dark:bg-dark-yellow dark:text-black font-semibold"
        >
          متوجه شدم
        </button>
      </div>
    </div>
  );
};

export default VPNDetector;
