import React from 'react';

interface EnhpixLogoProps {
  className?: string;
}

export const EnhpixLogo: React.FC<EnhpixLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cross shape */}
      <path
        d="M30 10 L30 35 L10 35 L10 65 L30 65 L30 90 L40 90 L40 65 L65 65 L65 35 L40 35 L40 10 Z"
        fill="#5DADE2"
      />
      
      {/* Diamond shape */}
      <path
        d="M50 20 L80 50 L50 80 L20 50 Z"
        fill="#5DADE2"
      />
      
      {/* White diamond cutout */}
      <path
        d="M50 30 L70 50 L50 70 L30 50 Z"
        fill="white"
      />
    </svg>
  );
};