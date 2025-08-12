import React from 'react';

interface EnhpixLogoProps {
  className?: string;
}

export const EnhpixLogo: React.FC<EnhpixLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cross made of simple rectangles */}
      {/* Top arm */}
      <rect x="15" y="10" width="20" height="10" fill="#5DADE2" />
      {/* Left arm */}
      <rect x="5" y="20" width="20" height="10" fill="#5DADE2" />
      {/* Center vertical */}
      <rect x="20" y="10" width="10" height="40" fill="#5DADE2" />
      {/* Right arm */}
      <rect x="30" y="20" width="20" height="10" fill="#5DADE2" />
      {/* Bottom arm */}
      <rect x="15" y="40" width="20" height="10" fill="#5DADE2" />
      
      {/* Diamond shape */}
      <path
        d="M75 15 L90 30 L75 45 L60 30 Z"
        fill="#5DADE2"
      />
      
      {/* White diamond cutout */}
      <path
        d="M75 22 L83 30 L75 38 L67 30 Z"
        fill="white"
      />
    </svg>
  );
};