"use client";

import DescriptionBox from "./versionDescriptionBox";
import VersionBox from "./versionList";

import { useRouter } from "next/navigation";
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
}

const Version: React.FC<VersionBoxProps> = ({
  versions,
  params,
  mainData,
  initialVersion,
}) => {
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const router = useRouter();

  /** 🔹 ref برای آیتم‌های لیست */
  const versionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  /** 🔹 ست کردن ورژن فعال بر اساس URL */
  useEffect(() => {
    if (!versions.length) return;

    if (initialVersion) {
      const matched = versions.find((v) => v.version === initialVersion);
      setSelectedVersion(matched || versions[0]);
    } else {
      setSelectedVersion(versions[0]);
    }
  }, [initialVersion, versions]);

  /** ✅ اسکرول به آیتم active بعد از mount / route change */
  useEffect(() => {
    if (!selectedVersion) return;

    const el = versionRefs.current[selectedVersion.version];
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100); // ⬅️ بسیار مهم
    }
  }, [selectedVersion]);

  const handleDataFromChild = (data: Version) => {
    setSelectedVersion(data);

    router.push(
      `/${params.lang}/version/${encodeURIComponent(data.version)}`,
      { scroll: false } // 🔥 جلوگیری از اسکرول Next
    );
  };

  return (
    <>
      <VersionBox
        versions={versions}
        sendDataParent={handleDataFromChild}
        params={params}
        mainData={mainData}
        selectedVersion={selectedVersion}
        versionRefs={versionRefs} // ⬅️ ارسال ref
      />

      <DescriptionBox
        selectedVersion={selectedVersion}
        params={params}
        mainData={mainData}
      />
    </>
  );
};

export default Version;
