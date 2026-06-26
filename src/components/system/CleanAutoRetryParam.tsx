// components/shared/CleanAutoRetryParam.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function CleanAutoRetryParam() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get("autoRetry") === "1") {
      router.replace(pathname);
    }
  }, [searchParams, pathname, router]);

  return null;
}
