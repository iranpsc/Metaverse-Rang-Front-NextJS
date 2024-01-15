import dynamic from "next/dynamic";

const DynamicListEducation = dynamic(() => import("./ListEducation"));

export default DynamicListEducation;
