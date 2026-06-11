'use client';

import { useEffect, useState } from "react";

export function useStep() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = document.querySelector("[data-step]");
    if (!el) return;

    const interval = setInterval(() => {
      const val = el.getAttribute("data-step");
      setStep(Number(val));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return step;
}