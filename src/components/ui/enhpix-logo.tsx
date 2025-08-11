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
      {/* Cross shape - left side */}
      <path
        d="M10 20 L10 40 L0 40 L0 60 L10 60 L10 80 L20 80 L20 60 L30 60 L30 40 L20 40 L20 20 Z"
        fill="#5DADE2"
      />
      
      {/* Diamond shape - right side overlapping */}
      <path
        d="M65 10 L90 35 L90 65 L65 90 L35 65 L35 35 Z"
        fill="#5DADE2"
      />
      
      {/* White diamond cutout inside */}
      <path
        d="M65 25 L80 40 L80 60 L65 75 L45 60 L45 40 Z"
        fill="white"
      />
    </svg>
  );
};