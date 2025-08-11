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
      {/* Cross shape */}
      <rect x="15" y="20" width="15" height="10" fill="#5DADE2" />
      <rect x="20" y="10" width="5" height="30" fill="#5DADE2" />
      <rect x="15" y="30" width="15" height="10" fill="#5DADE2" />
      <rect x="20" y="40" width="5" height="20" fill="#5DADE2" />
      
      {/* Diamond shape */}
      <path
        d="M70 15 L90 35 L70 55 L50 35 Z"
        fill="#5DADE2"
      />
      
      {/* White diamond cutout */}
      <path
        d="M70 25 L80 35 L70 45 L60 35 Z"
        fill="white"
      />
    </svg>
  );
};