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
      {/* Your custom logo design */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5CB3F5" />
          <stop offset="100%" stopColor="#4A9EF2" />
        </linearGradient>
      </defs>
      
      {/* Cross shape matching your logo */}
      {/* Vertical bar */}
      <rect x="38" y="10" width="24" height="80" fill="url(#logoGradient)" />
      
      {/* Horizontal bar */}
      <rect x="10" y="38" width="80" height="24" fill="url(#logoGradient)" />
      
      {/* Diamond/square shape in the center */}
      <g transform="translate(50, 50) rotate(45)">
        <rect x="-12" y="-12" width="24" height="24" fill="white" stroke="url(#logoGradient)" strokeWidth="3" />
      </g>
    </svg>
  );
};