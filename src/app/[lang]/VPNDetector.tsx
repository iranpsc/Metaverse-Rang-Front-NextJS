"use client";

import { useEffect, useRef, useState } from "react";

const VPNDetector = () => {
  const [showModal, setShowModal] = useState(false);
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    const checkIP = async () => {
      try {
        if (sessionStorage.getItem("vpnModalShown")) return;

        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (data.country !== "IR") {
          setShowModal(true);
          sessionStorage.setItem("vpnModalShown", "true");
        }
      } catch (error) {
        console.error("IP check failed:", error);
      }
    };

    checkIP();
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div
        className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 max-w-md w-[90%] text-center shadow-xl"
        dir="rtl"
      >
        <h2 className="text-xl font-bold text-light-primary dark:text-dark-yellow mb-3">
          VPN شما روشن است !
        </h2>
        <p className="text-black dark:text-white leading-7">
          برای تجربه بهتر VPN خود را خاموش کنید
        </p>
        <button aria-label="Close VPN Modal"
          onClick={() => setShowModal(false)}
          className="mt-6 px-6 py-2 rounded-xl bg-light-primary text-white dark:bg-dark-yellow dark:text-black transition font-semibold"
        >
          متوجه شدم
        </button>
      </div>
    </div>
  );
};

export default VPNDetector;
