"use client";

import DescriptionBox from "./versionDescriptionBox";
import VersionBox from "./versionList";
import React, { useState, useEffect, useRef } from "react";

interface Version {
  id: number;
  title: string;
  version: string;
  date: string;
  description: string;
}

interface VersionBoxProps {
  versions: Version[];
  params: any;
  mainData: any;
  initialVersion?: string | null;
  /** true فقط وقتی URL واقعا اسلاگ ورژن داره (/version/xxx)، نه دیفالت */
  isVersionSelected?: boolean;
}

// یه تاخیر کوچیک صرفا برای اینکه اسکلت دیده بشه (چون خود دیتا از قبل توی حافظه هست)
const DESCRIPTION_SWITCH_DELAY = 250;

const Version: React.FC<VersionBoxProps> = ({
  versions,
  params,
  mainData,
  initialVersion,
  isVersionSelected = false,
}) => {
  // نسخه‌ای که توی DescriptionBox نشون داده میشه؛ دیفالتش همیشه آخرین ورژنه
  const [displayVersion, setDisplayVersion] = useState<Version | null>(null);
  // نسخه‌ای که واقعا "انتخاب/اکتیو"‌ه (هایلایت لیست)؛ فقط وقتی از URL اسلاگ داشتیم یا کاربر کلیک کرد
  const [activeVersion, setActiveVersion] = useState<Version | null>(null);
  const [descLoading, setDescLoading] = useState(false);

  const versionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** 🔹 ست کردن مقدار اولیه بر اساس URL (رندر اول/SSR)
   *  - displayVersion همیشه پر میشه (اسلاگ یا در نبود اسلاگ، آخرین ورژن)
   *  - activeVersion فقط وقتی URL واقعا اسلاگ داشته باشه پر میشه
   */
  useEffect(() => {
    if (!versions.length) return;

    const matched = initialVersion
      ? versions.find((v) => v.version === initialVersion)
      : null;
    const initial = matched || versions[0];

    setDisplayVersion(initial);
    setActiveVersion(isVersionSelected ? initial : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialVersion, versions, isVersionSelected]);

  /** ✅ اسکرول به آیتم فقط وقتی واقعا اکتیوه (نه صرفا نمایش دیفالت) */
  useEffect(() => {
    if (!activeVersion) return;

    const el = versionRefs.current[activeVersion.version];
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [activeVersion]);

  /** ✅ سینک کردن document.title فقط وقتی یه ورژن واقعا اکتیو میشه
   *  (نه صرفا نمایش دیفالت آخرین ورژن). قبلا به displayVersion وصل بود که
   *  باعث میشد بلافاصله بعد لود (بدون هیچ انتخابی) تایتل عوض بشه.
   */
  useEffect(() => {
    if (!activeVersion) return;
    document.title = `${activeVersion.title} - نسخه ${activeVersion.version}`;
  }, [activeVersion]);

  /** ✅ هماهنگی با دکمه‌ی back/forward مرورگر */
  useEffect(() => {
    const handlePopState = () => {
      const match = window.location.pathname.match(/\/version\/([^/?#]+)/);
      const slug = match ? decodeURIComponent(match[1]) : null;
      const found = (slug && versions.find((v) => v.version === slug)) || versions[0];
      if (!found) return;

      setDescLoading(true);
      if (switchTimer.current) clearTimeout(switchTimer.current);
      switchTimer.current = setTimeout(() => {
        setDisplayVersion(found);
        setActiveVersion(slug ? found : null); // برگشت به /version یعنی دوباره هیچی اکتیو نیست
        setDescLoading(false);
      }, DESCRIPTION_SWITCH_DELAY);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [versions]);

  useEffect(() => {
    return () => {
      if (switchTimer.current) clearTimeout(switchTimer.current);
    };
  }, []);

  const handleDataFromChild = (data: Version, fromClick: boolean = true) => {
    // اگه همین الان هم اکتیوه، کاری لازم نیست
    if (activeVersion?.version === data.version) return;

    if (fromClick) {
      // ⚠️ عمدا از router.push استفاده نمیشه چون توی Next.js App Router باعث
      // ری‌فچ سرور کامپوننت صفحه (و در نتیجه نمایش loading.tsx کامل، شامل لیست) میشه.
      const url = `/${params.lang}/version/${encodeURIComponent(data.version)}`;
      window.history.pushState(null, "", url);
    }

    setDescLoading(true);
    if (switchTimer.current) clearTimeout(switchTimer.current);
    switchTimer.current = setTimeout(() => {
      setDisplayVersion(data);
      setActiveVersion(data); // فقط با کلیک/نویگیشن واقعی، اکتیو میشه
      setDescLoading(false);
    }, DESCRIPTION_SWITCH_DELAY);
  };

  return (
    <>
      <VersionBox
        versions={versions}
        sendDataParent={handleDataFromChild}
        params={params}
        mainData={mainData}
        selectedVersion={activeVersion}
        versionRefs={versionRefs}
      />

      <DescriptionBox
        selectedVersion={displayVersion}
        params={params}
        mainData={mainData}
        loading={descLoading}
      />
    </>
  );
};

export default Version;