import React from "react";

type Clip = "tr" | "tl" | "br" | "bl";

type ClipButtonProps = {
  children: React.ReactNode;
  className?: string;
  clip?: Clip;
};
  //ClipButton.tsx dd
export default function ClipButton({
  children,
  className = "",
  clip = "tr",
}: ClipButtonProps) {
  const transform = {
    br: "",
    bl: "scaleX(-1)",
    tr: "scaleY(-1)",
    tl: "scale(-1,-1)",
  }[clip];

  return (
    <div
      className={`relative inline-flex h-[68px] min-w-[230px] ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 227 70"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          transform,
          transformOrigin: "center",
        }}
      >
<path
    d="M16 1
       L211 1
       Q227 0 226 16
       L226 28
       Q226 34 221 40
       L197 63
       Q191 69 185 69
       L16 69
       Q0 70 1 54
       L1 16
       Q0 0 16 1
       Z"
    fill="currentColor"
  />
      </svg>

      <div className="relative z-10 flex h-full w-full justify-between items-center px-6">
        {children}
      </div>
    </div>
  );
}