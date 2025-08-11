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
      {/* Cross - vertical bar */}
      <rect x="40" y="10" width="20" height="80" fill="#5DADE2" />
      {/* Cross - horizontal bar */}
      <rect x="20" y="30" width="60" height="20" fill="#5DADE2" />
      {/* Cross - top extension */}
      <rect x="25" y="15" width="50" height="10" fill="#5DADE2" />
      {/* Cross - bottom extension */}
      <rect x="25" y="55" width="50" height="10" fill="#5DADE2" />
      
      {/* Diamond shape overlapping on right */}
      <path
        d="M85 25 L95 35 L95 65 L85 75 L75 65 L75 35 Z"
        fill="#5DADE2"
      />
      
      {/* White diamond cutout */}
      <path
        d="M85 35 L90 40 L90 60 L85 65 L80 60 L80 40 Z"
        fill="white"
      />
    </svg>
  );
};