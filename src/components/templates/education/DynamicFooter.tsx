import dynamic from "next/dynamic";


const DynamicFooter = dynamic(() => import("./Footer"));

export default DynamicFooter;
