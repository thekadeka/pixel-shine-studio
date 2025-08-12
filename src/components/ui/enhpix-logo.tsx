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
      {/* Cross - building it block by block like in your image */}
      {/* Row 1 - top single block */}
      <rect x="30" y="10" width="10" height="10" fill="#5DADE2" />
      
      {/* Row 2 - three blocks horizontally */}
      <rect x="20" y="20" width="10" height="10" fill="#5DADE2" />
      <rect x="30" y="20" width="10" height="10" fill="#5DADE2" />
      <rect x="40" y="20" width="10" height="10" fill="#5DADE2" />
      
      {/* Row 3 - full cross width */}
      <rect x="10" y="30" width="10" height="10" fill="#5DADE2" />
      <rect x="20" y="30" width="10" height="10" fill="#5DADE2" />
      <rect x="30" y="30" width="10" height="10" fill="#5DADE2" />
      <rect x="40" y="30" width="10" height="10" fill="#5DADE2" />
      <rect x="50" y="30" width="10" height="10" fill="#5DADE2" />
      
      {/* Row 4 - three blocks horizontally */}
      <rect x="20" y="40" width="10" height="10" fill="#5DADE2" />
      <rect x="30" y="40" width="10" height="10" fill="#5DADE2" />
      <rect x="40" y="40" width="10" height="10" fill="#5DADE2" />
      
      {/* Row 5 - bottom single block */}
      <rect x="30" y="50" width="10" height="10" fill="#5DADE2" />
      
      {/* Diamond shape */}
      <path
        d="M80 20 L90 30 L80 40 L70 30 Z"
        fill="#5DADE2"
      />
      
      {/* White diamond cutout */}
      <path
        d="M80 25 L85 30 L80 35 L75 30 Z"
        fill="white"
      />
    </svg>
  );
};