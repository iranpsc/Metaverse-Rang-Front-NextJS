"use client";

import DescriptionBox from "../../components/descriptionBox";
import VersionBox from "../../components/versionBox";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

// interface Version {
//   id: number;
//   title: string;
//   version: string;
//   date: string;
//   description: string;
// }

// interface VersionBoxProps {
//   versions: Version[];
//   params: any;
//   mainData: any;
// }

// const Version: React.FC<VersionBoxProps> = ({ versions, params, mainData }) => {
//   const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);

//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const versionQuery = searchParams.get("version");
//   const hasVersionFromUrl = !!versionQuery;

//   // تنظیم selectedVersion از URL (اگر وجود دارد)
//   useEffect(() => {
//     if (versionQuery && versions.length > 0) {
//       const matched = versions.find((v) => v.version === versionQuery);
//       if (matched) {
//         setSelectedVersion(matched);
//       } else {
//         setSelectedVersion(versions[0]); // اگر نسخه‌ای با URL تطبیق نداشت
//       }
//     } else {
//       setSelectedVersion(versions[0]);
//     }
//   }, [versionQuery, versions]);

//   // وقتی کاربر روی نسخه کلیک می‌کند
//   const handleDataFromChild = (data: Version) => {
//     setSelectedVersion(data);
//     router.push(`/${params.lang}/version/${encodeURIComponent(data.version)}`, { scroll: false });


//   };

//   return (
//     <>
//       <VersionBox
//         versions={versions}
//         sendDataParent={handleDataFromChild}
//         params={params}
//         mainData={mainData}
//         disableInitialSelection={hasVersionFromUrl}
//       />
//       <DescriptionBox
//         selectedVersion={selectedVersion}
//         params={params}
//         mainData={mainData}
//       />
//     </>
//   );
// };

// export default Version;
