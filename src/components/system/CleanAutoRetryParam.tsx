// components/shared/CleanAutoRetryParam.tsx
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function CleanAutoRetryParam() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("autoRetry") === "1") {
      router.replace(pathname);
    }
  }, [pathname, router]);

  return null;
}
