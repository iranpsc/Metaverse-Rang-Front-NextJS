import React from "react";

export interface DividerProps {
  title?: string;
}

export default function Divider({ title }: DividerProps) {
  return (
    <>
      <div className="w-full grid grid-cols-12 py-8">
        <div>
          <h2 className="whitespace-nowrap text-gray flex justify-center">
            {title}
          </h2>
        </div>
        <div className="col-span-11">
          <hr className="w-full mr-5 md:mr-0 border-0 border-b-[1px] border-gray-lighter mt-3" />
        </div>
      </div>
    </>
  );
}
