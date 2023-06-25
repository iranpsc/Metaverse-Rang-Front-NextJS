import React from 'react';

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Button({ className, children }: ButtonProps) {
  return (
    <button className={`btn btn-primary ${className}`} type="button">
      {children}
    </button>
  );
}
