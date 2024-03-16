import dynamic from "next/dynamic";

const DynamicTimer = dynamic(() => import("./Timer"), { ssr: false });

export default DynamicTimer;
