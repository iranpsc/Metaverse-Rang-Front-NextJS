"use client";

import { useEffect, useRef, useState } from "react";

const VPNDetector = () => {
  const [showModal, setShowModal] = useState(false);

  const hasChecked = useRef(false);
  const siteLoaded = useRef(false);
  const userInteracted = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // فقط یک‌بار در هر session
    if (sessionStorage.getItem("vpnModalShown") === "true") return;

    const tryCheck = async () => {
      if (!siteLoaded.current || !userInteracted.current) return;
      if (hasChecked.current) return;

      hasChecked.current = true;

      try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();

        if (!data.success) return;

        if (data.country_code !== "IR") {
          setShowModal(true);
          sessionStorage.setItem("vpnModalShown", "true");
        }
      } catch (err) {
        console.error("IP check failed:", err);
      }

      cleanup();
    };

    // سایت کامل لود شده بعد از ۵ ثانیه
    timerRef.current = setTimeout(() => {
      siteLoaded.current = true;
      tryCheck();
    }, 5000);

    // تعامل کاربر
    const onUserInteract = () => {
      userInteracted.current = true;
      tryCheck();
    };

    const events = ["scroll", "click", "mousemove", "touchstart", "keydown"];

    events.forEach((event) =>
      window.addEventListener(event, onUserInteract, { passive: true })
    );

    const cleanup = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, onUserInteract)
      );
    };

    return cleanup;
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div
        className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 max-w-md w-[90%] text-center shadow-xl"
        dir="rtl"
      >
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
