import React, { ReactNode } from "react";
import DesktopPressure from "./DesktopPressure";
import MobilePressure from "./MobilePressure";

type PressureLayoutProps = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  className?: string;
};

export default function PressureLayout({
  left,
  center,
  right,
  className = "",
}: PressureLayoutProps) {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopPressure
          left={left}
          center={center}
          right={right}
          className={className}
        />
      </div>

      <div className="block lg:hidden">
        <MobilePressure
          left={left}
          center={center}
          right={right}
          className={className}
        />
      </div>
    </>
  );
}