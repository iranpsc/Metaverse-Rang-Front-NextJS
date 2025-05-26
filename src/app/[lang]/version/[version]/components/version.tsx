"use client";

import DescriptionBox from "./descriptionBox";
import VersionBox from "../../components/versionBox";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

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

const Version: React.FC<VersionBoxProps> = ({ versions, params, mainData  , initialVersion}) => {
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (initialVersion && versions.length > 0) {
      const matched = versions.find((v) => v.version === initialVersion);
      if (matched) {
        setSelectedVersion(matched);
      } else {
        setSelectedVersion(versions[0]); // ورژن اول اگر initialVersion نامعتبر بود
      }
    } else {
      setSelectedVersion(versions[0] || null);
    }
  }, [initialVersion, versions]);
  

  const handleDataFromChild = (data: Version) => {
    setSelectedVersion(data);
    router.push(`/${params.lang}/version/${encodeURIComponent(data.version)}`, { scroll: false });
  };
  

  return (
    <>
      <VersionBox
        versions={versions}
        sendDataParent={handleDataFromChild}
        params={params}
        mainData={mainData}
        disableInitialSelection={!!initialVersion}
        selectedVersion={selectedVersion}
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
