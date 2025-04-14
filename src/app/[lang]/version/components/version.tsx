"use client";

import React, { useState } from "react";
import DescriptionBox from "./descriptionBox";
import VersionBox from "./versionBox";

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
}

const Version: React.FC<VersionBoxProps> = ({ versions, params, mainData }) => {
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(
    versions?.[0] ?? null
  );

  const handleDataFromChild = (data: Version) => {
    setSelectedVersion(data);
  };

  return (
    <>
      <VersionBox
        versions={versions}
        sendDataParent={handleDataFromChild}
        params={params}
        mainData={mainData}
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
