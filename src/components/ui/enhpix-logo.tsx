import React from 'react';

interface EnhpixLogoProps {
  className?: string;
}

export const EnhpixLogo: React.FC<EnhpixLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 50"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cross shape */}
      <rect x="5" y="15" width="15" height="8" fill="#5DADE2" />
      <rect x="8" y="5" width="9" height="25" fill="#5DADE2" />
      <rect x="5" y="27" width="15" height="8" fill="#5DADE2" />
      
      {/* Diamond shape */}
      <path
        d="M55 10 L75 25 L55 40 L35 25 Z"
        fill="#5DADE2"
      />
      
      {/* White diamond cutout */}
      <path
        d="M55 18 L67 25 L55 32 L43 25 Z"
        fill="white"
      />
    </svg>
  );
};