import React from 'react';

interface ProgressBarProps {
  score: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ score, className }) => {
  const percentage = (score / 7896000 * 100).toFixed(3);

  return (
    <div className={`${className} bg-gray h-[20px] relative w-full h-4 bg-gray rounded-full`}>
        <div className="absolute top-0 left-0 h-[16px] mt-[2px] rounded-full ml-[2px]" style={{ width: `${percentage}%`, background: "linear-gradient(to right, #009FF7, #7FFCCC)" }}/>
        <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold text-center">{percentage}%</div>
    </div>
  );
};

export default ProgressBar;