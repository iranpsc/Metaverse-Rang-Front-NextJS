"use client";

import { useEffect } from "react";

export default function FixLinks() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // پیدا کردن لینک واقعی:
      let link: HTMLAnchorElement | null = null;

      if (target.tagName === "A") {
        link = target as HTMLAnchorElement;
      } else if (target.closest("a")) {
        link = target.closest("a") as HTMLAnchorElement;
      } else {
        // اگر path یا هر چیزی بدون href هست، شاید data-href داشته باشه
        let el: HTMLElement | null = target;
        while (el) {
          if (el.dataset && el.dataset.href) {
            // ایجاد لینک موقت
            const a = document.createElement("a");
            a.href = el.dataset.href;
            link = a;
            break;
          }
          el = el.parentElement;
        }
      }

      if (!link || !link.href) return;

      // middle click یا ctrl/cmd
      if (e.button === 1 || e.metaKey || e.ctrlKey) {
        window.open(link.href, "_blank");
        e.preventDefault();
        return;
      }

      // left click معمولی
      if (e.button === 0) {
        window.location.href = link.href;
        e.preventDefault();
        return;
      }
    };

    document.addEventListener("mousedown", handler, true);
    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("mousedown", handler, true);
      document.removeEventListener("click", handler, true);
    };
  }, []);

  return null;
}
