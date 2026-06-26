"use client";
import * as React from "react";
import { Hbtn, HbtnDark } from "@/svgs/index";


const SvgComponent = (props) => {
  return (
    <div className="inline-block" {...props}>
      <Hbtn
        className="w-[60px] h-[60px] dark:hidden glow-svg "
        aria-label="کار و پروژه"
      />
      <HbtnDark
        className="w-[60px] h-[60px] hidden dark:block glow-svg "
        aria-label="کار و پروژه"
      />
    </div>
  );
};

export default SvgComponent;
