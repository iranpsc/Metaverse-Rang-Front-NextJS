'use client';

import { useEffect, useState } from "react";

export default function PageRevealLoader({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 700);
    const t2 = setTimeout(() => setStep(2), 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div data-step={step}>
        {children}
      </div>
    </div>
  );
}