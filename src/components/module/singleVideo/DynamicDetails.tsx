import dynamic from "next/dynamic";

const DynamicDetails = dynamic(() => import("./SingleVideoDetailsModule"), {
  ssr: false,
});

export default DynamicDetails;
