import dynamic from "next/dynamic";

const DynamicFooter = dynamic(() => import("./FooterClient"));

export default DynamicFooter;
