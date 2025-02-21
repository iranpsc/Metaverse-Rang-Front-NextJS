"use client";
import DescriptionBox from "./descriptionBox";
import VersionBox from "./versionBox";
import React, { useState } from "react";

interface Version {
  id: number;
  title: string;
  version: string;
  date: string;
  description: string;
}

interface VersionBoxProps {
  versions: Version[];
}

const Version: React.FC<VersionBoxProps> = ({ versions }) => {
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(
    versions.length > 0 ? versions[0] : null
  );

  const handleDataFromChild = (data: Version) => {
    setSelectedVersion(data);
  };

  return (
    <>
      <VersionBox versions={versions} sendDataParent={handleDataFromChild} />
      <DescriptionBox selectedVersion={selectedVersion} />
    </>
  );
};

export default Version;
