import React from 'react';

interface EnhpixLogoProps {
  className?: string;
}

export const EnhpixLogo: React.FC<EnhpixLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cross shape on left */}
      <path
        d="M15 10 L15 30 L5 30 L5 50 L15 50 L15 70 L25 70 L25 50 L35 50 L35 30 L25 30 L25 10 Z"
        fill="#5DADE2"
      />
      
      {/* Diamond shape on right */}
      <path
        d="M60 15 L85 40 L60 65 L35 40 Z"
        fill="#5DADE2"
      />
      
      {/* White diamond cutout inside the diamond */}
      <path
        d="M60 25 L75 40 L60 55 L45 40 Z"
        fill="white"
      />
    </svg>
  );
};