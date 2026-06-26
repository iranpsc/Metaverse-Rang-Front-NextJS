"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type TabLoadingContextType = {
  loading: boolean;
  setLoading: (v: boolean) => void;
};

const TabLoadingContext = createContext<TabLoadingContextType | null>(null);

export function useTabLoading() {
  const ctx = useContext(TabLoadingContext);
  if (!ctx) {
    throw new Error("useTabLoading must be used inside TabLoadingProvider");
  }
  return ctx;
}

export default function TabLoadingProvider({ children } : any ) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return (
    <TabLoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </TabLoadingContext.Provider>
  );
}
