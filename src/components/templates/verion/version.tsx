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

const sameVersion = (a?: string | null, b?: string | null) =>
  String(a ?? "").trim() === String(b ?? "").trim();

const Version: React.FC<VersionBoxProps> = ({
  versions,
  params,
  mainData,
  initialVersion,
  isVersionSelected = false,
}) => {
  // مقدار اولیه مستقیم در useState تا رندر اول (SSR) هم خالی نباشه
  const initial: Version | null =
    (initialVersion
      ? versions.find((v) => sameVersion(v.version, initialVersion))
      : null) ||
    versions[0] ||
    null;

  // نسخه‌ای که توی DescriptionBox نشون داده میشه؛ دیفالتش همیشه آخرین ورژنه
  const [displayVersion, setDisplayVersion] = useState<Version | null>(initial);
  // نسخه‌ای که واقعا "انتخاب/اکتیو"‌ه (هایلایت لیست)
  const [activeVersion, setActiveVersion] = useState<Version | null>(
    isVersionSelected ? initial : null
  );
  const [descLoading, setDescLoading] = useState(false);

  const versionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** 🔹 هماهنگ کردن state با پراپ‌ها (وقتی versions یا URL از سرور عوض بشه) */
  useEffect(() => {
    if (!versions.length) return;

    const matched = initialVersion
      ? versions.find((v) => sameVersion(v.version, initialVersion))
      : null;
    const next = matched || versions[0];

    setDisplayVersion(next);
    setActiveVersion(isVersionSelected ? next : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialVersion, versions, isVersionSelected]);

  /** ✅ سینک کردن document.title فقط وقتی یه ورژن واقعا اکتیو میشه */
  useEffect(() => {
    if (!activeVersion) return;
    document.title = `${activeVersion.title} - نسخه ${activeVersion.version}`;
  }, [activeVersion]);

  /** ✅ هماهنگی با دکمه‌ی back/forward مرورگر */
  useEffect(() => {
    const handlePopState = () => {
      const match = window.location.pathname.match(/\/version\/([^/?#]+)/);
      let slug: string | null = null;
      if (match) {
        try {
          slug = decodeURIComponent(match[1]);
        } catch {
          slug = match[1];
        }
      }
      const found =
        (slug && versions.find((v) => sameVersion(v.version, slug))) ||
        versions[0];
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
    if (sameVersion(activeVersion?.version, data.version)) return;

    if (fromClick) {
      // عمدا از router.push استفاده نمیشه چون توی Next.js App Router باعث
      // ری‌فچ سرور کامپوننت صفحه (و در نتیجه نمایش loading.tsx کامل، شامل لیست) میشه.
      const url = `/${params.lang}/version/${encodeURIComponent(data.version)}`;
      window.history.pushState(null, "", url);
    }

    setDescLoading(true);
    if (switchTimer.current) clearTimeout(switchTimer.current);
    switchTimer.current = setTimeout(() => {
      setDisplayVersion(data);
      setActiveVersion(data);
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
