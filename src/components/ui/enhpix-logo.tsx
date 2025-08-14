import React from 'react';

interface EnhpixLogoProps {
  className?: string;
}

export const EnhpixLogo: React.FC<EnhpixLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Your logo: Cross + Diamond design */}
      
      {/* Cross horizontal bar */}
      <rect x="5" y="35" width="75" height="30" fill="#5CB3F5" />
      
      {/* Cross vertical bar */}
      <rect x="25" y="15" width="30" height="70" fill="#5CB3F5" />
      
      {/* Diamond shape on the right */}
      <g transform="translate(95, 50) rotate(45)">
        <rect x="-12" y="-12" width="24" height="24" fill="#5CB3F5" />
        <rect x="-8" y="-8" width="16" height="16" fill="white" />
      </g>
    </svg>
  );
};