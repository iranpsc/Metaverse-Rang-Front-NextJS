import React from 'react';

export interface AlertProps {
    show: boolean;
    text: string;
    color: string;
}

export default function Alert({ show, text, color }: AlertProps) {
  if (!show) return null;
  console.log('color', color)
  return (
    <div 
      className={`fixed bg-white border border-[2px] border-${color} text-white py-2 px-6 rounded-lg right-3 bottom-3 transition 
       ease-in-out delay-150`}
      role="alert"  
    >
      <span className={`text-${color} text-IranSans`}>{text}</span>     
    </div>  
  )  
}
